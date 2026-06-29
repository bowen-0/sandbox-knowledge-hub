import { extractWikilinks, firstProseLine, parseCitation } from "./parse.js";
import { normalizeType, type WikiPage, type WikiProvider } from "./types.js";

const READ_CAP_BYTES = 60_000;
const MAX_SNIPPETS_PER_PAGE = 3;
const SNIPPET_RADIUS = 90;

/**
 * An inline citation, with its visible slug and its source link:
 *   [(p2-building-permits p. 25)](../sources/p2-building-permits.md)
 * Captures: visible-slug, p|S, page-number, optional "../", href-slug.
 * Page-anchoring stays slug-based in the stored markdown (CONVENTIONS §6);
 * this lets the server swap the *visible* slug for a friendly source name at
 * serve time while leaving the link (and so the file mapping) untouched.
 */
const CITATION_LINK_RE =
  /\[\(([a-z0-9][a-z0-9-]*)(?:\s+(p|S)\.\s*(\d+))?\)\]\((\.\.\/)?sources\/([a-z0-9-]+)\.md\)/gi;

/** Typed frontmatter fields that act as graph edges. */
const EDGE_FIELDS = [
  "sources",
  "project",
  "concept",
  "regulation",
  "stakeholder",
  "related",
  "related_projects",
  "appears_in",
  "connects",
  "affiliation",
  "canonical_source",
  "parent",
] as const;

export interface ListFilters {
  type?: string;
  insight_domain?: string;
  sector?: string;
  phase?: string;
  cross_cutting?: boolean;
  priority?: string;
}

export interface PageSummary {
  slug: string;
  type: string;
  title: string;
  summary: string;
  insight_domain?: string;
  sector?: string;
  phase?: string;
  cross_cutting?: boolean;
  priority?: string;
  confidence?: string;
}

export interface SearchHit {
  slug: string;
  type: string;
  title: string;
  score: number;
  insight_domain?: string;
  snippets: string[];
}

export interface Connections {
  slug: string;
  outgoing: Array<{ slug: string; exists: boolean; title?: string; type?: string }>;
  frontmatter_edges: Array<{ field: string; slug: string; exists: boolean }>;
  backlinks: Array<{ slug: string; type: string; title: string }>;
}

/** All read operations over the wiki. Provider-agnostic and read-only. */
export class WikiStore {
  constructor(private readonly provider: WikiProvider) {}

  private async pages(): Promise<WikiPage[]> {
    return this.provider.getPages();
  }

  /** Resolve a slug to a page: exact match first, then case-insensitive. */
  async resolve(slug: string): Promise<WikiPage | undefined> {
    const clean = slug.replace(/\.md$/, "").split("#")[0].trim();
    const all = await this.pages();
    return (
      all.find((p) => p.slug === clean) ??
      all.find((p) => p.slug.toLowerCase() === clean.toLowerCase())
    );
  }

  async list(filters: ListFilters = {}): Promise<PageSummary[]> {
    const all = await this.pages();
    return all
      .filter((p) => p.type !== "meta")
      .filter((p) => !filters.type || p.type === normalizeType(filters.type))
      .filter((p) => !filters.insight_domain || p.frontmatter.insight_domain === filters.insight_domain)
      .filter((p) => !filters.sector || p.frontmatter.sector === filters.sector)
      .filter((p) => !filters.phase || String(p.frontmatter.phase ?? "") === filters.phase)
      .filter((p) => filters.cross_cutting === undefined || Boolean(p.frontmatter.cross_cutting) === filters.cross_cutting)
      .filter((p) => !filters.priority || p.frontmatter.priority === filters.priority)
      .map((p) => this.summarize(p))
      .sort((a, b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));
  }

  private summarize(p: WikiPage): PageSummary {
    const fm = p.frontmatter;
    const summary: PageSummary = {
      slug: p.slug,
      type: p.type,
      title: p.title,
      summary: firstProseLine(p.body),
    };
    if (typeof fm.insight_domain === "string") summary.insight_domain = fm.insight_domain;
    if (typeof fm.sector === "string") summary.sector = fm.sector;
    if (fm.phase !== undefined) summary.phase = String(fm.phase);
    if (fm.cross_cutting !== undefined) summary.cross_cutting = Boolean(fm.cross_cutting);
    if (typeof fm.priority === "string") summary.priority = fm.priority;
    if (typeof fm.confidence === "string") summary.confidence = fm.confidence;
    return summary;
  }

  /**
   * slug -> friendly citation name, from each source page's `cite_as`.
   * Cached: source pages are stable for the life of the store. Sources without
   * a `cite_as` are simply absent, so their citations render slug-as-before.
   */
  private citeNames?: Map<string, string>;
  private async citationNames(): Promise<Map<string, string>> {
    if (!this.citeNames) {
      const m = new Map<string, string>();
      for (const p of await this.pages()) {
        if (p.type === "source" && typeof p.frontmatter.cite_as === "string") {
          const name = p.frontmatter.cite_as.trim();
          if (name) m.set(p.slug, name);
        }
      }
      this.citeNames = m;
    }
    return this.citeNames;
  }

  /**
   * Swap the visible slug in each inline citation for its source's friendly
   * name, keeping the link target (the file mapping) intact:
   *   [(p2-building-permits p. 25)](../sources/p2-building-permits.md)
   *   -> [(Building Permits, p. 25)](../sources/p2-building-permits.md)
   * Read-only / serve-time only; the stored markdown stays slug-anchored.
   */
  async renderCitationNames(text: string): Promise<string> {
    const names = await this.citationNames();
    if (names.size === 0) return text;
    return text.replace(CITATION_LINK_RE, (full, visSlug, pLetter, pNum, dotdot, hrefSlug) => {
      const name = names.get(visSlug) ?? names.get(hrefSlug);
      if (!name) return full;
      const label = pNum ? `${name}, ${pLetter}. ${pNum}` : name;
      return `[(${label})](${dotdot ?? ""}sources/${hrefSlug}.md)`;
    });
  }

  /** Full page content, capped. */
  async read(slug: string): Promise<{ page: WikiPage; content: string; truncated: boolean } | undefined> {
    const page = await this.resolve(slug);
    if (!page) return undefined;
    const fmBlock = Object.keys(page.frontmatter).length
      ? `---\n${Object.entries(page.frontmatter)
          .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
          .join("\n")}\n---\n\n`
      : "";
    let content = await this.renderCitationNames(fmBlock + page.body);
    let truncated = false;
    if (content.length > READ_CAP_BYTES) {
      content = content.slice(0, READ_CAP_BYTES) + "\n\n[... truncated]";
      truncated = true;
    }
    return { page, content, truncated };
  }

  async search(query: string, opts: { type?: string; insight_domain?: string; limit?: number } = {}): Promise<SearchHit[]> {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1);
    if (terms.length === 0) return [];
    const limit = Math.min(opts.limit ?? 10, 25);

    const hits: SearchHit[] = [];
    for (const p of await this.pages()) {
      if (opts.type && p.type !== normalizeType(opts.type)) continue;
      if (opts.insight_domain && p.frontmatter.insight_domain !== opts.insight_domain) continue;

      const titleLc = p.title.toLowerCase();
      const slugLc = p.slug.toLowerCase();
      const bodyLc = p.body.toLowerCase();
      const fmLc = JSON.stringify(p.frontmatter).toLowerCase();

      let score = 0;
      const snippetOffsets: number[] = [];
      for (const term of terms) {
        if (titleLc.includes(term)) score += 8;
        if (slugLc.includes(term)) score += 6;
        if (fmLc.includes(term)) score += 3;
        let idx = bodyLc.indexOf(term);
        let bodyHits = 0;
        while (idx !== -1 && bodyHits < 10) {
          bodyHits++;
          if (snippetOffsets.length < MAX_SNIPPETS_PER_PAGE) snippetOffsets.push(idx);
          idx = bodyLc.indexOf(term, idx + term.length);
        }
        score += bodyHits;
      }
      if (score === 0) continue;
      if (p.frontmatter.priority === "high") score += 4;
      if (p.frontmatter.cross_cutting === true) score += 2;

      const snippets = snippetOffsets.map((off) => {
        const start = Math.max(0, off - SNIPPET_RADIUS);
        const end = Math.min(p.body.length, off + SNIPPET_RADIUS);
        return (start > 0 ? "…" : "") + p.body.slice(start, end).replace(/\s+/g, " ").trim() + (end < p.body.length ? "…" : "");
      });

      const hit: SearchHit = { slug: p.slug, type: p.type, title: p.title, score, snippets };
      if (typeof p.frontmatter.insight_domain === "string") hit.insight_domain = p.frontmatter.insight_domain;
      hits.push(hit);
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  async connections(slug: string): Promise<Connections | undefined> {
    const page = await this.resolve(slug);
    if (!page) return undefined;
    const all = await this.pages();
    const bySlug = new Map(all.map((p) => [p.slug, p]));

    const outgoing = extractWikilinks(page.body).map((ref) => {
      const target = bySlug.get(ref.slug);
      return target
        ? { slug: ref.slug, exists: true, title: target.title, type: target.type }
        : { slug: ref.slug, exists: false };
    });

    const frontmatter_edges: Connections["frontmatter_edges"] = [];
    for (const field of EDGE_FIELDS) {
      const value = page.frontmatter[field];
      const slugs = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
      for (const raw of slugs) {
        if (typeof raw !== "string") continue;
        const target = raw.split("#")[0];
        frontmatter_edges.push({ field, slug: target, exists: bySlug.has(target) });
      }
    }

    const backlinks = all
      .filter((p) => p.slug !== page.slug)
      .filter((p) => {
        if (extractWikilinks(p.body).some((r) => r.slug === page.slug)) return true;
        return EDGE_FIELDS.some((f) => {
          const v = p.frontmatter[f];
          const slugs = Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
          return slugs.some((s) => typeof s === "string" && s.split("#")[0] === page.slug);
        });
      })
      .map((p) => ({ slug: p.slug, type: p.type, title: p.title }));

    return { slug: page.slug, outgoing, frontmatter_edges, backlinks };
  }

  /**
   * Resolve a citation like "p2-building-permits#page-25" to its source page
   * and PDF locations. Returns metadata, never PDF content — the corpus PDFs
   * overload LLM context windows; that is a design constraint, not a gap.
   */
  async resolveCitation(ref: string): Promise<
    | {
        source_slug: string;
        page_number?: number;
        title: string;
        source_page_path: string;
        pdf: { de?: string; en?: string; authoritative: string };
        publisher?: string;
        year?: number;
        note: string;
      }
    | { error: string }
  > {
    const parsed = parseCitation(ref);
    if (!parsed) return { error: `Unrecognised citation format: "${ref}". Expected "<source-slug>#page-N" or "<source-slug> p. N".` };
    const page = await this.resolve(parsed.sourceSlug);
    if (!page || page.type !== "source") {
      return { error: `No source page found for slug "${parsed.sourceSlug}". Use wiki_list_pages with type "source" to see available sources.` };
    }
    const fm = page.frontmatter;
    // path: usually points at the German PDF, but EN-only sources point it at
    // the English one — classify by the path's language folder, not the field.
    const paths = [fm.path, fm.en_path].filter((p): p is string => typeof p === "string");
    const de = paths.find((p) => p.includes("/de/"))?.replace(/^\.\.\//, "wiki/");
    const en = paths.find((p) => p.includes("/en/"))?.replace(/^\.\.\//, "wiki/");
    const enOnly = !de && !!en;
    return {
      source_slug: page.slug,
      page_number: parsed.page,
      title: page.title,
      source_page_path: `wiki/${page.path}`,
      pdf: { de, en, authoritative: enOnly ? "en (this source exists only in English)" : "de (German is citation-authoritative)" },
      publisher: typeof fm.publisher === "string" ? fm.publisher : undefined,
      year: typeof fm.year === "number" ? fm.year : undefined,
      note: parsed.page
        ? `The cited claim is on printed page ${parsed.page} of the ${enOnly ? "English" : "German"} PDF. Read the source page (wiki_read_page "${page.slug}") for context; open the PDF only if you must verify the exact wording.`
        : `Whole-source citation. Read the source page (wiki_read_page "${page.slug}") for the report's summary, methodology, and notable quotes.`,
    };
  }

  /** Counts by type plus domain split — the overview surface. */
  async stats(): Promise<{ byType: Record<string, number>; byDomain: Record<string, number>; total: number }> {
    const all = await this.pages();
    const byType: Record<string, number> = {};
    const byDomain: Record<string, number> = {};
    for (const p of all) {
      if (p.type === "meta") continue;
      byType[p.type] = (byType[p.type] ?? 0) + 1;
      const d = p.frontmatter.insight_domain;
      if (typeof d === "string") byDomain[d] = (byDomain[d] ?? 0) + 1;
    }
    return { byType, byDomain, total: Object.values(byType).reduce((a, b) => a + b, 0) };
  }
}

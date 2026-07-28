import { extractWikilinks, firstProseLine, parseCitation } from "./parse.js";
import { normalizeType, type WikiPage, type WikiProvider } from "./types.js";

const READ_CAP_BYTES = 60_000;
const MAX_SNIPPETS_PER_PAGE = 3;
const SNIPPET_RADIUS = 90;

/** Terms too common to carry signal; a query of only these returns nothing. */
const SEARCH_STOP_WORDS = new Set([
  // EN
  "of", "the", "and", "for", "with", "from", "into", "are", "was", "this", "that", "how", "what", "which", "not",
  // DE (German report titles and verbatim quotes appear in the corpus)
  "der", "die", "das", "und", "fur", "fuer", "von", "mit", "aus", "dem", "den", "ein", "eine", "im", "bei", "auf", "ist", "sind", "wie",
]);

/** Lowercase + strip diacritics + ß→ss, so Zurich ≡ Zürich and Behörde ≡ Behoerde-ish queries meet in the middle. */
function foldForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * An inline citation, with its visible label and its source link. Both the
 * historic slug form and the friendly-label form are matched:
 *   [(p2-building-permits p. 25)](../sources/p2-building-permits.md)
 *   [(Building Permits report, p. 25)](../sources/p2-building-permits.md)
 * Captures: visible-label, p|S, page-number, optional "../", href-slug.
 * The href slug is what maps to the source file (and drives the deep-link
 * rewrite); the visible label is normalised to the source's `cite_as` at
 * serve time whichever form is stored.
 */
const CITATION_LINK_RE =
  /\[\(([^()[\]]+?)(?:,?\s+(p|S)\.\s*(\d+))?\)\]\((\.\.\/)?sources\/([a-z0-9-]+)\.md\)/gi;

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
  /**
   * @param citationBaseUrl  When set (the hosted worker passes its own origin),
   *   inline citations are rewritten to absolute "<base>/c/<slug>/<page>" links
   *   that the worker 302-redirects to the source PDF at the cited page. Left
   *   unset (stdio / local), citations keep their portable "../sources/<slug>.md"
   *   relative form.
   */
  constructor(
    private readonly provider: WikiProvider,
    private readonly citationBaseUrl?: string,
  ) {}

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
   * Render each inline citation for serving: swap the visible slug for the
   * source's friendly name, and (when a citationBaseUrl is set) point the link
   * at the deep-link endpoint that opens the source PDF at the cited page:
   *   [(p2-building-permits p. 25)](../sources/p2-building-permits.md)
   *   -> [(Building Permits report, p. 25)](https://<base>/c/p2-building-permits/25)
   * With no base, only the name is swapped and the relative link is kept.
   * Read-only / serve-time only; the stored markdown stays slug-anchored.
   */
  async renderCitationNames(text: string): Promise<string> {
    const names = await this.citationNames();
    const base = this.citationBaseUrl?.replace(/\/+$/, "");
    if (names.size === 0 && !base) return text;
    return text.replace(CITATION_LINK_RE, (_full, visLabel, pLetter, pNum, dotdot, hrefSlug) => {
      const name = names.get(visLabel) ?? names.get(hrefSlug);
      const label = name
        ? pNum
          ? `${name}, ${pLetter}. ${pNum}`
          : name
        : pNum
          ? `${visLabel} ${pLetter}. ${pNum}`
          : visLabel;
      const href = base
        ? `${base}/c/${hrefSlug}${pNum ? `/${pNum}` : ""}`
        : `${dotdot ?? ""}sources/${hrefSlug}.md`;
      return `[(${label})](${href})`;
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
    const foldedQuery = foldForSearch(query).trim();
    const terms = foldedQuery
      .split(/\s+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1 && !SEARCH_STOP_WORDS.has(t));
    if (terms.length === 0) return [];
    const limit = Math.min(opts.limit ?? 10, 25);

    // Short terms match on word boundaries only ("act" must not hit "practice");
    // longer terms keep substring matching so German compounds still match.
    const matchers = terms.map((term) =>
      term.length <= 3 ? new RegExp(`\\b${escapeRegExp(term)}\\b`, "g") : null
    );

    const hits: SearchHit[] = [];
    for (const p of await this.pages()) {
      if (opts.type && p.type !== normalizeType(opts.type)) continue;
      if (opts.insight_domain && p.frontmatter.insight_domain !== opts.insight_domain) continue;

      // Offsets are computed on the folded body; folding preserves length except
      // ß→ss, so snippet windows can drift by a char or two — cosmetic only.
      const titleLc = foldForSearch(p.title);
      const slugLc = p.slug.toLowerCase();
      const bodyLc = foldForSearch(p.body);
      const fmLc = foldForSearch(JSON.stringify(p.frontmatter));

      let score = 0;
      let matchedTerms = 0;
      const snippetOffsets: number[] = [];
      for (let i = 0; i < terms.length; i++) {
        const term = terms[i];
        const boundary = matchers[i];
        let termScore = 0;
        const fieldHas = (field: string) =>
          boundary ? (boundary.lastIndex = 0, boundary.test(field)) : field.includes(term);
        if (fieldHas(titleLc)) termScore += 8;
        if (fieldHas(slugLc)) termScore += 6;
        if (fieldHas(fmLc)) termScore += 3;
        let bodyHits = 0;
        if (boundary) {
          boundary.lastIndex = 0;
          let m: RegExpExecArray | null;
          while ((m = boundary.exec(bodyLc)) !== null && bodyHits < 10) {
            bodyHits++;
            if (snippetOffsets.length < MAX_SNIPPETS_PER_PAGE) snippetOffsets.push(m.index);
          }
        } else {
          let idx = bodyLc.indexOf(term);
          while (idx !== -1 && bodyHits < 10) {
            bodyHits++;
            if (snippetOffsets.length < MAX_SNIPPETS_PER_PAGE) snippetOffsets.push(idx);
            idx = bodyLc.indexOf(term, idx + term.length);
          }
        }
        termScore += bodyHits;
        if (termScore > 0) matchedTerms++;
        score += termScore;
      }
      if (score === 0) continue;
      // Multi-term queries: reward pages that cover every term, and the exact
      // phrase (built from the filtered terms, so stop words stay neutral).
      if (terms.length > 1) {
        const phrase = terms.join(" ");
        if (matchedTerms === terms.length) score += 10 * terms.length;
        if (titleLc.includes(phrase)) score += 20;
        else if (bodyLc.includes(phrase)) score += 10;
      }
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
    // Classify PDFs by the path's language folder, not the field name.
    // The English edition is citation-authoritative (2026-07-28 flip); the
    // German original stays listed as the source text.
    const paths = [fm.path, fm.en_path].filter((p): p is string => typeof p === "string");
    const de = paths.find((p) => p.includes("/de/"))?.replace(/^\.\.\//, "wiki/");
    const en = paths.find((p) => p.includes("/en/"))?.replace(/^\.\.\//, "wiki/");
    return {
      source_slug: page.slug,
      page_number: parsed.page,
      title: page.title,
      source_page_path: `wiki/${page.path}`,
      pdf: {
        de,
        en,
        authoritative: en
          ? "en (English edition is citation-authoritative; the German original remains the final word on legal wording)"
          : "de (no English edition for this source; the original is citation-authoritative)",
      },
      publisher: typeof fm.publisher === "string" ? fm.publisher : undefined,
      year: typeof fm.year === "number" ? fm.year : undefined,
      note: parsed.page
        ? `The cited claim is on printed page ${parsed.page} of the ${en ? "English" : "German"} PDF. Read the source page (wiki_read_page "${page.slug}") for context; open the PDF only if you must verify the exact wording.`
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

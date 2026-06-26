/**
 * Page validation for the write path — the "check before you commit" gate.
 *
 * Dependency-free and Node-API-free so it runs unchanged in a Cloudflare
 * Worker. It does NOT parse YAML semantically (no engine in the Worker);
 * it checks structure, and it checks the two things an LLM draft most often
 * gets wrong: citations that point at a source that doesn't exist, and
 * [[wikilinks]] to pages that don't exist.
 */
import { extractWikilinks, firstHeading } from "./parse.js";
import { CONTENT_FOLDERS } from "./types.js";
import type { WikiStore } from "./wiki.js";

export interface ValidationResult {
  /** true when there are no blocking errors — safe to commit. */
  ok: boolean;
  path: string;
  /** Blocking problems — wiki_write_page refuses to commit while any exist. */
  errors: string[];
  /** Non-blocking — surface to the user, let them decide. */
  warnings: string[];
  /** Informational notes (citation/link resolution counts). */
  info: string[];
}

/** Visible part of an inline citation: "[(p2-building-permits p. 25)]". */
const CITATION_RE = /\[\(([a-z0-9][a-z0-9-]*)\s+(?:p|S)\.?\s*(\d+)\)\]/gi;

/** Content types where an absence of citations is worth flagging. */
const CITATION_EXPECTED = new Set(["lesson", "synthesis", "project", "regulation"]);

/** Per-page ceiling — keeps any one commit from bloating the hosted bundle. */
const MAX_CONTENT_BYTES = 256 * 1024;

function stripFrontmatter(content: string): string {
  if (!content.startsWith("---")) return content;
  const end = content.indexOf("\n---", 3);
  return end === -1 ? content : content.slice(content.indexOf("\n", end + 1) + 1);
}

export async function validatePage(
  store: WikiStore,
  path: string,
  content: string
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  content = content.replace(/\r\n/g, "\n"); // tolerate Windows line endings
  if (content.length > MAX_CONTENT_BYTES) {
    errors.push(`Page is ${Math.round(content.length / 1024)} KB; the per-page limit is ${MAX_CONTENT_BYTES / 1024} KB. Split it into smaller pages.`);
  }

  // 1 — Path shape: "<content-folder>/<slug>.md".
  let folder = "";
  const rel = path.replace(/^wiki\//, "").replace(/^\/+/, "");
  const parts = rel.split("/");
  if (parts.length !== 2 || !parts[1].endsWith(".md")) {
    errors.push(`Path must be "<folder>/<slug>.md" (e.g. "lessons/integrate-regulation-early.md"); got "${path}".`);
  } else {
    folder = parts[0];
    if (!CONTENT_FOLDERS.includes(folder)) {
      errors.push(`"${folder}/" is not a content folder. Use one of: ${CONTENT_FOLDERS.join(", ")}.`);
    }
    const slug = parts[1].replace(/\.md$/, "");
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      errors.push(`Slug "${slug}" must be kebab-case (lowercase letters, digits, hyphens only).`);
    }
  }

  // 2 — Frontmatter block present and closed.
  if (!content.startsWith("---\n")) {
    errors.push(`Page must open with a YAML frontmatter block ("---" on line 1).`);
  } else {
    const close = content.indexOf("\n---", 4);
    if (close === -1) {
      errors.push(`Frontmatter block is never closed (needs a line that is exactly "---").`);
    } else {
      const fm = content.slice(4, close);
      if (/\t/.test(fm)) errors.push(`Frontmatter contains a tab — YAML forbids tabs; use spaces.`);
      if (!/^title:\s*\S/m.test(fm)) warnings.push(`Frontmatter has no "title:" — the H1 or slug will be used as the title.`);
      if (!/^type:\s*\S/m.test(fm)) warnings.push(`Frontmatter has no "type:".`);
    }
  }

  const body = stripFrontmatter(content);

  // 3 — A heading to render as the title.
  if (!firstHeading(body)) warnings.push(`No H1 ("# …") heading in the body.`);

  // 4 — Citations resolve to a real source page.
  let cites = 0;
  let badCites = 0;
  for (const m of content.matchAll(CITATION_RE)) {
    cites++;
    const src = await store.resolve(m[1]);
    if (!src || src.type !== "source") {
      badCites++;
      warnings.push(`Citation "(${m[1]} p. ${m[2]})" points at no known source page "${m[1]}" — check the slug (wiki_list_pages type=source).`);
    }
  }
  if (cites > 0) info.push(`${cites} inline citation(s); ${cites - badCites} resolve to a known source.`);
  else if (folder && CITATION_EXPECTED.has(folderToType(folder))) {
    warnings.push(`No inline citations found. A ${folderToType(folder)} page should anchor its substantive claims to source pages "[(<source-slug> p. N)](../sources/<source-slug>.md)".`);
  }

  // 5 — Wikilinks resolve.
  const links = extractWikilinks(body);
  const unresolved: string[] = [];
  for (const l of links) {
    if (!(await store.resolve(l.slug))) unresolved.push(l.slug);
  }
  if (links.length > 0) info.push(`${links.length} wikilink(s); ${links.length - unresolved.length} resolve to existing pages.`);
  if (unresolved.length > 0) {
    warnings.push(`Wikilinks with no target page yet (they render as broken links until those pages exist): ${unresolved.join(", ")}.`);
  }

  return { ok: errors.length === 0, path: rel, errors, warnings, info };
}

function folderToType(folder: string): string {
  return folder === "synthesis" ? "synthesis" : folder.replace(/s$/, "");
}

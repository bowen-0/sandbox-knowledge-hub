/** Pure parsing helpers shared by providers and the store. No Node APIs here. */

const WIKILINK_RE = /\[\[([^\]|#\n]+)(#[^\]|\n]*)?(?:\|([^\]\n]*))?\]\]/g;

export interface WikilinkRef {
  slug: string;
  fragment?: string;
}

/** Extract [[wikilink]] targets from a markdown body. Deduplicates by slug. */
export function extractWikilinks(body: string): WikilinkRef[] {
  const seen = new Map<string, WikilinkRef>();
  for (const m of body.matchAll(WIKILINK_RE)) {
    const slug = m[1].trim();
    if (!slug) continue;
    if (!seen.has(slug)) {
      seen.set(slug, {
        slug,
        fragment: m[2] ? m[2].slice(1) : undefined,
      });
    }
  }
  return [...seen.values()];
}

export interface CitationRef {
  sourceSlug: string;
  page?: number;
}

/**
 * Parse a citation reference in the wiki's accepted forms:
 *   "p2-building-permits#page-25"
 *   "p2-building-permits p. 25" / "p2-building-permits p.25" / "... S. 25"
 *   "p2-building-permits" (whole source)
 */
export function parseCitation(ref: string): CitationRef | null {
  const trimmed = ref.trim();
  let m = trimmed.match(/^([a-z0-9][a-z0-9-]*)#page-(\d+)$/i);
  if (m) return { sourceSlug: m[1], page: Number(m[2]) };
  m = trimmed.match(/^([a-z0-9][a-z0-9-]*)[,\s]+(?:p|S)\.?\s*(\d+)$/i);
  if (m) return { sourceSlug: m[1], page: Number(m[2]) };
  m = trimmed.match(/^([a-z0-9][a-z0-9-]*)$/i);
  if (m) return { sourceSlug: m[1] };
  return null;
}

/** First markdown H1 in a body, if any. */
export function firstHeading(body: string): string | undefined {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : undefined;
}

/** First non-heading, non-callout prose line, trimmed to a length budget. */
export function firstProseLine(body: string, maxLen = 200): string {
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#") || line.startsWith(">") || line.startsWith("|")) continue;
    if (line.startsWith("---") || line.startsWith("```")) continue;
    return line.length > maxLen ? line.slice(0, maxLen - 1) + "…" : line;
  }
  return "";
}

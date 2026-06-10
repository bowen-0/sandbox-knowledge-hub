/** One wiki page: a markdown file with YAML frontmatter. */
export interface WikiPage {
  /** Kebab-case identifier: filename without .md. Unique across the wiki. */
  slug: string;
  /**
   * Page type: the folder it lives in, singular ("project", "concept",
   * "regulation", "stakeholder", "lesson", "source", "synthesis"),
   * or "meta" for the root files (index, README, QUERY, INGEST,
   * CONVENTIONS, CONTRIBUTING).
   */
  type: string;
  /** Path relative to the wiki root, e.g. "lessons/integrate-regulation-early.md". */
  path: string;
  /** Human-readable title (frontmatter title, or H1, or slug). */
  title: string;
  /** Parsed YAML frontmatter. Empty object for meta pages without frontmatter. */
  frontmatter: Record<string, unknown>;
  /** Markdown body without the frontmatter block. */
  body: string;
}

/** Where pages come from: live filesystem (local) or a prebuilt bundle (hosted). */
export interface WikiProvider {
  getPages(): Promise<WikiPage[]>;
}

/** Folder name -> page type. "synthesis" is already singular; never strip suffixes. */
export const FOLDER_TO_TYPE: Record<string, string> = {
  projects: "project",
  concepts: "concept",
  regulations: "regulation",
  stakeholders: "stakeholder",
  lessons: "lesson",
  sources: "source",
  synthesis: "synthesis",
};

/** The folder names that hold content pages. */
export const CONTENT_FOLDERS = Object.keys(FOLDER_TO_TYPE);

/** Normalise a user-supplied type filter ("lessons", "lesson") to a page type. */
export function normalizeType(input: string): string {
  const lc = input.toLowerCase().trim();
  return FOLDER_TO_TYPE[lc] ?? lc;
}

/** Root markdown files exposed as meta pages. */
export const META_PAGES = [
  "index",
  "README",
  "QUERY",
  "INGEST",
  "CONVENTIONS",
  "CONTRIBUTING",
] as const;

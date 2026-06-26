import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename } from "node:path";
import matter from "gray-matter";
import { CONTENT_FOLDERS, FOLDER_TO_TYPE, META_PAGES, type WikiPage, type WikiProvider } from "./types.js";
import { firstHeading } from "./parse.js";

const CACHE_TTL_MS = 10_000;

/**
 * Frontmatter parser options that DISABLE gray-matter's executable engines.
 * gray-matter's default `javascript`/`js` engine `eval()`s a `---js` block —
 * arbitrary code execution at build time on whatever content is in the repo.
 * Force YAML and make the JS engines throw, so no page content can ever reach
 * an eval, no matter how the file got into the repo.
 */
const denyExecEngine = () => {
  throw new Error("Executable frontmatter (---js) is disabled.");
};
const SAFE_MATTER_OPTIONS = {
  language: "yaml",
  engines: { javascript: denyExecEngine, js: denyExecEngine },
} as unknown as Parameters<typeof matter>[1];

/**
 * Reads the wiki live from the filesystem. Used by the stdio server and the
 * node HTTP server, where the wiki folder sits next to the process.
 *
 * Pages are slug-addressed only — callers can never pass a path, so the
 * provider cannot be walked out of the wiki root.
 */
export class FsWikiProvider implements WikiProvider {
  private cache: { pages: WikiPage[]; at: number } | null = null;

  constructor(private readonly wikiRoot: string) {}

  async getPages(): Promise<WikiPage[]> {
    if (this.cache && Date.now() - this.cache.at < CACHE_TTL_MS) {
      return this.cache.pages;
    }
    const pages: WikiPage[] = [];

    for (const folder of CONTENT_FOLDERS) {
      const dir = join(this.wikiRoot, folder);
      let entries: string[];
      try {
        entries = await readdir(dir);
      } catch {
        continue; // folder absent — tolerate partial wikis
      }
      for (const entry of entries) {
        if (!entry.endsWith(".md")) continue;
        const filePath = join(dir, entry);
        const st = await stat(filePath);
        if (!st.isFile()) continue;
        pages.push(await this.loadPage(filePath, `${folder}/${entry}`, FOLDER_TO_TYPE[folder]));
      }
    }

    for (const meta of META_PAGES) {
      const filePath = join(this.wikiRoot, `${meta}.md`);
      try {
        const st = await stat(filePath);
        if (!st.isFile()) continue;
      } catch {
        continue;
      }
      pages.push(await this.loadPage(filePath, `${meta}.md`, "meta"));
    }

    this.cache = { pages, at: Date.now() };
    return pages;
  }

  private async loadPage(filePath: string, relPath: string, type: string): Promise<WikiPage> {
    const raw = await readFile(filePath, "utf8");
    let frontmatter: Record<string, unknown> = {};
    let body = raw;
    try {
      const parsed = matter(raw, SAFE_MATTER_OPTIONS);
      frontmatter = (parsed.data ?? {}) as Record<string, unknown>;
      body = parsed.content;
    } catch {
      // Unparseable frontmatter: serve the raw page rather than dropping it.
    }
    const slug = basename(relPath, ".md");
    const title =
      (typeof frontmatter.title === "string" && frontmatter.title) ||
      firstHeading(body) ||
      slug;
    return { slug, type, path: relPath, title, frontmatter, body };
  }
}

import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Locate the wiki folder, in order:
 *  1. --wiki <path> CLI argument
 *  2. WIKI_ROOT environment variable
 *  3. a wiki/ folder walking up from cwd
 *  4. the wiki/ folder sitting next to this package (repo layout)
 * A folder counts as a wiki when it contains CONVENTIONS.md.
 */
export function findWikiRoot(argv: string[] = process.argv): string {
  const flagIdx = argv.indexOf("--wiki");
  if (flagIdx !== -1 && argv[flagIdx + 1]) {
    const fromFlag = resolve(argv[flagIdx + 1]);
    if (isWiki(fromFlag)) return fromFlag;
    throw new Error(`--wiki path is not a wiki folder (no CONVENTIONS.md): ${fromFlag}`);
  }
  if (process.env.WIKI_ROOT) {
    const fromEnv = resolve(process.env.WIKI_ROOT);
    if (isWiki(fromEnv)) return fromEnv;
    throw new Error(`WIKI_ROOT is not a wiki folder (no CONVENTIONS.md): ${fromEnv}`);
  }
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (isWiki(join(dir, "wiki"))) return join(dir, "wiki");
    if (isWiki(dir)) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  const packageSibling = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "wiki");
  if (isWiki(packageSibling)) return packageSibling;
  throw new Error(
    "Could not locate the wiki folder. Pass --wiki <path> or set WIKI_ROOT to the folder containing CONVENTIONS.md."
  );
}

function isWiki(dir: string): boolean {
  return existsSync(join(dir, "CONVENTIONS.md"));
}

/**
 * Compile the wiki into a single JSON bundle for hosted deployments
 * (Cloudflare Workers and anything else without a filesystem).
 * PDFs are deliberately excluded: the bundle carries pages, not blobs.
 *
 * Usage: npx tsx scripts/build-bundle.ts [wiki-root] [out-file]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { FsWikiProvider } from "../src/fs-provider.js";

const here = dirname(fileURLToPath(import.meta.url));
const wikiRoot = resolve(process.argv[2] ?? join(here, "..", "..", "wiki"));
const outFile = resolve(process.argv[3] ?? join(here, "..", "dist", "wiki-bundle.json"));

const pages = await new FsWikiProvider(wikiRoot).getPages();
const bundle = {
  generated: new Date().toISOString(),
  pageCount: pages.length,
  pages,
};

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(bundle), "utf8");
const kb = Math.round(Buffer.byteLength(JSON.stringify(bundle)) / 1024);
console.log(`wiki bundle: ${pages.length} pages, ${kb} KB -> ${outFile}`);

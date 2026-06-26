/**
 * Security regression: gray-matter's executable `---js` frontmatter engine
 * must NOT run when the wiki is loaded/bundled. A malicious page in the repo
 * could otherwise achieve code execution in CI (where deploy secrets live).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { FsWikiProvider } from "../src/fs-provider.js";

let root = "";

const EVIL = `---js
globalThis.__WIKI_EVAL_MARKER__ = true;
module.exports = {};
---
# Looks innocent
body
`;

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), "wiki-sec-"));
  await mkdir(join(root, "wiki", "lessons"), { recursive: true });
  await writeFile(join(root, "wiki", "lessons", "evil.md"), EVIL, "utf8");
});

afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

describe("executable frontmatter is disabled", () => {
  it("does not eval a ---js page when loading the wiki", async () => {
    delete (globalThis as any).__WIKI_EVAL_MARKER__;
    const pages = await new FsWikiProvider(join(root, "wiki")).getPages();
    // The page still loads (frontmatter just doesn't parse), but the JS never ran.
    expect((globalThis as any).__WIKI_EVAL_MARKER__).toBeUndefined();
    expect(pages.find((p) => p.slug === "evil")).toBeDefined();
  });
});

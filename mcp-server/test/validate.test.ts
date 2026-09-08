import { describe, expect, it } from "vitest";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { FsWikiProvider } from "../src/fs-provider.js";
import { WikiStore } from "../src/wiki.js";
import { validatePage } from "../src/validate.js";

const WIKI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "wiki");
const store = new WikiStore(new FsWikiProvider(WIKI_ROOT));

const GOOD = `---
title: Test Lesson
type: lesson
insight_domain: ai-deployment
---

# Test Lesson

A claim anchored to a real source [(p2-building-permits p. 10)](../sources/p2-building-permits.md), linking to [[building-permits]].
`;

describe("validatePage", () => {
  it("passes a well-formed page (real citation + real wikilink)", async () => {
    const r = await validatePage(store, "lessons/test-lesson.md", GOOD);
    expect(r.ok).toBe(true);
    expect(r.errors).toEqual([]);
  });

  it("errors on a bad path shape", async () => {
    const r = await validatePage(store, "test-lesson", GOOD);
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/<folder>\/<slug>\.md/);
  });

  it("errors on a non-content folder", async () => {
    const r = await validatePage(store, "pdfs/test.md", GOOD);
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/not a content folder/);
  });

  it("errors when frontmatter is missing", async () => {
    const r = await validatePage(store, "lessons/x.md", "# No frontmatter here\n\nbody");
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/frontmatter block/i);
  });

  it("errors on an unclosed frontmatter block", async () => {
    const r = await validatePage(store, "lessons/x.md", "---\ntitle: X\n\n# body");
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/never closed/);
  });

  it("errors on a tab in frontmatter", async () => {
    const r = await validatePage(store, "lessons/x.md", "---\n\ttitle: X\n---\n\n# X\n");
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/tab/);
  });

  it("warns (not errors) on an unresolved citation", async () => {
    const bad = GOOD.replace("p2-building-permits p. 10", "p2-does-not-exist p. 3");
    const r = await validatePage(store, "lessons/x.md", bad);
    expect(r.ok).toBe(true); // warning, not blocking
    expect(r.warnings.join(" ")).toMatch(/no known source page "p2-does-not-exist"/);
  });

  it("counts friendly-label citations, the form the whole corpus is stored in", async () => {
    const friendly = GOOD.replace(
      "[(p2-building-permits p. 10)]",
      "[(Building Permits report, p. 10)]",
    );
    const r = await validatePage(store, "lessons/x.md", friendly);
    expect(r.info.join(" ")).toMatch(/1 inline citation\(s\); 1 resolve/);
    expect(r.warnings.join(" ")).not.toMatch(/No inline citations found/);
  });

  it("counts citations whose source name contains brackets", async () => {
    const overview = GOOD.replace(
      "[(p2-building-permits p. 10)](../sources/p2-building-permits.md)",
      "[(Build & Share (Phase II overview report), p. 26)](../sources/00-overview-phase2-build-and-share.md)",
    );
    const r = await validatePage(store, "lessons/x.md", overview);
    expect(r.info.join(" ")).toMatch(/1 inline citation\(s\); 1 resolve/);
    expect(r.warnings.join(" ")).not.toMatch(/No inline citations found/);
  });

  it("finds citations on every real page that carries them", async () => {
    // The corpus flipped to friendly labels in July; matching the visible label
    // alone made this check silently pass on all of them.
    const pages = ["regulations/eu-ai-act.md", "projects/building-permits.md"];
    for (const rel of pages) {
      const body = readFileSync(join(WIKI_ROOT, rel), "utf8");
      const r = await validatePage(store, rel, body);
      expect(r.warnings.join(" "), rel).not.toMatch(/No inline citations found/);
      expect(r.info.join(" "), rel).toMatch(/inline citation\(s\)/);
    }
  });

  it("warns on an unresolved wikilink", async () => {
    const bad = GOOD.replace("[[building-permits]]", "[[totally-made-up-slug]]");
    const r = await validatePage(store, "lessons/x.md", bad);
    expect(r.ok).toBe(true);
    expect(r.warnings.join(" ")).toMatch(/totally-made-up-slug/);
  });
});

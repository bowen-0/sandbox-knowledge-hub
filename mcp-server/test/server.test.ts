/**
 * Integration tests: real wiki on disk, real MCP client over an in-memory
 * transport pair. What a connecting assistant experiences is what we assert.
 */
import { beforeAll, describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildServer } from "../src/server.js";
import { FsWikiProvider } from "../src/fs-provider.js";
import { WikiStore } from "../src/wiki.js";

const WIKI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "wiki");

function textOf(result: any): string {
  return result.content.map((c: any) => c.text).join("\n");
}

describe("WikiStore on the real wiki", () => {
  const store = new WikiStore(new FsWikiProvider(WIKI_ROOT));

  it("loads the full corpus", async () => {
    const list = await store.list();
    expect(list.length).toBeGreaterThan(80);
    const types = new Set(list.map((p) => p.type));
    for (const t of ["project", "concept", "regulation", "stakeholder", "lesson", "source", "synthesis"]) {
      expect(types).toContain(t);
    }
  });

  it("excludes digests from the page space", async () => {
    const list = await store.list({ type: "source" });
    // digest files share slugs with sources; if they leaked in, sources would double
    expect(list.length).toBe(12);
  });

  it("filters by insight_domain", async () => {
    const ops = await store.list({ insight_domain: "sandbox-operations" });
    expect(ops.length).toBeGreaterThan(0);
    for (const p of ops) expect(["lesson", "synthesis"]).toContain(p.type);
  });

  it("resolves meta pages and content pages", async () => {
    expect(await store.resolve("index")).toBeDefined();
    expect(await store.resolve("QUERY")).toBeDefined();
    expect(await store.resolve("building-permits")).toBeDefined();
    expect(await store.resolve("does-not-exist")).toBeUndefined();
  });

  it("search finds the data-access concept for 'data access'", async () => {
    const hits = await store.search("data access");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.map((h) => h.slug)).toContain("data-access");
  });

  it("connections returns outgoing links and backlinks", async () => {
    const conn = await store.connections("building-permits");
    expect(conn).toBeDefined();
    expect(conn!.outgoing.length).toBeGreaterThan(0);
    expect(conn!.backlinks.length).toBeGreaterThan(0);
  });

  it("resolves page-level citations to source metadata, never PDF content", async () => {
    const res = await store.resolveCitation("p2-building-permits#page-25");
    expect(res).not.toHaveProperty("error");
    if ("error" in res) throw new Error(res.error);
    expect(res.page_number).toBe(25);
    expect(res.pdf.authoritative).toContain("de");
    expect(JSON.stringify(res)).not.toMatch(/%PDF/);
  });

  it("treats infrastructure-maintenance as DE-authoritative (remapped EN→DE 2026-06-25)", async () => {
    const res = await store.resolveCitation("p1-infrastructure-maintenance p. 5");
    if ("error" in res) throw new Error(res.error);
    expect(res.pdf.authoritative).toContain("de");
  });

  it("rewrites citation links to the deep-link endpoint when a citationBaseUrl is set", async () => {
    const linked = new WikiStore(new FsWikiProvider(WIKI_ROOT), "https://hub.example/");
    const r = await linked.read("building-permits");
    if (!r) throw new Error("page not found");
    // Friendly name in the text, link points at /c/<slug>/<page> (trailing slash on the base trimmed).
    expect(r.content).toMatch(/\[\(Building Permits report, p\. \d+\)\]\(https:\/\/hub\.example\/c\/p2-building-permits\/\d+\)/);
    // No portable relative link survives for that citation when a base is set.
    expect(r.content).not.toMatch(/\]\(\.\.\/sources\/p2-building-permits\.md\)/);
  });
});

describe("MCP server end-to-end", () => {
  let client: Client;

  beforeAll(async () => {
    const server = buildServer(new FsWikiProvider(WIKI_ROOT));
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    client = new Client({ name: "test-client", version: "0.0.0" });
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  });

  it("exposes the six tools", async () => {
    const { tools } = await client.listTools();
    const names = tools.map((t) => t.name).sort();
    expect(names).toEqual([
      "wiki_connections",
      "wiki_list_pages",
      "wiki_overview",
      "wiki_read_page",
      "wiki_resolve_citation",
      "wiki_search",
    ]);
  });

  it("wiki_overview explains the two insight domains", async () => {
    const result = await client.callTool({ name: "wiki_overview", arguments: {} });
    const text = textOf(result);
    expect(text).toContain("ai-deployment");
    expect(text).toContain("sandbox-operations");
    expect(text).toContain("page_counts");
  });

  it("wiki_read_page returns a real page", async () => {
    const result = await client.callTool({
      name: "wiki_read_page",
      arguments: { slug: "integrate-regulation-early" },
    });
    const text = textOf(result);
    expect(text).toContain("lessons/integrate-regulation-early.md");
    expect(text.length).toBeGreaterThan(200);
  });

  // Regression guard for the Friday 2026-06-26 serve-time-linkify episode: the
  // linkify rewrote every "[(slug p. N)](../sources/slug.md)" citation into a
  // ~110-char jsDelivr deep link, which made the client model drop citations
  // when summarising. Page numbers must survive serving, and no serve-time
  // transform may linkify them into http(s) URLs. This is what was untested.
  it("wiki_read_page preserves page-numbered citations and never linkifies them", async () => {
    const result = await client.callTool({
      name: "wiki_read_page",
      arguments: { slug: "building-permits" },
    });
    const text = textOf(result);
    // Citations render the friendly source name as visible text, page number kept,
    // and the link target keeps the slug so each citation still maps to its file.
    expect(text).toMatch(/\[\(Building Permits report, p\. \d+\)\]\(\.\.\/sources\/p2-building-permits\.md\)/);
    // The raw slug is no longer the visible citation text.
    expect(text).not.toMatch(/\[\(p2-building-permits p\. \d+\)\]/);
    // No citation was rewritten into an http(s) PDF deep link (the reverted linkify).
    expect(text).not.toContain("jsdelivr");
    expect(text).not.toMatch(/\]\(https?:\/\/[^)]*#page=/);
    // The answer-formatting contract rides with the content, so a client that skips
    // wiki_overview / drops server instructions (Claude Desktop, tool-search mode) still sees it:
    // keep citations verbatim, but render [[wikilinks]] as plain names (they don't render in a chat client).
    expect(text).toContain("Writing your answer");
    expect(text).toContain("plain entity name");
    expect(text).toContain("never literal");
  });

  it("wiki_search returns ranked hits", async () => {
    const result = await client.callTool({
      name: "wiki_search",
      arguments: { query: "building permit", limit: 5 },
    });
    const hits = JSON.parse(textOf(result));
    expect(Array.isArray(hits)).toBe(true);
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0]).toHaveProperty("score");
    expect(hits[0]).toHaveProperty("snippets");
  });

  it("wiki_list_pages filters by type", async () => {
    const result = await client.callTool({
      name: "wiki_list_pages",
      arguments: { type: "lessons" },
    });
    const pages = JSON.parse(textOf(result));
    expect(pages.length).toBeGreaterThanOrEqual(21);
    for (const p of pages) expect(p.type).toBe("lesson");
  });

  it("exposes the procedure files as resources", async () => {
    const { resources } = await client.listResources();
    const uris = resources.map((r) => r.uri);
    expect(uris).toContain("wiki://query-procedure");
    expect(uris).toContain("wiki://index");
    const read = await client.readResource({ uri: "wiki://query-procedure" });
    expect((read.contents[0] as any).text).toContain("Answer from compiled wiki pages");
  });
});

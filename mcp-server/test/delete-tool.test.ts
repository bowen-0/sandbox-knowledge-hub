import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { buildServer } from "../src/server.js";
import type { WikiPage, WikiProvider } from "../src/types.js";
import type { CommitResult, DeleteResult, FileRecord, WikiWriter } from "../src/github-writer.js";
import { mintConfirmation, readConfirmation } from "../src/confirm-token.js";

// A tiny wiki with one page nobody references, one that is referenced, and a
// cited source — so every refusal path has a real case.
function page(slug: string, type: string, body: string, frontmatter: Record<string, unknown> = {}): WikiPage {
  const folder: Record<string, string> = { lesson: "lessons", source: "sources", concept: "concepts", meta: "" };
  const f = folder[type] ?? `${type}s`;
  return { slug, type, path: f ? `${f}/${slug}.md` : `${slug}.md`, title: slug, frontmatter, body };
}
const PAGES: WikiPage[] = [
  page("index", "meta", "- [[linked-lesson]]\n- [[lonely-lesson]]\n- [[cited-source]]\n- [[edge-concept]]"),
  page("linked-lesson", "lesson", "See [[edge-concept]] and [(cited-source p. 3)](../sources/cited-source.md).", { sources: ["cited-source#page-3"] }),
  page("lonely-lesson", "lesson", "Nobody links here."),
  page("cited-source", "source", "A report."),
  page("edge-concept", "concept", "A concept."),
];
const provider: WikiProvider = { getPages: async () => PAGES };

type Files = Record<string, FileRecord>;
function fakeWriter(files: Files) {
  const deletes: Array<{ path: string; sha: string; message: string }> = [];
  const w: WikiWriter & { deletes: typeof deletes; files: Files } = {
    repo: "bowen-0/sandbox-knowledge-hub",
    branch: "main",
    deletes,
    files,
    async getFileSha(p) {
      return files[p]?.sha ?? null;
    },
    async getFile(p) {
      return files[p] ? { ...files[p] } : null;
    },
    async putFile(p, content): Promise<CommitResult> {
      files[p] = { sha: `sha-${Object.keys(files).length}`, content };
      return { committed: true, path: p, action: "updated" };
    },
    async putBinary(p): Promise<CommitResult> {
      return { committed: true, path: p, action: "created" };
    },
    async deleteFile(p, sha, message): Promise<DeleteResult> {
      deletes.push({ path: p, sha, message });
      delete files[p];
      return { deleted: true, path: p, commitSha: "c0ffee", commitUrl: "https://github.com/c/del" };
    },
  };
  return w;
}

function repoFiles(): Files {
  return {
    "wiki/lessons/lonely-lesson.md": { sha: "sha-lonely", content: "---\ntitle: Lonely\ntype: lesson\n---\n\n# Lonely\n\nNobody links here.\n" },
    "wiki/lessons/linked-lesson.md": { sha: "sha-linked", content: "# Linked\n" },
    "wiki/sources/cited-source.md": { sha: "sha-src", content: "# Source\n" },
    "wiki/concepts/edge-concept.md": { sha: "sha-edge", content: "# Concept\n" },
  };
}

async function connect(writer?: WikiWriter, opts: { confirmTtlMs?: number; confirmSecret?: string } = {}) {
  const server = buildServer(provider, { writer, confirmSecret: "test-secret", ...opts });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "t", version: "1" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

const out = async (client: Client, args: Record<string, unknown>) => {
  const r = (await client.callTool({ name: "wiki_delete_page", arguments: args })) as any;
  return JSON.parse(r.content.map((c: any) => c.text).join("\n"));
};

describe("wiki_delete_page", () => {
  it("is absent without a writer", async () => {
    const client = await connect();
    const names = (await client.listTools()).tools.map((t) => t.name);
    expect(names).not.toContain("wiki_delete_page");
  });

  it("is registered as destructive when a writer is present", async () => {
    const client = await connect(fakeWriter(repoFiles()));
    const tool = (await client.listTools()).tools.find((t) => t.name === "wiki_delete_page")!;
    expect(tool).toBeDefined();
    expect(tool.annotations?.destructiveHint).toBe(true);
  });

  it("call 1 previews the live content and mints a token, deleting nothing", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const r = await out(client, { path: "lessons/lonely-lesson.md" });
    expect(r.deleted).toBe(false);
    expect(r.deletable).toBe(true);
    expect(r.preview).toBe(w.files["wiki/lessons/lonely-lesson.md"].content);
    expect(r.sha).toBe("sha-lonely");
    expect(r.also_listed_in).toEqual(["index"]); // index links it, but a meta page does not block
    expect(typeof r.confirmation_token).toBe("string");
    expect(w.deletes.length).toBe(0);
    expect(w.files["wiki/lessons/lonely-lesson.md"]).toBeDefined();
  });

  it("refuses to preview a page that a content page still wikilinks", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const r = await out(client, { path: "concepts/edge-concept.md" });
    expect(r.deletable).toBe(false);
    expect(r.reason).toBe("referenced");
    expect(r.referenced_by.map((x: any) => x.slug)).toEqual(["linked-lesson"]);
    expect(r.referenced_by[0].via).toContain("wikilink");
    expect(r.confirmation_token).toBeUndefined();
    expect(w.deletes.length).toBe(0);
  });

  it("refuses to preview a source that is still cited (citation + frontmatter edge)", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const r = await out(client, { path: "sources/cited-source.md" });
    expect(r.reason).toBe("referenced");
    const ref = r.referenced_by.find((x: any) => x.slug === "linked-lesson");
    expect(ref.via).toContain("citation");
    expect(ref.via).toContain("frontmatter:sources");
    expect(w.deletes.length).toBe(0);
  });

  it("call 2 with the minted token deletes and returns the deleted content", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const preview = await out(client, { path: "lessons/lonely-lesson.md" });
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: preview.confirmation_token });
    expect(r.deleted).toBe(true);
    expect(r.deleted_content).toBe(preview.preview);
    expect(r.commitSha).toBe("c0ffee");
    expect(r.revert).toBe("git revert c0ffee");
    expect(r.note).toContain("index");
    expect(w.deletes).toEqual([{ path: "wiki/lessons/lonely-lesson.md", sha: "sha-lonely", message: "wiki: delete lessons/lonely-lesson.md (via write-MCP)" }]);
    expect(w.files["wiki/lessons/lonely-lesson.md"]).toBeUndefined();
  });

  it("refuses a tampered token", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const preview = await out(client, { path: "lessons/lonely-lesson.md" });
    const [payload, sig] = preview.confirmation_token.split(".");
    const flipped = sig.slice(0, -1) + (sig.endsWith("A") ? "B" : "A");
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: `${payload}.${flipped}` });
    expect(r.deleted).toBe(false);
    expect(r.reason).toBe("bad_token");
    expect(w.deletes.length).toBe(0);
  });

  it("refuses a token minted under a different secret", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const forged = await mintConfirmation("other-secret", { path: "lessons/lonely-lesson.md", sha: "sha-lonely", exp: Date.now() + 60_000 });
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: forged });
    expect(r.reason).toBe("bad_token");
    expect(w.deletes.length).toBe(0);
  });

  it("refuses a token issued for another path", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const token = await mintConfirmation("test-secret", { path: "lessons/other.md", sha: "sha-lonely", exp: Date.now() + 60_000 });
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: token });
    expect(r.reason).toBe("token_path_mismatch");
    expect(w.deletes.length).toBe(0);
  });

  it("refuses when the page changed after the preview", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const preview = await out(client, { path: "lessons/lonely-lesson.md" });
    w.files["wiki/lessons/lonely-lesson.md"] = { sha: "sha-lonely-v2", content: "# edited since\n" };
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: preview.confirmation_token });
    expect(r.deleted).toBe(false);
    expect(r.reason).toBe("changed_since_preview");
    expect(w.deletes.length).toBe(0);
  });

  it("refuses an expired token", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w, { confirmTtlMs: -1 });
    const preview = await out(client, { path: "lessons/lonely-lesson.md" });
    const r = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: preview.confirmation_token });
    expect(r.reason).toBe("token_expired");
    expect(w.deletes.length).toBe(0);
  });

  it("refuses PDFs, root files and traversal-shaped paths", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    for (const path of ["pdfs/en/foo.pdf", "index.md", "../lessons/x.md", "lessons/../x.md", "lessons/Bad_Slug.md", "wiki/lessons"]) {
      const r = await out(client, { path });
      expect(r.reason, path).toBe("bad_path");
    }
    expect(w.deletes.length).toBe(0);
  });

  it("refuses a page that is not in the repository", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const r = await out(client, { path: "lessons/never-existed.md" });
    expect(r.reason).toBe("not_found");
    expect(w.deletes.length).toBe(0);
  });

  it("the same token cannot delete twice", async () => {
    const w = fakeWriter(repoFiles());
    const client = await connect(w);
    const preview = await out(client, { path: "lessons/lonely-lesson.md" });
    const first = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: preview.confirmation_token });
    expect(first.deleted).toBe(true);
    const second = await out(client, { path: "lessons/lonely-lesson.md", confirmation_token: preview.confirmation_token });
    expect(second.deleted).toBe(false);
    expect(second.reason).toBe("not_found");
    expect(w.deletes.length).toBe(1);
  });
});

describe("confirmation tokens", () => {
  it("round-trip under the same secret", async () => {
    const claims = { path: "lessons/a.md", sha: "abc", exp: 1234 };
    const t = await mintConfirmation("k", claims);
    expect(await readConfirmation("k", t)).toEqual(claims);
  });
  it("reject malformed input", async () => {
    expect(await readConfirmation("k", "")).toBeNull();
    expect(await readConfirmation("k", "nodot")).toBeNull();
    expect(await readConfirmation("k", "abc.")).toBeNull();
    expect(await readConfirmation("k", ".abc")).toBeNull();
  });
});

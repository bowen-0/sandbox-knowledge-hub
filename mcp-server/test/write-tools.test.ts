import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildServer } from "../src/server.js";
import { FsWikiProvider } from "../src/fs-provider.js";
import type { CommitResult, WikiWriter } from "../src/github-writer.js";

const WIKI_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "wiki");

function fakeWriter(): WikiWriter & { calls: Array<{ path: string; content: string; message: string }> } {
  const calls: Array<{ path: string; content: string; message: string }> = [];
  return {
    repo: "bowen-0/sandbox-knowledge-hub",
    branch: "main",
    calls,
    async getFileSha() {
      return null;
    },
    async putFile(path, content, message): Promise<CommitResult> {
      calls.push({ path, content, message });
      return { committed: true, path, action: "created", commitUrl: "https://github.com/c/x" };
    },
  };
}

async function connect(writer?: WikiWriter) {
  const server = buildServer(new FsWikiProvider(WIKI_ROOT), { writer });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "t", version: "1" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

const textOf = (r: any): string => r.content.map((c: any) => c.text).join("\n");

const VALID = `---
title: T
type: lesson
---

# T

Claim [(p2-building-permits p. 10)](../sources/p2-building-permits.md), see [[building-permits]].
`;

describe("write tools", () => {
  it("are absent without a writer", async () => {
    const client = await connect();
    const names = (await client.listTools()).tools.map((t) => t.name);
    expect(names).not.toContain("wiki_write_page");
    expect(names).not.toContain("wiki_validate_page");
  });

  it("are present with a writer", async () => {
    const client = await connect(fakeWriter());
    const names = (await client.listTools()).tools.map((t) => t.name);
    expect(names).toContain("wiki_validate_page");
    expect(names).toContain("wiki_write_page");
    expect(names).toContain("wiki_write_info");
  });

  it("refuses to commit a draft with blocking errors", async () => {
    const w = fakeWriter();
    const client = await connect(w);
    const r = await client.callTool({
      name: "wiki_write_page",
      arguments: { path: "not-a-path", content: "no frontmatter" },
    });
    const out = JSON.parse(textOf(r));
    expect(out.committed).toBe(false);
    expect(out.reason).toBe("validation_failed");
    expect(w.calls.length).toBe(0);
  });

  it("commits a valid draft through the writer", async () => {
    const w = fakeWriter();
    const client = await connect(w);
    const r = await client.callTool({
      name: "wiki_write_page",
      arguments: { path: "lessons/zzz-test.md", content: VALID },
    });
    const out = JSON.parse(textOf(r));
    expect(out.committed).toBe(true);
    expect(w.calls.length).toBe(1);
    expect(w.calls[0].path).toBe("wiki/lessons/zzz-test.md");
  });
});

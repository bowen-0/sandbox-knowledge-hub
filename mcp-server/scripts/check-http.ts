/** Read-only protocol, content, and authorization checks against real HTTP handlers. */
import assert from "node:assert/strict";
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { Client as LegacyClient } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport as LegacyTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const [readUrl, writeUrl] = process.argv.slice(2);
assert(readUrl, "usage: tsx scripts/check-http.ts READ_URL [WRITE_URL]");
const writeToken = process.env.MCP_TEST_WRITE_TOKEN;

function textOf(result: any): string {
  return result.content.map((part: any) => part.text ?? "").join("\n");
}

async function bodyOf(response: Response): Promise<any> {
  const text = await response.text();
  if (!text) return undefined;
  if (response.headers.get("content-type")?.includes("text/event-stream")) {
    const data = text.split("\n").filter(line => line.startsWith("data: "));
    return JSON.parse(data.at(-1)!.slice(6));
  }
  return JSON.parse(text);
}

async function modernPost(url: string, method: string, params: object = {}, token?: string) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2026-07-28",
      "Mcp-Method": method,
      ...(method === "tools/call" ? { "Mcp-Name": (params as any).name } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method,
      params: {
        ...params,
        _meta: {
          "io.modelcontextprotocol/protocolVersion": "2026-07-28",
          "io.modelcontextprotocol/clientCapabilities": {},
          "io.modelcontextprotocol/clientInfo": { name: "sandbox-protocol-check", version: "1.0" },
        },
      },
    }),
  });
}

async function checkEndpoint(url: string, writable: boolean, token?: string) {
  const requestInit = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const rawList = await modernPost(url, "tools/list", {}, token);
  assert.equal(rawList.status, 200);
  assert.equal(rawList.headers.get("mcp-session-id"), null);
  const list = await bodyOf(rawList);
  assert.equal(list.result.resultType, "complete");
  assert.equal(list.result.tools.length, writable ? 10 : 6);
  assert.equal(list.result.tools.some((tool: any) => tool.name === "wiki_write_page"), writable);
  // A client connected before deployment may keep sending its former session ID.
  const continuing = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", Accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2025-03-26", "Mcp-Session-Id": "pre-migration-session",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }),
  });
  assert.equal(continuing.status, 200);
  assert.equal((await bodyOf(continuing)).result.tools.length, writable ? 10 : 6);

  const modern = new Client({ name: "sandbox-modern-check", version: "1.0" });
  const legacy = new LegacyClient({ name: "sandbox-legacy-check", version: "1.0" });
  try {
    await modern.connect(new StreamableHTTPClientTransport(new URL(url), { requestInit }));
    await legacy.connect(new LegacyTransport(new URL(url), { requestInit }));
    assert.equal(modern.getServerVersion()?.version, "0.2.0");
    assert.equal(legacy.getServerVersion()?.version, "0.2.0");
    assert.equal((await modern.listTools()).tools.length, writable ? 10 : 6);
    assert.equal((await legacy.listTools()).tools.length, writable ? 10 : 6);
    for (const args of [
      { name: "wiki_overview", arguments: {} },
      { name: "wiki_search", arguments: { query: "data access", limit: 3 } },
      { name: "wiki_read_page", arguments: { slug: "building-permits" } },
      { name: "wiki_connections", arguments: { slug: "building-permits" } },
      { name: "wiki_resolve_citation", arguments: { citation: "p2-building-permits#page-22" } },
    ]) {
      const a = await modern.callTool(args);
      const b = await legacy.callTool(args);
      assert.notEqual(a.isError, true, args.name);
      assert.notEqual(b.isError, true, args.name);
      assert.equal(textOf(a), textOf(b), `${args.name}: client versions must see the same content`);
      assert(textOf(a).length > 40, `${args.name}: result must contain real content`);
    }
    const page = textOf(await modern.callTool({ name: "wiki_read_page", arguments: { slug: "building-permits" } }));
    assert.match(page, /Building Permits report, p\. \d+/);
    assert.match(page, /Writing your answer/);
    assert.equal((await modern.listResources()).resources.length, 4);
    const procedure = await modern.readResource({ uri: "wiki://query-procedure" });
    assert.match((procedure.contents[0] as any).text, /Answer from compiled wiki pages/);
    if (writable) {
      const result = await modern.callTool({ name: "wiki_write_page", arguments: { path: "../forbidden.md", content: "invalid" } });
      const rejected = JSON.parse(textOf(result));
      assert.equal(rejected.committed, false);
      assert.equal(rejected.reason, "validation_failed");
    }
  } finally {
    await Promise.all([modern.close(), legacy.close()]);
  }
  const evilOrigin = await fetch(url, {
    method: "OPTIONS",
    headers: { Origin: "https://hostile.invalid", "Access-Control-Request-Method": "POST" },
  });
  assert.equal(evilOrigin.status, 403);
  const discovery = new URL("/.well-known/oauth-authorization-server", url);
  assert.equal((await fetch(discovery)).status, 404);
  console.log(`${writable ? "write" : "read"}: modern + legacy clients, content parity, citations, resources, and origin checks passed`);
}

await checkEndpoint(readUrl, false);
const citation = await fetch(new URL("/c/p2-building-permits/22", readUrl), { redirect: "manual" });
assert.equal(citation.status, 302);
assert.match(citation.headers.get("location")!, /#page=22$/);
assert.equal((await fetch(new URL("/c/not-a-source/22", readUrl))).status, 404);

if (writeUrl) {
  assert(writeToken, "MCP_TEST_WRITE_TOKEN is required for the write endpoint");
  assert.equal((await modernPost(writeUrl, "tools/list")).status, 401);
  assert.equal((await modernPost(writeUrl, "tools/list", {}, "invalid-token")).status, 401);
  await checkEndpoint(writeUrl, true, writeToken);
}
console.log("HTTP checks passed. No valid content was written.");

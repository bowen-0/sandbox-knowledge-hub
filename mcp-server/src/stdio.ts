#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildServer } from "./server.js";
import { FsWikiProvider } from "./fs-provider.js";
import { findWikiRoot } from "./wiki-root.js";

async function main() {
  const wikiRoot = findWikiRoot();
  const server = buildServer(new FsWikiProvider(wikiRoot));
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout belongs to the protocol; stderr is the only safe log channel.
  console.error(`sandbox-knowledge-hub MCP server running (wiki: ${wikiRoot})`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

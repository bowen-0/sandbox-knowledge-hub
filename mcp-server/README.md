# Sandbox Knowledge Hub — MCP Server

Exposes the wiki to any MCP-capable AI assistant through one connection. Six read-only tools, plus the wiki's procedure files as resources. Serves wiki pages, never PDF blobs (the reports overload LLM context windows; pages are the right grain).

| Tool | What it does |
|---|---|
| `wiki_overview` | Orientation: contents, the two insight domains, retrieval routing. Call first. |
| `wiki_list_pages` | Inventory with filters: type, `insight_domain`, sector, phase, `cross_cutting`, priority. |
| `wiki_read_page` | Full markdown of one page by slug. |
| `wiki_search` | Ranked full-text search with snippets. |
| `wiki_connections` | Graph around a page: wikilinks out, typed frontmatter edges, backlinks. |
| `wiki_resolve_citation` | `slug#page-N` → source metadata + PDF locations (German is authoritative). |

Resources: `wiki://query-procedure`, `wiki://conventions`, `wiki://index`, `wiki://ingest-procedure`.

## Local (stdio)

```bash
npm install && npm run build

# Claude Code
claude mcp add sandbox-hub -- node /absolute/path/to/mcp-server/dist/stdio.js

# Claude Desktop / any stdio client — command:
node /absolute/path/to/mcp-server/dist/stdio.js
```

The server finds the wiki automatically when run from this repo. Elsewhere, pass `--wiki /path/to/wiki` or set `WIKI_ROOT`.

## Hosted

**Any node host:**

```bash
npm run start:http        # stateless Streamable HTTP on :3920/mcp
```

**Cloudflare Workers (free tier):** the `worker/` folder is a ready-to-deploy variant that bundles the wiki into the artifact (`npm run bundle` produces `dist/wiki-bundle.json`, ~340 KB — pages only, no PDFs):

```bash
cd worker && npm install
npm run deploy            # wrangler deploy; endpoint: https://<worker>.workers.dev/mcp
```

Remote clients connect with the URL — e.g. `claude mcp add --transport http sandbox-hub https://<worker>.workers.dev/mcp`.

## Development

```bash
npm test                  # vitest: unit + end-to-end over the real wiki
npm run typecheck
npm run dev               # stdio server from TypeScript source (tsx)
```

`src/server.ts` is the single source of truth for tools; the stdio entry, the node HTTP server, and the Worker all build from it. Page access goes through a provider interface: `FsWikiProvider` (live filesystem) or `BundleWikiProvider` (prebuilt JSON for hosts without a filesystem).

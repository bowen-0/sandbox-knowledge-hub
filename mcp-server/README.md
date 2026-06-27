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

## Write endpoint (the update path)

A **separate** worker (`worker/write.ts`, `worker/wrangler-write.jsonc`) exposes the six read tools **plus** three write tools, so the Sandbox team can update the wiki from any chat app without touching GitHub. The public read endpoint stays open and read-only; the write endpoint is gated.

| Write tool | What it does |
|---|---|
| `wiki_validate_page` | Dry-run check of a draft: path shape, frontmatter, an H1, every citation resolves to a real source, every `[[wikilink]]` has a target. No write. |
| `wiki_write_page` | Validates, then commits the page to the repo's `main` (create or update). Refuses drafts with blocking errors. |
| `wiki_add_source_pdf` | Fetches a report PDF from a public https URL and commits it under `wiki/pdfs/de\|en/` (server-side — the bytes never go through the chat). Use first when adding a new report, so its citations resolve. |
| `wiki_write_info` | Explains the workflow and guardrails. |

Adding a brand-new report is therefore fully self-service from chat: `wiki_add_source_pdf` with the report's public URL, then write its source/digest/lesson pages. (A PDF that isn't online yet can't be fetched — drag it into `wiki/pdfs/` on GitHub instead.)

How it works: the worker holds a GitHub token (a secret, never seen by the AI client) and commits via the GitHub Contents API. A push triggers the `deploy-mcp` GitHub Action, which rebuilds the bundle and redeploys both workers — so a chat-app edit goes live on the read endpoint a minute or two later. The drafting assistant is told to validate, show the user, and get approval before writing.

**Security model.** Fail-closed: with no `WRITE_TOKEN` set the endpoint returns 503; with a token set, a request must present it (`?key=<token>` or `Authorization: Bearer <token>`) or it gets 401 (constant-time compared). With no `GITHUB_TOKEN` the endpoint serves read-only (the write tools aren't even registered). The path is validated and traversal-guarded, content is size-capped, and the GitHub token never leaves the Worker. Commits are plain git — anything is revertable. The `?key=` form puts the token in the URL, so treat the URL as a secret; rotate by re-running `secret put WRITE_TOKEN` if it leaks, or use the `Authorization: Bearer` form where the client supports it.

**Activate (one-time, repo owner):**
```bash
cd mcp-server/worker
npx wrangler secret put WRITE_TOKEN  -c wrangler-write.jsonc   # a long random string you share with the team
npx wrangler secret put GITHUB_TOKEN -c wrangler-write.jsonc   # fine-grained PAT, Contents:read+write on this repo only
npm run deploy:write
```
Optional secrets: `GITHUB_OWNER` / `GITHUB_REPO` / `GITHUB_BRANCH` (default `bowen-0` / `sandbox-knowledge-hub` / `main`). For the auto-redeploy Action, also set the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

Then share with the team: `https://sandbox-knowledge-hub-write.<account>.workers.dev/mcp?key=<WRITE_TOKEN>`.

Deploy both workers at once: `cd worker && npm run deploy:all`.

## Development

```bash
npm test                  # vitest: unit + end-to-end over the real wiki
npm run typecheck
npm run dev               # stdio server from TypeScript source (tsx)
```

`src/server.ts` is the single source of truth for tools; the stdio entry, the node HTTP server, and the Worker all build from it. Page access goes through a provider interface: `FsWikiProvider` (live filesystem) or `BundleWikiProvider` (prebuilt JSON for hosts without a filesystem).

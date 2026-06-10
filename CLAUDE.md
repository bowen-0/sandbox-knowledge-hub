# Sandbox Knowledge Hub — agent rules

The knowledge layer of the Zurich AI Innovation Sandbox: a citable wiki (`wiki/`) compiled from the sandbox's published reports, plus an MCP server (`mcp-server/`) exposing it to AI assistants.

## Durable rules

1. **The wiki is the source of truth; the German PDFs are the ground truth.** Never modify anything under `wiki/pdfs/`. Answer questions from wiki pages, not training data (`wiki/QUERY.md` is the contract).
2. **Citations are page-level and verified.** `slug#page-N` in frontmatter, `[(slug p. N)](../sources/slug.md)` inline, page numbers checked against the German PDF (`p1-infrastructure-maintenance` is EN-only). Never write `#para-N` — that spec is dormant (`wiki/CONVENTIONS.md` §6).
3. **Never conflate the two insight domains.** Lessons and synthesis pages carry `insight_domain: ai-deployment | sandbox-operations | both`; `both` requires the domain callouts fencing the audiences. Programme-operating advice is not deployment advice, even when the sentences sound alike.
4. **German verbatim quotes stay German**, copied character-for-character from the PDF; translation goes in the surrounding prose. Never back-translate or reconstruct.
5. **Ingest is collaborative.** New sources go through `wiki/INGEST.md` (READ → PLAN → EXECUTE → BOOKKEEP) with user approval after READ and PLAN. Never auto-run it.
6. **Run lint before committing wiki changes**: `node scripts/lint.mjs` (setup: `cd mcp-server && npm install && npm run build`). Errors block; warnings are judgement calls.
7. **Commits are deliberate.** `git add` specific paths, never `-A`. One ingest = one commit.
8. **Content correctness belongs to the sandbox team.** Structure, citations, and conventions are the agent's job; whether an insight is right is theirs. Don't rewrite findings during editorial work.

## Layout

`wiki/` — the substrate (see `wiki/README.md`) · `mcp-server/` — MCP server, tests in `mcp-server/test/` · `scripts/lint.mjs` — health check · `UPDATING.md` — maintainer one-pager · `internal/` — gitignored engagement context, never publish or reference in client-facing artifacts.

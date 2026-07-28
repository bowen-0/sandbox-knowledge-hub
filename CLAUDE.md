# Sandbox Knowledge Hub — agent rules

The knowledge layer of the Zurich AI Innovation Sandbox: a citable wiki (`wiki/`) compiled from the sandbox's published reports, plus an MCP server (`mcp-server/`) exposing it to AI assistants.

## Durable rules

1. **The wiki is the source of truth; the report PDFs are the ground truth.** The English editions (`wiki/pdfs/en/`) are citation-authoritative; the German originals (`wiki/pdfs/de/`) stay in-repo and remain the final word on legal wording. Never modify anything under `wiki/pdfs/`. Answer questions from wiki pages, not training data (`wiki/QUERY.md` is the contract).
2. **Citations are page-level and verified.** `slug#page-N` in frontmatter; inline cites carry the source's `cite_as` label, `[(Building Permits report, p. N)](../sources/slug.md)`, page numbers checked against the English-edition PDF. Never write `#para-N` — that spec is dormant (`wiki/CONVENTIONS.md` §6).
3. **Never conflate the two insight domains.** Lessons and synthesis pages carry `insight_domain: ai-deployment | sandbox-operations | both`; `both` requires the domain callouts fencing the audiences. Programme-operating advice is not deployment advice, even when the sentences sound alike.
4. **Quotes come from the official English edition**, copied character-for-character; quotation marks are reserved for exact EN-edition text. A source with no official English edition is quoted in its original language, glosses tagged "(translation ours)". Never write your own translation inside quotation marks.
5. **Ingest is collaborative.** New sources go through `wiki/INGEST.md` (READ → PLAN → EXECUTE → BOOKKEEP) with user approval after READ and PLAN. Never auto-run it.
6. **Run lint before committing wiki changes**: `node scripts/lint.mjs` (setup: `cd mcp-server && npm install && npm run build`). Errors block; warnings are judgement calls.
7. **Commits are deliberate.** `git add` specific paths, never `-A`. One ingest = one commit.
8. **Content correctness belongs to the sandbox team.** Structure, citations, and conventions are the agent's job; whether an insight is right is theirs. Don't rewrite findings during editorial work.
9. **Answering-rule changes sweep the whole instruction surface in one commit.** The same rules live in four channels: `mcp-server/src/server.ts` (`DISCIPLINE`, `CITE_FOOTER`, the tool descriptions) and `wiki/QUERY.md` (the canonical procedure, shipped as a pinnable resource). Changing a rule in one channel leaves the others teaching the old one — grep the rule's distinctive phrases across all four before shipping. (2026-07-09: the lead-with-the-answer fix patched `DISCIPLINE` only; QUERY.md kept teaching attribute-to-the-source for a day.) Prompt rewrites beyond mechanical sync are eval-gated — A/B against `internal/VALIDATION-SET.md` before deploying; deduping a repeated instruction is an ablation, not a cleanup.

## Layout

`wiki/` — the substrate (see `wiki/README.md`) · `mcp-server/` — MCP server, tests in `mcp-server/test/` · `scripts/lint.mjs` — health check · `internal/` — gitignored engagement context, never publish or reference in client-facing artifacts. (The maintainer one-pager UPDATING.md was removed from the public repo 2026-07-16 — on a public repo it read as an open-contribution invitation; the sandbox team holds it privately.)

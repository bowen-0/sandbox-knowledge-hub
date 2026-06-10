# Updating the Knowledge Hub — the one-page guide

> For the Sandbox team. Everything here works without the original developer. The wiki is plain markdown in git: nothing to rebuild, no database, no pipeline that can rot.

## The three operations

**1. Fix or improve an existing page.**
Edit the markdown file under `wiki/`, keep the frontmatter intact, update its `updated:` date, commit. That's it. For AI-assisted editing, open this repo in Claude Code or Cowork and describe the change; the wiki's conventions load automatically as skills.

**2. Add a new report or source.**
Drop the PDF into `wiki/pdfs/de/` (and `wiki/pdfs/en/` if a translation exists), open the repo in Claude Code or Cowork, and say **"ingest this report"**. The assistant walks the four-phase procedure (READ, PLAN, EXECUTE, BOOKKEEP) and pauses twice for your approval: once after presenting key takeaways, once after proposing the exact file changes. You stay the editor; it does the typing. The full procedure is `wiki/INGEST.md`; the operator's manual for other runtimes (claude.ai, ChatGPT) is `wiki/CONTRIBUTING.md`.

**3. Check the wiki's health.**
```
node scripts/lint.mjs
```
Run from the repo root (one-time setup: `cd mcp-server && npm install && npm run build`). It flags broken links, missing required fields, citation problems, and pages missing from the index. Errors should be fixed before publishing; warnings are judgement calls.

## The rules that keep it trustworthy

- **Citations are page-level against the German PDF.** `slug#page-N` means: open that PDF page and the claim is there. Never write a citation you have not verified. Never write `#para-N` (a dormant spec; nothing resolves it).
- **German quotes stay German**, copied exactly; the English translation goes in the surrounding sentence.
- **Every lesson and synthesis page declares its audience** via `insight_domain:` — `ai-deployment` (for teams deploying or regulating AI) or `sandbox-operations` (for teams running a sandbox programme), or `both` with the two audiences fenced apart in the body. This is what keeps an AI assistant from serving programme advice to a startup.
- **PDFs are immutable.** The wiki structures the reports; it never replaces them.
- **Content correctness is yours.** The structure, citations, and conventions are maintained by the tooling and procedures; whether an insight is *right* is the programme team's call.

## How AI assistants connect

The wiki is served to any MCP-capable assistant (Claude, ChatGPT, Copilot and others) via the server in `mcp-server/` — one connection, no chatbot to maintain. Local use: point the assistant at this folder, or run `mcp-server` over stdio. Hosted use: see `mcp-server/README.md`. The answering rules an assistant follows are in `wiki/QUERY.md` and travel with the wiki itself.

## Where everything lives

| What | Where |
|---|---|
| The knowledge base | `wiki/` (seven folders + `pdfs/`) |
| Schema and conventions | `wiki/CONVENTIONS.md` |
| Add-a-source procedure | `wiki/INGEST.md` |
| AI answering rules | `wiki/QUERY.md` |
| Contributor manual (all runtimes) | `wiki/CONTRIBUTING.md` |
| Page inventory | `wiki/index.md` |
| Health check | `scripts/lint.mjs` |
| MCP server | `mcp-server/` |

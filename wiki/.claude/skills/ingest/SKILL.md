---
name: ingest
description: >
  Ingest a new source into the Sandbox Knowledge Hub wiki — read it, discuss
  key takeaways with the user, create/update wiki pages, and maintain the
  page-anchored citation backbone. Trigger when the user says "ingest",
  "process this", "add this to the wiki", "compile this report", "what should
  we take from this", or provides a raw source (sandbox PDF, paper, URL,
  transcript, dataset) and wants it incorporated into the wiki. Also trigger
  when a new file appears in pdfs/ and the user wants it processed, or when
  they paste source content and ask for wiki integration.
  Do NOT trigger for answering questions about existing wiki content (that's
  the query skill), for fixing structural issues (that's a lint operation),
  or for prose tightening on already-ingested sources (treat as a normal edit).
argument-hint: "[source path, URL, or description of what to ingest]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Ingest

Read a new source, compile it into the wiki, and integrate it with existing knowledge. The integration step — updating existing pages with new perspectives — is where most of the value lives. A new sandbox report doesn't just add pages; it enriches the lessons, concepts, stakeholders, and regulations already in the corpus.

**The canonical procedure lives in [`wiki/INGEST.md`](../../../INGEST.md). Read that file before starting any ingest.** It contains the four-phase READ → PLAN → EXECUTE → BOOKKEEP arc, source-type specifics, the citation backbone rules, anti-patterns, and runtime-specific notes.

Summary of the procedure (for quick orientation; the full version is in `INGEST.md`):

1. **READ** — read the source, read `wiki/index.md` for what already exists, read `wiki/CONVENTIONS.md` for the schema, present 3–5 takeaways to the user, wait for discussion.
2. **PLAN** — propose a structured plan: source page, project page, lessons to create, existing pages to update, cross-references. Wait for approval.
3. **EXECUTE** — write the pages per CONVENTIONS. Highest-value outputs are **lessons** (`wiki/lessons/<slug>.md`) — atomic transferable claims with page-anchored citations and a declared `insight_domain`.
4. **BOOKKEEP** — update `wiki/index.md`, verify no orphans, verify no broken `[[wikilinks]]`, verify every claim is page-anchored, then run `node scripts/lint.mjs` from the repo root.

**Citation backbone.** Every claim added to the wiki traces to a `<source-slug>#page-N` page anchor, verified by reading the English-edition PDF page. **Never invent an anchor, and never write `#para-N`** — the paragraph pipeline is a dormant spec. Every new lesson/synthesis page declares `insight_domain: ai-deployment | sandbox-operations | both` (CONVENTIONS §4). Full rules in `INGEST.md`'s contract section and `CONVENTIONS.md` §6.

**Quotes come from the official English edition, character-for-character.** Never write your own translation inside quotation marks. Pattern and rationale in `CONVENTIONS.md` §5.

**Wikilink discipline at write-time.** Entity wikilinks (projects, people, organisations, regulations, sources) inline freely. Principle / lesson wikilinks italicised in prose, wikilink in parentheses on first mention only. ≤3 wikilinks per paragraph. Same rule as the query skill — see `QUERY.md`.

**Ingest is collaborative, not automated.** Phases 1 and 2 both end with a user approval gate. The discussion shapes the output; auto-running an ingest skips the most valuable conversation.

**Read `wiki/INGEST.md` now if you have not already.** It is the contract; this file is just the trigger.

# Sandbox Knowledge Hub — Wiki

> The structured knowledge layer for the *AI Innovation Sandbox Knowledge Hub* (GovTech Hackathon Switzerland 2026 · challenge by Canton Zürich).

This folder is the **substrate**. Each markdown file is one entity. The folder it lives in determines its type. The YAML frontmatter is the graph. Every claim cites a page in a source PDF.

If you only read one other file: [`CONVENTIONS.md`](CONVENTIONS.md). It defines the schema. If you only read two: also skim [`index.md`](index.md) — the auto-navigation across the whole wiki.

---

## What this is, in one paragraph

The Canton of Zürich runs the *Innovation Sandbox for Artificial Intelligence* — a regulatory + technical playground where public administration, businesses, and researchers pilot AI applications under real conditions. Across two phases (2022–2026) it produced ~13 detailed PDF reports. Those reports hold hard-won knowledge (legal frameworks, data access, organisational prerequisites, technical learnings) that today is locked inside static documents. **This wiki restructures that corpus as a navigable, citable, extensible knowledge base** so that the technical people building AI assistants and retrieval systems can give an administrator planning a new AI pilot trustworthy, cited access to it.

The corpus is bounded but **the wiki is not**. New sources — papers, web pages, transcripts, news articles, future sandbox reports — can be added as first-class citizens. See `sources/` below.

The corpus serves **two audiences**, and every lesson and synthesis page declares which via `insight_domain:` frontmatter: **`ai-deployment`** (deploying, procuring, or regulating an AI system) and **`sandbox-operations`** (running an innovation-sandbox-style programme). The advice often sounds alike across the two; the field exists so no reader — human or AI — generalises one as the other. See `CONVENTIONS.md` §4 and `index.md`, *The two insight domains*.

---

## The seven folders

| Folder                           | What lives here                                                                                                                                                                                                       | Required frontmatter                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`projects/`](projects/)         | One page per sandbox pilot (10 today)                                                                                                                                                                                 | `type: project`, `phase`, `sector`, `sources`                                    |
| [`concepts/`](concepts/)         | Reusable ideas / vocabulary (data-access, pseudonymisation, edge-computing, intrapreneurship…)                                                                                                                        | `type: concept`, `related[]`                                                     |
| [`regulations/`](regulations/)   | Legal instruments (DSG, EU AI Act, FADP, EU Machinery Reg, ISO/IEC 42001…)                                                                                                                                            | `type: regulation`, `jurisdiction`, `domain[]`                                   |
| [`stakeholders/`](stakeholders/) | People and organisations (DPO, ITSL-UZH, Stephanie Volz, MPAssist, ANYbotics…)                                                                                                                                        | `type: stakeholder`, `kind` (person / org), `partner_role[]`                     |
| [`lessons/`](lessons/)           | Atomic, transferable lessons. The unit the future generator surfaces.                                                                                                                                                 | `type: lesson`, `project[]`, `concept[]`, `sources[]`, `confidence`, `freshness` |
| [`sources/`](sources/)           | One page per source artefact (PDF, URL, paper, video, transcript…). The citation backbone.                                                                                                                            | `type: source`, `source_type`, `path` *or* `url`, `language`, `year`             |
| [`synthesis/`](synthesis/)       | Cross-cutting patterns. Pages that weave multiple primary entries together.                                                                                                                                           | `type: synthesis`, `connects[]`                                                  |
| [`pdfs/`](pdfs/)                 | The original source PDFs themselves, organised by language (`pdfs/de/`, `pdfs/en/`). Static assets, not pages — linked from each `sources/<slug>.md` via `path:` / `en_path:` and an inline **Read the report** link. | (binary assets — no frontmatter)                                                 |

> The seven page types above are a **starting set** chosen because they map cleanly onto what the source corpus actually contains. They are *conventions*, not enforcement. If a new pattern keeps appearing in 3+ pages, propose a new folder (see `CONVENTIONS.md` → "How to evolve the schema"). `pdfs/` is the only folder without page-type semantics — it's the static-asset companion to `sources/` and ships with the wiki when hosted as HTML.

---

## How to read this wiki

Three ways, depending on who you are:

**As a human** — browse by type (folders above); each page is self-contained and reads like a Wikipedia article, with citations resolving to a specific page in a source PDF. The `[[wikilinks]]` between pages are clickable in Obsidian (open the `wiki/` folder as a vault) and resolve through the MCP server's tools; on GitHub web they currently render as plain text, so navigate via the folders there.

**As an LLM / retrieval system answering a query** — start with [`QUERY.md`](QUERY.md). It contains the canonical answering procedure: read order, citation style, voice rules, gap-honesty. It auto-loads as a skill from [`.claude/skills/query/SKILL.md`](.claude/skills/query/SKILL.md) when this folder is the working directory for Claude Code or the Claude Agent SDK. Then read [`index.md`](index.md) for the navigable inventory. Frontmatter (`type:`, `audience:`, `priority:`, `sector:`, `connects:`, `cross_cutting:`) is structured for filtering and retrieval reranking — use it.

**As an LLM / contributor adding a new source** — start with [`INGEST.md`](INGEST.md). It contains the canonical four-phase ingest procedure (READ → PLAN → EXECUTE → BOOKKEEP), the page-anchored citation rules, and the page-template shape for each of the seven types. It auto-loads as a skill from [`.claude/skills/ingest/SKILL.md`](.claude/skills/ingest/SKILL.md). **Recommended runtime: Cowork or local Claude Code** — ingesting a new PDF means reading it and verifying page-level citations against it, which needs a real execution environment. Claude.ai with the GitHub connector works for *editorial* operations on already-ingested sources (drafting a lesson from existing material, cross-references, prose tightening), but not for new PDF ingest.

**As a human SME or challenge owner who wants to contribute** — read [`CONTRIBUTING.md`](CONTRIBUTING.md). It's the step-by-step handover doc: which runtime to pick (Cowork / Claude.ai Projects / ChatGPT), how to set it up from scratch, and what "correct ingest" looks like regardless of which runtime you used. INGEST is the contract; CONTRIBUTING is the operator's manual.

**As an agent / RAG / knowledge-base operator plugging this wiki into your own stack** — this wiki is designed to be **substrate-portable**. Clone the folder; point your consumer at it. Both procedures (`QUERY.md` / `.claude/skills/query/SKILL.md` for read-side, `INGEST.md` / `.claude/skills/ingest/SKILL.md` for write-side) ship with the corpus, so a downstream LLM consumer can pick up the same discipline without bespoke prompt engineering on your side. For runtimes that can't walk folders dynamically (custom GPTs, Claude.ai Projects, raw single-shot API calls), paste the relevant procedure file as the system prompt and the relevant pages as context. MCP-capable assistants get all of this through the server in [`../mcp-server/`](../mcp-server/) — one connection, the same discipline. The procedures are identical across runtimes; only the page-loading and tooling mechanism differs.

---

## How to add to this wiki

The canonical procedure lives in [`INGEST.md`](INGEST.md) — the four-phase READ → PLAN → EXECUTE → BOOKKEEP arc, with file-level templates and the citation-backbone rules. Read it (or invoke the `ingest` skill) before adding any source. The three common cases below are quick orientation; INGEST is the contract and [`CONVENTIONS.md`](CONVENTIONS.md) is the schema spec.

### Add a new source (PDF, paper, web page, video, transcript)
1. If it's a PDF, drop it into `pdfs/de/` or `pdfs/en/` (or `pdfs/<lang>/` for other languages). Other file types live in a sensible sibling folder under `pdfs/` (e.g. `pdfs/transcripts/`).
2. Create `sources/<slug>.md` with `type: source`, `source_type:` set to one of `pdf | url | paper | video | transcript | note`, plus `path` (for files, relative to the wiki root — e.g. `../pdfs/de/<slug>.pdf`) or `url` (for the web). Add a `**Read the report:**` link line under the H1 so HTML readers have a one-click way into the source.
3. Cite claims at **page level** (`<slug>#page-N`, verified against the citation-authoritative PDF). The `paragraphs:` anchor index is a dormant spec — see [`CONVENTIONS.md`](CONVENTIONS.md) §6 — leave it unpopulated.

### Add a lesson
1. Read the source. Identify an atomic, transferable claim.
2. Create `lessons/<slug>.md` with `type: lesson`, link to `project[]`, `concept[]`, `regulation[]`, `stakeholder[]`, and cite the source at page level (`#page-N`, verified against the official English edition).
3. Use `[[wikilinks]]` in the body wherever you reference another wiki entity.

### Add a concept
1. Confirm it's not already in `concepts/`.
2. Create `concepts/<slug>.md` with `type: concept`, a one-paragraph definition, and `related[]` to nearby concepts.
3. If the concept comes from the booklet glossary, mark `canonical_source:` to the relevant page in the booklet — these definitions are authoritative.

If you're unsure which type a page should be, **open an issue** using the "Propose a new concept/tag" template (`.github/ISSUE_TEMPLATE/`). Patterns we haven't seen yet are the patterns worth talking about.

---

## What this is *not*

- **Not a chat interface — and none is planned here.** The wiki is the substrate; the intended path is integrating it into your own assistant or AI system.
- **Not a knowledge graph in a triple store.** The graph lives in YAML frontmatter and is *exportable* to JSON-LD / DuckDB / Neo4j on demand.
- **Not a database with enforced schema.** Frontmatter conventions are linted, not validated. Easier evolution > stricter typing during the formative phase.
- **Not the only place truth lives.** The published reports are the ground truth. The English editions in [`pdfs/en/`](pdfs/en/) are citation-authoritative, so every page number resolves against those; the German originals in [`pdfs/de/`](pdfs/de/) ship alongside and remain the final word on legal wording. The wiki structures them; it does not replace them.

---

## File-naming conventions (quick)

- `kebab-case-slugs.md`, ASCII only, no spaces.
- For PDFs that have both DE and EN versions, the wiki uses the language-neutral slug (e.g. `building-permits.md`, not `building-permits-en.md`).
- Sources use the same slug as their underlying file: `sources/p2-building-permits.md` ↔ `pdfs/{de,en}/p2-building-permits.pdf`.

Full naming + frontmatter rules in [`CONVENTIONS.md`](CONVENTIONS.md).

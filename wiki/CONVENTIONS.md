# Wiki Conventions

> The schema, written as conventions rather than rules. Lint warnings will flag deviations; nothing here is enforced at write time. This file is the source of truth for **what a well-formed wiki page looks like** — but the schema is expected to evolve. See *How to evolve the schema* at the bottom.

---

## 1. File layout

```
wiki/
├── projects/           type: project
├── concepts/           type: concept
├── regulations/        type: regulation
├── stakeholders/       type: stakeholder
├── lessons/            type: lesson
├── sources/            type: source
├── synthesis/          type: synthesis
└── pdfs/               binary assets — not pages. PDFs sit under pdfs/de/, pdfs/en/, etc. and are linked from sources/<slug>.md.
```

One file = one entity. Folder determines type. Frontmatter `type:` must match the folder (this is the one hard invariant; the lint pass enforces it). `pdfs/` is the only folder without page-type semantics — it is the static-asset companion to `sources/`.

---

## 2. Frontmatter — the graph layer

Frontmatter is YAML. List-valued fields are typed edges in the implicit knowledge graph.

### Universal fields (every page)

```yaml
title: <human-readable title>     # English by default; see §5 on language
type: <project|concept|regulation|stakeholder|lesson|source|synthesis>
slug: <kebab-case>                # matches filename without .md; optional, inferred if absent
created: 2026-05-28               # ISO date the page was first written
updated: 2026-05-28               # ISO date of most recent meaningful edit
priority: high                    # optional. Set only on the handful of pages a consumer should
                                  # reach first (retrieval boost); absent everywhere else.
```

### Per-type fields

#### `projects/` — one page per sandbox pilot

```yaml
type: project
phase: I | II                     # which sandbox phase
year: 2023                        # publication year of the underlying report
status: completed | analysis-only # "analysis-only" = regulatory analysis without real-world testing
sector: healthcare | mobility | autonomous-systems | public-administration | education-and-work | construction | other
sources: [p2-building-permits]    # slugs from wiki/sources/
stakeholder: [stephanie-volz, raphael-von-thiessen, byte-studio]
regulation: [dsg-art-22, eu-ai-act]
concept: [data-access, llm-as-a-judge]
related_projects: [smart-parking] # other pilots this one references or extends

# Use-case assessment facets — the "metadata to highlight" dimensions from the kickoff.
# They live on the use case (project); insights (lessons/synthesis) are sliceable along
# them through their `project:` link, so the portfolio can be filtered by any of them.
data_sources: [building-applications, decision-criteria]   # what data the use case relies on (soft list; see §4)
societal_acceptance: high                                  # high | moderate | sensitive | contested (see §4)
technological_feasibility: high                            # high | moderate | emerging (see §4)
process_change: moderate                                   # low | moderate | high — how far it reshapes the existing process (see §4)
```

#### `concepts/` — reusable ideas / vocabulary

```yaml
type: concept
canonical_source: 00-overview-phase2-build-and-share#para-26-glossary   # if from the booklet glossary
related: [generative-ai, frontier-models]                                # other concepts in the same neighbourhood
appears_in: [p2-building-permits, p2-medical-documentation]              # projects where this concept is operative
```

#### `regulations/` — legal instruments

```yaml
type: regulation
jurisdiction: ch-federal | ch-canton-zh | ch-canton-other | eu | international
instrument: act | ordinance | standard | postulate | court-ruling | convention
domain: [data-protection, machinery-safety, medical-devices, ai-governance]
year: 2024                        # year of entry into force (or most recent revision)
project: [p2-building-permits]    # pilots where this regulation is operative
```

#### `stakeholders/` — people and organisations

```yaml
type: stakeholder
kind: person | org | role         # "role" for generic functions (e.g. "data-protection-officer")
role: <one-line descriptor>       # human-readable function, e.g. "Project Lead AI, Canton of Zurich"
partner_role: [test-partner, technical-implementation, mandated-expert, domain-sparring, supervisory-authority]
                                  # The 5-role taxonomy from the booklet p.8.
                                  # Pages may have multiple roles across different projects.
affiliation: <org-slug>           # only for kind: person
project: [p2-building-permits, p2-bridge-monitoring]
contact: <email or URL>           # optional, only for public-facing roles
```

#### `lessons/` — atomic transferable lessons (**the highest-value page type**)

```yaml
type: lesson
phase: I | II | I-and-II
insight_domain: ai-deployment | sandbox-operations | both             # required; see §4. Which of the two insight
                                                                      # domains the lesson belongs to. "both" is only
                                                                      # allowed when the body separates the two
                                                                      # audiences with the §3 domain callouts.
project: [p2-building-permits]                                        # which pilot(s) the lesson is drawn from
concept: [data-access, pseudonymisation, partner-bottleneck]
regulation: [dsg-art-22, eu-ai-act-art-9]
stakeholder: [data-protection-officer, baudirektion-zh]
sources:
  - p2-building-permits#page-25                                       # required; page-anchored against the English edition
  - p2-building-permits#page-7                                        # (see §6 — paragraph anchors are a dormant spec)
confidence: high | medium | low                                       # how transferable is this lesson?
freshness: 2026-04                                                    # source publication month; drives stale-warning UI
applies_to_lifecycle_stage: [scoping, procurement, deployment]        # optional, helps the generator filter
cross_cutting: true | false                                           # optional. Set true when the lesson is a general
                                                                      # principle the booklet states across multiple
                                                                      # pilots (e.g. anything in [[00-overview-phase2-build-and-share]]
                                                                      # §04 Technology/Legal/Organisation). Consumers
                                                                      # should weight these higher for general queries
                                                                      # vs. case-study-specific ones.
```

#### `sources/` — citation backbone

```yaml
type: source
source_type: pdf | url | paper | video | transcript | note | dataset
cite_as: "Building Permits report"                                     # short friendly display name; the read tools
                                                                       # substitute it for the slug in citation text
                                                                       # ([(Building Permits report, p. 22)] vs the raw
                                                                       # slug). Include the word "report" (or the document
                                                                       # kind) so a served citation self-describes as a
                                                                       # source document — a bare "Building Permits" reads
                                                                       # as a concept to someone who never sees the tools.
                                                                       # Omit and citations render the slug. Keep it
                                                                       # unique and recognisable; the link keeps the slug.
path: ../pdfs/de/p2-building-permits.pdf                              # for files (lives under wiki/pdfs/<lang>/)
en_path: ../pdfs/en/p2-building-permits.pdf                           # optional sibling for bilingual sources
url: https://...                                                       # for web sources (mutually exclusive with path)
language: en | de | bilingual                                          # source-content language
year: 2026
publisher: Canton of Zurich                                            # if known
authors: [raphael-von-thiessen, lukas-willi]                           # stakeholder slugs if known
paragraphs:                                                             # the anchor index. Populated only by the anchor
  - id: para-1                                                          # pipeline (§6, currently dormant). Omit the field
    page: 1                                                             # entirely until that pipeline runs — an empty
    text_preview: "..."                                                # list implies anchors that don't exist.
```

#### `synthesis/` — cross-cutting patterns

```yaml
type: synthesis
insight_domain: ai-deployment | sandbox-operations | both   # required; see §4. "both" only with §3 domain callouts.
question: "How do I unblock data access for my pilot?"      # the persona-question the page answers
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp]   # who the page is written for
connects: [p1-machine-translation, p2-medical-documentation, dsg-art-22]
# what does this synthesis weave together?
```

---

## 3. Page body — the prose layer

After frontmatter, write markdown prose. A few conventions:

- **First-level heading repeats the title.** `# {{title}}` as the first body line. Some renderers strip frontmatter; the H1 makes the page legible without it.
- **Cite page-anchored inline**, e.g. *"The prototype combines rule-based and generative AI [(Building Permits report, p. 7)](../sources/p2-building-permits.md)."* The visible label is the source's `cite_as` name; the link target stays the slug-named `sources/` page. The page number refers to the English-edition PDF (§5); the `sources/` page carries the link into the PDF itself. Paragraph-level anchors are a dormant spec (§6) — never write a `#para-N` anchor by hand.
- **Use `[[wikilinks]]`** for in-wiki cross-references. Resolved at render time to the matching file under any of the seven folders. Broken wikilinks are surfaced by the lint pass.
- **Verbatim quotations come from the official English edition** — quotation marks and italics are reserved for character-exact EN-edition text. Pattern:

  > *"<exact sentence, copied character-for-character from the English-edition PDF>"* (Volz, [(Building Permits report, p. 25)](../sources/p2-building-permits.md))

  Never write your own translation inside quotation marks. Everything outside quotation marks is the wiki's paraphrase. For a future source with no official English edition: quote the original language verbatim and gloss it in English, tagging the gloss "(translation ours)". German terms of art (*Auftragsdatenbearbeitung*, *Vertrauenshaftung*, …) stay italic German with an English gloss on first mention.

- **Callouts** for non-prose structure (Obsidian-compatible):
  - `> [!tension]` — pages making opposing claims (e.g. centralised vs. decentralised data handling).
  - `> [!gap]` — known unknowns; missing data or unanswered questions.
  - `> [!update-needed]` — flag for stale content; pair with the page's `freshness:`.
  - `> [!sandbox-operations]` / `> [!ai-deployment]` — the domain markers (§4). Use them to fence a block that belongs to the *other* insight domain than the page's `insight_domain:`, or to separate the two audiences inside a `both` page. A consumer must never quote a fenced block as advice for the unfenced audience.

---

## 4. Taxonomies — soft enums

These are **starting sets** drawn directly from the corpus. Pages should use these values when they apply; pages may introduce new values; new values that recur 3+ times should be codified here.

### `sector` (from Build & Share booklet figure 1, p. 6 — the buckets the steering committee uses)

| Slug | Definition (from booklet) |
|---|---|
| `mobility` | Traffic data collection, visitor tracking, sensor-based bridge monitoring. |
| `autonomous-systems` | Autonomous inspection robots, autonomous machinery, drones. |
| `public-administration` | Semantic search, document understanding, chatbots for enquiries, AI-supported appeal decisions. |
| `education-and-work` | Vocational training environments, skills assessment, exam preparation. |
| `healthcare` | Medical documentation, health assistant, symptom diagnosis, ophthalmology AI. |
| `construction` | Building permits, construction project assistance. |
| `other` | Deepfake detection, humanitarian demining, raw material procurement, anti-littering. |

### `partner_role` (from Build & Share booklet p. 8 diagram — the 5 role types around a sandbox project)

| Slug | Definition (from booklet) |
|---|---|
| `test-partner` | Provides real-world application context, data, operational environment. |
| `technical-implementation` | Designs and builds prototypes, models, infrastructure. |
| `mandated-expert` | Contributes regulatory or domain expertise under a formal mandate. |
| `domain-sparring` | Informal expert exchange, validation, quality assurance — no formal mandate. |
| `supervisory-authority` | Provides oversight-perspective feedback, regulatory clarification. |

### `insight_domain` (on `lessons/` and `synthesis/`) — the two audiences this corpus serves

The sandbox's insights split into two domains that often *sound* similar but address different readers. A consumer must never generalise one as the other — partner-management advice for a sandbox programme is not deployment advice for a startup, even when the words overlap.

| Slug | Level | What it covers | Audience |
|---|---|---|---|
| `ai-deployment` | Material | Deploying, procuring, or regulating an AI system: technical, legal, organisational lessons from the pilots. | Startups, SMEs, innovation labs, government units deploying AI, policymakers regulating it. |
| `sandbox-operations` | Meta | Running an innovation-sandbox-style programme: pilot intake, partner management, pivots, convening formats, programme strategy. | Government units — Swiss or abroad — designing or operating their own sandbox. |
| `both` | — | Genuinely dual lessons. Only valid when the body separates the two audiences with the §3 domain callouts. | — |

The field is required on `lessons/` and `synthesis/` (the insight-carrying types) and not used elsewhere: projects, concepts, regulations, stakeholders, and sources are evidence and vocabulary, neutral to who reads them.

### `phase`

`I` (2022–2024) · `II` (2024–2026) · `I-and-II` (lessons evidenced across both phases) · (Phase III is on the roadmap for 2026–2029 per the booklet conclusion.)

### Use-case assessment facets (on `projects/`)

The four "metadata to highlight" dimensions named at the kickoff, so the portfolio can be sliced by what a decision-maker weighs when sizing up a use case. They sit on the **project** (the use case); a lesson or synthesis page is filtered along them through its `project:` link.

| Facet | Values | Meaning |
|---|---|---|
| `data_sources` | soft list of slugs, e.g. `building-applications`, `sensor-data`, `retinal-images`, `patient-records`, `drone-imagery`, `camera-images`, `register-documents`, `none-regulatory-analysis` | the data the use case relies on. Use `none-regulatory-analysis` for analysis-only pilots with no operational data. |
| `societal_acceptance` | `high` · `moderate` · `sensitive` · `contested` | how socially accepted or sensitive the use case is. `high` = uncontroversial efficiency/support; `moderate` = some privacy or public-surveillance considerations; `sensitive` = touches health, minors, or personal data; `contested` = autonomy or safety-critical decisions affecting rights or safety. |
| `technological_feasibility` | `high` · `moderate` · `emerging` | maturity of the technology for this use case. `high` = proven, deployable now; `emerging` = autonomy / safety-critical or otherwise not yet deployment-ready. |
| `process_change` | `low` · `moderate` · `high` | how far the technology reshapes the existing process. `low` = drop-in inside an existing workflow; `high` = restructures roles or replaces a process step. |

### `confidence` (on `lessons/`)

| Slug | When to use |
|---|---|
| `high` | Stated explicitly in a source, supported by the underlying evidence. Transferable claim. |
| `medium` | Reasonable inference across multiple sources; might not transfer to a different sectoral context. |
| `low` | Single source, anecdotal, or interpretation — useful but flag for revisit. |

### `source_type`

`pdf` · `url` · `paper` · `video` · `transcript` · `note` · `dataset`

---

## 5. Language

Working baseline:

- **The wiki is English-only** (decided with the sandbox team, 2026-07-23): body prose, quotations, and citation page numbers all follow the official **English editions** of the reports (`pdfs/en/`). Rationale: the repo's audience is technical integrators, and the earlier mix of German quotes plus wiki-made translations produced exactly the ambiguity an external review flagged — unmarked translations that diverge from the official EN wording.
- **The German originals stay in-repo** (`pdfs/de/`) as the authoritative source text, linked from each `sources/` page. For legal wording, the German PDF remains the final word; the wiki cites the official EN edition and the reader can follow through to the DE original.
- **Never machine-translate a source quote.** Quote the official EN edition verbatim (§3).
- **Page slugs and titles are English.** German equivalents go in a `title_de:` frontmatter field — kept deliberately, as a searchable alias for German-language queries.

---

## 6. Citation anchors — current contract: page-level

**The current citation grain is the page.** Every substantive claim cites `<source-slug>#page-N`, where `N` is the page number in the citation-authoritative **English-edition** PDF (§5). Frontmatter `sources:` entries use `slug#page-N`; inline prose cites read `[(Building Permits report, p. 25)](../sources/p2-building-permits.md)` — friendly `cite_as` label, slug-named link target. A page-level citation means: *open that PDF page and you will find the claim*.

**Paragraph anchors (`#para-N`) are a dormant spec, not the working contract.** The design: an extraction pipeline assigns deterministic paragraph IDs, stable across re-ingests via deterministic chunking + checksum-on-anchor-resolution, and writes the anchor index into each `sources/` page's `paragraphs:` field. Until that pipeline exists and has populated the indexes, **never write a `#para-N` anchor** — a paragraph anchor that nothing resolves is worse than an honest page number. When the pipeline lands, it migrates page-level citations to paragraph anchors mechanically; the schema gains a per-paragraph `checksum` field at the same time.

For non-PDF sources (URLs, transcripts), use the most stable available anchor: a CSS selector, a timestamp (`#t=2m14s`), or omit and cite the whole page.

---

## 7. How to evolve the schema

The schema is **soft by design**. The five rules:

1. **Folder names = page types.** Adding a new type means adding a folder + updating §1 here + adding a section in §2 with required fields. Don't add a folder lightly; ~7 is already a lot to hold in mind.
2. **Frontmatter fields are open.** A page can introduce a new field at any time. If the field appears on 3+ pages, **codify** it: add a row to the relevant §2 schema, set a default, decide if it's required.
3. **Taxonomies are open.** The soft enums in §4 are starting sets. Pages can introduce new values; values that recur 3+ times should be codified.
4. **Removal is harder than addition.** Deprecating a field or value requires touching every page that uses it. Prefer adding a new field and migrating gradually.
5. **Rationale lives next to the rule.** When a convention is updated, record the *why* in the change log at the bottom of this file — not in a separate decision doc.

---

## 8. Lint pass — what's checked

The lint pass is `scripts/lint.mjs` — run `node scripts/lint.mjs` from the repo root (one-time setup: `cd mcp-server && npm install && npm run build`, since it imports the built parser). It has two severities: **errors** exit non-zero (fix before committing); **warnings** exit zero unless you pass `--strict`.

**Errors:**
- Type/folder mismatch — frontmatter `type:` doesn't match the folder it lives in.
- Missing required frontmatter — per the §2 spec for each type (including `insight_domain` on lessons and synthesis, and `path`-or-`url` on sources).
- Broken `[[wikilinks]]` — referenced slug not found in any folder.
- A `sources:` frontmatter entry that doesn't resolve to a `sources/` page.
- Hand-written `#para-N` anchors — forbidden while the anchor pipeline is dormant (§6).
- `insight_domain` missing or invalid, or set to `both` without **both** `> [!sandbox-operations]` and `> [!ai-deployment]` callouts in the body.

**Warnings:**
- Orphan pages — no incoming wikilink or frontmatter edge from any page.
- Pages missing from `index.md`.
- Stale `freshness:` — a lesson whose `freshness:` is more than 18 months old (review with `> [!update-needed]`).
- `insight_domain` set on a type that shouldn't carry it (the field belongs on lessons and synthesis only).

Lint catches structure, not sense — reviewers still read pages at PR time. *(Specified but not yet implemented: cross-page conflicting-`[!tension]` detection, and staleness checks on regulations/projects.)*

---

## 9. What changed and when

| Date | Change |
|---|---|
| 2026-05-28 | Initial conventions file. Soft schema chosen over a triple-store knowledge graph for editability and substrate-portability. Sector taxonomy (§4) and partner-role taxonomy (§4) seeded from the Build & Share booklet (figure 1 p.6, role diagram p.8). |
| 2026-05-28 | Added `cross_cutting: true \| false` to the lesson schema. Used on lessons that are *general principles* drawn from [[00-overview-phase2-build-and-share]] §04 — these should retrieve before case-study-specific lessons for general queries. Codified after applying to 14 lessons in the same commit (well past the 3+ rule). Source: cross-cutting principles synthesis page `wiki/synthesis/phase-2-cross-cutting-principles.md`. |
| 2026-05-29 | Added `pdfs/` folder as a static-asset companion to `sources/`. All 23 source PDFs (DE + EN) live under `wiki/pdfs/{de,en}/`, and `sources/*.md` frontmatter `path:` / `en_path:` references them via `../pdfs/...`. Each `sources/<slug>.md` also carries a **Read the report** link under its H1. Rationale: the wiki is meant to be substrate-portable (per `README.md`) and hostable as static HTML — PDFs must live inside the deployable tree. |
| 2026-06-10 | Added `insight_domain: ai-deployment \| sandbox-operations \| both` (required on lessons + synthesis) and the paired §3 domain callouts. Rationale: the corpus serves two audiences whose advice often sounds alike — units deploying AI vs. units running a sandbox programme — and a consumer must never generalise one as the other. Requested by the sandbox programme leads, 2026-06-08. |
| 2026-07-28 | English-only flip (decided with the sandbox team 2026-07-23, after Patrick Arnecke's review): verbatim quotes now come from the official English editions, character-for-character; the English PDFs are citation-authoritative and all ~285 German «quotes» plus their translation glosses were replaced, with page anchors re-verified (the four reports with divergent DE/EN pagination re-anchored). Inline citation labels switched from slugs to `cite_as` names. German originals stay in `pdfs/de/` as the source text; two German sentences with no EN counterpart remain quoted in German with tagged translations. |
| 2026-06-10 | Citations re-grained to page level (`#page-N` against the German PDF). The paragraph-anchor system (§6) was specified but its extraction pipeline was never built, leaving every `#para-N` unresolvable; honest page numbers replace dead anchors. The paragraph spec stays in §6 as dormant, for mechanical migration when the pipeline lands. |
| 2026-06-10 | Codified fields in use on 3+ pages: universal optional `priority: high`; `role:` on stakeholders; `question:` + `audience:` on synthesis; `phase: I-and-II` on lessons evidenced across both phases. |
| 2026-06-14 | Doc-accuracy fix (no schema change), surfaced by an OKF-comparison review. Corrected §8 to match the implemented linter: the file is `scripts/lint.mjs` (was wrongly `lint.py`); split error vs warning severities; removed two checks the code does not run (cross-page conflicting-`[!tension]` detection, and the ">12-month project / regulation freshness" claim — the linter checks lesson `freshness:` at 18 months only); added the real `sources:`-resolution and index-coverage checks. Also corrected `wiki/README.md`, which still described citations as resolving to a *paragraph* (the live contract has been page-level since 2026-06-10). |
| 2026-06-25 | Added the four kickoff "metadata to highlight" facets to the `projects/` schema (§2, §4): `data_sources`, `societal_acceptance`, `technological_feasibility`, `process_change`. They sit on the use case (project); insights are sliceable along them via their `project:` link. Codifies the slicing the concept note promises the client. |

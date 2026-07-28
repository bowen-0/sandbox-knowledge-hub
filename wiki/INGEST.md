# Ingesting a Source into the Sandbox Knowledge Hub Wiki

> The canonical ingest procedure for this wiki. If you (the LLM / human contributor) want to add a new source — a sandbox report PDF, a paper, a URL, a transcript — this file is the contract.

This wiki is designed to be substrate-portable. The ingest procedure travels with it. It is auto-loaded as a Claude Code / Cowork / Claude Agent SDK skill from [`.claude/skills/ingest/SKILL.md`](.claude/skills/ingest/SKILL.md) when this folder is the working directory. For any other runtime — Claude.ai Projects with a GitHub connector, a custom GPT, a raw API call — paste this file as system instructions plus [`CONVENTIONS.md`](CONVENTIONS.md) and [`index.md`](index.md) as context. The procedure is identical across runtimes; only the file-I/O and tooling mechanism differs.

**Recommended runtime for ingest: Cowork or local Claude Code.** Other runtimes work for *editorial* operations on already-ingested sources, but reading source PDFs page-by-page and running the lint pass need a real execution environment.

---

## The contract

The wiki is the source of truth, and the citation backbone is page-anchored to source PDFs (CONVENTIONS §6). **Every substantive claim added to the wiki must trace to a page in a source.** If you can't cite, you can't add it.

Four rules follow from that:

1. **Cite the page you actually verified.** Read the PDF page and confirm the claim is on it before writing `slug#page-N`. The English-edition PDF is citation-authoritative (§5). Never write a `#para-N` anchor — the paragraph-anchor pipeline is a dormant spec (CONVENTIONS §6) and nothing resolves those anchors.
2. **Never write your own translation inside quotation marks.** Quote the official English edition verbatim, character-for-character. For a source with no official English edition, quote the original language and tag any gloss "(translation ours)". See [`CONVENTIONS.md`](CONVENTIONS.md) §5.
3. **Declare the insight domain.** Every new lesson and synthesis page carries `insight_domain: ai-deployment | sandbox-operations | both` (CONVENTIONS §4). Ask of every candidate lesson: is this advice for someone *deploying an AI system*, or for someone *running a sandbox programme*? If genuinely both, the body must fence the two audiences with the §3 domain callouts.
4. **Ingest is collaborative, not automated.** The procedure has four phases and requires user approval at the end of phases 1 and 2. The discussion shapes the output.

[`CONVENTIONS.md`](CONVENTIONS.md) is the schema spec — frontmatter, taxonomies, callout syntax, citation anchor syntax. Read it before executing. This file is the *procedure*; CONVENTIONS is the *contract*.

---

## Procedure

### Phase 1 — READ

1. **Determine the source and where it lives.** Common cases:
   - Sandbox project report: `pdfs/{de,en}/p<phase>-<slug>.pdf` — the English edition is citation-authoritative; the German original stays in-repo as the source text
   - Phase-overview booklet: `00-overview-phase<N>-...` — contains the cross-cutting principles
   - External paper / web URL / video / transcript / dataset — see [`CONVENTIONS.md`](CONVENTIONS.md) §2 for `source_type` values
   - Pasted content in conversation — save the raw text to `pdfs/notes/<slug>.md` so future ingests can re-resolve citations
2. **Read [`index.md`](index.md)** — the navigable inventory of every existing page. Note which projects, concepts, regulations, stakeholders, lessons, and synthesis pages already exist. This is what you'll integrate with, not just add to.
3. **Read [`CONVENTIONS.md`](CONVENTIONS.md) §2 (frontmatter) and §3 (page body)** — the schema you'll write to. Re-skim §4 (taxonomies) if the source touches a sector or partner-role you haven't ingested before.
4. **Read the source content itself.** Identify:
   - **Project facts** — sector, phase, partner orgs, timeline, outcomes, deployment status (`completed` vs `analysis-only`)
   - **Stakeholders named** — people and organisations, plus their `partner_role` (test-partner, technical-implementation, mandated-expert, domain-sparring, supervisory-authority)
   - **Regulations engaged** — Swiss federal/cantonal + EU + standards
   - **Concepts used** — especially ones not yet in `concepts/`
   - **Atomic transferable lessons** — the highest-value extractions. See [`lessons/integrate-regulation-early.md`](lessons/integrate-regulation-early.md) for the shape: one sentence stating the claim, one verbatim quote establishing it, one bullet per supporting project
   - **The insight domain of each candidate lesson** — deployment advice, programme-operating advice, or genuinely both (the contract, rule 3)
   - **Page anchors** — note the printed page number (English-edition PDF) for every claim and quote you expect to cite
5. **Present 3–5 key takeaways to the user.** Frame as: what's *new* here, what does this *reinforce* across the existing corpus, what does this *challenge*?

**Wait for the user before proceeding.** This is the first approval gate.

### Phase 2 — PLAN

After discussion, present a structured plan. Use the shape below — file-pathed, type-tagged, no abstract bullet lists:

```
Source page:    sources/<slug>.md                       (type: source)
Project page:   projects/<slug>.md                      (type: project)
                — or update if it already exists
Lessons to CREATE (highest-value output):
  - lessons/<slug>.md                                   (insight_domain: ?, cross_cutting: ?)
  - lessons/<slug>.md
Pages to UPDATE (highest-value integration):
  - concepts/data-access.md           — add project to appears_in[]; weave a subsection
  - stakeholders/stephanie-volz.md    — add project to project[]
  - regulations/dsg-fadp.md           — add lesson cross-reference if engaged
  - synthesis/phase-2-cross-cutting-principles.md — add lesson if cross_cutting
Cross-references to add:
  - [[new-concept]] linked from [[adjacent-existing-concept]]
  - > [!tension] callout where this source disagrees with an existing page
New stakeholders / regulations / concepts to CREATE:
  - stakeholders/<slug>.md            (kind: person, partner_role: [...])
  - regulations/<slug>.md             (jurisdiction: ..., instrument: ...)
```

Present the plan and wait for approval. The user may:

- Skip a proposed lesson ("not transferable — that's a single-project quirk")
- Reassign a lesson's `insight_domain:` ("that's programme advice, not deployment advice")
- Promote or demote `cross_cutting:` on a lesson
- Flag an existing page that needs updating but you missed
- Override the proposed taxonomy values (sector, partner_role, instrument)
- Add a tension callout you didn't surface

**This is the second approval gate.** Don't write files before approval.

### Phase 3 — EXECUTE

Write the pages per the approved plan. Page formats are defined in [`CONVENTIONS.md`](CONVENTIONS.md) §2 (frontmatter) and §3 (body). The anchors below are quick orientation; CONVENTIONS is the spec.

**Source page** (`sources/<slug>.md`):

- Filename = `p<phase>-<slug>` for sandbox reports; bare `<slug>` for other source types
- Frontmatter per CONVENTIONS §2 `sources/`. Include `path` (file) *or* `url` (web), `language`, `year`, `publisher`, `authors[]` (as stakeholder slugs), and `cite_as` — a short friendly display name (e.g. `cite_as: "Building Permits report"`) that the read tools substitute for the slug in citation text. Include the word "report" (or the document kind), so a served citation self-describes as a source document. Omit it and citations to this source render the raw slug.
- Body shape: H1 (repeats the title), one framing paragraph, **Provenance**, **Use as citation**, **See also** with `[[wikilinks]]`
- Canonical example to model: [`sources/p2-building-permits.md`](sources/p2-building-permits.md)
- Omit the `paragraphs:` field entirely — it exists only once the dormant anchor pipeline (CONVENTIONS §6) populates it. Never fabricate paragraph IDs
- If you produced a working digest of the report (methodology, page-numbered quotes), keep it at `sources/digests/<slug>.md` as ingest provenance

**Project page** (`projects/<slug>.md`):

- Filename drops the `p<phase>-` prefix; phase lives in frontmatter (`phase: I | II`)
- Frontmatter per CONVENTIONS §2 `projects/`. Use `status: analysis-only` for projects without real-world deployment
- Body uses page-anchored citations with the source's `cite_as` label: `[(Building Permits report, p. 25)](../sources/p2-building-permits.md)`
- Quote verbatim from the official English edition; never write your own translation inside quotation marks
- Cross-link to all relevant existing entities — stakeholders, regulations, concepts, related projects — using `[[wikilinks]]`

**Lessons** (`lessons/<slug>.md`) — the highest-value output type:

- One lesson = one **atomic, transferable** claim. If a candidate takes more than a paragraph to state, it's two lessons or it's a synthesis page
- Frontmatter per CONVENTIONS §2 `lessons/`. Required: `phase`, `insight_domain`, `project[]`, `sources[]` (page-anchored), `confidence`, `freshness`
- `insight_domain: both` requires the body to fence the two audiences with `> [!ai-deployment]` / `> [!sandbox-operations]` callouts (CONVENTIONS §3)
- Set `cross_cutting: true` *only* when the lesson is stated as a general principle in `00-overview-phase2-build-and-share` §04 Technology/Legal/Organisation (or the Phase I equivalent). This flag is a retrieval-priority boost; don't apply it loosely
- Body shape: H1 = the full lesson statement (one sentence), then a verbatim quote from the source establishing it, then **Evidence base** with one bullet per supporting project, then **How to apply** with concrete steps, then **See also**
- Canonical example to model: [`lessons/integrate-regulation-early.md`](lessons/integrate-regulation-early.md)

**Updates to existing pages** (the highest-value integration step — don't skip this):

- **Concept pages**: add the new project to `appears_in[]` frontmatter; weave a subsection in the body that *positions* this source against existing ones (agreement / nuance / contradiction / different vocabulary). Don't just append a paragraph
- **Stakeholder pages**: add the new project to `project[]` frontmatter; add one line of body context (what role did they play in this project)
- **Regulation pages**: add the new project to `project[]`; if the source provides a substantive interpretation or counter-case, add it to the body
- **Lesson pages**: if the new project supports an existing lesson, add it to `project[]` and add a bullet to the **Evidence base** section
- **Synthesis pages** (especially [`synthesis/phase-2-cross-cutting-principles.md`](synthesis/phase-2-cross-cutting-principles.md)): if a new cross-cutting lesson was extracted, link it into the appropriate Technology / Legal / Organisation subsection

**Wikilink discipline at write-time** (same rule as the query layer — see [`QUERY.md`](QUERY.md) for the full version):

- **Entity wikilinks** — projects, people, organisations, regulations, sources. The slug reads as a noun; use them inline freely
- **Principle / lesson wikilinks** — slugs like `ai-is-rarely-the-primary-challenge` read as YAML filenames mid-sentence, not as nouns. Italicise the principle in prose; put the wikilink in parentheses on first mention only, drop it on subsequent references
- **Soft cap**: ≤3 wikilinks per paragraph in narrative prose. The `See also` section and closing reading lists don't count

**Verbatim quote pattern** (CONVENTIONS §3):

> *"<exact sentence, copied character-for-character from the English-edition PDF>"* [(Building Permits report, p. 25)](sources/p2-building-permits.md)

Quotation marks are reserved for character-exact EN-edition text; everything outside them is the wiki's paraphrase. For a source with no official English edition, quote the original language verbatim and tag any gloss "(translation ours)".

### Phase 4 — BOOKKEEP

1. **Update [`index.md`](index.md)**:
   - Add the new project under "By type → Projects → Phase I/II" with one-line summary and sector tag
   - Add new lessons under "Lessons" — split between cross-cutting and case-study-specific
   - Add new concepts under "Concepts" (booklet-glossary vs derived subgroup)
   - Add new sources under "Sources"
   - Add new stakeholders under the appropriate "Stakeholders" subgroup
   - Update the *By sector* and *By phase* sections if the new project enters a bucket
   - **Cross-reference the *Open areas* list** — if your ingest fills a known gap, strike it off the list

2. **Verify no orphans**:
   - Every new page is linked from at least one other wiki page (the project page is the natural anchor for new lessons; the lesson page is the natural anchor for new concepts; the source page is the natural anchor for new stakeholders)
   - Every new page is listed in `index.md` in the right section

3. **Verify no broken `[[wikilinks]]`**:
   - Quick grep: `grep -oE '\[\[[a-z0-9-]+\]\]' <new-files>` then check each slug resolves to a real file under any of the seven folders. Either create the missing page or remove the link. The lint pass catches broken wikilinks — don't leave them for it

4. **Verify the citation backbone**:
   - Every substantive claim in every new page traces to `<source-slug>#page-N` (frontmatter) / `p. N` (inline), page numbers verified against the German PDF
   - No `#para-N` anchors anywhere — the paragraph pipeline is dormant (CONVENTIONS §6)

5. **Run the lint pass** — `node scripts/lint.mjs` from the repo root (see [`CONTRIBUTING.md`](CONTRIBUTING.md) for one-time setup). It checks broken wikilinks, orphans, missing required frontmatter, hand-written `#para-N` anchors, unfenced `both` pages, and index coverage. Fix what it flags before committing.

6. **Suggest a commit**. Per CLAUDE.md, commits are deliberate — `git add` specific paths, not `-A`. List the new and updated files; let the user pick the boundary. A typical sandbox-report ingest is one commit; a multi-source synthesis run is often two.

---

## Source-type specifics

**Sandbox project reports (PDF — the canonical case).** `pdfs/{de,en}/p<phase>-<slug>.pdf`

- Highest density. Expect: 1 source page + 1 project page + 2–6 lessons + 3–10 page updates
- The English-edition PDF is citation-authoritative per CONVENTIONS §5. The German original stays in-repo and remains the final word on legal wording; link through to it rather than citing its pages
- Always populate stakeholders for named project participants (test partner, technical implementation, mandated expert, supervisory authority)
- Always cross-check `regulations/` before creating a regulation page — most relevant Swiss + EU instruments are already there

**Phase-overview booklets.** `00-overview-phase<N>-...`

- Contain the cross-cutting principles (§04 Technology / Legal / Organisation in the Phase II booklet)
- Lessons extracted from these are nearly always `cross_cutting: true`
- Check each principle's insight domain: most are `ai-deployment`, but programme-side principles belong to `sandbox-operations` (the contract, rule 3)
- The booklet's glossary is the canonical source for concept definitions. When creating a concept from the glossary, set `canonical_source:` to the glossary's page (`00-overview-phase2-build-and-share#page-N`) per CONVENTIONS §2 `concepts/`

**External papers, web sources, videos, transcripts, datasets.**

- Lower volume, narrower contribution. Often 1 source page + 1 lesson + 1–2 page updates
- For URLs, set `url:` (mutually exclusive with `path:`); for videos, anchor by timestamp (`#t=2m14s`); for transcripts, anchor by speaker turn or timestamp; for datasets, point at the canonical location
- Lower-confidence sources warrant `confidence: medium` or `low` on derived lessons. CONVENTIONS §4 defines when to use each

**Pasted content in conversation.**

- Save the raw text to `pdfs/notes/<slug>.md` first — without a persisted source, future ingests can't re-resolve citations
- Then ingest as any other source

---

## Anti-patterns

- **Never write a `#para-N` anchor.** The paragraph pipeline is dormant; cite the page you verified (`#page-N`)
- **Never assign `insight_domain` by vibe.** Ask who acts on the advice: a team deploying AI, or a team running a programme. When genuinely both, fence the audiences; don't average them
- **Never write your own translation inside quotation marks.** Quote the official English edition verbatim; no official EN edition → original language + "(translation ours)" on the gloss
- **Never create orphan pages.** Every new page is linked from at least one other + listed in `index.md`
- **Never modify source PDFs in `pdfs/`.** Immutable
- **Never auto-run an ingest.** READ → PLAN → EXECUTE → BOOKKEEP requires user approval at the end of phases 1 and 2
- **Never write a lesson that takes more than a paragraph to state.** Split it, or promote it to a synthesis page
- **Never set `cross_cutting: true` without booklet §04 evidence.** The flag is a retrieval boost; it's load-bearing for the query layer
- **Never adopt sandbox-recruitment voice.** Default is neutral knowledge-transfer per [`QUERY.md`](QUERY.md). The wiki explains the corpus; it doesn't advertise the programme
- **Never just append to a concept page.** Weave the new project's contribution into the existing structure, noting agreements *and* tensions
- **Never force a cross-cutting connection.** If a link feels argued-for, drop it. The best connections are the ones that make the reader say "oh, that's the same idea"
- **Never skip the `index.md` update.** This is how the wiki stays navigable

---

## A note on consumer-specific behaviour

Different runtimes give the ingest procedure different leverage:

- **Cowork / local Claude Code / Claude Agent SDK** — this file auto-loads as a skill from `.claude/skills/ingest/SKILL.md`. You have `Read`, `Write`, `Edit`, `Glob`, `Grep`, `Bash` against the repo: read the English-edition PDF page-by-page to verify citations, and run the lint pass before committing. **This is the recommended runtime for ingest.**
- **Claude.ai Projects with GitHub connector** — paste this file as the project system prompt, attach [`CONVENTIONS.md`](CONVENTIONS.md) and [`index.md`](index.md), enable the GitHub connector pointed at this repo. The connector can read and write files via the GitHub API, but it cannot page through large PDFs reliably or run lint. Use claude.ai for *editorial* operations on already-ingested sources — drafting a new lesson from an existing source, cross-references, prose tightening, fixing a citation — not for ingesting new PDFs
- **Raw API call (single-shot)** — concatenate this file with CONVENTIONS, index, and the source content. Page-verified ingest is not feasible here; treat output as a draft for review

The procedure is identical across all three. What differs is whether PDFs can be read and lint run, and whether files can be written directly vs. proposed for human commit.

---

## What this file is not

- **Not the schema spec.** [`CONVENTIONS.md`](CONVENTIONS.md) is. This file is the procedure; CONVENTIONS is the contract
- **Not a UI spec.** The wiki is the substrate; UIs sit on top
- **Not enforcement.** The lint pass checks structural conventions; voice and discipline are upheld by the human reviewer at PR time
- **Not exhaustive.** New failure modes — when they recur — should be added to *Anti-patterns*. New page-type specifics should be added to CONVENTIONS §2 first, then mirrored here

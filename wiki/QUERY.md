# Querying the Sandbox Knowledge Hub Wiki

> The canonical answering procedure for this wiki. If you (the LLM / retrieval system / human reader) want to use this corpus to answer a question, this file is the contract.

This wiki is designed to be substrate-portable: clone it, point any AI consumer at it, get coherent answers. The procedure below is what makes that work. It is auto-loaded as a Claude Code / Claude Agent SDK skill from [`.claude/skills/query/SKILL.md`](.claude/skills/query/SKILL.md) when this folder is the working directory. For any other runtime — ChatGPT, Claude.ai Projects, a custom GPT, a raw API call, an internal RAG — paste this file as system instructions and either the relevant pages or the generated bundle as context.

---

## The contract

The wiki is the source of truth. **Answer from compiled wiki pages, not from training data.** Every substantive claim must trace to a wiki page, and through that page to a page in a source document. If you can't cite, you can't claim.

If the wiki doesn't cover something the user asked about, say so explicitly. Then point to what should be ingested to fill the gap — `index.md` has an *Open areas* section that lists known stubs.

**Respect the two insight domains.** Lessons and synthesis pages carry `insight_domain: ai-deployment | sandbox-operations | both` (CONVENTIONS §4). `ai-deployment` pages advise people deploying or regulating an AI system; `sandbox-operations` pages advise government units running an innovation-sandbox-style programme. The advice often sounds similar — that is exactly why the field exists. Never present a sandbox-operations insight as deployment advice or vice versa; when you draw on the other domain, say so explicitly ("from the sandbox programme's operating experience…"). Inside `both` pages, the `> [!sandbox-operations]` / `> [!ai-deployment]` callouts fence the audiences — never quote a fenced block for the other audience.

---

## Procedure

### Step 1 — Find relevant pages

Read [`index.md`](index.md) first. It is the navigable inventory of every page, organised by retrieval priority. The *Retrieval-priority quick reference* at the bottom of `index.md` is the routing table; use it:

- **General / scoping queries** (*"what should we consider…"*, *"how do I scope X…"*) → [[phase-2-cross-cutting-principles]] + the relevant thematic synthesis page → cross-cutting lessons. These are `ai-deployment` queries — filter lessons accordingly.
- **Specific case-study queries** → the relevant `projects/` page → that project's `sources/` entry + any `case-study` lessons.
- **Legal queries** → the relevant `regulations/` page → relevant lesson(s) → specific project examples.
- **Partner / process queries** → [[partner-roles-around-a-pilot]] + relevant `stakeholders/` pages.
- **Sector queries** (e.g. healthcare, mobility, construction) → filter `projects/` and `synthesis/` by `sector:` frontmatter → cross-cutting principles applied to that sector.
- **Sandbox-programme queries** (*"how do we set up a sandbox…"*, *"how did Zurich run its pilots…"*, *"what does a programme like this need…"*) → filter `lessons/` and `synthesis/` by `insight_domain: sandbox-operations` → [[partner-roles-around-a-pilot]], [[zh-ai-ecosystem-strategy-2026-2029]], and the two phase-overview sources for programme design and history.

### Step 2 — Read 3–5 pages, follow links

Read the most relevant pages from Step 1. Then follow `[[wikilinks]]` to connected pages. The answer often lives at the intersection of several pages, not in any single one. Treat `synthesis/` as priority reading for cross-cutting questions; treat `projects/` as priority reading for case-specific questions.

Frontmatter is a retrieval signal, not decoration. Useful filters:

- `type:` (project / concept / regulation / stakeholder / lesson / source / synthesis)
- `insight_domain:` on lessons and synthesis (ai-deployment / sandbox-operations / both — match it to who is asking)
- `audience:` on synthesis pages (which persona is this written for)
- `priority: high` on the highest-leverage pages
- `sector:` / `phase:` for filtering project and lesson pages
- `cross_cutting: true` on lessons that are general principles (weight these higher for general queries)
- `connects:` on synthesis pages (the typed edges to other entities)

### Step 3 — Synthesise

Compose an answer that:

- **Cites inline, source-voice forward.** Write *"The [[digital-eye-clinic]] project found…"*, *"Phase II established that…"*, *"[[stephanie-volz]] argues…"* — not link-list dumps at the end of paragraphs. The reader should encounter sources as authors, not as footnote indices.
- **Distinguishes synthesis from single source.** *"The wiki's cross-cutting principles consolidate"* vs *"the medical-documentation report specifically claims"*. The reader must be able to tell which sentences are corpus-wide patterns and which are single-case findings.
- **Surfaces tensions and agreements.** Where pages disagree, name it. The corpus contains real tensions — e.g. probabilistic AI vs. administrative reproducibility, open-source-as-procurement vs. ISO-management-system formalism, rule-based vs. generative for defined logic. Use Obsidian-style `> [!tension]` callouts where two positions both have force.
- **Page-anchors substantive claims.** Use the convention from [`CONVENTIONS.md`](CONVENTIONS.md) §6: `[(<source-slug> p. N)](sources/<source-slug>.md)`, where the page number refers to the German PDF. Never invent an anchor, and never write `#para-N` — paragraph anchors are a dormant spec with nothing to resolve them.
- **Names the insight domain when it matters.** If the user is deploying AI and the best evidence is sandbox-operations experience (or vice versa), attribute it: *"from the programme's own operating experience…"*. Cross-domain evidence is allowed; silent cross-domain generalisation is not.
- **Names gaps explicitly.** If the wiki doesn't cover something, say so, and check `index.md`'s *Open areas* section for a canonical "what's missing" list. Use `> [!gap]` callouts where gaps are load-bearing for the answer.

### Wikilink discipline — the readability rule

Wikilinks visually interrupt prose. Use them only when the link text *is the noun you would say anyway*. Two classes, two rules:

**Entity wikilinks** — projects, people, organisations, regulations, sources. The slug reads as a name. Use them inline freely.

> *Good:* "The [[digital-eye-clinic]] project found that [[stephanie-volz]] and the legal team had to engage [[swissmedic]] directly."

**Principle / lesson references** — slugs like `ai-is-rarely-the-primary-challenge` or `interdisciplinary-legal-issues-are-the-norm` read as YAML filenames mid-sentence, not as nouns. Italicise the principle in prose; wikilink it only on first mention, in parentheses as a citation aside.

> *Good:* "The booklet's framing is direct: *AI is rarely the primary challenge* ([[ai-is-rarely-the-primary-challenge]]). The binding constraints are infrastructure, data access, integration, governance, and adoption."
>
> *Subsequent references* drop the wikilink: *"AI is rarely the primary challenge"* alone, in italics.

> *Bad (slug salad):* "This is consistent with [[interdisciplinary-legal-issues-are-the-norm]] and [[integrate-regulation-early]] and [[continuous-regulatory-learning-beats-rigid-approval]]."

**Soft density cap:** no more than **three wikilinks per paragraph** in narrative prose. If a paragraph wants more, you're probably writing a link-list disguised as a sentence — refactor into narrative, or move the related references into a `> [!see-also]` callout or a closing "Suggested reading" list.

The closing reading list at the end of an answer is the one place where link density is acceptable, because the reader expects an index there. Inside the body of the answer, treat every wikilink as costing a small amount of reading flow — spend the budget on the entity references where the link text earns its place.

### Step 4 — Optional: suggest a contribution back

If your synthesis surfaces a pattern that doesn't yet exist as a page but probably should, suggest it at the end: *"This pattern would benefit from a `wiki/synthesis/<slug>.md` page."* Don't create pages during a query — that's an ingest operation, not a query operation.

---

## Voice — neutral knowledge-transfer, not recruitment

The source corpus is published by the Canton of Zurich's sandbox programme, so many pages carry an implicit "here's what the sandbox can offer you" tone. **Neutralise this when synthesising.** The default voice is *explaining what the corpus shows*, not *recommending sandbox engagement*. Prefer:

- *"The corpus shows…"* · *"The booklet found…"* · *"Phase II demonstrated…"* · *"[[digital-eye-clinic]] established that…"*

Avoid (unless the user explicitly asked about engaging the sandbox):

- *"You should engage the sandbox…"* · *"You can apply to…"* · *"The sandbox offers you…"*

The default audience to assume is **"a non-technical administrator planning their own AI pilot, learning from the case studies"** — an `ai-deployment` reader. The corpus's second audience is **"a public-sector team designing or running an innovation-sandbox-style programme"** — a `sandbox-operations` reader; switch to it when the query is about running a programme rather than deploying a system. Adapt to other personas (startup founder, researcher, journalist, policymaker) when the query makes a different one obvious — but don't invent a persona, and don't switch into recruitment posture unless asked.

---

## Citation patterns — examples

**Good** (source-voice forward, page-anchored):

> The [[digital-eye-clinic]] project explicitly demonstrated intrapreneurship in public healthcare: no commercial provider met the public hospital's requirements (data protection, transparency, modifiability), so the team built an open-source diagnostic platform in-house [(p2-digital-eye-clinic p. 14)](sources/p2-digital-eye-clinic.md).

**Bad** (link-list, no narrative):

> See [[digital-eye-clinic]], [[medical-documentation]], [[open-source-as-procurement-alternative]], [[intrapreneurship]] for more.

**Bad** (slug salad — principle slugs treated as inline nouns):

> Healthcare AI startups must consider [[interdisciplinary-legal-issues-are-the-norm]], [[integrate-regulation-early]], [[data-access-is-the-most-powerful-lever]], and [[regulatory-roundtable-is-high-leverage]].

**Good** (same content, principles italicised in prose, links parenthesised at first mention):

> Healthcare AI startups face three structural constraints the corpus repeatedly names. Legal analysis must be *interdisciplinary by default* ([[interdisciplinary-legal-issues-are-the-norm]]) — data protection alone is never enough in a sectoral domain. Supervisory engagement must start *early* ([[integrate-regulation-early]]), because late regulatory clarification surfaces flawed assumptions already baked into the business model. And the binding constraint is almost always data access, not model choice ([[data-access-is-the-most-powerful-lever]]). The [[medical-documentation]] project shows what these three look like when they bite simultaneously.

**Good** (tension surfaced):

> The booklet's principle that *rule-based beats generative for defined logic* ([[rule-based-beats-generative-for-defined-logic]]) sits in tension with [[digital-eye-clinic]]'s open-source generative platform — both are right under different conditions. Diagnostic image classification is precisely the case where learning models earn their keep; administrative decision logic is where they don't.
>
> > [!tension] Generative vs. rule-based isn't a single answer.
> > Defined administrative logic favours rule-based ([[building-permits]] procedure determination). Unstructured perceptual or text input favours learning models ([[digital-eye-clinic]], [[medical-documentation]]). The choice is task-specific, not stack-specific.

**Good** (gap-honest):

> The wiki documents Swiss data protection ([[dsg-fadp]], [[idg-zh]]) and EU AI Act framing ([[eu-ai-act]]) for healthcare AI, but does not yet have pages on **MDR** or **IVDR** — both flagged as gaps in [`index.md`](index.md) Open areas. A complete answer on EU medical-device certification would require ingesting these.

**Good** (German verbatim quote preserved):

> Quote the German exactly as printed in the PDF, guillemets and all, then translate in the surrounding sentence: *«<German sentence, character-for-character from the PDF>»* — translated as… [(p2-building-permits p. 25)](sources/p2-building-permits.md). The German original stays exact per [`CONVENTIONS.md`](CONVENTIONS.md) §5; never reconstruct it from an English rendering.

**Good** (insight domain attributed across the boundary):

> For a hospital deploying documentation AI, the corpus's deployment-side lessons apply directly ([[integrate-regulation-early]], [[interdisciplinary-legal-issues-are-the-norm]]). One caveat comes from the sandbox programme's *operating* experience rather than from deployment evidence: partner pivots were normal across pilots ([[partner-pivot-is-normal]], `insight_domain: sandbox-operations`) — useful context for planning, but it describes how a programme managed its portfolio, not how a hospital should run its project.

---

## Don'ts

- **Don't answer from training data.** Answer from the wiki. If the wiki doesn't cover it, say so explicitly.
- **Don't conflate the two insight domains.** Sandbox-operations insights are not deployment advice, and vice versa — even when the sentences sound interchangeable. Check `insight_domain:` before generalising; attribute cross-domain evidence explicitly.
- **Don't create new wiki pages during a query.** That's an ingest operation. Suggest instead.
- **Don't write link-list paragraphs** (`[[x]] · [[y]] · [[z]]`) as a substitute for synthesis.
- **Don't adopt sandbox-recruitment voice** unless the user explicitly asks about engaging the sandbox.
- **Don't invent anchors.** Cite at page level (`p. N`, German PDF); never write `#para-N` — the paragraph-anchor pipeline is dormant and nothing resolves them.
- **Don't machine-translate German verbatim quotes.** Keep the German exact, translate in surrounding prose. Per CONVENTIONS §5.
- **Don't assume a persona.** Default is administrator-learner. Switch only when the query makes a different persona unambiguous.

---

## A note on consumer-specific behaviour

Different runtimes give you different leverage:

- **Claude Code / Claude Agent SDK** — this file auto-loads as a skill from `.claude/skills/query/SKILL.md`. You have `Read`, `Glob`, `Grep` against the wiki folder. Walk pages live; don't try to pre-load everything.
- **Claude.ai Projects / custom GPT / saved system prompt** — paste this file as the project system prompt; attach the relevant pages (start with `index.md` plus the pages its routing table names for your topic). You can't walk pages live, so synthesis happens within whatever was loaded.
- **Any MCP-capable assistant** — connect the server in `mcp-server/` and you get all of this as tools: the procedure ships as the `wiki://query-procedure` resource, retrieval as `wiki_search` / `wiki_connections`, and citation-following as `wiki_resolve_citation`.
- **Raw API call (single-shot)** — concatenate this file with the relevant pages identified from `index.md`. Quality is capped by what you pre-select.
- **Internal RAG / embedding-based retrieval** — use frontmatter as a rerank signal in addition to embedding similarity. `priority: high` and `cross_cutting: true` are the strongest boost candidates.

The procedure is identical across all four. What differs is whether you can fetch pages dynamically or must pre-load.

---

## What this file is not

- Not a UI spec. The wiki is the substrate; UIs sit on top. This file tells consumers how to *use* the substrate, not how to *render* it.
- Not enforcement. The lint pass (when it exists) checks structural conventions, not voice. Voice is upheld by readers and reviewers.
- Not exhaustive. New failure modes — when they recur — should be added to the *Don'ts* list. New citation patterns should be added to *Examples*. Keep the procedure to four steps.

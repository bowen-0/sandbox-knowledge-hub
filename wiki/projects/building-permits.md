---
title: AI for Building Permits
type: project
phase: II
year: 2026
status: completed
sector: construction
sources:
  - p2-building-permits#page-4
  - p2-building-permits#page-6
  - p2-building-permits#page-7
  - p2-building-permits#page-9
  - p2-building-permits#page-10
  - p2-building-permits#page-11
  - p2-building-permits#page-12
  - p2-building-permits#page-13
  - p2-building-permits#page-14
  - p2-building-permits#page-16
  - p2-building-permits#page-18
  - p2-building-permits#page-19
  - p2-building-permits#page-20
  - p2-building-permits#page-22
  - p2-building-permits#page-24
  - p2-building-permits#page-25
  - p2-building-permits#page-26
  - p2-building-permits#page-29
  - p2-building-permits#page-32
stakeholder: [raphael-von-thiessen, stephanie-volz, nokema, byte-studio, gossweiler-ingenieure, stadt-kloten]
regulation: [dsg-fadp, fadp-art-21, bv-art-29, idg-zh, embag, postulate-ai-building-permits]
concept: [llm-benchmarks, frontier-models, generative-ai, real-world-testing, llm-as-a-judge, model-agnostic-architecture]
related_projects: [machine-translation]
data_sources: [building-applications, decision-criteria]
societal_acceptance: high
technological_feasibility: high
process_change: moderate
created: 2026-05-28
updated: 2026-06-11
priority: high
---

# AI for Building Permits

The **flagship Phase II project**: the only one with a working deployed prototype and a published evaluation pipeline [(Building Permits report, p. 11)](../sources/p2-building-permits.md) [(Building Permits report, p. 22)](../sources/p2-building-permits.md). Two parallel tracks:

## Track 1 — Capability benchmark

A **3,336-evaluation benchmark** across eight frontier LLMs [(Building Permits report, p. 10)](../sources/p2-building-permits.md) [(Building Permits report, p. 11)](../sources/p2-building-permits.md) — the 3,336 counts scored model runs (eight models × the query set × three repeats), not the number of applications:

| Provider | Models |
|---|---|
| OpenAI | gpt-5-mini, gpt-5.1, o3 |
| Google | gemini-3-pro-preview, gemini-2.5-flash, gemini-2.5-flash-lite |
| Anthropic | claude-opus-4.5, claude-sonnet-4.5 |

Scored 0–10 via *LLM-as-a-Judge* against expert reference answers [(Building Permits report, p. 10)](../sources/p2-building-permits.md) [(Building Permits report, p. 11)](../sources/p2-building-permits.md) on real building applications from Stadt Kloten [(Building Permits report, p. 9)](../sources/p2-building-permits.md). Five capability dimensions: information extraction, counting, measuring/calculating, spatial understanding, context understanding [(Building Permits report, p. 11)](../sources/p2-building-permits.md). Each query repeated three times to measure consistency [(Building Permits report, p. 10)](../sources/p2-building-permits.md).

**Headline numbers**: best model 60.2% accuracy on perfect answers, average 37.9%, worst 18.5%. Speed range 3.2s — 41.7s. Cost range USD 0.0001 — 0.033 per query [(Building Permits report, p. 14)](../sources/p2-building-permits.md) — **full preliminary check on one application under CHF 2** [(Building Permits report, p. 13)](../sources/p2-building-permits.md).

## Track 2 — Working prototype

Notification procedure (*Meldeverfahren*) for solar panels, heat pumps, and charging stations — selected because complexity is bounded [(Building Permits report, p. 16)](../sources/p2-building-permits.md). Partners: [[nokema]] (project submission), [[byte-studio]] (technical implementation), [[gossweiler-ingenieure]] (specialist support), [[stadt-kloten]] (test data — real building applications) [(Building Permits report, p. 9)](../sources/p2-building-permits.md) [(Building Permits report, p. 32)](../sources/p2-building-permits.md). 4-step UX: address capture → project-type selection (rule-based) → document upload with AI pre-checks → downloadable summary [(Building Permits report, p. 19)](../sources/p2-building-permits.md) [(Building Permits report, p. 22)](../sources/p2-building-permits.md).

## Headline findings

- **Rule-based beats generative AI when decision logic is clear** — the prototype uses pure rule-based logic for procedure determination; generative AI is reserved for unstructured document quality checks [(Building Permits report, p. 20)](../sources/p2-building-permits.md) [(Building Permits report, p. 22)](../sources/p2-building-permits.md).
- **No single best provider** — different models win on different metrics; **[[model-agnostic-architecture|model-agnostic architecture]] is mandatory** [(Building Permits report, p. 12)](../sources/p2-building-permits.md) [(Building Permits report, p. 13)](../sources/p2-building-permits.md).
- **Probabilistic AI fights administrative reproducibility** — 95% vs 99% reliability is a substantive question requiring political decision [(Building Permits report, p. 22)](../sources/p2-building-permits.md).
- **Greatest leverage is pre-submission quality improvement** — catching the recurring formal deficiencies (wrong scales, missing drawings) before they enter formal proceedings [(Building Permits report, p. 7)](../sources/p2-building-permits.md) [(Building Permits report, p. 18)](../sources/p2-building-permits.md).

## Before a pilot — prerequisites

What an administration needs in place before launching a permit-pre-check pilot, drawn from this project. The report states the baseline directly: effective AI use in the permit process needs suitable technical, organisational and legal conditions — *"adequate data quality, clear processes and responsible governance with human control"* [(Building Permits report, p. 8)](../sources/p2-building-permits.md).

- **Data and source material.** This pilot ran on real applications and notification cases supplied by [[stadt-kloten]] with applicants' consent [(Building Permits report, p. 9)](../sources/p2-building-permits.md). The equivalent ingest set for a new pilot: historical applications, the codified decision criteria and legal bases the check evaluates against (the prototype encodes these as a rule-based process matrix [(Building Permits report, p. 20)](../sources/p2-building-permits.md)), process documentation, and anonymised or consented sample cases where personal data is involved. Data quality is the binding precondition, not model choice (*data access is the most powerful lever*, [[data-access-is-the-most-powerful-lever]]).
- **Scope — support, not autonomous decision.** Fix the boundary first: *"AI can provide targeted support for the building permit process, but it is no substitute for technical responsibility or political processes."* [(Building Permits report, p. 8)](../sources/p2-building-permits.md)
- **Human review by the competent authority.** Decision authority, responsibility and traceability stay with the authority in every case [(Building Permits report, p. 8)](../sources/p2-building-permits.md); a fully automated permit decision would not be permissible under current law, given the [[fadp-art-21|right to human review]] and the constitutional right to be heard [(Building Permits report, p. 26)](../sources/p2-building-permits.md). The general pattern is [[human-oversight-in-ai-deployment]].
- **Explainability and traceability of outputs.** *"AI systems must therefore not deliver non-transparent black box results whose content cannot be verified by the parties or by appeal bodies."* [(Building Permits report, p. 25)](../sources/p2-building-permits.md) — a direct consequence of the duty to give reasons.
- **Workflow integration.** The value materialises only when the tool is embedded in the existing process; the report is explicit that AI's added value emerges only inside a broader digital and institutional development process [(Building Permits report, p. 8)](../sources/p2-building-permits.md). Place the pre-check at the point of submission, where it relieves both applicant and authority.
- **Legal checks from the outset.** Data protection ([[dsg-fadp|FADP]] / [[idg-zh|IDG ZH]], the latter being revised to add a transparency register for algorithmic systems), administrative-procedure law, the duty to give reasons and the right to be heard ([[bv-art-29|BV Art. 29]]), and accountability for errors [(Building Permits report, p. 24)](../sources/p2-building-permits.md) [(Building Permits report, p. 26)](../sources/p2-building-permits.md). *Interdisciplinary legal issues are the norm* ([[interdisciplinary-legal-issues-are-the-norm]]); data protection alone is not enough.
- **Pilot success criteria.** Define measurable targets up front. This project scored model performance across five capability dimensions, repeating each query three times to test consistency [(Building Permits report, p. 11)](../sources/p2-building-permits.md), and posed the reliability threshold — is 95% or 99% correct the bar for practical use — as an explicit decision, not a given [(Building Permits report, p. 22)](../sources/p2-building-permits.md). A full picture also tracks workload reduction, user acceptance, and error analysis, stated against the status quo (*value must be clearly articulated*, [[value-must-be-clearly-articulated]]).

For the inverse — the mistakes that sink pilots — see [[implementation-anti-patterns]]; for the prior question of whether AI fits at all, [[scoping-is-ai-the-right-approach]].

## Regulatory framing

PBG (Cantonal Planning and Building Act), BVV §§ 2a, 3, 4, 14 (Construction Procedures Ordinance) [(Building Permits report, p. 9)](../sources/p2-building-permits.md) [(Building Permits report, p. 16)](../sources/p2-building-permits.md); [[embag|EMBAG]] (Federal Act on Electronic Means) [(Building Permits report, p. 24)](../sources/p2-building-permits.md); [[idg-zh|IDG ZH]] (currently being revised to add a transparency register for algorithmic decision-making systems) [(Building Permits report, p. 24)](../sources/p2-building-permits.md); [[fadp-art-21|FADP Art. 21]] (automated decisions / right to human review) [(Building Permits report, p. 26)](../sources/p2-building-permits.md); [[bv-art-29|BV Art. 29]] (constitutional right to be heard) [(Building Permits report, p. 25)](../sources/p2-building-permits.md). Cantonal Parliamentary postulate **[[postulate-ai-building-permits|KR no. 226/2023]]** [(Building Permits report, p. 6)](../sources/p2-building-permits.md) — this project's results were the technical input into the executive's response [(Building Permits report, p. 29)](../sources/p2-building-permits.md).

## Stakeholders

[[raphael-von-thiessen]], [[stephanie-volz]] [(Building Permits report, p. 32)](../sources/p2-building-permits.md); project partners [[nokema]], [[byte-studio]], [[gossweiler-ingenieure]], [[stadt-kloten]] [(Building Permits report, p. 9)](../sources/p2-building-permits.md) [(Building Permits report, p. 32)](../sources/p2-building-permits.md). Extensive specialist support from FHNW (Walzer, Jost, Schneider), University of St. Gallen (Klingler), Canton of Zürich Building Department (Meyer, Hüppin, Baldwin, Louis, Spätig), Wüest Partner (Arnold), onprem.ai (Polach) [(Building Permits report, p. 4)](../sources/p2-building-permits.md).

## See also

- [[p2-building-permits]] — the source PDF.
- [[machine-translation]] — fellow "AI in administrative procedures" report.
- [[llm-benchmarks]] / [[frontier-models]] / [[llm-as-a-judge]] — concepts canonicalised here.

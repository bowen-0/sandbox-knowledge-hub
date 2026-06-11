---
title: AI for Building Permits
type: project
slug: building-permits
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
created: 2026-05-28
updated: 2026-06-11
priority: high
---

# AI for Building Permits

The **flagship Phase II project**: the only one with a working deployed prototype and a published evaluation pipeline [(p2-building-permits p. 11)](../sources/p2-building-permits.md) [(p2-building-permits p. 22)](../sources/p2-building-permits.md). Two parallel tracks:

## Track 1 — Capability benchmark

A **3,336-evaluation benchmark** across eight frontier LLMs [(p2-building-permits p. 10)](../sources/p2-building-permits.md) [(p2-building-permits p. 11)](../sources/p2-building-permits.md):

| Provider | Models |
|---|---|
| OpenAI | gpt-5-mini, gpt-5.1, o3 |
| Google | gemini-3-pro-preview, gemini-2.5-flash, gemini-2.5-flash-lite |
| Anthropic | claude-opus-4.5, claude-sonnet-4.5 |

Scored 0–10 via *LLM-as-a-Judge* against expert reference answers [(p2-building-permits p. 10)](../sources/p2-building-permits.md) [(p2-building-permits p. 11)](../sources/p2-building-permits.md) on real building applications from Stadt Kloten [(p2-building-permits p. 9)](../sources/p2-building-permits.md). Five capability dimensions: information extraction, counting, measuring/calculating, spatial understanding, context understanding [(p2-building-permits p. 11)](../sources/p2-building-permits.md). Each query repeated three times to measure consistency [(p2-building-permits p. 10)](../sources/p2-building-permits.md).

**Headline numbers**: best model 60.2% accuracy on perfect answers, average 37.9%, worst 18.5%. Speed range 3.2s — 41.7s. Cost range USD 0.0001 — 0.033 per query [(p2-building-permits p. 14)](../sources/p2-building-permits.md) — **full preliminary check on one application under CHF 2** [(p2-building-permits p. 13)](../sources/p2-building-permits.md).

## Track 2 — Working prototype

Notification procedure (*Meldeverfahren*) for solar panels, heat pumps, and charging stations — selected because complexity is bounded [(p2-building-permits p. 16)](../sources/p2-building-permits.md). Partners: [[nokema]] (project submission), [[byte-studio]] (technical implementation), [[gossweiler-ingenieure]] (specialist support), [[stadt-kloten]] (test data — real building applications) [(p2-building-permits p. 9)](../sources/p2-building-permits.md) [(p2-building-permits p. 32)](../sources/p2-building-permits.md). 4-step UX: address capture → project-type selection (rule-based) → document upload with AI pre-checks → downloadable summary [(p2-building-permits p. 19)](../sources/p2-building-permits.md) [(p2-building-permits p. 22)](../sources/p2-building-permits.md).

## Headline findings

- **Rule-based beats generative AI when decision logic is clear** — the prototype uses pure rule-based logic for procedure determination; generative AI is reserved for unstructured document quality checks [(p2-building-permits p. 20)](../sources/p2-building-permits.md) [(p2-building-permits p. 22)](../sources/p2-building-permits.md).
- **No single best provider** — different models win on different metrics; **[[model-agnostic-architecture|model-agnostic architecture]] is mandatory** [(p2-building-permits p. 12)](../sources/p2-building-permits.md) [(p2-building-permits p. 13)](../sources/p2-building-permits.md).
- **Probabilistic AI fights administrative reproducibility** — 95% vs 99% reliability is a substantive question requiring political decision [(p2-building-permits p. 22)](../sources/p2-building-permits.md).
- **Greatest leverage is pre-submission quality improvement** — catching the recurring formal deficiencies (wrong scales, missing drawings) before they enter formal proceedings [(p2-building-permits p. 7)](../sources/p2-building-permits.md) [(p2-building-permits p. 18)](../sources/p2-building-permits.md).

## Regulatory framing

PBG (Cantonal Planning and Building Act), BVV §§ 2a, 3, 4, 14 (Construction Procedures Ordinance) [(p2-building-permits p. 9)](../sources/p2-building-permits.md) [(p2-building-permits p. 16)](../sources/p2-building-permits.md); [[embag|EMBAG]] (Federal Act on Electronic Means) [(p2-building-permits p. 24)](../sources/p2-building-permits.md); [[idg-zh|IDG ZH]] (currently being revised to add a transparency register for algorithmic decision-making systems) [(p2-building-permits p. 24)](../sources/p2-building-permits.md); [[fadp-art-21|FADP Art. 21]] (automated decisions / right to human review) [(p2-building-permits p. 26)](../sources/p2-building-permits.md); [[bv-art-29|BV Art. 29]] (constitutional right to be heard) [(p2-building-permits p. 25)](../sources/p2-building-permits.md). Cantonal Parliamentary postulate **[[postulate-ai-building-permits|KR no. 226/2023]]** [(p2-building-permits p. 6)](../sources/p2-building-permits.md) — this project's results were the technical input into the executive's response [(p2-building-permits p. 29)](../sources/p2-building-permits.md).

## Stakeholders

[[raphael-von-thiessen]], [[stephanie-volz]] [(p2-building-permits p. 32)](../sources/p2-building-permits.md); project partners [[nokema]], [[byte-studio]], [[gossweiler-ingenieure]], [[stadt-kloten]] [(p2-building-permits p. 9)](../sources/p2-building-permits.md) [(p2-building-permits p. 32)](../sources/p2-building-permits.md). Extensive specialist support from FHNW (Walzer, Jost, Schneider), University of St. Gallen (Klingler), Canton of Zürich Building Department (Meyer, Hüppin, Baldwin, Louis, Spätig), Wüest Partner (Arnold), onprem.ai (Polach) [(p2-building-permits p. 4)](../sources/p2-building-permits.md).

## See also

- [[p2-building-permits]] — the source PDF.
- [[machine-translation]] — fellow "AI in administrative procedures" report.
- [[llm-benchmarks]] / [[frontier-models]] / [[llm-as-a-judge]] — concepts canonicalised here.

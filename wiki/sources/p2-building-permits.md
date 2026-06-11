---
title: "AI for Building Permits — Use Cases, Prototypes and Practical Insights"
type: source
source_type: pdf
slug: p2-building-permits
path: ../pdfs/de/p2-building-permits.pdf
en_path: ../pdfs/en/p2-building-permits.pdf
language: bilingual
year: 2026
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen, stephanie-volz]
created: 2026-05-28
updated: 2026-06-11
priority: high
---

# AI for Building Permits

**Read the report:** [PDF (DE)](../pdfs/de/p2-building-permits.pdf) · [PDF (EN)](../pdfs/en/p2-building-permits.pdf)

Phase II project report — **the most recent and most concrete** report in the corpus, and the only one with a working deployed prototype and a published evaluation pipeline. Two tracks: (1) a **3,336-evaluation benchmark** across 8 frontier LLMs (gpt-5-mini, gpt-5.1, o3, gemini-3-pro-preview, gemini-2.5-flash, gemini-2.5-flash-lite, claude-opus-4.5, claude-sonnet-4.5) scored via *LLM-as-a-Judge*, and (2) a working prototype for the **notification procedure** (Meldeverfahren) for solar panels, heat pumps, and charging stations — deployed with partners [[nokema]], [[byte-studio]], [[gossweiler-ingenieure]], and [[stadt-kloten]]. Headline finding: rule-based logic outperforms generative AI for clearly-defined administrative decisions; full preliminary check costs under CHF 2 per application.

## Provenance

Published April 2026. Original filename: `InnovationSandbox_AI_for_building_permits.pdf`. Most recent and most operationally concrete report in the corpus; fed directly into the response to Cantonal Parliament postulate KR no. 226/2023 ([[postulate-ai-building-permits]]). The report has been digested and ingested into this wiki; the working digest (page-numbered locator quotes plus a methodology summary, derived from the English PDF) lives at [sources/digests/p2-building-permits.md](digests/p2-building-permits.md). All wiki citations of this source are page-level against the German PDF.

## Methodology

The findings come from a single sandbox case study, run in two tracks: a systematic capability analysis of current AI models and a working prototype. The Amt für Wirtschaft of Canton Zürich ([[amt-fuer-wirtschaft-zh]]) conducted the analysis together with project partners [[nokema]] (project submission), [[byte-studio]] (technical development partner) and specialist partner [[gossweiler-ingenieure]]; [[stadt-kloten]] provided several real building applications and notification procedures with the applicants' consent, and the report notes that, as a single case study, the results are only generalisable to a limited extent [(p2-building-permits p. 9)](../sources/p2-building-permits.md). The legal frame was cantonal: Planning and Building Act (PBG), General Building Ordinance (ABV) and Construction Procedures Ordinance (BVV), with the analysis organised along four review stages, namely procedure review (§ 14 BVV), completeness check (§ 3 BVV), formal review (§ 4 BVV) and material review [(p2-building-permits p. 9)](../sources/p2-building-permits.md).

For the benchmark track, the project team defined concrete test questions on the real submissions for a multi-family house and fixed a correct reference answer for each [(p2-building-permits p. 9)](../sources/p2-building-permits.md), then queried several AI models from OpenAI, Google and Anthropic (the eight models named above, per report footnote 4) with identical questions and identical material; a separate model compared the generated answers against the reference solutions ([[llm-as-a-judge]]), every query was repeated three times to test consistency, and the models were compared on performance, response time and cost [(p2-building-permits p. 10)](../sources/p2-building-permits.md). The 3,336 tests were split into isolated sub-tasks along five dimensions (information extraction, counting, measuring and calculating, spatial understanding, context understanding), each answer scored 0 to 10 against the reference answers [(p2-building-permits p. 11)](../sources/p2-building-permits.md). Because the experiments rest on a limited number of submissions, the model comparisons are presented anonymised in the report [(p2-building-permits p. 15)](../sources/p2-building-permits.md).

For the prototype track, the team deliberately narrowed the scope to the notification procedure (Meldeverfahren), covering eight reportable project types such as solar installations, heat pumps and charging stations [(p2-building-permits p. 16)](../sources/p2-building-permits.md). Procedure determination is implemented as pure if-then rules over a process matrix, with site information retrieved automatically via GIS APIs and generative AI deliberately excluded from this step [(p2-building-permits p. 20)](../sources/p2-building-permits.md); generative AI is reserved for the pre-checks of uploaded documents [(p2-building-permits p. 21)](../sources/p2-building-permits.md).

Authors: [[stephanie-volz]] (managing director, [[itsl-uzh]], University of Zurich) and [[raphael-von-thiessen]] (programme lead of the AI sandbox, Canton of Zürich); project partners named in the report: Richard König ([[gossweiler-ingenieure]]), Marcel Muri ([[nokema]]), Noah Chavannes and Yves Rutishauser ([[byte-studio]]) [(p2-building-permits p. 32)](../sources/p2-building-permits.md). Specialist support: Dr. Alexander N. Walzer, Evelyne Jost and Prof. Oliver Schneider (Institut Digitales Bauen, FHNW), Benjamin Meyer, Marcel Hüppin, Maria-Luise Baldwin, Dr. Patrik Louis and Urs Spätig (Baudirektion Kanton Zürich), Prof. Dr. Désirée Klingler (University of St. Gallen), Patrick Arnold (Wüest Partner) and Tomas Polach (onprem.ai) [(p2-building-permits p. 4)](../sources/p2-building-permits.md).

## Notable quotes

- *«Der grösste Hebel von KI liegt aktuell in besseren und vollständigeren Baugesuchen vor der Einreichung.»* — the greatest leverage of AI currently lies in better and more complete building applications before submission. [[raphael-von-thiessen]], programme lead of the AI sandbox, Canton of Zürich ([p2-building-permits p. 7](../sources/p2-building-permits.md))
- *«KI kann Baubehörden unterstützen – die Begründung und Verantwortung von Entscheidungen bleibt aber beim Menschen.»* — AI can support building authorities, but the justification and responsibility for decisions remain with humans. [[stephanie-volz]], managing director, [[itsl-uzh]] ([p2-building-permits p. 25](../sources/p2-building-permits.md))

## Use as citation

Authoritative source for:
- LLM benchmark methodology in Swiss government-task contexts (the multi-model evaluation harness is the most reusable engineering artifact in the corpus).
- The "rule-based beats generative for defined logic" pattern.
- Swiss administrative-law framing for AI: [[fadp-art-21]], [[bv-art-29]], *Algorithmische Entscheidungsfindungssysteme*.
- Cost figures for LLM-based administrative preliminary checks (per-application unit economics).
- The notification-procedure subset of building permits as a scoping precedent.

## See also

- [[building-permits]] — project page.
- [[machine-translation]] — fellow "AI in administrative procedures" report.
- [[llm-as-a-judge]] / [[frontier-models]] / [[llm-benchmarks]] — concepts from this source.

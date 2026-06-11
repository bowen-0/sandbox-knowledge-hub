---
title: Rule-based systems outperform generative AI when decision logic is well-defined
type: lesson
slug: rule-based-beats-generative-for-defined-logic
phase: II
insight_domain: ai-deployment
project: [building-permits, bridge-monitoring, inspection-robots]
concept: [generative-ai, llm-benchmarks]
regulation: []
stakeholder: [raphael-von-thiessen]
sources:
  - 00-overview-phase2-build-and-share#page-17
  - p2-building-permits#page-14
  - p2-building-permits#page-17
  - p2-building-permits#page-20
  - p2-building-permits#page-21
  - p2-building-permits#page-22
  - p2-bridge-monitoring#page-7
  - p2-inspection-robots#page-9
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, deployment]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# Rule-based systems outperform generative AI when decision logic is well-defined

The most operationally consequential generative-AI lesson from Phase II. Stated verbatim in [[00-overview-phase2-build-and-share]] §04 Technology:

> *«Regelbasierte Systeme schlagen generative KI bei klaren Entscheidungslogiken: Generative Modelle entfalten ihre Stärken insbesondere bei der Verarbeitung unstrukturierter Informationen – etwa bei Zusammenfassungen, Transkription, Informationsaufbereitung oder Vorprüfungen (z. B. medizinische Dokumentation oder Vorabchecks bei Baubewilligungen). Bei klar definierten, nachvollziehbaren und rechtlich relevanten Entscheidungslogiken stossen sie jedoch an Grenzen. In solchen Fällen liefern regelbasierte Ansätze robustere und besser nachvollziehbare Resultate.»* [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

In the English edition's wording: rule-based systems outperform generative AI for well-defined decision logic. Generative models demonstrate strengths in processing unstructured information, such as summarisation, transcription, information structuring, or preliminary checks (e.g. medical documentation or pre-checks in building permit procedures). However, they reach their limits in clearly defined, traceable, and legally relevant decision-making processes. In such cases, rule-based approaches deliver more robust and transparent results.

## Evidence base

- **[[building-permits]]** — the prototype uses *pure rule-based logic* for procedure determination (8 project types × ~20 zone/protection criteria → if/then matrix); the report states the team deliberately uses no generative AI for this clearly structured decision process, only a simple if/then logic [(p2-building-permits p. 20)](../sources/p2-building-permits.md), and prints the full decision matrix [(p2-building-permits p. 17)](../sources/p2-building-permits.md). Generative AI is reserved for unstructured document quality checks (e.g. solar-datasheet against "low reflectivity" criteria) [(p2-building-permits p. 21)](../sources/p2-building-permits.md). Quantitative support: best LLM accuracy on perfect answers is 60.2%; average 37.9% [(p2-building-permits p. 14)](../sources/p2-building-permits.md). For administrative decisions, that's insufficient — and probabilistic AI fights the administrative-reproducibility requirement (95% vs 99% reliability is a *substantive political* question) [(p2-building-permits p. 22)](../sources/p2-building-permits.md).
- **[[bridge-monitoring]]** — data-driven approaches complement standards-based engineering; they do not replace deterministic structural-engineering logic [(p2-bridge-monitoring p. 7)](../sources/p2-bridge-monitoring.md).
- **[[inspection-robots]]** — deterministic safety logic vs. self-evolving ML is named as the operative tension under the EU Machinery Regulation [(p2-inspection-robots p. 9)](../sources/p2-inspection-robots.md).

## How to apply

When scoping a new public-sector AI use case:

1. **Map the decision logic**: is it definable as a finite if/then matrix? If yes, rule-based first; generative AI only for the unstructured-input subtasks.
2. **Quantify the accuracy floor required**: 95% reliability is too low for administrative decisions if the system makes the decision unsupervised.
3. **Hybrid architectures are normal**: building-permits is a working example of rule-based-by-default + generative-AI-on-unstructured-inputs.

## See also

- [[building-permits]] — the canonical case study.
- [[llm-benchmarks]] — what makes the 60.2% headline number believable.
- [[generative-ai]] — the contrast concept.
- [[probabilistic-ai-vs-administrative-reproducibility]] — why the determinism requirement bites in administrative settings.

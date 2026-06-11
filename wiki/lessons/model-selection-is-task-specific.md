---
title: Model selection is task-specific — design model-agnostic architectures
type: lesson
slug: model-selection-is-task-specific
phase: II
insight_domain: ai-deployment
project: [building-permits]
concept: [model-agnostic-architecture, frontier-models, llm-benchmarks, llm-as-a-judge]
regulation: []
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-17
  - p2-building-permits#page-10
  - p2-building-permits#page-11
  - p2-building-permits#page-14
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, deployment]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# Model selection is task-specific — design model-agnostic architectures

From [[00-overview-phase2-build-and-share]] §04 Technologie:

> *«Unterschiedliche Modelle zeigen je nach Aufgabe klare Stärken und Schwächen (z. B. visuelle Planinterpretation vs. Textextraktion bei Baugesuchen). Anders als bei generischen LLM-Benchmarks zeigt sich in der Praxis, dass ein einzelnes «bestes» Modell oftmals nicht existiert, insbesondere in vielfältigen Anwendungsfällen mit unterschiedlichen Dateninputs (z. B. Bild und Text).»*

In English: different models exhibit distinct strengths and weaknesses depending on the task (e.g. visual plan interpretation versus text extraction in building applications); unlike generic LLM benchmarks, practical experience shows that a single "best" model often does not exist, particularly in diverse use cases involving multiple data inputs (e.g. images and text). [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

[[building-permits]] benchmarked 8 frontier LLMs [(p2-building-permits p. 10)](../sources/p2-building-permits.md) across 3,336 evaluations using [[llm-as-a-judge]] [(p2-building-permits p. 11)](../sources/p2-building-permits.md). Findings [(p2-building-permits p. 14)](../sources/p2-building-permits.md):

- **Best model**: 60.2% accuracy on perfect answers
- **Average**: 37.9%
- **Worst**: 18.5%
- **Speed range**: 3.2s to 41.7s per query
- **Cost range**: USD 0.0001 to 0.033 per query
- **Different models win on different metrics**: there is no Pareto-dominant model

## How to apply

Per [[00-overview-phase2-build-and-share]] §04: *«Aufgrund der schnellen technologischen Entwicklung sollten Systeme so aufgebaut sein, dass Modelle austauschbar bleiben und kontinuierlich evaluiert werden können (z. B. Benchmarking im Projekt «KI bei Baubewilligungen»).»* That is, systems should be designed so that models remain exchangeable and can be continuously evaluated. [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

1. **Abstract at the API layer**: prompts and outputs through a unified interface; provider-specific quirks hidden.
2. **Configuration over code**: model choice is a config-file value.
3. **Continuous benchmarking** rather than one-time selection.
4. **Per-task model choice** is acceptable: cheap model for easy subtasks, frontier model for hard ones; the whole system pays the lower aggregate cost.

## See also

- [[model-agnostic-architecture]]: the concept this lesson canonicalises.
- [[building-permits]]: empirical foundation.
- [[llm-as-a-judge]] / [[llm-benchmarks]]: the evaluation methodology.

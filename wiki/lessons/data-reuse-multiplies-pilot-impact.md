---
title: Publishing derived datasets multiplies a pilot's impact beyond its own engagement
type: lesson
slug: data-reuse-multiplies-pilot-impact
phase: I
insight_domain: both
project: [infrastructure-maintenance]
concept: [data-access]
regulation: []
stakeholder: [ibm-research]
sources:
  - 00-overview-phase2-build-and-share#page-5
  - 00-overview-phase2-build-and-share#page-17
confidence: medium
freshness: 2026-05
applies_to_lifecycle_stage: [deployment]
created: 2026-05-28
updated: 2026-06-11
---

# Publishing derived datasets multiplies a pilot's impact beyond its own engagement

The canonical positive case in the corpus: [[infrastructure-maintenance]] (Phase I) → IBM Research published the project's structured, annotated drone-inspection dataset to **Hugging Face** as a public benchmark. The dataset now serves AI models that the sandbox itself never built.

From [[00-overview-phase2-build-and-share]] §01, under "Roll-out und nachhaltige Weiterführung von Projekten" (roll-out and sustainable continuation of projects):

> *«Darüber hinaus entstehen nachhaltige Effekte durch die Bereitstellung und Weiterverwendung von Daten: Im Projekt Drohneninspektion hat IBM Research einen strukturierten, annotierten Datensatz für die Inspektion von Infrastrukturen entwickelt, der als Benchmark für zukünftige KI-Modelle dient und über wissenschaftliche Publikationen sowie Plattformen wie Hugging Face öffentlich zugänglich ist.»*

In English: sustainable effects arise through the provision and reuse of data; within the drone inspection project, IBM Research developed a structured, annotated dataset for infrastructure inspection, which serves as a benchmark for future AI models and is publicly accessible via scientific publications and platforms such as Hugging Face. [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

Even "simple" datasets compound. Per [[00-overview-phase2-build-and-share]] §04 Technologie, under "Zugang zu Daten schafft den grössten Hebel" (access to data creates the biggest lever):

> *«Auch vermeintlich triviale Datensätze haben einen hohen Mehrwert für die Entwicklung und Optimierung von KI-Systemen. Werden sie zugänglich gemacht, ermöglichen sie einer breiten Zahl von Anbietern, ihre Modelle zu trainieren, zu validieren und zu verbessern (z. B. hochaufgelöste Drohnenaufnahmen einer Landepiste).»*

In English: even seemingly trivial datasets carry high added value for the development and optimisation of AI systems; once made accessible, they enable a broad range of providers to train, validate, and improve their models (for example, high-resolution drone images of a runway). [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

## How to apply

When planning a sandbox project (or any public-sector AI engagement):

> [!sandbox-operations]
> **Programme intake design.** At intake, ask: "What dataset would this engagement derive?" Scope the answer before the pilot starts, so the data legacy is part of the engagement from day one.

> [!ai-deployment]
> **Publish your derived data.**
> 1. **Design data collection** with downstream publication in mind: pseudonymisation, annotation quality, licensing.
> 2. **Publish via a community-standard channel** (Hugging Face, Zenodo, an institutional repository) rather than burying it in a deliverables PDF.
> 3. **Credit the contributors** so other public administrations are incentivised to follow.

## See also

- [[infrastructure-maintenance]] — canonical case.
- [[ibm-research]] — the partner who executed the publishing.
- [[data-access-is-the-most-powerful-lever]] — the broader lesson.

---
title: Publishing derived datasets multiplies a pilot's impact beyond its own engagement
type: lesson
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

From [[00-overview-phase2-build-and-share]] §01, under "Roll-out and Sustainable Continuation of Projects":

> *"In addition, sustainable effects arise through the provision and reuse of data: within the drone inspection project, IBM Research developed a structured, annotated dataset for infrastructure inspection, which serves as a benchmark for future AI models and is publicly accessible via scientific publications and platforms such as Hugging Face."* [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

Even "simple" datasets compound. Per [[00-overview-phase2-build-and-share]] §04 Technology, under "Data access is the most powerful lever":

> *"even seemingly simple datasets can generate substantial value for the development and optimisation of AI systems. When made accessible, they enable a wide range of providers to train, validate, and improve their models (e.g. high-resolution drone imagery of a runway)."* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md)

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

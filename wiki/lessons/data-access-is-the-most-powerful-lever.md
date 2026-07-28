---
title: Data access is the most powerful lever
type: lesson
phase: I-and-II
insight_domain: ai-deployment
project: [smart-parking, infrastructure-maintenance, digital-eye-clinic, medical-documentation, building-permits]
concept: [data-access, partner-bottleneck, pseudonymisation]
regulation: [dsg-fadp, idg-zh]
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-17
  - 00-overview-phase2-build-and-share#page-5
  - 00-overview-phase2-build-and-share#page-10
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, procurement]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-11
---

# Data access is the most powerful lever

The clearest single-sentence cross-cutting lesson from Phase II, stated explicitly in [[00-overview-phase2-build-and-share]] §04 Technology:

> *"Data access is the most powerful lever: even seemingly simple datasets can generate substantial value for the development and optimisation of AI systems. When made accessible, they enable a wide range of providers to train, validate, and improve their models (e.g. high-resolution drone imagery of a runway)."* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

Data access — or its absence — drove the outcome of nearly every project in the corpus. See [[data-access]] for the project-by-project chokepoint table.

- **Positive evidence**: [[infrastructure-maintenance]] → the IBM Research dataset published on Hugging Face is the corpus's canonical case of a sandbox project generating reusable data infrastructure beyond its own engagement [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md).
- **Negative evidence**: [[medical-documentation]] could not proceed to real-world testing because patient-data protection requirements blocked operational use in a public hospital [(Build & Share (Phase II overview report), p. 10)](../sources/00-overview-phase2-build-and-share.md).

## How to apply

When scoping a new public-sector AI use case:

1. **Identify the data-access blocker before the model**: partner consent, regulatory permission, pseudonymisation requirement.
2. **Plan for data reuse**: if you can derive a dataset that's safely shareable, doing so multiplies the impact beyond your own engagement.
3. **Treat partner relationships as data-access infrastructure** — they're often more load-bearing than the AI choice. See the related [[partner-bottleneck]] concept.

## See also

- [[data-access]] — the underlying concept.
- [[partner-bottleneck]] — the cross-cutting failure mode.
- [[pseudonymisation]] — the technique that often unlocks otherwise-blocked sources.
- [[infrastructure-maintenance]] — positive precedent for data reuse via Hugging Face.

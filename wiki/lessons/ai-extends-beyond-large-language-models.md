---
title: AI extends beyond large language models
type: lesson
phase: I-and-II
insight_domain: ai-deployment
project: [smart-parking, infrastructure-maintenance, bridge-monitoring]
concept: [computer-vision, large-language-models]
regulation: []
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-17
  - 00-overview-phase2-build-and-share#page-16
  - 00-overview-phase2-build-and-share#page-5
  - 00-overview-phase2-build-and-share#page-13
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# AI extends beyond large language models

A corrective principle from [[00-overview-phase2-build-and-share]] §04 Technology [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md):

> *"AI extends beyond large language models: many high-impact use cases in the public sector are based on computer vision or sensor data rather than language models (e.g. smart parking, drone inspections, sensor-based bridge monitoring)."*

## Evidence base

The post-2022 LLM hype cycle compressed public discourse about AI into "AI = LLMs = ChatGPT." The corpus pushes back hard. Of the 10 implemented sandbox pilots [(Build & Share (Phase II overview report), p. 16)](../sources/00-overview-phase2-build-and-share.md), **4 are predominantly LLM-based**, the other **6 are computer vision / sensor / image-recognition** in their core technical layer. The biggest impact-to-date pilots (Smart Parking → Frauenfeld production roll-out [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md); the Hugging-Face-published drone dataset [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md); the SOB bridge monitoring [(Build & Share (Phase II overview report), p. 13)](../sources/00-overview-phase2-build-and-share.md)) are non-LLM use cases.

## How to apply

When scoping a public-sector AI use case:

1. **Don't anchor on LLMs by default.** Start from the problem and let the modality follow.
2. **Computer vision is mature** for a wide range of perception/inspection use cases — the technology is rarely the binding constraint (see [[ai-is-rarely-the-primary-challenge]]).
3. **Sensor + AI patterns** unlock infrastructure monitoring, predictive maintenance, anomaly detection — modalities LLMs are not the right tool for.
4. **Combine modalities deliberately** — multi-modal problems (e.g. [[building-permits]] with images + text) are different from single-modality ones.

## See also

- [[computer-vision]] — the dominant Phase I paradigm.
- [[large-language-models]] — what this lesson contrasts against.
- [[scoping-is-ai-the-right-approach]] — broader scoping theme.

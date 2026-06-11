---
title: The interface between domain expertise and technology is critical
type: lesson
slug: domain-expertise-tech-interface-is-critical
phase: II
insight_domain: ai-deployment
project: [digital-eye-clinic, building-permits, medical-documentation]
concept: [regulatory-roundtable]
regulation: []
stakeholder: [raphael-von-thiessen, lukas-willi]
sources:
  - 00-overview-phase2-build-and-share#page-19
  - p2-building-permits#page-4
  - p2-building-permits#page-17
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, deployment]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-11
---

# The interface between domain expertise and technology is critical

From [[00-overview-phase2-build-and-share]] §04 Organisation:

> *«Schnittstelle zwischen Fachbereich und Technik ist kritisch: Der grösste Mehrwert entsteht dort, wo Fachwissen und technisches Verständnis eng verzahnt sind. Ohne diese Übersetzungsleistung bleiben KI-Systeme entweder technisch gut, aber fachlich irrelevant – oder umgekehrt.»*

In English: the greatest value emerges where domain knowledge and technical expertise are closely integrated; without this translation layer, AI systems remain either technically sound but operationally irrelevant, or vice versa [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md).

## What this looks like in practice

Pure technical excellence with no domain integration → impressive demos, operational irrelevance. Pure domain expertise with no technical integration → workflow stays unchanged, AI never actually deploys [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md). The successful sandbox projects integrate both *at the same person or team level*, not at the project-handoff level.

## Evidence base

- **[[digital-eye-clinic]]** — required clinicians + AI engineers working together on the evaluation framework; the booklet names experienced ophthalmologists as the experts whose assessment the outputs needed [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md). Pure AI engineering would have shipped a model that radiologists wouldn't use; pure clinical work would have specified an evaluation that AI couldn't satisfy.
- **[[building-permits]]** — required building-authority experts + AI engineers + legal scholars (Klingler from UniSG [(p2-building-permits p. 4)](../sources/p2-building-permits.md)) co-developing the prototype. The categorisation of project types into 8 buckets × 20 criteria was the domain layer [(p2-building-permits p. 17)](../sources/p2-building-permits.md); the AI was the technical layer; the legal framing was a third layer holding both honest.
- **[[medical-documentation]]** — the regulatory roundtable format ([[regulatory-roundtable]]) is itself an instance of this principle: AI providers + supervisory authority + domain practitioners co-present.

## The translation-layer person

A specific role recurs: someone who is *fluent in both domain and technology* and serves as the translation layer. Individual projects often have such a person on the partner side. Without this person, projects stall at translation friction.

> [!sandbox-operations]
> The sandbox programme often plays this translation role institutionally, through the programme team ([[raphael-von-thiessen]], [[lukas-willi]]) sitting between domain partners and technical implementers.

## How to apply

1. **Identify the translation-layer person at intake.** Who is fluent in both?
2. **If no one is**, plan for the translation cost — extra meetings, longer ramp-up, more rework.
3. **Hire / staff for breadth** at the joint role even if depth-first roles look more impressive on a CV.
4. **Co-locate (physically or in time) domain and technology work** — handoff-shaped collaboration loses the translation layer entirely.

## See also

- [[strong-stakeholder-engagement-is-decisive]] — companion lesson at the relationship layer.
- [[integration-matters-more-than-model-choice]] — companion at the systems layer.
- [[new-ways-of-working-need-change-management]] — companion at the people layer.

---
title: AI is rarely the primary challenge
type: lesson
slug: ai-is-rarely-the-primary-challenge
phase: I-and-II
insight_domain: ai-deployment
project: [smart-parking, infrastructure-maintenance, digital-eye-clinic, medical-documentation, building-permits]
concept: [data-access, partner-bottleneck]
regulation: []
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-17
  - 00-overview-phase2-build-and-share#page-9
  - 00-overview-phase1-play-and-learn#page-17
  - p1-smart-parking#page-17
  - p1-infrastructure-maintenance#page-6
  - p2-digital-eye-clinic#page-19
  - p2-digital-eye-clinic#page-26
  - p2-building-permits#page-22
  - p2-building-permits#page-23
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# AI is rarely the primary challenge

The Phase II booklet ([[00-overview-phase2-build-and-share]]) opens its Technology insights (§04) with this finding, under the heading «KI ist selten die grösste Herausforderung»:

> *«Die eingesetzten KI-Technologien sind in vielen Fällen bereits verfügbar und leistungsfähig (z. B. Bilderkennung bei Smart Parking oder Spracherkennung für medizinische Transkription). Die grösseren Herausforderungen liegen in Infrastruktur, Datenzugang, Integration, Governance und Nutzung im Arbeitsalltag.»*

In the booklet's English version: "In many cases, the deployed AI technologies are already available and mature (e.g. computer vision in smart parking or speech recognition for medical transcription). The more significant challenges lie in infrastructure, data access, integration, governance, and adoption in day-to-day operations." [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

## Evidence

The model rarely fails. The surrounding system does:

| Project | What the AI did | What was actually hard |
|---|---|---|
| [[smart-parking]] | Camera-based vehicle detection — mature CV | Property-owner consent for camera placement [(p1-smart-parking p. 17)](../sources/p1-smart-parking.md) |
| [[infrastructure-maintenance]] | Drone-based defect detection — mature CV | Military base access permissions [(p1-infrastructure-maintenance p. 6, EN version)](../sources/p1-infrastructure-maintenance.md) |
| [[digital-eye-clinic]] | Retinal-image classification — established medical AI | Hospital data-sharing agreements [(p2-digital-eye-clinic p. 26)](../sources/p2-digital-eye-clinic.md) + in-house platform engineering [(p2-digital-eye-clinic p. 19)](../sources/p2-digital-eye-clinic.md) |
| [[medical-documentation]] | LLM transcription — commodity capability | Patient-data protection blocking deployment entirely [(00-overview-phase2-build-and-share p. 9)](../sources/00-overview-phase2-build-and-share.md) |
| [[building-permits]] | Plan-document understanding — frontier capability | Integration with eBaugesucheZH [(p2-building-permits p. 23)](../sources/p2-building-permits.md) + administrative-reproducibility tension [(p2-building-permits p. 22)](../sources/p2-building-permits.md) |

The Phase I overview drew the same conclusion from the Smart Parking roll-out: *«Die meisten Herausforderungen waren somit nicht KI-bezogen, sondern betrafen die grundlegende technische Infrastruktur.»* Most challenges, in other words, were not AI-related but concerned the basic technical infrastructure [(00-overview-phase1-play-and-learn p. 17)](../sources/00-overview-phase1-play-and-learn.md).

> [!sandbox-operations]
> Attribution: much of the "what was actually hard" column records obstacles the sandbox programme cleared in its operator role, not findings from a deploying organisation's own project files. Property-owner consent, military base access and hospital data agreements were partner-management work done by the programme team. For programme operators, the same table reads as a checklist of where pilot timelines stall.

## How to apply

When scoping a new AI pilot, do **not** start with model choice. Start with:

1. **Who needs to give you access** (partners, supervisors, data subjects)?
2. **What data exists, and what's its access regime?**
3. **What's the integration surface** (existing systems, processes, governance)?
4. **What's the adoption barrier** (training, change management, organisational alignment)?

If you can't answer those four, model choice is premature. If you *can*, model choice is often a swap-in decision rather than a hard engineering problem — see [[model-agnostic-architecture]].

## See also

- [[scoping-is-ai-the-right-approach]] — the broader theme this lesson anchors.
- [[partner-bottleneck]] — the cross-cutting failure mode this lesson names.
- [[data-access]] / [[data-access-is-the-most-powerful-lever]] — the most-cited blocker.

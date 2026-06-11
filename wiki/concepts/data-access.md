---
title: Data Access
type: concept
slug: data-access
canonical_source: null
related: [partner-bottleneck, pseudonymisation]
appears_in: [smart-parking, infrastructure-maintenance, ai-in-education, digital-eye-clinic, medical-documentation, building-permits]
created: 2026-05-28
updated: 2026-06-10
---

# Data Access

A derived concept (not in the booklet glossary, but the booklet's §04 Technology calls it out explicitly): data access is the most powerful lever, since even seemingly simple datasets can generate substantial value for the development and optimisation of AI systems, and when made accessible they enable a wide range of providers to train, validate, and improve their models [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md):

> *«Zugang zu Daten schafft den grössten Hebel: Auch vermeintlich triviale Datensätze haben einen hohen Mehrwert für die Entwicklung und Optimierung von KI-Systemen. Werden sie zugänglich gemacht, ermöglichen sie einer breiten Zahl von Anbietern, ihre Modelle zu trainieren, zu validieren und zu verbessern (z. B. hochaufgelöste Drohnenaufnahmen einer Landepiste).»*

## The pattern across the corpus

Data access is the chokepoint that recurs in **every project** — but the specific blocker differs:

| Project | Data-access constraint |
|---|---|
| [[smart-parking]] | Property-owner consent for camera placement. |
| [[infrastructure-maintenance]] | Military base access for drone deployment. |
| [[ai-in-education]] | School-IT access. |
| [[digital-eye-clinic]] | Hospital data-sharing agreements. |
| [[medical-documentation]] | Patient-record protection blocked operational use. |
| [[building-permits]] | Negotiated access to real applications via Stadt Kloten. |

The booklet calls this out as the *"partner-bottleneck"* pattern more often than as a model-quality issue — see [[partner-bottleneck]].

## Productive responses

- **Make derived datasets public** when possible. [[infrastructure-maintenance]] → IBM Research dataset on Hugging Face is the canonical example.
- **Pseudonymise upstream**. [[pseudonymisation]] is the technique that unlocks otherwise-blocked data sources.
- **Codify partner expectations early**. The booklet's §04 Organisation finding «Starke Einbindung entscheidet über Erfolg» (strong stakeholder engagement is decisive) names committed implementation partners with clear expectations from the outset [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md).

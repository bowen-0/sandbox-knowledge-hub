---
title: Combine frontier models and open-source solutions strategically
type: lesson
slug: combine-frontier-and-open-source-strategically
phase: II
insight_domain: ai-deployment
project: [digital-eye-clinic, building-permits, medical-documentation]
concept: [frontier-models, model-agnostic-architecture]
regulation: []
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-17
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, procurement]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# Combine frontier models and open-source solutions strategically

From [[00-overview-phase2-build-and-share]], section 04 Technology [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md):

> *«Frontier-Modelle vs. Open Source gezielt kombinieren: Anforderungen an Datenschutz, Performance, Kosten und Skalierbarkeit unterscheiden sich je nach Anwendungsfall stark. Organisationen können kommerzielle Frontier-Modelle aus der Cloud mit lokal betriebenen Open-Source-Modellen kombinieren und wählen idealerweise je nach Anforderung das passende Set-up (z. B. im Gesundheitskontext).»*

In the English edition (also p. 17) this reads: "Combine frontier models and open-source solutions strategically: requirements relating to data protection, performance, cost, and scalability vary significantly across use cases. Organisations can combine commercial frontier models from the cloud with locally deployed open-source models and should select the most appropriate configuration based on specific requirements (e.g. in healthcare contexts)."

## Evidence base

The booklet does **not** prescribe one-or-the-other. It prescribes *deliberate combination*:

| Use case property | Implies… |
|---|---|
| Sensitive data, no cloud | Open-source, locally deployed |
| Maximum capability needed | Frontier model from cloud |
| Cost-sensitive at scale | Open-source, optimised for serving |
| Rapidly evolving capability frontier | Frontier model (gets better continuously) |
| Auditability + modifiability required | Open-source |
| Latency-sensitive at the edge | Open-source, edge-deployed |

[[digital-eye-clinic]] is the canonical example — open-source platform because hospital data cannot leave the institution. [[building-permits]] is the inverse — frontier-model benchmark because the prototype tests the absolute capability ceiling. [[medical-documentation]] sits in the middle — providers will likely deploy hybrid configurations as the use case scales.

## How to apply

1. **Audit your constraints first** — data residency, cost ceiling, capability floor, latency.
2. **Reach for open-source when constraints bind** — and that's *often*, especially in healthcare and public administration.
3. **Reach for frontier models when ceiling matters** — benchmarking, hardest cases, rapidly improving capabilities.
4. **Architect to support both** — see [[model-agnostic-architecture]].

## See also

- [[model-agnostic-architecture]] — the concept that makes this combination ergonomic.
- [[open-source-as-procurement-alternative]] — when commercial doesn't fit at all.
- [[frontier-models]] — concept definition.

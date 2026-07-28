---
title: AI providers should integrate regulation early into product development
type: lesson
phase: I-and-II
insight_domain: ai-deployment
project: [autonomous-systems, inspection-robots, medical-documentation, building-permits]
concept: []
regulation: [eu-ai-act, machinery-regulation, dsg-fadp]
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-18
  - 00-overview-phase2-build-and-share#page-10
  - 00-overview-phase2-build-and-share#page-14
  - p1-autonomous-systems#page-9
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [scoping, procurement]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# AI providers should integrate regulation early into product development

The [[00-overview-phase2-build-and-share]] booklet states this as a cross-cutting legal insight in section 04 (Legal):

> *"AI providers should integrate regulatory considerations early into product development: if regulatory requirements are addressed too late, flawed assumptions may arise in the business model. Early clarification is essential to avoid pursuing an incorrect development path. For example, the 'Autonomous Systems' project showed that retrofitting existing agricultural vehicles for automation may require full recertification of the product."* [(Build & Share (Phase II overview report), p. 18)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

- **[[autonomous-systems]]** — the canonical case: agricultural-vehicle retrofitting required full re-certification. The business model assumed retrofit; the regulation imposed re-cert. The Phase I legal guide makes the underlying rule explicit: product-safety rules also apply to modified products, so any existing certification must be re-examined after changes [(Autonomous Systems report, p. 9)](../sources/p1-autonomous-systems.md).
- **[[inspection-robots]]** — engaged [[eu-ai-act]] + [[machinery-regulation]] interplay early; ISO/IEC 42001 piloted in parallel rather than bolted on later [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md).
- **[[medical-documentation]]** — patient-data protection blocked operational deployment entirely [(Build & Share (Phase II overview report), p. 10)](../sources/00-overview-phase2-build-and-share.md); had the data-protection regime been engaged at product-design time, the operational design might have been different (e.g. on-prem deployment from day one).

## How to apply

1. **In the first sprint of an AI product**, map the applicable regulations and the *cheapest* changes that would put you out of scope.
2. **Engage supervisory authorities** before locking in product architecture — see [[regulatory-roundtable]] for the high-leverage format.
3. **Treat regulation as a design constraint**, not a compliance audit at the end.

## See also

- [[autonomous-systems]] — the canonical case.
- [[continuous-regulatory-learning-beats-rigid-approval]] — what the regulator-side equivalent looks like.
- [[scoping-is-ai-the-right-approach]] — broader scoping theme.

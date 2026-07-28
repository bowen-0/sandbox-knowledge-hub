---
title: Scaling fails on integration, not on model performance
type: lesson
phase: I-and-II
insight_domain: ai-deployment
project: [building-permits, digital-eye-clinic, smart-parking]
concept: []
regulation: []
stakeholder: []
sources:
  - 00-overview-phase2-build-and-share#page-19
  - 00-overview-phase2-build-and-share#page-17
  - p2-building-permits#page-23
  - p2-building-permits#page-29
  - p2-digital-eye-clinic#page-27
  - p1-smart-parking#page-9
confidence: high
freshness: 2026-05
applies_to_lifecycle_stage: [deployment]
cross_cutting: true
created: 2026-05-28
updated: 2026-06-10
---

# Scaling fails on integration, not on model performance

From [[00-overview-phase2-build-and-share]] §04 Organisation:

> *"Scaling often fails at integration, not at AI performance: the transition from pilot to operational deployment frequently fails due to insufficient integration into existing systems, processes, and governance structures, rather than limitations of the models themselves."* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md)

## Evidence base

- **[[building-permits]]**: the prototype is explicitly architected for integration with **eBaugesucheZH** (cantonal building-permit platform) and the **GIS-Browser** [(Building Permits report, p. 29)](../sources/p2-building-permits.md). The report warns: *"Isolated isolated solutions increase interface costs, media discontinuity and susceptibility to errors, and complicate scaling, operation and acceptance in the building permit process."* [(Building Permits report, p. 23)](../sources/p2-building-permits.md) (the doubled "Isolated isolated" is as printed in the EN edition)
- **[[digital-eye-clinic]]**: clinical workflow integration was as load-bearing as the diagnostic model itself; the **modular open-source platform** was designed around integration constraints [(Digital Eye Clinic report, p. 27)](../sources/p2-digital-eye-clinic.md).
- **[[smart-parking]]**: successful Frauenfeld roll-out followed *exactly* because integration into city operations was deliberate [(Smart Parking report, p. 9)](../sources/p1-smart-parking.md); the model was the easy part [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md).

## How to apply

When taking an AI pilot toward production:

1. **Map the system integration surface** before optimising the model. Existing CMSs, databases, GIS layers, identity systems, audit logs.
2. **Map the process integration** — where does the AI fit in the human workflow? Who reviews? Who escalates?
3. **Map the governance integration** — who is accountable? What's the change-management plan? How do users learn the new affordance?

A 60% accurate model that integrates well beats a 90% accurate model that doesn't.

## See also

- [[ai-is-rarely-the-primary-challenge]] — broader scoping framing.
- [[building-permits]] / [[digital-eye-clinic]] — canonical cases.
- [[new-ways-of-working-need-change-management]] — companion lesson at the people layer.

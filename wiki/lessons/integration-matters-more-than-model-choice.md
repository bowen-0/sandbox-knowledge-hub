---
title: Scaling fails on integration, not on model performance
type: lesson
slug: integration-matters-more-than-model-choice
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
  - p2-digital-eye-clinic#page-28
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

> *«Skalierung scheitert oft an Integration, nicht an KI: Der Übergang vom Pilot in den produktiven Betrieb scheitert häufig an fehlender Integration in bestehende Systeme, Prozesse und Governance-Strukturen – nicht an der Modellleistung.»*

In English: scaling often fails at integration, not at AI performance; the transition from pilot to operational deployment frequently fails due to insufficient integration into existing systems, processes, and governance structures, rather than limitations of the models themselves [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md).

## Evidence base

- **[[building-permits]]**: the prototype is explicitly architected for integration with **eBaugesucheZH** (cantonal building-permit platform) and the **GIS-Browser** [(p2-building-permits p. 29)](../sources/p2-building-permits.md). The report warns that isolated stand-alone solutions increase interface overhead, media discontinuities and error-proneness, and hamper scaling, operation and acceptance: *«Isolierte Insellösungen erhöhen Schnittstellenaufwand, Medienbrüche und Fehleranfälligkeit und erschweren Skalierung, Betrieb und Akzeptanz im Baubewilligungsverfahren.»* [(p2-building-permits p. 23)](../sources/p2-building-permits.md)
- **[[digital-eye-clinic]]**: clinical workflow integration was as load-bearing as the diagnostic model itself; the **modular open-source platform** was designed around integration constraints [(p2-digital-eye-clinic p. 28)](../sources/p2-digital-eye-clinic.md).
- **[[smart-parking]]**: successful Frauenfeld roll-out followed *exactly* because integration into city operations was deliberate [(p1-smart-parking p. 9)](../sources/p1-smart-parking.md); the model was the easy part [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md).

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

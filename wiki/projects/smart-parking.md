---
title: Smart Parking
type: project
slug: smart-parking
phase: I
year: 2024
status: completed
sector: mobility
sources:
  - p1-smart-parking#page-4
  - p1-smart-parking#page-5
  - p1-smart-parking#page-6
  - p1-smart-parking#page-10
  - p1-smart-parking#page-15
  - p1-smart-parking#page-17
  - p1-smart-parking#page-21
  - 00-overview-phase2-build-and-share#page-5
  - 00-overview-phase2-build-and-share#page-17
stakeholder: [raphael-von-thiessen, stephanie-volz, stadt-frauenfeld]
regulation: [dsg-fadp, idg-zh]
concept: [computer-vision, pseudonymisation, data-minimisation, partner-bottleneck]
related_projects: [infrastructure-maintenance, building-permits, ai-in-education, digital-eye-clinic]
created: 2026-05-28
updated: 2026-06-10
---

# Smart Parking

Camera-based detection of free parking spaces using image recognition [(p1-smart-parking p. 4)](../sources/p1-smart-parking.md). The Phase I project that codified the operational playbook for computer vision in Swiss public-sector deployments — covering camera placement [(p1-smart-parking p. 5)](../sources/p1-smart-parking.md), image-handling under the Swiss legal stack [(p1-smart-parking p. 10)](../sources/p1-smart-parking.md), and the canonical **privacy-by-design vocabulary** (low resolution, masking, edge computing, instant deletion, data minimisation) that the rest of the Phase I corpus subsequently reuses [(p1-smart-parking p. 15)](../sources/p1-smart-parking.md).

## Outcome

Productive deployment in **Frauenfeld**, with subsequent roll-out to additional cantons. The Phase II booklet records the status: *«So ist das Projekt Smart Parking in der Stadt Frauenfeld produktiv im Einsatz und wurde ausgeweitet.»* — the Smart Parking project in the City of Frauenfeld is in productive use and has been expanded [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). Cited in [[00-overview-phase2-build-and-share]] as one of the canonical Phase I projects that scaled beyond the sandbox engagement itself.

## Key learnings

- The **partner-bottleneck** pattern: property-owner access to mount cameras is harder to secure than the AI itself [(p1-smart-parking p. 6)](../sources/p1-smart-parking.md) [(p1-smart-parking p. 17)](../sources/p1-smart-parking.md).
- Privacy-by-design lexicon defined here [(p1-smart-parking p. 15)](../sources/p1-smart-parking.md) recurs in [[ai-in-education]], [[digital-eye-clinic]], and is referenced in the Build & Share insights synthesis ([[00-overview-phase2-build-and-share]] §04 Technology, [p. 17](../sources/00-overview-phase2-build-and-share.md)).
- Image recognition on the physical environment is a *much easier* visual modality than the plan-document understanding examined later in [[building-permits]].

## Stakeholders

[[raphael-von-thiessen]] (programme lead), [[stephanie-volz]] (legal). Test partner: [[stadt-frauenfeld]] [(p1-smart-parking p. 21)](../sources/p1-smart-parking.md).

## See also

- [[p1-smart-parking]] — the source PDF.
- [[infrastructure-maintenance]] — sibling Phase I computer-vision pilot.
- [[building-permits]] — Phase II contrast (plan-document understanding vs. environment recognition).

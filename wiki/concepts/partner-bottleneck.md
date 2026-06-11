---
title: Partner Bottleneck
type: concept
slug: partner-bottleneck
canonical_source: null
related: [data-access]
appears_in: [smart-parking, infrastructure-maintenance, ai-in-education, digital-eye-clinic, medical-documentation, inspection-robots, bridge-monitoring]
created: 2026-05-28
updated: 2026-06-10
---

# Partner Bottleneck

A derived concept that names a cross-cutting failure mode: **the AI is rarely the hardest part — partner access is.** Surfaces in the Build & Share booklet under «Abhängigkeiten von Testpartnern» (dependencies on test partners) [(00-overview-phase2-build-and-share p. 15)](../sources/00-overview-phase2-build-and-share.md):

> *«Die Zusammenarbeit mit Testpartnern ist ein entscheidender Erfolgsfaktor, gleichzeitig aber auch die grösste Abhängigkeit im Sandbox-Ansatz. Verfügbarkeiten, Datenzugänge und interne Entscheidungsprozesse auf Partnerseite sind oft nur begrenzt planbar und beeinflussen die Umsetzbarkeit direkt.»*

Collaboration with test partners is a critical success factor, but also represents the greatest dependency within the sandbox approach: availability, access to data, and internal decision-making processes on the partner side are often only partially predictable and directly affect feasibility.

## Examples in the corpus

| Project | Partner blocker |
|---|---|
| [[smart-parking]] | Property-owner consent for camera mounting. |
| [[infrastructure-maintenance]] | Military base access permissions. |
| [[ai-in-education]] | School-IT environment integration. |
| [[digital-eye-clinic]] | Hospital data-sharing agreements. |
| [[medical-documentation]] | Stringent patient-data protection requirements — blocked operational deployment entirely. |
| [[inspection-robots]] | No suitable test partner found in the EU machinery context — pivoted to analysis-only. |
| [[bridge-monitoring]] | Original municipal footbridge partner withdrew — pivoted to SOB railway bridge. |

## Mitigations from the booklet

- **Strong openness to outcomes**, flexible / iterative prioritisation by the project team [(00-overview-phase2-build-and-share p. 15)](../sources/00-overview-phase2-build-and-share.md).
- Early identification of dependencies; timeline / project focus adjusted accordingly [(00-overview-phase2-build-and-share p. 15)](../sources/00-overview-phase2-build-and-share.md).
- The role of the **mandated expert** and **domain sparring partner** in the partner-role taxonomy [(00-overview-phase2-build-and-share p. 8)](../sources/00-overview-phase2-build-and-share.md) lets the project preserve value even when test-partner access slips.

## See also

- [[data-access]] — closely entangled; sometimes the same pattern at different layers.
- [[real-world-testing]] — when this fails, projects often pivot to analysis-only status.

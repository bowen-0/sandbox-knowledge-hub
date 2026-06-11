---
title: Partner roles around a sandbox pilot — Who do you actually need?
type: synthesis
slug: partner-roles-around-a-pilot
insight_domain: both
question: "Who do I need around my AI pilot, and what do they each do?"
audience: [administrative-staff-scoping-a-pilot, sandbox-applicants, ai-providers-pre-rfp]
connects:
  - partner-pivot-is-normal
  - regulatory-roundtable-is-high-leverage
  - integration-matters-more-than-model-choice
  - partner-bottleneck
  - 00-overview-phase2-build-and-share
created: 2026-05-28
updated: 2026-06-11
---

# Partner roles around a sandbox pilot

> **For:** anyone scoping a sandbox-style AI pilot, an AI provider preparing a sandbox application, or a public-sector lead wondering "who needs to be at the table."
>
> **TL;DR:** The Phase II booklet codifies a **5-role taxonomy** for partners around a pilot. Getting all five filled (or deliberately deciding to skip one) is what distinguishes successful pilots from stalled ones.

---

## The five roles (canonical from the booklet)

From the role diagram in [[00-overview-phase2-build-and-share]] §03 [(00-overview-phase2-build-and-share p. 8)](../sources/00-overview-phase2-build-and-share.md), with the booklet's German role names:

| Role | What they contribute | Example from corpus |
|---|---|---|
| **Test partner** (*Testpartner*) | Real-world application context, data, operational environment | [[stadt-kloten]] (Building Permits) — provided real building applications. [[sob]] (Bridge Monitoring) — provided the Reidholz railway bridge. |
| **Technical implementation partner** (*Technische Umsetzungspartner*) | Prototype/model/infrastructure development; works closely with test partner | [[nokema]], [[byte-studio]], [[gossweiler-ingenieure]] (Building Permits). [[irmos-technologies]] (Bridge Monitoring). [[modulos]] (Inspection Robots). |
| **Mandated expert** (*Mandatierte Experten*) | Regulatory or domain expertise under a formal mandate; delivers robust analyses | [[itsl-uzh]] (legal analysis on every project). [[stephanie-volz]] in personnel form. |
| **Domain sparring partner** (*Fachliche Sparring-Partner*) | Informal expert exchange, validation, quality assurance — no formal mandate | The named specialist support people in [[building-permits]] (FHNW, HSG, Building Department experts). |
| **Supervisory authority** (*Aufsichtsbehörden*) | Oversight-perspective feedback, regulatory clarification | [[swissmedic]] (health). [[bundesnetzagentur-de]] (Germany cross-border). The data-protection supervisory authority (medical documentation). |

This is **the** taxonomy the wiki uses on every `wiki/stakeholders/` page — see the `partner_role:` frontmatter field.

---

## Why the taxonomy is load-bearing

The booklet's framing, from §03:

> *«Die Umsetzung erfolgte in enger Zusammenarbeit mit einer Vielzahl von Partnern, die je nach Rolle und Expertise klar definierte Aufgaben übernahmen.»* [(00-overview-phase2-build-and-share p. 8)](../sources/00-overview-phase2-build-and-share.md)

In English: implementation took place in close collaboration with a large number of partners who took on clearly defined tasks according to their role and expertise.

The roles are *not* interchangeable:

- A test partner cannot substitute for a supervisory authority. (You can deploy with a test partner; you cannot deploy without regulator approval.)
- A technical implementation partner cannot substitute for a mandated expert. (They build the prototype; they do not analyse the law.)
- A domain sparring partner cannot substitute for a test partner. (They advise; they don't provide the operational environment.)

Conflating roles is the most common mistake the corpus surfaces — and the most common root cause of pilot stalls (see [[partner-bottleneck]]).

> [!sandbox-operations]
> The portfolio view: how the programme structures these roles across projects.
>
> - **Roles are assigned per project, with tasks defined by role and expertise.** Each pilot gets its own constellation of the five roles [(00-overview-phase2-build-and-share p. 8)](../sources/00-overview-phase2-build-and-share.md).
> - **One standing mandated expert serves the whole portfolio.** [[itsl-uzh]] appears on every sandbox project, which gives the programme continuity of legal analysis across heterogeneous pilots.
> - **Supervisor access is programme-mediated.** The programme facilitates contact with supervisory authorities and uses the [[regulatory-roundtable]] format to aggregate demand from multiple providers, so a supervisor can respond at scale (see [[regulatory-roundtable-is-high-leverage]]).
> - **A project with an unfillable role is pivoted, not cancelled.** When no suitable test partner was found for [[inspection-robots]], the project moved to a regulatory-analysis-only scope and still delivered substantial value [(00-overview-phase2-build-and-share p. 9)](../sources/00-overview-phase2-build-and-share.md).

---

## How to fill each role

> [!ai-deployment]
> Staffing your own pilot: where each role typically comes from.
>
> **Test partner.** The hardest one. Often the binding constraint — see [[data-access-patterns-and-unblocking]]. Patterns:
> - **Municipalities** ([[stadt-kloten]], [[stadt-frauenfeld]]) are willing test partners with bounded data.
> - **Hospitals** require extensive data-sharing agreements (years of lead time if going public-sector hospital).
> - **Infrastructure operators** (SOB, military) require physical access permissions.
>
> **Technical implementation partner.** Usually multiple. The corpus shows pilots often combine a *use-case-specific* implementation partner ([[nokema]] for building permits) with a *technical-platform* partner ([[byte-studio]]). For startup-scale teams, this distinction may collapse into one organisation.
>
> **Mandated expert.** For Swiss public-sector AI pilots, [[itsl-uzh]] is the standing default — they appear on every sandbox project. For non-sandbox engagements, look for university institutes with established public-administration relationships.
>
> **Domain sparring partner.** Lighter touch. Often individuals (named in project reports) rather than organisations. They cost less to engage but contribute less continuity. Useful for validation; not load-bearing.
>
> **Supervisory authority.** The hardest to engage *directly*, which is why [[regulatory-roundtable-is-high-leverage]]: the format aggregates demand from multiple providers and lets the supervisor respond at scale. For sandbox engagements, the sandbox programme itself often facilitates supervisor access.

---

## A scoping checklist

> [!ai-deployment]
> Before launching a sandbox-style pilot, name each role explicitly:
>
> - [ ] **Test partner**: who will host the operational environment / share the data?
> - [ ] **Technical implementation partner(s)**: who will build the prototype?
> - [ ] **Mandated expert(s)**: who will provide the formal regulatory / domain analysis?
> - [ ] **Domain sparring partner(s)**: who will validate informally?
> - [ ] **Supervisory authority**: which supervisor has remit, and how will you engage them (bilateral / sandbox-mediated / roundtable)?
>
> If you can't name a credible candidate for the first two, the pilot is at high risk of [[partner-bottleneck]]-driven failure. Plan a pivot direction in advance — see [[partner-pivot-is-normal]].

---

## When a role is missing — pivot directions

> [!ai-deployment]
> If a role stays unfilled, the corpus documents these pivot directions:
>
> - **No test partner** → pivot to **analysis-only** outcome class ([[inspection-robots]], [[medical-documentation]]) [(00-overview-phase2-build-and-share p. 9)](../sources/00-overview-phase2-build-and-share.md).
> - **No technical implementation partner** → the pilot may need to delay until one exists; not a fatal blocker.
> - **No mandated expert** → consider engaging [[itsl-uzh]] or equivalent before continuing.
> - **No supervisory engagement** → consider a [[regulatory-roundtable]] to aggregate demand and unlock supervisor time.

---

## What to read next

1. **[[partner-pivot-is-normal]]** — the lesson on handling partner gaps.
2. **[[regulatory-roundtable-is-high-leverage]]** — how to scale supervisory access.
3. **[[partner-bottleneck]]** — the concept this theme operationalises.
4. **[[data-access-patterns-and-unblocking]]** — the companion theme on the test-partner-flavoured constraint.

## See also

- [[00-overview-phase2-build-and-share]] — source of the 5-role taxonomy.
- [[integration-matters-more-than-model-choice]] — partner alignment is one form of integration work.

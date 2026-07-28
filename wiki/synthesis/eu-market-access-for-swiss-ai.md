---
title: EU market access for Swiss AI vendors — The sandbox playbook
type: synthesis
insight_domain: ai-deployment
question: "What's the EU market access pathway for my Swiss AI product?"
audience: [swiss-ai-vendors, public-sector-procurement, sandbox-applicants]
connects:
  - cross-border-collab-unlocks-eu-access
  - integrate-regulation-early
  - continuous-regulatory-learning-beats-rigid-approval
  - inspection-robots
  - autonomous-systems
  - eu-ai-act
  - machinery-regulation
  - iso-iec-42001
  - ai-convention-ch-implementation
  - anybotics
  - modulos
  - 00-overview-phase2-build-and-share
created: 2026-05-28
updated: 2026-06-11
---

# EU market access for Swiss AI vendors — The sandbox playbook

> **For:** Swiss AI vendors, startup founders, public-sector procurement officers evaluating Swiss vendors with EU ambition.
>
> **TL;DR:** Switzerland is not in the EU. EU AI regulation still applies to Swiss vendors selling into the EU market. The sandbox has established the canonical pattern: engage EU supervisory authorities *before* certification time, classify under the AI Act + sectoral regulation early, and pilot an [[iso-iec-42001]] AI-management system as the operational backbone.

---

## What changed between Phase I and Phase II

Phase I (2022–2024) operated almost entirely under Swiss law — the cantonal IDG / federal FADP / *Auftragsdatenbearbeitung* triad ([[auftragsdatenbearbeitung]]). [[autonomous-systems]] (Phase I) examined regulatory framing for autonomous machinery, but its frame was *Swiss product-liability* + the pre-2023 EU Machinery Directive.

Phase II (2024–2026) added EU regulation as a dominant frame, with the booklet listing targeted engagement with EU regulatory questions for the market access of local AI providers among the phase's strategic additions [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md):

- **[[eu-ai-act]]** — risk-based EU regulation of AI systems.
- **[[machinery-regulation]]** — the EU Machinery Regulation 2023/1230, replacing the older Machinery Directive; dynamically interacts with the AI Act for autonomous/safety-critical machinery.
- **[[iso-iec-42001]]** — international AI management-system standard, first published 2023.

The [[inspection-robots]] project — built around [[anybotics]] and [[modulos]] — was the explicit Phase II vehicle for working out this new regulatory geometry [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md).

---

## The cross-border collaboration pattern

The booklet ([[00-overview-phase2-build-and-share]] §03) names what was new:

> *"For the first time, the sandbox project also engaged in cross-border collaboration with competent supervisory authorities, e.g. the Federal Network Agency in Germany and the Office for Digital Innovation of the Principality of Liechtenstein."* [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md)

The two authorities are Germany's [[bundesnetzagentur-de]] and Liechtenstein's [[li-digital-innovation]].

This is **not** a regulatory shortcut — the EU regulations still apply in full. What changes is the **coordination cost**: a Swiss vendor would otherwise need to navigate each EU member-state authority bilaterally. The sandbox provides a structured convening surface. See [[cross-border-collab-unlocks-eu-access]] for the atomic lesson.

---

## The four-step playbook

### Step 1 — Risk-classify your product under the AI Act

The AI Act classifies AI systems by risk level — the corpus glossary gives the tiers as *"minimal, high or unacceptable"* [(Inspection Robots report, p. 37)](../sources/p2-inspection-robots.md). Most public-sector-facing AI in safety-critical or fundamental-rights-affecting domains lands in *high-risk*, triggering substantial obligations. See [[eu-ai-act]].

### Step 2 — Identify sectoral regulation that applies in parallel

The AI Act sits *alongside* sectoral regulation, not above it. Autonomous machinery? Add [[machinery-regulation]]. Medical device? Add MDR/IVDR. The interplay is dynamic and not always harmonised — see [[continuous-regulatory-learning-beats-rigid-approval]] for the broader implication.

### Step 3 — Pilot an [[iso-iec-42001]] AI-management system

Per [[inspection-robots]] (with [[modulos]]): ISO/IEC 42001 turns AI-governance requirements into an *operational* management system — governance roles, risk management, monitoring, continual improvement. It's process-level rather than artifact-level, which is the right shape for systems that retrain or evolve.

### Step 4 — Engage supervisory authorities continuously, not just at certification

Per [[integrate-regulation-early]] and [[regulatory-roundtable]]. The classical "certify-once, ship, never-engage-the-regulator-again" model fails for AI. Build supervisory feedback into your product lifecycle.

---

## What the sandbox can offer

> [!sandbox-operations]
> For a Swiss AI vendor with EU ambition:
>
> | Sandbox offering | What it gets you |
> |---|---|
> | **Project-level engagement** | Structured 9–12 month engagement with sandbox programme + [[itsl-uzh]] legal analysis; most Phase II use cases completed within 9 to 12 months [(Build & Share (Phase II overview report), p. 8)](../sources/00-overview-phase2-build-and-share.md). |
> | **Convening with EU authorities** | The [[inspection-robots]] precedent — cross-border collab with [[bundesnetzagentur-de]] / [[li-digital-innovation]] [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md). |
> | **ISO/IEC 42001 piloting** | [[modulos]]-style operationalisation of AI-management standards [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md). |
> | **Regulatory roundtable participation** | If your problem space has 5+ peer vendors — see [[regulatory-roundtable]]. |
> | **Reference reports** | Published sandbox reports are jurisdictionally credible artefacts you can cite in EU regulatory submissions. |
>
> The boundary: the sandbox does **not** suspend regulatory requirements, does **not** certify your product for you, does **not** provide financial compensation; all projects run within existing law without regulatory exemptions, and participating organisations receive no financial compensation [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md). It provides clarity, structure, and supervisory access.

---

## When the sandbox is not the right vehicle

> [!sandbox-operations]
> - If you already have an EU-side test partner and direct supervisor engagement, the sandbox adds coordination cost without much benefit.
> - If your product is *purely* commercial-private (no public-sector use case), the sandbox's value proposition is weaker.
> - If you need rapid certification (next 3 months), the sandbox cadence is wrong — projects run 9–12 months [(Build & Share (Phase II overview report), p. 8)](../sources/00-overview-phase2-build-and-share.md).

---

## What to read next

1. **[[cross-border-collab-unlocks-eu-access]]** — the foundational lesson.
2. **[[inspection-robots]]** — the canonical case study.
3. **[[integrate-regulation-early]]** — the broader regulatory-engagement framing.
4. **[[continuous-regulatory-learning-beats-rigid-approval]]** — why one-shot certification fails for AI.
5. **[[iso-iec-42001]]** — the standard worth knowing about.
6. **[[eu-ai-act]]** + **[[machinery-regulation]]** — the regulations themselves.

## See also

- [[zh-ai-ecosystem-strategy-2026-2029]] — Pillar II (AI Startup Support) directly addresses this audience.
- [[ai-convention-ch-implementation]] — the Swiss-side counterpart that complements EU regulation domestically.

---
title: How to unblock data access for your pilot — Patterns from the corpus
type: synthesis
slug: data-access-patterns-and-unblocking
insight_domain: ai-deployment
question: "How do I unblock data access for my AI pilot?"
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp, partner-org-leads]
connects:
  - data-access-is-the-most-powerful-lever
  - data-reuse-multiplies-pilot-impact
  - partner-pivot-is-normal
  - strong-stakeholder-engagement-is-decisive
  - data-access
  - partner-bottleneck
  - pseudonymisation
  - data-minimisation
  - auftragsdatenbearbeitung
  - infrastructure-maintenance
  - 00-overview-phase2-build-and-share
created: 2026-05-28
updated: 2026-06-11
---

# How to unblock data access for your pilot

> **For:** AI providers, public-administration product owners, sandbox project leads who have hit a data-access wall.
>
> **TL;DR:** The booklet calls data access the *"most powerful lever"* (EN version, p. 17). The corpus's 10 projects each have a different blocker — but the unblocking patterns are surprisingly consistent.

---

## The booklet's own framing

From [[00-overview-phase2-build-and-share]] §04 Technology:

> *«Zugang zu Daten schafft den grössten Hebel: Auch vermeintlich triviale Datensätze haben einen hohen Mehrwert für die Entwicklung und Optimierung von KI-Systemen. Werden sie zugänglich gemacht, ermöglichen sie einer breiten Zahl von Anbietern, ihre Modelle zu trainieren, zu validieren und zu verbessern (z. B. hochaufgelöste Drohnenaufnahmen einer Landepiste).»* [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

The English edition (EN version, p. 17) renders this as: "Data access is the most powerful lever: even seemingly simple datasets can generate substantial value for the development and optimisation of AI systems. When made accessible, they enable a wide range of providers to train, validate, and improve their models (e.g. high-resolution drone imagery of a runway)."

This is the explicit ranking of priorities: data access *above* model choice, integration, or governance.

---

## The blocker taxonomy

Every project in the corpus has a different data-access blocker. Naming yours is the first step.

| Blocker type | Example | Where in the corpus |
|---|---|---|
| **Property / physical access** | Camera mounts; military base permissions | [[smart-parking]]; [[infrastructure-maintenance]] |
| **Institutional gatekeeping** | School-IT access; hospital data agreements | [[ai-in-education]]; [[digital-eye-clinic]] |
| **Regulatory blocker** | Patient-record protection; commercial data confidentiality | [[medical-documentation]] |
| **Partner withdrawal** | Original implementation partner walks away | [[bridge-monitoring]] |
| **No suitable test partner exists** | Specialised use case with no production-ready partner | [[inspection-robots]] |

See [[partner-bottleneck]] for the concept; the pattern recurs in 6 of 10 sandbox projects.

---

## Four unblocking patterns

### 1. Pseudonymisation + commissioned-data-processing contracts

The Phase I default. Combine [[pseudonymisation]] (data-subject identifying attributes replaced) with [[auftragsdatenbearbeitung]] (third-party AI service contracted under the controller's authority). Together they take a non-trivial fraction of "we can't share this data" cases into "we can share an anonymised version under contract."

**When it works:** the data has identifying attributes that can be removed without destroying the use case. *Most* image data, *most* text data, *most* tabular data.

**When it doesn't:** the data's value is precisely in the identifying detail (rare in administrative use cases, but applies in some health-record scenarios).

### 2. Partner relationship work (more than the AI work)

The corpus has six projects where partner-relationship work was the load-bearing input. The booklet states this as its first organisational finding, under the heading «Starke Einbindung entscheidet über Erfolg» ([[00-overview-phase2-build-and-share]] §04 Organisation; see [[strong-stakeholder-engagement-is-decisive]]):

> *«Erfolgreiche Projekte zeichnen sich durch engagierte Umsetzungspartner aus, die Zeit, Ressourcen, Netzwerk und fachliches Feedback einbringen (z. B. umfangreiche Tests im Smart-Parking-Projekt in Frauenfeld).»* [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md)

In English: successful projects are characterised by committed implementation partners who contribute time, resources, network, and expert feedback (for example the extensive testing in the Smart Parking project in Frauenfeld).

**How to apply (deployment teams):** identify the partner-access dependency before development starts, not when it bites. Treat partner management as a first-class workstream, not a contingency.

> [!sandbox-operations]
> The original framing of this pattern is a programme construct: the sandbox team identifies the partner-access dependency at pilot intake, not during execution, and pre-defines acceptable pivot directions if access slips, so a single partner's withdrawal does not strand the engagement. See [[partner-pivot-is-normal]] for how this plays out across the portfolio.

### 3. Pivot to analysis-only (when access cannot be unblocked)

The booklet treats this as a legitimate outcome class. 2 of 5 Phase II projects pivoted ([[medical-documentation]], [[inspection-robots]]) [(00-overview-phase2-build-and-share p. 9)](../sources/00-overview-phase2-build-and-share.md). Both delivered substantial value via regulatory analysis, supervisory-authority engagement, and best-practice documentation:

> *«Beide Projekte lieferten dennoch substanzielle Mehrwerte, indem sie regulatorische Klarheit schufen, Best Practices ableiteten und die Skalierbarkeit der Ergebnisse über den konkreten Anwendungsfall hinaus ermöglichten.»* [(00-overview-phase2-build-and-share p. 9)](../sources/00-overview-phase2-build-and-share.md)

In English: both projects nevertheless delivered substantial value by creating regulatory clarity, deriving best practices, and enabling the results to scale beyond the specific use case.

**How to apply (deployment teams):** the key is recognising early, before the team has spent its budget chasing inaccessible data, that the regulatory groundwork can be a deliverable in its own right. A clarified legal basis is a usable result even when the system cannot be tested.

> [!sandbox-operations]
> "Pivot to analysis-only" as a formal outcome class is a sandbox-programme construct: the programme reframes a blocked pilot as a regulatory analysis instead of closing it. See [[partner-pivot-is-normal]] for the playbook.

### 4. Publishing derived datasets (so the next pilot doesn't hit the same wall)

The canonical case: [[infrastructure-maintenance]] → IBM Research dataset on Hugging Face [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). The sandbox's investment in data collection becomes a public benchmark, multiplying impact beyond the engagement. See [[data-reuse-multiplies-pilot-impact]].

**How to apply:** at intake, plan the derived dataset's downstream publication. Design pseudonymisation, annotation quality, and licensing to enable reuse.

---

## A diagnostic checklist

Before you escalate to "we can't get the data":

- [ ] Have you identified the **specific** blocker (property / institutional / regulatory / partner)?
- [ ] Have you tried [[pseudonymisation]] + [[auftragsdatenbearbeitung]] as the legal-technical pattern?
- [ ] Have you engaged the [[data-protection-officer]] *as a partner*, not as a gatekeeper?
- [ ] Have you considered scoping down to a **subset** of the data the partner could share (per [[data-minimisation]])?
- [ ] Is there an **alternative partner** in the same problem space (the [[bridge-monitoring]] pivot pattern)?
- [ ] Could the project pivot to **regulatory analysis** as a primary outcome ([[partner-pivot-is-normal]])?
- [ ] If you do collect data, can it be published downstream to enable future pilots ([[data-reuse-multiplies-pilot-impact]])?

---

## What to read next

1. **[[data-access-is-the-most-powerful-lever]]** — the foundational lesson.
2. **[[partner-bottleneck]]** — the cross-cutting concept this theme operationalises.
3. **[[partner-pivot-is-normal]]** — what to do when access can't be unblocked.
4. **[[pseudonymisation]]** + **[[data-minimisation]]** + **[[auftragsdatenbearbeitung]]** — the legal-technical pattern.
5. **[[data-reuse-multiplies-pilot-impact]]** — the long-term play.

## See also

- [[scoping-is-ai-the-right-approach]] — broader scoping theme.
- [[partner-roles-around-a-pilot]] — companion theme on partner-side success factors.

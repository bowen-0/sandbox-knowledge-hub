---
title: Pre-submission quality improvement is higher-leverage than post-submission AI processing
type: lesson
phase: II
insight_domain: ai-deployment
project: [building-permits]
concept: []
regulation: [fadp-art-21]
stakeholder: [raphael-von-thiessen]
sources:
  - p2-building-permits#page-7
  - p2-building-permits#page-6
  - p2-building-permits#page-8
  - p2-building-permits#page-26
  - p2-building-permits#page-27
confidence: medium
freshness: 2026-04
applies_to_lifecycle_stage: [scoping]
created: 2026-05-28
updated: 2026-06-10
---

# Pre-submission quality improvement is higher-leverage than post-submission AI processing

From the [[building-permits]] report, stated as a pull quote by the sandbox programme lead:

> *"The greatest leverage of AI currently lies in improving the quality and completeness of building applications before submission."*
> — [[raphael-von-thiessen]], AI Sandbox Programme Manager, Canton of Zurich [(Building Permits report, p. 7)](../sources/p2-building-permits.md)

## Evidence base

In any process where errors cascade — incomplete inputs trigger queries, suspensions, prolonged proceedings — fixing errors **at the input stage** beats handling them at every downstream stage.

- **A large share of applications arrive incomplete or formally incorrect.** The report states it plainly: *"A significant proportion of planning applications are incomplete or incorrect. Formal deficiencies and missing information prevent a substantive review and lead to the suspension of proceedings, even though the planning intent is often clear."* [(Building Permits report, p. 6)](../sources/p2-building-permits.md)
- **The pre-check is its own use case.** An AI-assisted **pre-submission** check that catches missing drawings, wrong scales, or unsigned forms eliminates the largest single cost driver in the process — far more than an AI-assisted *review* that processes the same incomplete inputs more cleverly. The report defines the goal of this use case: *"The aim is to improve the quality and completeness of applications even before they enter the formal approval process."* [(Building Permits report, p. 8)](../sources/p2-building-permits.md)
- **The downstream review is still where the substantive decision happens** — but the *volume* of work it absorbs drops dramatically.

## How to apply

The lesson holds beyond building permits. When scoping an AI use case in an administrative procedure:

1. Look for high-volume process stages with recurring formal-error patterns, and **define the formal-completeness criteria** that must be true for a submission to enter formal proceedings.
2. **Build a pre-check** that AI can run on the applicant's draft, run voluntarily by the applicant.
3. **Make the pre-check explicitly non-binding** to avoid [[fadp-art-21]] / state-liability complications. The report's legal chapter notes that a voluntary pre-check is not a ruling, yet reliance on it can still create liability through protected trust, so providers must make clear *"that the pre-check is non-binding and that the relevant verification takes place in the formal procedure by the Authority"* [(Building Permits report, p. 27)](../sources/p2-building-permits.md). Art. 21 FADP safeguards attach to fully automated individual decisions; a pre-check sits upstream of the actual decision [(Building Permits report, p. 26)](../sources/p2-building-permits.md).
4. Keep the official review unchanged — the AI value is in input quality, not in changing the review.

## See also

- [[building-permits]] — canonical case.
- [[fadp-art-21]] — the legal constraint that shapes the pre-check framing.
- [[rule-based-beats-generative-for-defined-logic]] — pre-checks are mostly rule-based; AI is for unstructured-input handling.

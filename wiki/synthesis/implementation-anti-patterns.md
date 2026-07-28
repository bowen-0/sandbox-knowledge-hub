---
title: Implementation anti-patterns — the recurring mistakes the pilots warn against
type: synthesis
insight_domain: ai-deployment
priority: high
question: "What are the biggest implementation mistakes that appeared across Sandbox projects?"
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp, policymakers, anyone-querying-the-wiki-for-general-guidance]
connects:
  - phase-2-cross-cutting-principles
  - ai-is-rarely-the-primary-challenge
  - integrate-regulation-early
  - value-must-be-clearly-articulated
  - domain-expertise-tech-interface-is-critical
  - data-access-is-the-most-powerful-lever
  - new-ways-of-working-need-change-management
  - interdisciplinary-legal-issues-are-the-norm
  - integration-matters-more-than-model-choice
  - building-permits
  - medical-documentation
  - digital-eye-clinic
  - autonomous-systems
  - inspection-robots
  - smart-parking
created: 2026-06-25
updated: 2026-06-25
---

# Implementation anti-patterns

> **For:** anyone scoping an AI pilot who wants to know what went wrong, or nearly went wrong, across the Sandbox portfolio — so the same mistakes can be designed out before they bite.

This page inverts the positive lessons. Each of the Phase II cross-cutting principles ([[phase-2-cross-cutting-principles]]) names a thing to do; read the wrong way round, each names a thing that goes wrong when teams skip it. The corpus does not publish a single "top mistakes" list — the booklet states its findings as principles, not failures. What follows is the wiki's synthesis: the six recurring failure modes the pilots warn against, each tied to the principle it inverts and the project(s) where it actually showed up (no single report states this; across the ten Phase II pilots these are the patterns the evidence supports).

A note on how to read the ranking. The anti-patterns are ordered by how widely the evidence shows them, strongest first — but frequency is not importance (P12). A mistake that appears in one pilot can be the costliest one: clarifying regulation too late blocked an entire deployment in a single project, which matters more than a pattern seen in five pilots that only slowed timelines. Where an anti-pattern's significance outruns its frequency, the entry says so.

---

## 1. Treating the model as the main challenge

*The inverse of: AI is rarely the primary challenge ([[ai-is-rarely-the-primary-challenge]]).*

The most widely-evidenced mistake. Teams arrive focused on which model to use and underestimate infrastructure, data access, integration and organisational adoption — which is where the pilots actually got hard. The booklet states the finding directly: the deployed AI technologies were in many cases already available and mature, and *"The more significant challenges lie in infrastructure, data access, integration, governance, and adoption in day-to-day operations."* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md).

Evidence across the portfolio: in [[smart-parking]] the camera-based vehicle detection was mature computer vision, while the binding work was clarifying camera siting with public and private property owners, named explicitly as a critical project factor [(Smart Parking report, p. 17)](../sources/p1-smart-parking.md). In [[building-permits]] the language model could read plans and check completeness, but the booklet's own conclusion is that value materialises only with embedding into existing digitisation initiatives such as eBaugesucheZH — *"Isolated isolated [sic] solutions increase interface costs, media discontinuity and susceptibility to errors"* [(Building Permits report, p. 23)](../sources/p2-building-permits.md). In [[digital-eye-clinic]] no commercial provider could meet the hospital's integration requirements — custom model integration, the required imaging modalities, on-prem-or-Azure deployment — so the team had to build its own platform, an infrastructure decision, not a modelling one [(Digital Eye Clinic report, p. 18)](../sources/p2-digital-eye-clinic.md). This is the corpus's single most repeated structural lesson, which is why scaling failure is itself a named principle: it usually fails at integration, not at model performance ([[integration-matters-more-than-model-choice]]).

## 2. Clarifying legal and regulatory questions too late

*The inverse of: integrate regulation early ([[integrate-regulation-early]]).*

Lower frequency, higher stakes — this is the anti-pattern where one occurrence outweighs many. The booklet's framing is that late regulatory clarification bakes flawed assumptions into the business model: *"if regulatory requirements are addressed too late, flawed assumptions may arise in the business model. Early clarification is essential to avoid pursuing an incorrect development path."* [(Build & Share (Phase II overview report), p. 18)](../sources/00-overview-phase2-build-and-share.md).

The canonical case is [[autonomous-systems]]: the business model assumed retrofitting existing agricultural vehicles, but the Phase I legal guide is explicit: *"The product safety regulations also apply to modified products, re-cycled or used products. Accordingly, any certification will need to be reassessed."* — a full recertification the retrofit model had not priced in [(Autonomous Systems report, p. 9)](../sources/p1-autonomous-systems.md). [[inspection-robots]] is the counter-example that proves the rule: it engaged the EU AI Act and Machinery Regulation interplay from the outset and piloted ISO/IEC 42001 in parallel rather than bolting compliance on at the end [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md). A related cause is treating regulation as one instrument when it is several: AI applications usually touch multiple areas of law at once, so a compliance check scoped to data protection alone misses the medical-device or machinery layer where the binding constraint often lives ([[interdisciplinary-legal-issues-are-the-norm]]) [(Build & Share (Phase II overview report), p. 18)](../sources/00-overview-phase2-build-and-share.md).

> [!gap] What the Sandbox could and could not do about this
> The Sandbox clarified regulatory implications; it did not approve, certify, or exempt anything. Every project ran within existing law — *"The sandbox operates deliberately within existing legal frameworks and does not allow for the suspension of regulatory requirements."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). So "clarify early" is the only mitigation available; there is no late-stage waiver to fall back on.

## 3. Starting without a bounded use case and measurable success criteria

*The inverse of: AI value must be clearly articulated ([[value-must-be-clearly-articulated]]).*

Starting from "apply AI here" rather than a specific decision the AI improves, with no metric to judge success against. The booklet's principle is that value must be linked to concrete decisions and operational benefit, not assumed from technical feasibility: *"AI should be deployed where it creates tangible value, not merely because it is technologically feasible."* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md).

The pilots that avoided this drew tight scope lines. [[building-permits]] states the boundary in its own overview — *"The aim is not to fully automate decisions, but to provide support throughout the entire process."* [(Building Permits report, p. 7)](../sources/p2-building-permits.md) — and made the value concrete and measurable: catching formal deficiencies before formal proceedings [(Building Permits report, p. 8)](../sources/p2-building-permits.md), with a quality bar posed as a number the team had to hit (is 95% or 99% correct pre-checks the threshold for practical use) [(Building Permits report, p. 22)](../sources/p2-building-permits.md). The same project's quality work shows the measurement discipline the booklet recommends as a principle: reliable results need structured tests, clear metrics and repeated evaluation, with thousands of test runs and LLM-as-a-judge in the building-permit project [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md). Where a use case is bounded and the benefit is stated against the status quo, the success criteria write themselves; where it is "do AI", there is nothing to test against.

## 4. Underestimating the need for domain experts and operational partners

*The inverse of: the domain-expertise/technology interface is critical ([[domain-expertise-tech-interface-is-critical]]), with strong stakeholder engagement.*

Two adjacent failures sit here: missing the person who translates between the field and the technology, and missing the committed partner who provides the real-world environment. The booklet on the first: the greatest value emerges where domain knowledge and technical expertise are closely integrated: *"Without this translation layer, AI systems remain either technically sound but operationally irrelevant or vice versa."* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md).

[[building-permits]] paired technical implementers with cantonal building-directorate specialists and academic advisers, named in the report's acknowledgements [(Building Permits report, p. 4)](../sources/p2-building-permits.md), and its categorisation of permit use cases was itself the domain layer the technology hung off [(Building Permits report, p. 7)](../sources/p2-building-permits.md). [[digital-eye-clinic]] required clinicians and AI engineers on the evaluation framework together; the booklet names experienced ophthalmologists as the experts whose judgement the outputs needed, because the vendor cannot finally assess its own outputs [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md). The operational-partner half shows up where it was missing: [[medical-documentation]] could not test because no public hospital could supply the data environment, and [[inspection-robots]] pivoted to pure analysis: *"As no suitable test partner for operational deployment could be identified, the focus was placed on in-depth regulatory analysis."* [(Build & Share (Phase II overview report), p. 14)](../sources/00-overview-phase2-build-and-share.md). A pilot's coordination load is real, too: [[smart-parking]] required managing several suppliers across power, camera installation, the vision model and communications, which the report flags as decisive for delivery [(Smart Parking report, p. 17)](../sources/p1-smart-parking.md).

> [!sandbox-operations] Read the "missing partner" evidence with care across the two audiences.
> For a team deploying AI, the lesson is direct: secure your domain experts and your operational partner before you start. But several of the partner-side obstacles above were cleared, or hit, by the *Sandbox programme* in its operator role — finding test partners, brokering hospital data agreements, coordinating suppliers. That partner-management experience is `sandbox-operations` knowledge ([[partner-roles-around-a-pilot]]); a deploying organisation should not read "two pilots lost their partner" as a deployment statistic, but as evidence that partner availability is a precondition worth securing first.

## 5. Assuming data is available, clean or legally usable

*The inverse of: data access is the most powerful lever ([[data-access-is-the-most-powerful-lever]]).*

Closely related to anti-pattern 1, but specific enough to separate: teams assume the data exists, is clean, and may lawfully be used — and the assumption fails on legality more often than on quality. The clearest case is [[medical-documentation]], where the project became regulatory analysis rather than a tested system: *"Due to the stringent data protection requirements governing data processing, operational deployment with patient data in a public hospital was not feasible."* [(Build & Share (Phase II overview report), p. 10)](../sources/00-overview-phase2-build-and-share.md). The data was available and clean; it was not legally usable in that setting, and that alone stopped the deployment.

The legal-usability trap recurs in [[digital-eye-clinic]], where using cloud services with patient data triggered a further review, all images and data were kept on-prem for the MVP, and a future cloud move would have made encryption, anonymisation and contractual data-processing agreements mandatory, with the US Cloud Act to consider [(Digital Eye Clinic report, p. 25)](../sources/p2-digital-eye-clinic.md). [[building-permits]] shows the cleanliness-and-completeness side: the achievable degree of automation depends on complete and legally binding data, and not all municipal inventories are consolidated in the ÖREB cadastre, with discrepancies between the cadastre and binding municipal zoning rules surfacing in practice [(Building Permits report, p. 22)](../sources/p2-building-permits.md). The positive counterweight in the corpus is [[infrastructure-maintenance]], where IBM Research published a structured, annotated inspection dataset on Hugging Face — proof that when access is solved deliberately, the data becomes reusable infrastructure rather than a per-project blocker [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md).

## 6. Neglecting change management, user acceptance and workflow fit

*The inverse of: new ways of working need active change management ([[new-ways-of-working-need-change-management]]).*

The least loudly stated, but a real failure mode: building a technically sound system that staff do not trust or that does not fit how work is actually done. The booklet's principle is that AI reshapes existing processes and roles, and *"Acceptance is fostered through transparent communication, training, and the involvement of employees"* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md).

[[building-permits]] makes the acceptance mechanism concrete: generative AI does not deliver deterministic results, so *"administrative use requires configurations that are as controlled and reproducible as possible, otherwise trust in the AI systems will be lost"* [(Building Permits report, p. 22)](../sources/p2-building-permits.md). [[medical-documentation]]'s best-practice list treats this as a design requirement rather than a rollout afterthought: even for administrative tools, medical professionals must be able to review, correct and release content at any time, and human-in-the-loop models have to account for human factors like over-trust and skill loss — and crucially, *"Transparency alone does not mean traceability"* — the warning that an oversight box can be ticked without any real control existing [(Medical Documentation report, p. 35)](../sources/p2-medical-documentation.md). The workflow-fit half is the same point seen from the process side: a tool that does not embed in existing systems and routines increases friction and erodes adoption, which is why [[building-permits]] insists isolated standalone solutions hurt scaling, operation and acceptance [(Building Permits report, p. 23)](../sources/p2-building-permits.md).

---

## How the six relate

The anti-patterns are not independent. The widely-evidenced ones (1, 4, 5) cluster around the same root: AI is the easy part, and the surrounding system — infrastructure, partners, data, workflow — is where pilots actually stall. The high-stakes one (2) is different in kind: it does not slow a pilot, it can invalidate the premise of a whole product before it ships. And the quietest one (6) is the one most easily mistaken for "done" when it is not, because a system can pass every technical test and still fail in the hands of the people meant to use it.

> [!tension] Frequency and importance pull in different directions here.
> Read by how often it appears, anti-pattern 1 (treating the model as the main challenge) dominates the corpus. Read by what it costs when it happens, anti-pattern 2 (late regulatory clarification) is the most dangerous — it surfaced flawed assumptions already baked into a business model. A reader optimising for "what trips up the most pilots" and a reader optimising for "what could kill my project outright" should weight this list differently.

## What this is, and what it is not

> [!update-needed] Reflects Phase II practice (2024–2026)
> These anti-patterns are drawn from the Phase I and II pilots (2022–2026). The technologies are getting cheaper and more capable and the regulatory picture (EU AI Act implementation, the Swiss AI Convention transposition) is still moving. Some of these mistakes may ease as tooling matures — model-agnostic architecture lowers the cost of getting model choice wrong, for instance — while others (data legality, change management) are structural and unlikely to disappear. Read this as state-of-practice for the corpus's period, not a fixed taxonomy.

> [!gap] This is corpus synthesis, not a published "mistakes" list
> No single Sandbox report enumerates implementation mistakes; the booklet publishes positive principles, and the case for each anti-pattern is built by inverting a principle and locating the pilots where it bit. The strongest claims here are the ones anchored to a direct booklet statement (the six §04 principles, [(00-overview-phase2-build-and-share pp. 17–19)](../sources/00-overview-phase2-build-and-share.md)) plus a project showing the failure; the ranking by frequency is the wiki's interpretation across pilots, not a finding the corpus states.

> [!gap] Citation-verification status
> All verbatim quotes are taken from the official English editions and were located and verified directly against the English PDFs in the build: overview pp. 5, 10, 14, 17–19, 22; [[building-permits]] pp. 4, 7, 8, 22, 23; [[digital-eye-clinic]] pp. 18, 25; [[autonomous-systems]] p. 9; [[smart-parking]] p. 17; [[medical-documentation]] p. 35. The overview's no-exemptions statement is anchored to p. 22 of the English edition (the German edition carries it as a footnote on its p. 9). The interdisciplinary-team anchor was corrected from p. 8 (which does not state team composition) to the report's acknowledgements on p. 4. No digest-derived anchors remain on this page.

## See also

- [[phase-2-cross-cutting-principles]] — the positive principles this page inverts.
- [[ai-is-rarely-the-primary-challenge]] · [[data-access-is-the-most-powerful-lever]] — the two principles behind anti-patterns 1 and 5.
- [[integrate-regulation-early]] · [[interdisciplinary-legal-issues-are-the-norm]] — the legal-timing and legal-breadth principles behind anti-pattern 2.
- [[integration-matters-more-than-model-choice]] — why scaling fails at integration, the structural core of anti-pattern 1.
- [[scoping-is-ai-the-right-approach]] — the scoping guide that operationalises avoiding these mistakes before a pilot starts.

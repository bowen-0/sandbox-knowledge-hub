---
title: Maturity vs. caution — where AI is ready today, and where to hold back
type: synthesis
insight_domain: ai-deployment
priority: high
question: "Looking across all projects, where does AI appear mature enough for adoption today, and where should we remain cautious?"
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp, policymakers, compliance-officers]
connects:
  - 00-overview-phase2-build-and-share
  - phase-2-cross-cutting-principles
  - when-rule-based-beats-generative
  - human-oversight-in-ai-deployment
  - building-permits
  - digital-eye-clinic
  - medical-documentation
  - bridge-monitoring
  - inspection-robots
  - smart-parking
  - ai-is-rarely-the-primary-challenge
  - integration-matters-more-than-model-choice
  - rule-based-beats-generative-for-defined-logic
  - probabilistic-ai-vs-administrative-reproducibility
created: 2026-06-25
updated: 2026-06-25
---

# Maturity vs. caution — where AI is ready today, and where to hold back

> **For:** anyone deciding which AI applications to adopt now and which to defer — an administrator scoping a pilot, a policymaker setting priorities, a compliance officer weighing risk. This page reads the whole Phase II portfolio for the readiness question. The neighbouring page [[when-rule-based-beats-generative]] answers the narrower architecture choice once you've decided to proceed.

The first thing the corpus does to this question is reject its premise. It does not sort applications into "AI is ready" and "AI is not ready". The booklet's opening technology finding is that the model is rarely the part that decides readiness at all: *"in many cases, the deployed AI technologies are already available and mature … The more significant challenges lie in infrastructure, data access, integration, governance, and adoption in day-to-day operations."* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md). So the load-bearing distinction on this page is between **technical maturity** (can the model do the task) and **deployment readiness** (can an organisation run it safely, lawfully, and with oversight that actually bites). Most of the portfolio's interesting variation is on the second axis.

That reframing also fixes how to read the two bands below. They are organised not by sector or technology but by **oversight feasibility** — whether a human can stay meaningfully in the loop at the speed and scale the task runs. Where review remains feasible, the corpus shows AI adopted today; where a system would have to act faster than a human can supervise, or decide matters of rights, safety or health on its own, the corpus counsels caution. [[human-oversight-in-ai-deployment]] works out what "feasible oversight" looked like in practice across the healthcare pilots; this page uses it as the dividing line.

## Ready now — where review stays feasible

Three clusters of application reached real deployment or a working prototype in the portfolio, and they share a structural feature: a bounded workflow with a person positioned to check the output before it counts.

### Administrative augmentation

Summarisation, transcription, translation, information extraction, and drafting support are the corpus's most clearly mature category. The booklet names these as exactly the work generative models are good at — unstructured-information processing — and contrasts it with the decision logic they are *not* good at: *"generative models demonstrate strengths in processing unstructured information, such as summarisation, transcription, information structuring, or preliminary checks"* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md). The evidence that this is deployment-grade and not just demo-grade is the [[machine-translation]] pilot: its commercial-register-extract translation went from a Kanton Schwyz test into production and was rolled out to several further cantons [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md). The maturity is real, but it is conditional — confidential or classified administrative text only goes through a third-party service under strict conditions (internal hosting or a certified, audited solution), which is itself a deployment-readiness gate, not a model question [(Machine Translation report, p. 8)](../sources/p1-machine-translation.md).

These tasks stay in the ready band because the output is reviewable: a person reads the summary, corrects the transcript, signs off the translation. The augmentation is an input to a human, not a substitute for one.

### Expert-support applications, with a human in the loop

The second cluster is sector-specific decision *support*: permit pre-checks, clinical documentation support, inspection support. These are mature enough to adopt today on one condition the corpus is explicit about — that the human review which makes them lawful and safe remains feasible, not merely formal.

[[building-permits]] is the worked case. Its deployed prototype keeps generative AI out of the binding step entirely: rule-based logic determines which procedure applies, and AI is reserved for pre-checking unstructured plan documents against common formal deficiencies, with the competent authority's decision untouched [(Building Permits report, p. 22)](../sources/p2-building-permits.md). The legal anchor is [[fadp-art-21|FADP Art. 21]], the right to human review of an automated decision [(Building Permits report, p. 26)](../sources/p2-building-permits.md). [[digital-eye-clinic]] is the healthcare equivalent that actually reached clinical testing: *"Clinicians will remain the final decision-makers, and the workflow is designed so that the AI assists rather than diagnosing automatically to ensure a human in the loop for patient safety."* [(Digital Eye Clinic report, p. 26)](../sources/p2-digital-eye-clinic.md).

> [!tension] Mature to support, not mature to decide
> The same task can be ready in one framing and cautious in another. AI building-permit pre-checks are deployed and useful; an autonomous AI *grant-or-refuse* of a permit is not, because a probabilistic system fights the administrative-law requirement that the same case get the same outcome. The [[building-permits]] benchmark made the gap quantitative and turned it into a political question rather than an engineering one: *"For example, is 95 percent sufficient, or is 99 percent necessary to avoid unnecessary uncertainty in the process?"* [(Building Permits report, p. 22)](../sources/p2-building-permits.md). See [[probabilistic-ai-vs-administrative-reproducibility]]. Readiness here is a property of the *workflow boundary*, not of the model.

### Computer-vision inspection and monitoring

The third cluster has the most encouraging practical evidence in the portfolio, and it is not a language-model story. Several of the highest-impact pilots are computer-vision or sensor systems: *"many high-impact use cases in the public sector are based on computer vision or sensor data rather than language models"* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md). [[smart-parking]] runs in production in Frauenfeld and was expanded to further cantons [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md); the [[infrastructure-maintenance]] drone-inspection dataset was published on Hugging Face as a public benchmark [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md); [[bridge-monitoring]] captured real train-traffic loads on the Reidholz railway bridge and produced a data-based picture of its structural condition [(Build & Share (Phase II overview report), p. 13)](../sources/00-overview-phase2-build-and-share.md).

The discipline that keeps this in the ready band is stated plainly in the bridge-monitoring report, by Raphael von Thiessen, the sandbox programme manager: *"Data-driven monitoring does not replace existing evidence, but complements it with measurement data from live operations"* [(Bridge Monitoring report, p. 6)](../sources/p2-bridge-monitoring.md). Inspection and monitoring are decision support feeding an engineer or inspector, which is why oversight stays feasible.

## Stay cautious — where oversight stops being feasible

The caution band is the mirror image: applications where a human cannot meaningfully review each output in time, or where the consequence of an error reaches rights, safety, or health directly. The corpus does not present these as immature *technology*. It presents them as not yet ready to *deploy* without safeguards it repeatedly says are unsettled.

- **Fully autonomous decisions affecting rights, safety or health.** This is the line the support cluster above sits just inside of. An autonomous administrative decision collides with [[fadp-art-21|FADP Art. 21]] and the reproducibility requirement [(Building Permits report, p. 22)](../sources/p2-building-permits.md); an autonomous clinical decision collides with the medical-device regime and the rule that a named clinician keeps responsibility. The medical-documentation report's sharpest warning is that an oversight box can be ticked while no real control exists: *"Transparency alone does not mean traceability, i.e. no real opportunity for medical professionals to control or interpret the content of the system’s behaviour."* [(Medical Documentation report, p. 35)](../sources/p2-medical-documentation.md). When oversight cannot be made real, the application belongs in this band regardless of model quality.
- **Safety-critical domains and systems with limited human intervention.** The clearest portfolio signal here is what the [[inspection-robots]] project did *not* do. It was a structured regulatory pre-flight for autonomous inspection robots — high-risk under the [[eu-ai-act|EU AI Act]] in interplay with the EU [[machinery-regulation|Machinery Regulation]] [(Inspection Robots report, p. 22)](../sources/p2-inspection-robots.md) — and it never reached operational testing, partly because no suitable test partner was found [(Build & Share (Phase II overview report), p. 9)](../sources/00-overview-phase2-build-and-share.md). The corpus's posture toward autonomy in a safety-critical setting is to clarify the compliance path first and deploy second.
- **Open-ended generative AI in high-stakes contexts.** Where the output is unbounded and the stakes are high, the corpus consistently steers generative models away from the decision step: generative models *"reach their limits in clearly defined, traceable, and legally relevant decision-making processes. In such cases, rule-based approaches deliver more robust and transparent results."* [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md). [[when-rule-based-beats-generative]] is the full decision guide.

## The thesis: organisational factors decide readiness, not the model

Across the portfolio one pattern carries more weight than any single project's finding. The variable that separated the deployed pilots from the analysis-only ones was almost never model capability.

This is a portfolio-level synthesis, so it is worth stating where it sits in the evidence: the booklet asserts the general principle directly (strongest tier), and the project files corroborate it case by case (repeated across reports). [[medical-documentation]] had a commodity-grade transcription model and still could not deploy — Swiss data-protection requirements blocked operational use of patient data in a public hospital. [[inspection-robots]] had a viable industrial use case and still could not deploy — no test partner. Both nonetheless delivered value through regulatory clarity rather than a running system: *"Nevertheless, both projects delivered substantial value by establishing regulatory clarity, deriving best practices, and enabling the scalability of findings beyond the specific use case."* [(Build & Share (Phase II overview report), p. 9)](../sources/00-overview-phase2-build-and-share.md). The booklet generalises the production-side version of the same point: *"Scaling often fails at integration, not at AI performance"* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md).

So the readiness checklist the corpus implies is organisational, not technical: is the data legally usable, is there a partner and a test environment, does the output integrate into an existing workflow, will the people whose work changes accept it, and is the regulatory position clear enough to act on. The wiki's cross-cutting principles consolidate this as *AI is rarely the primary challenge* ([[ai-is-rarely-the-primary-challenge]]) and *scaling fails on integration* ([[integration-matters-more-than-model-choice]]). Governance, data quality, user acceptance, and regulatory clarity determine readiness more often than the AI technology does.

One implication for prioritisation, which the [[phase-2-cross-cutting-principles|priority entry point]] develops for the "which three initiatives" question: the bands above are not a ranking. Frequency is not importance. Administrative augmentation appears in the most pilots, but a single high-stakes application — diabetic-retinopathy screening reaching real clinical use — can be more significant than a common one. Read the bands as a map of where the safeguards are known, not as a popularity contest.

## What the Sandbox did, and what stays open

The Sandbox clarified regulatory implications; it did not approve, certify, or exempt any system. Every project ran inside existing law, *"without the possibility of regulatory exemptions"* [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md). So "ready now" here means *demonstrated deployable with feasible oversight in a Phase II pilot*, not "cleared for any context". Some readiness questions stay open and depend on the final implementation context of a given system.

> [!update-needed] Reflects Phase II practice (2024–2026)
> These placements describe the state of practice across the 2024–2026 portfolio. Both the technology and the regulation are moving: the EU AI Act's high-risk obligations, the medical-device classification, and the capability frontier itself will shift, and increasingly autonomous (agentic) systems are flagged in the corpus as an area still needing oversight and accountability work. A later project may move an application from the caution band into the ready one, or surface a caution the portfolio has not yet met. Read this as a snapshot, not settled doctrine.

> [!gap] The bands are an evidence-based starting placement, to be vetted with the steering team
> The two-band split above is the corpus's own evidence-based starting placement — derived from which pilots reached deployment with feasible oversight and which were held to analysis. The exact placement of a given application (especially borderline expert-support cases) is a judgement call that should be validated live with the Sandbox steering team against their operating experience, not treated as fixed. Where a reader's own use case sits near a band boundary, the decision belongs with the people who ran the pilots.

> [!gap] Citation-verification status
> The load-bearing thesis anchors are verified directly against the official English editions in `pdfs/en/`: in `00-overview-phase2-build-and-share.pdf` the Technology insights on p. 17 (maturity, rule-based-vs-generative, beyond-LLMs), the Organisation insight on p. 19 (integration), the analysis-only-as-value framing on p. 9, and the no-exemptions statement on p. 5; plus the 95%/99% reproducibility passage on p. 22 of `p2-building-permits.pdf`. The [[inspection-robots]] sentence is split: p2-inspection-robots p. 22 carries only the EU AI Act × Machinery Regulation framing, and the no-test-partner / analysis-only fact is anchored to booklet p. 9. The healthcare-oversight and bridge-monitoring quotes are re-anchored to the English editions, whose pagination differs from the German: [[digital-eye-clinic]] p. 26 (DE p. 27), [[medical-documentation]] p. 35 (DE p. 37), [[bridge-monitoring]] p. 6 (DE p. 7). The booklet p. 13 and machine-translation p. 8 anchors are carried over from already-published pages.

## See also

- [[when-rule-based-beats-generative]] — the architecture choice once you've decided to proceed; the rule-based-vs-generative decision tree.
- [[human-oversight-in-ai-deployment]] — what "feasible oversight" looked like in practice; the band axis of this page.
- [[phase-2-cross-cutting-principles]] — the booklet's 17 general principles, including the maturity and integration findings this page builds on.
- [[building-permits]] · [[digital-eye-clinic]] — the canonical ready-band-with-oversight cases.
- [[probabilistic-ai-vs-administrative-reproducibility]] — why an autonomous administrative decision crosses into the caution band.

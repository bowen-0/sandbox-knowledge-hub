---
title: AI opportunity categories — where the Sandbox saw high potential
type: synthesis
slug: opportunity-categories
insight_domain: ai-deployment
priority: high
question: "If I wanted to launch a few high-potential AI initiatives next year, which areas should I prioritise based on the Sandbox experience?"
audience: [administrative-staff-scoping-a-pilot, policymakers, ai-providers-pre-rfp, innovation-leads]
connects:
  - machine-translation
  - medical-documentation
  - building-permits
  - bridge-monitoring
  - inspection-robots
  - infrastructure-maintenance
  - digital-eye-clinic
  - ai-is-rarely-the-primary-challenge
  - rule-based-beats-generative-for-defined-logic
  - human-oversight-in-ai-deployment
  - scoping-is-ai-the-right-approach
  - 00-overview-phase2-build-and-share
created: 2026-06-25
updated: 2026-06-25
---

# AI opportunity categories — where the Sandbox saw high potential

> **For:** anyone choosing which AI initiatives to start with — an administrator planning next year's pilots, a policymaker setting portfolio priorities, a provider deciding where the demand is. The question is "where should I begin?", answered from where the Sandbox's pilots actually delivered.

Where to begin depends on your organisation's context and strategic objectives; no report ranks initiatives for an arbitrary organisation. But across the Phase II portfolio, the pilots that combined relatively mature technology with manageable implementation risk clustered into three recognisable categories. This page names those categories, maps each to the pilots that evidence it, and explains what made those pilots suited — because the suitability factors transfer even when the specific use case does not.

The grouping is the wiki's cross-portfolio synthesis, not a list the booklet prints. No single report states "here are the three high-potential categories." The booklet does, however, supply the raw material: its [[00-overview-phase2-build-and-share|Phase II overview]] organises the 24 submissions into seven sectors [(00-overview-phase2-build-and-share p. 6)](../sources/00-overview-phase2-build-and-share.md), and its §04 insights name *why* certain use cases were tractable. The three categories below cut across those sectors by the *kind of work the AI does*, which is the cut that matters when you are deciding where to start.

One framing governs all three: the corpus consistently positions AI as augmenting human expertise, not replacing it. *AI is rarely the primary challenge* ([[ai-is-rarely-the-primary-challenge]]) — the technology was usually available and capable; the binding constraints were infrastructure, data access, integration, governance, and day-to-day adoption. So a category is "high-potential" not because the model is impressive but because a clear use case, accessible data, and an existing review process were already in place around it.

---

## Category 1 — Knowledge and administrative support

Summarisation, information extraction, knowledge retrieval, drafting support, and completeness checks: AI that handles unstructured text and documents so a person spends less time on repetitive preparation. This is the category with the most mature underlying technology in the corpus, and the lowest stakes per individual output, because a human reviews, edits, and releases the result.

The clearest evidence is [[machine-translation]], a Phase I pilot that reached production. After a successful test with the Handelsregister of Kanton Schwyz, the machine-translation solution for commercial-register extracts was rolled out to several further cantons [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md) — one of the corpus's two roll-out successes. What made it suited: a bounded, repetitive document task; a clear confidentiality envelope (the report sets strict conditions for documents classified «vertraulich» or «geheim» [(p1-machine-translation p. 8)](../sources/p1-machine-translation.md)); and an existing human workflow the translation slots into rather than displaces.

The [[medical-documentation]] pilot sits here on its drafting and structuring side — AI-supported transcription, structuring, and improvement of clinical documentation [(p2-medical-documentation p. 2)](../sources/p2-medical-documentation.md). It is the strong cautionary case in this category as much as a supporting one: data-protection requirements blocked operational testing entirely, so the pilot delivered regulatory analysis rather than a deployed tool, and the corpus is emphatic that the responsible professional must at all times be able to review, correct, and release the content (see [[human-oversight-in-ai-deployment]]). The drafting *task* is mature; the *deployment* is gated by data access and oversight, not by model capability.

The [[building-permits]] prototype contributes the document pre-check pattern. Its report opens by distinguishing categories of use case along the permit process, the first being information and orientation — semantic search and chatbots that answer recurring questions from checked legal sources, so applicants get early guidance and municipalities field fewer avoidable queries [(p2-building-permits p. 7)](../sources/p2-building-permits.md). Generative AI's strength, the booklet states, is exactly this kind of unstructured-information work: *«Generative Modelle entfalten ihre Stärken insbesondere bei der Verarbeitung unstrukturierter Informationen – etwa bei Zusammenfassungen, Transkription, Informationsaufbereitung oder Vorprüfungen»* — generative models show their strengths above all in processing unstructured information, such as summaries, transcription, information preparation, or pre-checks [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md).

---

## Category 2 — AI-assisted inspection and monitoring

Infrastructure inspection, image- and sensor-assisted quality control, and anomaly detection: AI applied to perception rather than language. The booklet is explicit that this is a distinct and high-impact strand — *«KI ist mehr als LLMs: Viele wirkungsvolle Anwendungsfälle im öffentlichen Sektor basieren auf Computer Vision oder Sensordaten – nicht auf Sprachmodellen»* — AI is more than LLMs; many effective public-sector use cases are based on computer vision or sensor data, not language models [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md). The principle is *AI extends beyond large language models* ([[ai-is-rarely-the-primary-challenge]] names the same point about maturity); the technology here is mature, and the outputs feed a human expert's judgement rather than acting on their own.

[[bridge-monitoring]] is the in-practice case. Sensors on the Reidholz railway bridge captured real loads from train traffic, and AI-supported methods handled pattern recognition, identified anomalies, and fitted engineering models to the actual data [(p2-bridge-monitoring p. 7)](../sources/p2-bridge-monitoring.md). Crucially the report draws the augment-not-replace line itself, in von Thiessen's words: *«Datenbasiertes Monitoring ersetzt bestehende Nachweise nicht, sondern ergänzt sie mit Messdaten aus dem Betrieb.»* — data-based monitoring does not replace existing structural verification, it complements it with measurement data from operations [(p2-bridge-monitoring p. 7)](../sources/p2-bridge-monitoring.md). What made it suited: a real test environment (the SOB rail bridge), a concrete decision it feeds (maintain, reinforce, or replace), and structural engineers who stay in charge of the verdict.

[[inspection-robots]] sits in this category on its application side — autonomous inspection systems that capture large volumes of data around the clock and analyse it with AI in critical-infrastructure settings like energy and power supply [(p2-inspection-robots p. 2)](../sources/p2-inspection-robots.md). It is also the category's clearest caution: precisely because the system operates autonomously and in safety-relevant contexts, it raised the most demanding regulatory questions in the portfolio (the [[eu-ai-act|EU AI Act]] and EU Machinery Regulation), and could not find an operational test partner, so it remained an analysis-only pilot. The perception task is mature; full autonomy in a safety-critical setting is where the risk concentrates.

[[infrastructure-maintenance]] (Phase I) is the lineage case: drone inspection of infrastructure with computer vision, whose annotated dataset IBM Research published as a public benchmark [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). The imaging side of [[digital-eye-clinic]] belongs here too — AI reading retinal images to flag diabetic retinopathy — though its decision-influencing role pulls it into Category 3 as well. The pattern across all of these: the data already exists or can be captured, the perceptual task is well-bounded, and a qualified human interprets the flag.

---

## Category 3 — Sector-specific decision support

Permit pre-assessment, clinical documentation support, and prioritisation tools: AI that helps a domain expert reach a regulated or consequential decision faster and more consistently, without making the decision. This category overlaps the first two by design — it is the same drafting and perception technology, applied where the output feeds a legally or clinically significant judgement, which raises both the value and the oversight requirement.

[[building-permits]] is the reference case. Its prototype performs a pre-check (*Vorprüfung*) of submissions in the notification procedure [(p2-building-permits p. 18)](../sources/p2-building-permits.md), with procedure determination handled by rule-based logic and generative AI reserved for the unstructured document checks [(p2-building-permits p. 20)](../sources/p2-building-permits.md). The corpus is explicit that this is support, not autonomous decision-making: the report finds a duty of human review derived from federal and constitutional law (FADP Art. 21, the right to be heard) the moment an AI system operates in the permit process [(p2-building-permits p. 26)](../sources/p2-building-permits.md). What made it suited is also where its leverage sits — improving submissions before they enter formal proceedings. In von Thiessen's framing: *«Der grösste Hebel von KI liegt aktuell in besseren und vollständigeren Baugesuchen vor der Einreichung.»* — the greatest leverage of AI currently lies in better and more complete building applications before submission [(p2-building-permits p. 7)](../sources/p2-building-permits.md).

The healthcare pilots are the second strand. [[digital-eye-clinic]] reached real-world clinical testing and produced a practice-tested evaluation framework for diagnostic AI, transferable beyond ophthalmology [(00-overview-phase2-build-and-share p. 11)](../sources/00-overview-phase2-build-and-share.md), with the workflow deliberately built so the AI supports rather than diagnoses and the physician keeps the final decision [(p2-digital-eye-clinic p. 27)](../sources/p2-digital-eye-clinic.md). [[medical-documentation]]'s decision-adjacent uses (structuring a report, drafting a differential) sit here whenever the output influences a treatment decision and so acquires a medical purpose. Both show the category's defining condition: the value is real *because* the decision matters, which is exactly why human oversight has to be real and not merely formal ([[human-oversight-in-ai-deployment]]).

> [!tension] Decision support shares technology with the safe categories but not their risk profile.
> The drafting in Category 1 and the perception in Category 2 become decision support the moment their output shapes a regulated or clinical decision. That shift does not require a more advanced model — it raises the oversight, traceability, and legal requirements sharply. [[building-permits]] keeps procedure determination *rule-based* precisely so the legally relevant logic is reproducible ([[rule-based-beats-generative-for-defined-logic]]), and reserves generative AI for the lower-stakes document checks. Read decision support as the most valuable and the most demanding of the three, not as a free extension of the other two.

---

## What makes a category high-potential

Three conditions recur across the suited pilots, and they transfer better than any specific use case:

- **A clear, bounded use case.** [[building-permits]] chose the notification procedure (*Meldeverfahren*) for solar panels, heat pumps, and charging stations because its complexity is bounded; [[machine-translation]] targeted one repetitive document type. Open-ended ambitions did not reach deployment.
- **Available, usable data.** *Data access is the most powerful lever* in the corpus. Where data was accessible — Stadt Kloten's real applications for building permits, sensor readings on the Reidholz bridge — pilots progressed; where it was blocked, as with patient data in [[medical-documentation]], even a sound use case stalled into analysis-only.
- **An existing review process.** Each suited pilot fed an established human checkpoint: a translator's release, an engineer's structural verdict, a clinician's diagnosis, a competent authority's permit decision. The AI accelerated work *inside* an oversight loop that already existed, which is what kept the implementation risk manageable.

These conditions are why the categories combine relatively mature technology with manageable risk. The maturity is real but secondary; the surrounding conditions are what made the pilots tractable.

> [!gap] Frequency is not importance — and absence is not low potential.
> The categories above describe where the Sandbox's *executed* pilots clustered, not a complete map of where AI has potential. The portfolio's seven sectors leave whole areas untouched (financial services, justice, social services, security), so "no pilot here" means "no Sandbox evidence," not "low potential." And a single significant pilot can outweigh a frequent pattern: the lone [[inspection-robots]] case carries more weight for autonomous-systems regulation than its single appearance suggests. Weight the categories by fit to your context, not by how many pilots populate each.

---

## How to act on this

The corpus's own advice for moving from category to initiative is consistent: start with bounded pilots and scale on evidence, and do not begin with fully autonomous, high-risk applications.

Begin where a category's three conditions already hold for you — a bounded task, data you can actually use, and a review process the AI can sit inside. Treat the first deployment as a pilot with measurable success criteria, and let evidence, not ambition, decide whether it scales. The corpus treats analysis-only outcomes as legitimate value, not failure ([[scoping-is-ai-the-right-approach]]): clarifying the regulatory and feasibility picture is real progress even without a live system.

The explicit caution runs the other way. The applications the Sandbox found *least* ready to start with are the inverse of the suited ones: fully autonomous decisions affecting rights, safety, or health; safety-critical systems running with limited human intervention; open-ended generative AI in high-stakes contexts. [[inspection-robots]] is the worked example of why — the autonomy and the safety-critical setting, not the perception model, are what made it hard. Augment first, automate later, and only on evidence.

> [!update-needed] Reflects Phase II practice (2024–2026)
> These categories describe where the Sandbox's Phase II pilots delivered, with the technology and regulation of that window. What counts as "mature" and "manageable risk" will shift as models, the EU AI Act's high-risk obligations, and the medical-device regime evolve, and later pilots may add or reshape categories. Read this as state-of-practice for choosing where to start, not a fixed taxonomy.

> [!gap] Citation-verification status
> The load-bearing German citations here were located and verified directly against the German PDFs in the build: the §04 Technology principles ([[00-overview-phase2-build-and-share]] p. 17), the sector figure (p. 6), the two outcome classes (p. 9), the eye-clinic summary (p. 11); [[building-permits]] p. 7 (category structure + von Thiessen's pre-submission quote), p. 18 (pre-check framing), p. 20 (rule-based procedure determination vs. generative document checks), p. 26 (FADP Art. 21 human-review duty); [[bridge-monitoring]] p. 7 (anomaly detection + the complements-not-replaces quote); [[inspection-robots]] p. 2 (autonomous data capture and analysis); [[machine-translation]] p. 8 (confidentiality conditions). The [[infrastructure-maintenance]] anchor is carried from its already-published page (now DE-anchored); the [[digital-eye-clinic]] p. 27 oversight anchor is verified here and in [[human-oversight-in-ai-deployment]].

## See also

- [[scoping-is-ai-the-right-approach]] — once you have a candidate, the prior question: is AI even the right tool, and what is the binding constraint?
- [[phase-2-cross-cutting-principles]] — the booklet's 17 general lessons that sit behind these categories.
- [[maturity-vs-caution]] — the companion view: where the same evidence says adopt now versus stay cautious.
- [[human-oversight-in-ai-deployment]] — the oversight pattern that makes Category 3 (and the decision-adjacent edges of 1 and 2) safe to deploy.
- [[rule-based-beats-generative-for-defined-logic]] — why decision support keeps the legally relevant logic rule-based.

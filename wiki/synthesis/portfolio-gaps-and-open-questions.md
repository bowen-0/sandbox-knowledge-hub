---
title: Portfolio gaps and open questions — what the Sandbox has not (yet) resolved
type: synthesis
slug: portfolio-gaps-and-open-questions
insight_domain: ai-deployment
question: "Where is there still need for further clarification across the project portfolio?"
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp, policymakers]
connects:
  - 00-overview-phase2-build-and-share
  - medical-documentation
  - digital-eye-clinic
  - inspection-robots
  - building-permits
  - bridge-monitoring
  - integration-matters-more-than-model-choice
  - new-ways-of-working-need-change-management
  - open-source-as-procurement-alternative
  - phase-2-cross-cutting-principles
created: 2026-06-25
updated: 2026-06-25
---

# Portfolio gaps and open questions — what the Sandbox has not (yet) resolved

> **For:** anyone using this corpus to scope a pilot who needs to know where the evidence runs out — which questions the Sandbox answered, which it touched but did not work through, and which it has not reached at all.

The Sandbox addressed a wide span of practical questions. Across two phases it produced worked answers on data access, regulatory classification, human oversight, the integration gap between pilot and production, and the rule-based-versus-generative choice — the [[phase-2-cross-cutting-principles|cross-cutting principles]] consolidate these. This page is the complement: an honest map of where the *evidence base itself* is thin or silent. It is gap-mapping, not criticism. The Sandbox's own Phase II report names many of these as limitations and as the agenda for what comes next [(00-overview-phase2-build-and-share p. 22)](../sources/00-overview-phase2-build-and-share.md).

Two distinctions govern how to read what follows. First, a gap can be a *topic the portfolio touched but did not work through*, or a *sector the portfolio never entered* — the two need separating because they fail in different ways. Second, the Sandbox itself flags a structural reason most of these gaps exist: it works bottom-up on a handful of clearly-bounded use cases, which yields practice-near findings but *«bleibt jedoch auf einzelne Use Cases begrenzt»* — stays bounded to individual use cases [(00-overview-phase2-build-and-share p. 22)](../sources/00-overview-phase2-build-and-share.md). A topic only surfaces if a selected pilot happened to raise it.

## Topic gaps — partially explored or absent

### Long-term operation and lifecycle management

The corpus is strong on getting a system *to* deployment and weak on running it *after*. Every executed pilot was a test, not a sustained operation: [[digital-eye-clinic]], [[building-permits]] and [[bridge-monitoring]] reached real-world testing, but none was operated, monitored, updated and maintained over a service life within the Sandbox window. The pilot-to-production gap is named as an integration problem (*integration matters more than model choice*, [[integration-matters-more-than-model-choice]]) [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md), but what happens *past* go-live is barely surfaced.

The closest the evidence comes is regulatory rather than operational. The [[medical-documentation]] report, analysing continuously-learning systems, recognises the need for ongoing post-deployment monitoring: *«Kontinuierlich lernende KI-Systeme erfordern deshalb eine besonders sorgfältige Überwachung und klare Verantwortlichkeiten im laufenden Betrieb.»* — continuously-learning AI systems therefore require especially careful monitoring and clear responsibilities in ongoing operation [(p2-medical-documentation p. 14)](../sources/p2-medical-documentation.md). That is a recognised obligation, not a documented practice; the [[eu-ai-act|EU AI Act]]'s predetermined-change-control expectation sits in the same place. How an administration actually monitors drift, schedules retraining, versions a model, or retires one is not worked out by any pilot.

> [!gap] Lifecycle is named as a requirement, not demonstrated
> No pilot in the corpus documents the post-deployment phase — monitoring, model updating, maintenance, drift detection, decommissioning. The medical-documentation analysis flags the *need* for it; observed operational practice is absent. A reader planning for total cost of ownership or a maintenance regime will not find a worked example here.

### Organisational implications of adoption

The portfolio repeatedly states that AI changes roles and that this needs active management — *new ways of working need change management* ([[new-ways-of-working-need-change-management]]), evidenced by the drone-inspection example where automation supplemented manual runway checks [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md). But the statement is a one-line organisational principle, not a study. How professional roles actually shift, which new capabilities a unit must build, how responsibilities are reassigned, what training or staffing the change demands — none of this is examined in depth. The Phase II report is explicit that broad rollout, with all its organisational weight, is left to the institutions themselves: *«Ämter, Städte, Bundesstellen, Bildungsinstitutionen und Infrastrukturbetreiber müssen KI-Systeme eigenständig einführen, betreiben und in ihre Prozesse integrieren.»* — offices, cities, federal bodies, educational institutions and infrastructure operators must introduce, operate and integrate AI systems into their processes on their own [(00-overview-phase2-build-and-share p. 22)](../sources/00-overview-phase2-build-and-share.md). The Sandbox shows what works; the organisational change of living with it sits outside its evidence.

### Cross-organisational data sharing and governance

The corpus treats data access richly *within* a single pilot's boundary — whose data, on what legal basis, with what minimisation. What it does not treat is governance *across* organisations: shared datasets, joint custodianship, inter-agency data exchange, federated arrangements. The adjacent points are about open *publication*, not multi-party governance: the booklet's data-access lever observes that even seemingly trivial datasets gain value once made accessible so a broad set of providers can train and compare against them [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md), and selected prototypes and platforms ([[building-permits]], [[digital-eye-clinic]]) were released for third-party further development [(00-overview-phase2-build-and-share p. 21)](../sources/00-overview-phase2-build-and-share.md). Both are one-way openings, not the harder cross-organisational data-sharing *agreements* — custodianship, liability, federated governance — which remain unexplored.

### Measuring real-world impact beyond technical performance

Where pilots measured, they measured technical quality — accuracy, the thousands of test runs and [[building-permits|LLM-as-a-judge evaluation]] in building permits, expert ophthalmologist validation in the eye clinic [(00-overview-phase2-build-and-share p. 19)](../sources/00-overview-phase2-build-and-share.md). Downstream real-world impact is largely unmeasured: realised efficiency or quality gains in service, effects on staff workload, user satisfaction over time, unintended consequences. Because the executed pilots stopped at testing rather than sustained operation, the data needed to measure operational impact was never generated.

### Procurement, vendor selection, and avoiding provider dependency

This is the gap most clearly *touched by one pilot and no further*. [[digital-eye-clinic]] is the corpus's only worked build-versus-buy analysis: the team scored five commercial diagnostic vendors against technological, regulatory and economic criteria — including contract models, per-scan cost, and the ability to integrate the hospital's own model — and concluded that no off-the-shelf product met the requirements: *«Letztlich erfüllte keiner der Anbieter von Standardprodukten sämtliche Anforderungen der Klinik an das MVP, was schlussendlich der Grund für ihren Ausschluss war.»* — ultimately no standard-product vendor met all of the clinic's MVP requirements, which was the reason for their exclusion [(p2-digital-eye-clinic p. 18)](../sources/p2-digital-eye-clinic.md). The team therefore built in-house *(open-source as a procurement alternative*, [[open-source-as-procurement-alternative]]) [(p2-digital-eye-clinic p. 19)](../sources/p2-digital-eye-clinic.md).

That is a single procurement decision in one clinical context, not a transferable procurement method. Vendor lock-in, exit strategies, dependency on external providers as a portfolio-level concern, and a general procurement playbook for public-sector AI are not addressed.

> [!gap] One build-vs-buy case is not a procurement framework
> The eye-clinic vendor evaluation is detailed but local — a hospital choosing for one diagnostic use case. The corpus does not generalise it into procurement guidance, dependency-avoidance strategy, or exit-planning that another organisation could apply directly. Its build-in-house conclusion turned on this clinic's specific requirements (own-model integration, on-premise or Azure deployment, multimodal imaging) and should not be read as a default recommendation to build rather than buy.

### Increasingly autonomous or agentic AI

Phase I centred on computer vision; Phase II deliberately shifted to generative AI, but only after waiting out the first broad chatbot rollout so the work could be reflective — *«Diese Erweiterung erfolgte bewusst zeitversetzt, nach der ersten breiten Markteinführung von Chatbots, und erlaubte eine reflektierte und praxisnahe Anwendung der Technologie.»* [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). The portfolio's only "autonomous" strand is physical-robotic: [[inspection-robots]], analysed for the interaction of the EU AI Act with the [[machinery-regulation|Machinery Regulation]] for market access. Agentic AI in the current sense — systems that plan and act across steps with limited human intervention — is not a subject any pilot examines. The oversight and accountability questions specific to increasingly autonomous software agents are outside the evidence base.

### Resilience, continuity, and digital sovereignty

These appear only as fragments. The frontier-versus-open-source mix is framed partly around data protection, cost and scale, especially in health, with cloud commercial frontier models combined with locally-run open-source ones depending on the requirement [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md), and the eye clinic preferred on-premise deployment over pure cloud for data-governance reasons [(p2-digital-eye-clinic p. 16)](../sources/p2-digital-eye-clinic.md). Those are local design choices, not a treatment of operational resilience, service continuity, or digital sovereignty as deployment concerns. No pilot studies failover, redundancy, what happens when a cloud provider or model vendor becomes unavailable, or sovereignty over the model stack itself.

## Sector gaps — the negative space

The Sandbox classifies submissions into seven sectors: mobility, autonomous systems, public administration, education and work, healthcare, construction, and other [(00-overview-phase2-build-and-share p. 6)](../sources/00-overview-phase2-build-and-share.md). Several high-stakes domains fall outside all seven and are unrepresented in both the executed pilots and the analysis:

- **Financial services** — the one partial case. A *«KI-basierter Finanzassistent»* appeared among the 24 submissions, but classified under "Other", not selected for execution [(00-overview-phase2-build-and-share p. 6)](../sources/00-overview-phase2-build-and-share.md). Finance is then named in the Phase II outlook as a future thematic-call priority: focused calls along prioritised themes *«etwa im Finanzsektor als für den Standort Zürich besonders relevantem Bereich»* — for instance the financial sector, as an area especially relevant to Zurich [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). So finance is recognised and on the roadmap, but the evidence base holds no finance pilot.
- **Security and law enforcement** — absent.
- **Justice and courts** — absent.
- **Social services and welfare** — absent. (A submitted but unexecuted "Chatbot für Umwelt und Soziales" sits in public administration, not a welfare-decision use case.)
- **HR and workforce management** — absent.
- **Defence** — absent.

> [!gap] Absent sectors are evidentiary blanks, not implicit judgements
> The corpus says nothing about AI in finance, policing, courts, welfare, HR, or defence. Their absence reflects which use cases were submitted and selected, not a Sandbox finding that AI is unsuited to them. A reader in one of these sectors should treat the corpus as silent — neither encouraging nor discouraging — and should not transplant a construction or healthcare finding into, say, a rights-affecting justice or welfare decision without fresh analysis.

## Where these gaps sit in the evidence

Most of what this page reports is high-tier evidence about *absence*: the Phase II report directly states its own limitations and the bottom-up bounding [(00-overview-phase2-build-and-share p. 22)](../sources/00-overview-phase2-build-and-share.md), and the sector taxonomy makes the negative space verifiable rather than inferred [(00-overview-phase2-build-and-share p. 6)](../sources/00-overview-phase2-build-and-share.md). The "partially touched" claims rest on single anchors — lifecycle on the medical-documentation monitoring sentence, procurement on the eye-clinic build-vs-buy — and are flagged as such above.

Frequency and importance pull apart here. Lifecycle and organisational change recur as one-line principles across the booklet's §04, yet remain shallow; the procurement gap is anchored in a single pilot, yet is one of the most consequential for an organisation choosing how to source an AI system. A gap touched once can matter more than one mentioned often.

> [!update-needed] These gaps describe the Phase II evidence base (2024–2026)
> Several are explicitly on the Sandbox's forward agenda — finance-sector thematic calls, agile project intake, structured knowledge dissemination [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). Phase III (2026–2029) and later projects may close some of them. Read this page as the state of the evidence at the close of Phase II, not as a permanent map.

> [!sandbox-operations] For a team running its own sandbox programme
> The gaps above are written for a *deployment* reader — they tell you where this corpus stops, so you don't over-rely on it. For a team operating an innovation-sandbox programme, the same list reads differently: it is a candidate agenda for future calls. The Sandbox itself frames it this way, naming agile intake, finance-sector thematic calls, a tiered Self-Service / Regulatory Desk / full-support funnel, and structured playbooks as Phase III directions [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). A deployment reader should not read "this is a gap" as "the Sandbox recommends you pilot it" — that inference belongs to programme operators, and the programme-design implications live in [[zh-ai-ecosystem-strategy-2026-2029]].

> [!gap] Citation-verification status
> All citations to [[00-overview-phase2-build-and-share]] (pp. 5, 6, 17, 19, 21, 22, 23) were located and verified against the German PDF (`pdfs/de/00-overview-phase2-build-and-share.pdf`); the §04 findings sit one page earlier in the German edition than in the English digest (Technik p. 17, Recht p. 18, Organisation p. 19). The [[digital-eye-clinic]] anchors (pp. 16, 18, 19) and the [[medical-documentation]] continuous-learning anchor (p. 14) were likewise DE-verified directly against their German PDFs. The four German verbatim quotes (overview p. 5, p. 22, p. 23; medical-documentation p. 14) were copied character-for-character from `pdftotext` output, not reconstructed.

## See also

- [[phase-2-cross-cutting-principles]] — the questions the Sandbox *did* answer; this page is its negative image.
- [[integration-matters-more-than-model-choice]] · [[new-ways-of-working-need-change-management]] — the principles the corpus states but does not work through.
- [[digital-eye-clinic]] — the single build-vs-buy / vendor-evaluation case behind the procurement gap.
- [[zh-ai-ecosystem-strategy-2026-2029]] — where the Sandbox's own forward agenda for closing these gaps lives.

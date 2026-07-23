---
title: What the Sandbox taught us about AI regulation
type: synthesis
slug: regulatory-learnings
insight_domain: sandbox-operations
priority: high
question: "What has the Sandbox taught us about future AI regulation?"
audience: [policymakers, sandbox-programme-designers, supervisory-authorities]
connects:
  - 00-overview-phase2-build-and-share
  - continuous-regulatory-learning-beats-rigid-approval
  - integrate-regulation-early
  - interdisciplinary-legal-issues-are-the-norm
  - regulatory-roundtable-is-high-leverage
  - human-oversight-in-ai-deployment
  - when-rule-based-beats-generative
  - data-access-is-the-most-powerful-lever
  - eu-ai-act
  - medical-device-regulation
  - zh-ai-ecosystem-strategy-2026-2029
created: 2026-06-25
updated: 2026-06-25
---

# What the Sandbox taught us about AI regulation

> **For:** a policymaker or a public-sector team deciding how to regulate AI, or how to run a sandbox that informs regulation. This page is about what the *programme* learned, not advice for deploying any single system.

This is a meta page. It reads the corpus the way a regulator or a programme designer would: not "how should I build my AI system" but "what did running these pilots reveal about how AI should be governed?" The two questions sound alike, so the distinction matters. Where a regulatory lesson rests on what a single deployment pilot found, that pilot is cited as the *evidence the programme drew its conclusion from*, fenced as deployment-side material — never as advice for a team building a system.

The Phase II booklet states the programme's own bottom line directly: *«Die zweite Umsetzungsphase hat gezeigt: Sandboxes sind ein wirksames Instrument, um Innovation, Regulierung und Standortförderung im Bereich KI zusammenzuführen.»* — the second implementation phase showed that sandboxes are an effective instrument for bringing together innovation, regulation, and economic-location promotion in AI [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). Seven regulatory learnings sit under that claim.

## 1. Regulation should be informed by real-world implementation, not only abstract risk categories

The strongest single line in the corpus on this comes from the booklet's conclusion, naming who benefited and how: *«Davon profitierten lokale KI-Anbieter und öffentliche Institutionen durch höhere Rechtssicherheit, Aufsichtsbehörden durch praxisnahe Grundlagen für eine verhältnismässige Regulierung und die Politik durch evidenzbasierte Entscheidungsgrundlagen.»* — local AI providers and public institutions benefited through greater legal certainty, supervisory authorities through practice-based foundations for proportionate regulation, and politics through evidence-based decision foundations [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). The programme's framing is that running real pilots, not reasoning from abstract risk classes alone, is what produces "proportionate" regulation.

The [[medical-documentation]] report turns this into a concrete instrument proposal in its forward section: regulatory test environments where a provider can submit a solution *for legal classification early, like a pre-submission dossier*, naming the intended purpose, system boundaries, and the line to medical decision-support, so it is clear before market entry whether the solution counts as a medical device [(p2-medical-documentation p. 40)](../sources/p2-medical-documentation.md). The mechanism is the same: surface the regulatory question against a real artefact, not against a category.

> [!ai-deployment]
> The deployment-side companion lesson is *integrate regulation early* ([[integrate-regulation-early]]): for a team building a product, late regulatory clarification bakes flawed assumptions into the business model — the [[autonomous-systems]] retrofit case, where automating an existing agricultural vehicle required full recertification, is the canonical example [(00-overview-phase2-build-and-share p. 18)](../sources/00-overview-phase2-build-and-share.md). That is advice for the builder. The programme-level reading is the inverse: the regulator learns what to clarify *from* watching where builders trip.

## 2. Early regulatory clarification reduces wrong product and deployment assumptions

The booklet's legal-insights section makes rapid regulatory orientation a supervisory obligation, not just a provider's problem: *«Schnelle regulatorische Orientierung ist entscheidend: Aufsichtsbehörden müssen in der Lage sein, rasch Orientierung und Rechtssicherheit für neue Anwendungsfälle zu schaffen.»* — rapid regulatory orientation is decisive; supervisory authorities must be able to quickly provide orientation and legal certainty for new use cases, especially for technologies spreading fast across a sector [(00-overview-phase2-build-and-share p. 18)](../sources/00-overview-phase2-build-and-share.md). The cost of late clarification is asymmetric: the provider has already committed to an architecture, and the regulator has lost the cheap window to shape it.

The clearest deployment evidence the programme drew on is [[medical-documentation]], where data-protection requirements blocked operational testing with patient data entirely, so the project became pure regulatory analysis [(00-overview-phase2-build-and-share p. 10)](../sources/00-overview-phase2-build-and-share.md). Had the data-protection regime been engaged at design time, the operational design could have been different. The regulatory learning is that early clarification is a system-design lever the administration can offer, not only a discipline the builder must keep.

## 3. Sector-specific guidance is often more useful than generic AI principles

The booklet is explicit that most binding questions were already answered by existing law, not by AI-specific rules: *«KI bewegt sich nicht im rechtlichen Vakuum: Bestehende gesetzliche Vorgaben – insbesondere Datenschutz und sektorspezifische Regulierung – sind in allen Projekten zentral und regeln bereits einen Grossteil der wichtigsten Fragen.»* — AI does not operate in a legal vacuum; existing statutory rules, especially data protection and sector-specific regulation, are central in all projects and already govern most of the important questions [(00-overview-phase2-build-and-share p. 18)](../sources/00-overview-phase2-build-and-share.md). AI-specific regulation (the Swiss implementation of the Council of Europe AI Convention) extends this frame in a targeted way where AI touches fundamental rights, rather than replacing it.

The corpus's densest legal output is sectoral, not general: [[medical-documentation]]'s eight-use-case classification maps realistic LLM functions against the [[medical-device-regulation|medical-device regime]] (MedDO, EU MDR/IVDR), turning on the *medical-purpose* line — once software interprets or generates rather than transcribes, the full regime applies [(p2-medical-documentation p. 30)](../sources/p2-medical-documentation.md). A generic "AI principles" document would not have produced that line; the sector law did. This was a deliberate Phase II shift — the programme moved into new sectors, "insbesondere Gesundheitssystem," and the most reusable guidance followed the sector [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md).

## 4. Human oversight, documentation, traceability and accountability are central

This safeguard cluster recurs across the portfolio and is the one most often misread as deployment advice, so the attribution matters. The cross-domain evidence is worked out in the deployment-side synthesis [[human-oversight-in-ai-deployment]], drawn from the two healthcare pilots: a named professional keeps responsibility and the final sign-off, AI outputs are documented and reviewable after the fact, and the report draws the sharp distinction that *transparency alone is not yet traceability* — an oversight box can be ticked without any real control existing [(p2-medical-documentation p. 37)](../sources/p2-medical-documentation.md).

> [!ai-deployment]
> The six-part oversight pattern in [[human-oversight-in-ai-deployment]] is deployment guidance: how a hospital or an administration keeps a person in charge of a high-stakes decision. The [[digital-eye-clinic]] workflow, built so the AI *«unterstützend wirkt und nicht automatisch diagnostiziert»* (acts in a supporting role and does not diagnose automatically) [(p2-digital-eye-clinic p. 27)](../sources/p2-digital-eye-clinic.md), is the practice case. Read it as evidence, not as instruction for the reader's own system.

The regulatory learning the programme draws from that evidence is narrower: across instruments, the same safeguard cluster recurs as what a regulator can rely on. The [[eu-ai-act|EU AI Act]] sets standing requirements for high-risk systems — the report's glossary names development, transparency, safety and monitoring [(p2-medical-documentation p. 41)](../sources/p2-medical-documentation.md) — with the oversight piece worked out in practice through clearly defined human-in-the-loop models [(p2-medical-documentation p. 37)](../sources/p2-medical-documentation.md); Swiss administrative law reaches the same place through the right to human review of automated decisions ([[fadp-art-21|FADP Art. 21]]), which bounds [[building-permits]] as a *pre-check* that supports rather than replaces the competent authority [(p2-building-permits p. 26)](../sources/p2-building-permits.md). The instrument differs; the safeguard cluster is constant. That constancy is itself the finding — a regulator does not need a new oversight vocabulary for each sector.

## 5. Data access and data governance are regulatory bottlenecks

The booklet ranks data access *above* model choice, integration, and governance as the single most powerful lever [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md). For the regulatory reading, the important half is that the lever is jammed by *governance*, not by technology. The clearest case is [[medical-documentation]], which could not reach real-world testing at all because data-protection requirements blocked patient-data use in a public hospital [(00-overview-phase2-build-and-share p. 10)](../sources/00-overview-phase2-build-and-share.md). The blocker was legal-organisational, not a missing model.

> [!ai-deployment]
> *Data access is the most powerful lever* ([[data-access-is-the-most-powerful-lever]]) is a deployment lesson: identify the data-access blocker — partner consent, regulatory permission, pseudonymisation — before the model, and plan for safely shareable data reuse. The [[infrastructure-maintenance]] dataset published on Hugging Face is the positive case [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). The regulator's version of the lesson is the mirror image: data-governance rules are where pilots stall, so a regulator wanting to enable AI has more leverage in clarifying lawful data access than in any AI-specific rule.

## 6. Rule-based, hybrid or simpler systems may sometimes be preferable to generative AI

The booklet states this in its technology insights, and it carries a regulatory implication the programme makes explicit: *«Regelbasierte Systeme schlagen generative KI bei klaren Entscheidungslogiken … Bei klar definierten, nachvollziehbaren und rechtlich relevanten Entscheidungslogiken … liefern regelbasierte Ansätze robustere und besser nachvollziehbare Resultate.»* — rule-based systems outperform generative AI for well-defined decision logic; where logic is clearly defined, traceable, and legally relevant, rule-based approaches deliver more robust and more traceable results [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md). For a regulator, "rechtlich relevant" is the operative phrase: a legally binding administrative act needs reproducibility and traceability that a probabilistic model fights by construction.

The decision guide for this sits in [[when-rule-based-beats-generative]], and [[building-permits]] is the worked hybrid — rule-based logic for the procedure determination that is a legally relevant decision, generative AI confined to parsing unstructured documents, and a human review step that satisfies the right to human review. The regulatory learning is that "use the simplest system that meets the legal bar" is a governable principle: it gives a supervisory authority a concrete question to ask of a deployment (is the binding decision step deterministic?) rather than a posture toward AI in general.

## 7. Sandboxes can function as learning instruments for regulators and administrations

This is the programme's claim about its own form, and the corpus states it directly. Phase II showed the sandbox acting *«als Lern- und Umsetzungsumgebung»* — as a learning and implementation environment, not merely a route for individual projects [(00-overview-phase2-build-and-share p. 24)](../sources/00-overview-phase2-build-and-share.md). The benefit-mapping line in point 1 is the evidence: supervisory authorities gained practice-based foundations for proportionate regulation, and policymakers gained evidence-based decision foundations [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). The sandbox is the mechanism that converts deployment experience into regulatory knowledge.

Two operating formats made that conversion concrete. The [[regulatory-roundtable]] put a supervisor in continuous dialogue with 10+ providers at once — a format the programme flags as effective precisely because *«KI-Anbieter selten direkten Zugang zu Aufsichtsbehörden erhalten»* (AI providers rarely get direct access to supervisory authorities), so one supervisor-hour informs many providers and the supervisor learns the emerging market pattern in return [(00-overview-phase2-build-and-share p. 10)](../sources/00-overview-phase2-build-and-share.md). And the [[inspection-robots]] project ran the first cross-border sandbox collaboration with supervisory authorities in Germany and Liechtenstein — co-learning across jurisdictions rather than each regulator reaching the same conclusion alone [(00-overview-phase2-build-and-share p. 14)](../sources/00-overview-phase2-build-and-share.md). Both are *regulatory roundtables are high-leverage* ([[regulatory-roundtable-is-high-leverage]]) read at the programme level: knowledge-transfer formats whose value is the regulator's learning, not any single product decision.

The roadmap extends this. Phase II names an "Erweiterter Testspielraum" — political clarification of how testing under clearly defined conditions might be enabled *even outside existing legal frameworks*, under strict supervision and with clear safeguards [(00-overview-phase2-build-and-share p. 23)](../sources/00-overview-phase2-build-and-share.md). That is the only point in the corpus where the sandbox contemplates operating beyond current law; every Phase II pilot ran *«im Rahmen des geltenden Rechts ohne Möglichkeit von regulatorischen Ausnahmen»* — within existing law, with no regulatory exemptions [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). The sandbox clarified regulatory implications; it never certified, approved, or exempted a system. A reader weighing the "sandbox as learning instrument" claim should hold both facts together: the learning was real, and it was produced entirely inside existing law.

## How these seven sit in the evidence hierarchy

Not all seven are equally grounded, and a reader should know where each sits.

- **Stated directly by the programme** (strongest): points 1, 2, 3, 6 and 7 are explicit booklet statements — the §04 technology and legal insights [(00-overview-phase2-build-and-share pp. 17–18)](../sources/00-overview-phase2-build-and-share.md) and the §06 conclusion [(00-overview-phase2-build-and-share pp. 23–24)](../sources/00-overview-phase2-build-and-share.md).
- **Repeated across reports, then synthesised here** (point 4): no single source says "these four obligations are the constant regulatory safeguard." It is a cross-portfolio synthesis — the AI Act's high-risk obligations, FADP Art. 21, and the healthcare oversight detail point the same way, and this page names the constancy. Treat it as a portfolio pattern, not a quotation.
- **Programme synthesis of a deployment lesson** (point 5): the booklet ranks data access highest as a deployment lever; reading it as a *regulatory* bottleneck — that governance, not technology, jams the lever — is this page's framing of a single-source ranking.

> [!update-needed] Reflects Phase II practice (2024–2026)
> These learnings are tied to the regulatory landscape of Phase II. The EU AI Act's high-risk obligations were still being operationalised, the Swiss AI-Convention implementation is in progress, and the "Erweiterter Testspielraum" beyond existing law was a roadmap item, not a power the programme held. Phase III (2026–2029, [[zh-ai-ecosystem-strategy-2026-2029]]) may move several of these from aspiration to practice. Read them as state-of-practice, not settled doctrine.

> [!gap] What the corpus does not answer
> The corpus shows what the *programme* learned; it does not contain an external evaluation of whether the resulting guidance changed regulator behaviour, nor a comparison with how other jurisdictions' sandboxes informed their regulation. The "sandbox as learning instrument" claim (point 7) is the programme's own assessment of its form — well-supported by the operating formats above, but self-reported. A consumer asking "did this actually improve regulation?" should note that the corpus answers "the programme produced practice-based foundations," not "regulators measurably adopted them."

> [!gap] Citation-verification pending
> The overview-booklet citations (pp. 5, 10, 14, 17–18, 23–24) and the [[medical-documentation]] anchors (DE pp. 30, 37, 40, 41) were located and verified directly against the German PDFs in the build — including correcting the von Thiessen *«Regulierung, die mitlernt»* line to its actual German page (DE p. 40, not the digest's EN p. 38) and the AI-Act high-risk-obligation glossary entry (DE p. 41). The [[digital-eye-clinic]] p. 27 and [[building-permits]] p. 26 anchors are carried over from the already-verified [[human-oversight-in-ai-deployment]] page.

## See also

- [[human-oversight-in-ai-deployment]] — the deployment-side evidence this page draws point 4 from; read it for the system-builder's oversight pattern, not as programme guidance.
- [[continuous-regulatory-learning-beats-rigid-approval]] · [[integrate-regulation-early]] · [[interdisciplinary-legal-issues-are-the-norm]] — the atomic legal lessons underlying points 1–3.
- [[regulatory-roundtable-is-high-leverage]] — the convening format that makes point 7 concrete.
- [[when-rule-based-beats-generative]] — the decision guide behind point 6.
- [[zh-ai-ecosystem-strategy-2026-2029]] — where the "sandbox as learning instrument" claim heads next.

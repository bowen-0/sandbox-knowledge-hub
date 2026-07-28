---
title: What constrained the Sandbox from scaling faster
type: synthesis
insight_domain: sandbox-operations
question: "What prevented the Zurich AI Sandbox from scaling more rapidly — and which of those constraints are structural versus addressable?"
audience: [sandbox-programme-designers, policymakers]
connects:
  - 00-overview-phase2-build-and-share
  - partner-bottleneck
  - partner-pivot-is-normal
  - strong-stakeholder-engagement-is-decisive
  - zh-ai-ecosystem-strategy-2026-2029
  - medical-documentation
  - inspection-robots
created: 2026-06-25
updated: 2026-06-25
---

# What constrained the Sandbox from scaling faster

> **For:** a public-sector team designing or running an innovation-sandbox-style programme, asking what limits throughput before they build their own. This is a `sandbox-operations` page — it describes how the Zurich programme was bounded as an operation, not advice for deploying an AI system.

The Build & Share booklet answers this question about itself. Section 05 ("Impact and Scaling of Results") is the booklet's own limitations chapter, and it names the constraints in the programme's own words [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Most of what follows is therefore a *direct programme self-assessment*, not a cross-project inference — the strongest tier of evidence in the corpus. Where a constraint is the programme's stated limitation, this page says so; where it is the wiki drawing the partner-dependence thread across pilots, it says that instead.

One framing matters before the list. The booklet does not present these as failures. It presents the sandbox as a *bottom-up, use-case-bounded* instrument and treats the limits as the cost of that design: *"The sandbox deliberately focuses on clearly defined use cases. This bottom-up approach enables practice-oriented insights but remains limited to individual applications."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Read the constraints below as the trade-offs of a deliberately narrow, high-touch model.

## The constraints the programme names directly

### Resource intensity — the binding limit on throughput

The booklet states the scaling ceiling in concrete terms. Operating a sandbox is resource-intensive, and the team is explicit about what a step-change in volume would cost: *"Scaling from five to, for example, fifty projects would require substantial personnel and organisational investment."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). The team mitigates this through a strong partner network; *"nevertheless, natural limits to scalability remain"* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Phase II ran a portfolio of eight initiated and five implemented projects over an 18-month window, most completing in 9–12 months each [(Build & Share (Phase II overview report), p. 8)](../sources/00-overview-phase2-build-and-share.md); the limitations chapter is what stops that number being far larger.

The intake cadence is the booklet's second named resource limit. Project calls currently run roughly every 1.5 years, and no new project can enter between them: *"If the submission window is missed, participation is only possible in the subsequent call."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Given the pace of AI development, the booklet notes this can delay the insights a project would have produced.

### The high-touch support model

The resource intensity is not generic overhead; it is the cost of a support model where each pilot needs several kinds of expertise at once. The Phase II findings are organised along three dimensions — Technology, Legal, Organisation [(Build & Share (Phase II overview report), p. 17)](../sources/00-overview-phase2-build-and-share.md) — and a single pilot routinely engages all three: a technical-architecture question, an interdisciplinary legal question (the booklet's own example is data protection *and* medical-device law colliding in the digital eye clinic, [(Build & Share (Phase II overview report), p. 18)](../sources/00-overview-phase2-build-and-share.md)), and an organisational-integration question. Around each project the booklet places five distinct partner roles — test partner, technical-implementation partner, mandated expert, domain sparring partner, supervisory authority [(Build & Share (Phase II overview report), p. 8)](../sources/00-overview-phase2-build-and-share.md), the taxonomy worked out in [[partner-roles-around-a-pilot]]. Convening and coordinating that constellation per use case is what makes each pilot expensive to support, and the booklet states the underlying organisational finding plainly: *"The interface between domain expertise and technology is critical: the greatest value emerges where domain knowledge and technical expertise are closely integrated."* [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md).

> [!ai-deployment]
> One finding on this page belongs to the deployment audience, not the programme-operations one. The booklet's *"Scaling often fails at integration, not at AI performance"* describes the **pilot-to-production gap for a deployed system**: the move into operations stalls on integration into existing systems, processes and governance, not on model performance [(Build & Share (Phase II overview report), p. 19)](../sources/00-overview-phase2-build-and-share.md). That is a deployment lesson for a unit putting a system into production, distinct from the programme-throughput constraints this page is about. Do not read it as a statement about the sandbox programme's own scaling.

### Dependence on partners and test environments

The dependency the booklet calls the *greatest* in the whole approach is the availability of suitable partners and test environments. From the §03 dependencies block: *"Collaboration with test partners is a critical success factor, but also represents the greatest dependency within the sandbox approach. Availability, access to data, and internal decision-making processes on the partner side are often only partially predictable and directly affect feasibility."* [(Build & Share (Phase II overview report), p. 15)](../sources/00-overview-phase2-build-and-share.md). The wiki names this cross-cutting failure mode the [[partner-bottleneck]]: the AI is rarely the hardest part — partner access is.

Two of the five Phase II pilots show what happens when this dependency binds, and they are the load-bearing evidence that partner availability — not model quality — sets the pace. The medical-documentation project could not run operationally because data-protection requirements blocked patient-data use in a public hospital, so it became a regulatory analysis with a [[regulatory-roundtable|roundtable]] of 10+ vendors and the supervisory authority [(Build & Share (Phase II overview report), p. 10)](../sources/00-overview-phase2-build-and-share.md). The inspection-robots project found no suitable test partner for an operational deployment and pivoted to pure regulatory analysis [(Build & Share (Phase II overview report), p. 9)](../sources/00-overview-phase2-build-and-share.md). The programme treats this not as failure but as a normal execution pattern to design around (*partner pivot is normal*, [[partner-pivot-is-normal]]), and the booklet's own mitigation is the same one: *"a strong openness to outcomes"* and flexible, iterative prioritisation, with dependencies identified early so timelines and focus can be adjusted [(Build & Share (Phase II overview report), p. 15)](../sources/00-overview-phase2-build-and-share.md). Pivoting protects the *value* of a constrained project, but it does not relieve the *throughput* constraint — a pilot that loses its partner still consumes the team's time before it pivots.

### Legal and data-access clarification is time-consuming

The same dependency block names data access and internal partner decision-making as the slow steps [(Build & Share (Phase II overview report), p. 15)](../sources/00-overview-phase2-build-and-share.md), and the corpus's most-repeated lesson is that the binding constraint sits there rather than in the model (*data access is the most powerful lever*, [[data-access-is-the-most-powerful-lever]]). The medical-documentation case is the sharpest instance: clarifying the data-protection and medical-device questions was the project — operational testing never opened [(Build & Share (Phase II overview report), p. 10)](../sources/00-overview-phase2-build-and-share.md). Where clarification of this kind is the per-project work, each use case requires its own tailored legal and organisational support, which is the high-touch model restated from the demand side.

### Implementation sits with the institutions, not the sandbox

A constraint the booklet is careful to name: the sandbox demonstrates what works, but broad roll-out is not within its gift. *"However, large-scale implementation lies with the respective institutions."* Authorities, municipalities, federal agencies, educational institutions and infrastructure operators must deploy, operate and integrate systems themselves [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Whether regulatory insights become law runs through democratic deliberation, not the programme. The booklet's conclusion: *"Broad-scale adoption, however, remains a shared responsibility across the entire AI ecosystem."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). This is a constraint on what *scaling the sandbox* can even mean: the programme scales learning, while adoption scales elsewhere.

## Structural versus addressable

Not all of these constraints are the same kind of thing. Separating them is the useful move for anyone designing a comparable programme.

**Structural — constraints that follow from the design itself.** The high-touch, per-use-case support model and the partner/test-environment dependency are not inefficiencies to be removed; they are how the sandbox produces practice-grounded, legally-real findings in the first place. Loosen them and the output changes character. The same holds for two boundaries the booklet draws around its own evidence: the bottom-up focus limits insight to individual use cases [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md), and operating strictly inside existing law (no regulatory exemptions, [(Build & Share (Phase II overview report), p. 9)](../sources/00-overview-phase2-build-and-share.md)) has a stated cost: *"Certain questions therefore cannot be fully explored and remain constrained by the current legal framework."* [(Build & Share (Phase II overview report), p. 22)](../sources/00-overview-phase2-build-and-share.md). Both are deliberate trade-offs, not bugs.

**Addressable — constraints the programme already plans to relax.** The §06 outlook reads as a direct response to the §05 limitations, which is why this page treats the two together. The booklet's "Handlungsfelder" for evolving the sandbox include several scaling levers [(Build & Share (Phase II overview report), p. 23)](../sources/00-overview-phase2-build-and-share.md):

- **Agile intake** — more frequent project calls plus continuous onboarding, aimed squarely at the 1.5-year-cadence limit.
- **Graded support by project type** — an early split between regulatory-analysis and real-world-testing projects, *"complemented by a staged 'funnel' approach based on the level of clarification required, from self-service to targeted support via a regulatory desk, and through to in-depth guidance within the AI sandbox"* [(Build & Share (Phase II overview report), p. 23)](../sources/00-overview-phase2-build-and-share.md). This is the lighter-support-format answer to the high-touch model: reserve the expensive, full-touch track for the projects that need it.
- **Thematic calls with portfolio logic** — focused calls along prioritised fields (the booklet names the financial sector for Zurich) to capture synergies and reduce single-project risk.
- **Systematised, reusable knowledge** — playbooks, a one-stop shop, and an AI-supported interaction component such as a chatbot, so findings reach more people without per-query staff time [(Build & Share (Phase II overview report), p. 23)](../sources/00-overview-phase2-build-and-share.md). (This wiki is an instance of that direction.)

So the honest summary is two-layered. The sandbox is bounded by resources, partner availability, and time-consuming legal clarification — real limits the programme states plainly. But part of that ceiling is a design choice the programme is now planning to relax through standardisation and lighter, tiered support formats, set inside the broader four-pillar ecosystem strategy where the sandbox is one pillar among four (see [[zh-ai-ecosystem-strategy-2026-2029]]). The structural part stays; the addressable part is roadmap.

> [!update-needed] Reflects Phase II self-assessment (2024–2026)
> The constraints and the outlook both come from the Phase II final booklet. The 1.5-year call cadence, the five-project scale, and the tiered-funnel plan are a snapshot of the programme as it stood at the close of Phase II; the Phase III roadmap (2026–2029) may have changed the cadence or the support model already. Treat the addressable list as stated intent, not completed reform.

> [!gap] Frequency does not rank these for you
> The booklet lists these limitations side by side without ranking them. This page's read — that resource intensity and partner dependence are the *binding* constraints, while the legal-clarification and institution-uptake points are downstream of them — is wiki synthesis, not a stated booklet hierarchy. A programme designer with a different cost structure (more staff, a denser partner network) might find a different constraint binds first.

> [!gap] Citation-verification status
> Every quotation on this page is copied verbatim from the official English edition, `pdfs/en/00-overview-phase2-build-and-share.pdf`, located via `pdftotext`: the §05 limitations (p. 22), the §03 dependency block (p. 15), the two findings-dimension quotes (p. 19), and the §06 outlook funnel passage (p. 23). The non-quote page anchors (p. 8, 9, 10, 17, 18) carry over from the German edition, which is page-aligned with the English one for this source.

## See also

- [[partner-bottleneck]] — the cross-cutting dependency that sits underneath the throughput limit.
- [[partner-pivot-is-normal]] — how the programme absorbs partner withdrawal without losing project value.
- [[strong-stakeholder-engagement-is-decisive]] — the flip side: why committed partners are what makes a pilot scale at all.
- [[zh-ai-ecosystem-strategy-2026-2029]] — the four-pillar frame the post-Phase-II sandbox sits inside, where the lighter formats are roadmapped.
- [[00-overview-phase2-build-and-share]] — the source booklet; §05 is its own limitations chapter, §06 its outlook.

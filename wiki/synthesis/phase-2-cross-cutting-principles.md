---
title: Phase II cross-cutting principles — the booklet's 17 general lessons
type: synthesis
insight_domain: ai-deployment
priority: high
question: "What are the general principles the sandbox has learned across all its pilots?"
audience: [administrative-staff-scoping-a-pilot, ai-providers-pre-rfp, policymakers, anyone-querying-the-wiki-for-general-guidance]
connects:
  - 00-overview-phase2-build-and-share
  - ai-is-rarely-the-primary-challenge
  - rule-based-beats-generative-for-defined-logic
  - ai-extends-beyond-large-language-models
  - model-selection-is-task-specific
  - combine-frontier-and-open-source-strategically
  - data-access-is-the-most-powerful-lever
  - integrate-regulation-early
  - interdisciplinary-legal-issues-are-the-norm
  - continuous-regulatory-learning-beats-rigid-approval
  - regulatory-roundtable-is-high-leverage
  - strong-stakeholder-engagement-is-decisive
  - value-must-be-clearly-articulated
  - domain-expertise-tech-interface-is-critical
  - integration-matters-more-than-model-choice
  - new-ways-of-working-need-change-management
  - probabilistic-ai-vs-administrative-reproducibility
  - data-reuse-multiplies-pilot-impact
created: 2026-05-28
updated: 2026-06-10
---

# Phase II cross-cutting principles

> **The booklet's 17 general lessons**, organised by Technology / Legal / Organisation as the booklet presents them ([[00-overview-phase2-build-and-share]] §04, pp. 17–19).
>
> **Why this page exists:** these are the principles the sandbox programme itself synthesised across all 10 pilots. They generalise beyond any single case study — which is precisely what makes them useful for *new* projects asking *new* questions. Start here for general guidance; the case-study-specific findings live one layer deeper, in the project pages ([[smart-parking]], [[building-permits]], etc.) and the individual lesson pages.
>
> The principles are deployment-facing (`insight_domain: ai-deployment`): they advise teams deploying, procuring, or regulating an AI system. Where a principle also carries programme-operating experience, the entry says so.

---

## Technology principles (7) — §04 Technology, p. 17

These come from cross-analysing the 10 pilots' technical layer.

1. **[[ai-is-rarely-the-primary-challenge]]** — *"In many cases, the deployed AI technologies are already available and mature… the more significant challenges lie in infrastructure, data access, integration, governance, and adoption."*

2. **[[rule-based-beats-generative-for-defined-logic]]** — *"Generative AI is strong on unstructured information; rule-based approaches deliver more robust and transparent results for clearly defined, traceable, legally relevant decisions."*

3. **[[ai-extends-beyond-large-language-models]]** — *"Many high-impact use cases in the public sector are based on computer vision or sensor data rather than language models."*

4. **[[model-selection-is-task-specific]]** — *"Different models exhibit distinct strengths and weaknesses depending on the task… a single 'best' model often does not exist."*

5. **Model-agnostic architecture proves advantageous** — *"Systems should be designed to allow models to be exchanged and continuously evaluated."* (See [[model-agnostic-architecture]] concept, anchored in [[model-selection-is-task-specific]].)

6. **[[combine-frontier-and-open-source-strategically]]** — *"Organisations can combine commercial frontier models from the cloud with locally deployed open-source models and should select the most appropriate configuration based on specific requirements."*

7. **[[data-access-is-the-most-powerful-lever]]** — *"Even seemingly simple datasets can generate substantial value… When made accessible, they enable a wide range of providers to train, validate, and improve their models."*

---

## Legal principles (5) — §04 Legal, p. 18

These come from cross-analysing the 10 pilots' regulatory engagement.

1. **[[integrate-regulation-early]]** — *"If regulatory requirements are addressed too late, flawed assumptions may arise in the business model. Early clarification is essential."*

2. **AI does not operate in a legal vacuum** — *"Existing legal frameworks, e.g. in data protection and sector-specific regulation, are central in all projects and already address many of the key issues. AI-specific regulation… complements this framework in a targeted manner."* (Anchored in [[ai-convention-ch-implementation]] and the existing FADP/IDG/sectoral stack.)

3. **[[interdisciplinary-legal-issues-are-the-norm]]** — *"AI applications typically span multiple areas of law… Isolated assessments are insufficient. AI providers require a holistic legal evaluation."*

4. **Rapid regulatory guidance is essential** — *"Supervisory authorities must be able to provide timely guidance and legal certainty for new use cases."* (Anchored operationally in [[regulatory-roundtable-is-high-leverage]].)

5. **[[continuous-regulatory-learning-beats-rigid-approval]]** — *"Traditional regulatory approaches reach their limits with dynamic, adaptive systems. New formats for exchange and feedback… are gaining importance beyond rigid approval mechanisms."*

---

## Organisation principles (6) — §04 Organisation, p. 19

These come from cross-analysing the 10 pilots' organisational layer.

1. **[[strong-stakeholder-engagement-is-decisive]]** — *"Successful projects are characterised by committed implementation partners who contribute time, resources, networks, and domain expertise."*

   > [!sandbox-operations] This principle also has a programme-side reading.
   > On this `ai-deployment` page it means: secure committed partners before you start. The lesson page carries the running-a-sandbox reading too — how a sandbox *selects and manages* partner commitment across a portfolio — fenced there as `insight_domain: both`.

2. **[[value-must-be-clearly-articulated]]** — *"The benefits of AI are not always immediately apparent to domain experts… AI should be deployed where it creates tangible value, not merely because it is technologically feasible."*

3. **[[domain-expertise-tech-interface-is-critical]]** — *"The greatest value emerges where domain knowledge and technical expertise are closely integrated. Without this translation layer, AI systems remain either technically sound but operationally irrelevant or vice versa."*

4. **Quality depends on systematic testing and domain validation** — *"Reliable results require structured testing, clear metrics, and repeated evaluation (e.g. thousands of test runs and LLM-as-a-judge in the building permit project). At the same time, domain-specific assessment is essential."* (Anchored in [[llm-benchmarks]], [[llm-as-a-judge]], [[building-permits]].)

5. **[[integration-matters-more-than-model-choice]]** — *"Scaling often fails at integration, not at AI performance… insufficient integration into existing systems, processes, and governance structures."*

6. **[[new-ways-of-working-need-change-management]]** — *"AI reshapes existing processes and roles. Acceptance is fostered through transparent communication, training, and the involvement of employees."*

---

## Plus: cross-cutting principles from §05 (Impact) and §06 (Outlook)

The booklet's later sections add three further principles relevant to **scaling impact**:

- **[[data-reuse-multiplies-pilot-impact]]** — published derived datasets compound a pilot's value beyond its own engagement. (§01, anchored in [[infrastructure-maintenance]].) *Dual-domain:* the deployment-side reading (publish what your pilot derives) and the programme-side reading (design intake to ask what dataset an engagement will leave behind) are fenced on the lesson page (`insight_domain: both`).
- **[[probabilistic-ai-vs-administrative-reproducibility]]** — a tension specific to public administration that the corpus repeatedly surfaces.
- **The 4-pillar Phase III strategy** — see [[zh-ai-ecosystem-strategy-2026-2029]] for the macro context these principles now sit within.

---

## How to use these for a query

Different queries should retrieve different subsets:

| Query type | Surface | Why |
|---|---|---|
| "What are the key lessons?" | This page (all 17) | Direct match to general guidance request |
| "Should I use AI for [X]?" | [[scoping-is-ai-the-right-approach]] + Technology principles 1, 2, 4 | Scoping-specific theme + relevant principles |
| "How do I handle [legal question]?" | Legal principles 1–5 + the relevant regulation page | Legal-specific principles + instrument |
| "Why is my pilot stalling?" | Organisation principles 1, 5, 6 | Most stalls are organisational, not technical |
| "How do I scale beyond pilot?" | Organisation principles 5, 6 + [[integration-matters-more-than-model-choice]] | Scaling-specific |
| "Can I just use ChatGPT?" | [[ai-extends-beyond-large-language-models]] + Technology 2 | Direct corrective to common misframing |

---

## See also

- [[00-overview-phase2-build-and-share]] — the source booklet.
- [[scoping-is-ai-the-right-approach]] — the most-relevant thematic guide.
- [[when-rule-based-beats-generative]] — companion theme on Principle 2.
- [[data-access-patterns-and-unblocking]] — companion theme on Principle 7.
- [[partner-roles-around-a-pilot]] — companion theme on Organisation Principle 1.
- [[eu-market-access-for-swiss-ai]] — companion theme on EU-specific Legal Principles.
- [[zh-ai-ecosystem-strategy-2026-2029]] — the macro context.

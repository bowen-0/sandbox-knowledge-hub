---
title: "A generative model in an administrative decision looks fair but imports systematic bias"
type: lesson
slug: generative-ai-decision-imports-bias
phase: I-and-II
insight_domain: ai-deployment
project: [building-permits]
concept: [llm-as-a-judge, generative-ai]
regulation: [dsg-fadp]
sources: ["digital-gatekeepers-immigration#page-6", "digital-gatekeepers-immigration#page-7", "p2-building-permits#page-22"]
confidence: medium
freshness: "2026-07"
cross_cutting: true
created: 2026-07-03
updated: 2026-07-03
---

# A generative model in an administrative decision looks fair but imports systematic bias

Put a generative model in the deciding seat of a rights-bearing administrative process and it produces decisions that read as procedurally reasonable while quietly privileging some groups over others. The failure mode is not obvious error; it is plausible, consistent inequity.

The external *Digital Gatekeepers* study placed GPT-3.5 and GPT-4 in the role of a US immigration officer across 10,000 admission scenarios. The models carried safeguards and did not reproduce humans' overt nationality bias, yet they still favoured applicants from wealthier countries and, most starkly, preferred a doctor over a janitor far more than humans did — a 74.7% (GPT-3.5) and 86.8% (GPT-4) increased probability of selection against 34.9% for human evaluators [(digital-gatekeepers-immigration p. 7)](../sources/digital-gatekeepers-immigration.md). The authors read this as implicit bias that mirrors and in places exaggerates the societal bias carried in the training data [(digital-gatekeepers-immigration p. 7)](../sources/digital-gatekeepers-immigration.md).

## Evidence base

- **[[building-permits]]** — the Sandbox reached the same boundary from the reliability side: a generative model's inconsistency across runs collides with administrative-law equal-treatment, so the prototype keeps generative AI out of procedure determination [(p2-building-permits p. 22)](../sources/p2-building-permits.md). *Digital Gatekeepers* adds the complementary point — even when the model is consistent, it is not equitable [(digital-gatekeepers-immigration p. 6)](../sources/digital-gatekeepers-immigration.md).
- The bias is structural rather than a prompt defect: it sits in the training data and survives the model's own fairness safeguards [(digital-gatekeepers-immigration p. 7)](../sources/digital-gatekeepers-immigration.md).

## How to apply

1. Treat "the model is consistent and sounds fair" as insufficient. Consistency and equity are separate bars; a legally relevant decision must clear both.
2. Keep generative AI to the unstructured, non-binding edges — pre-checks, drafting, triage — per [[rule-based-beats-generative-for-defined-logic]], and hold the decision itself to rule-based logic plus [[human-oversight-in-ai-deployment|human review]].
3. If a generative model touches a decision at all, audit outcomes for disparate treatment across protected attributes before deployment, not after.

## See also

- [[rule-based-beats-generative-for-defined-logic]] — the reliability-side version of the same boundary.
- [[building-permits]] — the Sandbox administrative-decision case.
- [[digital-gatekeepers-immigration]] — the source.

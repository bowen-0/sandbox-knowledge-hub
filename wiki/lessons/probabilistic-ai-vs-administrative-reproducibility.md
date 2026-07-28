---
title: Probabilistic AI fights administrative reproducibility
type: lesson
phase: II
insight_domain: ai-deployment
project: [building-permits, machine-translation]
concept: [generative-ai]
regulation: [fadp-art-21]
stakeholder: []
sources:
  - p2-building-permits#page-10
  - p2-building-permits#page-14
  - p2-building-permits#page-22
  - p2-building-permits#page-24
  - p2-building-permits#page-26
  - p2-building-permits#page-30
confidence: medium
freshness: 2026-04
applies_to_lifecycle_stage: [scoping]
created: 2026-05-28
updated: 2026-06-10
---

# Probabilistic AI fights administrative reproducibility

A tension named explicitly in [[building-permits]]: administrative law expects *the same case to receive the same outcome*, the principle of *equal treatment* and the *prohibition of arbitrariness* [(Building Permits report, p. 24)](../sources/p2-building-permits.md). Probabilistic AI is by construction non-deterministic: ask it the same question three times and get three (slightly) different answers. The report states this directly: *"Generative AI does not deliver deterministic results; administrative use requires configurations that are as controlled and reproducible as possible, otherwise trust in the AI systems will be lost."* [(Building Permits report, p. 22)](../sources/p2-building-permits.md)

The report poses the reliability threshold as an open question of error tolerance:

> *"What proportion of correctly executed AI-based pre-checks is necessary to achieve practical benefit? For example, is 95 percent sufficient, or is 99 percent necessary to avoid unnecessary uncertainty in the process?"* [(Building Permits report, p. 22)](../sources/p2-building-permits.md)

## Evidence base

The framing matters: this is presented as a political-administrative question, not a technical one. The report's conclusion makes the same move at the system level, stating that existing conflicts of objectives require political clarification and cannot be resolved technologically [(Building Permits report, p. 30)](../sources/p2-building-permits.md). The probabilistic system might be cheaper, faster, and on-average accurate, but it cannot reproduce the case-by-case determinism that Swiss administrative law assumes.

The corpus also notes that the benchmark measured consistency-across-3-runs, with each query repeated three times to test whether a model gives the same answer or fluctuates randomly [(Building Permits report, p. 10)](../sources/p2-building-permits.md), at 86.8% (best) to 78.8% (worst) [(Building Permits report, p. 14)](../sources/p2-building-permits.md). Meaning: a non-trivial fraction of building applications would receive *different* AI assessments from the same model run twice.

## How to apply

Three responses to the tension:

1. **Constrain AI to non-binding pre-checks** (the [[building-permits]] approach). The AI suggests; a human decides. [[fadp-art-21]] requires this for individual decisions anyway [(Building Permits report, p. 26)](../sources/p2-building-permits.md).
2. **Use rule-based logic for the determinative step** ([[rule-based-beats-generative-for-defined-logic]]) and reserve AI for unstructured input handling.
3. **Increase reliability through ensembles or repeat-and-vote** — but this multiplies cost and doesn't fully resolve the principle.

There is no clean technical fix; the design choice is whether to accept the loss of determinism or to design the system so AI is never the deterministic actor.

## See also

- [[building-permits]] — canonical case.
- [[fadp-art-21]] — the legal framing for the human-in-the-loop response.
- [[rule-based-beats-generative-for-defined-logic]] — the design pattern that resolves much of the tension.

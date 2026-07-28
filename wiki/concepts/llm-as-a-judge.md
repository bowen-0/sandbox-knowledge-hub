---
title: LLM-as-a-Judge
type: concept
canonical_source: p2-building-permits#page-31
related: [llm-benchmarks, frontier-models, large-language-models]
appears_in: [building-permits]
created: 2026-05-28
updated: 2026-06-10
---

# LLM-as-a-Judge

A methodology where one LLM is used to evaluate the outputs of another LLM against reference answers — typically scoring on a 0-10 scale across multiple capability dimensions. **Not in the booklet glossary**, but operationally central to [[building-permits]] as the scoring backbone of the 3,336-evaluation benchmark [(Building Permits report, p. 11)](../sources/p2-building-permits.md). The project report defines it in its own glossary: *"Approach in which a large language model is used to evaluate AI outputs, e.g. to assess quality, consistency or compliance with defined criteria."* [(Building Permits report, p. 31)](../sources/p2-building-permits.md)

## How [[building-permits]] uses it

| Element | Value |
|---|---|
| Models evaluated | 8 frontier LLMs across OpenAI, Google, Anthropic |
| Evaluations per model | ~417 |
| Runs per query | 3 (for consistency measurement) |
| Total evaluations | 3,336 |
| Scoring | LLM-as-a-Judge → 0–10 against expert reference |
| Dimensions | information extraction · counting · measuring/calculating · spatial understanding · context understanding |

Benchmark design and judge mechanism per the project report [(Building Permits report, p. 10)](../sources/p2-building-permits.md); totals, scoring scale and dimensions [(Building Permits report, p. 11)](../sources/p2-building-permits.md). The per-model evaluation count is derived from the totals.

## Why it matters as a concept

The glossary of [[00-overview-phase2-build-and-share]] explicitly flags the limits of generic [[llm-benchmarks]]: *"Their explanatory power is limited, as real-world use cases are often more complex and involve diverse data formats and requirements."* [(Build & Share (Phase II overview report), p. 26)](../sources/00-overview-phase2-build-and-share.md) LLM-as-a-Judge is the corpus's answer: domain-specific scoring on real administrative tasks, calibrated to expert ground truth. It makes the benchmark *trust-worthy for a specific use case* rather than *internally consistent on a generic test set*.

## Methodological caveats

- The judge LLM may share biases with the judged LLMs (especially if from the same provider family).
- Scoring 0-10 collapses different failure modes — a hallucinated number scored 4 isn't the same as a missing entry scored 4.
- Reproducibility across judge-model versions is non-trivial; the [[building-permits]] team scored each query 3 times specifically to measure consistency [(Building Permits report, p. 10)](../sources/p2-building-permits.md).

## See also

- [[llm-benchmarks]] — the broader category.
- [[building-permits]] — the canonical case study.
- [[model-agnostic-architecture]] — what you build *after* the benchmark shows no single best model.

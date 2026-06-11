---
title: LLM-as-a-Judge
type: concept
slug: llm-as-a-judge
canonical_source: p2-building-permits#page-31
related: [llm-benchmarks, frontier-models, large-language-models]
appears_in: [building-permits]
created: 2026-05-28
updated: 2026-06-10
---

# LLM-as-a-Judge

A methodology where one LLM is used to evaluate the outputs of another LLM against reference answers — typically scoring on a 0-10 scale across multiple capability dimensions. **Not in the booklet glossary**, but operationally central to [[building-permits]] as the scoring backbone of the 3,336-evaluation benchmark [(p2-building-permits p. 11)](../sources/p2-building-permits.md). The project report defines it in its own glossary: *«Ansatz, bei dem ein grosses Sprachmodell zur Bewertung von KI-Outputs eingesetzt wird, etwa zur Beurteilung von Qualität, Konsistenz oder Übereinstimmung mit definierten Kriterien»*, that is, an approach in which a large language model is used to assess AI outputs, for instance their quality, consistency, or conformity with defined criteria [(p2-building-permits p. 31)](../sources/p2-building-permits.md).

## How [[building-permits]] uses it

| Element | Value |
|---|---|
| Models evaluated | 8 frontier LLMs across OpenAI, Google, Anthropic |
| Evaluations per model | ~417 |
| Runs per query | 3 (for consistency measurement) |
| Total evaluations | 3,336 |
| Scoring | LLM-as-a-Judge → 0–10 against expert reference |
| Dimensions | information extraction · counting · measuring/calculating · spatial understanding · context understanding |

Benchmark design and judge mechanism per the project report [(p2-building-permits p. 10)](../sources/p2-building-permits.md); totals, scoring scale and dimensions [(p2-building-permits p. 11)](../sources/p2-building-permits.md). The per-model evaluation count is derived from the totals.

## Why it matters as a concept

The glossary of [[00-overview-phase2-build-and-share]] explicitly flags that generic [[llm-benchmarks]] have *"limited explanatory power"*: *«Ihre Aussagekraft ist begrenzt, da reale Anwendungsfälle oft komplexer sind und unterschiedliche Datenformate und Anforderungen umfassen»*, that is, real-world use cases are often more complex and involve diverse data formats and requirements [(00-overview-phase2-build-and-share p. 26)](../sources/00-overview-phase2-build-and-share.md). LLM-as-a-Judge is the corpus's answer: domain-specific scoring on real administrative tasks, calibrated to expert ground truth. It makes the benchmark *trust-worthy for a specific use case* rather than *internally consistent on a generic test set*.

## Methodological caveats

- The judge LLM may share biases with the judged LLMs (especially if from the same provider family).
- Scoring 0-10 collapses different failure modes — a hallucinated number scored 4 isn't the same as a missing entry scored 4.
- Reproducibility across judge-model versions is non-trivial; the [[building-permits]] team scored each query 3 times specifically to measure consistency [(p2-building-permits p. 10)](../sources/p2-building-permits.md).

## See also

- [[llm-benchmarks]] — the broader category.
- [[building-permits]] — the canonical case study.
- [[model-agnostic-architecture]] — what you build *after* the benchmark shows no single best model.

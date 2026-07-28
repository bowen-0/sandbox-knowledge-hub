---
title: LLM Benchmarks
type: concept
canonical_source: 00-overview-phase2-build-and-share#page-26
related: [large-language-models, frontier-models, llm-as-a-judge]
appears_in: [building-permits]
created: 2026-05-28
updated: 2026-06-10
---

# LLM Benchmarks

> *"Standardised tests used to evaluate and compare language models based on defined tasks (e.g. text comprehension, knowledge questions, or logical reasoning). Their explanatory power is limited, as real-world use cases are often more complex and involve diverse data formats and requirements."*
> — [[00-overview-phase2-build-and-share]], glossary [(Build & Share (Phase II overview report), p. 26)](../sources/00-overview-phase2-build-and-share.md)

The booklet treats generic benchmarks with explicit skepticism — they don't generalise to real-world use cases. The corpus's response is the [[building-permits]] **domain-specific benchmark**: 8 frontier LLMs × ~417 queries × 3 runs [(Building Permits report, p. 10)](../sources/p2-building-permits.md) = 3,336 evaluations scored 0–10 by an [[llm-as-a-judge]] against expert reference answers, on five capability dimensions specific to Swiss building applications [(Building Permits report, p. 11)](../sources/p2-building-permits.md).

The methodology is the most reusable engineering artefact in the corpus and the closest thing the sandbox has produced to a published evaluation harness for public-sector administrative-AI tasks.

## See also

- [[building-permits]] — the source of the methodology.
- [[llm-as-a-judge]] — the scoring mechanism.
- [[frontier-models]] — what gets benchmarked.

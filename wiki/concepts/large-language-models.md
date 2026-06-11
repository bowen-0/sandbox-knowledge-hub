---
title: Large Language Models (LLMs)
type: concept
slug: large-language-models
canonical_source: 00-overview-phase2-build-and-share#page-26
related: [frontier-models, generative-ai, llm-benchmarks]
appears_in: [medical-documentation, building-permits]
created: 2026-05-28
updated: 2026-06-10
---

# Large Language Models (LLMs)

> *«Grosse, auf neuronalen Netzwerken basierende Sprachmodelle, die durch Training auf umfangreichen Textkorpora natürliche Sprache verstehen und generieren können; zentrale Grundlage vieler generativer KI-Anwendungen.»*
> — [[00-overview-phase2-build-and-share]], glossary [(00-overview-phase2-build-and-share p. 26)](../sources/00-overview-phase2-build-and-share.md)

In English: large neural network-based language models trained on extensive text corpora to understand and generate natural language; they form the foundation of many generative AI applications.

The most operationally tested LLM use cases in Phase II are [[medical-documentation]] (transcription + structuring of medical notes — analysis-only) and [[building-permits]] (document understanding, completeness checks, plan-document interpretation — with real prototype). The booklet's strongest LLM-specific caveat (§04 Technology, "Modellwahl ist aufgabenspezifisch" / model selection is task-specific):

> *«Anders als bei generischen LLM-Benchmarks zeigt sich in der Praxis, dass ein einzelnes «bestes» Modell oftmals nicht existiert, insbesondere in vielfältigen Anwendungsfällen mit unterschiedlichen Dateninputs (z. B. Bild und Text).»*
> — [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)

In English: unlike generic LLM benchmarks, practical experience shows that a single "best" model often does not exist, particularly in diverse use cases involving multiple data inputs (e.g. images and text).

This caveat is the operational source of the "model-agnostic architecture is mandatory" pattern that [[building-permits]] canonicalises.

## See also

- [[frontier-models]] — most production LLMs in the corpus are frontier models.
- [[llm-benchmarks]] — and their limits.
- [[generative-ai]] — the application domain.

---
title: Generative AI
type: concept
slug: generative-ai
canonical_source: 00-overview-phase2-build-and-share#page-26
related: [large-language-models, frontier-models, computer-vision]
appears_in: [medical-documentation, building-permits, digital-eye-clinic]
created: 2026-05-28
updated: 2026-06-10
---

# Generative AI

> *«KI-Systeme, die neue Inhalte wie Texte, Bilder, Codes oder Audiodaten erzeugen, meist auf Basis grosser vortrainierter Modelle.»*
> — [[00-overview-phase2-build-and-share]], glossary [(00-overview-phase2-build-and-share p. 26)](../sources/00-overview-phase2-build-and-share.md)

In English: AI systems that generate new content such as text, images, code, or audio, typically based on large pre-trained models.

The dominant technical paradigm of **Phase II** (2024–2026). The booklet explicitly describes the shift in §01: *«Während in der ersten Phase insbesondere Computer Vision im Zentrum stand, integrierte die Sandbox nun auch generative KI.»* The official English version renders this as: "While the first phase focused primarily on computer vision, the sandbox in Phase II also integrated generative AI." [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md) The timing was deliberate: Phase II began *after* the initial market introduction of chatbots, enabling a more reflective and practice-oriented application [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md).

## The rule-based-vs-generative tension

The booklet's most operational generative-AI insight ([[00-overview-phase2-build-and-share]] §04 Technology, «Regelbasierte Systeme schlagen generative KI bei klaren Entscheidungslogiken», rendered "Rule-based systems outperform generative AI for well-defined decision logic" in the EN edition; [(00-overview-phase2-build-and-share p. 17)](../sources/00-overview-phase2-build-and-share.md)):

> Generative AI is strong on **unstructured information** (summarisation, transcription, plausibility checks). It reaches limits in **clearly defined, traceable, legally relevant** decision processes. There, rule-based approaches deliver more robust and transparent results.

The clearest evidence is in [[building-permits]] — the prototype uses pure rule-based logic for procedure determination [(p2-building-permits p. 20)](../sources/p2-building-permits.md), with generative AI confined to unstructured document quality checks [(p2-building-permits p. 21)](../sources/p2-building-permits.md).

## See also

- [[frontier-models]] / [[large-language-models]] — sub-categories of generative AI.
- [[llm-as-a-judge]] — generative-AI-on-generative-AI evaluation methodology.
- [[rule-based-beats-generative-for-defined-logic]] — the lesson page for the tension above.

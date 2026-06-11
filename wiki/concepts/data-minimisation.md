---
title: Data Minimisation
type: concept
slug: data-minimisation
canonical_source: null
related: [pseudonymisation, data-access]
appears_in: [smart-parking, ai-in-education, digital-eye-clinic]
created: 2026-05-28
updated: 2026-06-10
---

# Data Minimisation

The privacy-by-design principle of collecting and processing only the data strictly necessary for the AI system's purpose. Part of the **canonical Phase I privacy-by-design lexicon** — alongside *low resolution*, *masking*, *edge computing*, and *instant deletion* — first articulated in [[smart-parking]] [(p1-smart-parking p. 15)](../sources/p1-smart-parking.md) and reused across the Phase I corpus. The [[ai-in-education]] report states the principle directly: *«Ergänzt wird der Grundsatz durch das Prinzip der Datenminimierung, wonach Personendaten, die für den Bearbeitungszweck nicht mehr notwendig sind, vernichtet oder anonymisiert werden»*, that is, personal data no longer necessary for the processing purpose must be destroyed or anonymised [(p1-ai-in-education p. 8)](../sources/p1-ai-in-education.md).

## Concrete forms in the corpus

| Project | Form of minimisation |
|---|---|
| [[smart-parking]] | Low-resolution cameras incapable of capturing identifying detail; masking of bystander faces; instant deletion after parking-state inference. [(p1-smart-parking p. 15)](../sources/p1-smart-parking.md) |
| [[ai-in-education]] | Limiting student-data processing to the AI-task scope; not retaining inputs beyond the immediate query. [(p1-ai-in-education p. 8)](../sources/p1-ai-in-education.md) |
| [[digital-eye-clinic]] | For the MVP, all patient images and data were stored on-premises; any future cloud storage (e.g. Microsoft Azure) would make encryption, anonymisation, and contractual data-processing agreements obligatory. [(p2-digital-eye-clinic p. 26)](../sources/p2-digital-eye-clinic.md) |

## Legal anchor

Built into the Swiss data-protection regime — both [[dsg-fadp]] (federal) and [[idg-zh]] (cantonal) require that data processing be limited to what is necessary for the stated purpose. Failure to minimise is a common compliance gap; auditability of minimisation choices is a recurring [[data-protection-officer]] requirement.

## See also

- [[pseudonymisation]] — companion technique.
- [[smart-parking]] — canonical Phase I source for the privacy-by-design lexicon.
- [[dsg-fadp]] — federal legal anchor.

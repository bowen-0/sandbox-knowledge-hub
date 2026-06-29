---
title: "Digital Eye Clinic — Bringing AI diagnostics into practice"
cite_as: "Digital Eye Clinic"
type: source
source_type: pdf
slug: p2-digital-eye-clinic
path: ../pdfs/de/p2-digital-eye-clinic.pdf
en_path: ../pdfs/en/p2-digital-eye-clinic.pdf
language: bilingual
year: 2025
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen, stephanie-volz]
created: 2026-05-28
updated: 2026-06-11
---

# Digital Eye Clinic

**Read the report:** [PDF (DE)](../pdfs/de/p2-digital-eye-clinic.pdf) · [PDF (EN)](../pdfs/en/p2-digital-eye-clinic.pdf)

Phase II project report. AI diagnostics for **diabetic retinopathy** screening in clinical practice, conducted with the *Augenklinik Stadtspital Zürich* and the *Werner H. Spross Stiftung zur Förderung der Augenheilkunde*. Three concrete outputs: (1) a practice-tested evaluation framework applicable to other medical specialisations, (2) a **modular AI diagnostic platform built on open-source technologies** because no commercial product met the stringent requirements of a public hospital, (3) regulatory + ethical best practices for clinical AI deployment. Demonstrates the [[intrapreneurship]] pattern named in the Build & Share glossary ([[00-overview-phase2-build-and-share]]).

## Provenance

Published December 2025. Original filename: `digital_eye_clinic_en.pdf`. Test partners: Augenklinik Stadtspital Zürich and the Werner H. Spross Stiftung zur Förderung der Augenheilkunde, which submitted their project proposal to the sandbox in summer 2024; the project team worked on implementing AI diagnostics in ophthalmology between September 2024 and November 2025, and the report's content was developed from this case study [(p2-digital-eye-clinic p. 30)](../sources/p2-digital-eye-clinic.md). The report has been digested and ingested into this wiki; the working digest (page-numbered locator quotes plus a methodology summary, derived from the English PDF) lives at [sources/digests/p2-digital-eye-clinic.md](digests/p2-digital-eye-clinic.md). All wiki citations of this source are page-level against the German PDF.

## Methodology

The findings rest on a single clinical case study at the Stadtspital Zürich eye clinic, produced in two parallel tracks plus a regulatory analysis. **Track 1, vendor assessment:** the team ran a structured market analysis of five commercial providers of AI diagnostic tools for diabetic retinopathy, scored against technological criteria (CFP and/or OCT imaging support, DICOM compliance, explainability overlays, integration of the clinic's own AI models, compatibility with the existing system landscape), regulatory criteria (approvals such as FDA or CE/MDR, data governance) and economic criteria (cost per scan, scalability, contract models) [(p2-digital-eye-clinic p. 14)](../sources/p2-digital-eye-clinic.md). One vendor was excluded from the detailed comparison for not supplying sufficient information [(p2-digital-eye-clinic p. 14)](../sources/p2-digital-eye-clinic.md); one-off entry costs of the others ranged from roughly CHF 6,000–9,000 (licence) to about USD 18,000 (mandatory camera purchase), with monthly fees from EUR 189 to USD 1,500 [(p2-digital-eye-clinic p. 17)](../sources/p2-digital-eye-clinic.md). No vendor met the clinic's combined MVP requirements: in particular, none could integrate the clinic's own AI model, support both OCT and CFP on the required devices, and run on the preferred Azure or on-premise infrastructure, so the team decided to build its own model and platform [(p2-digital-eye-clinic p. 19)](../sources/p2-digital-eye-clinic.md).

**Track 2, in-house build and validation:** the MVP adapted Meta AI's open-source **DINOv2** foundation model via the Block Expanded **DINORET** approach (adapting a natural-image base model for retinal imaging), validated against several ophthalmological datasets, with access to large datasets such as UK Biobank retinal images requested to improve validation quality [(p2-digital-eye-clinic p. 20)](../sources/p2-digital-eye-clinic.md). The first MVP ran on a local GPU workstation inside the hospital network; the pipeline was later optimised to run on CPU-only compute, and local deployment was deliberately chosen to keep patient data on-site [(p2-digital-eye-clinic p. 21)](../sources/p2-digital-eye-clinic.md). The model was wrapped in a web-based GUI with two-factor authentication, an exam-management module, an integrated AI analysis pipeline, results reporting, explicit error states and DICOM-compliant storage and export [(p2-digital-eye-clinic p. 22)](../sources/p2-digital-eye-clinic.md). Prototype evaluation compared the AI's diagnoses with a medical second opinion per case to compute sensitivity, specificity and false positives/negatives, tracked technical resilience (average processing time per case, system availability), and gathered clinical-review feedback from the ophthalmologists using the system on usefulness, applicability in daily work and required workflow or UI adjustments [(p2-digital-eye-clinic p. 23)](../sources/p2-digital-eye-clinic.md). The regulatory analysis covered medical-device classification under the EU MDR (likely Class IIa or IIb for diagnostic support), the «interne Ausnahme» (in-house exception) for internally used AI, and data protection including ISDS processes and cloud constraints [(p2-digital-eye-clinic p. 26)](../sources/p2-digital-eye-clinic.md), plus bias and fairness monitoring and transparency and accountability safeguards [(p2-digital-eye-clinic p. 27)](../sources/p2-digital-eye-clinic.md).

Project team: Prof. Dr. med. Matthias Becker (chief physician of the eye clinic, president of the Werner H. Spross Stiftung), Dr. med. Gábor Márk Somfai (senior physician and research lead, Spross Research Institute), Tahm Spitznagel (research assistant physician), Dr. Rui Santos (AI translation officer), Dávid Isztl (machine learning engineer) and Dr. med. Amr Saad, all Augenklinik Stadtspital Zürich and Spross Research Institute; Florian Lüchinger (CEO, Foresite AG); [[raphael-von-thiessen]] (programme lead of the AI sandbox, Canton of Zurich); and [[stephanie-volz]] (managing director, [[itsl-uzh]]), who led the legal analysis [(p2-digital-eye-clinic p. 4)](../sources/p2-digital-eye-clinic.md). Per the digest, the sandbox's project steering involved the Office for Economy ([[amt-fuer-wirtschaft-zh]]) of Zürich and Schwyz, the Statistical Office Zürich, the Department for Digital Administration Zürich, the ETH AI Center, [[itsl-uzh]] and ZHAW entrepreneurship; the published report does not list this steering group.

## Notable quotes

- *«Maschinelles Lernen in der Augenheilkunde ebnet den Weg für eine sichere, genaue und zugängliche Vorhersage von Augenerkrankungen.»* — machine learning in ophthalmology paves the way for safe, accurate, and accessible ocular disease prediction. Dávid Isztl, machine learning engineer, Augenklinik Stadtspital Zürich ([p2-digital-eye-clinic p. 23](../sources/p2-digital-eye-clinic.md))
- *«Nur eine ganzheitliche, gut strukturierte Bewertung der Anbieter kann Aufschluss darüber geben, ob ein KI-Diagnosetool für den klinischen Einsatz und die institutionelle Einführung geeignet ist.»* — only a holistic, well-structured assessment of vendors can show whether an AI diagnostic tool is suitable for clinical use and institutional adoption. [[raphael-von-thiessen]], programme lead of the AI sandbox, Canton of Zurich ([p2-digital-eye-clinic p. 18](../sources/p2-digital-eye-clinic.md))
- *«Mit der Entwicklung & der Implementierung eines eigenen DR-Erkennungsmodells können wir ein Höchstmass an Datenschutz und Compliance gewährleisten.»* — with the development and implementation of our own DR detection model we can guarantee the highest degree of data protection and compliance. Dr. Rui Santos, AI translation officer, Augenklinik Stadtspital Zürich ([p2-digital-eye-clinic p. 20](../sources/p2-digital-eye-clinic.md))

## Use as citation

Authoritative source for:
- Clinical AI diagnostics deployment under Swiss healthcare regulation.
- Open-source AI platforms as a public-hospital procurement alternative when commercial offerings don't meet requirements.
- Cross-specialisation evaluation framework for medical AI.
- The intrapreneurship pattern in public healthcare.

## See also

- [[digital-eye-clinic]] — project page.
- [[medical-documentation]] — sibling Phase II healthcare project; deep cross-references in source.
- [[real-world-testing]] — this is one of the 3 Phase II projects that achieved real-world testing.

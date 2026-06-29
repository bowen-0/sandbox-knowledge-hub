---
title: "Autonomous Inspection Robots — Approaches to the AI Act and EU Machinery Legislation"
cite_as: "Inspection Robots"
type: source
source_type: pdf
slug: p2-inspection-robots
path: ../pdfs/de/p2-inspection-robots.pdf
en_path: ../pdfs/en/p2-inspection-robots.pdf
language: bilingual
year: 2025
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen, stephanie-volz]
created: 2026-05-28
updated: 2026-06-11
---

# Autonomous Inspection Robots

**Read the report:** [PDF (DE)](../pdfs/de/p2-inspection-robots.pdf) · [PDF (EN)](../pdfs/en/p2-inspection-robots.pdf)

Phase II `analysis-only` project report — a legal manual disguised as a project report. Examines how autonomous inspection robots ([[anybotics]] use case) can be classified in compliance with the **EU AI Act** and the **EU Machinery Regulation 2023/1230**. Project also tested an AI governance platform from [[modulos]] against the **ISO/IEC 42001** standard. No suitable test partner was available for real-world deployment, so the sandbox treated rigorous regulatory analysis as the successful output — including first-time cross-border collaboration with Germany's [[bundesnetzagentur-de|Bundesnetzagentur]] and Liechtenstein's [[li-digital-innovation|Office for Digital Innovation]].

## Provenance

Published November 2025; the report appears digital-only, in German and English [(p2-inspection-robots p. 40)](../sources/p2-inspection-robots.md). Original filename: `autonome_inspektionsroboter_en.pdf`. Publisher: Standortförderung Kanton Zürich [(p2-inspection-robots p. 40)](../sources/p2-inspection-robots.md). Industry partner: [[anybotics]] (Swiss autonomous-robotics vendor), which submitted the underlying project proposal to the sandbox in summer 2024 [(p2-inspection-robots p. 39)](../sources/p2-inspection-robots.md).

The report was digested and ingested into this wiki. The working digest (a locator aid, not a citation target) lives at [digests/p2-inspection-robots.md](digests/p2-inspection-robots.md). Citations across the wiki are page-level against the German PDF.

## Methodology

The project conducted no real-world testing; the report is a regulatory analysis built on a concrete industrial use case. The [[amt-fuer-wirtschaft-zh]] and the [[itsl-uzh]] developed compliance strategies for autonomous inspection systems using **ANYmal**, the four-legged inspection robot from [[anybotics]], as the worked example [(p2-inspection-robots p. 2)](../sources/p2-inspection-robots.md), described in chapter 3.1 with its sensor stack and three on-board AI components [(p2-inspection-robots p. 19)](../sources/p2-inspection-robots.md). Two parallel workstreams:

1. **HRAIS classification analysis.** Should ANYmal be classified as a high-risk AI system (HRAIS) under the EU AI Act? Two scenarios are contrasted [(p2-inspection-robots p. 22)](../sources/p2-inspection-robots.md). Scenario 1 (no HRAIS qualification) is worked through a decision tree [(p2-inspection-robots p. 23)](../sources/p2-inspection-robots.md) with three options: no safety component under Art. 6(1)/6(2), the Art. 6(3) exemption for preparatory activities [(p2-inspection-robots p. 24)](../sources/p2-inspection-robots.md), and the Art. 111 transitional provisions [(p2-inspection-robots p. 25)](../sources/p2-inspection-robots.md). Scenario 2 (HRAIS) routes conformity assessment through the established EU Machinery Regulation procedure, certifying only the on-board computer [(p2-inspection-robots p. 26)](../sources/p2-inspection-robots.md), with EU type-examination as the recommended route among the three available [(p2-inspection-robots p. 27)](../sources/p2-inspection-robots.md).
2. **ISO/IEC 42001 pilot.** Practical preparation of an AI management system, jointly with [[modulos]] [(p2-inspection-robots p. 29)](../sources/p2-inspection-robots.md). The risk analysis identified ten critical risks across external, operational and technical categories, with a medium overall rating [(p2-inspection-robots p. 31)](../sources/p2-inspection-robots.md). The Statement of Applicability covered all essential Annex A controls except A.5.5 (societal impact assessment), excluded for the limited industrial-inspection application context [(p2-inspection-robots p. 32)](../sources/p2-inspection-robots.md). Implementation prioritised the top three risks: AI system reliability and robustness, AI governance gaps, AI-specific security vulnerabilities [(p2-inspection-robots p. 33)](../sources/p2-inspection-robots.md).

The report states its contents are not legally binding and represent no official position of public bodies [(p2-inspection-robots p. 2)](../sources/p2-inspection-robots.md).

## Notable quotes

- *«EU-Regulierungen wirken oft weniger drastisch auf Firmen als erwartet – wer Spielräume klug nutzt und Risiken pragmatisch analysiert, kann eine passende Strategie entwickeln.»* — EU regulations often have a less drastic impact on companies than expected: those who make smart use of the available room for manoeuvre and analyse risks pragmatically can develop a suitable strategy. (Sven Kohlmeier, Specialist Attorney for IT Law (DE), Wicki Partners AG, [p2-inspection-robots p. 25](../sources/p2-inspection-robots.md))
- *«Wer KI-Governance systematisch verankert, schafft Sicherheit, reduziert Risiken und gewinnt langfristig Marktzugang.»* — Those who systematically embed AI governance create security, reduce risks and secure long-term market access. (Elena Maran, Global Head of Responsible AI, Modulos AG, [p2-inspection-robots p. 29](../sources/p2-inspection-robots.md))

## Stakeholders named in the report

- **Authors** [(p2-inspection-robots p. 39)](../sources/p2-inspection-robots.md): [[stephanie-volz]] (Managing Director ITSL, University of Zurich), [[raphael-von-thiessen]] (Programme Lead AI Sandbox, Canton of Zurich), Sven Kohlmeier (Specialist Attorney for IT Law (DE), Wicki Partners AG).
- **Case-study partner**: [[anybotics]], with Dr. Christian Gehring (Co-Founder and Sr. Director of Robotics & AI), Kateryna Portmann (Senior Product Manager), Marcel Fehr (Senior Certification Manager) [(p2-inspection-robots p. 4)](../sources/p2-inspection-robots.md).
- **AI-governance partner**: [[modulos]], with Elena Maran (Global Head of Responsible AI), Kevin Schawinski (Co-Founder and CEO) [(p2-inspection-robots p. 4)](../sources/p2-inspection-robots.md).
- **Expert support** [(p2-inspection-robots p. 4)](../sources/p2-inspection-robots.md): Dr. Ann-Katrin Michel (Head of Technology, Swissmem), Barbara Mullis (Standardisation Expert, Electrosuisse), Dr. Clara Guerra ([[li-digital-innovation|Office for Digital Innovation, Principality of Liechtenstein]]), Jonas Büchel (Legal Associate, Wicki Partners AG), Yvonne Finger (Head of Unit, [[bundesnetzagentur-de|Bundesnetzagentur]], Germany).

## Use as citation

Authoritative source for:
- Regulatory classification of autonomous AI under EU AI Act + EU Machinery Regulation interaction.
- Application of ISO/IEC 42001 to a concrete AI use case.
- The "EU market access via Swiss sandbox" pattern.
- The pivot to pure regulatory analysis as a legitimate sandbox outcome (alongside [[medical-documentation]]).

## See also

- [[inspection-robots]] — project page.
- [[autonomous-systems]] — Phase I predecessor (pre-EU-regulation Swiss framing).
- [[eu-ai-act]] / [[machinery-regulation]] / [[iso-iec-42001]].
- [[eu-market-access-for-swiss-ai]] — synthesis built on this source.
- [[cross-border-collab-unlocks-eu-access]] — lesson drawn from this source.

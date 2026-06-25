---
title: EU AI Act
type: regulation
slug: eu-ai-act
jurisdiction: eu
instrument: act
domain: [ai-governance]
year: 2024
project: [inspection-robots, building-permits, medical-documentation, digital-eye-clinic]
created: 2026-05-28
updated: 2026-06-24
canonical_source: 00-overview-phase2-build-and-share#page-26
---

# EU AI Act

The booklet glossary in [[00-overview-phase2-build-and-share]] defines the instrument as follows:

> *«EU-Verordnung zur Regulierung von KI-Systemen auf Basis eines risikobasierten Ansatzes. Sie definiert Anforderungen für Hochrisiko-KI-Systeme, Transparenzpflichten und Verbote bestimmter Anwendungen.»*

In English: "EU regulation governing AI systems based on a risk-based approach. It defines requirements for high-risk AI systems, transparency obligations, and prohibitions of certain applications." [(00-overview-phase2-build-and-share p. 26)](../sources/00-overview-phase2-build-and-share.md)

The defining EU instrument of the Phase II regulatory landscape. Where Phase I was dominated by Swiss law, Phase II projects engaged the AI Act as their primary regulatory frame — most notably [[inspection-robots]], whose entire project objective was to **systematically clarify EU AI Act + [[machinery-regulation]] interaction** for autonomous-robotics market access [(00-overview-phase2-build-and-share p. 14)](../sources/00-overview-phase2-build-and-share.md).

## Projects engaging the AI Act

Four projects touched the Act, two of them substantively. The Act was never the whole regulatory picture: each project also engaged the sector law that sits alongside it (see *How the Act sits alongside other regimes* below).

- [[inspection-robots]] (autonomous systems) — the central case. A structured risk-based classification of autonomous inspection systems, worked out against the EU [[machinery-regulation|Machinery Regulation 2023/1230]]; the interaction between the two instruments was the regulatory novelty, and [[iso-iec-42001]] was piloted as the management-system layer [(p2-inspection-robots p. 22)](../sources/p2-inspection-robots.md) [(00-overview-phase2-build-and-share p. 14)](../sources/00-overview-phase2-build-and-share.md).
- [[medical-documentation]] (healthcare) — medical AI is treated as high-risk under the Act, carrying obligations for risk management, transparency, human oversight and accuracy. The report stacks the Act on top of the medical-device regime ([[medical-device-regulation|MedDO + EU MDR/IVDR]]) rather than in its place, including the Act's predetermined-change-control expectation for continuously-learning systems. Von Thiessen's framing: *«...Regulierung, die mitlernt – flexibel, risikobasiert und jenseits starrer Zulassungen.»* (regulation that learns along, flexible, risk-based, and beyond rigid approvals) [(p2-medical-documentation p. 40)](../sources/p2-medical-documentation.md)
- [[digital-eye-clinic]] (healthcare) — AI that influences a treatment decision (diabetic-retinopathy screening) is medical-decision-influencing and so high-risk; the report classifies it as a medical device ([[medical-device-regulation|MDR Class IIa/IIb]]) and defers to the medical-documentation analysis for the detail [(p2-digital-eye-clinic p. 25)](../sources/p2-digital-eye-clinic.md).
- [[building-permits]] (public administration) — peripheral engagement only; its regulatory analysis is framed in Swiss administrative and data-protection law, not the Act.

## How the Act sits alongside other regimes

The Act is a risk-classification layer, not a replacement for sector law. In the portfolio it always stacked on top of an existing regime:

- alongside the EU [[machinery-regulation|Machinery Regulation]] for autonomous systems ([[inspection-robots]]);
- alongside the [[medical-device-regulation|medical-device regime]] (MedDO, EU MDR/IVDR, Swissmedic guidance) for healthcare AI ([[medical-documentation]], [[digital-eye-clinic]]);
- alongside Swiss data-protection law ([[dsg-fadp|FADP]] / [[idg-zh|IDG ZH]]) wherever personal data is processed.

So a project's AI Act question is rarely settled by the Act alone. The practical work was mapping which regime drives the conformity path: for inspection-robots, the Machinery Regulation's conformity assessment; for medical AI, the MDR Annex VIII classification.

## What the Sandbox did, and didn't do

The Sandbox clarified regulatory implications; it did not approve, certify, or exempt. Every project ran within existing law, with no regulatory exemptions [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md). Some questions stay open and depend on the final implementation context of a given system. Human oversight, documentation, risk management and transparency recur as the safeguards across these projects; [[human-oversight-in-ai-deployment]] sets out how the healthcare pilots implemented the oversight piece.

> [!gap] Pending
> The [[medical-device-regulation]] page (the MedDO + EU MDR/IVDR + Swissmedic cluster, the corpus's densest legal content, anchored in the medical-documentation report) is still to be written. The healthcare-source citations above are drawn from the report digests and should be anchored against the German PDFs in the citation-verification pass (bundled with the [[p1-infrastructure-maintenance]] EN→DE remap).

## Cross-border collaboration

The booklet's §03 project chapter records that the [[inspection-robots]] project engaged in **first-time cross-border collaboration** with Germany's *Bundesnetzagentur* ([[bundesnetzagentur-de]]) and Liechtenstein's *Office for Digital Innovation* ([[li-digital-innovation]]): *«Erstmals arbeitete das Sandbox-Projekt zudem grenzüberschreitend mit zuständigen Aufsichtsbehörden zusammen – der Bundesnetzagentur in Deutschland und der Stabsstelle für Digitale Innovation des Fürstentums Liechtenstein.»* In English: for the first time, the sandbox project also worked across borders with competent supervisory authorities [(00-overview-phase2-build-and-share p. 14)](../sources/00-overview-phase2-build-and-share.md). This set a precedent for the cross-jurisdictional sandbox engagements the Phase III ecosystem strategy [[zh-ai-ecosystem-strategy-2026-2029]] envisions.

## See also

- [[machinery-regulation]] — the regulation whose interaction with the AI Act is the central Phase II legal-analysis novelty.
- [[medical-device-regulation]] — the MedDO + EU MDR/IVDR cluster the Act stacks onto for healthcare AI.
- [[iso-iec-42001]] — AI management-system standard piloted alongside the AI Act analysis.
- [[ai-convention-ch-implementation]] — Swiss-side implementation of the Council of Europe AI Convention; complements the AI Act in Swiss-EU AI deployments.
- [[medical-documentation]] · [[digital-eye-clinic]] — the healthcare projects whose AI-Act / medical-device analysis this index draws on.

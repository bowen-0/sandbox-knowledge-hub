---
title: Automated Infrastructure Maintenance
type: project
slug: infrastructure-maintenance
phase: I
year: 2023
status: completed
sector: autonomous-systems
sources:
  - p1-infrastructure-maintenance#page-2
  - p1-infrastructure-maintenance#page-6
  - p1-infrastructure-maintenance#page-14
  - 00-overview-phase2-build-and-share#page-5
  - 00-overview-phase2-build-and-share#page-17
stakeholder: [raphael-von-thiessen, ibm-research]
regulation: []
concept: [computer-vision, data-access, partner-bottleneck]
related_projects: [bridge-monitoring, smart-parking]
created: 2026-05-28
updated: 2026-06-10
---

# Automated Infrastructure Maintenance

Drone inspections of military infrastructure with computer vision, executed with **IBM Research** [(p1-infrastructure-maintenance p. 2)](../sources/p1-infrastructure-maintenance.md). The "missing" Phase I project in the German corpus: no German edition of this report is available, so this page cites the English PDF (the one EN-only exception to the German-PDF citation convention).

## Outcome

The project produced a **structured, annotated dataset for infrastructure inspection** that IBM Research subsequently published on **Hugging Face** as a public benchmark — cited in [[00-overview-phase2-build-and-share]] §01 as a canonical example of *sustainable data reuse beyond the sandbox engagement*. The booklet records it verbatim: *«Im Projekt Drohneninspektion hat IBM Research einen strukturierten, annotierten Datensatz für die Inspektion von Infrastrukturen entwickelt, der als Benchmark für zukünftige KI-Modelle dient und über wissenschaftliche Publikationen sowie Plattformen wie Hugging Face öffentlich zugänglich ist.»* — in the drone-inspection project, IBM Research developed a structured, annotated dataset for infrastructure inspection that serves as a benchmark for future AI models and is publicly accessible via scientific publications and platforms such as Hugging Face [(00-overview-phase2-build-and-share p. 5)](../sources/00-overview-phase2-build-and-share.md).

## Key learnings

- High-resolution drone imagery is a powerful but logistically-constrained data source — partner access (military base permissions) was the operational bottleneck. The report notes that access to high-resolution imagery of airport runways "is usually difficult to obtain" [(p1-infrastructure-maintenance p. 14)](../sources/p1-infrastructure-maintenance.md), and the missions ran on a closed runway with flight altitude capped at 10 m [(p1-infrastructure-maintenance p. 6)](../sources/p1-infrastructure-maintenance.md).
- The "tiny dataset, large reuse" pattern: even apparently simple datasets generate outsized value when made publicly accessible. The Build & Share booklet states the principle as *«Zugang zu Daten schafft den grössten Hebel»*, access to data creates the biggest lever, and names this project's imagery as its example: *«z. B. hochaufgelöste Drohnenaufnahmen einer Landepiste»* ([[00-overview-phase2-build-and-share]] §04 Technology, [p. 17](../sources/00-overview-phase2-build-and-share.md)).
- Direct lineage to [[bridge-monitoring]] in Phase II — same theme (sensor-/CV-based infrastructure monitoring), shifted from drone imagery to sensor data.

> [!gap] Less detail in the corpus than other Phase I projects
> No German edition of this report is in the corpus; it is the one EN-only source, so page-level citations on this page reference the English PDF rather than a German one. If a German edition is published on zh.ch, fetch it and re-anchor the citations.

## Stakeholders

[[raphael-von-thiessen]], [[ibm-research]].

## See also

- [[p1-infrastructure-maintenance]] — the source PDF.
- [[bridge-monitoring]] — Phase II thematic successor.
- [[smart-parking]] — fellow Phase I CV pilot.

---
title: "Automated Infrastructure Maintenance — Drone Inspections with Computer Vision"
cite_as: "Infrastructure Maintenance report"
type: source
source_type: pdf
path: ../pdfs/de/p1-infrastructure-maintenance.pdf
en_path: ../pdfs/en/p1-infrastructure-maintenance.pdf
language: bilingual
year: 2023
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen]
created: 2026-05-28
updated: 2026-06-25
---

# Automated Infrastructure Maintenance — Drone Inspections with Computer Vision

**Read the report:** [PDF (EN)](../pdfs/en/p1-infrastructure-maintenance.pdf) · [PDF (DE)](../pdfs/de/p1-infrastructure-maintenance.pdf)

Phase I project report. Computer-vision-based drone inspection of military infrastructure, executed with IBM Research. Notable downstream legacy: produced a structured, annotated dataset for infrastructure inspection that IBM Research subsequently published on **Hugging Face** as a public benchmark — referenced explicitly in the Build & Share booklet as a model of sustainable data reuse beyond the sandbox engagement itself [(Build & Share (Phase II overview report), p. 5)](../sources/00-overview-phase2-build-and-share.md). Partner-access bottleneck: military base access constrained data collection; the report itself notes that access to high-resolution image data of airport runways "is usually difficult to obtain" [(Infrastructure Maintenance report, p. 14)](../sources/p1-infrastructure-maintenance.md).

## Methodology

How the report's findings were produced:

- **Intake**: IBM Research submitted the project proposal to the sandbox in spring 2022, extending earlier AI-based bridge-pillar inspection work to airport runways. The sandbox engaged the Dübendorf Air Base as project partner from the regional innovation ecosystem and pixmap gmbh as drone flight provider [(Infrastructure Maintenance report, p. 5)](../sources/p1-infrastructure-maintenance.md).
- **Test setup**: the airport operator defined a representative 200 × 40 m section of the 2.8 km runway. The runway was closed during flights and flight altitude was capped at 10 m; the EU/EASA drone regulations in force since 1 January 2023 framed the operating-licence requirements (Ground Risks and Air Risks) [(Infrastructure Maintenance report, p. 6)](../sources/p1-infrastructure-maintenance.md), with the Federal Office of Civil Aviation (FOCA) named as the regulator to engage [(Infrastructure Maintenance report, p. 16)](../sources/p1-infrastructure-maintenance.md).
- **Data collection**: pixmap gmbh flew three missions on 13 May 2023 with varying parameters: M1 at 0.25 mm/pixel (120 min flight, ~11,500 images), M2 at 0.75 mm/pixel (10 min, ~1,200 images), and M3, a photogrammetric orthophoto at 0.6 mm/pixel via Pix4Dmapper [(Infrastructure Maintenance report, p. 7)](../sources/p1-infrastructure-maintenance.md); mission comparison table at [(Infrastructure Maintenance report, p. 8)](../sources/p1-infrastructure-maintenance.md).
- **Analysis**: IBM Research merged the imagery with a custom multi-stage stitching algorithm and applied a vision-transformer foundation model (trained first on general images, then on civil-infrastructure images, then refined for crack detection) [(Infrastructure Maintenance report, p. 10)](../sources/p1-infrastructure-maintenance.md); results were presented in IBM's One-Click-Learning (OCL) platform [(Infrastructure Maintenance report, p. 11)](../sources/p1-infrastructure-maintenance.md).
- **Benchmarking**: the M1-vs-M2 comparison found 15.2% fewer high-confidence crack detections at M2 resolution [(Infrastructure Maintenance report, p. 11)](../sources/p1-infrastructure-maintenance.md), yet M2 sufficed to document the relevant cracks, making whole-runway capture in half a day feasible [(Infrastructure Maintenance report, p. 14)](../sources/p1-infrastructure-maintenance.md).
- The report content was created between June and October 2023 based on the use case [(Infrastructure Maintenance report, p. 28)](../sources/p1-infrastructure-maintenance.md).

## Notable quotes

The report is published in both languages with 1:1 page alignment; quotes follow the official English edition.

> *"The data captured for the Dubendorf runway is the first dataset of its kind that provides three different mission types for the same test area."* [(Infrastructure Maintenance report, p. 26)](../sources/p1-infrastructure-maintenance.md)

> *"Furthermore, every project in which AI applications are successfully used adds to the assurance that the developed foundation models –in this case by IBM Research– operate reliably in a broad context."* [(Infrastructure Maintenance report, p. 14)](../sources/p1-infrastructure-maintenance.md)

## Stakeholders named in the report

- [[ibm-research]] (Rüschlikon): technical implementation; report author Florian Scheidegger, Researcher [(Infrastructure Maintenance report, p. 28)](../sources/p1-infrastructure-maintenance.md).
- pixmap gmbh: drone flight provider; report author Reto Weiss, CEO [(Infrastructure Maintenance report, p. 28)](../sources/p1-infrastructure-maintenance.md).
- Dübendorf Air Base: site and data partner (military facility) [(Infrastructure Maintenance report, p. 5)](../sources/p1-infrastructure-maintenance.md).
- [[amt-fuer-wirtschaft-zh]]: sandbox programme operator; its Standortförderung (Location Promotion Canton of Zurich) holds the copyright [(Infrastructure Maintenance report, p. 29)](../sources/p1-infrastructure-maintenance.md).
- [[raphael-von-thiessen]]: Head of Innovation Sandbox for AI, Canton of Zurich [(Infrastructure Maintenance report, p. 28)](../sources/p1-infrastructure-maintenance.md); credited with project conception and coordination in the imprint [(Infrastructure Maintenance report, p. 29)](../sources/p1-infrastructure-maintenance.md).

## Provenance

Published November 2023. The report is published in digital format in both German and English [(Infrastructure Maintenance report, p. 29)](../sources/p1-infrastructure-maintenance.md). The German edition was missing from the original 2026-05-28 bundle and was added to the corpus on 2026-06-24 as `pdfs/de/p1-infrastructure-maintenance.pdf` (29 pp.; original filename `sandbox_ibm_research_infrastrukturwartung_de.pdf`; the EN copy is `sandbox_ibm_research_infrastructure_maintenance_en.pdf`). On 2026-06-25 the citations were re-pointed to the German PDF and the `asymmetry: en-only` flag cleared: page alignment was checked to be 1:1 against the EN edition by locating distinctive tokens (the 15.2% crack-detection figure on p. 11, the EASA / 200 × 40 m / 2.8 km references on p. 6, the 13 May 2023 flight and 0.25 mm/pixel on p. 7, the BAZL exchange on p. 16, the first-dataset quote on p. 26), so the page numbers carried over unchanged.

The report was digested and ingested into this wiki. The working digest (page-numbered quotes, methodology summary) lives at `sources/digests/p1-infrastructure-maintenance.md`; it is a locator aid derived from the EN PDF, never a citation target.

## Use as citation

Authoritative source for:
- Drone-based computer vision in critical-infrastructure inspection.
- The "data reuse beyond project lifetime" pattern (dataset → Hugging Face).
- Partner-access bottleneck (military / restricted facilities).

## See also

- [[infrastructure-maintenance]] — project page.
- [[bridge-monitoring]] — Phase II thematic successor (sensor + AI on infrastructure).
- [[smart-parking]] — fellow Phase I computer-vision pilot.

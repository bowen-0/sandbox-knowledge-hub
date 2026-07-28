---
title: "Smart Parking — Best Practices for Image Recognition"
cite_as: "Smart Parking report"
type: source
source_type: pdf
path: ../pdfs/de/p1-smart-parking.pdf
en_path: ../pdfs/en/p1-smart-parking.pdf
language: bilingual
year: 2024
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen, stephanie-volz]
created: 2026-05-28
updated: 2026-06-10
---

# Smart Parking — Best Practices for Image Recognition

**Read the report:** [PDF (DE)](../pdfs/de/p1-smart-parking.pdf) · [PDF (EN)](../pdfs/en/p1-smart-parking.pdf)

Phase I project report. Operational + technical playbook for camera-based free-parking-space detection. Covers data handling under cantonal IDG / federal FADP, the privacy-by-design vocabulary (low resolution, masking, edge computing, instant deletion) that recurs across the Phase I corpus, and the partner-bottleneck pattern (property owners gate-keeping camera placement). Pilot site: Frauenfeld — now in productive use and rolled out to additional cantons.

## Provenance

Published January 2024. Original filename: `smart_parking_EN.pdf`. The report has been digested and ingested into this wiki; the working digest (page-numbered locator quotes plus a methodology summary, derived from the English PDF) lives at [sources/digests/p1-smart-parking.md](digests/p1-smart-parking.md). All wiki citations of this source are page-level against the German PDF.

## Methodology

The report distils best practices from a single real-world case. Parquery AG, an ETH spin-off, submitted the project proposal to the Innovation Sandbox in spring 2022 and was selected on public criteria; the city of Frauenfeld ([[stadt-frauenfeld]]) then agreed to implement the use case as test partner [(Smart Parking report, p. 5)](../sources/p1-smart-parking.md). The pilot covered 5 of Frauenfeld's 14 public car parks, around 500 individual spaces [(Smart Parking report, p. 5)](../sources/p1-smart-parking.md). Cameras captured still images every two minutes rather than video; the images were converted into numerical occupancy data and deleted immediately after processing [(Smart Parking report, p. 6)](../sources/p1-smart-parking.md). The use case was implemented in practice between August 2022 and November 2023, and the report content was developed from this concrete case together with expert interviews: Georg Spycher (Parking Zürich AG), Angie Garz (Parquery AG) and Peter Koch ([[stadt-frauenfeld]], Office for Communications and Business Development) [(Smart Parking report, p. 21)](../sources/p1-smart-parking.md). Occupancy data is integrated into Frauenfeld's "Regio" app and reaches car-navigation systems via the Parkopedia interface; open-data publication on the APDS ISO standard is planned as a next step [(Smart Parking report, p. 9)](../sources/p1-smart-parking.md).

Authors: [[raphael-von-thiessen]] (head of the Innovation Sandbox for AI, Standortförderung Kanton Zürich) and [[stephanie-volz]] (legal expert, [[itsl-uzh]]) [(Smart Parking report, p. 21)](../sources/p1-smart-parking.md). The publishing Standortförderung sits within the [[amt-fuer-wirtschaft-zh]] [(Smart Parking report, p. 22)](../sources/p1-smart-parking.md). For data harmonisation the report points to the Ausschuss Digitalisierung of the ParkingSwiss association, the federal mobility-data infrastructure MODI (Federal Office of Transport), and the APDS ISO standard [(Smart Parking report, p. 18)](../sources/p1-smart-parking.md).

## Notable quotes

- *"Our goal is to realise an efficient parking management based on intelligent technologies."* — Peter Koch, [[stadt-frauenfeld]] ([p1-smart-parking p. 5](../sources/p1-smart-parking.md))
- *"Image recognition in public can be responsibly implemented through technical and organisational measures."* — [[raphael-von-thiessen]], head of the Innovation Sandbox for AI ([p1-smart-parking p. 14](../sources/p1-smart-parking.md))

## Use as citation

Authoritative source for:
- Image-recognition best practices in a Swiss public-administration context.
- The canonical privacy-by-design vocabulary (cited across Phase I).
- The partner-bottleneck pattern (property-owner access).
- Evidence of a Phase I → production roll-out (Frauenfeld → other cantons).

## See also

- [[smart-parking]] — project page.
- [[bridge-monitoring]] — same "sensor + AI" pattern, Phase II.
- [[infrastructure-maintenance]] — sibling computer-vision pilot.

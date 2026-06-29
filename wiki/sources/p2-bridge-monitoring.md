---
title: "Sensor-based Bridge Monitoring — Data Collection and Forecasting for Infrastructure Maintenance"
cite_as: "Bridge Monitoring"
type: source
source_type: pdf
slug: p2-bridge-monitoring
path: ../pdfs/de/p2-bridge-monitoring.pdf
en_path: ../pdfs/en/p2-bridge-monitoring.pdf
language: bilingual
year: 2026
publisher: Standortförderung Kanton Zürich
authors: [raphael-von-thiessen, stephanie-volz]
created: 2026-05-28
updated: 2026-06-11
---

# Sensor-based Bridge Monitoring

**Read the report:** [PDF (DE)](../pdfs/de/p2-bridge-monitoring.pdf) · [PDF (EN)](../pdfs/en/p2-bridge-monitoring.pdf)

Phase II project report. Sensor-based monitoring + AI predictions for ageing infrastructure. After the original municipal-footbridge implementation partner withdrew, the project pivoted to the **Reidholz railway bridge in Wädenswil** in partnership with *Schweizerische Südostbahn (SOB)*, capturing real loads from train traffic for the first time and developing service-life forecasting models. Demonstrates the "data-driven complements standards-based" pattern in safety-critical infrastructure.

## Provenance

Published February 2026. Original filename: `sensorbasierte_brueckenueberwachung_en.pdf`. Implementation partners: [[irmos-technologies]] and [[sob]]. The report has been digested and ingested into this wiki; the working digest (page-numbered locator quotes plus a methodology summary, derived from the English PDF) lives at [sources/digests/p2-bridge-monitoring.md](digests/p2-bridge-monitoring.md). All wiki citations of this source are page-level against the German PDF.

## Methodology

The findings rest on a single instrumented case study, not a survey. [[sob]] (Schweizerische Südostbahn AG) and [[irmos-technologies]] piloted data-based monitoring on the five-metre Reidholz railway bridge on the Wädenswil–Einsiedeln line: built in 1910, its steel plate replaced by a concrete slab in 1953, abutments and slab reinforced with shotcrete in 1990 [(p2-bridge-monitoring p. 8)](../sources/p2-bridge-monitoring.md). The central question came from the operator: can the bridge's remaining service life be determined more precisely from data than through normative procedures, is a use extension from ten to twenty years technically possible and economically justifiable, and does the method transfer to comparable bridges in the portfolio [(p2-bridge-monitoring p. 9)](../sources/p2-bridge-monitoring.md). irmos technologies submitted the project proposal in summer 2024; testing with SOB ran until the end of 2025, and the report's content was developed from this case study [(p2-bridge-monitoring p. 19)](../sources/p2-bridge-monitoring.md). Per the digest, the pilot had pivoted to SOB after the original municipal pedestrian-bridge test partner, [[stadt-frauenfeld]], withdrew; the published report does not recount this pivot.

For data collection, irmos technologies installed a lean sensor network: accelerometers for the dynamic response, strain gauges for stress cycles, a temperature sensor to correct seasonal influences, and a data acquisition box, complemented by cameras documenting train type, speed and composition to validate the modelled traffic loads; a test phase of several months delivered data from live operation [(p2-bridge-monitoring p. 9)](../sources/p2-bridge-monitoring.md). All metrics were tracked in real time on a cloud-based dashboard: trains by type, speed and passage count, derived train weights and axle loads per bogie, daily maximum deflection and the bridge's current stiffness over the full measurement period [(p2-bridge-monitoring p. 10)](../sources/p2-bridge-monitoring.md). The measurement data served to derive real load profiles and calibrate the existing engineering models; AI-supported procedures removed temperature influences and identified characteristic patterns, the previous conservative assumptions (dynamic amplification factors, stiffness) were checked against measurement, and a function was built that computes remaining-service-life scenarios by combining historical data with assumptions about future train types, frequencies and loads [(p2-bridge-monitoring p. 11)](../sources/p2-bridge-monitoring.md).

In parallel, the sandbox team examined the legal framework conditions of data-based monitoring: liability, availability, data protection and operational organisation [(p2-bridge-monitoring p. 13)](../sources/p2-bridge-monitoring.md). The conclusions also point to the service agreements between infrastructure operators and the Federal Office of Transport (BAV) as the frame for which investments must occur in which period [(p2-bridge-monitoring p. 16)](../sources/p2-bridge-monitoring.md). Authors: [[raphael-von-thiessen]] (programme lead of the AI sandbox, Standortförderung Kanton Zürich) and [[stephanie-volz]] (managing director, [[itsl-uzh]]), who led the legal analysis; project partners: Dr. Panagiotis Martakis (founder and CEO, irmos technologies), Andrea Luca Hauenstein (project manager, irmos technologies) and Stephan Zürcher (Technologie-Manager, SOB) [(p2-bridge-monitoring p. 19)](../sources/p2-bridge-monitoring.md).

## Notable quotes

- *«Datenbasiertes Monitoring ersetzt bestehende Nachweise nicht, sondern ergänzt sie mit Messdaten aus dem Betrieb.»* — data-based monitoring does not replace existing evidence, but complements it with measurement data from live operation. [[raphael-von-thiessen]], programme lead of the AI sandbox, Canton of Zurich ([p2-bridge-monitoring p. 7](../sources/p2-bridge-monitoring.md))
- *«Datenbasierte Monitoringsysteme unterstützen den Betrieb, verlagern aber die Verantwortung für sicherheitsrelevante Entscheidungen nicht vom Betreiber auf die Technologie.»* — data-based monitoring systems support operations, but they do not shift the responsibility for safety-relevant decisions from the operator to the technology. [[stephanie-volz]], [[itsl-uzh]] ([p2-bridge-monitoring p. 14](../sources/p2-bridge-monitoring.md))

## Use as citation

Authoritative source for:
- AI/ML on sensor data for safety-critical infrastructure.
- Liability + data-protection regime for sensor-based monitoring systems.
- The "partner withdrawal → pivot" pattern in sandbox project execution.
- Phase II as continuation of Phase I [[infrastructure-maintenance]] (drone-based) into sensor-based monitoring.

## See also

- [[bridge-monitoring]] — project page.
- [[infrastructure-maintenance]] — Phase I predecessor.
- [[building-permits]] — shares the "data + AI cannot eliminate human expertise" framing.

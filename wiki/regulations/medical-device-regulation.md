---
title: Medical Device Regulation (MedDO, EU MDR/IVDR)
type: regulation
slug: medical-device-regulation
jurisdiction: international
instrument: act
domain: [medical-devices, ai-governance]
year: 2017
project: [medical-documentation, digital-eye-clinic]
created: 2026-06-24
updated: 2026-06-24
---

# Medical Device Regulation (MedDO, EU MDR/IVDR)

The regime that turns AI software into a regulated medical device the moment it influences a medical decision. It is the densest legal cluster in the corpus, worked out in the [[medical-documentation]] report and cross-referenced by [[digital-eye-clinic]]. The Swiss *Medizinprodukteverordnung* (MepV / MedDO) mirrors the EU **MDR (2017/745)** and **IVDR**. Since the EU's mutual recognition of Swiss medical-device certification lapsed in 2021, a Class IIa-or-higher device can no longer be certified in Switzerland — it needs an EU notified body, and Switzerland unilaterally recognises the EU approval (expert box, Dr. Atanas Todorov, CMO Arcondis) [(p2-medical-documentation p. 34)](../sources/p2-medical-documentation.md).

## The "medical purpose" line decides everything

Pure transcription or administration is not a medical device. Once the software summarises, interprets, ranks, generates differential diagnoses, or otherwise influences a treatment decision, it acquires a medical purpose (*Zweckbestimmung*) and the full MedDO + MDR/IVDR regime applies. The report makes the point even for an apparently administrative case, automated billing:

> *«...kann dies eine medizinische Zweckbestimmung darstellen. In solchen Fällen muss sorgfältig geprüft werden, ob die Anwendung unter die Medizinprodukteverordnung fällt.»*

In English: this can constitute a medical purpose, and in such cases one must carefully check whether the application falls under the Medical Devices Ordinance [(p2-medical-documentation p. 30)](../sources/p2-medical-documentation.md). The report flags secondary use (*Sekundärnutzung*) as the trap: a diagnosis generated only for billing can still acquire a medical purpose if it flows into a medical report without clinical validation and shapes a treatment decision [(p2-medical-documentation p. 30)](../sources/p2-medical-documentation.md).

## Eight use cases, mapped to the classification

The report's §04 assesses eight realistic LLM use cases against the regime [(p2-medical-documentation p. 20)](../sources/p2-medical-documentation.md), from dictation transcription (usually not a medical device) through ambient clinical intelligence and multi-source report aggregation (a device once it draws medical conclusions) to AI-suggested differential diagnoses (clearly a device). It is the corpus's only worked example of stacking FADP + IDG ZH + criminal professional secrecy + MedDO/IvDO + MDR/IVDR + the EU AI Act on a single artefact.

Classification follows **MDR Annex VIII, Rule 11**: software is Class I, IIa, IIb or III by the significance of the information it provides against the patient's condition [(p2-medical-documentation p. 32)](../sources/p2-medical-documentation.md). Information that informs but does not drive treatment is typically Class IIa; high-significance information in a critical condition reaches Class III [(p2-medical-documentation p. 34)](../sources/p2-medical-documentation.md). Diagnostic decision-support such as [[digital-eye-clinic|diabetic-retinopathy screening]] lands at Class IIa or IIb [(p2-digital-eye-clinic p. 26)](../sources/p2-digital-eye-clinic.md).

## The in-house exception

A healthcare institution that manufactures and uses a device internally gets relaxed requirements under **Art. 9 MepV / Art. 9 IvDV** — but only relaxed, not waived: the software counts as placed in service, and the essential safety and performance requirements still apply in full; only the *other* MepV/IvDV requirements fall away [(p2-medical-documentation p. 34)](../sources/p2-medical-documentation.md). The institution must still notify the manufactured-and-used devices before commissioning (**Art. 18 MepV / Art. 10 IvDV**), with the MDCG 2023-1 guidance applying [(p2-medical-documentation p. 34)](../sources/p2-medical-documentation.md). The report states the exception precisely:

> *«Besondere und erleichterte Anforderungen gelten für Medizinprodukte, die in Gesundheitseinrichtungen hergestellt und verwendet werden (Art. 9 MepV und 9 IvDV) ... Jedoch gelten die übrigen Anforderungen nach MepV bzw. IvDV nicht.»*

In English: special, eased requirements apply to medical devices manufactured and used within healthcare institutions, but the remaining MepV/IvDV requirements do not apply [(p2-medical-documentation p. 34)](../sources/p2-medical-documentation.md). The exception falls away once the tool's output drives a treatment decision; [[digital-eye-clinic]] flags this as a genuinely nuanced line and recommends regulatory consulting before any external release [(p2-digital-eye-clinic p. 26)](../sources/p2-digital-eye-clinic.md).

## How the EU AI Act stacks on top

For medical AI the [[eu-ai-act|EU AI Act]] is an additional layer, not a substitute. Per the report's glossary, medical AI applications *mostly* count as high-risk systems, with the Act setting requirements for development, transparency, safety and monitoring [(p2-medical-documentation p. 41)](../sources/p2-medical-documentation.md); the precise trigger is conditional — software classed MDR Class IIa or higher (or IVDR Class B or higher) counts as high-risk automatically [(p2-medical-documentation p. 21)](../sources/p2-medical-documentation.md). For systems that keep learning, the report points to the Act's Art. 43(4) predetermined-change-control approach [(p2-medical-documentation p. 37)](../sources/p2-medical-documentation.md). The report argues this is exactly where rigid approval logic strains, and calls for adaptive regulation:

> *«...Regulierung, die mitlernt – flexibel, risikobasiert und jenseits starrer Zulassungen.»*

In English: regulation that learns along, flexible, risk-based, and beyond rigid approvals (Raphael von Thiessen, [p2-medical-documentation p. 40](../sources/p2-medical-documentation.md)).

## Human oversight and documentation

The recurring safeguards the report recommends are the deployment side of the same regime: a named professional keeps responsibility with traceability and a human in the loop, transparency through model cards, sanctioned tools to stop shadow use, and an ISO 13485 quality-management system [(p2-medical-documentation p. 37)](../sources/p2-medical-documentation.md). End-to-end encryption is preferred over anonymisation, which rarely succeeds for clinical text. [[human-oversight-in-ai-deployment]] works the full oversight pattern out across both healthcare projects.

## Projects engaging this regime

- [[medical-documentation]] — the reference analysis. The anchor SME ([[mpassist]]) could not be operationally tested because data-protection requirements blocked patient-data use, so the report is pure regulatory analysis: a data-protection FAQ, the eight-use-case classification, a 13-point best-practice list, and a [[regulatory-roundtable|roundtable]] with 10+ vendors and the cantonal supervisory authority.
- [[digital-eye-clinic]] — AI diagnostics for diabetic retinopathy; a Class IIa/IIb device that defers to the medical-documentation report for the regulatory detail.

## See also

- [[eu-ai-act]] — the risk-classification layer that stacks on top of this regime for medical AI.
- [[dsg-fadp]] · [[idg-zh]] — the data-protection regime that applies in parallel wherever patient data is processed.
- [[iso-iec-42001]] — the AI management-system standard piloted in the autonomous-systems strand; the medical strand uses ISO 13485 instead.
- [[swissmedic]] — the Swiss supervisory authority engaged through the medical-documentation roundtable.

> [!note] Citations verified against the German PDFs (2026-06-25)
> Every page number here was confirmed by locating the German text directly in `pdfs/de/p2-medical-documentation.pdf` (45 pp.) and `pdfs/de/p2-digital-eye-clinic.pdf` (33 pp.). Corrections made in this sweep: the in-house-exception articles are pinned to medical-documentation p. 34 (Art. 9 MepV / Art. 18 MepV); the [[digital-eye-clinic]] in-house and Class IIa/IIb anchors moved from the digest's p. 25 to the German p. 26; and the von Thiessen "regulation that learns" quote moved from p. 44 (the imprint) to p. 40, where it actually appears.

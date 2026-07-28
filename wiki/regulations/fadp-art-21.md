---
title: FADP Art. 21 — Automated Individual Decisions
type: regulation
jurisdiction: ch-federal
instrument: act
domain: [data-protection, ai-governance]
year: 2023
project: [machine-translation, building-permits, medical-documentation]
parent: dsg-fadp
created: 2026-05-28
updated: 2026-06-10
---

# FADP Art. 21 — Automated Individual Decisions

Article 21 of the Swiss Federal Act on Data Protection ([[dsg-fadp]]). Provides individuals with the right to human review when a decision that carries legal consequences or similarly significant effects for them is taken solely by automated means: *"Under Art. 21 FADP, data subjects have the right to be informed of such a decision and to request a review by a natural person."* [(Building Permits report, p. 26)](../sources/p2-building-permits.md). Functionally parallel to GDPR Art. 22, but with distinctly Swiss statutory framing.

## Why it's load-bearing in the corpus

This is the single most-cited article when sandbox projects engage automated administrative decisions:

- **[[building-permits]]** — discusses it where the report concludes fully automated rejection of a building application would likely not be permissible under current law (a conclusion the report draws from several legal bases, Art. 21 among them): *"Such fully automated decisions would likely not be permissible under current law."* [(Building Permits report, p. 26)](../sources/p2-building-permits.md). The prototype is designed as a *pre-check*, non-binding and human-reviewed, which keeps it outside the fully-automated-decision pattern.
- **[[machine-translation]]** — referenced in the original FADP framing for AI-in-administrative-procedures.
- **[[medical-documentation]]** — relevant whenever AI-generated medical notes inform clinical decisions; emphasised in the regulatory roundtable convened with the data-protection supervisory authority.

## The "voluntary AI pre-check" liability gotcha

From [[building-permits]]: even for a voluntary, non-binding AI pre-check, the report notes that state responsibility is not excluded — the pre-check is not a formal ruling (*Verfügung*), but liability based on legitimate trust (*Vertrauenshaftung*) can arise from it if users reasonably rely on it, so it must be clearly labelled as non-binding [(Building Permits report, p. 27)](../sources/p2-building-permits.md).

The report's own wording: *"If the pre-check gives the impression that it is reliable, binding or authoritative, users can gain a level of trust worthy of protection. It is therefore important to clarify that the pre-check is non-binding and that the relevant verification takes place in the formal procedure by the Authority."* [(Building Permits report, p. 27)](../sources/p2-building-permits.md).

This is a subtle constraint on UX: a "pre-check" affordance must visibly communicate its non-binding nature or it may functionally become the decision in users' minds (and the law follows their reasonable expectations).

## See also

- [[dsg-fadp]] — the parent statute.
- [[bv-art-29]] — constitutional right to be heard, paired with Art. 21 for the full automated-decision framing.
- [[building-permits]] — canonical project for the Art. 21 + pre-check pattern.

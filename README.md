# Sandbox Knowledge Hub

**The knowledge layer of the [Innovation Sandbox for Artificial Intelligence](https://www.zh.ch/de/wirtschaft-arbeit/wirtschaftsstandort/innovation-sandbox.html), Canton of Zurich** — 4.5 years of real-world AI piloting in Swiss public administration, restructured from 12 published reports into a navigable, citable, AI-ready wiki.

> **Status: feasibility study.** This repository demonstrates that the sandbox's published reports can be restructured into an AI-readable knowledge base — it is not a finished product. Answer quality has not been systematically assured and the system has not been red-teamed, so use is at your own risk: verify anything that matters against the cited report page. The primary goal is to share the insights gained while building it. Given significant interest, it could be developed into a fully supported resource at a later stage.

The sandbox ran ten pilots across two phases (2022–2026): building permits, medical documentation, autonomous inspection robots, bridge monitoring, machine translation, and more. Each produced a detailed report. Those reports hold hard-won knowledge about deploying AI under Swiss and EU law — and about running a regulatory sandbox at all. This repository restructures that knowledge so it can be read by AI systems, not just people.

## Who this is for

Technical experts: developers, AI engineers, and knowledge-base operators. The scope is deliberately narrow — this is not a chatbot, and none is planned here. The point is integration: you take this corpus (via the MCP server, or by cloning the repo) and plug it into your **own** assistant, agent, or retrieval system. If you just want to read the sandbox's findings, the [published reports](https://www.zh.ch/de/wirtschaft-arbeit/wirtschaftsstandort/innovation-sandbox.html) are the right format.

## How it's built

- **Every claim traces to its source.** Substantive statements cite the printed page of the underlying report (`slug#page-N`, German PDFs are citation-authoritative). Citations let a reader verify any claim against the report page — they make errors checkable, not impossible.
- **Two audiences, never conflated.** Insights for *deploying AI* (startups, SMEs, government units, policymakers) and insights for *running a sandbox programme* (other governments designing their own) sound alike but answer different questions. Every lesson declares which it serves via `insight_domain:`; AI consumers are instructed to keep them apart.
- **Extendable by design.** Adding a new report is a defined, AI-assisted procedure with human approval gates ([`wiki/INGEST.md`](wiki/INGEST.md)), and a lint pass guards the structure (`scripts/lint.mjs`).

## Use it

**Browse.** Start at [`wiki/index.md`](wiki/index.md) — the full inventory, organised by retrieval priority. Or open the `wiki/` folder in [Obsidian](https://obsidian.md) and use the graph view.

**Integrate it into your own assistant (MCP).** The hosted MCP server is the integration point: it plugs the corpus into any MCP-capable assistant or agent with one URL. No install, no API key; it is read-only over reports that are already public:

```
https://sandbox-knowledge-hub-mcp.bowen-9cc.workers.dev/mcp
```

Add it as a **custom connector** (most assistants require a paid plan to add one):

- **Claude** (Claude Desktop or claude.ai): Settings → **Connectors** → **Add custom connector** → paste the URL.
- **ChatGPT** (OpenAI, paid plan): the custom-connector option is hidden until you turn on developer mode.
  1. **Settings → Apps & Connectors → Advanced settings**, and toggle **Developer mode** on.
  2. Back under **Apps & Connectors**, click **Create** (or **Connect more**): name it, paste the URL above as the **base server URL**, and set **Authentication** to **None**. Tick the trust box, then **Create**.
- **Gemini, Copilot, or your own agent**: any MCP-capable client uses the same URL (Gemini CLI, agent frameworks, or the provider's API). Consumer-app connector menus vary by provider, but the URL is all you need.

Then ask a real question — e.g. *"We're considering AI to pre-check permit applications; what would we need before launching a pilot?"* — and the answer should come back grounded in the reports, with the source page cited. Spot-check the cited page: answer quality is not yet systematically assured (see the status note above).

Six read-only tools (overview, list, read, search, graph connections, citation resolution), plus the answering procedure as a resource. To run it locally (stdio) or self-host instead: [`mcp-server/README.md`](mcp-server/README.md).

**Work on it with an AI agent.** Open this repo in Claude Code or Cowork: the `query` and `ingest` skills load automatically from `wiki/.claude/skills/`, so the corpus can be queried ("what does the corpus say about data access in healthcare?") and extended ("ingest this new report") from chat, with the wiki's citation discipline built in.

**Updates** are managed by the sandbox programme team. The procedures the tooling follows are documented in [`wiki/INGEST.md`](wiki/INGEST.md) (adding a source) and [`wiki/CONVENTIONS.md`](wiki/CONVENTIONS.md) (the schema).

## What's inside

```
wiki/
├── projects/      10 pilot pages (one per sandbox project)
├── lessons/       21 atomic, transferable lessons — the highest-value layer
├── synthesis/     16 cross-cutting guides + validation views (scoping, data access, EU market access …)
├── concepts/      16 reusable ideas and vocabulary
├── regulations/   11 legal instruments (Swiss + EU + standards)
├── stakeholders/  20 people, organisations, and roles
├── sources/       12 source pages — the citation backbone, with methodology
│   └── digests/   working digests per report (ingest provenance)
└── pdfs/{de,en}/  the original report PDFs (immutable ground truth)
```

The schema lives in [`wiki/CONVENTIONS.md`](wiki/CONVENTIONS.md); the answering rules for AI consumers in [`wiki/QUERY.md`](wiki/QUERY.md). Page counts above shift as the wiki grows — `wiki/index.md` is the authoritative inventory.

## Licensing & attribution

The wiki content and all code in this repository are MIT-licensed (see [`LICENSE`](LICENSE)). The source PDFs under `wiki/pdfs/` are © Canton of Zurich and are redistributed here with attribution as permitted by the reports' terms; if you reuse the reports themselves, attribute the Canton of Zurich, Office for Economy, Innovation Sandbox for AI.

## Provenance

The wiki structure originated at GovTech Hackathon Switzerland 2026 (challenge by the Canton of Zurich) and was developed with the Innovation Sandbox team as a feasibility study for a published knowledge layer. Built and maintained with AI assistance under human editorial control; the sandbox team owns content correctness.

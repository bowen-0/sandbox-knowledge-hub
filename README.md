# Sandbox Knowledge Hub

**The knowledge layer of the [Innovation Sandbox for Artificial Intelligence](https://www.zh.ch/de/wirtschaft-arbeit/wirtschaftsstandort/innovation-sandbox.html), Canton of Zurich** — 4.5 years of real-world AI piloting in Swiss public administration, restructured from 12 published reports into a navigable, citable, AI-ready wiki.

The sandbox ran ten pilots across two phases (2022–2026): building permits, medical documentation, autonomous inspection robots, bridge monitoring, machine translation, and more. Each produced a detailed report. Those reports hold hard-won knowledge about deploying AI under Swiss and EU law — and about running a regulatory sandbox at all. This repository makes that knowledge usable: by people browsing it, and by AI assistants answering questions over it.

## What makes it trustworthy

- **Every claim traces to its source.** Substantive statements cite the printed page of the underlying report (`slug#page-N`, German PDFs are citation-authoritative). An assistant answering from this wiki can show exactly where a claim comes from — and cannot invent what isn't there.
- **Two audiences, never conflated.** Insights for *deploying AI* (startups, SMEs, government units, policymakers) and insights for *running a sandbox programme* (other governments designing their own) sound alike but answer different questions. Every lesson declares which it serves via `insight_domain:`; AI consumers are bound to keep them apart.
- **Built to stay current.** Adding a new report is a defined, AI-assisted procedure with human approval gates ([`wiki/INGEST.md`](wiki/INGEST.md)), and a lint pass guards the structure ([`UPDATING.md`](UPDATING.md)).

## Use it

**Browse.** Start at [`wiki/index.md`](wiki/index.md) — the full inventory, organised by retrieval priority. Or open the `wiki/` folder in [Obsidian](https://obsidian.md) and use the graph view.

**Connect your AI assistant (MCP).** The hub runs as a hosted MCP server — connect any MCP-capable assistant with one URL. No install, no API key; it is read-only over reports that are already public:

```
https://sandbox-knowledge-hub-mcp.bowen-9cc.workers.dev/mcp
```

Add it as a **custom connector** (most assistants require a paid plan to add one):

- **Claude** (Claude Desktop or claude.ai): Settings → **Connectors** → **Add custom connector** → paste the URL.
- **ChatGPT** (OpenAI): enable **Developer mode** in Settings, then add a connector with the URL.
- **Gemini, Copilot, or your own agent**: any MCP-capable client uses the same URL (Gemini CLI, agent frameworks, or the provider's API). Consumer-app connector menus vary by provider, but the URL is all you need.

Then ask a real question — e.g. *"We're considering AI to pre-check permit applications; what would we need before launching a pilot?"* — and the answer comes back grounded in the reports, with the source page cited.

Six read-only tools (overview, list, read, search, graph connections, citation resolution), plus the answering procedure as a resource. To run it locally (stdio) or self-host instead: [`mcp-server/README.md`](mcp-server/README.md).

**Work on it with an AI agent.** Open this repo in Claude Code or Cowork: the `query` and `ingest` skills load automatically from `wiki/.claude/skills/`, so "what does the corpus say about data access in healthcare?" and "ingest this new report" both just work — with the wiki's citation discipline built in.

**Update it.** [`UPDATING.md`](UPDATING.md) is the one-page guide. [`wiki/CONTRIBUTING.md`](wiki/CONTRIBUTING.md) covers contributing from any runtime.

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

The wiki structure originated at GovTech Hackathon Switzerland 2026 (challenge by the Canton of Zurich) and is being developed with the Innovation Sandbox team into the programme's published knowledge layer. Built and maintained with AI assistance under human editorial control; the sandbox team owns content correctness.

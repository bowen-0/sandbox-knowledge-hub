import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { WikiStore } from "./wiki.js";
import type { WikiProvider } from "./types.js";

const SERVER_INFO = {
  name: "sandbox-knowledge-hub",
  version: "0.1.0",
} as const;

const DISCIPLINE = `Answer from wiki pages, not from training data; if the wiki does not cover something, say so. CITE INLINE, ALWAYS: every substantive claim must carry its source citation in the form "[(<source-slug> p. N)](sources/<source-slug>.md)" — copy it from the page you read. Never write a sourced claim without its citation, even in a clean narrative summary. Respect insight_domain: never present a sandbox-operations insight as ai-deployment advice or vice versa. Full procedure: read the wiki://query-procedure resource or wiki_read_page "QUERY".`;

function json(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

/**
 * Build the MCP server over a wiki provider. Transport-agnostic: the stdio
 * entry, the node HTTP server, and the Cloudflare Worker all call this.
 */
export function buildServer(provider: WikiProvider): McpServer {
  const store = new WikiStore(provider);
  const server = new McpServer(SERVER_INFO, {
    instructions: `This server exposes the Zurich AI Innovation Sandbox Knowledge Hub: a citable wiki compiled from the sandbox's pilot reports (2022-2026). Start with wiki_overview, then walk pages with wiki_read_page / wiki_connections. ${DISCIPLINE}`,
  });

  server.registerTool(
    "wiki_overview",
    {
      title: "Wiki overview",
      description:
        "Orientation for the Sandbox Knowledge Hub: what the wiki contains, the two insight domains, page counts, and the retrieval routing table. Call this first.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () => {
      const stats = await store.stats();
      const index = await store.read("index");
      return json({
        what: "Knowledge layer over the Canton of Zurich AI Innovation Sandbox corpus: 12 source reports (10 pilots + 2 phase overviews, 2022-2026) compiled into interlinked, citable pages.",
        page_counts: stats.byType,
        insight_domains: {
          rule: "Lessons and synthesis pages declare insight_domain. NEVER generalise one domain's advice as the other's.",
          "ai-deployment": "for teams deploying, procuring, or regulating an AI system (startups, SMEs, government units, policymakers)",
          "sandbox-operations": "for government units designing or running an innovation-sandbox-style programme",
          counts: stats.byDomain,
        },
        citation_contract: 'Every substantive claim cites "<source-slug>#page-N" (printed page in the German PDF). Use wiki_resolve_citation to follow one.',
        discipline: DISCIPLINE,
        index_page: index?.content ?? "(index unavailable)",
      });
    }
  );

  server.registerTool(
    "wiki_list_pages",
    {
      title: "List wiki pages",
      description:
        "Inventory of wiki pages with one-line summaries. Filter by type (project|concept|regulation|stakeholder|lesson|source|synthesis), insight_domain (ai-deployment|sandbox-operations|both), sector, phase (I|II|I-and-II), cross_cutting, or priority.",
      inputSchema: {
        type: z.string().optional().describe("Page type filter, singular or plural"),
        insight_domain: z.enum(["ai-deployment", "sandbox-operations", "both"]).optional(),
        sector: z.string().optional().describe("e.g. healthcare, mobility, construction"),
        phase: z.string().optional().describe("I, II, or I-and-II"),
        cross_cutting: z.boolean().optional().describe("true = general principles only"),
        priority: z.string().optional().describe('"high" = the highest-leverage pages'),
      },
      annotations: { readOnlyHint: true },
    },
    async (filters) => json(await store.list(filters))
  );

  server.registerTool(
    "wiki_read_page",
    {
      title: "Read a wiki page",
      description:
        'Full markdown of one page by slug (e.g. "building-permits", "integrate-regulation-early", "index", "QUERY"). Follow [[wikilinks]] with further reads; answers usually live at the intersection of 3-5 pages.',
      inputSchema: {
        slug: z.string().describe("Page slug: filename without .md"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const result = await store.read(slug);
      if (!result) {
        return json({
          error: `No page with slug "${slug}". Use wiki_search or wiki_list_pages to find the right slug.`,
        });
      }
      return {
        content: [
          {
            type: "text" as const,
            text:
              `<!-- ${result.page.path} (type: ${result.page.type})${result.truncated ? " [truncated]" : ""} -->\n` +
              result.content,
          },
        ],
      };
    }
  );

  server.registerTool(
    "wiki_search",
    {
      title: "Search the wiki",
      description:
        "Full-text search across all pages (title, frontmatter, body). Returns ranked hits with snippets. Prefer wiki_overview's routing table for broad questions; search is for locating specific terms, entities, or claims.",
      inputSchema: {
        query: z.string().describe("Search terms"),
        type: z.string().optional().describe("Restrict to one page type"),
        insight_domain: z.enum(["ai-deployment", "sandbox-operations", "both"]).optional(),
        limit: z.number().int().min(1).max(25).optional().describe("Max hits, default 10"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ query, type, insight_domain, limit }) => json(await store.search(query, { type, insight_domain, limit }))
  );

  server.registerTool(
    "wiki_connections",
    {
      title: "Page connections",
      description:
        "The knowledge graph around one page: outgoing [[wikilinks]], typed frontmatter edges (sources, projects, concepts, regulations, stakeholders), and backlinks from other pages. Use it to walk the corpus the way QUERY.md prescribes.",
      inputSchema: {
        slug: z.string().describe("Page slug to inspect"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ slug }) => {
      const result = await store.connections(slug);
      return json(result ?? { error: `No page with slug "${slug}".` });
    }
  );

  server.registerTool(
    "wiki_resolve_citation",
    {
      title: "Resolve a citation",
      description:
        'Resolve a citation like "p2-building-permits#page-25" or "p2-building-permits p. 25" to its source: report title, publisher, PDF locations (German is citation-authoritative), and the source page to read. Returns metadata, never PDF content.',
      inputSchema: {
        citation: z.string().describe('Citation reference, e.g. "p2-building-permits#page-25"'),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ citation }) => json(await store.resolveCitation(citation))
  );

  // The procedure files travel with the corpus; expose them as resources so
  // capable clients can pin them as context.
  const resources: Array<[name: string, uri: string, slug: string, description: string]> = [
    ["query-procedure", "wiki://query-procedure", "QUERY", "The canonical answering procedure for this wiki (QUERY.md). The contract for any consumer."],
    ["conventions", "wiki://conventions", "CONVENTIONS", "The schema: page types, frontmatter fields, taxonomies, citation rules (CONVENTIONS.md)."],
    ["index", "wiki://index", "index", "Navigable inventory of every page, organised by retrieval priority (index.md)."],
    ["ingest-procedure", "wiki://ingest-procedure", "INGEST", "The four-phase procedure for adding new sources (INGEST.md)."],
  ];
  for (const [name, uri, slug, description] of resources) {
    server.registerResource(name, uri, { description, mimeType: "text/markdown" }, async () => {
      const result = await store.read(slug);
      return { contents: [{ uri, mimeType: "text/markdown", text: result?.content ?? `(${slug}.md not found)` }] };
    });
  }

  return server;
}

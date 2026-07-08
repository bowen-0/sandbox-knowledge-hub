import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { WikiStore } from "./wiki.js";
import { validatePage } from "./validate.js";
import { fetchPdfBytes } from "./fetch-pdf.js";
import type { WikiProvider } from "./types.js";
import type { WikiWriter } from "./github-writer.js";

const SERVER_INFO = {
  name: "sandbox-knowledge-hub",
  version: "0.1.0",
} as const;

const WRITE_DISCIPLINE = `This connection can also UPDATE the Knowledge Repository (the read tools above plus write tools). To add or change a PAGE: (1) draft it to the conventions — read wiki_read_page "CONVENTIONS" for the schema and "INGEST" for the four-phase add-a-source procedure; (2) call wiki_validate_page to check path, structure, citations, and links; (3) SHOW the user the drafted page and the validation result and get explicit approval; (4) call wiki_write_page to commit. To add a NEW REPORT: first call wiki_add_source_pdf with the report's public PDF URL (it is fetched and committed server-side, so its citations resolve), then write the source page (give it a \`cite_as\` short display name in frontmatter, e.g. \`cite_as: "Building Permits"\`, so citations to it read cleanly), its digest, and any lessons/syntheses as above. If the user ATTACHES a PDF instead of giving a URL, read it to draft the pages, but ask them for the report's public link (e.g. on the sandbox's own website) so wiki_add_source_pdf can store the file — its citations will not resolve until the PDF is in the repo. Every substantive claim must carry a page citation to a real source report — never invent a citation or a quote. When DRAFTING a page, author citations with the source SLUG — \`[(p2-building-permits p. 22)](../sources/p2-building-permits.md)\` — even though the read tools display a friendly source name; validation resolves the slug. wiki_write_page refuses to commit a draft with blocking validation errors. Commits go straight to the public repo's main branch; the live query endpoints refresh automatically a minute or two later.`;

// Appended to every wiki_read_page result. The cite-always rule must ride WITH
// the page content: a client (Claude Desktop, tool-search mode) may never call
// wiki_overview and may drop the server-level `instructions`, so the tool
// descriptions and this footer are the only channels guaranteed to reach the
// model. Kept short — ~30 tokens, nothing like the per-citation URL bloat that
// forced the serve-time linkify revert.
const CITE_FOOTER = `

---
**Writing your answer (a chat client, not Obsidian):**
- **Citations** — copy each claim's inline citation verbatim, exactly as written: the \`[(Source Name, p. N)]\` text, its link, and the page number. Keep the link as given (it already points where it should); never rewrite it or drop the citation to read more smoothly, not even in a clean summary.
- **Wikilinks** — \`[[slug]]\` is repo-internal navigation, not answer text: write the plain entity name (e.g. \`[[digital-eye-clinic]]\` becomes "the Digital Eye Clinic project"), never literal \`[[ ]]\` brackets, which do not render outside Obsidian.`;

const DISCIPLINE = `Answer only from the Knowledge Repository's pages, not from training data; if it does not cover something, say so plainly. ANSWER THE USER'S OWN PILOT, NOT A SANDBOX APPLICATION: the reports come from the Zürich innovation sandbox, but whoever is asking is usually running their own AI project, outside any sandbox programme. Treat an unscoped question as "how do I run this pilot well" and give general guidance drawn from the reports; bring in the sandbox's own intake or programme structure only when the user asks about it or says they are in it. CITE INLINE, ALWAYS: every substantive claim carries its inline citation copied verbatim from the page — the "[(Source Name, p. N)]" text with its link and page number, kept exactly as given; never write a sourced claim without its page number, even in a clean narrative summary. RENDER WIKILINKS PLAIN: the pages use "[[slug]]" for internal navigation — in your answer write the plain entity name (e.g. "the Digital Eye Clinic project"), never the literal "[[ ]]" brackets, which do not render outside Obsidian; only the "[( … p. N)]" citations are kept verbatim. LEAD WITH THE ANSWER, NOT THE SOURCE: state the finding first and let the inline citation carry the provenance — don't make a report or project the subject of every sentence ("the building-permits project found X" → "X [(Building Permits, p. N)]"). Name a source in the prose only where the source itself is the point: one pilot's specific outcome, or a pattern that holds across several. BANNED is narrating the retrieval act ("the wiki says", "I looked it up", "the search returned"); REQUIRED, and not retrieval-narration, is framing the evidence base ("the reports do not address this directly", "the corpus covers this across three pilots"). Name the source generically as the "Knowledge Repository" or "the corpus"/"the reports" — never "the wiki"/"the LLM wiki". BE CONCISE: give the shortest answer that fully answers and stop, no padding — but trim prose and claims, NEVER citations: every surviving claim keeps its inline page citation, and dropping one is never a way to shorten. Distinguish a direct report statement from a cross-pilot synthesis (synthesis pages are type: synthesis). Respect insight_domain: never present a sandbox-operations insight as ai-deployment advice or vice versa. Full procedure: read the wiki://query-procedure resource or wiki_read_page "QUERY".`;

function json(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

/**
 * Build the MCP server over a wiki provider. Transport-agnostic: the stdio
 * entry, the node HTTP server, and the Cloudflare Worker all call this.
 */
export function buildServer(
  provider: WikiProvider,
  opts: { writer?: WikiWriter; citationBaseUrl?: string } = {},
): McpServer {
  const store = new WikiStore(provider, opts.citationBaseUrl);
  const server = new McpServer(SERVER_INFO, {
    instructions:
      `This server exposes the Zurich AI Innovation Sandbox Knowledge Hub: a citable wiki compiled from the sandbox's pilot reports (2022-2026). Start with wiki_overview, then walk pages with wiki_read_page / wiki_connections. ${DISCIPLINE}` +
      (opts.writer ? `\n\n${WRITE_DISCIPLINE}` : ""),
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
        'Full markdown of one page by slug (e.g. "building-permits", "integrate-regulation-early", "index", "QUERY"). Follow [[wikilinks]] with further reads; answers usually live at the intersection of 3-5 pages. The page carries inline "[(slug p. N)]" citations — preserve them verbatim, page number included, on every claim you draw from it. Render any [[wikilinks]] as plain entity names in your answer, never literal "[[ ]]" brackets.',
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
              result.content +
              CITE_FOOTER,
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

  if (opts.writer) registerWriteTools(server, store, opts.writer);

  return server;
}

/**
 * Write tools — registered only when a WikiWriter is supplied (the separate,
 * authenticated write endpoint). The read endpoint never gets these.
 */
function registerWriteTools(server: McpServer, store: WikiStore, writer: WikiWriter): void {
  server.registerTool(
    "wiki_validate_page",
    {
      title: "Validate a draft page (no write)",
      description:
        "Dry-run check of a draft page before committing: path shape, frontmatter block, an H1, that every inline citation resolves to a real source page, and that every [[wikilink]] has a target. Returns errors (block the commit) and warnings (advisory). ALWAYS run this and show the user the result before wiki_write_page.",
      inputSchema: {
        path: z.string().describe('Wiki-relative path "<folder>/<slug>.md", e.g. "lessons/integrate-regulation-early.md"'),
        content: z.string().describe("Full markdown of the page, including the --- frontmatter --- block"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ path, content }) => json(await validatePage(store, path, content))
  );

  server.registerTool(
    "wiki_write_page",
    {
      title: "Create or update a wiki page (commit)",
      description:
        "Commit a page to the repository (create or update, chosen automatically). Validates first and REFUSES if there are blocking errors. Only call after the user has seen the draft + validation and approved. Commits to the public repo's main branch; the live query endpoints refresh automatically a minute or two later.",
      inputSchema: {
        path: z.string().describe('Wiki-relative path "<folder>/<slug>.md"'),
        content: z.string().describe("Full markdown of the page, including frontmatter"),
        message: z.string().optional().describe("Commit message; a sensible default is used if omitted"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async ({ path, content, message }) => {
      const result = await validatePage(store, path, content);
      if (!result.ok) {
        return json({
          committed: false,
          reason: "validation_failed",
          errors: result.errors,
          warnings: result.warnings,
          hint: "Fix the errors and re-run wiki_validate_page. Warnings do not block; if they are acceptable, the page is still committable.",
        });
      }
      const repoPath = `wiki/${result.path}`;
      const commitMessage = (message?.trim() || `wiki: ${result.path} (via write-MCP)`).slice(0, 200);
      try {
        const commit = await writer.putFile(repoPath, content, commitMessage);
        return json({
          ...commit,
          warnings: result.warnings,
          note: "Committed. The live read/query endpoint refreshes automatically a minute or two after the commit (CI redeploy).",
        });
      } catch (err) {
        return json({
          committed: false,
          reason: "commit_failed",
          error: err instanceof Error ? err.message : String(err),
          hint: "The write endpoint may be misconfigured (GitHub token/permissions). Tell the user; do not retry blindly.",
        });
      }
    }
  );

  server.registerTool(
    "wiki_add_source_pdf",
    {
      title: "Add a report PDF from a URL",
      description:
        "Fetch a published report PDF from a public https URL and commit it into the wiki (pdfs/de/<slug>.pdf or pdfs/en/<slug>.pdf, German is citation-authoritative), so citations to it resolve. The PDF is fetched and committed server-side — you supply the URL, not the bytes. Use this FIRST when adding a new report, then write its source/digest/lesson pages.",
      inputSchema: {
        url: z.string().describe("Public https:// URL of the report PDF"),
        path: z.string().describe('Target path: "pdfs/de/<slug>.pdf" (preferred) or "pdfs/en/<slug>.pdf"'),
        message: z.string().optional().describe("Commit message; a default is used if omitted"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false },
    },
    async ({ url, path, message }) => {
      const rel = path.replace(/^wiki\//, "").replace(/^\/+/, "");
      if (!/^pdfs\/(de|en)\/[a-z0-9][a-z0-9-]*\.pdf$/.test(rel)) {
        return json({
          committed: false,
          reason: "bad_path",
          error: `path must be "pdfs/de/<slug>.pdf" or "pdfs/en/<slug>.pdf" with a kebab-case slug; got "${path}".`,
        });
      }
      try {
        const bytes = await fetchPdfBytes(url);
        const commit = await writer.putBinary(`wiki/${rel}`, bytes, (message?.trim() || `wiki: add ${rel} (via write-MCP)`).slice(0, 200));
        return json({
          ...commit,
          size_kb: Math.round(bytes.byteLength / 1024),
          note: "PDF committed. Now write its source page + digest (and any lessons/syntheses), citing this PDF's pages.",
        });
      } catch (err) {
        return json({
          committed: false,
          reason: "fetch_or_commit_failed",
          error: err instanceof Error ? err.message : String(err),
          hint: "Check the URL is a public https link to the PDF. Tell the user; do not retry blindly.",
        });
      }
    }
  );

  server.registerTool(
    "wiki_write_info",
    {
      title: "How updating works",
      description: "Explains the write/update workflow, where commits land, and the validation guardrails. Call this if the user asks how to add or change content.",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    async () =>
      json({
        repo: writer.repo,
        branch: writer.branch,
        workflow: [
          "Edit/add a page: 1) draft to the conventions (wiki_read_page 'CONVENTIONS'); 2) wiki_validate_page; 3) show the user + get approval; 4) wiki_write_page.",
          "Add a NEW report: 1) wiki_add_source_pdf with its public PDF URL (fetched + committed server-side); 2) then write its source page, digest, and lessons/syntheses as above (wiki_read_page 'INGEST' for the four-phase procedure).",
        ],
        guardrails: [
          "Every substantive claim must cite a real source page; citations are checked against existing source pages.",
          "wiki_write_page refuses drafts with blocking errors.",
          "Commits are plain git — anything can be reverted on GitHub.",
        ],
        propagation: "The public read/query endpoint serves a built snapshot; a commit triggers a CI redeploy, so changes go live a minute or two later.",
        pdfs: "wiki_add_source_pdf fetches a published report PDF from its URL and commits it (no byte upload through chat — so if the user attaches a PDF, read it to draft pages but ask for its public link to store the file, or its citations won't resolve). A PDF not online anywhere can't be fetched — drag it into wiki/pdfs/de|en/ on GitHub instead.",
      })
  );
}

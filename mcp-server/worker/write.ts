/**
 * Cloudflare Workers entry: the WRITE variant of the Knowledge Hub MCP server.
 * Same read tools as the public endpoint, plus write tools (validate + commit).
 *
 * Deliberately a SEPARATE worker from the public read endpoint so the public
 * one stays read-only and open, and write is gated behind a secret that only
 * the sandbox team holds. Fail-closed: with no WRITE_TOKEN set, every request
 * is rejected; with no GITHUB_TOKEN set, it serves read-only.
 *
 * Activate (one-time, by the repo owner), all from mcp-server/worker/:
 *   cd mcp-server/worker && npx wrangler secret put WRITE_TOKEN  -c wrangler-write.jsonc
 *   cd mcp-server/worker && npx wrangler secret put GITHUB_TOKEN -c wrangler-write.jsonc
 *   cd mcp-server/worker && npm run deploy:write
 * Then share:  https://<worker>.workers.dev/mcp?key=<WRITE_TOKEN>
 *
 * The ?key= form puts the token in the URL, which is the low-friction path for
 * a custom connector but means the URL IS a secret (it can land in logs). Treat
 * it as one and rotate (re-run `secret put WRITE_TOKEN`) if it leaks. Clients
 * that support it can send `Authorization: Bearer <token>` instead.
 */
import { McpAgent } from "agents/mcp";
import { buildServer } from "../src/server.js";
import { BundleWikiProvider, type WikiBundle } from "../src/bundle-provider.js";
import { makeGitHubWriter } from "../src/github-writer.js";
import bundleJson from "../dist/wiki-bundle.json";

interface Env {
  /** Capability secret the client must present (?key= or Bearer). */
  WRITE_TOKEN?: string;
  /** Fine-grained PAT with Contents:write on the repo. */
  GITHUB_TOKEN?: string;
  GITHUB_OWNER?: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
}

const bundle = bundleJson as unknown as WikiBundle;

// Citations resolve through the public read worker's /c/ deep-link endpoint, so
// querying via this write connector gives the same clickable page links.
const READ_ORIGIN = "https://sandbox-knowledge-hub-mcp.bowen-9cc.workers.dev";

export class KnowledgeHubWriteMCP extends McpAgent<Env> {
  // Safe default so this.server is never undefined; init() upgrades it with the writer.
  server = buildServer(new BundleWikiProvider(bundle), { citationBaseUrl: READ_ORIGIN });

  async init() {
    if (!this.env.GITHUB_TOKEN) return; // no token → stays read-only (fail-safe)
    const writer = makeGitHubWriter({
      token: this.env.GITHUB_TOKEN,
      owner: this.env.GITHUB_OWNER ?? "bowen-0",
      repo: this.env.GITHUB_REPO ?? "sandbox-knowledge-hub",
      branch: this.env.GITHUB_BRANCH ?? "main",
      authorName: "Sandbox Knowledge Hub write-MCP",
      authorEmail: "knowledge-hub@users.noreply.github.com",
    });
    this.server = buildServer(new BundleWikiProvider(bundle), { writer, citationBaseUrl: READ_ORIGIN });
  }
}

const handler = KnowledgeHubWriteMCP.serve("/mcp", { binding: "MCP_OBJECT" });

function presentedToken(request: Request): string {
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("key");
  if (fromQuery) return fromQuery;
  const auth = request.headers.get("Authorization") ?? "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : "";
}

/** Length-then-XOR compare; avoids leaking the token via response timing. */
function tokensMatch(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // CORS preflight carries no credentials — let the transport answer it.
    if (request.method === "OPTIONS") return handler.fetch(request, env, ctx);

    // Gate ONLY the MCP endpoint. Everything else (notably the OAuth discovery
    // probes at /.well-known/*) must fall through to the transport's plain 404,
    // like the read worker: answering those probes with 401 reads as "this
    // server has a sign-in service", which sends OAuth-capable clients
    // (claude.ai) into a dynamic-client-registration flow that cannot succeed
    // here — the only auth on this worker is the capability token on /mcp.
    // (Observed 2026-07-16: "Couldn't register with …'s sign-in service".)
    const { pathname } = new URL(request.url);
    if (pathname !== "/mcp" && !pathname.startsWith("/mcp/")) {
      return handler.fetch(request, env, ctx);
    }

    if (!env.WRITE_TOKEN) {
      return new Response("Write endpoint is locked: WRITE_TOKEN is not configured.", { status: 503 });
    }
    if (!tokensMatch(presentedToken(request), env.WRITE_TOKEN)) {
      return new Response("Unauthorized.", { status: 401 });
    }
    return handler.fetch(request, env, ctx);
  },
};

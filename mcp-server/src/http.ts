import { createServer as createHttpServer } from "node:http";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { buildServer } from "./server.js";
import { FsWikiProvider } from "./fs-provider.js";
import { findWikiRoot } from "./wiki-root.js";

/**
 * Stateless Streamable HTTP endpoint: POST /mcp.
 * One transport + server instance per request; no sessions to manage, which
 * keeps the server deployable on any node host with zero state.
 */
async function main() {
  const wikiRoot = findWikiRoot();
  const provider = new FsWikiProvider(wikiRoot);
  const port = Number(process.env.PORT ?? 3920);
  const handleMcp = toNodeHandler(createMcpHandler(() => buildServer(provider)));

  const httpServer = createHttpServer(async (req, res) => {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          name: "sandbox-knowledge-hub",
          endpoint: "/mcp",
          transport: "streamable-http",
          docs: "https://modelcontextprotocol.io",
        })
      );
      return;
    }

    if (url.pathname === "/mcp") {
      if (req.method !== "POST") {
        // Stateless mode: no SSE notification stream, no sessions to delete.
        res.writeHead(405, { "content-type": "application/json", allow: "POST" });
        res.end(JSON.stringify({ error: "Stateless server: POST JSON-RPC messages to /mcp." }));
        return;
      }
      try {
        await handleMcp(req, res);
      } catch (err) {
        if (!res.headersSent) {
          res.writeHead(500, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : "internal error" }));
        }
      }
      return;
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not found" }));
  });

  httpServer.listen(port, () => {
    console.error(`sandbox-knowledge-hub MCP server on http://localhost:${port}/mcp (wiki: ${wikiRoot})`);
  });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});

/** Start the actual Workers locally and exercise both protocol generations. */
import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const state = await mkdtemp(join(tmpdir(), "sandbox-http-check-"));
const children: ChildProcess[] = [];

async function freePort(): Promise<number> {
  const server = createServer();
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  return port;
}

async function startWorker(config: string, name: string, vars: string[] = []): Promise<string> {
  const port = await freePort();
  const child = spawn(process.execPath, [
    resolve(root, "node_modules/wrangler/bin/wrangler.js"), "dev", "--local",
    "-c", config, "--ip", "127.0.0.1", "--port", String(port),
    "--inspector-port", "0", "--persist-to", join(state, name), "--log-level", "error",
    ...vars.flatMap(value => ["--var", value]),
  ], { cwd: join(root, "worker"), env: { ...process.env, WRANGLER_SEND_METRICS: "false" } });
  children.push(child);
  let logs = "";
  for (const stream of [child.stdout, child.stderr]) stream?.on("data", chunk => { logs = (logs + chunk).slice(-6000); });
  const url = `http://127.0.0.1:${port}/mcp`;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error(`${name} exited before readiness:\n${logs}`);
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(500) });
      await response.body?.cancel();
      return url;
    } catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  throw new Error(`${name} did not become ready:\n${logs}`);
}

try {
  const [read, write] = await Promise.all([
    startWorker("wrangler.jsonc", "read"),
    startWorker("wrangler-write.jsonc", "write", ["WRITE_TOKEN:local-check-token", "GITHUB_TOKEN:local-disabled-github-token"]),
  ]);
  const check = spawn(process.execPath, ["--import", "tsx", "scripts/check-http.ts", read, write], {
    cwd: root, stdio: "inherit", env: { ...process.env, MCP_TEST_WRITE_TOKEN: "local-check-token" },
  });
  children.push(check);
  const code = await new Promise<number | null>((resolve, reject) => {
    check.on("error", reject);
    check.on("exit", resolve);
  });
  if (code !== 0) throw new Error(`HTTP checks exited with ${code}`);
} finally {
  await Promise.all(children.map(child => new Promise<void>(resolve => {
    if (child.exitCode !== null || child.signalCode !== null) return resolve();
    child.once("exit", () => resolve());
    child.kill("SIGTERM");
    setTimeout(() => child.kill("SIGKILL"), 5000).unref();
  })));
  await rm(state, { recursive: true, force: true });
}

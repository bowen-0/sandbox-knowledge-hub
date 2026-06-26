/**
 * GitHub-backed write path. The wiki lives in a public git repo and the repo
 * is the source of truth; a write commits the markdown straight to it via the
 * GitHub Contents API. No filesystem, so this runs in a Cloudflare Worker.
 *
 * The token is held only by the Worker (a secret), never by the AI client.
 */

export interface CommitResult {
  committed: boolean;
  /** Repo-relative path written, e.g. "wiki/lessons/foo.md". */
  path: string;
  /** "created" | "updated". */
  action: "created" | "updated";
  commitUrl?: string;
  fileUrl?: string;
}

export interface WikiWriter {
  /** "owner/repo". */
  readonly repo: string;
  readonly branch: string;
  /** Current blob SHA for a repo path, or null if the file does not exist. */
  getFileSha(repoPath: string): Promise<string | null>;
  /** Create or update a file (chooses create vs update by existence). */
  putFile(repoPath: string, content: string, message: string): Promise<CommitResult>;
}

export interface GitHubWriterConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
  authorName?: string;
  authorEmail?: string;
}

/** UTF-8-safe base64 (German umlauts and guillemets must survive). */
function toBase64(s: string): string {
  return Buffer.from(s, "utf-8").toString("base64");
}

function encodeRepoPath(p: string): string {
  return p
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
}

/**
 * Defence in depth: the server validates the path before calling this, but the
 * writer is generic — reject traversal/empty segments here too so a future
 * caller can never escape the repo. encodeURIComponent does NOT neutralise "..".
 */
function assertSafeRepoPath(p: string): void {
  if (p.startsWith("/") || p.split("/").some((seg) => seg === "" || seg === "." || seg === "..")) {
    throw new Error(`Unsafe repo path rejected: "${p}".`);
  }
}

export function makeGitHubWriter(cfg: GitHubWriterConfig): WikiWriter {
  const base = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${cfg.token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "sandbox-knowledge-hub-write-mcp",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  async function getFileSha(repoPath: string): Promise<string | null> {
    assertSafeRepoPath(repoPath);
    const res = await fetch(`${base}/${encodeRepoPath(repoPath)}?ref=${encodeURIComponent(cfg.branch)}`, { headers });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`GitHub GET ${repoPath} failed: ${res.status} ${await safeText(res)}`);
    }
    const json = (await res.json()) as { sha?: string };
    return json.sha ?? null;
  }

  async function putFile(repoPath: string, content: string, message: string): Promise<CommitResult> {
    assertSafeRepoPath(repoPath);
    const sha = await getFileSha(repoPath);
    const body: Record<string, unknown> = {
      message,
      content: toBase64(content),
      branch: cfg.branch,
    };
    if (sha) body.sha = sha;
    if (cfg.authorName && cfg.authorEmail) {
      body.committer = { name: cfg.authorName, email: cfg.authorEmail };
    }
    const res = await fetch(`${base}/${encodeRepoPath(repoPath)}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`GitHub PUT ${repoPath} failed: ${res.status} ${await safeText(res)}`);
    }
    const json = (await res.json()) as {
      commit?: { html_url?: string };
      content?: { html_url?: string };
    };
    return {
      committed: true,
      path: repoPath,
      action: sha ? "updated" : "created",
      commitUrl: json.commit?.html_url,
      fileUrl: json.content?.html_url,
    };
  }

  return { repo: `${cfg.owner}/${cfg.repo}`, branch: cfg.branch, getFileSha, putFile };
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 300);
  } catch {
    return "(no body)";
  }
}

import { afterEach, describe, expect, it, vi } from "vitest";
import { makeGitHubWriter } from "../src/github-writer.js";

const cfg = { token: "tok_123", owner: "bowen-0", repo: "sandbox-knowledge-hub", branch: "main" };

function res(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

afterEach(() => vi.restoreAllMocks());

describe("makeGitHubWriter", () => {
  it("getFileSha returns null on 404", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => res(404, { message: "Not Found" })));
    const w = makeGitHubWriter(cfg);
    expect(await w.getFileSha("wiki/lessons/x.md")).toBeNull();
  });

  it("getFileSha returns the sha on 200", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => res(200, { sha: "abc123" })));
    const w = makeGitHubWriter(cfg);
    expect(await w.getFileSha("wiki/lessons/x.md")).toBe("abc123");
  });

  it("putFile creates (no sha) when the file is absent, with correct request shape", async () => {
    const fetchMock = vi.fn(async (url: string, opts?: RequestInit) => {
      if (!opts || opts.method !== "PUT") return res(404, { message: "Not Found" }); // getFileSha
      return res(201, { commit: { html_url: "https://github.com/c/1" }, content: { html_url: "https://github.com/f/1" } });
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const w = makeGitHubWriter(cfg);
    const r = await w.putFile("wiki/lessons/x.md", "# hi", "msg");
    expect(r.action).toBe("created");
    expect(r.commitUrl).toBe("https://github.com/c/1");

    const putCall = fetchMock.mock.calls.find((c) => (c[1] as RequestInit)?.method === "PUT")!;
    const url = putCall[0] as string;
    const body = JSON.parse((putCall[1] as RequestInit).body as string);
    expect(url).toContain("/repos/bowen-0/sandbox-knowledge-hub/contents/wiki/lessons/x.md");
    expect(body.branch).toBe("main");
    expect(body.sha).toBeUndefined(); // create → no sha
    const headers = (putCall[1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer tok_123");
  });

  it("putFile updates (includes sha) when the file exists", async () => {
    const fetchMock = vi.fn(async (_url: string, opts?: RequestInit) => {
      if (!opts || opts.method !== "PUT") return res(200, { sha: "old-sha" });
      return res(200, { commit: { html_url: "https://github.com/c/2" }, content: { html_url: "https://github.com/f/2" } });
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const w = makeGitHubWriter(cfg);
    const r = await w.putFile("wiki/lessons/x.md", "# hi", "msg");
    expect(r.action).toBe("updated");
    const putCall = fetchMock.mock.calls.find((c) => (c[1] as RequestInit)?.method === "PUT")!;
    const body = JSON.parse((putCall[1] as RequestInit).body as string);
    expect(body.sha).toBe("old-sha");
  });

  it("encodes content as UTF-8-safe base64 (German chars survive a round trip)", async () => {
    let captured = "";
    const fetchMock = vi.fn(async (_url: string, opts?: RequestInit) => {
      if (!opts || opts.method !== "PUT") return res(404, {});
      captured = JSON.parse((opts.body as string)).content;
      return res(201, { commit: {}, content: {} });
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const german = "Grüße «Bewilligung» — Datenqualität, klare Prozesse";
    await makeGitHubWriter(cfg).putFile("wiki/lessons/x.md", german, "m");
    expect(Buffer.from(captured, "base64").toString("utf-8")).toBe(german);
  });

  it("throws a descriptive error on a failed PUT", async () => {
    vi.stubGlobal("fetch", vi.fn(async (_url: string, opts?: RequestInit) =>
      !opts || opts.method !== "PUT" ? res(404, {}) : res(422, { message: "Invalid" })
    ) as unknown as typeof fetch);
    await expect(makeGitHubWriter(cfg).putFile("wiki/lessons/x.md", "x", "m")).rejects.toThrow(/422/);
  });
});

describe("makeGitHubWriter — delete path", () => {
  it("getFile decodes the Contents API's wrapped base64 and returns the blob sha", async () => {
    const content = Buffer.from("# Hallo\n\nGrüße «Bewilligung»\n", "utf-8").toString("base64");
    const wrapped = content.replace(/(.{20})/g, "$1\n"); // GitHub inserts line breaks
    vi.stubGlobal("fetch", vi.fn(async () => res(200, { sha: "blob1", type: "file", encoding: "base64", content: wrapped })));
    const f = await makeGitHubWriter(cfg).getFile("wiki/lessons/x.md");
    expect(f).toEqual({ sha: "blob1", content: "# Hallo\n\nGrüße «Bewilligung»\n" });
  });

  it("getFile returns null on 404", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => res(404, { message: "Not Found" })));
    expect(await makeGitHubWriter(cfg).getFile("wiki/lessons/x.md")).toBeNull();
  });

  it("deleteFile sends DELETE with the sha and branch, and returns the commit", async () => {
    const fetchMock = vi.fn(async () => res(200, { commit: { sha: "c1", html_url: "https://github.com/c/1" } }));
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
    const r = await makeGitHubWriter(cfg).deleteFile("wiki/lessons/x.md", "blob1", "bye");
    expect(r).toEqual({ deleted: true, path: "wiki/lessons/x.md", commitSha: "c1", commitUrl: "https://github.com/c/1" });
    const [url, opts] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(opts.method).toBe("DELETE");
    expect(url).toContain("/contents/wiki/lessons/x.md");
    const body = JSON.parse(opts.body as string);
    expect(body).toMatchObject({ message: "bye", sha: "blob1", branch: "main" });
  });

  it("deleteFile rejects a traversal path before any request", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
    await expect(makeGitHubWriter(cfg).deleteFile("wiki/../secrets", "s", "m")).rejects.toThrow(/Unsafe/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

/**
 * Server-side fetch of a report PDF from a public URL, so a new report's PDF
 * can be added to the repo without pushing its bytes through the chat agent
 * (a multi-MB base64 tool argument is impractical). The bytes are fetched and
 * committed server-side; the agent only supplies the URL.
 *
 * SSRF hardening (this is a server-side fetch of a caller-supplied URL):
 *   - https only;
 *   - the host is checked against a private/loopback/link-local block list,
 *     for IPv4 AND IPv6, on the initial URL AND on every redirect hop
 *     (redirects are followed manually so a public URL can't 30x into an
 *     internal host);
 *   - a request timeout, a response size cap, and a %PDF / content-type check.
 * (Cloudflare Workers also can't egress to private networks at the platform
 * level, so this is defence in depth.)
 */

const MAX_PDF_BYTES = 25 * 1024 * 1024; // 25 MB
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 30_000;

/** Block loopback / private / link-local / ULA hosts (IPv4 and IPv6). */
function isBlockedHost(hostname: string): boolean {
  let h = hostname.toLowerCase();
  if (h.startsWith("[") && h.endsWith("]")) h = h.slice(1, -1); // strip IPv6 brackets
  if (h === "localhost" || h === "0.0.0.0" || h === "::" || h === "::1") return true;
  if (h.endsWith(".local") || h.endsWith(".internal") || h.endsWith(".localhost")) return true;
  // IPv4 loopback / private / link-local
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  // IPv6 link-local fe80::/10 (fe80–febf), unique-local fc00::/7 (fc/fd),
  // IPv4-mapped ::ffff:a.b.c.d (could embed a private IPv4)
  if (/^fe[89ab]/.test(h) || /^f[cd]/.test(h) || h.startsWith("::ffff:")) return true;
  return false;
}

function validatedUrl(raw: string): URL {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    throw new Error(`Not a valid URL: "${raw}".`);
  }
  if (u.protocol !== "https:") throw new Error(`Only https:// URLs are allowed (got "${u.protocol}").`);
  if (isBlockedHost(u.hostname)) throw new Error(`Refusing to fetch an internal/private host "${u.hostname}".`);
  return u;
}

/** Fetch following redirects MANUALLY, re-validating the host at each hop. */
async function safeFetch(rawUrl: string): Promise<Response> {
  let target = validatedUrl(rawUrl);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const res = await fetch(target.toString(), {
      headers: { "User-Agent": "sandbox-knowledge-hub-write-mcp", Accept: "application/pdf" },
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) return res;
      target = validatedUrl(new URL(location, target).toString()); // re-validate the redirect target
      continue;
    }
    return res;
  }
  throw new Error(`Too many redirects (more than ${MAX_REDIRECTS}).`);
}

export async function fetchPdfBytes(url: string): Promise<Uint8Array> {
  const res = await safeFetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}.`);

  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.byteLength === 0) throw new Error("Fetched an empty response.");
  if (bytes.byteLength > MAX_PDF_BYTES) {
    throw new Error(`PDF is ${Math.round(bytes.byteLength / 1048576)} MB; the limit is ${MAX_PDF_BYTES / 1048576} MB.`);
  }
  const looksPdf = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46; // "%PDF"
  const ct = (res.headers.get("content-type") ?? "").toLowerCase();
  if (!looksPdf && !ct.includes("application/pdf")) {
    throw new Error(`That URL did not return a PDF (content-type "${ct || "unknown"}", no %PDF header).`);
  }
  return bytes;
}

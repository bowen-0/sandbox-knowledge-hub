/**
 * Server-side fetch of a report PDF from a public URL, so a new report's PDF
 * can be added to the repo without pushing its bytes through the chat agent
 * (a multi-MB base64 tool argument is impractical). The bytes are fetched and
 * committed server-side; the agent only supplies the URL.
 */

const MAX_PDF_BYTES = 25 * 1024 * 1024; // 25 MB — generous for a report

/** Block obvious internal/private hosts (defence in depth; Workers can't reach these anyway). */
function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h === "0.0.0.0" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  return false;
}

export async function fetchPdfBytes(url: string): Promise<Uint8Array> {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    throw new Error(`Not a valid URL: "${url}".`);
  }
  if (u.protocol !== "https:") throw new Error(`Only https:// URLs are allowed (got "${u.protocol}").`);
  if (isBlockedHost(u.hostname)) throw new Error(`Refusing to fetch an internal/private host "${u.hostname}".`);

  const res = await fetch(u.toString(), {
    headers: { "User-Agent": "sandbox-knowledge-hub-write-mcp", Accept: "application/pdf" },
    redirect: "follow",
  });
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

/**
 * One-time confirmation tokens for the two-call delete handshake.
 *
 * Call 1 of wiki_delete_page previews a page and returns a token bound to that
 * page's path and content SHA, with a short expiry. Call 2 must present the
 * token. The token is an HMAC-SHA256 over the claims, so the client cannot
 * forge or alter it; the round trip is what makes the preview step
 * unskippable, whatever "always allow" setting the client has.
 *
 * Web Crypto only (crypto.subtle), so this runs unchanged in Node and in a
 * Cloudflare Worker.
 */

export interface ConfirmationClaims {
  /** Wiki-relative page path, e.g. "lessons/foo.md". */
  path: string;
  /** Git blob SHA of the content that was previewed. */
  sha: string;
  /** Expiry, ms since epoch. */
  exp: number;
}

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64url");
}

async function sign(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return b64url(new Uint8Array(sig));
}

/** Length-then-XOR compare, so a wrong token costs the same time as a right one. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function mintConfirmation(secret: string, claims: ConfirmationClaims): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify(claims)));
  return `${payload}.${await sign(secret, payload)}`;
}

/** The claims a token carries, or null if it is malformed or its signature does not verify. */
export async function readConfirmation(secret: string, token: string): Promise<ConfirmationClaims | null> {
  const dot = token.indexOf(".");
  if (dot <= 0 || dot === token.length - 1) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!constantTimeEqual(sig, await sign(secret, payload))) return null;
  try {
    const c = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as Partial<ConfirmationClaims>;
    if (typeof c.path !== "string" || typeof c.sha !== "string" || typeof c.exp !== "number") return null;
    return { path: c.path, sha: c.sha, exp: c.exp };
  } catch {
    return null;
  }
}

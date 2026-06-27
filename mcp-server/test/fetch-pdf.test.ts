import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchPdfBytes } from "../src/fetch-pdf.js";

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37, 0x0a]); // "%PDF-1.7\n"

function pdfResponse(bytes: Uint8Array, contentType = "application/pdf"): Response {
  return new Response(bytes, { status: 200, headers: { "Content-Type": contentType } });
}

afterEach(() => vi.restoreAllMocks());

describe("fetchPdfBytes", () => {
  it("fetches a valid PDF (by %PDF magic bytes)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => pdfResponse(PDF_BYTES, "application/octet-stream")));
    const out = await fetchPdfBytes("https://www.zh.ch/report.pdf");
    expect(out.byteLength).toBe(PDF_BYTES.byteLength);
  });

  it("rejects non-https URLs", async () => {
    await expect(fetchPdfBytes("http://www.zh.ch/report.pdf")).rejects.toThrow(/https/);
  });

  it("rejects internal/private hosts (SSRF guard, IPv4 + IPv6)", async () => {
    await expect(fetchPdfBytes("https://169.254.169.254/latest")).rejects.toThrow(/internal|private/i);
    await expect(fetchPdfBytes("https://localhost/x.pdf")).rejects.toThrow(/internal|private/i);
    await expect(fetchPdfBytes("https://10.0.0.5/x.pdf")).rejects.toThrow(/internal|private/i);
    await expect(fetchPdfBytes("https://[::1]/x.pdf")).rejects.toThrow(/internal|private/i);
    await expect(fetchPdfBytes("https://[fe80::1]/x.pdf")).rejects.toThrow(/internal|private/i);
    await expect(fetchPdfBytes("https://[fd12:3456::1]/x.pdf")).rejects.toThrow(/internal|private/i);
  });

  it("blocks a redirect that points at an internal host", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.redirect("https://169.254.169.254/meta", 302)));
    await expect(fetchPdfBytes("https://www.zh.ch/redirector.pdf")).rejects.toThrow(/internal|private/i);
  });

  it("follows a redirect to an allowed host and returns the PDF", async () => {
    let n = 0;
    vi.stubGlobal("fetch", vi.fn(async () => {
      n++;
      return n === 1 ? Response.redirect("https://files.zh.ch/report.pdf", 302) : pdfResponse(PDF_BYTES);
    }));
    const out = await fetchPdfBytes("https://www.zh.ch/redirector.pdf");
    expect(out.byteLength).toBe(PDF_BYTES.byteLength);
  });

  it("rejects a response that is not a PDF", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(new Uint8Array([0x3c, 0x21]), { status: 200, headers: { "Content-Type": "text/html" } })));
    await expect(fetchPdfBytes("https://www.zh.ch/notapdf")).rejects.toThrow(/not return a PDF|not a PDF/i);
  });

  it("rejects an oversized PDF", async () => {
    const huge = new Uint8Array(26 * 1024 * 1024);
    huge.set(PDF_BYTES, 0);
    vi.stubGlobal("fetch", vi.fn(async () => pdfResponse(huge)));
    await expect(fetchPdfBytes("https://www.zh.ch/huge.pdf")).rejects.toThrow(/limit/);
  });

  it("surfaces a fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 404, statusText: "Not Found" })));
    await expect(fetchPdfBytes("https://www.zh.ch/missing.pdf")).rejects.toThrow(/404/);
  });
});

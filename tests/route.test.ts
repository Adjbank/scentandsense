import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

async function loadRoute() {
  vi.resetModules();
  return import("@/app/api/identify/route");
}

function post(body: unknown) {
  return new Request("http://localhost/api/identify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/identify", () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_AUTH_TOKEN;
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.restoreAllMocks();
  });

  it("returns 503 NO_API_KEY when no credentials are configured", async () => {
    const { POST } = await loadRoute();
    const res = await POST(post({ image: "x".repeat(200), mediaType: "image/jpeg" }));
    expect(res.status).toBe(503);
    expect((await res.json()).code).toBe("NO_API_KEY");
  });

  it("returns 400 on invalid body", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const { POST } = await loadRoute();
    const res = await POST(post({ image: "short", mediaType: "image/bmp" }));
    expect(res.status).toBe(400);
    expect((await res.json()).code).toBe("BAD_REQUEST");
  });

  it("returns 400 on malformed JSON", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const { POST } = await loadRoute();
    const res = await POST(post("{not json"));
    expect(res.status).toBe(400);
  });

  it("returns 413 when the image is too large", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    const { POST } = await loadRoute();
    const res = await POST(post({ image: "a".repeat(12 * 1024 * 1024), mediaType: "image/jpeg" }));
    expect(res.status).toBe(413);
  });

  it("merges a successful model result with the knowledge base", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    vi.doMock("@/lib/identify/claude", async (importOriginal) => {
      const mod = await importOriginal<typeof import("@/lib/identify/claude")>();
      return {
        ...mod,
        identifyWithClaude: vi.fn(async () => ({
          model: "claude-opus-5-5",
          result: {
            isPlant: true,
            observedFeatures: ["ใบเรียวยาว"],
            candidates: [{ scientificName: "Cymbopogon citratus", thaiName: "ตะไคร้", englishName: "Lemongrass", family: "Poaceae", confidence: 0.85, matchedSlug: "cymbopogon-citratus", reasoning: "ใบหญ้า" }],
            scentSummary: { th: "", en: "" },
            historySummary: { th: "", en: "" },
          },
        })),
      };
    });
    const { POST } = await loadRoute();
    const res = await POST(post({ image: "x".repeat(200), mediaType: "image/jpeg" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.candidates[0].inKnowledgeBase).toBe(true);
    expect(json.candidates[0].plant.compounds[0].name).toContain("citral");
  });

  it("maps a refusal to 422", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-test";
    vi.doMock("@/lib/identify/claude", async (importOriginal) => {
      const mod = await importOriginal<typeof import("@/lib/identify/claude")>();
      return { ...mod, identifyWithClaude: vi.fn(async () => { throw new mod.IdentifyRefusedError("general_harms"); }) };
    });
    const { POST } = await loadRoute();
    const res = await POST(post({ image: "x".repeat(200), mediaType: "image/png" }));
    expect(res.status).toBe(422);
  });
});

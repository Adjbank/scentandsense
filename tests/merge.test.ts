import { describe, expect, it } from "vitest";
import { mergeWithKnowledgeBase, resolvePlant } from "@/lib/identify/merge";
import { PLANTS } from "@/data/plants";
import type { VisionResult } from "@/lib/identify/schema";

const base: VisionResult = {
  isPlant: true,
  observedFeatures: ["ดอกสีขาวขนาดเล็ก", "ใบรูปไข่เป็นมัน"],
  candidates: [],
  scentSummary: { th: "", en: "" },
  historySummary: { th: "", en: "" },
};

describe("mergeWithKnowledgeBase", () => {
  it("attaches KB data when matchedSlug is known", () => {
    const r = mergeWithKnowledgeBase(
      { ...base, candidates: [{ scientificName: "Jasminum sambac", thaiName: "มะลิ", englishName: "Jasmine", family: "Oleaceae", confidence: 0.9, matchedSlug: "jasminum-sambac", reasoning: "ดอกขาว" }] },
      "test-model",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(true);
    expect(r.candidates[0].plant?.thaiName).toBe("มะลิลา");
    expect(r.scentSummary).toBeNull();
    expect(r.model).toBe("test-model");
  });

  it("falls back to scientific-name matching when slug is null or wrong", () => {
    const r = mergeWithKnowledgeBase(
      { ...base, candidates: [{ scientificName: "Cananga odorata", thaiName: "กระดังงา", englishName: "Ylang", family: "Annonaceae", confidence: 0.7, matchedSlug: "wrong-slug", reasoning: "" }] },
      "m",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(true);
    expect(r.candidates[0].matchedSlug).toBe("cananga-odorata");
  });

  it("keeps model summaries only when the top candidate is outside the KB", () => {
    const r = mergeWithKnowledgeBase(
      {
        ...base,
        candidates: [{ scientificName: "Hibiscus rosa-sinensis", thaiName: "ชบา", englishName: "Hibiscus", family: "Malvaceae", confidence: 0.8, matchedSlug: null, reasoning: "" }],
        scentSummary: { th: "แทบไม่มีกลิ่น", en: "nearly scentless" },
        historySummary: { th: "ดอกไม้ประจำมาเลเซีย", en: "national flower of Malaysia" },
      },
      "m",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(false);
    expect(r.candidates[0].plant).toBeNull();
    expect(r.scentSummary?.en).toBe("nearly scentless");
  });

  it("sorts candidates by confidence descending", () => {
    const r = mergeWithKnowledgeBase(
      {
        ...base,
        candidates: [
          { scientificName: "A b", thaiName: "", englishName: "", family: "", confidence: 0.2, matchedSlug: null, reasoning: "" },
          { scientificName: "C d", thaiName: "", englishName: "", family: "", confidence: 0.6, matchedSlug: null, reasoning: "" },
        ],
      },
      "m",
      PLANTS,
    );
    expect(r.candidates.map((c) => c.confidence)).toEqual([0.6, 0.2]);
  });

  it("resolvePlant matches genus-level names like 'Bambusa vulgaris' to the Bambusa entry", () => {
    const p = resolvePlant({ scientificName: "Bambusa vulgaris", thaiName: "", englishName: "", family: "", confidence: 0.5, matchedSlug: null, reasoning: "" }, undefined, PLANTS);
    expect(p?.slug).toBe("bambusa");
  });

  it("passes through non-plant photos", () => {
    const r = mergeWithKnowledgeBase({ ...base, isPlant: false }, "m", PLANTS);
    expect(r.isPlant).toBe(false);
    expect(r.candidates).toEqual([]);
  });
});

describe("normalizeSci", () => {
  it("strips hybrid signs, spp. and varieties", async () => {
    const { normalizeSci } = await import("@/lib/identify/merge");
    expect(normalizeSci("Magnolia × alba")).toBe("magnolia alba");
    expect(normalizeSci("Bambusa spp.")).toBe("bambusa");
    expect(normalizeSci("Camellia sinensis var. assamica")).toBe("camellia sinensis");
  });
});

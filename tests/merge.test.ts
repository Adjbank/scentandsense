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
      { ...base, candidates: [{ scientificName: "Alpinia galanga", thaiName: "ข่า", englishName: "Galangal", family: "Zingiberaceae", confidence: 0.9, matchedSlug: "alpinia-galanga", reasoning: "ใบคล้ายขิง" }] },
      "test-model",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(true);
    expect(r.candidates[0].plant?.thaiName).toBe("ข่า");
    expect(r.scentSummary).toBeNull();
    expect(r.model).toBe("test-model");
  });

  it("falls back to scientific-name matching when slug is null or wrong", () => {
    const r = mergeWithKnowledgeBase(
      { ...base, candidates: [{ scientificName: "Magnolia × alba", thaiName: "จำปี", englishName: "White champaca", family: "Magnoliaceae", confidence: 0.7, matchedSlug: "wrong-slug", reasoning: "" }] },
      "m",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(true);
    expect(r.candidates[0].matchedSlug).toBe("magnolia-alba");
  });

  it("keeps model summaries only when the top candidate is outside the KB", () => {
    const r = mergeWithKnowledgeBase(
      {
        ...base,
        candidates: [{ scientificName: "Nelumbo nucifera", thaiName: "บัวหลวง", englishName: "Sacred lotus", family: "Nelumbonaceae", confidence: 0.8, matchedSlug: null, reasoning: "" }],
        scentSummary: { th: "หอมอ่อนหวาน", en: "softly sweet" },
        historySummary: { th: "ดอกไม้แห่งพุทธศาสนา", en: "the flower of Buddhism" },
      },
      "m",
      PLANTS,
    );
    expect(r.candidates[0].inKnowledgeBase).toBe(false);
    expect(r.candidates[0].plant).toBeNull();
    expect(r.scentSummary?.en).toBe("softly sweet");
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

  it("resolvePlant matches synonyms written with the old genus name only via the slug, not by name", () => {
    const bySlug = resolvePlant({ scientificName: "Michelia alba", thaiName: "", englishName: "", family: "", confidence: 0.5, matchedSlug: "magnolia-alba", reasoning: "" }, undefined, PLANTS);
    expect(bySlug?.slug).toBe("magnolia-alba");
    const byName = resolvePlant({ scientificName: "Michelia alba", thaiName: "", englishName: "", family: "", confidence: 0.5, matchedSlug: null, reasoning: "" }, undefined, PLANTS);
    expect(byName).toBeNull();
  });

  it("resolvePlant matches a genus-level KB entry from a full binomial", () => {
    const fake = [{ ...PLANTS[0], slug: "genus-only", scientificName: "Bambusa spp." }];
    const p = resolvePlant({ scientificName: "Bambusa vulgaris", thaiName: "", englishName: "", family: "", confidence: 0.5, matchedSlug: null, reasoning: "" }, undefined, fake);
    expect(p?.slug).toBe("genus-only");
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

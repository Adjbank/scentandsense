import { z } from "zod";

/** ผลลัพธ์ที่ขอจาก Claude (structured output) */
export const CandidateSchema = z.object({
  scientificName: z.string().describe("Binomial name, e.g. Jasminum sambac"),
  thaiName: z.string().describe("Common Thai name"),
  englishName: z.string().describe("Common English name"),
  family: z.string().describe("Botanical family"),
  confidence: z.number().min(0).max(1).describe("0–1 confidence that this is the species in the photo"),
  matchedSlug: z.string().nullable().describe("Slug from the provided knowledge base if this candidate is one of those species, otherwise null"),
  reasoning: z.string().describe("Visible features that support this identification, in Thai"),
});

export const VisionResultSchema = z.object({
  isPlant: z.boolean().describe("Whether the photo clearly shows a plant"),
  observedFeatures: z.array(z.string()).describe("Short Thai phrases describing visible leaf/flower/bark/habit features"),
  candidates: z.array(CandidateSchema).max(3).describe("Up to 3 candidates, most likely first"),
  /** สำหรับพืชที่ไม่อยู่ในฐานข้อมูล */
  scentSummary: z.object({ th: z.string(), en: z.string() }).describe("Scent character of the top candidate if NOT in the knowledge base; empty strings otherwise"),
  historySummary: z.object({ th: z.string(), en: z.string() }).describe("Brief cultural/historical note on the top candidate if NOT in the knowledge base; empty strings otherwise"),
});

export type Candidate = z.infer<typeof CandidateSchema>;
export type VisionResult = z.infer<typeof VisionResultSchema>;

/** Body ที่ client ส่งมา */
export const IdentifyRequestSchema = z.object({
  image: z.string().min(100).describe("base64 image data without the data: prefix"),
  mediaType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
});
export type IdentifyRequest = z.infer<typeof IdentifyRequestSchema>;

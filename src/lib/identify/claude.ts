import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { PLANTS } from "@/data/plants";
import { VisionResultSchema, type IdentifyRequest, type VisionResult } from "./schema";

export const MODEL = "claude-opus-5-5";

/** system prompt คงที่ (cache-able) — รายการพืชใน KB ให้โมเดลเลือก slug */
export function buildSystemPrompt(): string {
  const list = PLANTS.map((p) => `- ${p.slug} | ${p.scientificName} | ${p.thaiName} | ${p.englishName} | ${p.family}`).join("\n");
  return [
    "You are a field botanist and perfumer helping visitors on a Shinrin-Yoku (forest bathing) walk at Rai Cherntawan International Meditation Centre, Huai Sak, Chiang Rai, Northern Thailand (elevation ~400 m, tropical savanna climate, Lanna cultural region).",
    "Identify the plant in the photo. Prefer species that occur in Northern Thailand. Be honest about uncertainty: use confidence below 0.5 when leaves alone are ambiguous.",
    "If a candidate is one of the knowledge-base species below, set matchedSlug to that slug exactly. Otherwise set matchedSlug to null and fill scentSummary and historySummary (Thai and English, 2–3 sentences each) for the top candidate only. When the top candidate IS in the knowledge base, leave scentSummary and historySummary as empty strings.",
    "Write thaiName, reasoning and observedFeatures in Thai. If the photo does not clearly show a plant, set isPlant=false and return an empty candidates list.",
    "",
    "Knowledge base (slug | scientific name | Thai | English | family):",
    list,
  ].join("\n");
}

export class IdentifyRefusedError extends Error {
  constructor(public readonly category: string | null) {
    super("model refused");
  }
}
export class IdentifyParseError extends Error {}

export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

export async function identifyWithClaude(req: IdentifyRequest, client: Anthropic = new Anthropic()): Promise<{ result: VisionResult; model: string }> {
  const response = await client.beta.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    output_config: { effort: "medium", format: zodOutputFormat(VisionResultSchema) },
    // ค่าเริ่มต้น: ถ้าโมเดลปฏิเสธด้วยเหตุผลนโยบาย ให้เซิร์ฟเวอร์ลองโมเดลสำรองให้อัตโนมัติ
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: buildSystemPrompt(), cache_control: { type: "ephemeral" } }],
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: req.mediaType, data: req.image } },
          { type: "text", text: "ระบุพืชในภาพนี้ตามรูปแบบที่กำหนด" },
        ],
      },
    ],
  });

  if (response.stop_reason === "refusal") {
    throw new IdentifyRefusedError(response.stop_details?.category ?? null);
  }
  const parsed = response.parsed_output;
  if (!parsed) throw new IdentifyParseError("empty parsed_output");
  const checked = VisionResultSchema.safeParse(parsed);
  if (!checked.success) throw new IdentifyParseError(checked.error.message);
  return { result: checked.data, model: response.model };
}

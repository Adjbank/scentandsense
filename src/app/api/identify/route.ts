import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { PLANTS } from "@/data/plants";
import { IdentifyRequestSchema } from "@/lib/identify/schema";
import { mergeWithKnowledgeBase } from "@/lib/identify/merge";
import { hasApiKey, identifyWithClaude, IdentifyParseError, IdentifyRefusedError, MODEL } from "@/lib/identify/claude";

export const maxDuration = 60;

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/** สถานะความพร้อม — บอกเพียงว่าตั้งคีย์แล้วหรือยัง ไม่เปิดเผยค่าคีย์ */
export async function GET() {
  return NextResponse.json({ ready: hasApiKey(), model: MODEL }, { headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  if (!hasApiKey()) {
    return NextResponse.json({ code: "NO_API_KEY", message: "ANTHROPIC_API_KEY is not configured on the server" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "BAD_JSON" }, { status: 400 });
  }
  const parsed = IdentifyRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: "BAD_REQUEST", issues: parsed.error.issues }, { status: 400 });
  }
  // base64 → ~3/4 bytes
  if (parsed.data.image.length * 0.75 > MAX_IMAGE_BYTES) {
    return NextResponse.json({ code: "TOO_LARGE" }, { status: 413 });
  }

  try {
    const { result, model } = await identifyWithClaude(parsed.data);
    return NextResponse.json(mergeWithKnowledgeBase(result, model, PLANTS));
  } catch (err) {
    if (err instanceof IdentifyRefusedError) {
      return NextResponse.json({ code: "REFUSED", category: err.category }, { status: 422 });
    }
    if (err instanceof IdentifyParseError) {
      return NextResponse.json({ code: "BAD_MODEL_OUTPUT", message: err.message }, { status: 502 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ code: "BAD_API_KEY" }, { status: 503 });
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return NextResponse.json({ code: "UPSTREAM_UNREACHABLE" }, { status: 502 });
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ code: "UPSTREAM_ERROR", status: err.status }, { status: 502 });
    }
    console.error("identify failed", err);
    return NextResponse.json({ code: "INTERNAL" }, { status: 500 });
  }
}

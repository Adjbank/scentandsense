"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";
import { fileToResizedBase64 } from "@/lib/image";
import { createLocalStore } from "@/lib/local-store";
import type { IdentifyResult } from "@/lib/identify/merge";
import { PlantDetail, ScentChips } from "./PlantBits";

type Status = { kind: "idle" } | { kind: "busy" } | { kind: "result"; result: IdentifyResult } | { kind: "error"; code: string };

interface RecentScan {
  at: number;
  thaiName: string;
  englishName: string;
  scientificName: string;
  slug: string | null;
  confidence: number;
}

const MAX_FILE = 8 * 1024 * 1024;
const EMPTY: RecentScan[] = [];
const recentStore = createLocalStore<RecentScan[]>("sy-recent-scans", EMPTY, (raw) => {
  const v = JSON.parse(raw);
  return Array.isArray(v) ? v : EMPTY;
});

export function IdentifyClient() {
  const { lang } = useLang();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preview, setPreview] = useState<string | null>(null);
  const recent = recentStore.use();
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_FILE) {
      setStatus({ kind: "error", code: "TOO_LARGE" });
      return;
    }
    setStatus({ kind: "busy" });
    try {
      const { base64, mediaType, previewUrl } = await fileToResizedBase64(file);
      setPreview(previewUrl);
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({ kind: "error", code: body.code ?? `HTTP_${res.status}` });
        return;
      }
      const result = (await res.json()) as IdentifyResult;
      setStatus({ kind: "result", result });
      const top = result.candidates[0];
      if (result.isPlant && top) {
        const entry: RecentScan = { at: Date.now(), thaiName: top.thaiName, englishName: top.englishName, scientificName: top.scientificName, slug: top.plant?.slug ?? null, confidence: top.confidence };
        recentStore.set([entry, ...recentStore.read()].slice(0, 20));
      }
    } catch (err) {
      console.error(err);
      setStatus({ kind: "error", code: "NETWORK" });
    }
  }

  function reset() {
    setStatus({ kind: "idle" });
    setPreview(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (libraryRef.current) libraryRef.current.value = "";
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-forest">{t(UI.identify.title, lang)}</h1>
      <p className="text-sm text-ink/70">{t(UI.identify.hint, lang)}</p>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      <input ref={libraryRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />

      {status.kind === "idle" && (
        <div className="flex flex-col gap-3">
          <button type="button" className="btn-primary text-lg" onClick={() => cameraRef.current?.click()}>
            📷 {t(UI.identify.takePhoto, lang)}
          </button>
          <button type="button" className="btn-secondary" onClick={() => libraryRef.current?.click()}>
            🖼️ {t(UI.identify.choosePhoto, lang)}
          </button>
        </div>
      )}

      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="" className="mx-auto max-h-72 rounded-2xl object-contain shadow" />
      )}

      {status.kind === "busy" && (
        <div className="card flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-moss border-t-transparent" aria-hidden />
          <span className="text-sm">{t(UI.identify.analyzing, lang)}</span>
        </div>
      )}

      {status.kind === "error" && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            {status.code === "NO_API_KEY" || status.code === "BAD_API_KEY"
              ? t(UI.identify.noKey, lang)
              : status.code === "REFUSED"
                ? t(UI.identify.refused, lang)
                : status.code === "TOO_LARGE"
                  ? t(UI.identify.tooLarge, lang)
                  : `${t(UI.identify.error, lang)} (${status.code})`}
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-secondary" onClick={reset}>
              {t(UI.identify.retake, lang)}
            </button>
            <Link href="/plants" className="btn-secondary">
              🌿 {t(UI.nav.plants, lang)}
            </Link>
          </div>
        </div>
      )}

      {status.kind === "result" && <ResultView result={status.result} onReset={reset} />}

      {status.kind === "idle" && recent.length > 0 && (
        <section>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-forest">{t(UI.identify.recent, lang)}</h2>
            <button
              type="button"
              className="text-xs text-ink/60 underline"
              onClick={() => recentStore.set(EMPTY)}
            >
              {t(UI.identify.clearRecent, lang)}
            </button>
          </div>
          <ul className="divide-y divide-moss/10 rounded-2xl border border-moss/15 bg-white/70 text-sm">
            {recent.map((r) => (
              <li key={r.at} className="flex items-center justify-between px-3 py-2">
                <span>
                  {r.slug ? (
                    <Link href={`/plants/${r.slug}`} className="font-medium text-forest underline">
                      {lang === "th" ? r.thaiName : r.englishName}
                    </Link>
                  ) : (
                    <span className="font-medium">{lang === "th" ? r.thaiName : r.englishName}</span>
                  )}{" "}
                  <span className="italic text-ink/60">{r.scientificName}</span>
                </span>
                <span className="tabular-nums text-ink/60">{Math.round(r.confidence * 100)}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  const { lang } = useLang();
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2 text-xs text-ink/70">
      <span>{t(UI.identify.confidence, lang)}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-moss/15" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-moss" style={{ width: `${pct}%` }} />
      </div>
      <span className="tabular-nums font-medium">{pct}%</span>
    </div>
  );
}

function ResultView({ result, onReset }: { result: IdentifyResult; onReset: () => void }) {
  const { lang } = useLang();
  const top = result.candidates[0];

  if (!result.isPlant || !top) {
    return (
      <div className="space-y-3">
        <div className="card text-sm">{t(UI.identify.notPlant, lang)}</div>
        <button type="button" className="btn-secondary" onClick={onReset}>
          {t(UI.identify.retake, lang)}
        </button>
      </div>
    );
  }

  const others = result.candidates.slice(1);
  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-forest to-moss p-5 text-paper shadow-lg">
        <h2 className="text-2xl font-bold">{lang === "th" ? top.thaiName : top.englishName}</h2>
        <p className="text-paper/90">{lang === "th" ? top.englishName : top.thaiName}</p>
        <p className="italic text-paper/80">
          {top.scientificName} · {top.family}
        </p>
        <div className="mt-3 rounded-xl bg-paper/15 p-2">
          <ConfidenceBar value={top.confidence} />
        </div>
        {top.reasoning && <p className="mt-3 text-sm text-paper/90">{top.reasoning}</p>}
        <p className="mt-3 text-xs text-leaf">{top.inKnowledgeBase ? `✅ ${t(UI.identify.inKb, lang)}` : `⚠️ ${t(UI.identify.notInKb, lang)}`}</p>
      </section>

      {result.observedFeatures.length > 0 && (
        <section className="card">
          <h3 className="mb-1 text-sm font-semibold text-forest">{t(UI.identify.observed, lang)}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {result.observedFeatures.map((f) => (
              <li key={f} className="chip">
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {top.plant ? (
        <>
          <ScentChips families={top.plant.scentFamilies} />
          <PlantDetail plant={top.plant} compact />
          <Link href={`/plants/${top.plant.slug}`} className="btn-secondary w-full">
            {t(UI.identify.openEntry, lang)} →
          </Link>
        </>
      ) : (
        <>
          {result.scentSummary && (
            <section className="card">
              <h3 className="mb-1 font-semibold text-forest">{t(UI.identify.scent, lang)}</h3>
              <p className="text-sm leading-relaxed">{t(result.scentSummary, lang)}</p>
            </section>
          )}
          {result.historySummary && (
            <section className="card">
              <h3 className="mb-1 font-semibold text-forest">{t(UI.identify.history, lang)}</h3>
              <p className="text-sm leading-relaxed">{t(result.historySummary, lang)}</p>
            </section>
          )}
        </>
      )}

      {others.length > 0 && (
        <section className="card">
          <h3 className="mb-2 text-sm font-semibold text-forest">{t(UI.identify.otherCandidates, lang)}</h3>
          <ul className="space-y-2 text-sm">
            {others.map((c) => (
              <li key={c.scientificName} className="flex items-center justify-between gap-3">
                <span>
                  {c.plant ? (
                    <Link href={`/plants/${c.plant.slug}`} className="font-medium text-forest underline">
                      {lang === "th" ? c.thaiName : c.englishName}
                    </Link>
                  ) : (
                    <span className="font-medium">{lang === "th" ? c.thaiName : c.englishName}</span>
                  )}{" "}
                  <span className="italic text-ink/60">{c.scientificName}</span>
                </span>
                <span className="tabular-nums text-ink/60">{Math.round(c.confidence * 100)}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs text-ink/50">
        {t(UI.identify.poweredBy, lang)} {result.model}
      </p>
      <button type="button" className="btn-secondary w-full" onClick={onReset}>
        📷 {t(UI.identify.retake, lang)}
      </button>
    </div>
  );
}

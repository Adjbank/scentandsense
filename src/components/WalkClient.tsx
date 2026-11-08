"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STATIONS } from "@/data/walk";
import { getPlant } from "@/data/plants";
import { UI, t } from "@/lib/i18n";
import { useLang } from "@/lib/lang-context";

type Phase = "inhale" | "hold" | "exhale";
const PHASES: { phase: Phase; seconds: number }[] = [
  { phase: "inhale", seconds: 4 },
  { phase: "hold", seconds: 7 },
  { phase: "exhale", seconds: 8 },
];

function BreathTimer() {
  const { lang } = useLang();
  const [running, setRunning] = useState(false);
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(PHASES[0].seconds);
  const [round, setRound] = useState(1);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((l) => {
        if (l > 1) return l - 1;
        const next = (idx + 1) % PHASES.length;
        if (next === 0) {
          setRound((r) => {
            if (r >= 4) {
              setRunning(false);
              return 1;
            }
            return r + 1;
          });
        }
        setIdx(next);
        return PHASES[next].seconds;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, idx]);

  const label = {
    inhale: UI.walk.inhale,
    hold: UI.walk.hold,
    exhale: UI.walk.exhale,
  }[PHASES[idx].phase];
  const scale =
    PHASES[idx].phase === "inhale"
      ? 1.25
      : PHASES[idx].phase === "exhale"
        ? 0.85
        : 1.1;

  return (
    <div className="card flex flex-col items-center gap-3 text-center">
      <h3 className="font-semibold text-forest">{t(UI.walk.breathe, lang)}</h3>
      <p className="text-xs text-ink/60">{t(UI.walk.breatheHint, lang)}</p>
      <div
        className="flex h-32 w-32 items-center justify-center rounded-full bg-leaf/50 text-forest transition-transform duration-1000 ease-in-out"
        style={{ transform: `scale(${running ? scale : 1})` }}
        aria-live="polite"
      >
        <div>
          <div className="text-sm font-medium">
            {running ? t(label, lang) : "—"}
          </div>
          <div className="text-3xl font-bold tabular-nums">
            {running ? left : ""}
          </div>
        </div>
      </div>
      <p className="text-xs text-ink/60">{running ? `${round}/4` : ""}</p>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => {
          if (running) {
            setRunning(false);
            return;
          }
          setIdx(0);
          setLeft(PHASES[0].seconds);
          setRound(1);
          setRunning(true);
        }}
      >
        {running ? "⏸" : "▶"} {t(UI.walk.start, lang)}
      </button>
    </div>
  );
}

export function WalkClient() {
  const { lang } = useLang();
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 stations, n = done
  const total = STATIONS.length;
  const totalMinutes = STATIONS.reduce((s, st) => s + st.minutes, 0);

  if (step === -1) {
    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-forest">
          {t(UI.walk.title, lang)}
        </h1>
        <p className="text-sm text-ink/80">{t(UI.walk.intro, lang)}</p>
        <ol className="space-y-2">
          {STATIONS.map((s) => (
            <li key={s.id} className="card flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {s.icon}
              </span>
              <div className="flex-1">
                <div className="font-medium text-forest">
                  {s.id}. {t(s.title, lang)}
                </div>
                <div className="text-xs text-ink/60">
                  {t(s.sense, lang)} · {s.minutes} min
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs text-ink/60">≈ {totalMinutes} min</p>
        <button
          type="button"
          className="btn-primary w-full text-lg"
          onClick={() => setStep(0)}
        >
          ▶ {t(UI.walk.start, lang)}
        </button>
      </div>
    );
  }

  if (step >= total) {
    return (
      <div className="space-y-5 text-center">
        <div className="text-6xl" aria-hidden>
          🍃
        </div>
        <p className="text-lg text-forest">{t(UI.walk.done, lang)}</p>
        <Link href="/identify" className="btn-primary">
          📷 {t(UI.nav.identify, lang)}
        </Link>
        <div>
          <button
            type="button"
            className="text-sm text-ink/60 underline"
            onClick={() => setStep(-1)}
          >
            ↺
          </button>
        </div>
      </div>
    );
  }

  const s = STATIONS[step];
  const plants = s.plantSlugs.map(getPlant).filter((p) => p !== undefined);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs text-ink/60">
        <span>
          {step + 1} / {total}
        </span>
        <span>
          {t(s.sense, lang)} · {s.minutes} min
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-moss/15">
        <div
          className="h-full bg-moss transition-all"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>
      <h1 className="text-2xl font-bold text-forest">
        {s.icon} {t(s.title, lang)}
      </h1>
      <p className="text-base leading-relaxed">{t(s.practice, lang)}</p>

      {step === 0 && <BreathTimer />}

      <section>
        <h2 className="mb-2 text-sm font-semibold text-forest">
          {t(UI.walk.plantsHere, lang)}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {plants.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/plants/${p.slug}`}
                className="chip hover:bg-leaf/60"
              >
                {lang === "th" ? p.thaiName : p.englishName}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex gap-2">
        <button
          type="button"
          className="btn-secondary flex-1"
          onClick={() => setStep(step - 1)}
        >
          ← {t(UI.walk.prev, lang)}
        </button>
        <button
          type="button"
          className="btn-primary flex-1"
          onClick={() => setStep(step + 1)}
        >
          {step === total - 1 ? t(UI.walk.finish, lang) : t(UI.walk.next, lang)}{" "}
          →
        </button>
      </div>
    </div>
  );
}

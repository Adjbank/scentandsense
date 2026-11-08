"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  EVIDENCE,
  MODE_LABEL,
  cueAt,
  getSession,
  getStory,
} from "@/data/mindful";
import { getPlant } from "@/data/plants";
import { AmbientPlayer, type Ambient } from "@/lib/ambient";
import { t } from "@/lib/i18n";
import { logSession } from "@/lib/journal";
import { useLang } from "@/lib/lang-context";

const SOUNDS: {
  id: Ambient;
  icon: string;
  label: { th: string; en: string };
}[] = [
  { id: "silence", icon: "○", label: { th: "เงียบ", en: "Silence" } },
  { id: "bell", icon: "🔔", label: { th: "ระฆัง", en: "Bell" } },
  { id: "wind", icon: "🍃", label: { th: "ลมป่า", en: "Wind" } },
  { id: "rain", icon: "🌧", label: { th: "ฝน", en: "Rain" } },
];

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function SessionPlayer({ id }: { id: string }) {
  const { lang } = useLang();
  const session = getSession(id)!;
  const total = session.minutes * 60;
  const plant = session.plantSlug ? getPlant(session.plantSlug) : undefined;
  const story = session.plantSlug ? getStory(session.plantSlug) : undefined;

  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [sound, setSound] = useState<Ambient>("bell");
  const player = useRef<AmbientPlayer | null>(null);
  const lastCue = useRef(-1);
  const startedAt = useRef(0);

  const audio = useCallback(() => (player.current ??= new AmbientPlayer()), []);

  useEffect(() => () => player.current?.close(), []);

  useEffect(() => {
    if (!running) return;
    const iv = window.setInterval(() => {
      const e = Math.min(total, (performance.now() - startedAt.current) / 1000);
      setElapsed(e);
      // ระฆังเบาๆ เมื่อเข้าสู่คำแนะนำใหม่
      const idx = session.cues.filter((c) => e / total >= c.at).length - 1;
      if (idx !== lastCue.current) {
        if (lastCue.current >= 0 && sound !== "silence") audio().bell(0.12);
        lastCue.current = idx;
      }
      if (e >= total) {
        window.clearInterval(iv);
        setRunning(false);
        setDone(true);
        audio().stop();
        if (sound !== "silence") audio().bell(0.3);
        logSession(session.id, session.minutes);
      }
    }, 250);
    return () => window.clearInterval(iv);
  }, [running, total, session, sound, audio]);

  function toggle() {
    if (done) return;
    if (running) {
      setRunning(false);
      audio().stop();
      return;
    }
    if (elapsed === 0 && sound !== "silence") audio().bell(0.3);
    startedAt.current = performance.now() - elapsed * 1000;
    audio().start(sound);
    setRunning(true);
  }

  function pickSound(s: Ambient) {
    setSound(s);
    if (running) audio().start(s);
    if (s === "bell") audio().bell(0.15);
  }

  function end() {
    setRunning(false);
    audio().stop();
    if (elapsed >= 60) logSession(session.id, Math.round(elapsed / 60));
    setDone(true);
  }

  const progress = elapsed / total;
  const R = 92;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative -mx-4 -my-5 min-h-[calc(100dvh-3.5rem)] overflow-hidden md:mx-auto md:my-0 md:max-w-md md:rounded-[2rem] md:shadow-xl">
      <Image
        src={session.image}
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 448px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-cream/95" />
      <div className="relative flex min-h-[calc(100dvh-3.5rem)] flex-col px-6 pb-28 pt-6 md:pb-8">
        <div className="flex items-center justify-between text-white">
          <Link
            href="/meditate"
            aria-label="Back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur"
          >
            ←
          </Link>
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
            {MODE_LABEL[session.mode].icon} {t(MODE_LABEL[session.mode], lang)}
          </span>
        </div>

        <h1 className="mt-6 max-w-[16rem] font-serif text-4xl font-semibold leading-tight text-white drop-shadow">
          {t(session.title, lang)}
        </h1>
        <p className="mt-2 text-sm text-white/90 drop-shadow">
          {t(session.subtitle, lang)}
        </p>

        <div className="mt-auto flex flex-col items-center">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-cream/85 shadow-lg backdrop-blur">
            <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
              <circle
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke="#e7e2d6"
                strokeWidth="8"
              />
              <circle
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke="var(--forest)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                className="transition-[stroke-dashoffset] duration-300"
              />
            </svg>
            <button
              type="button"
              onClick={toggle}
              className="relative flex flex-col items-center"
              aria-label={running ? "Pause" : "Play"}
            >
              <span className="text-3xl text-forest">
                {done ? "✓" : running ? "❚❚" : "▶"}
              </span>
              <span className="mt-1 font-serif text-3xl font-semibold tabular-nums text-forest">
                {fmt(Math.max(0, total - elapsed))}
              </span>
              <span className="text-xs text-ink/60">
                {done
                  ? lang === "th"
                    ? "จบแล้ว"
                    : "Complete"
                  : t(session.subtitle, lang).split("·")[1]?.trim()}
              </span>
            </button>
          </div>

          <p
            className="mt-6 min-h-[3.5rem] max-w-sm text-center text-base leading-relaxed text-ink"
            aria-live="polite"
          >
            {done
              ? lang === "th"
                ? "ขอให้ใจเบาเหมือนดอกไม้ในทุ่ง 🌼"
                : "May your mind be as light as a meadow flower 🌼"
              : t(cueAt(session, progress), lang)}
          </p>

          <div className="mt-5 w-full rounded-3xl bg-cream/95 p-3 shadow-md">
            <div className="grid grid-cols-4 gap-2">
              {SOUNDS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => pickSound(s.id)}
                  className={`flex flex-col items-center gap-1 rounded-2xl py-2 text-xs ${sound === s.id ? "bg-white text-forest shadow-sm" : "text-ink/60"}`}
                >
                  <span className="text-lg">{s.icon}</span>
                  {t(s.label, lang)}
                </button>
              ))}
            </div>
            {done ? (
              <Link
                href="/"
                className="mt-3 flex w-full items-center justify-center rounded-full bg-forest py-3 font-medium text-paper"
              >
                {lang === "th" ? "กลับหน้าแรก" : "Back home"}
              </Link>
            ) : (
              <button
                type="button"
                onClick={end}
                className="mt-3 w-full rounded-full bg-forest py-3 font-medium text-paper"
              >
                {lang === "th" ? "จบการนั่ง" : "End session"}
              </button>
            )}
          </div>

          {plant && story && (
            <Link
              href={`/plants/${plant.slug}`}
              className="mt-4 w-full rounded-3xl bg-cream/95 p-4 text-left shadow-md"
            >
              <div className="text-xs text-moss">
                {lang === "th" ? "พืชคู่สมาธิ" : "Companion plant"} ·{" "}
                {lang === "th" ? "ป้าย" : "Sign"} {plant.signNo}
              </div>
              <div className="font-serif text-lg font-semibold text-forest">
                {lang === "th" ? plant.thaiName : plant.englishName}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink/80">
                {t(story.story, lang)}
              </p>
              <p className="mt-2 text-[11px] text-ink/55">
                {story.evidence
                  .map(
                    (e) =>
                      `${EVIDENCE[e].source.authors?.split(",")[0]} ${EVIDENCE[e].source.year}`,
                  )
                  .join(" · ")}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

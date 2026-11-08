"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MODE_LABEL, SESSIONS, type Mode } from "@/data/mindful";
import { getPlant } from "@/data/plants";
import { t } from "@/lib/i18n";
import { dayKey, sessionStore, streak } from "@/lib/journal";
import { useLang } from "@/lib/lang-context";
import { useNow } from "@/lib/use-now";

const FALLBACK = new Date(2026, 0, 1, 9);

const MODES: (Mode | "all")[] = ["all", "focus", "calm", "ground"];

export function WeekStrip() {
  const { lang } = useLang();
  const logs = sessionStore.use();
  const today = useNow() ?? FALLBACK;
  const days = useMemo(() => {
    const done = new Set(logs.map((l) => dayKey(new Date(l.at))));
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i - 2);
      return { d, key: dayKey(d), done: done.has(dayKey(d)) };
    });
  }, [logs, today]);
  const fmt = new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    weekday: "short",
  });
  return (
    <div className="grid grid-cols-5 gap-2">
      {days.map(({ d, key, done }) => {
        const isToday = key === dayKey(today);
        return (
          <div
            key={key}
            className={`flex flex-col items-center rounded-2xl py-2 text-xs ${isToday ? "bg-forest text-paper shadow" : "bg-cream text-ink/70"}`}
          >
            <span>{fmt.format(d)}</span>
            <span className="font-serif text-lg font-semibold">
              {String(d.getDate()).padStart(2, "0")}
            </span>
            <span
              className={`mt-0.5 h-1.5 w-1.5 rounded-full ${done ? (isToday ? "bg-sun" : "bg-moss") : "bg-transparent"}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export function MeditateList() {
  const { lang } = useLang();
  const [mode, setMode] = useState<Mode | "all">("all");
  const logs = sessionStore.use();
  const now = useNow();
  const list = SESSIONS.filter((s) => mode === "all" || s.mode === mode);
  const minutes = logs.reduce((a, l) => a + l.minutes, 0);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-[2rem] bg-forest p-6 text-paper">
        <p className="text-sm text-paper/70">
          {lang === "th" ? "วันนี้" : "Today"}
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold leading-tight">
          {lang === "th"
            ? "กลับมาอยู่กับสิ่งที่สำคัญ"
            : "Focus on what matters."}
        </h1>
        <p className="mt-1 text-sm text-paper/70">
          {new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(now ?? FALLBACK)}
        </p>
        <div className="mt-5 text-ink">
          <WeekStrip />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <Stat
            n={logs.length}
            label={lang === "th" ? "ครั้งที่นั่ง" : "Sessions"}
          />
          <Stat n={minutes} label={lang === "th" ? "นาทีรวม" : "Minutes"} />
          <Stat
            n={now ? streak(logs, now) : 0}
            label={lang === "th" ? "วันติดกัน" : "Day streak"}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`chip ${mode === m ? "!bg-forest !text-paper" : ""}`}
          >
            {m === "all"
              ? lang === "th"
                ? "ทั้งหมด"
                : "All"
              : `${MODE_LABEL[m].icon} ${t(MODE_LABEL[m], lang)}`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {list.map((s) => {
          const plant = s.plantSlug ? getPlant(s.plantSlug) : undefined;
          return (
            <Link
              key={s.id}
              href={`/meditate/${s.id}`}
              className="group relative overflow-hidden rounded-3xl shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="text-xs opacity-90">
                  {MODE_LABEL[s.mode].icon} {t(MODE_LABEL[s.mode], lang)} ·{" "}
                  {s.minutes} {lang === "th" ? "นาที" : "min"}
                </div>
                <div className="font-serif text-xl font-semibold">
                  {t(s.title, lang)}
                </div>
                {plant && (
                  <div className="text-xs opacity-90">
                    🌿 {lang === "th" ? plant.thaiName : plant.englishName} ·{" "}
                    {lang === "th" ? "ป้าย" : "Sign"} {plant.signNo}
                  </div>
                )}
              </div>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-forest">
                ▶
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-2xl bg-paper/10 py-2">
      <div className="font-serif text-xl font-semibold tabular-nums">{n}</div>
      <div className="text-paper/70">{label}</div>
    </div>
  );
}

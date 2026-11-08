"use client";

import { createLocalStore } from "./local-store";

export interface SessionLog {
  id: string;
  at: number;
  minutes: number;
}

export type Mood = 1 | 2 | 3 | 4 | 5;
export interface MoodLog {
  day: string; // YYYY-MM-DD (เวลาท้องถิ่น)
  mood: Mood;
}

const EMPTY_S: SessionLog[] = [];
const EMPTY_M: MoodLog[] = [];

const arr = <T,>(raw: string, empty: T[]): T[] => {
  const v = JSON.parse(raw);
  return Array.isArray(v) ? (v as T[]) : empty;
};

export const sessionStore = createLocalStore<SessionLog[]>("sy-sessions", EMPTY_S, (r) => arr(r, EMPTY_S));
export const moodStore = createLocalStore<MoodLog[]>("sy-moods", EMPTY_M, (r) => arr(r, EMPTY_M));

export function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function logSession(id: string, minutes: number) {
  sessionStore.set([...sessionStore.read(), { id, at: Date.now(), minutes }].slice(-500));
}

export function setMood(mood: Mood, now = new Date()) {
  const day = dayKey(now);
  moodStore.set([...moodStore.read().filter((m) => m.day !== day), { day, mood }].slice(-400));
}

/** จำนวนวันติดต่อกันที่มีการนั่ง (นับถึงวันนี้หรือเมื่อวาน) */
export function streak(logs: SessionLog[], now = new Date()): number {
  const days = new Set(logs.map((l) => dayKey(new Date(l.at))));
  const cursor = new Date(now);
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(cursor))) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

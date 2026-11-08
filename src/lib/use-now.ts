"use client";

import { useSyncExternalStore } from "react";

/**
 * เวลาปัจจุบันฝั่ง client เท่านั้น (คืน null ระหว่าง prerender บนเซิร์ฟเวอร์)
 * เพื่อไม่ให้หน้าที่ prerender แบบ static ฝังเวลาของตอน build ไว้
 */
let cached: Date | null = null;
const noop = () => () => {};

export function useNow(): Date | null {
  return useSyncExternalStore(
    noop,
    () => (cached ??= new Date()),
    () => null,
  );
}

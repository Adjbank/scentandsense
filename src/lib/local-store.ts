"use client";

import { useSyncExternalStore } from "react";

/**
 * เก็บค่าใน localStorage แบบ external store (ใช้กับ useSyncExternalStore)
 * server snapshot = ค่าเริ่มต้น เพื่อให้ hydrate ตรงกัน แล้ว client ค่อยอัปเดต
 */
export function createLocalStore<T>(key: string, fallback: T, parse: (raw: string) => T = JSON.parse) {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;

  function read(): T {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      raw = null;
    }
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    try {
      cachedValue = raw === null ? fallback : parse(raw);
    } catch {
      cachedValue = fallback;
    }
    return cachedValue;
  }

  function emit() {
    for (const l of listeners) l();
  }

  function subscribe(cb: () => void) {
    listeners.add(cb);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) cb();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  }

  function set(value: T) {
    try {
      if (value === null || value === undefined) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } catch {
      /* storage unavailable: keep in memory */
      cachedRaw = undefined;
      cachedValue = value;
    }
    emit();
  }

  function use(): T {
    return useSyncExternalStore(subscribe, read, () => fallback);
  }

  return { use, set, read };
}

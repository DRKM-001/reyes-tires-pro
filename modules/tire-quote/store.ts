"use client";
// Tire Quote module: one shared draft for the whole page, so EVERY WhatsApp button
// sends the size the customer typed. Kept in sessionStorage so it survives
// moving between pages (e.g. reading the size guide and coming back).
import { useSyncExternalStore } from "react";
import type { QuoteDraft } from "./core";

const KEY = "tire-quote-draft";
const empty: QuoteDraft = { mode: "tires", size: "", qty: 4, condition: "either", wheelSize: "", style: "", vehicle: "", name: "" };
let state: QuoteDraft = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch { /* storage unavailable: keep in memory only */ }
}

export function setDraft(patch: Partial<QuoteDraft>) {
  load();
  state = { ...state, ...patch };
  try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  // pick up a stored draft after hydration
  queueMicrotask(l);
  return () => listeners.delete(l);
}

export function useDraft(): QuoteDraft {
  return useSyncExternalStore(subscribe, () => { load(); return state; }, () => empty);
}

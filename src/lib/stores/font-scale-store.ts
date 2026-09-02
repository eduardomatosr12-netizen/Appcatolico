'use client';

import { create } from 'zustand';

const STORAGE_KEY = 'forja-font-scale';

interface FontScaleState {
  percent: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  hydrate: () => void;
}

function loadPercent(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const n = Number(raw);
      if (Number.isFinite(n) && n >= 80 && n <= 175) return n;
    }
  } catch {
    // ignore
  }
  return 100;
}

export const useFontScaleStore = create<FontScaleState>((set) => ({
  percent: 100,
  increase: () =>
    set((state) => {
      const next = Math.min(175, state.percent + 10);
      persist(next);
      return { percent: next };
    }),
  decrease: () =>
    set((state) => {
      const next = Math.max(80, state.percent - 10);
      persist(next);
      return { percent: next };
    }),
  reset: () => {
    persist(100);
    set({ percent: 100 });
  },
  hydrate: () => {
    set({ percent: loadPercent() });
  },
}));

function persist(percent: number) {
  try {
    localStorage.setItem(STORAGE_KEY, String(percent));
  } catch {
    // ignore
  }
}

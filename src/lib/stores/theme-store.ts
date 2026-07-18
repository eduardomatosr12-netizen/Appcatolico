'use client';

import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const getSystemTheme = (): 'light' | 'dark' =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const resolveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') return getSystemTheme();
  return mode;
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  resolved: typeof window !== 'undefined' ? resolveTheme('system') : 'light',
  setMode: (mode) => set({ mode, resolved: resolveTheme(mode) }),
  toggle: () =>
    set((state) => {
      const next = state.resolved === 'dark' ? 'light' : 'dark';
      return { mode: next, resolved: next };
    }),
}));

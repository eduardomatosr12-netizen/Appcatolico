'use client';

import { useEffect, type ReactNode } from 'react';
import { useThemeStore } from '@/lib/stores/theme-store';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const resolved = useThemeStore((s) => s.resolved);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
  }, [resolved]);

  return <>{children}</>;
}

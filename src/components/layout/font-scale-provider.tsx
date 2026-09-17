'use client';

import { useEffect } from 'react';
import { useFontScaleStore } from '@/lib/stores/font-scale-store';

export function FontScaleProvider() {
  const percent = useFontScaleStore((s) => s.percent);
  const hydrate = useFontScaleStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', String(percent / 100));
  }, [percent]);

  return null;
}

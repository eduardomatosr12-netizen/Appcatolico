'use client';

import Link from 'next/link';
import { useThemeStore } from '@/lib/stores/theme-store';

export function Header() {
  const { toggle } = useThemeStore();

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="flex flex-col items-center gap-2 border-b border-white/[0.05] pb-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <span className="font-serif text-xs tracking-widest text-[#C5A059] uppercase font-medium">
          Liturgia Diária
        </span>
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-white font-serif">
          {currentDate}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[#6A6A6E] border border-white/[0.04] rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          Ao vivo
        </div>

        <button
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16161A] text-[#8A8A8E] hover:text-white transition-all border border-white/[0.05]"
          aria-label="Alternar tema"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>

      <div className="md:hidden">
        <Link href="/" className="font-serif text-lg font-bold text-[#C5A059] tracking-[0.2em]">
          LUMEN
        </Link>
      </div>
    </header>
  );
}

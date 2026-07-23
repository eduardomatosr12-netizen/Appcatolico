'use client';

import Link from 'next/link';
import { useThemeStore } from '@/lib/stores/theme-store';
import { useNotificationStore } from '@/lib/stores/notification-store';

export function Header() {
  const { toggle } = useThemeStore();
  const { togglePanel, notifications } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="flex flex-col items-center gap-3 border-b border-white/[0.05] pb-4 text-center w-full">
      <div className="md:hidden">
        <Link href="/" className="font-serif text-lg font-bold text-[#C5A059] tracking-[0.2em]">
          LUMEN
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <span className="font-serif text-xs tracking-widest text-[#C5A059] uppercase font-medium">
          LUMEN
        </span>
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold tracking-tight text-white font-serif w-full text-center">
          {currentDate}
        </h1>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[#6A6A6E] border border-white/[0.04] rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
          Ao vivo
        </div>

        <button
          onClick={togglePanel}
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#16161A] text-[#8A8A8E] hover:text-white transition-all border border-white/[0.05]"
          aria-label="Notificações"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center rounded-full bg-[#5C0F1B] text-[9px] font-bold text-[#C5A059] px-1">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

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
    </header>
  );
}

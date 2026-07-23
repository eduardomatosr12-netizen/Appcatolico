'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useNotificationStore } from '@/lib/stores/notification-store';

const navItems = [
  { href: '/liturgia', label: 'Liturgia', icon: 'book' },
  { href: '/biblia', label: 'Bíblia', icon: 'bible' },
  { href: '/oracoes', label: 'Orações Eucarísticas', icon: 'pray' },
  { href: '/rosario', label: 'Santo Terço', icon: 'circle' },
  { href: '/confissao', label: 'Confissão', icon: 'sparkles' },
  { href: '/produtividade', label: 'Produtividade', icon: 'check' },
];

function NavIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const cls = cn(
    'w-5 h-5 md:w-6 md:h-6',
    isActive ? 'text-[#C5A059]' : 'text-[#6A6A6E]',
  );

  switch (icon) {
    case 'book':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'bible':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M12 6v7" /><path d="M8 10h8" />
        </svg>
      );
    case 'clock':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'pray':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 10h10" /><path d="M7 14h6" /><path d="M12 2v5" /><path d="M12 17v5" /><path d="M2 12h5" /><path d="M17 12h5" />
        </svg>
      );
    case 'circle':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8Z" />
        </svg>
      );
    case 'check':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" /><circle cx="9" cy="20" r="2" /><circle cx="18" cy="20" r="2" /><path d="M21 16H8.7a1 1 0 0 1-1-.9L5.6 5" />
        </svg>
      );
    default:
      return null;
  }
}

export function DesktopSidebar() {
  const pathname = usePathname();
  const { togglePanel, notifications } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#16161A] border-r border-white/[0.05] z-50 flex flex-col justify-between py-6 px-4 max-md:hidden">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between px-2">
          <span className="font-serif text-xl md:text-2xl tracking-[0.25em] font-bold text-[#C5A059]">
            LUMEN
          </span>
          <button
            onClick={togglePanel}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#8A8A8E] hover:text-white hover:bg-white/[0.05] transition-all"
            aria-label="Notificações"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 flex items-center justify-center rounded-full bg-[#5C0F1B] text-[9px] font-bold text-[#C5A059] px-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 w-full px-4 md:px-5 py-3 md:py-4 rounded-xl text-sm md:text-base font-medium tracking-wide transition-all duration-200',
                  isActive
                    ? 'bg-[#3D0A11]/40 text-[#C5A059] border border-[#C5A059]/20 rounded-xl text-base font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]',
                )}
              >
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
                )}
                <span className="shrink-0">
                  <NavIcon icon={item.icon} isActive={isActive} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-[#6A6A6E] tracking-wider uppercase">Liturgia CNBB</p>
        <p className="text-[9px] text-[#6A6A6E] tracking-wider mt-0.5">v1.0</p>
      </div>
    </aside>
  );
}

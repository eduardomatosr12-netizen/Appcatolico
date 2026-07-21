'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/liturgia', label: 'Liturgia', icon: 'book' },
  { href: '/biblia', label: 'Bíblia', icon: 'bible' },
  { href: '/liturgia-horas', label: 'Horas', icon: 'clock' },
  { href: '/oracoes', label: 'Orações', icon: 'pray' },
  { href: '/rosario', label: 'Terço', icon: 'circle' },
  { href: '/exame', label: 'Exame', icon: 'sparkles' },
];

function NavIcon({ icon, isActive }: { icon: string; isActive: boolean }) {
  const cls = `w-[18px] h-[18px] ${isActive ? 'text-[#C5A059]' : 'text-[#6A6A6E]'}`;

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

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0E]/95 backdrop-blur-xl border-t border-[rgba(197,160,89,0.06)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="w-full px-0 py-1.5">
        <div className="flex items-center justify-evenly">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 py-1.5 px-1.5 sm:px-2 rounded-xl transition-all duration-300 flex-1 max-w-[72px]',
                  isActive ? 'bg-[#5C0F1B]/30' : '',
                )}
              >
                <NavIcon icon={item.icon} isActive={isActive} />
                <span className={cn(
                  'text-[9px] font-medium transition-colors truncate',
                  isActive ? 'text-[#C5A059]' : 'text-[#6A6A6E]',
                )}>
                  {item.label}
                </span>
                {isActive && <span className="w-1 h-1 rounded-full bg-[#C5A059] mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/', label: 'Liturgia Diária', icon: '📖' },
  { href: '/liturgia-horas', label: 'Liturgia das Horas', icon: '🕯️' },
  { href: '/oracoes', label: 'Orações Eucarísticas', icon: '🙏' },
  { href: '/rosario', label: 'Santo Terço', icon: '📿' },
  { href: '/exame', label: 'Exame de Consciência', icon: '✨' },
  { href: '/produtividade', label: 'Produtividade', icon: '⏱️' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-surface hidden lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-textMuted hover:bg-surfaceAlt hover:text-text'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

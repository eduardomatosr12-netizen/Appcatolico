'use client';

import { cn } from '@/lib/utils/cn';

interface PillTab {
  key: string;
  label: string;
  icon?: string;
}

interface PillTabBarProps {
  tabs: PillTab[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

export function PillTabBar({ tabs, activeKey, onSelect, className }: PillTabBarProps) {
  return (
    <div className={cn('inline-flex items-center rounded-full bg-[#16161A] p-1 border border-[rgba(197,160,89,0.08)]', className)}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-medium transition-all duration-300',
              isActive ? 'bg-[#5C0F1B] text-white shadow-sm' : 'text-[#8A8A8E] hover:text-[#F0F0F0]'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

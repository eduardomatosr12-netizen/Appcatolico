'use client';

import { cn } from '@/lib/utils/cn';

interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeKey: string;
  onSelect: (key: string) => void;
  className?: string;
}

export function TabBar({ tabs, activeKey, onSelect, className }: TabBarProps) {
  return (
    <div
      className={cn(
        'flex gap-1 rounded-2xl border border-white/5 bg-white/[0.03] p-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={cn(
              'flex-1 rounded-xl py-2 text-xs font-medium transition-all duration-300',
              isActive
                ? 'bg-[#4A0E17]/60 text-white shadow-sm border border-[#C5A059]/10'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

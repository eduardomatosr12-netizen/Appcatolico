'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import type { RosaryType } from '@/types/rosary';

interface RosarySelectorProps {
  rosaries: RosaryType[];
  selectedId: string;
  onSelect: (rosary: RosaryType) => void;
  className?: string;
}

export function RosarySelector({ rosaries, selectedId, onSelect, className }: RosarySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = rosaries.find((r) => r.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const grouped = rosaries.reduce(
    (acc, rosary) => {
      const cat = rosary.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(rosary);
      return acc;
    },
    {} as Record<string, RosaryType[]>
  );

  const categoryLabels: Record<string, string> = {
    mariano: 'Terços Marianos',
    misericordia: 'Divina Misericórdia',
    batalha: 'Batalha Espiritual',
    providencia: 'Divina Providência',
    sao_jose: 'São José',
    diversos: 'Outros Terços',
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-2 rounded-xl px-4 py-3',
          'bg-[#16161A] border border-[rgba(197,160,89,0.15)]',
          'text-left transition-all duration-200',
          isOpen && 'border-[rgba(197,160,89,0.3)] shadow-[0_0_12px_rgba(197,160,89,0.08)]'
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl shrink-0">{selected?.icon}</span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{selected?.name}</p>
            <p className="text-[11px] text-[#8A8A8E] truncate">{selected?.description}</p>
          </div>
        </div>
        <svg
          className={cn('w-4 h-4 text-[#8A8A8E] shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full max-h-[60vh] overflow-y-auto rounded-xl bg-[#1A1A1F] border border-[rgba(197,160,89,0.12)] shadow-xl scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-wider text-[#C5A059] font-medium">
                  {categoryLabels[category] || category}
                </p>
              </div>
              {items.map((rosary) => (
                <button
                  key={rosary.id}
                  onClick={() => {
                    onSelect(rosary);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150',
                    rosary.id === selectedId
                      ? 'bg-[#5C0F1B]/40 text-white'
                      : 'text-[#C8C8CC] hover:bg-white/[0.04]'
                  )}
                >
                  <span className="text-lg shrink-0">{rosary.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{rosary.name}</p>
                    <p className="text-[11px] text-[#8A8A8E] truncate">{rosary.description}</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

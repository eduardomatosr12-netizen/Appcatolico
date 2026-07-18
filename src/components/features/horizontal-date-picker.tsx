'use client';

import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils/cn';

interface HorizontalDatePickerProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function HorizontalDatePicker({ selectedDate, onSelect }: HorizontalDatePickerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const items: Date[] = [];
    for (let i = -3; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      items.push(d);
    }
    return items;
  }, []);

  const selectedStr = dateToStr(selectedDate);
  const todayStr = dateToStr(new Date());

  const isToday = (d: Date) => dateToStr(d) === todayStr;
  const isSelected = (d: Date) => dateToStr(d) === selectedStr;

  return (
    <div className="relative -mx-4 px-4">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {days.map((date) => {
          const selected = isSelected(date);
          const today = isToday(date);

          return (
            <button
              key={dateToStr(date)}
              onClick={() => onSelect(new Date(date))}
              className={cn(
                'flex flex-col items-center gap-1 rounded-2xl px-4 py-3 min-w-[64px] snap-center transition-all duration-300 shrink-0',
                selected
                  ? 'bg-gradient-to-b from-[#3D0A11] to-[#5C0F1B] shadow-md shadow-[#5C0F1B]/30'
                  : 'bg-[#16161A] hover:bg-[#1E1E24] border border-white/[0.03]',
              )}
            >
              <span className={cn(
                'text-[10px] font-medium uppercase tracking-wider',
                selected ? 'text-[#C5A059]' : 'text-[#8A8A8E]',
              )}>
                {dayNames[date.getDay()]}
              </span>
              <span className={cn(
                'text-lg font-bold leading-none',
                selected ? 'text-white' : today ? 'text-[#C5A059]' : 'text-[#F0F0F0]',
              )}>
                {date.getDate()}
              </span>
              <span className={cn(
                'text-[9px] uppercase tracking-wider',
                selected ? 'text-[#C5A059]/70' : 'text-[#6A6A6E]',
              )}>
                {monthNames[date.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>
      <div className="absolute left-0 top-0 bottom-1 w-4 bg-gradient-to-r from-[#0B0B0E] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-[#0B0B0E] to-transparent pointer-events-none" />
    </div>
  );
}

function dateToStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

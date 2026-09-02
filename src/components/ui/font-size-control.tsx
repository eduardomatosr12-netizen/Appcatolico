'use client';

import { useFontScaleStore } from '@/lib/stores/font-scale-store';
import { cn } from '@/lib/utils/cn';

interface FontSizeControlProps {
  className?: string;
}

export function FontSizeControl({ className }: FontSizeControlProps) {
  const { percent, increase, decrease } = useFontScaleStore();

  return (
    <div className={cn(
      'inline-flex items-center gap-1 rounded-full bg-[#1E1E24]/90 backdrop-blur-lg border border-white/[0.06] p-1 shadow-xl shrink-0',
      className
    )}>
      <button
        onClick={decrease}
        aria-label="Diminuir fonte"
        className="rounded-full p-2 text-xs text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-all"
      >
        A<sup>−</sup>
      </button>

      <span className="text-[10px] text-[#8A8A8E] w-7 text-center font-medium">{percent}%</span>

      <button
        onClick={increase}
        aria-label="Aumentar fonte"
        className="rounded-full p-2 text-xs text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-all"
      >
        A<sup>+</sup>
      </button>
    </div>
  );
}

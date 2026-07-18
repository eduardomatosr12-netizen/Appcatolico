'use client';

import { cn } from '@/lib/utils/cn';

interface FloatingToolbarProps {
  onPlay?: () => void;
  onFontDecrease?: () => void;
  onFontIncrease?: () => void;
  onShare?: () => void;
  fontSize?: number;
  className?: string;
}

export function FloatingToolbar({
  onPlay, onFontDecrease, onFontIncrease, onShare, fontSize = 100, className,
}: FloatingToolbarProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-1 rounded-full bg-[#1E1E24]/90 backdrop-blur-lg border border-white/[0.06] p-1.5 shadow-xl',
      className
    )}>
      <button onClick={onPlay}
        className="flex items-center gap-1.5 rounded-full bg-[#5C0F1B] px-4 py-2 text-xs font-medium text-white hover:bg-[#7A1A28] transition-all">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Ouvir
      </button>

      <span className="w-px h-5 bg-white/[0.06]" />

      <button onClick={onFontDecrease} className="rounded-full p-2 text-xs text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-all">
        A<sup>−</sup>
      </button>

      <span className="text-[10px] text-[#8A8A8E] w-6 text-center font-medium">{fontSize}%</span>

      <button onClick={onFontIncrease} className="rounded-full p-2 text-xs text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-all">
        A<sup>+</sup>
      </button>

      <span className="w-px h-5 bg-white/[0.06]" />

      <button onClick={onShare} className="rounded-full p-2 text-[#8A8A8E] hover:text-white hover:bg-white/5 transition-all">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
      </button>
    </div>
  );
}

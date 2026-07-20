'use client';

import { cn } from '@/lib/utils/cn';

interface AudioControlsProps {
  supported: boolean;
  speaking: boolean;
  paused: boolean;
  enabled: boolean;
  rate: number;
  onToggle: () => void;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onRateChange: (rate: number) => void;
  className?: string;
}

const RATE_OPTIONS = [0.75, 1, 1.25, 1.5];

export function AudioControls({
  supported,
  speaking,
  paused,
  enabled,
  rate,
  onToggle,
  onPlay,
  onPause,
  onResume,
  onStop,
  onRateChange,
  className,
}: AudioControlsProps) {
  if (!supported) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-xl px-4 py-3',
        'bg-[#16161A] border border-[rgba(197,160,89,0.08)]',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
            enabled
              ? 'bg-[#5C0F1B] text-[#C5A059]'
              : 'bg-white/5 text-[#8A8A8E]'
          )}
          title={enabled ? 'Desligar áudio' : 'Ligar áudio'}
        >
          <span className="text-sm">{enabled ? '🔊' : '🔇'}</span>
        </button>
        <span className="text-[11px] text-[#8A8A8E]">
          {enabled ? 'Áudio guia' : 'Áudio desligado'}
        </span>
      </div>

      {enabled && (
        <div className="flex items-center gap-1.5">
          {!speaking ? (
            <button
              onClick={onPlay}
              className="w-8 h-8 rounded-full bg-[#C5A059] text-black flex items-center justify-center hover:bg-[#D4AF6A] transition-colors"
              title="Ouvir oração"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <>
              <button
                onClick={paused ? onResume : onPause}
                className="w-8 h-8 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center hover:bg-[#C5A059]/30 transition-colors"
                title={paused ? 'Retomar' : 'Pausar'}
              >
                {paused ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
              <button
                onClick={onStop}
                className="w-8 h-8 rounded-full bg-white/5 text-[#8A8A8E] flex items-center justify-center hover:bg-white/10 transition-colors"
                title="Parar"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
              </button>
            </>
          )}

          <div className="ml-1 flex items-center gap-0.5 bg-white/5 rounded-lg px-1.5 py-1">
            {RATE_OPTIONS.map((r) => (
              <button
                key={r}
                onClick={() => onRateChange(r)}
                className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors',
                  rate === r
                    ? 'bg-[#C5A059] text-black'
                    : 'text-[#8A8A8E] hover:text-white'
                )}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

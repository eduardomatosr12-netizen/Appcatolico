'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function MeditationTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const computedTotal = hours * 3600 + minutes * 60 + seconds;

  useEffect(() => {
    if (isRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const handleStart = useCallback(() => {
    if (computedTotal <= 0) return;
    setTotalSeconds(computedTotal);
    setRemaining(computedTotal);
    setIsRunning(true);
    setIsFinished(false);
  }, [computedTotal]);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleResume = useCallback(() => {
    if (remaining > 0) setIsRunning(true);
  }, [remaining]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setRemaining(0);
    setTotalSeconds(0);
    setIsFinished(false);
  }, []);

  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress);

  const isSetup = !isRunning && remaining === 0 && !isFinished;
  const isPaused = !isRunning && remaining > 0;

  return (
    <div className="w-full bg-[#16161A] rounded-[24px] p-6 md:p-10 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col items-center gap-8">

      <div className="text-center">
        <h2 className="font-serif text-sm md:text-lg tracking-[0.2em] uppercase text-[#C5A059] font-semibold">
          Cronômetro de Adoração
        </h2>
        <p className="text-xs text-gray-400 mt-2 tracking-wide">
          Defina o tempo e silencie seu coração diante de Deus
        </p>
      </div>

      {isSetup && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-end gap-3">
            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                min={0}
                max={23}
                value={hours}
                onChange={(e) => setHours(Math.min(23, Math.max(0, Number(e.target.value))))}
                className="bg-[#16161A] text-center w-16 h-16 rounded-2xl text-2xl font-bold font-mono text-[#C5A059] border border-white/[0.05] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">h</span>
            </div>

            <span className="text-2xl font-bold text-gray-600 pb-6">:</span>

            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                min={0}
                max={59}
                value={minutes}
                onChange={(e) => setMinutes(Math.min(59, Math.max(0, Number(e.target.value))))}
                className="bg-[#16161A] text-center w-16 h-16 rounded-2xl text-2xl font-bold font-mono text-[#C5A059] border border-white/[0.05] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">min</span>
            </div>

            <span className="text-2xl font-bold text-gray-600 pb-6">:</span>

            <div className="flex flex-col items-center gap-2">
              <input
                type="number"
                min={0}
                max={59}
                value={seconds}
                onChange={(e) => setSeconds(Math.min(59, Math.max(0, Number(e.target.value))))}
                className="bg-[#16161A] text-center w-16 h-16 rounded-2xl text-2xl font-bold font-mono text-[#C5A059] border border-white/[0.05] focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">seg</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={computedTotal <= 0}
            className="flex items-center gap-3 rounded-full bg-[#3D0A11] border border-[#C5A059]/20 px-8 py-3.5 text-sm font-semibold text-[#C5A059] tracking-wider uppercase transition-all hover:bg-[#5C0F1B] hover:border-[#C5A059]/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#3D0A11]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Iniciar
          </button>
        </div>
      )}

      {(isRunning || isPaused || isFinished) && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-64 w-64">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 256 256">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                className="text-white/[0.04]"
                strokeWidth="4"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                className="text-[#C5A059]"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isFinished ? (
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="font-serif text-sm text-green-400 font-semibold tracking-wide text-center px-4">
                    Adoração Concluída.
                  </p>
                  <p className="text-xs text-[#C5A059]/70 italic">
                    Louvado seja Deus!
                  </p>
                </div>
              ) : (
                <span className="font-mono text-4xl md:text-6xl text-white font-bold tracking-wider">
                  {formatTime(remaining)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isRunning && (
              <button
                onClick={handlePause}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#16161A] border border-white/[0.08] text-[#C5A059] hover:bg-white/[0.05] transition-all"
                aria-label="Pausar"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              </button>
            )}

            {isPaused && (
              <button
                onClick={handleResume}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#3D0A11] border border-[#C5A059]/20 text-[#C5A059] hover:bg-[#5C0F1B] transition-all"
                aria-label="Continuar"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
            )}

            {(isPaused || isFinished) && (
              <button
                onClick={handleReset}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#16161A] border border-white/[0.08] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all"
                aria-label="Reiniciar"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>
            )}
          </div>

          {isFinished && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 rounded-full bg-[#16161A] border border-white/[0.05] px-6 py-2.5 text-xs text-gray-400 hover:text-white transition-all tracking-wider uppercase"
            >
              Nova Adoração
            </button>
          )}
        </div>
      )}
    </div>
  );
}

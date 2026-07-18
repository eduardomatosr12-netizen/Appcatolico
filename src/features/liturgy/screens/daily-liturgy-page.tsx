'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/header';
import { FloatingToolbar } from '@/components/ui/floating-toolbar';
import { HorizontalDatePicker } from '@/components/features/horizontal-date-picker';
import { LiturgySkeleton } from '@/components/features/liturgy-skeleton';
import { fetchLiturgy, getCachedLiturgy } from '@/services/liturgiaService';
import type { DailyLiturgy } from '@/types/liturgy';

function ReadingCard({
  title,
  reference,
  text,
  variant = 'default',
  adornment,
}: {
  title: string;
  reference?: string;
  text: string;
  variant?: 'default' | 'gospel';
  adornment?: React.ReactNode;
}) {
  const isGospel = variant === 'gospel';

  return (
    <article
      className={`w-full rounded-[24px] p-5 md:p-10 border shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5 transition-all hover:border-white/[0.06] overflow-hidden ${
        isGospel
          ? 'bg-gradient-to-br from-[#3D0A11] to-[#1A0508] border-[rgba(197,160,89,0.15)] hover:border-[rgba(197,160,89,0.25)]'
          : 'bg-[#16161A] border-white/[0.03]'
      }`}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex flex-col gap-1 border-l-2 border-[#C5A059] pl-4 min-w-0">
          <h2 className="font-serif text-xs sm:text-sm md:text-lg tracking-[0.2em] uppercase text-[#C5A059] font-semibold break-words">
            {title}
          </h2>
          {reference && (
            <span className={`text-[11px] sm:text-xs font-mono tracking-wide break-words ${
              isGospel ? 'text-[#C5A059]/50' : 'text-gray-400'
            }`}>
              {reference}
            </span>
          )}
        </div>
        {adornment}
      </div>
      <div className="text-sm sm:text-base md:text-xl leading-[1.8] md:leading-[2.0] tracking-wide text-gray-200/95 font-normal space-y-5 whitespace-pre-line break-words pt-2 px-1 sm:px-2">
        {text}
      </div>
    </article>
  );
}

function PsalmCard({
  title,
  reference,
  text,
  response,
}: {
  title: string;
  reference?: string;
  text: string;
  response?: string;
}) {
  return (
    <article className="w-full bg-[#16161A] rounded-[24px] p-5 md:p-10 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5 transition-all hover:border-white/[0.06] overflow-hidden">
      <div className="flex flex-col gap-1 border-l-2 border-[#C5A059] pl-4 min-w-0">
        <h2 className="font-serif text-xs sm:text-sm md:text-lg tracking-[0.2em] uppercase text-[#C5A059] font-semibold break-words">
          {title}
        </h2>
        {reference && (
          <span className="text-[11px] sm:text-xs text-gray-400 font-mono tracking-wide break-words">
            {reference}
          </span>
        )}
      </div>
      {response && (
        <span className="inline-block w-fit rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 px-4 sm:px-5 py-2 text-[11px] sm:text-xs text-[#C5A059] italic font-semibold tracking-wide">
          R: {response}
        </span>
      )}
      <div className="text-sm sm:text-base md:text-xl leading-[1.8] md:leading-[2.0] tracking-wide text-gray-200/95 font-normal space-y-5 whitespace-pre-line break-words pt-2 px-1 sm:px-2">
        {text}
      </div>
    </article>
  );
}

export function DailyLiturgyPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [liturgy, setLiturgy] = useState<DailyLiturgy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [activeTab, setActiveTab] = useState('liturgy');
  const [fontSize, setFontSize] = useState(100);

  const loadLiturgy = useCallback(async (date: Date) => {
    setLoading(true);
    setError(null);
    setOffline(false);

    try {
      const data = await fetchLiturgy(date);
      setLiturgy(data);
    } catch (err) {
      const cached = getCachedLiturgy(date);
      if (cached) {
        setLiturgy(cached);
        setOffline(true);
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Não foi possível carregar a liturgia deste dia.',
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiturgy(selectedDate);
  }, [selectedDate, loadLiturgy]);

  return (
    <>
      <Header />

      <div className="md:hidden">
        <HorizontalDatePicker
          selectedDate={selectedDate}
          onSelect={(d) => {
            d.setHours(0, 0, 0, 0);
            setSelectedDate(d);
          }}
        />
      </div>

      <div className="hidden md:flex flex-col gap-4">
        <HorizontalDatePicker
          selectedDate={selectedDate}
          onSelect={(d) => {
            d.setHours(0, 0, 0, 0);
            setSelectedDate(d);
          }}
        />
        <FloatingToolbar
          fontSize={fontSize}
          onFontIncrease={() => setFontSize((s) => Math.min(150, s + 10))}
          onFontDecrease={() => setFontSize((s) => Math.max(80, s - 10))}
        />
      </div>

      {offline && (
        <div className="bg-[#16161A] rounded-2xl px-5 py-3 border border-[#C5A059]/10">
          <p className="text-xs text-[#C5A059]/70 text-center md:text-left">
            Dispositivo offline. Exibindo leituras salvas localmente.
          </p>
        </div>
      )}

      <div className="flex justify-center w-full my-2">
        <div className="flex bg-[#16161A] p-1 rounded-full border border-white/[0.03] gap-1 w-full max-w-xs shadow-inner">
          <button
            onClick={() => setActiveTab('liturgy')}
            className={`flex-1 text-center py-2 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'liturgy'
                ? 'bg-[#3D0A11] text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Liturgia
          </button>
          <button
            onClick={() => setActiveTab('homily')}
            className={`flex-1 text-center py-2 px-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              activeTab === 'homily'
                ? 'bg-[#3D0A11] text-white shadow-md'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Homilia
          </button>
        </div>
      </div>

      {loading && <LiturgySkeleton />}

      {error && !loading && (
        <article className="w-full bg-[#16161A] rounded-[24px] p-6 md:p-8 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#5C0F1B]/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-sm text-gray-400">{error}</p>
          <button
            onClick={() => loadLiturgy(selectedDate)}
            className="text-xs text-[#C5A059] hover:text-white transition-colors underline underline-offset-2"
          >
            Tentar novamente
          </button>
        </article>
      )}

      {!loading && !error && activeTab === 'homily' && (
        <article className="w-full bg-[#16161A] rounded-[24px] p-6 md:p-8 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-sm text-gray-400 tracking-wide leading-relaxed">
            A homilia será carregada em breve...
          </p>
          <p className="text-xs text-[#6A6A6E]">
            Enquanto isso, medite as leituras do dia.
          </p>
        </article>
      )}

      {!loading && !error && activeTab === 'liturgy' && liturgy && (
        <section className="flex flex-col gap-6 w-full" style={{ fontSize: `${fontSize}%` }}>
          {liturgy.firstReading && (
            <ReadingCard
              title={liturgy.firstReading.title}
              reference={liturgy.firstReading.reference}
              text={liturgy.firstReading.text}
            />
          )}

          {liturgy.psalm && (
            <PsalmCard
              title={liturgy.psalm.title}
              reference={liturgy.psalm.reference}
              text={liturgy.psalm.text}
              response={liturgy.psalm.response}
            />
          )}

          {liturgy.secondReading && (
            <ReadingCard
              title={liturgy.secondReading.title}
              reference={liturgy.secondReading.reference}
              text={liturgy.secondReading.text}
            />
          )}

          {liturgy.gospel && (
            <ReadingCard
              title="Evangelho"
              reference={liturgy.gospel.reference}
              text={liturgy.gospel.text}
              variant="gospel"
              adornment={
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059]/40 border border-[#C5A059]/10 rounded-full px-3 py-1 font-semibold">
                  Aleluia
                </span>
              }
            />
          )}
        </section>
      )}

      <div className="flex justify-center pt-3 md:hidden">
        <FloatingToolbar
          fontSize={fontSize}
          onFontIncrease={() => setFontSize((s) => Math.min(150, s + 10))}
          onFontDecrease={() => setFontSize((s) => Math.max(80, s - 10))}
        />
      </div>
    </>
  );
}

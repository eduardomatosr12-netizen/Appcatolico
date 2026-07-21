'use client';

import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { FloatingToolbar } from '@/components/ui/floating-toolbar';
import { HorizontalDatePicker } from '@/components/features/horizontal-date-picker';
import { LiturgySkeleton } from '@/components/features/liturgy-skeleton';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { SacredCard } from '@/components/ui/sacred-card';
import { fetchLiturgy, getCachedLiturgy } from '@/services/liturgiaService';
import { liturgyHoursData } from '@/data/liturgy-hours';
import type { DailyLiturgy } from '@/types/liturgy';
import type { LiturgyOfHours, LiturgicalSpeaker } from '@/types/prayer';

const hourOrder = [
  { key: 'oficio_leituras', label: 'Ofício' },
  { key: 'laudes', label: 'Laudes' },
  { key: 'tercia', label: 'Tércia' },
  { key: 'sexta', label: 'Sexta' },
  { key: 'noa', label: 'Nona' },
  { key: 'vesperas', label: 'Vésperas' },
  { key: 'completas', label: 'Completas' },
];

const hourTimes: Record<string, string> = {
  oficio_leituras: 'Livre',
  laudes: '06:00',
  tercia: '09:00',
  sexta: '12:00',
  noa: '15:00',
  vesperas: '18:00',
  completas: '21:00',
};

function getSuggestedHour(): string {
  const h = new Date().getHours();
  if (h < 6) return 'completas';
  if (h < 8) return 'laudes';
  if (h < 10) return 'tercia';
  if (h < 14) return 'sexta';
  if (h < 16) return 'noa';
  if (h < 20) return 'vesperas';
  return 'completas';
}

const speakerStyles: Record<LiturgicalSpeaker, string> = {
  sacerdote:
    'text-base md:text-xl leading-[1.8] md:leading-[2.0] text-gray-300 font-normal',
  assembleia:
    'text-base md:text-xl font-bold text-white border-l-4 border-[#3D0A11] pl-4 my-4 py-2 bg-[#16161A]/60 rounded-r-2xl',
  rubrica:
    'text-xs md:text-sm italic text-[#C5A059]/80 font-serif my-2 block',
};

const speakerLabels: Record<LiturgicalSpeaker, string> = {
  sacerdote: 'Sacerdote',
  assembleia: 'Povo',
  rubrica: 'Rubrica',
};

function LiturgicalLine({
  speaker,
  text,
}: {
  speaker: LiturgicalSpeaker;
  text: string;
}) {
  return (
    <div className="my-2">
      {speaker !== 'rubrica' && (
        <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#C5A059]/60 font-semibold block mb-1">
          {speakerLabels[speaker]}
        </span>
      )}
      <p className={speakerStyles[speaker]}>{text}</p>
    </div>
  );
}

function PsalmBlock({
  reference,
  antiphon,
  text,
  index,
}: {
  reference: string;
  antiphon: string;
  text: string;
  index: number;
}) {
  return (
    <SacredCard>
      <div className="flex items-center gap-3 mb-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(197,160,89,0.15)] text-[11px] font-semibold text-[#C5A059]">
          {index + 1}
        </span>
        <h4 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] tracking-wide">
          {reference}
        </h4>
      </div>

      <div className="mb-3 pl-4 border-l-2 border-[#C5A059]/30 bg-[#C5A059]/5 py-2 pr-3 rounded-r-xl">
        <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#C5A059]/70 font-semibold block mb-1">
          Antífona
        </span>
        <p className="text-sm md:text-base italic text-[#C5A059]/90 font-serif leading-relaxed">
          {antiphon}
        </p>
      </div>

      <div className="sacred-text-body">
        <p className="whitespace-pre-line">{text}</p>
      </div>
    </SacredCard>
  );
}

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
      className={`w-full rounded-[24px] p-4 sm:p-5 md:p-10 border shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col gap-4 sm:gap-5 transition-all hover:border-white/[0.06] overflow-hidden ${
        isGospel
          ? 'bg-gradient-to-br from-[#3D0A11] to-[#1A0508] border-[rgba(197,160,89,0.15)] hover:border-[rgba(197,160,89,0.25)]'
          : 'bg-[#16161A] border-white/[0.03]'
      }`}
      style={{ width: '100%', maxWidth: '100%' }}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex flex-col gap-1 border-l-2 border-[#C5A059] pl-3 sm:pl-4 min-w-0">
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
      <div
        className="text-sm sm:text-base md:text-xl font-normal space-y-5 pt-1 sm:pt-2"
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          lineHeight: '1.6',
          padding: '4px 0',
        }}
      >
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
    <article className="w-full bg-[#16161A] rounded-[24px] p-4 sm:p-5 md:p-10 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col gap-4 sm:gap-5 transition-all hover:border-white/[0.06] overflow-hidden" style={{ width: '100%', maxWidth: '100%' }}>
      <div className="flex flex-col gap-1 border-l-2 border-[#C5A059] pl-3 sm:pl-4 min-w-0">
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
        <span className="inline-block w-fit rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#C5A059] italic font-semibold tracking-wide">
          R: {response}
        </span>
      )}
      <div
        className="text-sm sm:text-base md:text-xl font-normal space-y-5 pt-1 sm:pt-2"
        style={{
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          whiteSpace: 'normal',
          lineHeight: '1.6',
          padding: '4px 0',
        }}
      >
        {text}
      </div>
    </article>
  );
}

export function LiturgyPage() {
  const [view, setView] = useState<'daily' | 'hours'>('daily');

  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });
  const [liturgy, setLiturgy] = useState<DailyLiturgy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadLiturgy(selectedDate); }, []);

  const suggested = getSuggestedHour();
  const [activeHour, setActiveHour] = useState(getSuggestedHour);
  const active = liturgyHoursData[activeHour] as LiturgyOfHours | undefined;

  return (
    <>
      <Header />

      {view === 'daily' && (
        <>
          <div className="md:hidden">
            <HorizontalDatePicker
              selectedDate={selectedDate}
              onSelect={(d) => {
                d.setHours(0, 0, 0, 0);
                setSelectedDate(d);
                loadLiturgy(d);
              }}
            />
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <HorizontalDatePicker
              selectedDate={selectedDate}
              onSelect={(d) => {
                d.setHours(0, 0, 0, 0);
                setSelectedDate(d);
                loadLiturgy(d);
              }}
            />
            <FloatingToolbar
              fontSize={fontSize}
              onFontIncrease={() => setFontSize((s) => Math.min(150, s + 10))}
              onFontDecrease={() => setFontSize((s) => Math.max(80, s - 10))}
            />
          </div>
        </>
      )}

      <div className="flex justify-center w-full my-2">
        <PillTabBar
          tabs={[
            { key: 'daily', label: 'Leituras do Dia' },
            { key: 'hours', label: 'Liturgia das Horas' },
          ]}
          activeKey={view}
          onSelect={(k) => {
            const next = k as 'daily' | 'hours';
            setView(next);
            if (next === 'daily') {
              loadLiturgy(selectedDate);
            } else {
              setActiveHour(getSuggestedHour());
            }
          }}
          className="mx-auto"
        />
      </div>

      {view === 'daily' && offline && (
        <div className="bg-[#16161A] rounded-2xl px-5 py-3 border border-[#C5A059]/10">
          <p className="text-xs text-[#C5A059]/70 text-center md:text-left">
            Dispositivo offline. Exibindo leituras salvas localmente.
          </p>
        </div>
      )}

      {view === 'daily' && loading && <LiturgySkeleton />}

      {view === 'daily' && error && !loading && (
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

      {view === 'daily' && !loading && !error && liturgy && (
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

      {view === 'hours' && (
        <div className="space-y-5">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">
                Edições CNBB
              </span>
              <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#C5A059]">
              Liturgia das Horas
            </h1>
          </div>

          <SacredCard className="text-center bg-[#5C0F1B]/20 border-[#C5A059]/15">
            <p className="text-[10px] text-[#8A8A8E] uppercase tracking-wider">
              Horário sugerido
            </p>
            <p className="font-serif text-lg text-[#C5A059] mt-0.5">
              {hourOrder.find((h) => h.key === suggested)?.label} —{' '}
              {hourTimes[suggested]}
            </p>
          </SacredCard>

          <PillTabBar
            tabs={hourOrder.map((h) => ({ key: h.key, label: h.label }))}
            activeKey={activeHour}
            onSelect={setActiveHour}
            className="mx-auto"
          />

          {active && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="font-serif text-xl text-[#C5A059]">
                  {active.title}
                </h2>
                <p className="text-xs text-[#8A8A8E] mt-0.5">
                  {hourTimes[activeHour]}
                </p>
              </div>

              {active.invocation.length > 0 && (
                <SacredCard>
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
                    Invocação
                  </h3>
                  <div className="space-y-1">
                    {active.invocation.map((line, i) => (
                      <LiturgicalLine
                        key={i}
                        speaker={line.speaker}
                        text={line.text}
                      />
                    ))}
                  </div>
                </SacredCard>
              )}

              {active.hymn && (
                <SacredCard variant="gradient">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
                    Hino
                  </h3>
                  <p className="sacred-text-body italic whitespace-pre-line">
                    {active.hymn}
                  </p>
                </SacredCard>
              )}

              <div className="space-y-4">
                <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] text-center">
                  Salmos e Cânticos
                </h3>
                {active.psalms.map((psalm, i) => (
                  <PsalmBlock
                    key={i}
                    index={i}
                    reference={psalm.reference}
                    antiphon={psalm.antiphon}
                    text={psalm.text}
                  />
                ))}
              </div>

              {active.shortReading && (
                <SacredCard variant="accent">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
                    Leitura Breve
                  </h3>
                  <p className="sacred-text-body">{active.shortReading}</p>
                  {active.responsory && (
                    <div className="mt-3 text-base md:text-xl font-bold text-white border-l-4 border-[#3D0A11] pl-4 my-4 py-2 bg-[#16161A]/60 rounded-r-2xl">
                      <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#C5A059]/70 font-semibold block mb-1">
                        R
                      </span>
                      <p>
                        {active.responsory}
                      </p>
                    </div>
                  )}
                </SacredCard>
              )}

              {active.canticle && (
                <SacredCard variant="gradient">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-1">
                    {active.canticle.label}
                  </h3>
                  <p className="text-[10px] md:text-xs italic text-[#C5A059]/70 mb-3 font-serif">
                    Cântico Evangélico
                  </p>
                  <p className="sacred-text-body whitespace-pre-line">
                    {active.canticle.text}
                  </p>
                </SacredCard>
              )}

              {active.intercessions.length > 0 && (
                <SacredCard>
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
                    Preces
                  </h3>
                  <div className="space-y-1">
                    {active.intercessions.map((line, i) => (
                      <LiturgicalLine
                        key={i}
                        speaker={line.speaker}
                        text={line.text}
                      />
                    ))}
                  </div>
                </SacredCard>
              )}

              {active.concludingPrayer && (
                <SacredCard variant="gradient">
                  <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
                    Oração Conclusiva
                  </h3>
                  <p className="sacred-text-body font-medium text-[#C5A059]/90 whitespace-pre-line">
                    {active.concludingPrayer}
                  </p>
                </SacredCard>
              )}
            </div>
          )}
        </div>
      )}

      {view === 'daily' && (
        <div className="flex justify-center pt-3 md:hidden">
          <FloatingToolbar
            fontSize={fontSize}
            onFontIncrease={() => setFontSize((s) => Math.min(150, s + 10))}
            onFontDecrease={() => setFontSize((s) => Math.max(80, s - 10))}
          />
        </div>
      )}
    </>
  );
}

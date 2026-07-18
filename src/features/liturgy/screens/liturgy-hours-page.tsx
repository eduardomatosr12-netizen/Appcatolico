'use client';

import { useState, useEffect } from 'react';
import { SacredCard } from '@/components/ui/sacred-card';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { liturgyHoursData } from '@/data/liturgy-hours';
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

export function LiturgyHoursPage() {
  const [activeKey, setActiveKey] = useState('laudes');
  const suggested = getSuggestedHour();
  useEffect(() => {
    setActiveKey(suggested);
  }, [suggested]);
  const active = liturgyHoursData[activeKey] as LiturgyOfHours | undefined;

  return (
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
        activeKey={activeKey}
        onSelect={setActiveKey}
        className="mx-auto"
      />

      {active && (
        <div className="space-y-5">
          <div className="text-center">
            <h2 className="font-serif text-xl text-[#C5A059]">
              {active.title}
            </h2>
            <p className="text-xs text-[#8A8A8E] mt-0.5">
              {hourTimes[activeKey]}
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
  );
}

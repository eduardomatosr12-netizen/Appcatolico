'use client';

import { useState } from 'react';
import { SacredCard } from '@/components/ui/sacred-card';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { eucharisticPrayers } from '@/data/eucharistic-prayers';
import type { LiturgicalSpeaker } from '@/types/prayer';

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

export function PrayersPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prayer = eucharisticPrayers[activeIndex];

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">
            Eucaristia
          </span>
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">
          Orações Eucarísticas
        </h1>
      </div>

      <PillTabBar
        tabs={eucharisticPrayers.map((p, i) => ({
          key: String(i),
          label: `Oração ${p.id}`,
        }))}
        activeKey={String(activeIndex)}
        onSelect={(key) => setActiveIndex(Number(key))}
        className="mx-auto"
      />

      <div className="text-center">
        <h2 className="font-serif text-lg text-[#C5A059]">{prayer.title}</h2>
      </div>

      <div className="space-y-5">
        {prayer.sections.map((section) => (
          <SacredCard
            key={section.key}
            variant={section.key === 'concludingDoxology' ? 'gradient' : section.key === 'institutionNarrative' ? 'accent' : 'default'}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059]">
                {section.label}
              </h3>
              {section.key === 'institutionNarrative' && (
                <span className="text-[10px] uppercase tracking-wider text-[#C5A059]/60 border border-[#C5A059]/20 rounded-full px-2 py-0.5">
                  Rubrica
                </span>
              )}
            </div>

            <div className="space-y-1">
              {section.lines.map((line, i) => (
                <LiturgicalLine key={i} speaker={line.speaker} text={line.text} />
              ))}
            </div>
          </SacredCard>
        ))}
      </div>
    </div>
  );
}

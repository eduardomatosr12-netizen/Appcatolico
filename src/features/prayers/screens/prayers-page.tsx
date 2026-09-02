'use client';

import { useState } from 'react';
import { SacredCard } from '@/components/ui/sacred-card';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { FontSizeControl } from '@/components/ui/font-size-control';
import { eucharisticPrayers } from '@/data/eucharistic-prayers';
import { novenas } from '@/data/novenas';
import { generalPrayers } from '@/data/general-prayers';
import type { LiturgicalSpeaker, NovenasPrayer } from '@/types/prayer';

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

const categories = [
  { key: 'novenas', label: 'Novenas' },
  { key: 'diversas', label: 'Diversas' },
  { key: 'eucharistic', label: 'Orações Eucarísticas' },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

function EucharisticView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prayer = eucharisticPrayers[activeIndex];

  return (
    <div className="space-y-5">
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

function NovenasView() {
  const [selectedNovenas, setSelectedNovenas] = useState<NovenasPrayer | null>(null);
  const [activeDay, setActiveDay] = useState(0);

  if (selectedNovenas) {
    const day = selectedNovenas.days[activeDay];

    return (
      <div className="space-y-5">
        <button
          onClick={() => { setSelectedNovenas(null); setActiveDay(0); }}
          className="flex items-center gap-2 text-sm text-[#C5A059] hover:text-[#D4B87A] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        <div className="text-center space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#C5A059]">
            {selectedNovenas.title}
          </h2>
          <p className="text-xs text-[#8A8A8E]">{selectedNovenas.subtitle}</p>
        </div>

        <PillTabBar
          tabs={selectedNovenas.days.map((d) => ({
            key: String(d.day - 1),
            label: `Dia ${d.day}`,
          }))}
          activeKey={String(activeDay)}
          onSelect={(key) => setActiveDay(Number(key))}
          className="mx-auto"
        />

        {selectedNovenas.initialPrayer && (
          <SacredCard variant="accent">
            <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
              Oração inicial (rezar todos os dias)
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {selectedNovenas.initialPrayer}
            </p>
          </SacredCard>
        )}

        {selectedNovenas.preparatoryPrayer && (
          <SacredCard variant="accent">
            <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
              Oração preparatória
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {selectedNovenas.preparatoryPrayer}
            </p>
          </SacredCard>
        )}

        <SacredCard variant="accent">
          <div className="mb-3">
            <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059]">
              {day.title}
            </h3>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
            {day.text}
          </p>
        </SacredCard>

        {selectedNovenas.finalPrayer && (
          <SacredCard variant="accent">
            <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-3">
              Oração final (rezar todos os dias)
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {selectedNovenas.finalPrayer}
            </p>
          </SacredCard>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {novenas.map((n) => (
          <SacredCard
            key={n.id}
            variant="default"
            className="cursor-pointer hover:border-[#C5A059]/30 transition-colors"
            onClick={() => { setSelectedNovenas(n); setActiveDay(0); }}
          >
            <h3 className="font-serif text-sm font-semibold text-[#C5A059] mb-1">
              {n.title}
            </h3>
            <p className="text-xs text-[#8A8A8E]">{n.subtitle}</p>
            <p className="text-[10px] text-[#C5A059]/60 mt-1">Início: {n.startDate}</p>
          </SacredCard>
        ))}
      </div>
    </div>
  );
}

function DiversasView() {
  const [selectedPrayer, setSelectedPrayer] = useState<typeof generalPrayers[number] | null>(null);

  if (selectedPrayer) {
    return (
      <div className="space-y-5">
        <button
          onClick={() => setSelectedPrayer(null)}
          className="flex items-center gap-2 text-sm text-[#C5A059] hover:text-[#D4B87A] transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>

        <div className="text-center space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#C5A059]">
            {selectedPrayer.title}
          </h2>
          {selectedPrayer.subtitle && (
            <p className="text-xs text-[#8A8A8E]">{selectedPrayer.subtitle}</p>
          )}
        </div>

        <SacredCard variant="accent">
          <p className="text-base md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
            {selectedPrayer.text}
          </p>
        </SacredCard>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {generalPrayers.map((p) => (
          <SacredCard
            key={p.id}
            variant="default"
            className="cursor-pointer hover:border-[#C5A059]/30 transition-colors"
            onClick={() => setSelectedPrayer(p)}
          >
            <h3 className="font-serif text-sm font-semibold text-[#C5A059] mb-1">
              {p.title}
            </h3>
            {p.subtitle && (
              <p className="text-[10px] text-[#8A8A8E] italic">{p.subtitle}</p>
            )}
          </SacredCard>
        ))}
      </div>
    </div>
  );
}

export function PrayersPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('novenas');

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">
            Fé
          </span>
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">
          Orações
        </h1>
        <div className="flex justify-center pt-1">
          <FontSizeControl />
        </div>
      </div>

      <PillTabBar
        tabs={categories.map((c) => ({ key: c.key, label: c.label }))}
        activeKey={activeCategory}
        onSelect={(key) => setActiveCategory(key as CategoryKey)}
        className="mx-auto"
      />

      {activeCategory === 'novenas' && <NovenasView />}
      {activeCategory === 'diversas' && <DiversasView />}
      {activeCategory === 'eucharistic' && <EucharisticView />}
    </div>
  );
}

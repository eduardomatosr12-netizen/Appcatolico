'use client';

import { useState } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { mysteriesByType, getTodayMysteryType, mysteryLabels, mysteryDayLabels } from '@/data/rosary-mysteries';
import type { RosaryMystery } from '@/types/rosary';

const totalHailMarys = 10;
const prayers = {
  credo: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra...',
  paiNosso: 'Pai Nosso que estais nos céus, santificado seja o vosso Nome...',
  aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco...',
  salveRainha: 'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa...',
};

export function RosaryPage() {
  const todayType = getTodayMysteryType();
  const [selectedType, setSelectedType] = useState<RosaryMystery>(todayType);
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0);
  const [currentAve, setCurrentAve] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const mysteries = mysteriesByType[selectedType];
  const currentMystery = mysteries[currentMysteryIndex];
  const dayName = mysteryDayLabels[new Date().getDay()];

  const handleNext = () => {
    if (currentAve < totalHailMarys - 1) setCurrentAve(currentAve + 1);
    else if (currentMysteryIndex < mysteries.length - 1) { setCurrentMysteryIndex(currentMysteryIndex + 1); setCurrentAve(0); }
    else setIsComplete(true);
  };
  const handlePrev = () => {
    if (currentAve > 0) setCurrentAve(currentAve - 1);
    else if (currentMysteryIndex > 0) { setCurrentMysteryIndex(currentMysteryIndex - 1); setCurrentAve(totalHailMarys - 1); }
  };
  const reset = () => { setCurrentMysteryIndex(0); setCurrentAve(0); setIsComplete(false); };

  if (isComplete) {
    return (
      <div className="space-y-5">
        <SacredCard variant="gradient" className="text-center py-10">
          <SacredCardTitle>Terço Completo 🙏</SacredCardTitle>
          <SacredCardContent className="space-y-4">
            <p className="text-lg text-[#C5A059] font-medium">{mysteryLabels[selectedType]}</p>
            <p className="text-gray-400 italic">{prayers.salveRainha}</p>
            <Button onClick={reset}>Rezar novamente</Button>
          </SacredCardContent>
        </SacredCard>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /><span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">{dayName}</span><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Santo Terço</h1>
      </div>

      <PillTabBar tabs={Object.entries(mysteryLabels).map(([key, label]) => ({ key, label: label.replace('Mistérios ', '') }))} activeKey={selectedType} onSelect={(key) => { setSelectedType(key as RosaryMystery); reset(); }} className="mx-auto" />

      <SacredCard variant="gradient">
        <SacredCardContent className="space-y-6">
          <div className="text-center">
            <p className="text-[10px] text-[#8A8A8E] uppercase tracking-wider">Mistério</p>
            <p className="font-serif text-lg text-white mt-1">{currentMysteryIndex + 1}º — {currentMystery.title}</p>
            <p className="text-xs text-[#C5A059] italic mt-1">Fruto: {currentMystery.fruit}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-[#8A8A8E]">Ave-Maria</span>
            <span className="font-serif text-5xl font-bold text-[#C5A059]">{currentAve + 1}</span>
            <span className="text-xs text-[#8A8A8E]">/ {totalHailMarys}</span>
          </div>
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: totalHailMarys }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 max-w-6 rounded-full transition-all duration-300 ${i <= currentAve ? 'bg-[#C5A059]' : 'bg-white/10'}`} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={handlePrev}>← Anterior</Button>
            <span className="text-xs text-[#8A8A8E]">{currentMysteryIndex + 1}/{mysteries.length}</span>
            <Button size="sm" onClick={handleNext}>{currentAve === totalHailMarys - 1 && currentMysteryIndex === mysteries.length - 1 ? 'Finalizar' : 'Próxima →'}</Button>
          </div>
        </SacredCardContent>
      </SacredCard>

      <SacredCard><SacredCardContent><p className="italic text-center">{currentMysteryIndex === 0 && currentAve === 0 ? prayers.credo : currentAve === 0 ? prayers.paiNosso : prayers.aveMaria}</p></SacredCardContent></SacredCard>
    </div>
  );
}

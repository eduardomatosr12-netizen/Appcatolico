'use client';

import { useState } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import { RosarySelector } from '../components/rosary-selector';
import { rosaries } from '@/data/rosaries';
import { mysteriesByType, getTodayMysteryType, mysteryLabels, mysteryDayLabels } from '@/data/rosary-mysteries';
import type { RosaryType, RosaryMystery } from '@/types/rosary';

function buildMarianoRosary(mysteryType: RosaryMystery): RosaryType {
  const label = mysteryLabels[mysteryType];
  const mysteries = mysteriesByType[mysteryType];
  const openingPrayers = [
    'Creio em Deus Pai todo-poderoso, criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
    'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
    'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    'Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.',
  ];

  return {
    id: `mariano-${mysteryType}`,
    name: `Terço Mariano — ${label.replace('Mistérios ', '')}`,
    description: label,
    icon: mysteryType === 'joyful' ? '🌅' : mysteryType === 'sorrowful' ? '✝️' : mysteryType === 'glorious' ? '👑' : '✨',
    category: 'mariano',
    openingPrayers,
    decades: mysteries.map((m) => ({
      title: `${m.number}º — ${m.title}`,
      reflection: m.fruit,
      prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      beadCount: 10,
    })),
    closingPrayers: [
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  };
}

const allRosaries: RosaryType[] = [
  buildMarianoRosary('joyful'),
  buildMarianoRosary('sorrowful'),
  buildMarianoRosary('glorious'),
  buildMarianoRosary('luminous'),
  ...rosaries,
];

function getInitialRosary(): RosaryType {
  const todayType = getTodayMysteryType();
  return buildMarianoRosary(todayType);
}

export function RosaryPage() {
  const [selectedRosary, setSelectedRosary] = useState<RosaryType>(getInitialRosary);
  const [currentDecadeIndex, setCurrentDecadeIndex] = useState(0);
  const [currentBead, setCurrentBead] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentDecade = selectedRosary.decades[currentDecadeIndex];
  const dayName = mysteryDayLabels[new Date().getDay()];
  const totalBeads = selectedRosary.decades.reduce((sum, d) => sum + d.beadCount, 0);
  const completedBeads = selectedRosary.decades
    .slice(0, currentDecadeIndex)
    .reduce((sum, d) => sum + d.beadCount, 0) + currentBead;

  const handleNext = () => {
    if (currentBead < currentDecade.beadCount - 1) {
      setCurrentBead(currentBead + 1);
    } else if (currentDecadeIndex < selectedRosary.decades.length - 1) {
      setCurrentDecadeIndex(currentDecadeIndex + 1);
      setCurrentBead(0);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentBead > 0) {
      setCurrentBead(currentBead - 1);
    } else if (currentDecadeIndex > 0) {
      setCurrentDecadeIndex(currentDecadeIndex - 1);
      setCurrentBead(selectedRosary.decades[currentDecadeIndex - 1].beadCount - 1);
    }
  };

  const reset = () => {
    setCurrentDecadeIndex(0);
    setCurrentBead(0);
    setIsComplete(false);
  };

  const handleSelectRosary = (rosary: RosaryType) => {
    setSelectedRosary(rosary);
    reset();
  };

  if (isComplete) {
    return (
      <div className="space-y-5">
        <SacredCard variant="gradient" className="text-center py-10">
          <SacredCardTitle>Terço Completo 🙏</SacredCardTitle>
          <SacredCardContent className="space-y-4">
            <p className="text-lg text-[#C5A059] font-medium">{selectedRosary.name}</p>
            {selectedRosary.closingPrayers.map((prayer, i) => (
              <p key={i} className="text-gray-400 italic text-sm">{prayer}</p>
            ))}
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
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">{dayName}</span>
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Santo Terço</h1>
      </div>

      <RosarySelector
        rosaries={allRosaries}
        selectedId={selectedRosary.id}
        onSelect={handleSelectRosary}
      />

      <SacredCard variant="gradient">
        <SacredCardContent className="space-y-6">
          <div className="text-center">
            <p className="text-[10px] text-[#8A8A8E] uppercase tracking-wider">Década</p>
            <p className="font-serif text-lg text-white mt-1">{currentDecade.title}</p>
            {currentDecade.reflection && (
              <p className="text-xs text-[#C5A059] italic mt-1">{currentDecade.reflection}</p>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-[#8A8A8E]">Conta</span>
            <span className="font-serif text-5xl font-bold text-[#C5A059]">{currentBead + 1}</span>
            <span className="text-xs text-[#8A8A8E]">/ {currentDecade.beadCount}</span>
          </div>
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: currentDecade.beadCount }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 max-w-6 rounded-full transition-all duration-300 ${
                  i <= currentBead ? 'bg-[#C5A059]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="sm" onClick={handlePrev}>
              ← Anterior
            </Button>
            <span className="text-xs text-[#8A8A8E]">
              {currentDecadeIndex + 1}/{selectedRosary.decades.length} • {completedBeads}/{totalBeads}
            </span>
            <Button size="sm" onClick={handleNext}>
              {currentBead === currentDecade.beadCount - 1 && currentDecadeIndex === selectedRosary.decades.length - 1
                ? 'Finalizar'
                : 'Próxima →'}
            </Button>
          </div>
        </SacredCardContent>
      </SacredCard>

      <SacredCard>
        <SacredCardContent>
          <p className="italic text-center text-sm leading-relaxed">
            {currentDecadeIndex === 0 && currentBead === 0
              ? selectedRosary.openingPrayers[0]
              : currentBead === 0
                ? selectedRosary.openingPrayers[Math.min(currentDecadeIndex, selectedRosary.openingPrayers.length - 1)] || currentDecade.prayerPerBead
                : currentDecade.prayerPerBead}
          </p>
        </SacredCardContent>
      </SacredCard>
    </div>
  );
}

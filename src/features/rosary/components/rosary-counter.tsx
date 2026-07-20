'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RosarySelector } from './rosary-selector';
import { rosaries } from '@/data/rosaries';
import { mysteriesByType, getTodayMysteryType, mysteryLabels, mysteryDayLabels } from '@/data/rosary-mysteries';
import type { RosaryType, RosaryMystery } from '@/types/rosary';

function buildMarianoRosary(mysteryType: RosaryMystery): RosaryType {
  const label = mysteryLabels[mysteryType];
  const mysteries = mysteriesByType[mysteryType];
  return {
    id: `mariano-${mysteryType}`,
    name: `Terço Mariano — ${label.replace('Mistérios ', '')}`,
    description: label,
    icon: mysteryType === 'joyful' ? '🌅' : mysteryType === 'sorrowful' ? '✝️' : mysteryType === 'glorious' ? '👑' : '✨',
    category: 'mariano',
    openingPrayers: [
      'Creio em Deus Pai todo-poderoso, criador do céu e da terra...',
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome...',
    ],
    decades: mysteries.map((m) => ({
      title: `${m.number}º — ${m.title}`,
      reflection: m.fruit,
      prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco...',
      beadCount: 10,
    })),
    closingPrayers: ['Salve Rainha, Mãe de misericórdia...'],
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

export function RosaryCounter() {
  const [selectedRosary, setSelectedRosary] = useState<RosaryType>(getInitialRosary);
  const [currentDecadeIndex, setCurrentDecadeIndex] = useState(0);
  const [currentBead, setCurrentBead] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentDecade = selectedRosary.decades[currentDecadeIndex];
  const dayName = mysteryDayLabels[new Date().getDay()];

  const handleNextAve = () => {
    if (currentBead < currentDecade.beadCount - 1) {
      setCurrentBead(currentBead + 1);
    } else if (currentDecadeIndex < selectedRosary.decades.length - 1) {
      setCurrentDecadeIndex(currentDecadeIndex + 1);
      setCurrentBead(0);
    } else {
      setIsComplete(true);
    }
  };

  const handlePreviousAve = () => {
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
      <div className="space-y-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Terço Completo! 🙏</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-primary font-medium">
              {selectedRosary.name} - {selectedRosary.decades.length} décadas rezadas
            </p>
            {selectedRosary.closingPrayers.map((prayer, i) => (
              <p key={i} className="text-textMuted italic text-sm">{prayer}</p>
            ))}
            <Button onClick={reset}>Rezar novamente</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-primary">
          Santo Terço
        </h1>
        <p className="text-xs text-textMuted">{dayName}</p>
      </div>

      <RosarySelector
        rosaries={allRosaries}
        selectedId={selectedRosary.id}
        onSelect={handleSelectRosary}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {currentDecade.title}
          </CardTitle>
          {currentDecade.reflection && (
            <p className="text-xs text-textMuted">
              {currentDecade.reflection}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-textMuted">Conta</span>
            <span className="font-serif text-4xl font-bold text-primary">
              {currentBead + 1}
            </span>
            <span className="text-xs text-textMuted">/ {currentDecade.beadCount}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: currentDecade.beadCount }).map((_, i) => (
              <div
                key={i}
                className={`h-8 w-full rounded-full transition-colors ${
                  i <= currentBead
                    ? 'bg-primary'
                    : 'bg-primaryLight/30 border border-primary/20'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handlePreviousAve}>
              ← Anterior
            </Button>
            <div className="flex items-center gap-1 text-xs text-textMuted">
              <span className="font-medium">{currentDecadeIndex + 1}</span>
              <span>/ {selectedRosary.decades.length} décadas</span>
            </div>
            <Button size="sm" onClick={handleNextAve}>
              {currentBead === currentDecade.beadCount - 1 &&
              currentDecadeIndex === selectedRosary.decades.length - 1
                ? 'Finalizar'
                : 'Próxima →'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-3">
        <p className="text-xs text-textMuted italic leading-relaxed px-4">
          {currentDecadeIndex === 0 && currentBead === 0
            ? selectedRosary.openingPrayers[0]
            : currentBead === 0
              ? selectedRosary.openingPrayers[Math.min(currentDecadeIndex, selectedRosary.openingPrayers.length - 1)] || currentDecade.prayerPerBead
              : currentDecade.prayerPerBead}
        </p>
      </div>

      {currentDecadeIndex < selectedRosary.decades.length - 1 && (
        <div className="text-xs text-textMuted text-center space-y-1">
          <p>Próxima década:</p>
          <p className="font-medium text-text">
            {selectedRosary.decades[currentDecadeIndex + 1].title}
          </p>
        </div>
      )}
    </div>
  );
}

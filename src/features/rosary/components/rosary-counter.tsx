'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  mysteriesByType,
  getTodayMysteryType,
  mysteryLabels,
  mysteryDayLabels,
} from '@/data/rosary-mysteries';
import type { RosaryMystery, Mystery } from '@/types/rosary';

const prayers = {
  credo: 'Creio em Deus Pai todo-poderoso, criador do céu e da terra...',
  paiNosso: 'Pai Nosso que estais nos céus, santificado seja o vosso Nome...',
  aveMaria: 'Ave Maria, cheia de graça, o Senhor é convosco...',
  gloria: 'Glória ao Pai, ao Filho e ao Espírito Santo...',
  salveRainha: 'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa...',
};

const totalHailMarys = 10;

export function RosaryCounter() {
  const todayType = getTodayMysteryType();
  const [selectedType, setSelectedType] = useState<RosaryMystery>(todayType);
  const [currentMysteryIndex, setCurrentMysteryIndex] = useState(0);
  const [currentAve, setCurrentAve] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const mysteries = mysteriesByType[selectedType];
  const currentMystery = mysteries[currentMysteryIndex];
  const dayName = mysteryDayLabels[new Date().getDay()];

  const handleNextAve = () => {
    if (currentAve < totalHailMarys - 1) {
      setCurrentAve(currentAve + 1);
    } else if (currentMysteryIndex < mysteries.length - 1) {
      setCurrentMysteryIndex(currentMysteryIndex + 1);
      setCurrentAve(0);
    } else {
      setIsComplete(true);
    }
  };

  const handlePreviousAve = () => {
    if (currentAve > 0) {
      setCurrentAve(currentAve - 1);
    } else if (currentMysteryIndex > 0) {
      setCurrentMysteryIndex(currentMysteryIndex - 1);
      setCurrentAve(totalHailMarys - 1);
    }
  };

  const reset = () => {
    setCurrentMysteryIndex(0);
    setCurrentAve(0);
    setIsComplete(false);
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
              {mysteryLabels[selectedType]} - {mysteries.length} mistérios rezados
            </p>
            <p className="text-textMuted italic">{prayers.salveRainha}</p>
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

      <div className="flex flex-wrap gap-2 justify-center">
        {(Object.keys(mysteriesByType) as RosaryMystery[]).map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              reset();
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              type === selectedType
                ? 'bg-primary text-white'
                : 'border border-border text-textMuted hover:bg-surfaceAlt'
            }`}
          >
            {mysteryLabels[type].replace('Mistérios ', '')}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentMysteryIndex + 1}º Mistério: {currentMystery.title}
          </CardTitle>
          <p className="text-xs text-textMuted">
            Fruto: {currentMystery.fruit}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-textMuted">Ave-Maria</span>
            <span className="font-serif text-4xl font-bold text-primary">
              {currentAve + 1}
            </span>
            <span className="text-xs text-textMuted">/ {totalHailMarys}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: totalHailMarys }).map((_, i) => (
              <div
                key={i}
                className={`h-8 w-full rounded-full transition-colors ${
                  i <= currentAve
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
              <span className="font-medium">{currentMysteryIndex + 1}</span>
              <span>/ {mysteries.length} mistérios</span>
            </div>
            <Button size="sm" onClick={handleNextAve}>
              {currentAve === totalHailMarys - 1 &&
              currentMysteryIndex === mysteries.length - 1
                ? 'Finalizar'
                : 'Próxima →'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-3">
        <p className="text-xs text-textMuted italic leading-relaxed px-4">
          {currentMysteryIndex === 0 && currentAve === 0
            ? prayers.credo
            : currentAve === 0
              ? prayers.paiNosso
              : prayers.aveMaria}
        </p>
      </div>

      {currentMysteryIndex < mysteries.length - 1 && (
        <div className="text-xs text-textMuted text-center space-y-1">
          <p>Próximo mistério:</p>
          <p className="font-medium text-text">
            {mysteries[currentMysteryIndex + 1].number}º{' '}
            {mysteries[currentMysteryIndex + 1].title}
          </p>
        </div>
      )}
    </div>
  );
}

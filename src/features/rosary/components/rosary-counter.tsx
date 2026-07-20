'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RosarySelector } from './rosary-selector';
import { AudioControls } from './audio-controls';
import { useSpeechSynthesis } from '@/hooks/use-speech-synthesis';
import { rosaries } from '@/data/rosaries';
import { mysteriesByType, getTodayMysteryType, mysteryLabels, mysteryDayLabels } from '@/data/rosary-mysteries';
import type { RosaryType, RosaryMystery } from '@/types/rosary';

const GLORIA_PRAYER = 'Glória ao Pai, ao Filho e ao Espírito Santo, como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.';

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
      'Creio em Deus Pai todo-poderoso, criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.',
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      GLORIA_PRAYER,
    ],
    decades: mysteries.map((m) => ({
      title: `${m.number}º — ${m.title}`,
      reflection: m.fruit,
      prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      beadCount: 10,
    })),
    closingPrayers: ['Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.'],
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

function getCurrentPrayer(
  rosary: RosaryType,
  decadeIndex: number,
  beadIndex: number,
  isComplete: boolean
): string {
  if (isComplete) {
    return rosary.closingPrayers.join('. ');
  }

  if (decadeIndex === 0 && beadIndex === 0) {
    return rosary.openingPrayers[0];
  }

  if (beadIndex === 0 && rosary.openingPrayers[decadeIndex]) {
    return rosary.openingPrayers[decadeIndex];
  }

  if (beadIndex === rosary.decades[decadeIndex].beadCount - 1) {
    return rosary.decades[decadeIndex].prayerPerBead + '. ' + GLORIA_PRAYER;
  }

  return rosary.decades[decadeIndex].prayerPerBead;
}

export function RosaryCounter() {
  const [selectedRosary, setSelectedRosary] = useState<RosaryType>(getInitialRosary);
  const [currentDecadeIndex, setCurrentDecadeIndex] = useState(0);
  const [currentBead, setCurrentBead] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const speech = useSpeechSynthesis();
  const prevPosRef = useRef<string>('');

  const currentDecade = selectedRosary.decades[currentDecadeIndex];
  const dayName = mysteryDayLabels[new Date().getDay()];
  const currentPrayer = getCurrentPrayer(selectedRosary, currentDecadeIndex, currentBead, isComplete);

  const speakCurrent = useCallback(() => {
    if (audioEnabled && speech.supported) {
      speech.speak(currentPrayer);
    }
  }, [audioEnabled, speech, currentPrayer]);

  const posKey = `${currentDecadeIndex}-${currentBead}-${isComplete}`;
  useEffect(() => {
    if (audioEnabled && prevPosRef.current !== '' && prevPosRef.current !== posKey && speech.supported) {
      speech.speak(currentPrayer);
    }
    prevPosRef.current = posKey;
  }, [posKey, audioEnabled, speech, currentPrayer]);

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
    speech.stop();
    if (currentBead > 0) {
      setCurrentBead(currentBead - 1);
    } else if (currentDecadeIndex > 0) {
      setCurrentDecadeIndex(currentDecadeIndex - 1);
      setCurrentBead(selectedRosary.decades[currentDecadeIndex - 1].beadCount - 1);
    }
  };

  const reset = () => {
    speech.stop();
    setCurrentDecadeIndex(0);
    setCurrentBead(0);
    setIsComplete(false);
    prevPosRef.current = '';
  };

  const handleSelectRosary = (rosary: RosaryType) => {
    speech.stop();
    setSelectedRosary(rosary);
    reset();
  };

  const handleToggleAudio = () => {
    if (audioEnabled) {
      speech.stop();
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
    }
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
            <div className="flex justify-center gap-3">
              {audioEnabled && speech.supported && (
                <Button variant="ghost" onClick={speakCurrent}>🔊 Ouvir encerramento</Button>
              )}
              <Button onClick={reset}>Rezar novamente</Button>
            </div>
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

      <AudioControls
        supported={speech.supported}
        speaking={speech.speaking}
        paused={speech.paused}
        enabled={audioEnabled}
        rate={speech.rate}
        onToggle={handleToggleAudio}
        onPlay={speakCurrent}
        onPause={speech.pause}
        onResume={speech.resume}
        onStop={speech.stop}
        onRateChange={speech.setRate}
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
          {currentPrayer}
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

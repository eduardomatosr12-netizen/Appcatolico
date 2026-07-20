'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setVoice: (voice: SpeechSynthesisVoice) => void;
  rate: number;
  setRate: (rate: number) => void;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const supported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return !!window.speechSynthesis;
  }, []);

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const allVoices = synth.getVoices();
      const ptVoices = allVoices.filter((v) => v.lang.startsWith('pt'));
      setVoices(ptVoices.length > 0 ? ptVoices : allVoices);

      if (!selectedVoiceRef.current && ptVoices.length > 0) {
        const br = ptVoices.find((v) => v.lang === 'pt-BR');
        const voice = br || ptVoices[0];
        selectedVoiceRef.current = voice;
        setSelectedVoice(voice);
      }
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.cancel();
      synth.onvoiceschanged = null;
    };
  }, [supported]);

  const stop = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
    }
    setSpeaking(false);
    setPaused(false);
    utteranceRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string) => {
      const synth = window.speechSynthesis;
      if (!synth) return;

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = selectedVoiceRef.current;
      if (voice) utterance.voice = voice;
      utterance.lang = 'pt-BR';
      utterance.rate = rate;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setSpeaking(true);
        setPaused(false);
      };
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
      utterance.onerror = () => {
        setSpeaking(false);
        setPaused(false);
      };

      utteranceRef.current = utterance;
      synth.speak(utterance);
    },
    [rate]
  );

  const pause = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth && speaking) {
      synth.pause();
      setPaused(true);
    }
  }, [speaking]);

  const resume = useCallback(() => {
    const synth = window.speechSynthesis;
    if (synth && paused) {
      synth.resume();
      setPaused(false);
    }
  }, [paused]);

  const setVoiceHandler = useCallback((voice: SpeechSynthesisVoice) => {
    selectedVoiceRef.current = voice;
    setSelectedVoice(voice);
  }, []);

  return {
    speak,
    pause,
    resume,
    stop,
    speaking,
    paused,
    supported,
    voices,
    selectedVoice,
    setVoice: setVoiceHandler,
    rate,
    setRate,
  };
}

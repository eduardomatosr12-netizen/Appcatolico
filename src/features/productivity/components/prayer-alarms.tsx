'use client';

import { useState, useEffect, useRef } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { playAlarmSound, stopAlarmSound, testAlarmSound } from '@/lib/utils/alarm-sound';
import { useNotificationStore } from '@/lib/stores/notification-store';
import type { PrayerAlarm } from '@/types/productivity';

const STORAGE_KEY = 'lumen-alarms';
const defaults: PrayerAlarm[] = [
  { id: 'a1', title: 'Laudes', hour: 6, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'laudes' },
  { id: 'a2', title: 'Hora Tércia', hour: 9, minute: 0, daysOfWeek: [1,2,3,4,5], enabled: false, liturgyHour: 'terca' },
  { id: 'a3', title: 'Angelus (12h)', hour: 12, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'sexta' },
  { id: 'a4', title: 'Hora Nona', hour: 15, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'noa' },
  { id: 'a5', title: 'Vésperas', hour: 18, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'vesperas' },
  { id: 'a6', title: 'Completas', hour: 21, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'completas' },
];
const dayNames = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

function load(): PrayerAlarm[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || defaults; } catch { return defaults; } }

export function PrayerAlarms() {
  const [alarms, setAlarms] = useState<PrayerAlarm[]>(() => load());
  const [triggeredAlarm, setTriggeredAlarm] = useState<string | null>(null);
  const checkedRef = useRef<Set<string>>(new Set());
  const lastMinuteRef = useRef<string>('');
  const addNotification = useNotificationStore((s) => s.addNotification);
  useEffect(() => { if (alarms.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms)); }, [alarms]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const minuteKey = `${currentDay}-${currentHour}-${currentMinute}`;

      if (minuteKey === lastMinuteRef.current) return;
      lastMinuteRef.current = minuteKey;

      alarms.forEach((alarm) => {
        if (!alarm.enabled) return;
        if (!alarm.daysOfWeek.includes(currentDay)) return;
        if (alarm.hour !== currentHour || alarm.minute !== currentMinute) return;

        const key = `${alarm.id}-${minuteKey}`;
        if (checkedRef.current.has(key)) return;

        checkedRef.current.add(key);
        setTriggeredAlarm(alarm.id);
        playAlarmSound();
        addNotification({
          type: 'alarm',
          title: alarm.title,
          body: `Hora da oração — ${alarm.title}!`,
        });
      });
    };

    tick();
    const interval = setInterval(tick, 10000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        lastMinuteRef.current = '';
        tick();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [alarms, addNotification]);

  const dismissAlarm = () => {
    stopAlarmSound();
    setTriggeredAlarm(null);
  };

  const toggle = (id: string) => setAlarms((prev) => prev.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  const toggleDay = (alarmId: string, day: number) => setAlarms((prev) => prev.map((a) => {
    if (a.id !== alarmId) return a;
    const days = a.daysOfWeek.includes(day) ? a.daysOfWeek.filter((d) => d !== day) : [...a.daysOfWeek, day].sort();
    return { ...a, daysOfWeek: days };
  }));

  const activeAlarm = triggeredAlarm ? alarms.find((a) => a.id === triggeredAlarm) : null;

  return (
    <SacredCard><SacredCardTitle>Alarmes das Horas Litúrgicas</SacredCardTitle>
      <button onClick={testAlarmSound} className="w-full mt-3 rounded-xl bg-[#16161A] border border-white/10 px-4 py-3 text-xs font-medium text-[#C5A059] hover:bg-white/5 active:bg-white/10 transition-colors">
        🔊 Testar som
      </button>

      {activeAlarm && (
        <div className="mx-4 mt-3 rounded-2xl bg-gradient-to-br from-[#5C0F1B] to-[#3D0A11] border border-[#C5A059]/30 p-5 flex flex-col items-center gap-3 text-center animate-pulse">
          <svg className="w-8 h-8 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <p className="text-sm font-semibold text-[#C5A059]">{activeAlarm.title}</p>
          <p className="text-xs text-gray-300">Hora da oração!</p>
          <button onClick={dismissAlarm} className="mt-1 rounded-full bg-[#C5A059] px-6 py-2 text-xs font-bold text-[#0B0B0E] tracking-wider uppercase transition-all hover:bg-[#D4B87A]">
            Dispensar
          </button>
        </div>
      )}

      <SacredCardContent className="space-y-3 mt-3">
        {alarms.map((alarm) => (
          <div key={alarm.id} className={`rounded-[20px] border p-4 transition-all ${alarm.enabled ? 'border-[#C5A059]/20 bg-[#C5A059]/5' : 'border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <div><p className="text-sm font-medium text-gray-200">{alarm.title}</p><p className="text-xs text-[#8A8A8E]">{String(alarm.hour).padStart(2,'0')}:{String(alarm.minute).padStart(2,'0')}</p></div>
              <button onClick={() => toggle(alarm.id)} className={`relative h-6 w-11 rounded-full transition-colors ${alarm.enabled ? 'bg-[#C5A059]' : 'bg-white/10'}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${alarm.enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex gap-1">{dayNames.map((name, i) => (
              <button key={i} onClick={() => toggleDay(alarm.id, i)} className={`h-6 flex-1 rounded text-[10px] font-medium transition-colors ${alarm.daysOfWeek.includes(i) ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-white/5 text-gray-500'}`}>{name}</button>
            ))}</div>
          </div>
        ))}
        <p className="text-center text-[10px] text-gray-600 pt-2">Ative as notificações no sino do header para alertas em segundo plano.</p>
      </SacredCardContent>
    </SacredCard>
  );
}

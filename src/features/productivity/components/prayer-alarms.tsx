'use client';

import { useState, useEffect } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
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
  const [alarms, setAlarms] = useState<PrayerAlarm[]>([]);
  useEffect(() => { setAlarms(load()); }, []);
  useEffect(() => { if (alarms.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(alarms)); }, [alarms]);

  const toggle = (id: string) => setAlarms((prev) => prev.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a));
  const toggleDay = (alarmId: string, day: number) => setAlarms((prev) => prev.map((a) => {
    if (a.id !== alarmId) return a;
    const days = a.daysOfWeek.includes(day) ? a.daysOfWeek.filter((d) => d !== day) : [...a.daysOfWeek, day].sort();
    return { ...a, daysOfWeek: days };
  }));

  return (
    <SacredCard><SacredCardTitle>Alarmes das Horas Litúrgicas</SacredCardTitle>
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
        <p className="text-center text-[10px] text-gray-600 pt-2">* Para notificações reais, configure service workers.</p>
      </SacredCardContent>
    </SacredCard>
  );
}

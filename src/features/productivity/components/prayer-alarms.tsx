'use client';

import { useState, useEffect, useRef } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { playAlarmSound, stopAlarmSound, testAlarmSound, ensureAudioReady } from '@/lib/utils/alarm-sound';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useSyncedCollection } from '@/lib/services/sync-service';
import type { PrayerAlarm } from '@/types/productivity';

const STORAGE_KEY = 'forja-alarms';
const defaults: PrayerAlarm[] = [
  { id: 'a1', title: 'Laudes', hour: 6, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'laudes' },
  { id: 'a2', title: 'Hora Tércia', hour: 9, minute: 0, daysOfWeek: [1,2,3,4,5], enabled: false, liturgyHour: 'terca' },
  { id: 'a3', title: 'Angelus (12h)', hour: 12, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'sexta' },
  { id: 'a4', title: 'Hora Nona', hour: 15, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'noa' },
  { id: 'a5', title: 'Vésperas', hour: 18, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'vesperas' },
  { id: 'a6', title: 'Completas', hour: 21, minute: 0, daysOfWeek: [0,1,2,3,4,5,6], enabled: true, liturgyHour: 'completas' },
];
const dayNames = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

const defaultIds = new Set(defaults.map((d) => d.id));

export function PrayerAlarms() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid ?? null;

  const { data: alarms, add, update, remove } = useSyncedCollection<PrayerAlarm>(
    'alarms',
    userId,
    STORAGE_KEY
  );

  const [triggeredAlarm, setTriggeredAlarm] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formHour, setFormHour] = useState('8');
  const [formMinute, setFormMinute] = useState('0');
  const [formDays, setFormDays] = useState<number[]>([0,1,2,3,4,5,6]);
  const checkedRef = useRef<Set<string>>(new Set());
  const lastMinuteRef = useRef<string>('');
  const addNotification = useNotificationStore((s) => s.addNotification);

  const effectiveAlarms = alarms.length > 0 ? alarms : defaults;

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const minuteKey = `${currentDay}-${currentHour}-${currentMinute}`;

      if (minuteKey === lastMinuteRef.current) return;
      lastMinuteRef.current = minuteKey;

      effectiveAlarms.forEach((alarm) => {
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
  }, [effectiveAlarms, addNotification]);

  const dismissAlarm = () => {
    stopAlarmSound();
    setTriggeredAlarm(null);
  };

  const toggle = (id: string) => {
    const alarm = effectiveAlarms.find((a) => a.id === id);
    if (alarm) {
      update({ ...alarm, enabled: !alarm.enabled });
    }
  };

  const toggleDay = (alarmId: string, day: number) => {
    const alarm = effectiveAlarms.find((a) => a.id === alarmId);
    if (alarm) {
      const days = alarm.daysOfWeek.includes(day)
        ? alarm.daysOfWeek.filter((d) => d !== day)
        : [...alarm.daysOfWeek, day].sort();
      update({ ...alarm, daysOfWeek: days });
    }
  };

  const handleCreate = async () => {
    if (!formTitle.trim()) return;
    const newAlarm: PrayerAlarm = {
      id: `custom-${Date.now()}`,
      title: formTitle.trim(),
      hour: Number(formHour),
      minute: Number(formMinute),
      daysOfWeek: formDays,
      enabled: true,
    };
    await add(newAlarm);
    setFormTitle('');
    setFormHour('8');
    setFormMinute('0');
    setFormDays([0,1,2,3,4,5,6]);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await remove(id);
  };

  const toggleFormDay = (day: number) => {
    setFormDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const activeAlarm = triggeredAlarm ? effectiveAlarms.find((a) => a.id === triggeredAlarm) : null;

  return (
    <SacredCard><SacredCardTitle>Alarmes</SacredCardTitle>
      <div className="flex gap-2 mt-3">
        <button onClick={() => { ensureAudioReady(); testAlarmSound(); }} className="flex-1 rounded-xl bg-[#16161A] border border-white/10 px-4 py-3 text-xs font-medium text-[#C5A059] hover:bg-white/5 active:bg-white/10 transition-colors">
          🔊 Testar som
        </button>
        <button onClick={() => { ensureAudioReady(); setShowForm(!showForm); }} className="flex-1 rounded-xl bg-[#C5A059] px-4 py-3 text-xs font-bold text-[#0B0B0E] hover:bg-[#D4B87A] active:bg-[#B8943F] transition-colors">
          {showForm ? 'Cancelar' : '+ Novo alarme'}
        </button>
      </div>

      {showForm && (
        <div className="mt-3 rounded-[20px] border border-[#C5A059]/20 bg-[#C5A059]/5 p-4 space-y-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">Nome</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Ex: Terço da manhã"
              className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#C5A059]/40"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">Hora</label>
              <select
                value={formHour}
                onChange={(e) => setFormHour(e.target.value)}
                className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]/40"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">Minuto</label>
              <select
                value={formMinute}
                onChange={(e) => setFormMinute(e.target.value)}
                className="w-full rounded-xl bg-[#0B0B0E] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]/40"
              >
                {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                  <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">Dias</label>
            <div className="flex gap-1">
              {dayNames.map((name, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggleFormDay(i)}
                  className={`h-7 flex-1 rounded text-[10px] font-medium transition-colors ${formDays.includes(i) ? 'bg-[#C5A059]/20 text-[#C5A059]' : 'bg-white/5 text-gray-500'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!formTitle.trim()}
            className="w-full rounded-xl bg-[#C5A059] px-4 py-3 text-xs font-bold text-[#0B0B0E] hover:bg-[#D4B87A] active:bg-[#B8943F] transition-colors disabled:opacity-40"
          >
            Criar alarme
          </button>
        </div>
      )}

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
        {effectiveAlarms.map((alarm) => (
          <div key={alarm.id} className={`rounded-[20px] border p-4 transition-all ${alarm.enabled ? 'border-[#C5A059]/20 bg-[#C5A059]/5' : 'border-white/5 opacity-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-200">{alarm.title}</p>
                <p className="text-xs text-[#8A8A8E]">{String(alarm.hour).padStart(2,'0')}:{String(alarm.minute).padStart(2,'0')}</p>
              </div>
              <div className="flex items-center gap-2">
                {!defaultIds.has(alarm.id) && (
                  <button
                    onClick={() => handleDelete(alarm.id)}
                    className="text-[#6A6A6E] hover:text-red-400 transition-colors p-1"
                    aria-label="Excluir alarme"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                )}
                <button onClick={() => toggle(alarm.id)} className={`relative h-6 w-11 rounded-full transition-colors ${alarm.enabled ? 'bg-[#C5A059]' : 'bg-white/10'}`}>
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${alarm.enabled ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
                </button>
              </div>
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

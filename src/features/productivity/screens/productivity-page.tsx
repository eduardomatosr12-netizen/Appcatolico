'use client';

import { useState } from 'react';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { PurposeChecklist } from '../components/purpose-checklist';
import { MeditationTimer } from '../components/meditation-timer';
import { PrayerAlarms } from '../components/prayer-alarms';

export function ProductivityPage() {
  const [activeTab, setActiveTab] = useState('checklist');

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2"><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /><span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">Ferramentas</span><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /></div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Produtividade Espiritual</h1>
      </div>

      <PillTabBar tabs={[{ key: 'checklist', label: 'Checklist' }, { key: 'timer', label: 'Cronômetro' }, { key: 'alarms', label: 'Alarmes' }]} activeKey={activeTab} onSelect={setActiveTab} className="mx-auto" />

      {activeTab === 'checklist' && <PurposeChecklist />}
      {activeTab === 'timer' && <MeditationTimer />}
      {activeTab === 'alarms' && <PrayerAlarms />}
    </div>
  );
}

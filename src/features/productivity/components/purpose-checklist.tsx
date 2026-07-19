'use client';

import { useState, useEffect } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import type { Purpose } from '@/types/productivity';

const STORAGE_KEY = 'lumen-purposes';
const defaults: Purpose[] = [
  { id: 'p1', title: 'Rezar o Pai-Nosso com atenção', completed: false, date: '', category: 'Oração' },
  { id: 'p2', title: 'Ler um trecho da Bíblia', completed: false, date: '', category: 'Leitura' },
  { id: 'p3', title: 'Fazer um ato de caridade', completed: false, date: '', category: 'Caridade' },
  { id: 'p4', title: 'Evitar reclamações hoje', completed: false, date: '', category: 'Virtude' },
  { id: 'p5', title: 'Agradecer por 3 coisas antes de dormir', completed: false, date: '', category: 'Ação de Graças' },
  { id: 'p6', title: 'Rezar um mistério do Terço', completed: false, date: '', category: 'Oração' },
  { id: 'p7', title: 'Fazer jejum ou sacrifício', completed: false, date: '', category: 'Penitência' },
  { id: 'p8', title: 'Visitar ou ligar para alguém necessitado', completed: false, date: '', category: 'Caridade' },
];

function load(): Purpose[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || defaults; } catch { return defaults; } }

export function PurposeChecklist() {
  const [purposes, setPurposes] = useState<Purpose[]>(() => load());
  const [newPurpose, setNewPurpose] = useState('');
  useEffect(() => { if (purposes.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(purposes)); }, [purposes]);

  const toggle = (id: string) => setPurposes((prev) => prev.map((p) => p.id === id ? { ...p, completed: !p.completed, date: !p.completed ? new Date().toISOString() : '' } : p));
  const add = () => { if (!newPurpose.trim()) return; setPurposes((prev) => [...prev, { id: `p${Date.now()}`, title: newPurpose.trim(), completed: false, date: '', category: 'Personalizado' }]); setNewPurpose(''); };
  const remove = (id: string) => setPurposes((prev) => prev.filter((p) => p.id !== id));
  const reset = () => setPurposes((prev) => prev.map((p) => ({ ...p, completed: false, date: '' })));

  const completed = purposes.filter((p) => p.completed).length;
  const categories = [...new Set(purposes.map((p) => p.category))];

  return (
    <div className="space-y-4">
      <SacredCard><SacredCardContent><div className="flex items-center justify-between"><div><p className="text-sm text-[#8A8A8E]">{completed} de {purposes.length}</p><div className="mt-1.5 h-1.5 w-32 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#C5A059] transition-all" style={{ width: `${(completed / purposes.length) * 100}%` }} /></div></div><Button variant="ghost" size="sm" onClick={reset}>Resetar</Button></div></SacredCardContent></SacredCard>

      <div className="flex gap-2">
        <input type="text" value={newPurpose} onChange={(e) => setNewPurpose(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="Novo propósito..." autoComplete="off" className="flex-1 h-10 rounded-[14px] border border-white/10 bg-[#16161A] px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-transparent" />
        <Button onClick={add}>+</Button>
      </div>

      {categories.map((category) => (
        <SacredCard key={category}><SacredCardTitle className="text-sm">{category}</SacredCardTitle><SacredCardContent className="space-y-1 mt-3">
          {purposes.filter((p) => p.category === category).map((purpose) => (
            <div key={purpose.id} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03] group transition-colors">
              <button onClick={() => toggle(purpose.id)} className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${purpose.completed ? 'border-green-500 bg-green-500 text-black' : 'border-gray-600 hover:border-[#C5A059]'}`}>{purpose.completed && '✓'}</button>
              <span className={`flex-1 text-sm ${purpose.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{purpose.title}</span>
              <button onClick={() => remove(purpose.id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 text-xs transition-all">✕</button>
            </div>
          ))}
        </SacredCardContent></SacredCard>
      ))}
    </div>
  );
}

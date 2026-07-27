'use client';

import { useState, useEffect, useRef } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useSyncedCollection } from '@/lib/services/sync-service';
import { getDb } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc, getDoc } from 'firebase/firestore';
import type { Purpose } from '@/types/productivity';

const STORAGE_KEY = 'forja-purposes';
const SEEDED_DOC = 'meta/seeded';
const defaultPurposes: Purpose[] = [
  { id: 'p1', title: 'Rezar o Pai-Nosso com atenção', completed: false, date: '', category: 'Oração' },
  { id: 'p2', title: 'Ler um trecho da Bíblia', completed: false, date: '', category: 'Leitura' },
  { id: 'p3', title: 'Fazer um ato de caridade', completed: false, date: '', category: 'Caridade' },
  { id: 'p4', title: 'Evitar reclamações hoje', completed: false, date: '', category: 'Virtude' },
  { id: 'p5', title: 'Agradecer por 3 coisas antes de dormir', completed: false, date: '', category: 'Ação de Graças' },
  { id: 'p6', title: 'Rezar um mistério do Terço', completed: false, date: '', category: 'Oração' },
  { id: 'p7', title: 'Fazer jejum ou sacrifício', completed: false, date: '', category: 'Penitência' },
  { id: 'p8', title: 'Visitar ou ligar para alguém necessitado', completed: false, date: '', category: 'Caridade' },
];

export function PurposeChecklist() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.uid ?? null;

  const { data: purposes, add, update, remove } = useSyncedCollection<Purpose>(
    'purposes',
    userId,
    STORAGE_KEY
  );

  const [newPurpose, setNewPurpose] = useState('');
  const seededRef = useRef(false);

  useEffect(() => {
    if (!userId || seededRef.current) return;
    seededRef.current = true;

    const db = getDb();
    const seededDocRef = doc(db, 'users', userId, SEEDED_DOC);

    getDoc(seededDocRef).then((snap) => {
      if (snap.exists()) return;

      const colRef = collection(db, 'users', userId, 'purposes');
      getDocs(colRef).then((snapshot) => {
        if (snapshot.empty) {
          const batch = writeBatch(db);
          defaultPurposes.forEach((p) => {
            batch.set(doc(colRef, p.id), p);
          });
          batch.set(seededDocRef, { purposes: true, alarms: true, createdAt: Date.now() });
          batch.commit();
        }
      });
    }).catch(() => {});
  }, [userId]);

  const effectivePurposes = purposes;

  const toggle = (id: string) => {
    const purpose = effectivePurposes.find((p) => p.id === id);
    if (purpose) {
      update({
        ...purpose,
        completed: !purpose.completed,
        date: !purpose.completed ? new Date().toISOString() : '',
      });
    }
  };

  const addPurpose = () => {
    if (!newPurpose.trim()) return;
    add({
      id: `p${Date.now()}`,
      title: newPurpose.trim(),
      completed: false,
      date: '',
      category: 'Personalizado',
    });
    setNewPurpose('');
  };

  const removePurpose = (id: string) => remove(id);

  const reset = () => {
    effectivePurposes.forEach((p) => {
      update({ ...p, completed: false, date: '' });
    });
  };

  const completed = effectivePurposes.filter((p) => p.completed).length;
  const categories = [...new Set(effectivePurposes.map((p) => p.category))];
  const totalPurposes = effectivePurposes.length;
  const progressPercent = totalPurposes > 0 ? (completed / totalPurposes) * 100 : 0;

  return (
    <div className="space-y-4">
      <SacredCard><SacredCardContent><div className="flex items-center justify-between"><div><p className="text-sm text-[#8A8A8E]">{completed} de {totalPurposes}</p><div className="mt-1.5 h-1.5 w-32 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#C5A059] transition-all" style={{ width: `${progressPercent}%` }} /></div></div><Button variant="ghost" size="sm" onClick={reset}>Resetar</Button></div></SacredCardContent></SacredCard>

      <div className="flex gap-2">
        <input type="text" value={newPurpose} onChange={(e) => setNewPurpose(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPurpose()} placeholder="Novo propósito..." autoComplete="off" className="flex-1 h-10 rounded-[14px] border border-white/10 bg-[#16161A] px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-transparent" />
        <Button onClick={addPurpose}>+</Button>
      </div>

      {totalPurposes === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          <p>Nenhum propósito ainda.</p>
          <p className="text-xs text-gray-600 mt-1">Adicione um propósito acima para começar.</p>
        </div>
      )}

      {categories.map((category) => (
        <SacredCard key={category}><SacredCardTitle className="text-sm">{category}</SacredCardTitle><SacredCardContent className="space-y-1 mt-3">
          {effectivePurposes.filter((p) => p.category === category).map((purpose) => (
            <div key={purpose.id} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03] group transition-colors">
              <button onClick={() => toggle(purpose.id)} className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${purpose.completed ? 'border-green-500 bg-green-500 text-black' : 'border-gray-600 hover:border-[#C5A059]'}`}>{purpose.completed && '✓'}</button>
              <span className={`flex-1 text-sm ${purpose.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{purpose.title}</span>
              <button onClick={() => removePurpose(purpose.id)} className="text-[#6A6A6E] hover:text-red-400 transition-colors p-1 text-xs" aria-label="Remover">✕</button>
            </div>
          ))}
        </SacredCardContent></SacredCard>
      ))}
    </div>
  );
}

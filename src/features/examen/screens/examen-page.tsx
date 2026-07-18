'use client';

import { useState } from 'react';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import { examenItems, conclusionPrayer } from '@/data/examen';

export function ExamenPage() {
  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showConclusion, setShowConclusion] = useState(false);

  const handleResponse = (questionId: string, value: boolean) => setResponses((prev) => ({ ...prev, [questionId]: value }));
  const total = examenItems.reduce((acc, item) => acc + item.questions.length, 0);
  const answered = Object.keys(responses).length;

  if (showConclusion) {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2"><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /><span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">Conclusão</span><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /></div>
          <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Exame de Consciência</h1>
        </div>
        <SacredCard variant="gradient"><SacredCardContent className="pt-4"><p className="whitespace-pre-line text-gray-200">{conclusionPrayer}</p></SacredCardContent></SacredCard>
        <Button className="mx-auto" onClick={() => { setShowConclusion(false); setResponses({}); setExpandedId(null); }}>Recomeçar</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2"><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /><span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">Confissão</span><span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" /></div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Exame de Consciência</h1>
        <div className="flex items-center justify-center gap-2 text-xs"><span className="text-[#8A8A8E]">{answered}/{total}</span><div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-[#C5A059] transition-all" style={{ width: `${(answered / total) * 100}%` }} /></div></div>
      </div>

      <div className="space-y-3">
        {examenItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const allAnswered = item.questions.every((_, i) => responses[`${item.id}-q${i}`] !== undefined);

          return (
            <SacredCard key={item.id} onClick={() => setExpandedId(isExpanded ? null : item.id)} className="cursor-pointer">
              <div className="flex items-center justify-between">
                <SacredCardTitle className="text-sm flex-1 pr-2">{item.commandment}</SacredCardTitle>
                <div className="flex items-center gap-2 shrink-0">
                  {allAnswered && !isExpanded && <span className="text-[10px] text-green-400">✓</span>}
                  <span className={`text-[#8A8A8E] text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </div>
              {isExpanded && (
                <SacredCardContent className="space-y-4 mt-4">
                  <div className="space-y-3">
                    {item.questions.map((question, i) => {
                      const qid = `${item.id}-q${i}`;
                      const value = responses[qid];
                      return (
                        <div key={qid} className="space-y-1.5">
                          <p className="text-gray-200">{question}</p>
                          <div className="flex gap-2">
                            <button onClick={(e) => { e.stopPropagation(); handleResponse(qid, true); }}
                              className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-colors ${value === true ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-white/5 text-gray-400 hover:bg-red-500/10 border border-white/5'}`}>Sim</button>
                            <button onClick={(e) => { e.stopPropagation(); handleResponse(qid, false); }}
                              className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-colors ${value === false ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-white/5 text-gray-400 hover:bg-green-500/10 border border-white/5'}`}>Não</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="rounded-xl bg-[rgba(197,160,89,0.08)] p-3 border border-[rgba(197,160,89,0.1)]">
                    <p className="text-xs text-[#C5A059] italic leading-relaxed">{item.reflection}</p>
                  </div>
                </SacredCardContent>
              )}
            </SacredCard>
          );
        })}
      </div>

      {answered === total && <Button size="lg" className="mx-auto" onClick={() => setShowConclusion(true)}>Ver Ato de Contrição</Button>}
    </div>
  );
}

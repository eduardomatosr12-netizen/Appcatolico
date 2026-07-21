'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { SacredCard, SacredCardContent, SacredCardTitle } from '@/components/ui/sacred-card';
import { Button } from '@/components/ui/button';
import { examenItems, conclusionPrayer } from '@/data/examen';

interface ConfessionRecord {
  id: string;
  date: string;
  notes: string;
}

const CONFESSIONS_KEY = 'lumen_confession_history';

function loadConfessions(): ConfessionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CONFESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConfessions(records: ConfessionRecord[]) {
  localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(records));
}

const actsOfContrition = [
  {
    title: 'Ato de Contrição (Padrão)',
    text: `Meu Deus, eu me arrependo de todo o meu coração de ter-Vos ofendido. Detesto todos os meus pecados porque, pecando, mereci vossos castigos e ofendi a Vós, sumo bem e digno de ser amado sobre todas as coisas. Proponho firmemente, com o auxílio da vossa graça, confessar-me, fazer penitência e não mais pecar. Amém.`,
  },
  {
    title: 'Ato de Contrição de São Pedro',
    text: `Senhor, tenho pena de mim mesmo por ter-Vos negado. Vós sabeis que eu Vos amo. Meu Deus, tende misericórdia de mim, pecador. Amém.`,
  },
  {
    title: 'Ato de Contrição de Santo Agostinho',
    text: `Amor antigo, memória sempre presente, doçura sempre antiga, sempre nova, sempre cheia de safátya. Eu Vos amei tarde,beleza tão antiga e tão nova, tarde Vos amei! Vós estáveis dentro de mim, e eu lá fora, e ali Vos buscava. A vossa palma me chamava, e eu cansava por achar-Vos. Vós estais comigo, e não estou convosco. Longe de Vós, corro atrás do que é belo. Mas o que é belo está dentro de mim. Amém.`,
  },
  {
    title: 'Ato de Contrição (Breve)',
    text: `Senhor Jesus, tende compaixão de mim, pecador. Amém.`,
  },
  {
    title: 'Ato de Contrição de São Francisco de Assis',
    text: `Altíssimo, onipotente e bom Senhor, vossos são o louvor, a glória e o honra e todas as bênçãos. A nenhum homem convém louvar-Vos, mas a Vós, ó Altíssimo; pois sobre todos os vossos santos, sobre todos os vossos louvores. Bendito sejais, ó Senhor, sobre todas as vossas criaturas. Amém.`,
  },
];

export function ConfissaoPage() {
  const [activeTab, setActiveTab] = useState('exame');

  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showConclusion, setShowConclusion] = useState(false);

  const [confessions, setConfessions] = useState<ConfessionRecord[]>(() => loadConfessions());
  const [newDate, setNewDate] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleResponse = (questionId: string, value: boolean) => setResponses((prev) => ({ ...prev, [questionId]: value }));
  const total = examenItems.reduce((acc, item) => acc + item.questions.length, 0);
  const answered = Object.keys(responses).length;

  function addConfession() {
    if (!newDate) return;
    const record: ConfessionRecord = {
      id: Date.now().toString(),
      date: newDate,
      notes: newNotes.trim(),
    };
    const updated = [...confessions, record].sort((a, b) => b.date.localeCompare(a.date));
    setConfessions(updated);
    saveConfessions(updated);
    setNewDate('');
    setNewNotes('');
    setShowForm(false);
  }

  function removeConfession(id: string) {
    const updated = confessions.filter((c) => c.id !== id);
    setConfessions(updated);
    saveConfessions(updated);
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  return (
    <>
      <Header />

      <div className="text-center space-y-2 mb-4">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">
            Confissão
          </span>
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">Confissão</h1>
      </div>

      <div className="flex justify-center w-full mb-4">
        <PillTabBar
          tabs={[
            { key: 'exame', label: 'Exame' },
            { key: 'contricao', label: 'Atos de Contrição' },
            { key: 'historico', label: 'Minhas Confissões' },
          ]}
          activeKey={activeTab}
          onSelect={setActiveTab}
          className="mx-auto"
        />
      </div>

      {activeTab === 'exame' && (
        <ExameTab
          responses={responses}
          expandedId={expandedId}
          showConclusion={showConclusion}
          answered={answered}
          total={total}
          onToggleExpand={setExpandedId}
          onSetShowConclusion={setShowConclusion}
          onSetResponses={setResponses}
          onHandleResponse={handleResponse}
        />
      )}

      {activeTab === 'contricao' && (
        <div className="space-y-5">
          {actsOfContrition.map((act) => (
            <SacredCard key={act.title} variant="gradient">
              <SacredCardTitle>{act.title}</SacredCardTitle>
              <SacredCardContent>
                <p className="whitespace-pre-line text-gray-200 leading-relaxed">{act.text}</p>
              </SacredCardContent>
            </SacredCard>
          ))}
        </div>
      )}

      {activeTab === 'historico' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancelar' : '+ Nova Confissão'}
            </Button>
          </div>

          {showForm && (
            <SacredCard variant="accent">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">
                    Data da Confissão
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-xl bg-[#16161A] border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A059]/40"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8A8A8E] font-semibold block mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    rows={2}
                    placeholder="Ex: Padre João, Paróquia São José..."
                    className="w-full rounded-xl bg-[#16161A] border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#C5A059]/40 resize-none"
                  />
                </div>
                <Button onClick={addConfession} className="w-full">
                  Registrar
                </Button>
              </div>
            </SacredCard>
          )}

          {confessions.length === 0 && (
            <SacredCard className="text-center">
              <p className="text-sm text-[#8A8A8E]">
                Nenhuma confissão registrada ainda.
              </p>
              <p className="text-xs text-[#6A6A6E] mt-1">
                Toque em &quot;+ Nova Confissão&quot; para adicionar.
              </p>
            </SacredCard>
          )}

          {confessions.map((c) => (
            <SacredCard key={c.id}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-serif text-base font-semibold text-[#C5A059]">
                    {formatDate(c.date)}
                  </p>
                  {c.notes && (
                    <p className="text-sm text-gray-400">{c.notes}</p>
                  )}
                </div>
                <button
                  onClick={() => removeConfession(c.id)}
                  className="text-[#6A6A6E] hover:text-red-400 transition-colors shrink-0 p-1"
                  title="Remover"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </SacredCard>
          ))}
        </div>
      )}
    </>
  );
}

function ExameTab({
  responses,
  expandedId,
  showConclusion,
  answered,
  total,
  onToggleExpand,
  onSetShowConclusion,
  onSetResponses,
  onHandleResponse,
}: {
  responses: Record<string, boolean>;
  expandedId: string | null;
  showConclusion: boolean;
  answered: number;
  total: number;
  onToggleExpand: (id: string | null) => void;
  onSetShowConclusion: (v: boolean) => void;
  onSetResponses: (r: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  onHandleResponse: (questionId: string, value: boolean) => void;
}) {
  if (showConclusion) {
    return (
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">Conclusão</span>
            <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#C5A059]">Exame de Consciência</h2>
        </div>
        <SacredCard variant="gradient">
          <SacredCardContent className="pt-4">
            <p className="whitespace-pre-line text-gray-200">{conclusionPrayer}</p>
          </SacredCardContent>
        </SacredCard>
        <Button
          className="mx-auto"
          onClick={() => {
            onSetShowConclusion(false);
            onSetResponses({});
            onToggleExpand(null);
          }}
        >
          Recomeçar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-[#8A8A8E]">{answered}/{total}</span>
        <div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#C5A059] transition-all"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {examenItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const allAnswered = item.questions.every((_, i) => responses[`${item.id}-q${i}`] !== undefined);

          return (
            <SacredCard
              key={item.id}
              onClick={() => onToggleExpand(isExpanded ? null : item.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <SacredCardTitle className="text-sm flex-1 pr-2">
                  {item.commandment}
                </SacredCardTitle>
                <div className="flex items-center gap-2 shrink-0">
                  {allAnswered && !isExpanded && (
                    <span className="text-[10px] text-green-400">✓</span>
                  )}
                  <span className={`text-[#8A8A8E] text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
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
                            <button
                              onClick={(e) => { e.stopPropagation(); onHandleResponse(qid, true); }}
                              className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-colors ${
                                value === true
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-white/5 text-gray-400 hover:bg-red-500/10 border border-white/5'
                              }`}
                            >
                              Sim
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); onHandleResponse(qid, false); }}
                              className={`flex-1 rounded-xl py-1.5 text-xs font-medium transition-colors ${
                                value === false
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                  : 'bg-white/5 text-gray-400 hover:bg-green-500/10 border border-white/5'
                              }`}
                            >
                              Não
                            </button>
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

      {answered === total && (
        <Button
          size="lg"
          className="mx-auto"
          onClick={() => onSetShowConclusion(true)}
        >
          Ver Ato de Contrição
        </Button>
      )}
    </div>
  );
}

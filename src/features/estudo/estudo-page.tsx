'use client';

import { useState } from 'react';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { SacredCard, SacredCardTitle } from '@/components/ui/sacred-card';
import { FontSizeControl } from '@/components/ui/font-size-control';
import { formationModules } from '@/data/formation';
import { faqCategories } from '@/data/faq';
import type { FormationModule, FormationLesson, FaqCategory } from '@/types/estudo';

const levelColors: Record<FormationModule['level'], string> = {
  'Iniciação': '#7FB069',
  'Fundamentos': '#4A90D9',
  'Aprofundamento': '#C5A059',
  'Espiritualidade': '#C0556E',
};

const moduleIcons: Record<string, React.ReactNode> = {
  sprout: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  flame: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
};

function FormationView() {
  const [selectedModule, setSelectedModule] = useState<FormationModule | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<FormationLesson | null>(null);

  const backButton = (onClick: () => void) => (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-[#C5A059] hover:text-[#D4B87A] transition-colors"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Voltar
    </button>
  );

  if (selectedLesson && selectedModule) {
    return (
      <div className="space-y-5">
        {backButton(() => setSelectedLesson(null))}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-[#C5A059] uppercase tracking-wide">
            {selectedLesson.title}
          </h2>
        </div>

        <SacredCard variant="accent">
          <p className="text-base md:text-lg leading-relaxed text-gray-300">{selectedLesson.intro}</p>
        </SacredCard>

        <div className="space-y-3">
          <SacredCard variant="default">
            <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
              <span className="text-base">📖</span>
              <span className="font-serif text-sm uppercase tracking-wider font-semibold">Catecismo</span>
            </div>
            <p className="text-sm text-gray-200 whitespace-pre-line">
              {selectedLesson.catecismo.join('\n')}
            </p>
          </SacredCard>

          <SacredCard variant="default">
            <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
              <span className="text-base">✝️</span>
              <span className="font-serif text-sm uppercase tracking-wider font-semibold">Sagrada Escritura</span>
            </div>
            <p className="text-sm text-gray-200 whitespace-pre-line">
              {selectedLesson.escritura.join('\n')}
            </p>
          </SacredCard>

          <SacredCard variant="default">
            <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
              <span className="text-base">📚</span>
              <span className="font-serif text-sm uppercase tracking-wider font-semibold">Para aprofundar</span>
            </div>
            <ul className="space-y-1.5">
              {selectedLesson.aprofundar.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-200 leading-relaxed">
                  <span className="text-[#C5A059]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SacredCard>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return (
      <div className="space-y-5">
        {backButton(() => setSelectedModule(null))}
        <div className="text-center space-y-2">
          <h2 className="font-serif text-xl font-bold text-[#C5A059]">{selectedModule.title}</h2>
          <p className="text-xs text-[#8A8A8E]">{selectedModule.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {selectedModule.lessons.map((lesson) => (
            <SacredCard
              key={lesson.id}
              variant="default"
              className="cursor-pointer hover:border-[#C5A059]/30 transition-colors"
              onClick={() => setSelectedLesson(lesson)}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059]">
                  {lesson.title}
                </h3>
                <svg className="w-4 h-4 text-[#C5A059]/60 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </SacredCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SacredCard variant="gradient">
        <SacredCardTitle>Aprofunde sua fé</SacredCardTitle>
        <p className="text-sm text-gray-300 leading-relaxed">
          Uma rota organizada e progressiva, baseada principalmente no Catecismo da Igreja Católica,
          Sagrada Escritura e outras fontes oficiais da Igreja.
        </p>
      </SacredCard>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {formationModules.map((module) => (
          <SacredCard
            key={module.id}
            variant="default"
            className="cursor-pointer hover:border-[#C5A059]/30 transition-colors"
            onClick={() => setSelectedModule(module)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ color: levelColors[module.level], backgroundColor: `${levelColors[module.level]}1A` }}
              >
                {moduleIcons[module.icon]}
              </span>
              <span
                className="text-[10px] uppercase tracking-wider font-semibold border rounded-full px-2 py-0.5"
                style={{ color: levelColors[module.level], borderColor: `${levelColors[module.level]}40` }}
              >
                {module.level}
              </span>
            </div>
            <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] mb-1">
              {module.title}
            </h3>
            <p className="text-xs text-[#8A8A8E] leading-relaxed">{module.subtitle}</p>
            <p className="text-[10px] text-[#C5A059]/60 mt-2">
              {module.lessons.length} {module.lessons.length === 1 ? 'lição' : 'lições'}
            </p>
          </SacredCard>
        ))}
      </div>
    </div>
  );
}

function FaqView() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>(faqCategories[0]);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <PillTabBar
        tabs={faqCategories.map((c) => ({ key: c.id, label: c.label }))}
        activeKey={activeCategory.id}
        onSelect={(key) => {
          setActiveCategory(faqCategories.find((c) => c.id === key) ?? faqCategories[0]);
          setOpenQuestion(null);
        }}
        className="mx-auto"
      />

      <div className="space-y-3">
        {activeCategory.questions.map((item) => {
          const isOpen = openQuestion === item.id;
          return (
            <SacredCard
              key={item.id}
              variant={isOpen ? 'accent' : 'default'}
              className="cursor-pointer transition-colors"
              onClick={() => setOpenQuestion(isOpen ? null : item.id)}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-sm md:text-base font-semibold text-[#C5A059] font-bold">
                  {item.question}
                </h3>
                <svg
                  className={`w-4 h-4 text-[#C5A059]/70 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[rgba(197,160,89,0.1)]">
                  <p className="text-sm md:text-base leading-relaxed text-gray-300">{item.answer}</p>
                  {item.source && (
                    <p className="text-[10px] text-[#C5A059]/70 mt-2 font-serif italic">
                      Fonte: {item.source}
                    </p>
                  )}
                </div>
              )}
            </SacredCard>
          );
        })}
      </div>
    </div>
  );
}

export function EstudoPage() {
  const [activeArea, setActiveArea] = useState('formacao');

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A8E]">
            Formação
          </span>
          <span className="h-px w-6 bg-[rgba(197,160,89,0.2)]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#C5A059]">
          Estudo
        </h1>
        <div className="flex justify-center pt-1">
          <FontSizeControl />
        </div>
      </div>

      <PillTabBar
        tabs={[
          { key: 'formacao', label: 'Formação', icon: '✝️' },
          { key: 'faq', label: 'Perguntas e Respostas', icon: '❓' },
        ]}
        activeKey={activeArea}
        onSelect={(key) => setActiveArea(key)}
        className="mx-auto"
      />

      {activeArea === 'formacao' && <FormationView />}
      {activeArea === 'faq' && (
        <FaqView />
      )}
    </div>
  );
}

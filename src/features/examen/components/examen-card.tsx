'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ExamenItem } from '@/types/examen';

interface ExamenCardProps {
  item: ExamenItem;
  responses: Record<string, boolean>;
  onResponse: (questionId: string, value: boolean) => void;
  expanded: boolean;
  onToggle: () => void;
}

export function ExamenCard({
  item,
  responses,
  onResponse,
  expanded,
  onToggle,
}: ExamenCardProps) {
  const questionIds = item.questions.map((_, i) => `${item.id}-q${i}`);
  const allAnswered = questionIds.every((qid) => responses[qid] !== undefined);

  return (
    <Card>
      <CardHeader>
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between text-left"
        >
          <CardTitle className="text-base pr-4">{item.commandment}</CardTitle>
          <span className={`shrink-0 text-sm transition-transform ${expanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        {allAnswered && !expanded && (
          <p className="text-xs text-success mt-1">✓ Respondido</p>
        )}
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {item.questions.map((question, i) => {
              const qid = `${item.id}-q${i}`;
              const value = responses[qid];
              return (
                <div key={qid} className="space-y-1.5">
                  <p className="text-sm text-text">{question}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onResponse(qid, true)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                        value === true
                          ? 'bg-error/20 text-error border border-error/40'
                          : 'bg-surfaceAlt text-textMuted hover:bg-error/10'
                      }`}
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => onResponse(qid, false)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                        value === false
                          ? 'bg-success/20 text-success border border-success/40'
                          : 'bg-surfaceAlt text-textMuted hover:bg-success/10'
                      }`}
                    >
                      Não
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg bg-primaryLight/30 p-3">
            <p className="text-xs text-primary italic leading-relaxed">
              {item.reflection}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

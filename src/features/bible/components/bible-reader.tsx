'use client';

import { useEffect, useReducer, useState } from 'react';
import { fetchBibleChapter } from '@/services/bibleService';
import { BIBLE_BOOKS_MAP } from '@/data/bible-versions';
import type { BibleChapter } from '@/types/bible';

const HIGHLIGHTS_KEY = 'lumen_bible_highlights';

function loadHighlights(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(HIGHLIGHTS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveHighlights(highlights: Record<string, boolean>) {
  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(highlights));
}

function verseKey(bookId: string, chapter: number, verse: number) {
  return `${bookId}-${chapter}-${verse}`;
}

interface BibleReaderProps {
  versionId: string;
  bookId: string;
  chapter: number;
  onBack: () => void;
  onChapterChange: (chapter: number) => void;
}

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: BibleChapter };

type Action =
  | { type: 'start' }
  | { type: 'success'; data: BibleChapter }
  | { type: 'error'; message: string };

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'start': return { status: 'loading' };
    case 'success': return { status: 'ready', data: action.data };
    case 'error': return { status: 'error', message: action.message };
  }
}

export function BibleReader({ versionId, bookId, chapter, onBack, onChapterChange }: BibleReaderProps) {
  const [state, dispatch] = useReducer(reducer, { status: 'loading' });
  const [highlights, setHighlights] = useState<Record<string, boolean>>(() => loadHighlights());

  const book = BIBLE_BOOKS_MAP.get(bookId);

  useEffect(() => {
    let cancelled = false;

    fetchBibleChapter(versionId, bookId, chapter)
      .then((result) => {
        if (!cancelled) dispatch({ type: 'success', data: result });
      })
      .catch((err) => {
        if (!cancelled) dispatch({
          type: 'error',
          message: err instanceof Error ? err.message : 'Erro ao carregar capítulo',
        });
      });

    return () => { cancelled = true; };
  }, [versionId, bookId, chapter]);

  function toggleHighlight(verseNumber: number) {
    const key = verseKey(bookId, chapter, verseNumber);
    setHighlights((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      saveHighlights(next);
      return next;
    });
  }

  if (state.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
        <p className="text-sm text-[#6A6A6E]">Carregando capítulo...</p>
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-sm text-red-400 text-center">{state.message}</p>
        <button onClick={onBack} className="text-sm text-[#C5A059] underline">
          Voltar
        </button>
      </div>
    );
  }

  if (!book) return null;

  const { data } = state;

  return (
    <div className="flex flex-col gap-6">
      <button onClick={onBack} className="flex items-center gap-2 text-[#6A6A6E] hover:text-[#C5A059] transition-colors self-start">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
        </svg>
        <span className="text-sm">{book.name}</span>
      </button>

      <div className="text-center">
        <h2 className="font-serif text-xl sm:text-2xl tracking-[0.15em] text-[#C5A059] font-semibold">
          {book.name}
        </h2>
        <p className="text-sm text-[#6A6A6E] mt-1">Capítulo {chapter}</p>
      </div>

      <div className="bg-[#16161A] rounded-[24px] p-5 sm:p-8 md:p-10 border border-white/[0.03] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-4">
          {data.verses.map((verse) => {
            const isHighlighted = !!highlights[verseKey(bookId, chapter, verse.number)];
            return (
              <div
                key={verse.number}
                onClick={() => toggleHighlight(verse.number)}
                className={`flex gap-3 rounded-xl px-3 py-2 -mx-3 cursor-pointer transition-all duration-200 ${
                  isHighlighted
                    ? 'bg-[#C5A059]/10 border border-[#C5A059]/20'
                    : 'hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <span className={`text-sm font-mono font-semibold mt-0.5 shrink-0 w-6 text-right ${
                  isHighlighted ? 'text-[#C5A059]' : 'text-[#C5A059]/60'
                }`}>
                  {verse.number}
                </span>
                <p className="text-sm sm:text-base leading-relaxed text-gray-200 flex-1" style={{ lineHeight: '1.7' }}>
                  {verse.text}
                </p>
                {isHighlighted && (
                  <svg className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => chapter > 1 && onChapterChange(chapter - 1)}
          disabled={chapter <= 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16161A] border border-white/[0.05] text-sm text-gray-300 hover:border-[#C5A059]/20 hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Anterior
        </button>

        <span className="text-sm text-[#6A6A6E] font-mono">
          {chapter} / {book.chapters}
        </span>

        <button
          onClick={() => chapter < book.chapters && onChapterChange(chapter + 1)}
          disabled={chapter >= book.chapters}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16161A] border border-white/[0.05] text-sm text-gray-300 hover:border-[#C5A059]/20 hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Próximo
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PillTabBar } from '@/components/ui/pill-tab-bar';
import { BIBLE_VERSIONS, BIBLE_BOOKS } from '@/data/bible-versions';
import { isBookAvailableForVersion } from '@/services/bibleService';
import { BibleReader } from '@/features/bible/components/bible-reader';
import type { BibleVersion, BibleViewMode } from '@/types/bible';

const TESTAMENT_TABS = [
  { key: 'AT', label: 'Antigo Testamento' },
  { key: 'NT', label: 'Novo Testamento' },
];

export function BiblePage() {
  const [viewMode, setViewMode] = useState<BibleViewMode>('versions');
  const [selectedVersion, setSelectedVersion] = useState<BibleVersion | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [testament, setTestament] = useState<'AT' | 'NT'>('AT');

  const filteredBooks = BIBLE_BOOKS.filter((b) => {
    if (b.testament !== testament) return false;
    if (selectedVersion && !isBookAvailableForVersion(selectedVersion.id, b.id)) return false;
    return true;
  });

  function handleSelectVersion(version: BibleVersion) {
    setSelectedVersion(version);
    setViewMode('books');
  }

  function handleSelectBook(bookId: string) {
    setSelectedBookId(bookId);
    setSelectedChapter(1);
    setViewMode('chapters');
  }

  function handleSelectChapter(chapter: number) {
    setSelectedChapter(chapter);
    setViewMode('reading');
  }

  function handleBack() {
    if (viewMode === 'reading') setViewMode('chapters');
    else if (viewMode === 'chapters') setViewMode('books');
    else if (viewMode === 'books') {
      setSelectedVersion(null);
      setViewMode('versions');
    }
  }

  function getLanguageLabel(lang: string) {
    switch (lang) {
      case 'pt-br': return 'Português';
      case 'en': return 'Inglês';
      case 'la': return 'Latim';
      default: return lang;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
        {viewMode !== 'versions' ? (
          <button onClick={handleBack} className="flex items-center gap-2 text-[#6A6A6E] hover:text-[#C5A059] transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
          </button>
        ) : null}
        <div className="flex flex-col">
          <span className="font-serif text-xs tracking-widest text-[#C5A059] uppercase font-medium">
            {selectedVersion ? selectedVersion.name : 'Bíblia Sagrada'}
          </span>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif">
            {viewMode === 'versions' && 'Escolha uma versão'}
            {viewMode === 'books' && 'Livros'}
            {viewMode === 'chapters' && 'Capítulos'}
            {viewMode === 'reading' && 'Leitura'}
          </h1>
        </div>
      </header>

      {viewMode === 'versions' && (
        <>
          <div className="flex flex-col gap-3">
            {BIBLE_VERSIONS.map((version) => (
              <button
                key={version.id}
                onClick={() => handleSelectVersion(version)}
                className="w-full bg-[#16161A] rounded-[20px] p-5 border border-white/[0.03] hover:border-[#C5A059]/20 transition-all text-left group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-mono tracking-widest text-[#C5A059]/60 uppercase">
                      {version.shortName}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-gray-100 font-semibold group-hover:text-[#C5A059] transition-colors">
                      {version.name}
                    </h3>
                    <p className="text-xs text-[#6A6A6E]">
                      {version.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-[#6A6A6E]">
                      {getLanguageLabel(version.language)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {viewMode === 'books' && (
        <>
          <PillTabBar
            tabs={TESTAMENT_TABS}
            activeKey={testament}
            onSelect={(key) => setTestament(key as 'AT' | 'NT')}
          />

          <div className="flex flex-col gap-2">
            {filteredBooks.map((book) => (
              <button
                key={book.id}
                onClick={() => handleSelectBook(book.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-[#16161A] rounded-xl border border-white/[0.03] hover:border-[#C5A059]/20 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-[#C5A059]/50 w-8 text-right shrink-0">
                    {book.abbrev}
                  </span>
                  <span className="text-sm text-gray-200 group-hover:text-[#C5A059] transition-colors">
                    {book.name}
                  </span>
                </div>
                <span className="text-xs text-[#6A6A6E] font-mono">
                  {book.chapters} {book.chapters === 1 ? 'cap.' : 'cap.'}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {viewMode === 'chapters' && selectedBookId && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {Array.from({ length: BIBLE_BOOKS.find((b) => b.id === selectedBookId)?.chapters ?? 1 }, (_, i) => i + 1).map((ch) => (
              <button
                key={ch}
                onClick={() => handleSelectChapter(ch)}
                className="aspect-square flex items-center justify-center rounded-xl bg-[#16161A] border border-white/[0.03] hover:border-[#C5A059]/20 hover:bg-[#5C0F1B]/20 transition-all text-sm text-gray-300 hover:text-[#C5A059] font-mono"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'reading' && selectedVersion && selectedBookId && (
        <BibleReader
          versionId={selectedVersion.id}
          bookId={selectedBookId}
          chapter={selectedChapter}
          onBack={handleBack}
          onChapterChange={setSelectedChapter}
        />
      )}
    </div>
  );
}

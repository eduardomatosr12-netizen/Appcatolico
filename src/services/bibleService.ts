import type { BibleChapter, BibleVerse } from '@/types/bible';
import { BIBLE_BOOKS_MAP } from '@/data/bible-versions';

const MIDVASH_BASE = 'https://api.midvash.com/v1';
const AVE_MARIA_URL = 'https://raw.githubusercontent.com/fidalgobr/bibliaAveMariaJSON/main/bibliaAveMaria.json';

let aveMariaData: Record<string, Record<string, Record<string, string>>> | null = null;

async function loadAveMariaData(): Promise<typeof aveMariaData> {
  if (aveMariaData) return aveMariaData;

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('bible-ave-maria');
    if (cached) {
      try {
        aveMariaData = JSON.parse(cached);
        return aveMariaData;
      } catch {
        // ignore parse error
      }
    }
  }

  const res = await fetch(AVE_MARIA_URL);
  if (!res.ok) throw new Error('Erro ao carregar Bíblia Ave Maria');

  const data = await res.json();
  aveMariaData = data;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('bible-ave-maria', JSON.stringify(data));
    } catch {
      // localStorage full
    }
  }

  return aveMariaData;
}

function getCachedChapter(versionId: string, bookId: string, chapter: number): BibleChapter | null {
  if (typeof window === 'undefined') return null;
  const key = `bible-ch-${versionId}-${bookId}-${chapter}`;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    return JSON.parse(cached) as BibleChapter;
  } catch {
    return null;
  }
}

function setCachedChapter(chapter: BibleChapter): void {
  if (typeof window === 'undefined') return;
  const key = `bible-ch-${chapter.version}-${chapter.book}-${chapter.chapter}`;
  try {
    localStorage.setItem(key, JSON.stringify(chapter));
  } catch {
    // localStorage full
  }
}

async function fetchMidvashChapter(
  versionId: string,
  bookMidvashSlug: string,
  chapter: number,
): Promise<BibleChapter> {
  const url = `${MIDVASH_BASE}/${versionId}/${bookMidvashSlug}/${chapter}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao buscar ${versionId} ${bookMidvashSlug} ${chapter}`);

  const data = await res.json();
  const apiData = data.data;

  const book = BIBLE_BOOKS_MAP.get(apiData.book.toUpperCase()) ??
    Array.from(BIBLE_BOOKS_MAP.values()).find(
      (b) => b.midvashSlug === bookMidvashSlug,
    );

  const verses: BibleVerse[] = (apiData.verses ?? []).map((v: string, i: number) => ({
    number: i + 1,
    text: v,
  }));

  const result: BibleChapter = {
    version: versionId,
    book: book?.id ?? apiData.book.toUpperCase(),
    bookName: apiData.bookName ?? book?.name ?? apiData.book,
    chapter: apiData.chapter,
    verses,
  };

  setCachedChapter(result);
  return result;
}

async function fetchAveMariaChapter(
  bookId: string,
  chapter: number,
): Promise<BibleChapter> {
  const data = await loadAveMariaData();
  if (!data) throw new Error('Dados da Bíblia Ave Maria não disponíveis');

  const book = BIBLE_BOOKS_MAP.get(bookId);
  if (!book) throw new Error(`Livro ${bookId} não encontrado`);

  const bookData = data[bookId] ?? data[book.name] ?? data[book.abbrev];
  if (!bookData) throw new Error(`Livro ${book.name} não disponível na Bíblia Ave Maria`);

  const chapterData = bookData[String(chapter)];
  if (!chapterData) throw new Error(`Capítulo ${chapter} não disponível`);

  const verses: BibleVerse[] = Object.entries(chapterData)
    .map(([num, text]) => ({
      number: parseInt(num, 10),
      text: String(text),
    }))
    .sort((a, b) => a.number - b.number);

  const result: BibleChapter = {
    version: 'ave-maria',
    book: bookId,
    bookName: book.name,
    chapter,
    verses,
  };

  setCachedChapter(result);
  return result;
}

export async function fetchBibleChapter(
  versionId: string,
  bookId: string,
  chapter: number,
): Promise<BibleChapter> {
  const cached = getCachedChapter(versionId, bookId, chapter);
  if (cached) return cached;

  if (versionId === 'ave-maria') {
    return fetchAveMariaChapter(bookId, chapter);
  }

  const book = BIBLE_BOOKS_MAP.get(bookId);
  if (!book?.midvashSlug) {
    throw new Error(`Livro ${bookId} não disponível nesta versão`);
  }

  return fetchMidvashChapter(versionId, book.midvashSlug, chapter);
}

export function isBookAvailableForVersion(versionId: string, bookId: string): boolean {
  if (versionId === 'ave-maria') return true;
  const book = BIBLE_BOOKS_MAP.get(bookId);
  if (!book) return false;
  if (book.deuterocanonical) return false;
  return !!book.midvashSlug;
}

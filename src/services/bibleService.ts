import type { BibleChapter, BibleVerse } from '@/types/bible';
import { BIBLE_BOOKS_MAP } from '@/data/bible-versions';

const MIDVASH_BASE = 'https://api.midvash.com/v1';
const AVE_MARIA_URL = 'https://raw.githubusercontent.com/fidalgobr/bibliaAveMariaJSON/main/bibliaAveMaria.json';

const BOOK_ID_TO_AVEMARIA_NAME: Record<string, string> = {
  // AT - Pentateuco
  GEN: 'Gênesis',
  EXO: 'Êxodo',
  LEV: 'Levítico',
  NUM: 'Números',
  DEU: 'Deuteronômio',
  // AT - Históricos
  JOS: 'Josué',
  JDG: 'Juízes',
  RUT: 'Rute',
  '1SA': 'I Samuel',
  '2SA': 'II Samuel',
  '1KI': 'I Reis',
  '2KI': 'II Reis',
  '1CH': 'I Crônicas',
  '2CH': 'II Crônicas',
  EZR: 'Esdras',
  NEH: 'Neemias',
  TOB: 'Tobias',
  JDT: 'Judite',
  EST: 'Ester',
  '1MA': 'I Macabeus',
  '2MA': 'II Macabeus',
  // AT - Poéticos
  JOB: 'Jó',
  PSA: 'Salmos',
  PRO: 'Provérbios',
  ECC: 'Eclesiastes',
  SOL: 'Cântico dos Cânticos',
  WIS: 'Sabedoria',
  SIR: 'Eclesiástico',
  // AT - Profetas
  ISA: 'Isaías',
  JER: 'Jeremias',
  LAM: 'Lamentações',
  BAR: 'Baruc',
  EZK: 'Ezequiel',
  DAN: 'Daniel',
  HOS: 'Oséias',
  JOL: 'Joel',
  AMO: 'Amós',
  OBA: 'Abdias',
  JON: 'Jonas',
  MIC: 'Miquéias',
  NAM: 'Naum',
  HAB: 'Habacuc',
  ZEP: 'Sofonias',
  HAG: 'Ageu',
  ZEC: 'Zacarias',
  MAL: 'Malaquias',
  // NT - Evangelhos
  MAT: 'São Mateus',
  MRK: 'São Marcos',
  LUK: 'São Lucas',
  JHN: 'São João',
  // NT - Atos e Epístolas
  ACT: 'Atos dos Apóstolos',
  ROM: 'Romanos',
  '1CO': 'I Coríntios',
  '2CO': 'II Coríntios',
  GAL: 'Gálatas',
  EPH: 'Efésios',
  PHP: 'Filipenses',
  COL: 'Colossenses',
  '1TH': 'I Tessalonicenses',
  '2TH': 'II Tessalonicenses',
  '1TI': 'I Timóteo',
  '2TI': 'II Timóteo',
  TIT: 'Tito',
  PHM: 'Filêmon',
  HEB: 'Hebreus',
  JAS: 'São Tiago',
  '1PE': 'I São Pedro',
  '2PE': 'II São Pedro',
  '1JN': 'I São João',
  '2JN': 'II São João',
  '3JN': 'III São João',
  JDE: 'São Judas',
  // NT - Apocalipse
  REV: 'Apocalipse',
};

interface AveMariaBook {
  nome: string;
  capitulos: { capitulo: number; versiculos: { versiculo: number; texto: string }[] }[];
}

interface AveMariaData {
  antigoTestamento: AveMariaBook[];
  novoTestamento: AveMariaBook[];
}

let aveMariaData: AveMariaData | null = null;

async function loadAveMariaData(): Promise<AveMariaData> {
  if (aveMariaData) return aveMariaData;

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('bible-ave-maria');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as AveMariaData;
        if (parsed.antigoTestamento && parsed.novoTestamento) {
          aveMariaData = parsed;
          return aveMariaData;
        }
      } catch {
        // ignore parse error
      }
      localStorage.removeItem('bible-ave-maria');
    }
  }

  const res = await fetch(AVE_MARIA_URL);
  if (!res.ok) throw new Error('Erro ao carregar Bíblia Ave Maria');

  const data: AveMariaData = await res.json();
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

  const allBooks = [...data.antigoTestamento, ...data.novoTestamento];
  const aveMariaName = BOOK_ID_TO_AVEMARIA_NAME[bookId];
  if (!aveMariaName) throw new Error(`Livro ${bookId} não possui mapeamento para a Bíblia Ave Maria`);

  const bookData = allBooks.find((b) => b.nome === aveMariaName);

  if (!bookData) throw new Error(`Livro "${aveMariaName}" não disponível na Bíblia Ave Maria`);

  const chapterData = bookData.capitulos.find((c) => c.capitulo === chapter);
  if (!chapterData) throw new Error(`Capítulo ${chapter} não disponível`);

  const verses: BibleVerse[] = chapterData.versiculos.map((v) => ({
    number: v.versiculo,
    text: v.texto,
  }));

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

export function isBookAvailableForVersion(_versionId: string, _bookId: string): boolean {
  return true;
}

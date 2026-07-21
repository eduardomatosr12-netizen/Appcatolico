export interface BibleVersion {
  id: string;
  name: string;
  shortName: string;
  language: 'pt-br' | 'en' | 'la';
  source: 'midvash' | 'local-json';
  category: 'catolica' | 'protestante';
  description: string;
}

export interface BibleBook {
  id: string;
  name: string;
  abbrev: string;
  testament: 'AT' | 'NT';
  chapters: number;
  midvashSlug?: string;
  deuterocanonical?: boolean;
}

export interface BibleChapter {
  version: string;
  book: string;
  bookName: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleVerse {
  number: number;
  text: string;
}

export type BibleViewMode = 'versions' | 'books' | 'chapters' | 'reading';

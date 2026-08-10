import type {
  RailwayLiturgyResponse,
  DailyLiturgy,
  GospelAcclamation,
  PsalmVerse,
} from '@/types/liturgy';

interface LiturgyEnrichment {
  acclamation: GospelAcclamation | null;
  psalmReference: string | null;
}

interface PsalmGroup {
  start: number;
  end: number;
}

const BASE_URL = 'https://liturgia.up.railway.app/v2/';
const ACCLAMATION_URL =
  'https://www.agenciaarcanjo.com.br/api.php?tipo=liturgia&data=';

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function buildDateParams(date: Date) {
  return {
    dia: date.getDate(),
    mes: date.getMonth() + 1,
    ano: date.getFullYear(),
  };
}

/**
 * Busca a liturgia diária da API pública de liturgia católica.
 * Usa `If-None-Match` via ETag se disponível em localStorage.
 * Também busca aclamação ao evangelho e a referência completa do salmo
 * (com grupos de versículos) em fonte secundária.
 */
export async function fetchLiturgy(date: Date): Promise<DailyLiturgy> {
  const params = buildDateParams(date);
  const url = `${BASE_URL}?${new URLSearchParams({ dia: String(params.dia), mes: pad(params.mes), ano: String(params.ano) }).toString()}`;

  const headers: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`liturgia-etag-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
    if (stored) {
      headers['If-None-Match'] = stored;
    }
  }

  const enrichmentPromise = Promise.resolve(
    getCachedEnrichment(date) ?? fetchAndCacheEnrichment(date),
  );

  const res = await fetch(url, { headers });

  let raw: RailwayLiturgyResponse | null = null;

  if (res.status === 304 && typeof window !== 'undefined') {
    const cached = localStorage.getItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
    if (cached) {
      raw = JSON.parse(cached) as RailwayLiturgyResponse;
    }
  }

  if (!raw) {
    if (!res.ok) {
      throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
    }

    const etag = res.headers.get('ETag');
    const data: RailwayLiturgyResponse = await res.json();

    if (!data || !data.data) {
      throw new Error('Nenhum dado litúrgico encontrado para esta data.');
    }

    raw = data;

    if (etag && typeof window !== 'undefined') {
      localStorage.setItem(`liturgia-etag-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, etag);
      localStorage.setItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, JSON.stringify(data));
    }
  }

  const [enrichment, parsed] = await Promise.all([
    enrichmentPromise,
    Promise.resolve(parseLiturgyResponse(raw)),
  ]);

  return applyEnrichment(parsed, enrichment);
}

/**
 * Tenta carregar dados salvos localmente (fallback offline).
 */
export function getCachedLiturgy(date: Date): DailyLiturgy | null {
  const params = buildDateParams(date);
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
  if (cached) {
    try {
      const parsed = parseLiturgyResponse(JSON.parse(cached) as RailwayLiturgyResponse);
      return applyEnrichment(parsed, getCachedEnrichment(date));
    } catch {
      return null;
    }
  }
  return null;
}

function applyEnrichment(parsed: DailyLiturgy, enrichment: LiturgyEnrichment | null): DailyLiturgy {
  if (!enrichment) return parsed;

  if (enrichment.acclamation && parsed.gospel) {
    parsed.gospel.acclamation = enrichment.acclamation;
  }

  if (
    parsed.psalm &&
    enrichment.psalmReference &&
    psalmRefsMatch(parsed.psalm.reference, enrichment.psalmReference)
  ) {
    parsed.psalm.reference = normalizePsalmReference(enrichment.psalmReference);
    const stanzas = parsed.psalm.text
      .replace(/\r/g, '')
      .split('\n')
      .map((s) => s.replace(/^[—–\-•*\s]+/, '').trim())
      .filter(Boolean);
    const verses = buildPsalmVerses(stanzas, parsePsalmGroups(enrichment.psalmReference));
    if (verses.length) {
      parsed.psalm.verses = verses;
    }
  }

  return parsed;
}

function enrichmentCacheKey(date: Date): string {
  const params = buildDateParams(date);
  return `liturgia-enrichment-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`;
}

function decodeHtmlEntities(input: string): string {
  if (typeof document === 'undefined') return input;
  const el = document.createElement('textarea');
  el.innerHTML = input;
  return el.value;
}

function isAcclamationResponse(text: string): boolean {
  return /aleluia/i.test(text) || /Cristo/i.test(text) || /Senhor Jesus/i.test(text);
}

/**
 * Busca aclamação ao evangelho e a referência completa do salmo (com
 * grupos de versículos) na API da Agência Arcanjo. Retorna um objeto
 * com `null` nos campos indisponíveis para a data.
 */
async function fetchEnrichment(date: Date): Promise<LiturgyEnrichment> {
  const params = buildDateParams(date);
  const iso = `${params.ano}-${pad(params.mes)}-${pad(params.dia)}`;
  try {
    const res = await fetch(`${ACCLAMATION_URL}${iso}`);
    if (!res.ok) return { acclamation: null, psalmReference: null };
    const json = (await res.json()) as { evangelho?: string; salmo?: string };

    const acclamation = parseAcclamationFromHtml(json.evangelho);
    const psalmReference = json.salmo ? extractPsalmReference(json.salmo) : null;

    return { acclamation, psalmReference };
  } catch {
    return { acclamation: null, psalmReference: null };
  }
}

function parseAcclamationFromHtml(evangelhoHtml?: string): GospelAcclamation | null {
  if (!evangelhoHtml) return null;
  const matches = [...evangelhoHtml.matchAll(/<p>\s*-\s*([^<]*)<\/p>/g)].slice(0, 2);
  if (matches.length === 0) return null;

  const response = decodeHtmlEntities(matches[0][1].trim());
  if (!isAcclamationResponse(response)) return null;

  return {
    response,
    verse: matches[1] ? decodeHtmlEntities(matches[1][1].trim()) : '',
  };
}

function extractPsalmReference(salmoHtml: string): string | null {
  const paragraphs = [...salmoHtml.matchAll(/<p[^>]*>(.*?)<\/p>/g)]
    .map((m) => decodeHtmlEntities(m[1].replace(/<[^>]+>/g, '')).trim())
    .filter(Boolean);
  const ref = paragraphs.find((p) => /^Respons[óo]rio\b/i.test(p) || /^Sl\s*\d/i.test(p));
  if (!ref) return null;
  return ref.replace(/^Respons[óo]rio\s+/i, '').trim();
}

async function fetchAndCacheEnrichment(date: Date): Promise<LiturgyEnrichment> {
  const enrichment = await fetchEnrichment(date);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(enrichmentCacheKey(date), JSON.stringify(enrichment));
    } catch {
      // armazenamento indisponível: segue sem cache
    }
  }
  return enrichment;
}

function getCachedEnrichment(date: Date): LiturgyEnrichment | null {
  if (typeof window === 'undefined') return null;
  const cached = localStorage.getItem(enrichmentCacheKey(date));
  if (!cached) return null;
  try {
    return JSON.parse(cached) as LiturgyEnrichment;
  } catch {
    return null;
  }
}

/**
 * Confere se a referência resumida da railway (ex.: "Sl 111") corresponde
 * à referência completa da Arcanjo (ex.: "Sl 111(112),1-2.5-6.7-8.9 (R. 5a)").
 */
function psalmRefsMatch(railwayRef: string, fullRef: string): boolean {
  const numbers = (s: string) => (s.match(/\d+/g) ?? []).slice(0, 2);
  const a = numbers(railwayRef);
  const b = numbers(fullRef);
  if (a.length === 0 || b.length === 0) return false;
  return a[0] === b[0] || (a[1] != null && a[1] === b[0]) || (b[1] != null && a[0] === b[1]);
}

function normalizePsalmReference(reference: string): string {
  return reference.replace(/\s*\(R/i, '(R').trim();
}

/**
 * Interpreta os grupos de versículos da referência completa.
 * Ex.: "1-2.5-6.7-8.9" vira [{1,2},{5,6},{7,8},{9,9}].
 */
function parsePsalmGroups(reference: string): PsalmGroup[] {
  const commaIdx = reference.indexOf(',');
  if (commaIdx < 0) return [];
  const rest = reference
    .slice(commaIdx + 1)
    .split(/\s*\(/i)[0]
    .trim();
  return rest
    .split('.')
    .map((g) => g.trim())
    .filter(Boolean)
    .map((g): PsalmGroup | null => {
      const dash = g.indexOf('-');
      if (dash >= 0) {
        const start = parseInt(g.slice(0, dash), 10);
        const end = parseInt(g.slice(dash + 1).replace(/[^0-9]/g, ''), 10) || start;
        return Number.isFinite(start) && Number.isFinite(end) ? { start, end } : null;
      }
      const n = parseInt(g, 10);
      return Number.isFinite(n) ? { start: n, end: n } : null;
    })
    .filter((g): g is PsalmGroup => g !== null);
}

/**
 * Divide uma estrofe do salmo em `verseCount` versículos, escolhendo
 * cortes em finais de frase sempre que possível (fallback: último espaço
 * próximo do ponto médio).
 */
function splitStanzaIntoVerses(stanza: string, verseCount: number): string[] {
  const clean = stanza.trim();
  if (verseCount <= 1) return [clean];

  const boundaries: number[] = [];
  const boundaryRe = /[.!?…]+/g;
  let m: RegExpExecArray | null;
  while ((m = boundaryRe.exec(clean)) !== null) boundaries.push(m.index + m[0].length);

  const needed = verseCount - 1;
  let cuts = pickBestCuts(boundaries, clean.length, needed);

  if (cuts.length < needed) {
    const targets = Array.from({ length: needed }, (_, i) =>
      Math.round((clean.length * (i + 1)) / (needed + 1)),
    );
    const extra: number[] = [];
    for (const t of targets) {
      if (cuts.length + extra.length >= needed) break;
      const sp = clean.lastIndexOf(' ', t);
      if (sp > 0 && !cuts.includes(sp) && !extra.includes(sp)) extra.push(sp);
    }
    cuts = [...cuts, ...extra].sort((a, b) => a - b);
  }

  const verses: string[] = [];
  let start = 0;
  for (const cut of cuts) {
    if (cut > start) {
      const v = clean.slice(start, cut).trim();
      if (v) verses.push(v);
    }
    start = cut;
  }
  if (start < clean.length) {
    const last = clean.slice(start).trim();
    if (last) verses.push(last);
  }
  return verses.length ? verses : [clean];
}

/**
 * Escolhe as melhores posições de corte (das fornecidas) aproximando-as
 * das posições-alvo distribuídas uniformemente.
 */
function pickBestCuts(candidates: number[], length: number, count: number): number[] {
  const targets = Array.from({ length: count }, (_, i) => (length * (i + 1)) / (count + 1));
  const chosen: number[] = [];
  for (const t of targets) {
    let best = -1;
    let bestDist = Infinity;
    for (const c of candidates) {
      if (chosen.includes(c)) continue;
      const dist = Math.abs(c - t);
      if (dist < bestDist) {
        bestDist = dist;
        best = c;
      }
    }
    if (best >= 0) chosen.push(best);
  }
  return chosen.sort((a, b) => a - b);
}

/**
 * Divide um versículo em partes (idealmente em dois hemistíquios,
 * ou em três para versículos longos), marcando as cesuras.
 */
function splitVerseIntoParts(verse: string): string[] {
  const clean = verse.trim();
  const three = splitIntoThreeParts(clean);
  if (three) return three;

  const mid = Math.floor(clean.length / 2);
  const lowerBound = Math.floor(clean.length * 0.35);
  let splitAt = -1;
  const punct = /[;,.:!?]/g;
  let m: RegExpExecArray | null;
  while ((m = punct.exec(clean)) !== null) {
    if (m.index > mid) break;
    if (m.index >= lowerBound) splitAt = m.index + 1;
  }
  if (splitAt < lowerBound) splitAt = clean.lastIndexOf(' ', mid);
  if (splitAt < lowerBound) splitAt = clean.indexOf(' ', mid);
  if (splitAt < lowerBound) splitAt = mid;

  const first = clean.slice(0, splitAt).trim();
  const second = clean.slice(splitAt).trim();
  if (first && second) return [first, second];
  return [clean];
}

function splitIntoThreeParts(verse: string): string[] | null {
  if (verse.length < 100) return null;
  const boundaries: number[] = [];
  const re = /[,;:]+/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(verse)) !== null) boundaries.push(m.index + m[0].length);
  if (boundaries.length < 2) return null;
  const cuts = pickBestCuts(boundaries, verse.length, 2);
  if (cuts.length < 2) return null;
  const parts = [
    verse.slice(0, cuts[0]).trim(),
    verse.slice(cuts[0], cuts[1]).trim(),
    verse.slice(cuts[1]).trim(),
  ];
  if (parts.some((p) => p.length < 3)) return null;
  return parts;
}

function ensureFinalPeriod(text: string): string {
  if (/[.!?…”"'»]+$/.test(text)) return text;
  return `${text}.`;
}

/**
 * Constrói a lista de versículos numerados a partir das estrofes da
 * railway e dos grupos da referência completa. Quando o número de grupos
 * não coincide com o de estrofes, faz a numeração sequencial como fallback.
 */
function buildPsalmVerses(stanzas: string[], groups: PsalmGroup[]): PsalmVerse[] {
  const verses: PsalmVerse[] = [];

  const emitVerse = (number: number, text: string, endStanza: boolean) => {
    const parts = splitVerseIntoParts(text);
    parts[parts.length - 1] = ensureFinalPeriod(parts[parts.length - 1]);
    verses.push({ number, parts, endStanza });
  };

  if (groups.length === stanzas.length && groups.length > 0) {
    stanzas.forEach((stanza, i) => {
      const group = groups[i];
      const count = Math.max(1, group.end - group.start + 1);
      const verseTexts = splitStanzaIntoVerses(stanza, count);
      verseTexts.forEach((vt, j) => {
        emitVerse(group.start + j, vt, j === verseTexts.length - 1);
      });
    });
  } else {
    stanzas.forEach((stanza, i) => {
      emitVerse(i + 1, stanza, true);
    });
  }

  return verses;
}

function parseLiturgyResponse(api: RailwayLiturgyResponse): DailyLiturgy {
  const dateObj = parseDateBR(api.data);
  const dateStr = dateObj
    ? dateObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
    : api.data;

  const colorMap: Record<string, string> = {
    verde: 'Verde',
    branco: 'Branco',
    vermelho: 'Vermelho',
    roxo: 'Roxo',
    rosa: 'Rosa',
  };

  const firstReadingRaw = api.leituras.primeiraLeitura?.[0];
  const firstReading = firstReadingRaw
    ? {
        title: firstReadingRaw.titulo ?? 'Primeira Leitura',
        text: firstReadingRaw.texto,
        reference: firstReadingRaw.referencia,
      }
    : undefined;

  const psalmRaw = api.leituras.salmo?.[0];
  const psalm = psalmRaw
    ? {
        title: 'Salmo Responsorial',
        text: psalmRaw.texto,
        reference: psalmRaw.referencia,
        response: psalmRaw.refrao ?? '',
      }
    : undefined;

  const secondReadingRaw = api.leituras.segundaLeitura?.[0];
  const secondReading = secondReadingRaw
    ? {
        title: secondReadingRaw.titulo ?? 'Segunda Leitura',
        text: secondReadingRaw.texto,
        reference: secondReadingRaw.referencia,
      }
    : undefined;

  const gospelRaw = api.leituras.evangelho?.[0];
  const gospel = gospelRaw
    ? {
        title: gospelRaw.titulo ?? 'Evangelho',
        text: gospelRaw.texto,
        reference: gospelRaw.referencia,
      }
    : undefined;

  return {
    date: dateStr,
    liturgicalSeason: api.liturgia,
    liturgicalColor: colorMap[api.cor.toLowerCase()] ?? api.cor,
    celebrationName: api.liturgia,
    firstReading,
    psalm,
    secondReading,
    gospel,
  };
}

function parseDateBR(dateStr: string): Date | null {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  return new Date(year, month - 1, day);
}

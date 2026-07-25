import type { RailwayLiturgyResponse, DailyLiturgy } from '@/types/liturgy';

const BASE_URL = 'https://liturgia.up.railway.app/v2/';

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

  const res = await fetch(url, { headers });

  if (res.status === 304 && typeof window !== 'undefined') {
    const cached = localStorage.getItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
    if (cached) {
      return parseLiturgyResponse(JSON.parse(cached) as RailwayLiturgyResponse);
    }
  }

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
  }

  const etag = res.headers.get('ETag');
  const data: RailwayLiturgyResponse = await res.json();

  if (!data || !data.data) {
    throw new Error('Nenhum dado litúrgico encontrado para esta data.');
  }

  if (etag && typeof window !== 'undefined') {
    localStorage.setItem(`liturgia-etag-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, etag);
    localStorage.setItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, JSON.stringify(data));
  }

  return parseLiturgyResponse(data);
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
      return parseLiturgyResponse(JSON.parse(cached) as RailwayLiturgyResponse);
    } catch {
      return null;
    }
  }
  return null;
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

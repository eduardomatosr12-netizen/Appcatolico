import type { LiturgyApiResponse, DailyLiturgy } from '@/types/liturgy';

const BASE_URL = 'https://liturgia.cloudhub.ia.br/v1/liturgia';

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
 * Busca a liturgia diária da API pública CNBB.
 * Usa `If-None-Match` via ETag se disponível em localStorage.
 */
export async function fetchLiturgy(date: Date): Promise<DailyLiturgy> {
  const params = buildDateParams(date);
  const url = `${BASE_URL}?${new URLSearchParams(params as any).toString()}`;

  const stored = localStorage.getItem(`liturgia-etag-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
  const headers: Record<string, string> = {};
  if (stored) {
    headers['If-None-Match'] = stored;
  }

  const res = await fetch(url, { headers });

  if (res.status === 304) {
    const cached = localStorage.getItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
    if (cached) {
      return parseLiturgyApiResponse(JSON.parse(cached) as LiturgyApiResponse);
    }
  }

  if (!res.ok) {
    throw new Error(`Erro HTTP ${res.status}: ${res.statusText}`);
  }

  const etag = res.headers.get('ETag');
  const data: LiturgyApiResponse[] = await res.json();

  if (!data || data.length === 0) {
    throw new Error('Nenhum dado litúrgico encontrado para esta data.');
  }

  if (etag) {
    localStorage.setItem(`liturgia-etag-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, etag);
    localStorage.setItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`, JSON.stringify(data[0]));
  }

  return parseLiturgyApiResponse(data[0]);
}

/**
 * Tenta carregar dados salvos localmente (fallback offline).
 */
export function getCachedLiturgy(date: Date): DailyLiturgy | null {
  const params = buildDateParams(date);
  const cached = localStorage.getItem(`liturgia-data-${params.ano}-${pad(params.mes)}-${pad(params.dia)}`);
  if (cached) {
    try {
      return parseLiturgyApiResponse(JSON.parse(cached) as LiturgyApiResponse);
    } catch {
      return null;
    }
  }
  return null;
}

function parseLiturgyApiResponse(api: LiturgyApiResponse): DailyLiturgy {
  const celebr = api.celebracoes.find((c) => c.principal) ?? api.celebracoes[0];

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

  function findReading(tipo: string) {
    const reading = celebr.leituras.find((l) => l.tipo === tipo);
    if (!reading || !reading.opcoes[0]) return undefined;
    return {
      title: reading.rotulo,
      text: reading.opcoes[0].texto,
      reference: reading.opcoes[0].referencia,
    };
  }

  const firstReading = findReading('leitura');

  const psalmReading = celebr.leituras.find((l) => l.tipo === 'salmo');
  const psalm = psalmReading?.opcoes[0]
    ? {
        title: psalmReading.rotulo,
        text: psalmReading.opcoes[0].texto,
        reference: psalmReading.opcoes[0].referencia,
        response: psalmReading.refrao ?? '',
      }
    : undefined;

  const allReadings = celebr.leituras.filter((l) => l.tipo === 'leitura');
  const secondReading = allReadings.length >= 2 && allReadings[1].opcoes[0]
    ? {
        title: allReadings[1].rotulo,
        text: allReadings[1].opcoes[0].texto,
        reference: allReadings[1].opcoes[0].referencia,
      }
    : undefined;

  const gospel = findReading('evangelho');

  return {
    date: dateStr,
    liturgicalSeason: api.nome,
    liturgicalColor: colorMap[celebr.cor.toLowerCase()] ?? celebr.cor,
    celebrationName: celebr.liturgia,
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

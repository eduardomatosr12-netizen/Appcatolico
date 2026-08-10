export interface RailwayReading {
  referencia: string;
  titulo?: string;
  texto: string;
  refrao?: string;
}

export interface RailwayPrayers {
  coleta: string;
  oferendas: string;
  comunhao: string;
  extras: Array<{ titulo: string; texto: string }>;
}

export interface RailwayLiturgyResponse {
  data: string;
  liturgia: string;
  cor: string;
  oracoes: RailwayPrayers;
  leituras: {
    primeiraLeitura: RailwayReading[];
    salmo: RailwayReading[];
    segundaLeitura: RailwayReading[];
    evangelho: RailwayReading[];
    extras: RailwayReading[];
  };
  antifonas: {
    entrada: string;
    comunhao: string;
  };
}

export interface GospelAcclamation {
  response: string;
  verse: string;
}

export interface DailyLiturgy {
  date: string;
  liturgicalSeason: string;
  liturgicalColor: string;
  celebrationName: string;
  saintOfTheDay?: string;
  firstReading?: { title: string; text: string; reference: string };
  psalm?: { title: string; text: string; reference: string; response: string };
  secondReading?: { title: string; text: string; reference: string };
  gospel?: {
    title: string;
    text: string;
    reference: string;
    acclamation?: GospelAcclamation;
  };
}

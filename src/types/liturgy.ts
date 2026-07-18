export interface LiturgyReadingOption {
  referencia: string;
  titulo?: string;
  texto: string;
}

export interface LiturgyReading {
  ordem: number;
  tipo: string;
  rotulo: string;
  opcoes: LiturgyReadingOption[];
  refrao?: string;
}

export interface LiturgyCelebration {
  id: string;
  liturgia: string;
  cor: string;
  principal: boolean;
  oracoes: {
    coleta: string;
    oferendas: string;
    comunhao: string;
    extras: string[];
  };
  antifonas: {
    entrada: string;
    comunhao: string;
  };
  leituras: LiturgyReading[];
}

export interface LiturgyApiResponse {
  data: string;
  nome: string;
  tempo: string;
  rank: string;
  semana: number;
  dia_semana: string;
  ciclo_dominical: string;
  ciclo_ferial: string;
  celebracoes: LiturgyCelebration[];
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
  gospel?: { title: string; text: string; reference: string };
}

export type LiturgicalSpeaker = 'sacerdote' | 'assembleia' | 'rubrica';

export interface LiturgicalLine {
  speaker: LiturgicalSpeaker;
  text: string;
}

export interface LiturgicalSection {
  key: string;
  label: string;
  lines: LiturgicalLine[];
}

export interface EucharisticPrayer {
  id: number;
  title: string;
  sections: LiturgicalSection[];
}

export interface PsalmEntry {
  reference: string;
  antiphon: string;
  text: string;
}

export interface LiturgyOfHours {
  hour: 'laudes' | 'terca' | 'sexta' | 'noa' | 'vesperas' | 'completas' | 'oficio_leituras';
  title: string;
  invocation: LiturgicalLine[];
  hymn: string;
  psalms: PsalmEntry[];
  shortReading: string;
  responsory: string;
  canticle: {
    label: string;
    text: string;
  };
  intercessions: LiturgicalLine[];
  concludingPrayer: string;
}

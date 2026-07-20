export type RosaryMystery = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export interface Mystery {
  type: RosaryMystery;
  number: number;
  title: string;
  fruit?: string;
}

export interface RosaryDecade {
  title: string;
  reflection?: string;
  prayerPerBead: string;
  beadCount: number;
}

export interface RosaryType {
  id: string;
  name: string;
  description: string;
  icon: string;
  openingPrayers: string[];
  decades: RosaryDecade[];
  closingPrayers: string[];
  category: 'mariano' | 'misericordia' | 'batalha' | 'providencia' | 'sao_jose' | 'diversos';
}

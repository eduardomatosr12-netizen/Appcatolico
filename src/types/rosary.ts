export type RosaryMystery = 'joyful' | 'sorrowful' | 'glorious' | 'luminous';

export interface Mystery {
  type: RosaryMystery;
  number: number;
  title: string;
  fruit?: string;
}

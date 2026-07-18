export interface Purpose {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  category: string;
}

export interface PrayerAlarm {
  id: string;
  title: string;
  hour: number;
  minute: number;
  daysOfWeek: number[];
  enabled: boolean;
  liturgyHour?: string;
}

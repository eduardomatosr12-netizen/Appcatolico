export type NotificationType = 'alarm' | 'timer' | 'liturgia' | 'info';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  actionUrl?: string;
}

export type NotificationPermission = 'default' | 'granted' | 'denied';

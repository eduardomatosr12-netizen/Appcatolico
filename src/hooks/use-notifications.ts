'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/lib/stores/notification-store';
import type { NotificationPermission } from '@/types/notification';

export function useNotifications() {
  const { initialize, addNotification, permission, setPermission } = useNotificationStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    const result = await Notification.requestPermission();
    setPermission(result as NotificationPermission);
    return result === 'granted';
  };

  const notify = (title: string, body: string, type: 'alarm' | 'timer' | 'liturgia' | 'info' = 'info') => {
    addNotification({ type, title, body });
  };

  return {
    permission,
    requestPermission,
    notify,
  };
}

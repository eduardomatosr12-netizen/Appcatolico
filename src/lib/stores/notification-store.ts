'use client';

import { create } from 'zustand';
import type { AppNotification, NotificationPermission } from '@/types/notification';

const STORAGE_KEY = 'lumen-notifications';
const MAX_NOTIFICATIONS = 50;

function loadNotifications(): AppNotification[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveNotifications(notifications: AppNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // localStorage full or unavailable
  }
}

interface NotificationState {
  notifications: AppNotification[];
  permission: NotificationPermission;
  panelOpen: boolean;
  toastQueue: AppNotification[];

  initialize: () => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  setPermission: (p: NotificationPermission) => void;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  popToast: () => AppNotification | undefined;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  permission: 'default',
  panelOpen: false,
  toastQueue: [],

  initialize: () => {
    const notifications = loadNotifications();
    let permission: NotificationPermission = 'default';
    if (typeof window !== 'undefined' && 'Notification' in window) {
      permission = Notification.permission as NotificationPermission;
    }
    set({ notifications, permission });
  },

  addNotification: (n) => {
    const notification: AppNotification = {
      ...n,
      id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      read: false,
    };

    set((state) => {
      const notifications = [notification, ...state.notifications].slice(0, MAX_NOTIFICATIONS);
      saveNotifications(notifications);
      return { notifications, toastQueue: [...state.toastQueue, notification] };
    });

    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notification.title, {
          body: notification.body,
          icon: '/icon.svg',
          tag: notification.id,
        });
      } catch {
        // Notification API unavailable (e.g. no SW on some browsers)
      }
    }
  },

  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      saveNotifications(notifications);
      return { notifications };
    }),

  markAllAsRead: () =>
    set((state) => {
      const notifications = state.notifications.map((n) => ({ ...n, read: true }));
      saveNotifications(notifications);
      return { notifications };
    }),

  removeNotification: (id) =>
    set((state) => {
      const notifications = state.notifications.filter((n) => n.id !== id);
      saveNotifications(notifications);
      return { notifications };
    }),

  clearAll: () => {
    saveNotifications([]);
    set({ notifications: [] });
  },

  setPermission: (permission) => set({ permission }),

  togglePanel: () => set((state) => ({ panelOpen: !state.panelOpen })),
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),

  popToast: () => {
    const { toastQueue } = get();
    if (toastQueue.length === 0) return undefined;
    const [next, ...rest] = toastQueue;
    set({ toastQueue: rest });
    return next;
  },
}));

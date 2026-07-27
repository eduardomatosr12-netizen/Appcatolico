'use client';

/**
 * Solution 2: Main thread alarm scheduler.
 *
 * Uses a 30-second setInterval to periodically check IndexedDB for alarms.
 * Works when the PWA is minimized (tab in background) but still in memory.
 * Also instructs the Service Worker to check — both contexts coordinate via
 * the shared lastFiredKey in IndexedDB to prevent duplicate notifications.
 *
 * Limitations:
 * - Does NOT fire if the OS has fully killed the PWA process.
 * - In that case, Solution 1 (Periodic Background Sync) takes over.
 */

import { useEffect, useCallback, useRef } from 'react';
import { checkAlarmsNow, showAlarmNotification } from '@/lib/services/alarm-checker';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { playAlarmSound } from '@/lib/utils/alarm-sound';

const CHECK_INTERVAL_MS = 30_000; // 30 seconds

function notifySWToCheck() {
  if (!navigator.serviceWorker?.controller) return;
  navigator.serviceWorker.controller.postMessage({ type: 'CHECK_ALARMS' });
}

export function useAlarmScheduler() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const lastMinuteRef = useRef<string>('');

  const tick = useCallback(async () => {
    try {
      const { alarmsToFire, minuteKey } = await checkAlarmsNow();

      // Extra guard: if somehow both SW and main thread got through
      if (minuteKey === lastMinuteRef.current) return;
      lastMinuteRef.current = minuteKey;

      for (const alarm of alarmsToFire) {
        // In-app notification store
        addNotification({
          type: 'alarm',
          title: alarm.title,
          body: `Hora da oração — ${alarm.title}!`,
        });

        // Native OS notification (if permitted)
        showAlarmNotification(alarm, 'main');

        // Sound (only works if tab is focused — otherwise browser blocks audio)
        playAlarmSound();
      }
    } catch {
      // Silent — alarm checking should never crash the app
    }
  }, [addNotification]);

  useEffect(() => {
    // Initial check
    tick();

    // Also tell SW to check (in case it missed something)
    notifySWToCheck();

    const interval = setInterval(tick, CHECK_INTERVAL_MS);

    // Re-check when user returns to the tab (may have missed alarms while hidden)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        lastMinuteRef.current = ''; // reset guard to allow re-check
        tick();
        notifySWToCheck();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Request notification permission on mount if not yet granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [tick]);
}

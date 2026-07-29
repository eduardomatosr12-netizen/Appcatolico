'use client';

import { useEffect, useCallback, useRef } from 'react';
import { checkAlarmsNow, showAlarmNotification } from '@/lib/services/alarm-checker';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { playAlarmSound, vibrate, resumeAudioContext, ensureAudioReady } from '@/lib/utils/alarm-sound';

const CHECK_INTERVAL_MS = 30_000;

function notifySWToCheck() {
  if (!navigator.serviceWorker?.controller) return;
  navigator.serviceWorker.controller.postMessage({ type: 'CHECK_ALARMS' });
}

let wakeLockRef: WakeLockSentinel | null = null;

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator && wakeLockRef === null) {
      wakeLockRef = await navigator.wakeLock.request('screen');
      wakeLockRef.addEventListener('release', () => {
        wakeLockRef = null;
      });
    }
  } catch {
    // Wake Lock not available or denied
  }
}

function releaseWakeLock() {
  if (wakeLockRef) {
    wakeLockRef.release().catch(() => {});
    wakeLockRef = null;
  }
}

export function useAlarmScheduler() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const lastMinuteRef = useRef<string>('');

  const tick = useCallback(async () => {
    try {
      const { alarmsToFire, minuteKey } = await checkAlarmsNow();

      if (minuteKey === lastMinuteRef.current) return;
      lastMinuteRef.current = minuteKey;

      for (const alarm of alarmsToFire) {
        addNotification({
          type: 'alarm',
          title: alarm.title,
          body: `Hora da oração — ${alarm.title}!`,
        });

        showAlarmNotification(alarm, 'main');

        await resumeAudioContext();
        playAlarmSound();
        vibrate([200, 100, 200, 100, 200]);

        requestWakeLock();
        setTimeout(releaseWakeLock, 10000);
      }
    } catch {
      // Silent
    }
  }, [addNotification]);

  useEffect(() => {
    tick();
    notifySWToCheck();
    ensureAudioReady();

    const interval = setInterval(tick, CHECK_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        lastMinuteRef.current = '';
        tick();
        notifySWToCheck();
        resumeAudioContext();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const handleSWMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PLAY_ALARM_SOUND') {
        resumeAudioContext().then(() => {
          playAlarmSound();
          vibrate([200, 100, 200, 100, 200]);
        });
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleSWMessage);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
      releaseWakeLock();
    };
  }, [tick]);
}

/**
 * Shared alarm-checking logic.
 * Works identically in Service Worker and main thread contexts.
 * Returns alarms that should fire right now (deduplication via IndexedDB meta).
 */

import {
  getEnabledAlarms,
  getLastFiredKey,
  setLastFiredKey,
  type StoredAlarm,
} from './alarm-store';

export interface AlarmCheckResult {
  alarmsToFire: StoredAlarm[];
  minuteKey: string;
}

/**
 * Builds a minute-level key: "day-hour-minute" (e.g. "3-14-30").
 */
export function buildMinuteKey(date: Date = new Date()): string {
  return `${date.getDay()}-${date.getHours()}-${date.getMinutes()}`;
}

/**
 * Checks IndexedDB for enabled alarms that match the current minute.
 * Returns only alarms that haven't been fired yet this minute.
 */
export async function checkAlarmsNow(): Promise<AlarmCheckResult> {
  const minuteKey = buildMinuteKey();
  const lastFired = await getLastFiredKey();

  // Already fired for this exact minute — skip
  if (lastFired === minuteKey) {
    return { alarmsToFire: [], minuteKey };
  }

  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const enabledAlarms = await getEnabledAlarms();

  const matching = enabledAlarms.filter((alarm) => {
    if (!alarm.daysOfWeek.includes(currentDay)) return false;
    if (alarm.hour !== currentHour || alarm.minute !== currentMinute) return false;
    return true;
  });

  if (matching.length > 0) {
    // Mark as fired so neither SW nor main thread fires again
    await setLastFiredKey(minuteKey);
  }

  return { alarmsToFire: matching, minuteKey };
}

/**
 * Shows a notification for a given alarm.
 * Context-agnostic: works in both SW and main thread.
 */
export function showAlarmNotification(
  alarm: StoredAlarm,
  context: 'sw' | 'main' = 'main'
): void {
  if (context === 'sw' && typeof self !== 'undefined' && 'registration' in self) {
    // Service Worker context
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (self as any).registration.showNotification(
      'Hora da oração!',
      {
        body: `${alarm.title} — Hora da oração!`,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: `alarm-${alarm.id}`,
        renotify: true,
        vibrate: [200, 100, 200, 100, 200],
        data: { url: '/liturgia', alarmId: alarm.id },
      }
    );
  } else if (context === 'main' && typeof Notification !== 'undefined') {
    // Main thread — use Web Notification API
    if (Notification.permission === 'granted') {
      const n = new Notification('Hora da oração!', {
        body: `${alarm.title} — Hora da oração!`,
        icon: '/icon-192.png',
        tag: `alarm-${alarm.id}`,
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    }
  }
}

'use client';

import { useAlarmScheduler } from '@/hooks/use-alarm-scheduler';

/**
 * Client-side alarm scheduler.
 * Mounts once in the root layout and runs the setInterval-based checker.
 * Coordinates with the Service Worker via IndexedDB to prevent duplicate alerts.
 */
export function AlarmScheduler() {
  useAlarmScheduler();
  return null;
}

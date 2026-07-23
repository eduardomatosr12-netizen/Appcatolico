'use client';

import { useState, useEffect, useCallback } from 'react';
import { useNotificationStore } from '@/lib/stores/notification-store';
import type { AppNotification } from '@/types/notification';

const TOAST_DURATION = 5000;

const typeIcons: Record<string, string> = {
  alarm: '🔔',
  timer: '⏱️',
  liturgia: '📖',
  info: '✨',
};

function ToastItem({ notification, onDismiss }: { notification: AppNotification; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDismiss, 300);
    }, TOAST_DURATION);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(onDismiss, 300);
  };

  const icon = typeIcons[notification.type] || '✨';

  return (
    <div
      className={`
        flex items-start gap-3 w-full max-w-sm rounded-2xl p-4
        bg-[#16161A] border border-[rgba(197,160,89,0.15)]
        shadow-[0_8px_32px_rgba(0,0,0,0.6)]
        transition-all duration-300 ease-out
        ${visible && !exiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span className="text-lg mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#C5A059] leading-tight">{notification.title}</p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">{notification.body}</p>
      </div>
      <button
        onClick={handleDismiss}
        className="shrink-0 text-gray-500 hover:text-white transition-colors p-1 -m-1"
        aria-label="Dispensar"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function NotificationToast() {
  const [currentToast, setCurrentToast] = useState<AppNotification | null>(null);
  const popToast = useNotificationStore((s) => s.popToast);

  const dismiss = useCallback(() => {
    setCurrentToast(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentToast) {
        const next = popToast();
        if (next) setCurrentToast(next);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [currentToast, popToast]);

  if (!currentToast) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] pointer-events-none">
      <div className="pointer-events-auto">
        <ToastItem key={currentToast.id} notification={currentToast} onDismiss={dismiss} />
      </div>
    </div>
  );
}

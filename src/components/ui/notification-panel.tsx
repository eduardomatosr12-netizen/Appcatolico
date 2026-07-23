'use client';

import { useState, useEffect, useRef } from 'react';
import { useNotificationStore } from '@/lib/stores/notification-store';
import type { AppNotification, NotificationPermission } from '@/types/notification';

const typeIcons: Record<string, string> = {
  alarm: '🔔',
  timer: '⏱️',
  liturgia: '📖',
  info: '✨',
};

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'agora';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function NotificationItem({
  notification,
  onRead,
  onRemove,
}: {
  notification: AppNotification;
  onRead: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer
        ${notification.read
          ? 'border-white/5 bg-transparent opacity-60'
          : 'border-[rgba(197,160,89,0.1)] bg-[#C5A059]/[0.03]'
        }
        hover:bg-white/[0.02]
      `}
      onClick={() => onRead(notification.id)}
    >
      <span className="text-base mt-0.5 shrink-0">{typeIcons[notification.type] || '✨'}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm font-medium leading-tight truncate ${notification.read ? 'text-gray-400' : 'text-gray-200'}`}>
            {notification.title}
          </p>
          {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shrink-0" />}
        </div>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{notification.body}</p>
        <p className="text-[10px] text-gray-600 mt-1.5">{timeAgo(notification.timestamp)}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(notification.id); }}
        className="shrink-0 text-gray-600 hover:text-red-400 transition-colors p-1 -m-1"
        aria-label="Remover"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function NotificationPanel() {
  const {
    notifications,
    permission,
    panelOpen,
    closePanel,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    setPermission,
  } = useNotificationStore();

  const panelRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    if (panelOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [panelOpen, closePanel]);

  const requestPermission = async () => {
    if (!('Notification' in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result as NotificationPermission);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  if (!panelOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm md:hidden" onClick={closePanel} />

      <div
        ref={panelRef}
        className="fixed top-0 right-0 z-[9999] h-full w-full max-w-sm bg-[#0B0B0E] border-l border-white/[0.05] shadow-[-8px_0_40px_rgba(0,0,0,0.8)] flex flex-col animate-in"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-sm tracking-[0.15em] uppercase text-[#C5A059] font-semibold">
              Notificações
            </h2>
            {unreadCount > 0 && (
              <span className="h-5 min-w-5 flex items-center justify-center rounded-full bg-[#5C0F1B] text-[10px] font-bold text-[#C5A059] px-1.5">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={closePanel}
            className="text-gray-500 hover:text-white transition-colors p-1"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {permission !== 'granted' && (
          <div className="mx-4 mt-4 rounded-xl bg-[#16161A] border border-white/[0.05] p-4">
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Ative as notificações para receber alertas de oração e liturgia mesmo com o app em segundo plano.
            </p>
            <button
              onClick={requestPermission}
              className="w-full rounded-xl bg-[#5C0F1B]/30 border border-[#C5A059]/20 px-4 py-2.5 text-xs font-semibold text-[#C5A059] hover:bg-[#5C0F1B]/50 transition-colors"
            >
              Ativar notificações
            </button>
          </div>
        )}

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 px-4 pt-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'unread' ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Não lidas
            </button>
            <div className="flex-1" />
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[10px] text-gray-600 hover:text-[#C5A059] transition-colors uppercase tracking-wider"
              >
                Marcar todas
              </button>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-3xl opacity-40">🔔</span>
              <p className="text-xs text-gray-600 text-center">
                {filter === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação ainda'}
              </p>
            </div>
          ) : (
            filtered.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={markAsRead}
                onRemove={removeNotification}
              />
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-white/[0.05]">
            <button
              onClick={clearAll}
              className="w-full rounded-xl bg-white/[0.02] border border-white/5 px-4 py-2.5 text-xs text-gray-500 hover:text-red-400 hover:border-red-400/20 transition-colors"
            >
              Limpar todas
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}

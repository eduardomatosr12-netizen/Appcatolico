'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useNotificationStore } from '@/lib/stores/notification-store';
import { AuthScreen } from '@/components/auth/auth-screen';
import { migrateLocalStorageToFirestore, isMigrated } from '@/lib/services/migration-service';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isGuest, initialize, continueAsGuest } = useAuthStore();
  const setNotificationUserId = useNotificationStore((s) => s.setUserId);
  const [migrationRan, setMigrationRan] = useState(false);

  useEffect(() => {
    const unsubscribe = initialize();
    return () => unsubscribe();
  }, [initialize]);

  useEffect(() => {
    setNotificationUserId(user?.uid ?? null);

    return () => {
      setNotificationUserId(null);
    };
  }, [user, setNotificationUserId]);

  useEffect(() => {
    if (!user || isMigrated(user.uid)) {
      return;
    }

    let cancelled = false;

    migrateLocalStorageToFirestore(user.uid).then(() => {
      if (!cancelled) setMigrationRan(true);
    });

    return () => { cancelled = true; };
  }, [user]);

  const offlineNow = typeof navigator !== 'undefined' && !navigator.onLine;

  useEffect(() => {
    if (!isLoading || isGuest) return;

    const timer = setTimeout(() => {
      const offline = typeof navigator !== 'undefined' && !navigator.onLine;
      const authReady = useAuthStore.getState().isLoading === false;
      if (offline && !authReady) {
        continueAsGuest();
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [isLoading, isGuest, continueAsGuest]);

  const migrationDone = offlineNow || !user || isMigrated(user.uid) || migrationRan;

  if (isLoading && !isGuest) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0B0B0E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
          <span className="font-serif text-sm tracking-[0.2em] text-[#C5A059]">FORJA</span>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <AuthScreen />;
  }

  if (user && !migrationDone) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#0B0B0E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#C5A059]/30 border-t-[#C5A059] rounded-full animate-spin" />
          <p className="text-xs text-[#8A8A8E]">Sincronizando dados...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

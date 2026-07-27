'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { getDb } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer;
}

export function usePushSubscription() {
  const user = useAuthStore((s) => s.user);
  const subscribedRef = useRef(false);

  useEffect(() => {
    if (!user?.uid || subscribedRef.current) return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    if (!VAPID_PUBLIC_KEY) return;

    subscribedRef.current = true;

    (async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;

        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });

        const sub = subscription.toJSON();
        if (!sub.endpoint || !sub.keys) return;

        await setDoc(
          doc(getDb(), 'users', user.uid, 'meta', 'push'),
          {
            endpoint: sub.endpoint,
            keys: sub.keys,
            createdAt: Date.now(),
          },
          { merge: true }
        );
      } catch {
        // Push subscription failed — silently ignore
      }
    })();
  }, [user?.uid]);
}

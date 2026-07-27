'use client';

import { usePushSubscription } from '@/hooks/use-push-subscription';

export function PushManager() {
  usePushSubscription();
  return null;
}

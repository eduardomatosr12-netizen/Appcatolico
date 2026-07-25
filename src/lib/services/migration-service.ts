'use client';

import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { getDb } from '@/lib/firebase';

const MIGRATION_KEY = 'forja-sync-migrated';

interface MigrationConfig {
  localStorageKey: string;
  firestoreCollection: string;
  type?: 'array' | 'single-doc';
  defaultValue?: unknown;
}

const migrations: MigrationConfig[] = [
  { localStorageKey: 'forja-alarms', firestoreCollection: 'alarms' },
  { localStorageKey: 'forja-purposes', firestoreCollection: 'purposes' },
  { localStorageKey: 'forja_confession_history', firestoreCollection: 'confessions' },
  { localStorageKey: 'forja-notifications', firestoreCollection: 'notifications' },
  {
    localStorageKey: 'forja_bible_highlights',
    firestoreCollection: 'bibleHighlights',
    type: 'single-doc',
    defaultValue: {},
  },
];

export async function migrateLocalStorageToFirestore(uid: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (localStorage.getItem(MIGRATION_KEY) === uid) return false;

  const db = getDb();

  for (const config of migrations) {
    const raw = localStorage.getItem(config.localStorageKey);
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);

      if (config.type === 'single-doc') {
        await migrateSingleDoc(db, uid, config, parsed);
      } else if (Array.isArray(parsed)) {
        await migrateArrayCollection(db, uid, config, parsed);
      }
    } catch {
      // Skip this migration, continue with others
    }
  }

  localStorage.setItem(MIGRATION_KEY, uid);
  return true;
}

async function migrateArrayCollection(
  db: ReturnType<typeof getDb>,
  uid: string,
  config: MigrationConfig,
  items: { id: string;[key: string]: unknown }[]
) {
  if (items.length === 0) return;

  const colRef = collection(db, 'users', uid, config.firestoreCollection);
  const existingSnapshot = await getDocs(colRef);
  const existingIds = new Set(existingSnapshot.docs.map((d) => d.id));

  const batch = writeBatch(db);
  let hasWrites = false;

  for (const item of items) {
    if (!existingIds.has(item.id)) {
      const docRef = doc(db, 'users', uid, config.firestoreCollection, item.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _itemId, ...data } = item;
      batch.set(docRef, data);
      hasWrites = true;
    }
  }

  if (hasWrites) {
    await batch.commit();
  }
}

async function migrateSingleDoc(
  db: ReturnType<typeof getDb>,
  uid: string,
  config: MigrationConfig,
  data: unknown
) {
  const docRef = doc(db, 'users', uid, config.firestoreCollection, 'single');
  const docSnap = await getDocs(collection(db, 'users', uid, config.firestoreCollection));

  if (docSnap.empty) {
    const batch = writeBatch(db);
    batch.set(docRef, data as Record<string, unknown>);
    await batch.commit();
  }
}

export function isMigrated(uid: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(MIGRATION_KEY) === uid;
}

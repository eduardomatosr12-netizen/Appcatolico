'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  type DocumentData,
} from 'firebase/firestore';
import { getDb } from '@/lib/firebase';

function loadFromLocalStorage<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToLocalStorage<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

function loadSingleFromLocalStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSingleToLocalStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export interface SyncedCollectionResult<T extends { id: string }> {
  data: T[];
  add: (item: T) => Promise<void>;
  update: (item: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
  isSyncing: boolean;
}

export function useSyncedCollection<T extends { id: string }>(
  collectionPath: string,
  userId: string | null,
  fallbackKey: string
): SyncedCollectionResult<T> {
  const [data, setData] = useState<T[]>(() => loadFromLocalStorage<T>(fallbackKey));
  const [isSyncing, setIsSyncing] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!userId) {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      return;
    }

    const colRef = collection(getDb(), 'users', userId, collectionPath);

    unsubscribeRef.current = onSnapshot(colRef, (snapshot) => {
      const items: T[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as T);
      });
      setData(items);
      saveToLocalStorage(fallbackKey, items);
      setIsSyncing(false);
    }, () => {
      setIsSyncing(false);
    });

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [userId, collectionPath, fallbackKey]);

  const add = useCallback(async (item: T) => {
    if (!userId) {
      setData((prev) => {
        const next = [...prev, item];
        saveToLocalStorage(fallbackKey, next);
        return next;
      });
      return;
    }
    const docRef = doc(getDb(), 'users', userId, collectionPath, item.id);
    await setDoc(docRef, item);
  }, [userId, collectionPath, fallbackKey]);

  const update = useCallback(async (item: T) => {
    if (!userId) {
      setData((prev) => {
        const next = prev.map((d) => (d.id === item.id ? item : d));
        saveToLocalStorage(fallbackKey, next);
        return next;
      });
      return;
    }
    const docRef = doc(getDb(), 'users', userId, collectionPath, item.id);
    await setDoc(docRef, item, { merge: true });
  }, [userId, collectionPath, fallbackKey]);

  const remove = useCallback(async (id: string) => {
    if (!userId) {
      setData((prev) => {
        const next = prev.filter((d) => d.id !== id);
        saveToLocalStorage(fallbackKey, next);
        return next;
      });
      return;
    }
    const docRef = doc(getDb(), 'users', userId, collectionPath, id);
    await deleteDoc(docRef);
  }, [userId, collectionPath, fallbackKey]);

  return { data, add, update, remove, isSyncing };
}

export interface SyncedSingleDocResult<T> {
  data: T;
  save: (data: T) => Promise<void>;
  isSyncing: boolean;
}

export function useSyncedSingleDoc<T>(
  docPath: string,
  userId: string | null,
  fallbackKey: string,
  defaultValue: T
): SyncedSingleDocResult<T> {
  const [data, setData] = useState<T>(() => loadSingleFromLocalStorage<T>(fallbackKey) ?? defaultValue);
  const [isSyncing, setIsSyncing] = useState(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!userId) {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      return;
    }

    const docRef = doc(getDb(), 'users', userId, docPath);

    unsubscribeRef.current = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as T);
        saveSingleToLocalStorage(fallbackKey, docSnap.data() as T);
      }
      setIsSyncing(false);
    }, () => {
      setIsSyncing(false);
    });

    return () => {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [userId, docPath, fallbackKey]);

  const save = useCallback(async (newData: T) => {
    setData(newData);
    saveSingleToLocalStorage(fallbackKey, newData);

    if (!userId) return;
    const docRef = doc(getDb(), 'users', userId, docPath);
    await setDoc(docRef, newData as DocumentData, { merge: true });
  }, [userId, docPath, fallbackKey]);

  return { data, save, isSyncing };
}

export async function batchWriteToFirestore(
  userId: string,
  collectionPath: string,
  items: { id: string; data: Record<string, unknown> }[]
) {
  if (!userId || items.length === 0) return;

  const db = getDb();
  const batch = writeBatch(db);

  for (const item of items) {
    const docRef = doc(db, 'users', userId, collectionPath, item.id);
    batch.set(docRef, item.data);
  }

  await batch.commit();
}

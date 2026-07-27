const CACHE_NAME = "forja-v1";

// ─── Lifecycle ───────────────────────────────────────────────────────────────

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data?.type === "CHECK_ALARMS") {
    event.waitUntil(checkAlarms());
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((n) => caches.delete(n))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((n) => caches.delete(n))))
      .then(() => {
        self.clients.claim();
        registerPeriodicSync();
      })
  );
});

// ─── Fetch (stale-while-revalidate) ─────────────────────────────────────────

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && response.type === "basic") {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ─── Push notifications (server-sent, kept as fallback) ──────────────────────

self.addEventListener("push", (event) => {
  let data = {
    title: "Forja",
    body: "Hora da oração!",
    icon: "/icon-192.png",
    tag: "forja-push",
    data: { url: "/" },
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || "/icon-192.png",
      badge: "/icon-192.png",
      tag: data.tag,
      renotify: true,
      vibrate: [200, 100, 200, 100, 200],
      data: data.data || { url: "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const client of clients) {
          if (
            client.url.includes(self.location.origin) &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        return self.clients.openWindow(url);
      })
  );
});

// ─── Periodic Background Sync (Solution 1) ──────────────────────────────────
// Chrome 80+ / Edge 80+: PWA must be installed for registration.
// This runs even when the PWA is fully closed (not just minimized).

const PERIODIC_SYNC_TAG = "forja-alarm-check";

async function registerPeriodicSync() {
  if (!("periodicSync" in self.registration)) return;

  try {
    const status = await self.registration.periodicSync.getTags();
    if (status.some((t) => t.tag === PERIODIC_SYNC_TAG)) return;

    await self.registration.periodicSync.register(PERIODIC_SYNC_TAG, {
      minInterval: 60 * 1000, // 1 minute
    });
  } catch {
    // Periodic sync not available or permission denied — silent fallback
  }
}

self.addEventListener("periodicsync", (event) => {
  if (event.tag === PERIODIC_SYNC_TAG) {
    event.waitUntil(checkAlarms());
  }
});

// ─── One-shot Background Sync (connectivity recovery) ────────────────────────

self.addEventListener("sync", (event) => {
  if (event.tag === "forja-alarm-recovery") {
    event.waitUntil(checkAlarms());
  }
});

// ─── Alarm checking logic (inline, no imports — SW has no module bundler) ────
// Mirrors alarm-checker.ts logic but in plain JS for the SW context.

const DB_NAME = "forja-alarms-db";
const DB_VERSION = 1;
const STORE_NAME = "alarms";
const META_STORE = "meta";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGetEnabledAlarms() {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () =>
          resolve(
            (request.result || []).filter((a) => a.enabled)
          );
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
      })
  );
}

function idbGetLastFiredKey() {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(META_STORE, "readonly");
        const store = tx.objectStore(META_STORE);
        const request = store.get("lastFiredKey");
        request.onsuccess = () => resolve(request.result?.value || null);
        request.onerror = () => reject(request.error);
        tx.oncomplete = () => db.close();
      })
  );
}

function idbSetLastFiredKey(key) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(META_STORE, "readwrite");
        const store = tx.objectStore(META_STORE);
        store.put({ key: "lastFiredKey", value: key });
        tx.oncomplete = () => { db.close(); resolve(); };
        tx.onerror = () => { db.close(); reject(tx.error); };
      })
  );
}

function buildMinuteKey(date) {
  if (!date) date = new Date();
  return `${date.getDay()}-${date.getHours()}-${date.getMinutes()}`;
}

async function checkAlarms() {
  try {
    const minuteKey = buildMinuteKey();
    const lastFired = await idbGetLastFiredKey();

    if (lastFired === minuteKey) return;

    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const enabledAlarms = await idbGetEnabledAlarms();

    const matching = enabledAlarms.filter((alarm) => {
      if (!alarm.daysOfWeek.includes(currentDay)) return false;
      if (alarm.hour !== currentHour || alarm.minute !== currentMinute)
        return false;
      return true;
    });

    if (matching.length === 0) return;

    await idbSetLastFiredKey(minuteKey);

    for (const alarm of matching) {
      await self.registration.showNotification("Hora da oração!", {
        body: `${alarm.title} — Hora da oração!`,
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: `alarm-${alarm.id}`,
        renotify: true,
        vibrate: [200, 100, 200, 100, 200],
        data: { url: "/liturgia", alarmId: alarm.id },
      });
    }
  } catch (err) {
    console.error("[SW] Alarm check failed:", err);
  }
}

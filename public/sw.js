const CACHE_VERSION = 3;
const CACHE_NAME = `forja-v${CACHE_VERSION}`;
const APP_SHELL_CACHE = `${CACHE_NAME}-shell`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;

const PRECACHE_ROUTES = [
  "/",
  "/liturgia",
  "/biblia",
  "/estudo",
  "/oracoes",
  "/confissao",
  "/produtividade",
  "/rosario",
];

const PRECACHE_ASSETS = [
  "/manifest.json",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/biblia-ave-maria.json",
];

// ─── Lifecycle ───────────────────────────────────────────────────────────────

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
  if (event.data?.type === "CHECK_ALARMS") {
    event.waitUntil(checkAlarms());
  }
  if (event.data?.type === "CACHE_BIBLE") {
    event.waitUntil(precacheBible());
  }
  if (event.data?.type === "CACHE_LITURGY") {
    event.waitUntil(cacheLiturgyRange(event.data?.dates));
  }
});

async function notifyClientsToPlaySound() {
  const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const client of clients) {
    client.postMessage({ type: "PLAY_ALARM_SOUND" });
  }
}

function sameOrigin(url) {
  const u = new URL(url, self.location.origin);
  return u.origin === self.location.origin;
}

function cachePut(cacheName, request) {
  return fetch(request)
    .then((response) => {
      if (response.ok && response.type === "basic") {
        const clone = response.clone();
        return caches.open(cacheName).then((cache) => cache.put(request, clone)).then(() => response);
      }
      return response;
    })
    .catch((err) => {
      if (err instanceof TypeError && typeof caches !== "undefined") {
        // offline durante install: tenta servir do cache
      }
      throw err;
    });
}

async function extractStaticAssets(htmlText) {
  const assets = new Set();
  const re = /\/_next\/static\/[^"'\s\\]+/g;
  let m;
  while ((m = re.exec(htmlText)) !== null) {
    assets.add(m[0]);
  }
  return Array.from(assets);
}

async function precacheAppShell() {
  const prefetch = async (url) => {
    try {
      const res = await cachePut(APP_SHELL_CACHE, url);
      return res;
    } catch {
      return null;
    }
  };

  const htmlRes = await prefetch("/");
  let staticAssets = [];
  if (htmlRes) {
    try {
      const text = await htmlRes.clone().text();
      staticAssets = await extractStaticAssets(text);
    } catch {
      // ignore
    }
  }

  const urls = [...PRECACHE_ROUTES, ...PRECACHE_ASSETS, ...staticAssets];
  await Promise.all(urls.map((u) => prefetch(u)));

  await precacheBible();
}

async function precacheBible() {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const response = await fetch("/biblia-ave-maria.json");
    if (response.ok) {
      await cache.put("/biblia-ave-maria.json", response);
    }
  } catch {
    // offline: mantém cache existente
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      await precacheAppShell();
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n.startsWith("forja-v") && n !== CACHE_NAME && n !== APP_SHELL_CACHE && n !== DYNAMIC_CACHE)
          .map((n) => caches.delete(n))
      );
      await self.clients.claim();
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
      registerPeriodicSync();
    })()
  );
});

// ─── Fetch (offline-first app shell + stale-while-revalidate) ────────────────

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith("http")) return;
  if (!sameOrigin(event.request.url)) return;

  const { request } = event;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok && networkResponse.type === "basic") {
            const cache = await caches.open(APP_SHELL_CACHE);
            cache.put("/", networkResponse.clone());
          }
          return networkResponse;
        } catch {
          const cached = await caches.match(request) || await caches.match("/");
          return cached || new Response("Offline", { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
        }
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(DYNAMIC_CACHE);
      const cachedResponse = await cache.match(request, { ignoreSearch: false });
      const networkPromise = fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch((err) => {
          if (cachedResponse) return cachedResponse;
          if (request.destination === "document") {
            return caches.match("/");
          }
          throw err;
        });

      if (cachedResponse) {
        networkPromise.catch(() => {});
        return cachedResponse;
      }

      return networkPromise;
    })()
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
      requireInteraction: true,
      data: data.data || { url: "/" },
    })
  );
  event.waitUntil(notifyClientsToPlaySound());
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
        requireInteraction: true,
        data: { url: "/liturgia", alarmId: alarm.id },
      });
    }
    notifyClientsToPlaySound();
  } catch (err) {
    console.error("[SW] Alarm check failed:", err);
  }
}

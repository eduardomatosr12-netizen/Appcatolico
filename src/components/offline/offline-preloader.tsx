"use client";

import { useEffect } from "react";

const LITURGY_PRELOAD_DAYS = 10;

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

interface PreloadData {
  version: number;
  completedAt: string;
  lastDate: string;
}

const PRELOAD_KEY = "forja-offline-liturgia";

export default function OfflinePreloader() {
  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) return;
      if (typeof indexedDB === "undefined") return;

      try {
        const cached = localStorage.getItem(PRELOAD_KEY);
        const todayIso = isoDate(new Date());
        let parsed: PreloadData | null = null;
        if (cached) {
          try {
            parsed = JSON.parse(cached) as PreloadData;
          } catch {
            parsed = null;
          }
        }
        if (parsed && parsed.lastDate >= todayIso) return;

        const date = new Date();
        const tasks: Promise<unknown>[] = [];
        for (let i = 0; i < LITURGY_PRELOAD_DAYS; i++) {
          const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);
          tasks.push(
            import("@/services/liturgiaService").then(({ fetchLiturgy }) =>
              fetchLiturgy(d).catch(() => null)
            )
          );
        }
        await Promise.all(tasks);
        if (!cancelled) {
          localStorage.setItem(
            PRELOAD_KEY,
            JSON.stringify({ version: 1, completedAt: new Date().toISOString(), lastDate: todayIso })
          );
        }
      } catch {
        // preload é opcional: nunca deve quebrar o app
      }
    };

    const onOnline = () => preload();
    window.addEventListener("online", onOnline);
    const t = setTimeout(preload, 4000);
    return () => {
      cancelled = true;
      window.removeEventListener("online", onOnline);
      clearTimeout(t);
    };
  }, []);

  return null;
}

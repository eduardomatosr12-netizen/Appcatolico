import * as admin from "firebase-admin";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as webPush from "web-push";

admin.initializeApp();

const db = admin.firestore();

// VAPID keys — generate with: npx web-push generate-vapid-keys
// Store the private key in Firebase environment config:
//   firebase functions:config:set vapid.public="..." vapid.private="..." vapid.email="mailto:..."
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || "";
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || "";
const vapidEmail = process.env.VAPID_EMAIL || "mailto:forja@app.com";

if (vapidPublicKey && vapidPrivateKey) {
  webPush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);
}

interface PrayerAlarm {
  id: string;
  title: string;
  hour: number;
  minute: number;
  daysOfWeek: number[];
  enabled: boolean;
}

interface PushSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

export const checkAlarms = onSchedule({
  schedule: "every 1 minutes",
  timeZone: "America/Sao_Paulo",
  memory: "256MiB",
}, async () => {
  if (!vapidPublicKey || !vapidPrivateKey) {
    console.error("VAPID keys not configured. Run: firebase functions:config:set vapid.public=... vapid.private=...");
    return;
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentDay = now.getDay();

  const usersSnap = await db.collection("users").listDocuments();

  await Promise.all(usersSnap.map(async (userRef) => {
    const userId = userRef.id;

    const [alarmsSnap, pushDoc] = await Promise.all([
      db.collection("users").doc(userId).collection("alarms")
        .where("enabled", "==", true).get(),
      db.collection("users").doc(userId).collection("meta").doc("push").get(),
    ]);

    if (alarmsSnap.empty) return;

    const pushSub = pushDoc.data() as PushSubscription | undefined;
    if (!pushSub?.endpoint || !pushSub?.keys?.p256dh || !pushSub?.keys?.auth) return;

    const matchingAlarms = alarmsSnap.docs.filter((doc) => {
      const alarm = doc.data() as PrayerAlarm;
      return alarm.hour === currentHour
        && alarm.minute === currentMinute
        && alarm.daysOfWeek.includes(currentDay);
    });

    if (matchingAlarms.length === 0) return;

    await Promise.all(matchingAlarms.map(async (doc) => {
      const alarm = doc.data() as PrayerAlarm;
      try {
        await webPush.sendNotification(pushSub, JSON.stringify({
          title: "Hora da oração!",
          body: `${alarm.title} — Hora da oração!`,
          icon: "/icon-192.png",
          tag: `alarm-${alarm.id}`,
          renotify: true,
          vibrate: [200, 100, 200, 100, 200],
          data: { url: "/liturgia" },
        }));
      } catch (err: unknown) {
        const statusCode = (err as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          // Subscription expired — remove it
          await db.collection("users").doc(userId)
            .collection("meta").doc("push").delete().catch(() => {});
        }
      }
    });
  }));
});

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { NotificationToast } from "@/components/ui/notification-toast";
import { NotificationPanel } from "@/components/ui/notification-panel";
import { PushManager } from "@/components/push-manager";
import { AlarmScheduler } from "@/components/alarm-scheduler";

export const metadata: Metadata = {
  title: "Forja — Produtividade e Fé",
  description: "Liturgia, Bíblia, Orações, Terço, Confissão e mais",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Forja",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full dark">
      <body className="h-full bg-[#0B0B0E] text-gray-100 antialiased font-sans">
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            let reloaded = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              if (!reloaded) { reloaded = true; window.location.reload(); }
            });
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js', { scope: '/' }).then((reg) => {
                if (reg.active) reg.update();
                reg.addEventListener('updatefound', () => {
                  const w = reg.installing;
                  if (w) w.addEventListener('statechange', () => {
                    if (w.state === 'installed' && navigator.serviceWorker.controller) {
                      w.postMessage({ type: 'SKIP_WAITING' });
                    }
                  });
                });
              });
            });
          }
        `}} />
        <AuthProvider>
          <ThemeProvider>
            <div className="flex min-h-dvh w-full max-w-full bg-[#0B0B0E] text-gray-100 relative font-sans overflow-x-hidden">
              <DesktopSidebar />

              <main className="flex-1 min-h-dvh flex flex-col bg-[#0B0B0E] md:ml-64 w-full max-w-full">
                <div className="w-full max-w-3xl mx-auto px-4 md:px-8 lg:px-12 pt-4 md:pt-8 pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-8 flex flex-col gap-4 md:gap-8">
                  {children}
                </div>
              </main>

              <MobileNav />
            </div>
          </ThemeProvider>
        </AuthProvider>
        <NotificationToast />
        <NotificationPanel />
        <PushManager />
        <AlarmScheduler />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { MobileNav } from "@/components/navigation/mobile-nav";

export const metadata: Metadata = {
  title: "Lumen — App Católico",
  description: "Liturgia Diária, Orações, Terço e mais",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lumen",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full dark">
      <body className="h-full bg-[#0B0B0E] text-gray-100 antialiased overflow-x-hidden font-sans">
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `}} />
        <ThemeProvider>
          <div className="flex min-h-screen w-full bg-[#0B0B0E] text-gray-100 overflow-x-hidden relative font-sans">
            <DesktopSidebar />

            <main
              className="flex-1 min-h-screen flex flex-col bg-[#0B0B0E]"
              style={{ marginLeft: '256px' }}
            >
              <div className="w-full max-w-3xl mx-auto px-8 md:px-12 py-8 flex flex-col gap-8">
                {children}
              </div>
            </main>

            <MobileNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

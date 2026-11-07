import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { Footer, Header, TabBar } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Shinrin-Yoku ไร่เชิญตะวัน",
  description: "อาบป่าเมืองเหนือที่ไร่เชิญตะวัน — ถ่ายรูปต้นไม้ รู้จักสายพันธุ์ ประวัติ และเอกลักษณ์ด้านกลิ่นของพืชพรรณไทย",
  applicationName: "Shinrin-Yoku Cherntawan",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Shinrin-Yoku" },
  icons: { icon: "/icon.svg", apple: "/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#1f4d3a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full flex flex-col">
        <LangProvider>
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5">{children}</main>
          <Footer />
          <TabBar />
        </LangProvider>
      </body>
    </html>
  );
}

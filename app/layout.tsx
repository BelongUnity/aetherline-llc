import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aetherline.llc"),
  title: "Aetherline L.L.C. | AI Agents, Kurumsal IT & Dijital Marka Mimarisi",
  description:
    "Aetherline L.L.C. — Pristina, Kosova & DACH. Gülçin Turhan (CEO) ve Can Çolak (CTO) liderliğinde AI Voice Agent, Web Scraping, 360° Sosyal Medya Yönetimi ve Kurumsal IT / SAP Basis çözümleri.",
  applicationName: "Aetherline L.L.C.",
  keywords: [
    "AI Voice Agent",
    "AI Chatbot",
    "Web Scraping",
    "Veri Toplama",
    "SAP Basis",
    "Microsoft 365 Zero-Trust",
    "Sosyal Medya Yönetimi",
    "Kurumsal IT",
    "Pristina",
    "Kosovo",
    "DACH",
  ],
  openGraph: {
    title: "Aetherline L.L.C. | AI Agents, IT & Dijital Marka Mimarisi",
    description:
      "7/24 çalışan uzman AI Agent işgücü ve iki kurucu ortak liderliğinde uçtan uca dijital & kurumsal IT çözümleri.",
    url: "https://aetherline.llc",
    siteName: "Aetherline L.L.C.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${jakarta.variable} ${jetbrains.variable} scroll-smooth dark`}
    >
      <body className="bg-[#030712] text-slate-100 font-[var(--font-jakarta)] antialiased overflow-x-hidden selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

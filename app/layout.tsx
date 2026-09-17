import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Aetherline L.L.C. Remote IT operations",
  description:
    "SAP Basis, Active Directory, Entra ID, Microsoft 365, SCCM, and ITIL run by Aetherline L.L.C from Pristina. Invoice as a contractor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030508] text-[#e8eef0]">
        <a className="skip-link" href="#engage">
          Skip to engage
        </a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ice4Riches - Premium Clear Ice Solutions",
  description: "Glace cristalline premium pour bars, restaurants, hôtels et événements à Paris. Sublimez vos cocktails avec notre glace parfaitement pure.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#0f0f0f] text-[#f5f3ef]">
        {children}
      </body>
    </html>
  );
}

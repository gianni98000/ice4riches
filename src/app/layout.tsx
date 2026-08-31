import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const siteUrl = SITE_URL;
const siteTitle = "Ice4Riches | Glace cristalline de la Côte d’Azur";
const siteDescription =
  "Née sur la Côte d’Azur, la glace cristalline premium Ice4Riches est livrée dans le monde entier aux bars, restaurants, hôtels et événements.";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Ice4Riches",
  },
  description: siteDescription,
  applicationName: "Ice4Riches",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Ice4Riches",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ice4Riches, glace cristalline née sur la Côte d’Azur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Ice4Riches",
      alternateName: "ICE4RICHES",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      description: siteDescription,
      foundingLocation: {
        "@type": "Place",
        name: "Côte d’Azur, France",
      },
      areaServed: "Worldwide",
      knowsAbout: [
        "Glace cristalline",
        "Glaçons transparents",
        "Glaçons pour cocktails",
        "Clear ice",
      ],
      sameAs: ["https://www.instagram.com/ice4riches/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Ice4Riches",
      description: siteDescription,
      inLanguage: "fr-FR",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#0f0f0f] text-[#f5f3ef]">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this serializes static JSON-LD data controlled by the site.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}

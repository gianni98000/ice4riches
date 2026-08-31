import type { Metadata } from "next";

type PageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  socialTitle?: string;
  socialDescription?: string;
};

export function createPageMetadata({
  path,
  title,
  description,
  socialTitle = title,
  socialDescription = description,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Ice4Riches",
      title: socialTitle,
      description: socialDescription,
      url: path,
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
      title: socialTitle,
      description: socialDescription,
      images: ["/opengraph-image"],
    },
  };
}

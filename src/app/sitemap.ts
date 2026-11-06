import { ICE_FORMATS } from "@/lib/ice-fit";
import { SITE_URL } from "@/lib/site";
import { LOCAL_PAGES } from "@/lib/local-pages";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Last content/navigation update; do not replace this with the build time.
  const lastModified = new Date("2026-11-06T00:00:00.000Z");

  const pages = [
    { path: "", priority: 1 },
    { path: "/clear-ice", priority: 0.9 },
    ...ICE_FORMATS.map((format) => ({ path: `/clear-ice/${format.id}`, priority: 0.8 })),
    { path: "/livraison-glacons-cote-d-azur", priority: 0.9 },
    { path: "/livraison-glacons-paris", priority: 0.9 },
    { path: "/glace-cristalline-paris", priority: 0.9 },
    { path: "/glacons-pour-cocktails", priority: 0.8 },
    { path: "/professionnels-evenements", priority: 0.8 },
    { path: "/fondateur", priority: 0.7 },
    { path: "/gravure-clear-ice-personnalisee", priority: 0.9 },
    ...LOCAL_PAGES.map((page) => ({
      path: `/livraison-clear-ice/${page.slug}`,
      priority: ["monaco", "cannes", "saint-tropez"].includes(page.slug) ? 0.95 : 0.9,
    })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

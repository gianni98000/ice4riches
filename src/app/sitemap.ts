import { SITE_URL } from "@/lib/site";
import { LOCAL_PAGES } from "@/lib/local-pages";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-14T00:00:00.000Z");

  const pages = [
    { path: "", priority: 1 },
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

  const updatedPaths = new Set(["", "/professionnels-evenements", "/gravure-clear-ice-personnalisee", ...LOCAL_PAGES.map((page) => `/livraison-clear-ice/${page.slug}`)]);

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updatedPaths.has(path) ? new Date("2026-11-05T00:00:00.000Z") : lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

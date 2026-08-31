import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-31T00:00:00.000Z");

  return [
    { path: "", priority: 1 },
    { path: "/livraison-glacons-paris", priority: 0.9 },
    { path: "/glace-cristalline-paris", priority: 0.9 },
    { path: "/glacons-pour-cocktails", priority: 0.8 },
    { path: "/professionnels-evenements", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

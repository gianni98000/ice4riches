import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ice4riches.com/sitemap.xml",
    host: "https://ice4riches.com",
  };
}

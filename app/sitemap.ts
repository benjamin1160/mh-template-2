import type { MetadataRoute } from "next";
import { listings } from "@/lib/homes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/homes", priority: 0.9 },
    { path: "/communities", priority: 0.8 },
    { path: "/land-deals", priority: 0.85 },
    { path: "/start-here", priority: 0.85 },
    { path: "/why-manufactured", priority: 0.8 },
    { path: "/financing", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority,
  }));

  const homes = listings.map((l) => ({
    url: `${site.url}/homes/${l.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...homes];
}

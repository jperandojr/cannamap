import type { MetadataRoute } from "next";
import { getStrains, getDispensaries, getSeedBanks, getArticles, getGrowingTips } from "@/lib/db";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://growingweed.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [strains, dispensaries, seedBanks, articles, tips] = await Promise.all([
    getStrains(),
    getDispensaries(),
    getSeedBanks(),
    getArticles(),
    getGrowingTips(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/strains`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/dispensaries`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/seed-banks`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/growing-tips`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/submit`, changeFrequency: "monthly", priority: 0.4 },
  ];

  return [
    ...staticRoutes,
    ...strains.map((s) => ({
      url: `${BASE}/strains/${s.slug}`,
      lastModified: s.created_at ? new Date(s.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...dispensaries.map((d) => ({
      url: `${BASE}/dispensaries/${d.slug}`,
      lastModified: d.created_at ? new Date(d.created_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...seedBanks.map((b) => ({
      url: `${BASE}/seed-banks/${b.slug}`,
      lastModified: b.created_at ? new Date(b.created_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${BASE}/news/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tips.map((t) => ({
      url: `${BASE}/growing-tips/${t.slug}`,
      lastModified: t.published_at ? new Date(t.published_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

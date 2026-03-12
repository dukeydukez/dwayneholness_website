import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const BASE_URL = "https://dwayneholness.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/writing/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/speaking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  return [...staticPages, ...articleEntries];
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: "https://orquesdra.com",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: "https://orquesdra.com/en" } },
    },
    {
      url: "https://orquesdra.com/en",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { "pt-PT": "https://orquesdra.com" } },
    },
  ];
}

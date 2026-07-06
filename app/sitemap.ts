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
    {
      url: "https://orquesdra.com/termos",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://orquesdra.com/privacidade",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://orquesdra.com/reembolsos",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://orquesdra.com/contacto",
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}

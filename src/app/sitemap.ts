import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

const images = ["plats", "salle", "risotto-girolles", "brunch", "cave-a-vin", "poulpe"].map(
  (name) => `${siteUrl}/images/${name}.jpg`,
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images,
    },
  ];
}

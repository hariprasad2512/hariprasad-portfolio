import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

const routes = [
  "",
  "/experience",
  "/projects",
  "/gallery",
  "/skills",
  "/achievements",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${profile.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

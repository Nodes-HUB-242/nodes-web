import type { MetadataRoute } from "next";
import { DATA_MASTER_PARCOURS } from "@/app/formations/data-master/data-master-data";
import { IA_MASTER_PARCOURS } from "@/app/formations/ia-master/ia-master-data";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "/",
    "/formations",
    "/formations/data-master",
    "/formations/ia-master",
    "/formulaire",
    "/formulaire/inscription",
  ];

  const dynamicRoutes = [
    ...DATA_MASTER_PARCOURS.map((parcours) => `/formations/data-master/parcours/${parcours.id}`),
    ...IA_MASTER_PARCOURS.map((parcours) => `/formations/ia-master/parcours/${parcours.id}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/formations") ? 0.8 : 0.7,
  }));
}

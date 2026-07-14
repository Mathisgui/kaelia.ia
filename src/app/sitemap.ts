import type { MetadataRoute } from "next";
import { getAllPosts, getTranslatedSlug } from "@/lib/blog";
import { routes, type Locale, type RouteKey } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

const PRIORITIES: Partial<Record<RouteKey, number>> = {
  home: 1,
  agents: 0.9,
  automations: 0.9,
  agentEmail: 0.8,
  agentDocs: 0.8,
  agentSales: 0.8,
  agentKnowledge: 0.8,
  sectorTraining: 0.8,
  sectorLegal: 0.8,
  cases: 0.8,
  method: 0.7,
  formation: 0.6,
  about: 0.6,
  blog: 0.8,
  legalNotice: 0.2,
  privacy: 0.2,
};

function absolute(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Pages statiques FR + EN avec alternates hreflang
  for (const key of Object.keys(routes) as RouteKey[]) {
    const entry = routes[key] as Partial<Record<Locale, string>>;
    const languages: Record<string, string> = {};
    if (entry.fr) languages.fr = absolute(entry.fr);
    if (entry.en) languages.en = absolute(entry.en);

    for (const locale of ["fr", "en"] as Locale[]) {
      const path = entry[locale];
      if (!path) continue;
      entries.push({
        url: absolute(path),
        lastModified: new Date(),
        changeFrequency: key === "home" || key === "blog" ? "weekly" : "monthly",
        priority: PRIORITIES[key] ?? 0.5,
        ...(entry.en ? { alternates: { languages } } : {}),
      });
    }
  }

  // Articles de blog par langue, avec hreflang croisés
  for (const locale of ["fr", "en"] as Locale[]) {
    const basePath = locale === "fr" ? "/blog" : "/en/blog";
    for (const post of getAllPosts(locale)) {
      const translated = getTranslatedSlug(locale, post.slug);
      const otherBase = locale === "fr" ? "/en/blog" : "/blog";
      const languages: Record<string, string> = {
        [locale]: absolute(`${basePath}/${post.slug}`),
      };
      if (translated) {
        languages[locale === "fr" ? "en" : "fr"] = absolute(`${otherBase}/${translated}`);
      }
      entries.push({
        url: absolute(`${basePath}/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        ...(translated ? { alternates: { languages } } : {}),
      });
    }
  }

  return entries;
}

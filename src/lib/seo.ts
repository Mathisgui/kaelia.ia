import type { Metadata } from "next";
import { routes, type Locale, type RouteKey } from "./routes";

export const SITE_URL = "https://kaelia-ai.com";
export const SITE_NAME = "Kael'IA";
export const OG_IMAGE = "/og-image.png";

const OG_LOCALE: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };

interface BuildMetadataParams {
  locale: Locale;
  routeKey?: RouteKey;
  /** Chemin explicite (articles de blog) ; prioritaire sur routeKey. */
  path?: string;
  /** Chemin de la version traduite pour les hreflang (articles de blog). */
  alternate?: { locale: Locale; path: string };
  title: string;
  description: string;
}

/**
 * Metadata complètes pour une page : canonical absolu, hreflang fr/en/x-default,
 * OpenGraph et Twitter avec image. x-default pointe toujours vers la version FR.
 */
export function buildMetadata({
  locale,
  routeKey,
  path,
  alternate,
  title,
  description,
}: BuildMetadataParams): Metadata {
  const entry = routeKey
    ? (routes[routeKey] as Partial<Record<Locale, string>>)
    : undefined;
  const pagePath = path ?? entry?.[locale] ?? "/";
  const canonical = `${SITE_URL}${pagePath === "/" ? "" : pagePath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  const languages: Record<string, string> = {};
  const frPath = locale === "fr" ? pagePath : alternate?.locale === "fr" ? alternate.path : entry?.fr;
  const enPath = locale === "en" ? pagePath : alternate?.locale === "en" ? alternate.path : entry?.en;
  if (frPath) {
    languages.fr = `${SITE_URL}${frPath === "/" ? "" : frPath}`;
    languages["x-default"] = languages.fr;
  }
  if (enPath) {
    languages.en = `${SITE_URL}${enPath}`;
  }

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      ...(Object.keys(languages).length > 1 ? { languages } : {}),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: canonical,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}

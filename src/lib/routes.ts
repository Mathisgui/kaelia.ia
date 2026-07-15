export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

/**
 * Table de correspondance unique FR <-> EN.
 * Alimente la navigation, les hreflang, le sitemap et le sélecteur de langue.
 * Les clés sans entrée `en` n'existent qu'en français (pages légales).
 */
export const routes = {
  home: { fr: "/", en: "/en" },
  agents: { fr: "/agents-ia", en: "/en/ai-agents" },
  automations: { fr: "/automatisations", en: "/en/automations" },
  agentEmail: { fr: "/agent-ia-email", en: "/en/ai-email-agent" },
  agentDocs: { fr: "/agent-ia-documentaire", en: "/en/ai-document-agent" },
  agentSales: { fr: "/agent-ia-commercial", en: "/en/ai-sales-agent" },
  agentKnowledge: { fr: "/agent-ia-connaissance", en: "/en/ai-knowledge-agent" },
  agentReporting: { fr: "/agent-ia-reporting", en: "/en/ai-reporting-agent" },
  sectorTraining: {
    fr: "/automatisation-organisme-formation",
    en: "/en/training-provider-automation",
  },
  sectorLegal: {
    fr: "/automatisation-cabinet-avocat",
    en: "/en/law-firm-automation",
  },
  cases: { fr: "/cas-clients", en: "/en/case-studies" },
  method: { fr: "/methode", en: "/en/method" },
  formation: { fr: "/formation-ia", en: "/en/ai-training" },
  about: { fr: "/a-propos", en: "/en/about" },
  blog: { fr: "/blog", en: "/en/blog" },
  legalNotice: { fr: "/mentions-legales" },
  privacy: { fr: "/confidentialite" },
} as const;

export type RouteKey = keyof typeof routes;

export function routePath(key: RouteKey, locale: Locale): string {
  const entry = routes[key] as Partial<Record<Locale, string>>;
  return entry[locale] ?? entry.fr ?? "/";
}

/** URL équivalente dans l'autre langue (fallback : home de l'autre langue). */
export function alternatePath(key: RouteKey, locale: Locale): string {
  const other: Locale = locale === "fr" ? "en" : "fr";
  const entry = routes[key] as Partial<Record<Locale, string>>;
  return entry[other] ?? (other === "fr" ? "/" : "/en");
}

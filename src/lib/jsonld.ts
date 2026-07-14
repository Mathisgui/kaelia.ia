import { SITE_URL, SITE_NAME } from "./seo";
import type { Locale } from "./routes";
import type { FaqItem } from "@/content/types";

const DESCRIPTIONS: Record<Locale, string> = {
  fr: "Kael'IA conçoit et déploie des agents IA et des automatisations métier sur mesure : emails, documents, CRM, relances et reporting, directement dans les outils des entreprises.",
  en: "Kael'IA designs and deploys custom AI agents and business automations: emails, documents, CRM, follow-ups and reporting, directly inside company tools.",
};

const SERVICE_TYPES: Record<Locale, string[]> = {
  fr: [
    "Agents IA sur mesure",
    "Automatisation de processus métier (n8n, Make)",
    "Diagnostic des processus automatisables",
    "Maintenance et optimisation d'automatisations",
    "Formation IA",
  ],
  en: [
    "Custom AI agents",
    "Business process automation (n8n, Make)",
    "Automation opportunity assessment",
    "Automation maintenance and optimization",
    "AI training",
  ],
};

export function professionalServiceJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: DESCRIPTIONS[locale],
    url: SITE_URL,
    logo: `${SITE_URL}/logo-kaelia.png`,
    image: `${SITE_URL}/og-image.png`,
    email: "m.guillemois@kaelia-formacoach.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "198 Rue des Amis de l'Industrie",
      postalCode: "42590",
      addressLocality: "Neulise",
      addressCountry: "FR",
    },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: SERVICE_TYPES[locale],
    knowsAbout: [
      "Intelligence artificielle",
      "Agents IA",
      "Automatisation",
      "n8n",
      "Make",
      "Claude AI",
      "OpenAI",
      "RAG",
    ],
    founder: {
      "@type": "Person",
      name: "Mathis Guillemois",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-kaelia.png`,
    email: "m.guillemois@kaelia-formacoach.com",
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(segments: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((segment, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: segment.name,
      item: `${SITE_URL}${segment.path === "/" ? "" : segment.path}`,
    })),
  };
}

export function articleJsonLd(params: {
  title: string;
  description: string;
  datePublished: string;
  path: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    description: params.description,
    datePublished: params.datePublished,
    dateModified: params.datePublished,
    inLanguage: params.locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${params.path}`,
    },
    author: { "@type": "Person", name: "Mathis Guillemois" },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-kaelia.png` },
    },
  };
}

/** Helper de rendu : à injecter via dangerouslySetInnerHTML dans un <script type="application/ld+json">. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data);
}

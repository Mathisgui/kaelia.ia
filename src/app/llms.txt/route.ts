import { getAllPosts } from "@/lib/blog";
import { routes, type Locale, type RouteKey } from "@/lib/routes";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const dynamic = "force-static";

const PAGE_LABELS: Partial<Record<RouteKey, string>> = {
  agents: "Agents IA sur mesure : ce que c'est, quand ça remplace un outil, combien ça coûte",
  automations: "Automatisations métier (n8n, Make) : processus couverts et méthode",
  agentEmail: "Agent IA pour le traitement des emails professionnels",
  agentDocs: "Agent IA documentaire : extraction et classement de documents",
  agentSales: "Agent IA commercial : relances, devis, suivi des opportunités",
  agentKnowledge: "Agent IA de connaissance : recherche dans les documents internes",
  agentReporting: "Agent IA de reporting : tableaux de bord et rapports automatiques",
  sectorTraining: "Automatisation pour les organismes de formation",
  sectorLegal: "Automatisation pour les cabinets d'avocats",
  cases: "Cas clients et résultats mesurés",
  method: "Méthode de déploiement, du diagnostic à la mise en production",
  formation: "Formations IA (dispensées par Kaelia, organisme certifié Qualiopi)",
  about: "À propos de Mathis Guillemois et de Kael'IA",
  blog: "Blog : guides pratiques sur les agents IA et l'automatisation",
};

const PAGE_ORDER: RouteKey[] = [
  "agents",
  "automations",
  "agentEmail",
  "agentDocs",
  "agentSales",
  "agentKnowledge",
  "agentReporting",
  "sectorTraining",
  "sectorLegal",
  "cases",
  "method",
  "formation",
  "about",
  "blog",
];

function section(title: string, lines: string[]): string {
  return `## ${title}\n\n${lines.join("\n")}\n`;
}

function postLines(locale: Locale): string[] {
  const base = locale === "fr" ? "/blog" : "/en/blog";
  return getAllPosts(locale).map(
    (post) => `- [${post.title}](${SITE_URL}${base}/${post.slug}) : ${post.excerpt}`
  );
}

export function GET() {
  const pages = PAGE_ORDER.map((key) => {
    const path = (routes[key] as Partial<Record<Locale, string>>).fr;
    return `- [${PAGE_LABELS[key] ?? key}](${SITE_URL}${path})`;
  });

  const body = [
    `# ${SITE_NAME}`,
    "",
    "> Kael'IA conçoit et déploie des agents IA et des automatisations métier sur mesure pour des TPE et PME françaises : traitement documentaire, CRM, relances, emails et reporting, directement dans les outils déjà utilisés par l'entreprise.",
    "",
    "Kael'IA est l'activité d'agents IA et d'automatisations de Mathis Guillemois. À ne pas confondre avec Kaelia (kaelia-formacoach.com), organisme de formation certifié Qualiopi dont il est associé : les formations financées passent par Kaelia, les systèmes sur mesure par Kael'IA.",
    "",
    section("Pages principales", pages),
    section("Articles (français)", postLines("fr")),
    section("Articles (English)", postLines("en")),
    section("Contact", [
      `- Diagnostic gratuit de 30 minutes : ${SITE_URL}`,
      "- Email : m.guillemois@kaelia-formacoach.com",
    ]),
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

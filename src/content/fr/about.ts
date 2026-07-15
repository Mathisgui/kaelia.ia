import type { AboutPageContent } from "../types";

export const about: AboutPageContent = {
  meta: {
    title: "À propos : qui est derrière Kael'IA",
    description:
      "Kael'IA conçoit des agents IA et des automatisations métier pour les entreprises. Découvrez le parcours de Mathis Guillemois et l'écosystème Kaelia.",
  },
  hero: {
    eyebrow: "La branche IA du groupe Kaelia",
    brand: "KAEL'IA",
    manifesto:
      "Kael'IA construit des agents IA et des automatisations qui prennent réellement en charge une partie des opérations des entreprises : documents, CRM, relances, emails, reporting. Des systèmes concrets, mesurables, intégrés aux outils existants.",
    vision:
      "Notre conviction : la bonne question n'est pas « comment utiliser l'IA ? » mais « quelles tâches peut-on lui confier, avec quel contrôle et quel résultat ? ». C'est à cette question que chaque mission répond.",
    chips: ["Agents IA", "Automatisations", "Kael'IA · 2025"],
  },
  profile: {
    label: "Associé · CTO · Fondateur · Branche IA",
    name: "Mathis Guillemois",
    paragraphs: [
      "Formé au management à l'IAE puis passé par le marketing et le management opérationnel, j'ai vu de l'intérieur ce qui ralentit les équipes : les outils qui ne dialoguent pas, les tâches répétitives, les heures perdues sur ce qui devrait être instantané.",
      "Quand l'IA générative a émergé, j'ai repris les études pour passer un diplôme en data et en IA. Objectif : ne pas seulement en parler, mais savoir construire. Aujourd'hui je conçois et déploie des agents IA et des automatisations pour des entreprises de toutes tailles.",
      "Mon approche tient en une phrase : des choses qui tournent et qui durent. Chaque déploiement est documenté, supervisable et pensé pour rendre vos équipes autonomes, pas dépendantes.",
    ],
  },
  timeline: {
    title: "De l'IAE à l'IA",
    items: [
      {
        year: "Master IAE",
        title: "Les fondations stratégiques",
        description:
          "Master en management à l'IAE. J'y apprends à lire une entreprise, à structurer une décision, à comprendre ce qui fait bouger une organisation.",
      },
      {
        year: "Marketing & Management",
        title: "Le terrain",
        description:
          "Premières années dans le marketing et le management. Je vois de l'intérieur ce qui ralentit les équipes : outils cloisonnés, tâches répétitives, ressaisies sans fin.",
      },
      {
        year: "Le virage IA",
        title: "Repartir apprendre",
        description:
          "L'IA générative émerge. Je reprends les études, passe un diplôme en data et en IA, et plonge dans la technique pour savoir construire, pas seulement conseiller.",
      },
      {
        year: "Freelance & Kael'IA",
        title: "De la conviction à l'impact",
        description:
          "Je déploie des agents IA et des automatisations pour des entreprises, en freelance puis en lançant la branche IA de Kaelia avec mes associés. Chaque mission confirme la même chose : bien appliquée, l'IA rend du temps et de la marge.",
      },
      {
        year: "Aujourd'hui",
        title: "Des systèmes en production",
        description:
          "Des entreprises accompagnées dans plusieurs secteurs, des agents et automatisations en production au quotidien, et une exigence constante : livrer des résultats mesurables.",
      },
    ],
  },
  skills: {
    title: "Expertises",
    items: [
      "Agents IA & LLMs",
      "Automatisation n8n / Make",
      "RAG & bases vectorielles",
      "Prompt Engineering",
      "OpenAI · Anthropic · Mistral",
      "Intégrations API & outils métier",
      "Diagnostic & priorisation ROI",
      "Adoption & formation des équipes",
    ],
  },
  team: {
    title: "Les associés Kaelia",
    description:
      "Kael'IA est la branche IA du groupe Kaelia. Trois associés, trois expertises complémentaires.",
    members: [
      {
        name: "Killian Guillemois",
        role: "CEO · Kaelia",
        description:
          "Pilote la stratégie globale et la croissance du groupe Kaelia. Garant d'une exécution exigeante et d'un cap clair pour l'ensemble des branches.",
        image: "/ki-kaelia-1.jpg",
      },
      {
        name: "Karine Weil",
        role: "COO · Kaelia",
        description:
          "Architecte des opérations et du modèle pédagogique de Kaelia. Veille à la qualité et à la conformité de chaque accompagnement.",
        image: "/ka-kaelia.jpg",
      },
    ],
  },
  quote: {
    text: "L'IA apporte la puissance d'exécution. L'humain apporte la clarté du cap.",
    author: "Mathis Guillemois",
  },
  partnership: {
    title: "L'écosystème Kaelia",
    paragraphs: [
      "Kaelia est un organisme de formation certifié Qualiopi, co-fondé par les trois associés. Kael'IA en est la branche dédiée aux agents IA et aux automatisations.",
      "Cette double structure a un avantage concret pour vous : quand un déploiement nécessite de former les équipes, la formation peut être prise en charge dans un cadre certifié et finançable. Le système technique et la montée en compétences avancent ensemble.",
    ],
  },
  cta: {
    title: "Discutons de vos processus",
    description:
      "En 30 minutes, nous identifions un premier cas d'usage concret pour votre entreprise.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

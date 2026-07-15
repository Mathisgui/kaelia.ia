import type { CasesPageContent } from "../types";

export const cases: CasesPageContent = {
  meta: {
    title: "Cas clients : automatisations et agents IA déployés",
    description:
      "Des scénarios détaillés d'automatisation et d'agents IA en entreprise : contexte, solution, outils connectés et résultats avant/après.",
  },
  hero: {
    eyebrow: "Cas clients",
    title: "Ce que ces systèmes changent, concrètement",
    description:
      "Trois déploiements types, détaillés de bout en bout : le contexte, le processus initial, la solution mise en place et les résultats.",
  },
  disclaimer:
    "Scénarios représentatifs de nos déploiements, anonymisés et présentés par secteur et taille d'entreprise.",
  labels: {
    context: "Contexte",
    problem: "Processus initial",
    solution: "Solution déployée",
    tools: "Outils connectés",
    duration: "Délai de mise en place",
    results: "Résultats",
    metric: "Indicateur",
    before: "Avant",
    after: "Après",
  },
  cases: [
    {
      sector: "Organisme de formation",
      size: "12 salariés",
      title: "Le parcours stagiaire sans ressaisie",
      context:
        "Un organisme de formation qui gère une dizaine de sessions par mois. Deux personnes à l'administratif, débordées par les documents : conventions, convocations, émargements, attestations, questionnaires qualité.",
      problem: [
        "Chaque session déclenchait la production manuelle d'une vingtaine de documents",
        "Les feuilles d'émargement papier étaient ressaisies dans un tableur",
        "Les questionnaires à chaud et à froid partaient en retard, ou pas du tout",
        "Les preuves Qualiopi étaient rassemblées dans l'urgence avant chaque audit",
      ],
      solution:
        "Une automatisation n8n orchestre le parcours complet depuis l'inscription : génération des conventions et convocations, lecture OCR des émargements, consolidation des présences, envoi automatique des questionnaires aux bonnes dates et archivage structuré des preuves.",
      tools: ["n8n", "Google Workspace", "Google Sheets", "OCR", "Notion"],
      duration: "4 semaines, du diagnostic à la mise en production",
      results: [
        {
          label: "Production des documents d'une session",
          before: "Environ 3 heures",
          after: "Moins de 15 minutes de contrôle",
        },
        {
          label: "Saisie des émargements",
          before: "45 minutes par session",
          after: "Automatique, contrôle en 5 minutes",
        },
        {
          label: "Questionnaires qualité envoyés",
          before: "Irrégulier",
          after: "100% aux dates prévues",
        },
      ],
      outcome:
        "L'équipe administrative a récupéré l'équivalent d'une journée par semaine, réinvestie sur la relation stagiaires et le développement commercial.",
    },
    {
      sector: "PME de services B2B",
      size: "25 salariés",
      title: "La boîte contact@ traitée par un agent",
      context:
        "Une PME de services dont la boîte contact@ reçoit demandes commerciales, questions clients et candidatures mélangées. Le tri mobilisait une personne chaque matin, et des demandes passaient à la trappe.",
      problem: [
        "60 à 80 emails entrants par jour, triés manuellement",
        "Des demandes commerciales découvertes plusieurs jours après réception",
        "Des réponses répétitives réécrites à chaque fois",
        "Aucune trace des demandes dans le CRM",
      ],
      solution:
        "Un agent IA analyse chaque email entrant : classification par motif, détection des urgences, préparation d'une réponse à valider pour les demandes courantes, création automatique du contact et de la tâche dans le CRM pour les demandes commerciales.",
      tools: ["n8n", "Gmail", "Anthropic API", "HubSpot", "Slack"],
      duration: "3 semaines, du diagnostic à la mise en production",
      results: [
        {
          label: "Temps de tri quotidien",
          before: "Environ 1 heure",
          after: "Supprimé, tri en continu",
        },
        {
          label: "Délai de première réponse commerciale",
          before: "24 à 72 heures",
          after: "Moins de 4 heures",
        },
        {
          label: "Demandes tracées dans le CRM",
          before: "Au bon vouloir de chacun",
          after: "100% automatique",
        },
      ],
      outcome:
        "Plus aucune demande commerciale oubliée, et les réponses partent le jour même avec une validation en un clic.",
    },
    {
      sector: "Cabinet de conseil",
      size: "8 salariés",
      title: "Le reporting client généré depuis les données",
      context:
        "Un cabinet qui produisait chaque mois un rapport d'activité par client, assemblé à la main depuis le CRM, les feuilles de temps et les tableurs de suivi.",
      problem: [
        "Une demi-journée par consultant et par mois passée sur les rapports",
        "Des chiffres recopiés avec des erreurs régulières",
        "Des formats hétérogènes selon le consultant",
        "Des envois en retard en période de charge",
      ],
      solution:
        "Une automatisation consolide les données des trois sources, génère un rapport PDF au format unique du cabinet et le soumet au consultant pour validation avant envoi planifié au client.",
      tools: ["Make", "Airtable", "Google Sheets", "Google Docs", "Gmail"],
      duration: "2 semaines, du diagnostic à la mise en production",
      results: [
        {
          label: "Temps de production par rapport",
          before: "3 à 4 heures",
          after: "15 minutes de relecture",
        },
        {
          label: "Erreurs de chiffres signalées par les clients",
          before: "Plusieurs par trimestre",
          after: "Zéro depuis la mise en place",
        },
        {
          label: "Envoi dans les délais",
          before: "Variable",
          after: "100% à date fixe",
        },
      ],
      outcome:
        "Le cabinet a standardisé sa qualité de reporting et récupéré plusieurs jours de temps facturable chaque mois.",
    },
  ],
  cta: {
    title: "Et dans votre entreprise ?",
    description:
      "Chaque cas a commencé par le même diagnostic de 30 minutes : vos processus, vos outils, une estimation des gains.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

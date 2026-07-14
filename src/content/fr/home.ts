import type { HomeContent } from "../types";

export const home: HomeContent = {
  meta: {
    title: "Agents IA & automatisation pour entreprises | Kael'IA",
    description:
      "Kael'IA conçoit des agents IA et des automatisations sur mesure pour gérer vos emails, documents, CRM, relances et reportings. Diagnostic gratuit de 30 minutes.",
  },

  hero: {
    title: "Des agents IA qui exécutent vos tâches métier, directement dans vos outils.",
    description:
      "Kael'IA automatise les emails, les documents, les relances, le CRM et le reporting de votre entreprise grâce à des agents IA et des workflows sur mesure. Moins de ressaisie. Moins d'oublis. Plus de temps pour vos équipes.",
    ctaPrimary: "Identifier mes processus automatisables",
    ctaPrimaryNote: "Diagnostic de 30 minutes · Premier cas d'usage identifié · Sans engagement",
    ctaSecondary: "Voir des exemples d'agents IA",
  },

  operations: {
    eyebrow: "Ce que nous automatisons",
    title: "Les opérations que Kael'IA peut prendre en charge",
    description:
      "Chaque entreprise perd des heures sur les mêmes tâches : trier, ressaisir, relancer, reporter. Voici ce que nos agents et workflows exécutent à votre place.",
    items: [
      {
        icon: "mail",
        title: "Emails et demandes entrantes",
        description:
          "Classement des messages, détection des urgences, préparation des réponses et création automatique des tâches de suivi.",
      },
      {
        icon: "document",
        title: "Documents et données",
        description:
          "Extraction des informations de vos factures, devis et formulaires, puis classement et saisie dans les bons outils, sans copier-coller.",
      },
      {
        icon: "target",
        title: "Prospection et CRM",
        description:
          "Qualification des demandes, mise à jour automatique des fiches, relances déclenchées selon vos règles commerciales.",
      },
      {
        icon: "handshake",
        title: "Onboarding client",
        description:
          "Dès la signature : création des espaces client, envoi des documents, planification des étapes. Un parcours identique pour chaque client.",
      },
      {
        icon: "chart",
        title: "Reporting et pilotage",
        description:
          "Vos rapports générés automatiquement depuis les données réelles de vos outils, à la fréquence que vous choisissez.",
      },
      {
        icon: "book",
        title: "Base de connaissances interne",
        description:
          "Une IA branchée sur vos documents internes qui répond aux questions de vos équipes avec les sources à l'appui.",
      },
    ],
  },

  pedagogy: {
    eyebrow: "Comprendre",
    title: "Agent IA ou automatisation : quelle différence ?",
    description:
      "Deux briques complémentaires. Bien les distinguer, c'est éviter de payer une IA pour ce qu'un simple workflow fait mieux, et inversement.",
    automation: {
      title: "L'automatisation",
      description:
        "Elle suit un scénario prédéfini, toujours le même, de façon fiable et traçable.",
      example:
        "Un formulaire est envoyé : le contact est créé dans le CRM, un email de bienvenue part, une tâche commerciale est assignée.",
    },
    agent: {
      title: "L'agent IA",
      description:
        "Il analyse un contenu variable et choisit une action dans un cadre que vous définissez.",
      example:
        "Un email client arrive : l'agent comprend la demande, retrouve les informations pertinentes et prépare une réponse adaptée.",
    },
    combined: {
      title: "Le système combiné",
      description:
        "L'agent comprend et décide, le workflow exécute et trace. C'est cette combinaison qui produit des résultats fiables en entreprise, avec une validation humaine là où elle compte.",
    },
  },

  agents: {
    eyebrow: "Exemples d'agents",
    title: "Des agents conçus pour vos opérations réelles",
    description:
      "Chaque agent travaille dans vos outils existants, avec un périmètre d'action défini et une validation humaine activable.",
    items: [
      {
        title: "Agent de gestion des emails",
        mission:
          "Analyse les demandes entrantes, prépare les réponses et organise leur suivi.",
        canDo: [
          "Classer les messages et détecter les urgences",
          "Préparer une réponse à valider",
          "Créer les tâches et mettre à jour le CRM",
        ],
        routeKey: "agentEmail",
        linkLabel: "Découvrir l'agent email",
      },
      {
        title: "Agent documentaire",
        mission:
          "Lit vos documents, en extrait les données utiles et génère les livrables.",
        canDo: [
          "Extraire les données de factures et formulaires",
          "Classer les fichiers au bon endroit",
          "Générer rapports et documents types",
        ],
        routeKey: "agentDocs",
        linkLabel: "Découvrir l'agent documentaire",
      },
      {
        title: "Agent commercial",
        mission:
          "Qualifie les demandes, tient le CRM à jour et déclenche les relances.",
        canDo: [
          "Qualifier les leads entrants",
          "Mettre à jour les fiches et opportunités",
          "Relancer les devis sans réponse",
        ],
        routeKey: "agentSales",
        linkLabel: "Découvrir l'agent commercial",
      },
      {
        title: "Agent de connaissance interne",
        mission:
          "Répond aux questions de vos équipes à partir de vos documents internes.",
        canDo: [
          "Chercher dans vos procédures et contrats",
          "Répondre avec les sources citées",
          "Rester à jour quand vos documents changent",
        ],
        routeKey: "agentKnowledge",
        linkLabel: "Découvrir l'agent de connaissance",
      },
    ],
  },

  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change concrètement",
    rows: [
      {
        before: "Emails triés manuellement chaque matin",
        after: "Classification et routage automatiques en continu",
      },
      {
        before: "Informations recopiées dans le CRM",
        after: "CRM mis à jour automatiquement à chaque échange",
      },
      {
        before: "Relances qui dépendent de la mémoire de chacun",
        after: "Relances déclenchées selon vos règles, sans oubli",
      },
      {
        before: "Rapports assemblés à la main en fin de mois",
        after: "Documents générés depuis les données, à la demande",
      },
      {
        before: "Recherche d'informations dans dix dossiers",
        after: "Réponse centralisée et sourcée en quelques secondes",
      },
    ],
  },

  stats: {
    eyebrow: "Résultats",
    title: "Des résultats qui parlent d'eux-mêmes",
    description:
      "Chaque mission est conçue pour livrer des résultats mesurables et un impact durable sur votre activité.",
    items: [
      {
        value: "97",
        suffix: "%",
        label: "Satisfaction client",
        description:
          "97% de satisfaction client sur l'ensemble de nos missions. Notre priorité : des livrables concrets, une communication transparente et des résultats à la hauteur de vos attentes.",
        percentage: 97,
      },
      {
        value: "3",
        suffix: "x",
        label: "Productivité",
        description:
          "Les solutions déployées multiplient en moyenne par 3 la capacité de traitement des équipes. Des processus qui prenaient des heures s'exécutent en minutes.",
        percentage: 75,
      },
      {
        value: "50",
        suffix: "%",
        label: "Économies réalisées",
        description:
          "En automatisant vos processus répétitifs, vous récupérez en moyenne 50% du temps de vos équipes, réalloué sur des missions à forte valeur ajoutée.",
        percentage: 88,
      },
    ],
  },

  method: {
    eyebrow: "Notre méthode",
    title: "Un déploiement maîtrisé, en quatre étapes",
    description:
      "Pas de projet tunnel : chaque étape produit un livrable concret et vous gardez la main à chaque décision.",
    steps: [
      {
        number: "01",
        title: "Diagnostic",
        description:
          "Cartographie de vos processus et identification des gisements de temps.",
        details:
          "Nous analysons vos opérations réelles : emails, documents, outils, ressaisies. Livrable : une liste priorisée de vos processus automatisables, avec l'estimation des gains et de la faisabilité pour chacun.",
      },
      {
        number: "02",
        title: "Prototype",
        description:
          "Construction d'un pilote limité et mesurable sur le cas d'usage le plus rentable.",
        details:
          "Un premier agent ou workflow fonctionnel sur un périmètre restreint. Vous constatez le résultat sur vos vraies données avant d'aller plus loin.",
      },
      {
        number: "03",
        title: "Déploiement",
        description:
          "Connexion à vos outils, tests des cas limites, documentation et prise en main par vos équipes.",
        details:
          "Intégration dans votre environnement réel, gestion des cas particuliers, documentation complète. Vos équipes sont formées à l'utilisation et à la supervision du système.",
      },
      {
        number: "04",
        title: "Optimisation",
        description:
          "Suivi des erreurs, des coûts et des résultats. Le système s'améliore en continu.",
        details:
          "Surveillance des workflows, correction des anomalies, ajustement des règles métier et suivi des coûts d'utilisation. Vous savez toujours ce que le système fait et ce qu'il vous rapporte.",
      },
    ],
    pageLink: "Voir la méthode en détail",
  },

  integrations: {
    eyebrow: "Intégrations",
    title: "Connecté aux outils que vous utilisez déjà",
    description:
      "Pas de nouvelle plateforme à adopter : les agents et workflows s'intègrent à votre environnement existant.",
    tools: [
      "n8n",
      "Make",
      "Notion",
      "Google Workspace",
      "Microsoft 365",
      "Airtable",
      "HubSpot",
      "Pipedrive",
      "Slack",
      "OpenAI",
      "Anthropic",
      "Mistral",
    ],
  },

  security: {
    eyebrow: "Sécurité & contrôle",
    title: "Vous gardez le contrôle, à chaque étape",
    description:
      "Un agent IA en entreprise doit être encadré. Voici comment nous concevons chaque déploiement.",
    items: [
      {
        title: "Où transitent vos données ?",
        description:
          "Vos données restent dans vos outils. Les modèles IA ne sont appelés que sur le strict nécessaire, et vos données ne servent jamais à les entraîner.",
      },
      {
        title: "Qui peut déclencher une action ?",
        description:
          "Chaque agent agit dans un périmètre défini avec vous : quelles actions, sur quels outils, dans quelles limites. Rien d'autre.",
      },
      {
        title: "Quelles actions demandent une validation humaine ?",
        description:
          "Envoi d'un email, modification d'un document, engagement client : vous choisissez ce qui part automatiquement et ce qui attend votre feu vert.",
      },
      {
        title: "Que se passe-t-il si un workflow échoue ?",
        description:
          "Chaque exécution est tracée. En cas d'erreur, le système alerte, bascule vers un traitement manuel et rien ne se perd en silence.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    items: [
      {
        question: "Quelle différence entre un agent IA et une automatisation ?",
        answer:
          "Une automatisation suit un scénario prédéfini (si X alors Y), de façon fiable et traçable. Un agent IA analyse un contenu variable (un email, un document) et choisit une action dans un cadre défini. Dans la plupart des projets, les deux se combinent : l'agent comprend et décide, le workflow exécute et trace.",
      },
      {
        question: "Peut-on connecter la solution à nos outils actuels ?",
        answer:
          "Oui, c'est le principe. Nous travaillons avec n8n et Make, qui se connectent à des centaines d'outils : Google Workspace, Microsoft 365, Notion, Airtable, HubSpot, Pipedrive, logiciels métier via API. Le diagnostic vérifie la faisabilité sur votre environnement précis.",
      },
      {
        question: "Nos données sont-elles utilisées pour entraîner les modèles ?",
        answer:
          "Non. Nous utilisons les API professionnelles d'OpenAI, Anthropic ou Mistral, dont les conditions excluent l'entraînement sur vos données. Vos données restent dans vos outils et ne transitent que pour le traitement demandé.",
      },
      {
        question: "Une validation humaine est-elle possible ?",
        answer:
          "Oui, et nous la recommandons pour toute action sortante au démarrage : l'agent prépare, un humain valide en un clic. Une fois la confiance établie, vous choisissez ce qui passe en automatique.",
      },
      {
        question: "Combien de temps prend un premier déploiement ?",
        answer:
          "Un premier pilote fonctionne généralement en 2 à 4 semaines après le diagnostic, selon la complexité du processus et les accès aux outils. L'objectif : un résultat mesurable rapidement, pas un projet de six mois.",
      },
      {
        question: "Comment la maintenance est-elle organisée ?",
        answer:
          "Chaque déploiement inclut la documentation et la formation de vos équipes. Ensuite, un forfait de maintenance optionnel couvre la surveillance des workflows, la correction des erreurs, l'évolution des intégrations et le suivi des coûts d'API.",
      },
      {
        question: "Quel budget faut-il prévoir ?",
        answer:
          "Les projets sont au forfait, à partir de 1 500 € pour une première automatisation ou un premier agent. Le diagnostic gratuit permet d'estimer précisément le coût et le gain attendu avant tout engagement.",
      },
      {
        question: "Formez-vous les équipes après le déploiement ?",
        answer:
          "Oui, la prise en main fait partie de chaque déploiement. Pour aller plus loin, des formations IA complètes et finançables sont proposées en partenariat avec Kaelia, organisme certifié Qualiopi.",
      },
    ],
  },

  finalCta: {
    title: "Identifions votre premier processus à automatiser",
    description:
      "En 30 minutes, nous analysons vos tâches les plus chronophages et sélectionnons un premier cas d'usage réaliste, avec une estimation des gains.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

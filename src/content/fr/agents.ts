import type { SolutionPageContent, AgentPageContent } from "../types";

export const agentsHub: SolutionPageContent = {
  meta: {
    title: "Agents IA sur mesure pour entreprises",
    description:
      "Des agents IA qui comprennent vos demandes et exécutent des actions dans vos outils : documents, CRM, emails, reporting, connaissance interne. Et du sur mesure selon votre besoin.",
  },
  hero: {
    eyebrow: "Agents IA",
    title: "Des agents IA qui travaillent dans vos outils",
    description:
      "Un agent IA comprend une demande, utilise le contexte de votre entreprise, choisit une action dans un périmètre défini et l'exécute dans vos outils existants. Pas une IA magique : un collaborateur numérique encadré, traçable et supervisé.",
    cta: "Identifier mes cas d'usage",
  },
  useCases: {
    eyebrow: "Cas d'usage",
    title: "Ce qu'un agent IA peut prendre en charge",
    description:
      "Les agents sont conçus autour de vos tâches réelles, pas autour de la technologie.",
    items: [
      {
        title: "Lire et produire vos documents",
        description:
          "Factures, devis, formulaires, rapports : l'agent extrait les données utiles et assemble les documents à partir de vos modèles.",
      },
      {
        title: "Tenir vos outils à jour",
        description:
          "CRM, tableurs, bases de données : l'agent y reporte les informations extraites des échanges, sans ressaisie manuelle.",
      },
      {
        title: "Comprendre et trier les demandes entrantes",
        description:
          "Emails, formulaires, messages : l'agent identifie le motif, l'urgence et le bon destinataire, puis prépare le traitement.",
      },
      {
        title: "Préparer des réponses contextualisées",
        description:
          "L'agent s'appuie sur vos documents, votre historique client et vos règles métier pour rédiger une réponse prête à valider.",
      },
      {
        title: "Chercher dans votre connaissance interne",
        description:
          "Procédures, contrats, comptes rendus : l'agent retrouve l'information et répond avec les sources citées.",
      },
      {
        title: "Déclencher les bonnes actions",
        description:
          "Créer une tâche, planifier une relance, alerter la bonne personne : l'agent enchaîne les actions dans le cadre que vous avez défini.",
      },
    ],
  },
  explainer: {
    title: "Un agent IA n'est pas un chatbot",
    paragraphs: [
      "Un chatbot répond à des questions. Un agent IA exécute des tâches : il lit, comprend, décide dans un cadre défini, puis agit dans vos outils (répondre, classer, mettre à jour, créer, relancer).",
      "Chaque agent est livré avec son périmètre d'action, ses règles de validation humaine et sa traçabilité. Vous savez toujours ce qu'il a fait, pourquoi, et vous pouvez reprendre la main à tout moment.",
    ],
  },
  children: {
    eyebrow: "Nos agents",
    title: "Cinq agents spécialisés, et du sur mesure",
    description:
      "Chaque agent est spécialisé sur un type d'opération et détaillé sur sa propre page. Et si votre besoin ne rentre dans aucune case, nous concevons l'agent qu'il vous faut : parlons-en au diagnostic.",
    items: [
      {
        title: "Agent documentaire",
        description:
          "Extrait les données de vos factures, devis et formulaires, classe les fichiers et génère les documents.",
        href: "/agent-ia-documentaire",
        linkLabel: "Voir l'agent documentaire",
      },
      {
        title: "Agent commercial",
        description:
          "Qualifie les leads, tient le CRM à jour et déclenche les relances au bon moment.",
        href: "/agent-ia-commercial",
        linkLabel: "Voir l'agent commercial",
      },
      {
        title: "Agent de gestion des emails",
        description:
          "Trie les demandes entrantes, prépare les réponses, crée les tâches et met à jour le CRM.",
        href: "/agent-ia-email",
        linkLabel: "Voir l'agent email",
      },
      {
        title: "Agent de reporting",
        description:
          "Collecte les chiffres dans vos outils, les consolide et génère vos rapports à la fréquence choisie.",
        href: "/agent-ia-reporting",
        linkLabel: "Voir l'agent de reporting",
      },
      {
        title: "Agent de connaissance interne",
        description:
          "Répond aux questions de vos équipes à partir de vos documents, avec les sources.",
        href: "/agent-ia-connaissance",
        linkLabel: "Voir l'agent de connaissance",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Impact",
    title: "Ce qui change avec un agent en production",
    rows: [
      {
        before: "Chaque demande lue, triée et traitée à la main",
        after: "L'agent prépare, vous validez ce qui compte",
      },
      {
        before: "Des informations éparpillées entre outils",
        after: "Des outils tenus à jour automatiquement",
      },
      {
        before: "Des réponses qui prennent des heures à partir",
        after: "Des réponses prêtes en quelques minutes",
      },
    ],
  },
  faq: [
    {
      question: "Comment définit-on le périmètre d'action d'un agent ?",
      answer:
        "Ensemble, au diagnostic : quelles tâches, quels outils, quelles limites, quelles actions passent en automatique et lesquelles attendent une validation. Ce périmètre est documenté et l'agent ne peut pas en sortir.",
    },
    {
      question: "Que se passe-t-il quand l'agent ne sait pas ?",
      answer:
        "Il transmet à un humain, avec le contexte déjà préparé. Un bon agent en entreprise sait surtout reconnaître ce qu'il ne doit pas traiter seul.",
    },
    {
      question: "Combien coûte un agent IA ?",
      answer:
        "Chaque projet est au forfait, à partir de 1 500 € selon la complexité du périmètre et des intégrations. Le diagnostic gratuit permet de chiffrer précisément avant tout engagement.",
    },
    {
      question: "Faut-il changer nos outils ?",
      answer:
        "Non. L'agent se connecte à votre environnement existant : Gmail ou Outlook, Notion, Drive, HubSpot, Pipedrive, tableurs, logiciels métier via API.",
    },
  ],
  cta: {
    title: "Quel agent pour votre entreprise ?",
    description:
      "En 30 minutes, nous identifions la tâche la plus chronophage de vos équipes et vérifions si un agent peut la prendre en charge.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const agentEmail: AgentPageContent = {
  meta: {
    title: "Agent IA de gestion des emails",
    description:
      "Un agent IA qui trie vos emails entrants, détecte les urgences, prépare les réponses et met à jour votre CRM. Validation humaine activable avant chaque envoi.",
  },
  breadcrumbLabel: "Agent email",
  hero: {
    eyebrow: "Agent IA · Emails",
    title: "L'agent qui traite vos emails entrants",
    description:
      "Analyse les demandes, prépare les réponses et organise leur suivi. Vos équipes ne trient plus, elles valident.",
  },
  mission: {
    title: "Sa mission",
    description:
      "Réduire le temps passé sur le tri et les réponses répétitives, et faire en sorte qu'aucune demande ne soit oubliée. L'agent lit chaque message entrant, comprend le motif et l'urgence, puis prépare le traitement adapté.",
  },
  capabilities: {
    title: "Il peut",
    items: [
      "Classer les messages par motif et par urgence",
      "Détecter les demandes sensibles et les escalader",
      "Rechercher les informations dans vos documents et votre historique",
      "Préparer une réponse adaptée, dans votre ton",
      "Créer une tâche de suivi assignée à la bonne personne",
      "Mettre à jour la fiche client dans le CRM",
    ],
  },
  control: {
    title: "Contrôle",
    description:
      "Validation humaine activable avant chaque envoi : l'agent prépare, vous cliquez. Une fois la confiance établie, vous choisissez les catégories de messages qui partent en automatique.",
  },
  howItWorks: {
    title: "Comment ça marche dans vos outils",
    steps: [
      {
        title: "Un email arrive",
        description:
          "L'agent analyse le motif, l'urgence et l'expéditeur, puis classe le message dans la bonne catégorie.",
      },
      {
        title: "Il prépare le traitement",
        description:
          "Recherche dans votre base documentaire et votre historique, rédaction d'une réponse, création de la tâche de suivi.",
      },
      {
        title: "Vous validez, il exécute",
        description:
          "La réponse part après votre validation (ou automatiquement selon vos règles), le CRM est mis à jour et le suivi est tracé.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change au quotidien",
    rows: [
      {
        before: "30 à 60 minutes de tri chaque matin",
        after: "Boîte triée en continu, urgences signalées",
      },
      {
        before: "Réponses répétitives réécrites à chaque fois",
        after: "Réponses préparées, prêtes à valider",
      },
      {
        before: "Demandes oubliées dans le fil de la boîte",
        after: "Une tâche de suivi créée pour chaque demande",
      },
    ],
  },
  integrations: {
    title: "Outils connectés",
    tools: ["Gmail", "Outlook", "Notion", "Google Drive", "HubSpot", "Pipedrive", "Slack"],
  },
  faq: [
    {
      question: "L'agent envoie-t-il des emails tout seul ?",
      answer:
        "Seulement si vous le décidez, catégorie par catégorie. Au démarrage, tout passe par une validation humaine : l'agent prépare, vous validez en un clic.",
    },
    {
      question: "Peut-il gérer une boîte partagée (contact@, support@) ?",
      answer:
        "Oui, c'est même le cas d'usage le plus rentable : volume élevé, demandes répétitives, besoin de traçabilité.",
    },
    {
      question: "Comment apprend-il notre ton et nos règles ?",
      answer:
        "À partir de vos réponses types, de vos procédures et d'exemples réels. Le style et les règles sont ajustés pendant la phase de prototype, avec vos retours.",
    },
  ],
  related: {
    title: "À découvrir aussi",
    items: [
      { label: "Agent commercial", href: "/agent-ia-commercial" },
      { label: "Agent de connaissance interne", href: "/agent-ia-connaissance" },
      { label: "Nos cas clients", href: "/cas-clients" },
    ],
  },
  cta: {
    title: "Combien d'heures votre équipe passe-t-elle sur les emails ?",
    description:
      "En 30 minutes, nous estimons le volume traitable par l'agent et le temps récupérable chaque semaine.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const agentDocs: AgentPageContent = {
  meta: {
    title: "Agent IA documentaire : OCR, extraction et génération",
    description:
      "Un agent IA qui lit vos factures, devis et formulaires, en extrait les données, classe les fichiers et génère vos documents. Fini la ressaisie manuelle.",
  },
  breadcrumbLabel: "Agent documentaire",
  hero: {
    eyebrow: "Agent IA · Documents",
    title: "L'agent qui lit et produit vos documents",
    description:
      "Extraction des données, classement automatique, génération de rapports : vos documents circulent sans ressaisie.",
  },
  mission: {
    title: "Sa mission",
    description:
      "Supprimer la ressaisie et les erreurs de copier-coller. L'agent lit vos documents entrants (factures, devis, formulaires, feuilles de présence), en extrait les données utiles et les injecte dans vos outils, puis génère les documents sortants à partir de vos modèles.",
  },
  capabilities: {
    title: "Il peut",
    items: [
      "Lire des PDF, scans et photos de documents (OCR)",
      "Extraire les champs utiles : montants, dates, références, coordonnées",
      "Vérifier la cohérence des données extraites",
      "Classer chaque fichier au bon endroit, au bon format de nom",
      "Alimenter vos tableurs, CRM et outils comptables",
      "Générer rapports, synthèses et documents types depuis vos données",
    ],
  },
  control: {
    title: "Contrôle",
    description:
      "Chaque extraction est tracée avec son document source. Les cas ambigus (document illisible, montant incohérent) sont mis de côté pour vérification humaine au lieu d'être devinés.",
  },
  howItWorks: {
    title: "Comment ça marche dans vos outils",
    steps: [
      {
        title: "Un document arrive",
        description:
          "Par email, dépôt dans un dossier ou upload : l'agent détecte le type de document et lance la lecture.",
      },
      {
        title: "Les données sont extraites et vérifiées",
        description:
          "Les champs utiles sont extraits, contrôlés (totaux, formats, doublons) et normalisés.",
      },
      {
        title: "Vos outils sont alimentés",
        description:
          "Le fichier est classé, les données saisies dans les bons outils, et les documents sortants générés si besoin.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change au quotidien",
    rows: [
      {
        before: "45 minutes de saisie par lot de factures",
        after: "Extraction et saisie automatiques, contrôle en 5 minutes",
      },
      {
        before: "Fichiers nommés et rangés au petit bonheur",
        after: "Classement systématique, nommage cohérent",
      },
      {
        before: "Rapports remontés à la main depuis trois outils",
        after: "Rapport généré automatiquement depuis les données",
      },
    ],
  },
  integrations: {
    title: "Outils connectés",
    tools: ["Google Drive", "SharePoint", "Notion", "Airtable", "Google Sheets", "Excel", "Logiciels comptables"],
  },
  faq: [
    {
      question: "Quels types de documents sont pris en charge ?",
      answer:
        "Factures, devis, bons de commande, formulaires, feuilles de présence, contrats : tout document structuré ou semi-structuré, y compris scanné. La faisabilité est vérifiée sur vos documents réels au diagnostic.",
    },
    {
      question: "Quel est le taux de fiabilité de l'extraction ?",
      answer:
        "Il dépend de la qualité des documents, c'est pourquoi le prototype se fait sur vos vrais fichiers. Les cas douteux sont systématiquement routés vers une vérification humaine plutôt que devinés.",
    },
    {
      question: "Peut-il générer des documents, pas seulement les lire ?",
      answer:
        "Oui : rapports PDF, synthèses, propositions, courriers types. L'agent assemble le document depuis vos données et vos modèles existants.",
    },
  ],
  related: {
    title: "À découvrir aussi",
    items: [
      { label: "Agent de gestion des emails", href: "/agent-ia-email" },
      { label: "Agent de reporting", href: "/agent-ia-reporting" },
      { label: "Nos cas clients", href: "/cas-clients" },
    ],
  },
  cta: {
    title: "Combien de temps part dans la ressaisie chez vous ?",
    description:
      "Apportez deux ou trois documents types au diagnostic : nous vérifions ensemble ce qui est extractible automatiquement.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const agentSales: AgentPageContent = {
  meta: {
    title: "Agent IA commercial : qualification, CRM et relances",
    description:
      "Un agent IA qui qualifie vos leads, met à jour votre CRM et déclenche les relances au bon moment. Aucune opportunité oubliée.",
  },
  breadcrumbLabel: "Agent commercial",
  hero: {
    eyebrow: "Agent IA · Commercial",
    title: "L'agent qui fait vivre votre pipeline",
    description:
      "Qualification des demandes, CRM à jour, relances déclenchées à temps : vos commerciaux vendent, l'agent s'occupe du reste.",
  },
  mission: {
    title: "Sa mission",
    description:
      "Faire en sorte que chaque opportunité soit suivie. L'agent qualifie les demandes entrantes, tient les fiches à jour à partir des échanges réels et déclenche les relances selon vos règles commerciales.",
  },
  capabilities: {
    title: "Il peut",
    items: [
      "Qualifier les leads entrants selon vos critères",
      "Créer et enrichir les fiches CRM depuis les emails et formulaires",
      "Détecter les devis restés sans réponse",
      "Préparer les relances personnalisées, à valider ou automatiques",
      "Préparer un brief avant chaque rendez-vous",
      "Alimenter le reporting commercial",
    ],
  },
  control: {
    title: "Contrôle",
    description:
      "Les relances suivent les règles que vous définissez : délais, nombre, ton, exclusions. Chaque message peut passer par une validation avant envoi, et l'historique complet reste dans le CRM.",
  },
  howItWorks: {
    title: "Comment ça marche dans vos outils",
    steps: [
      {
        title: "Une demande entre",
        description:
          "Formulaire, email ou appel logué : l'agent qualifie le lead et crée la fiche complète dans le CRM.",
      },
      {
        title: "Le pipeline vit",
        description:
          "À chaque échange, la fiche est mise à jour. Les devis sans réponse sont détectés selon vos délais.",
      },
      {
        title: "Les relances partent à temps",
        description:
          "L'agent prépare la relance adaptée au contexte. Vous validez, ou elle part automatiquement selon vos règles.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change au quotidien",
    rows: [
      {
        before: "CRM rempli quand il reste du temps",
        after: "Fiches à jour à chaque échange, sans effort",
      },
      {
        before: "Relances qui dépendent de la mémoire de chacun",
        after: "Relances systématiques, au bon moment",
      },
      {
        before: "Des devis qui meurent sans réponse",
        after: "Chaque devis suivi jusqu'à la décision",
      },
    ],
  },
  integrations: {
    title: "Outils connectés",
    tools: ["HubSpot", "Pipedrive", "Airtable", "Gmail", "Outlook", "Google Sheets", "Slack"],
  },
  faq: [
    {
      question: "Les relances automatiques ne risquent-elles pas d'agacer nos prospects ?",
      answer:
        "Les règles sont les vôtres : délais, nombre maximum, ton, cas d'exclusion. L'agent applique la politique commerciale que vous auriez voulu tenir manuellement, sans l'oubli ni l'excès.",
    },
    {
      question: "Fonctionne-t-il avec notre CRM actuel ?",
      answer:
        "HubSpot, Pipedrive et Airtable en standard, et la plupart des CRM accessibles par API. Le diagnostic vérifie la compatibilité de votre configuration.",
    },
    {
      question: "Peut-il faire de la prospection sortante ?",
      answer:
        "L'agent est conçu d'abord pour ne rien perdre du flux entrant et du pipeline existant. Des séquences sortantes sont possibles, dans le respect des règles de consentement.",
    },
  ],
  related: {
    title: "À découvrir aussi",
    items: [
      { label: "Agent de gestion des emails", href: "/agent-ia-email" },
      { label: "Agent de reporting", href: "/agent-ia-reporting" },
      { label: "Nos cas clients", href: "/cas-clients" },
    ],
  },
  cta: {
    title: "Combien d'opportunités perdez-vous faute de suivi ?",
    description:
      "En 30 minutes, nous cartographions votre parcours lead et identifions où l'agent récupère du chiffre d'affaires.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const agentKnowledge: AgentPageContent = {
  meta: {
    title: "Agent IA de connaissance interne (RAG)",
    description:
      "Une IA branchée sur vos documents internes qui répond aux questions de vos équipes avec les sources citées. Procédures, contrats, historique projet.",
  },
  breadcrumbLabel: "Agent de connaissance",
  hero: {
    eyebrow: "Agent IA · Connaissance interne",
    title: "L'agent qui connaît vos documents par cœur",
    description:
      "Vos équipes posent une question, l'agent répond à partir de vos documents internes, avec les sources à l'appui.",
  },
  mission: {
    title: "Sa mission",
    description:
      "Rendre votre connaissance interne réellement accessible. Procédures, contrats, comptes rendus, documentation produit : l'agent retrouve la bonne information en quelques secondes au lieu de la faire chercher dans dix dossiers, et cite toujours ses sources.",
  },
  capabilities: {
    title: "Il peut",
    items: [
      "Répondre aux questions à partir de vos documents (RAG)",
      "Citer les sources exactes de chaque réponse",
      "Chercher dans Notion, Drive, SharePoint et vos bases internes",
      "Respecter les droits d'accès existants de chaque utilisateur",
      "Se mettre à jour quand vos documents changent",
      "Dire « je ne sais pas » plutôt qu'inventer",
    ],
  },
  control: {
    title: "Contrôle",
    description:
      "L'agent ne répond qu'à partir du corpus que vous définissez, respecte les permissions existantes et cite ses sources. S'il ne trouve pas, il le dit et oriente vers la bonne personne.",
  },
  howItWorks: {
    title: "Comment ça marche dans vos outils",
    steps: [
      {
        title: "Vos documents sont indexés",
        description:
          "Le corpus que vous choisissez (procédures, contrats, wiki interne) est indexé et se synchronise à chaque mise à jour.",
      },
      {
        title: "Une question est posée",
        description:
          "Depuis Slack, une interface dédiée ou votre outil interne : l'agent cherche les passages pertinents dans le corpus.",
      },
      {
        title: "Réponse sourcée",
        description:
          "L'agent répond en citant les documents utilisés, avec les liens pour vérifier ou approfondir.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change au quotidien",
    rows: [
      {
        before: "20 minutes à chercher la bonne procédure",
        after: "Réponse sourcée en quelques secondes",
      },
      {
        before: "Les mêmes questions posées aux mêmes experts",
        after: "Les experts sollicités seulement sur les vrais cas complexes",
      },
      {
        before: "Un savoir qui part avec les départs",
        after: "Une connaissance capitalisée et interrogeable",
      },
    ],
  },
  integrations: {
    title: "Outils connectés",
    tools: ["Notion", "Google Drive", "SharePoint", "Slack", "Confluence", "PDF internes"],
  },
  faq: [
    {
      question: "Nos documents confidentiels sont-ils en sécurité ?",
      answer:
        "Le corpus reste dans vos outils, l'agent n'expose que ce que l'utilisateur a déjà le droit de voir, et vos données ne servent jamais à entraîner les modèles.",
    },
    {
      question: "Que se passe-t-il si la réponse n'est pas dans les documents ?",
      answer:
        "L'agent le dit explicitement au lieu d'inventer, et peut orienter vers la personne référente. C'est une règle de conception, pas une option.",
    },
    {
      question: "Combien de documents peut-il gérer ?",
      answer:
        "De quelques dizaines à plusieurs milliers. Le vrai sujet est la qualité du corpus : le diagnostic inclut une revue de vos sources pour partir sur une base saine.",
    },
  ],
  related: {
    title: "À découvrir aussi",
    items: [
      { label: "Agent documentaire", href: "/agent-ia-documentaire" },
      { label: "Agent de gestion des emails", href: "/agent-ia-email" },
      { label: "Nos cas clients", href: "/cas-clients" },
    ],
  },
  cta: {
    title: "Votre connaissance interne est-elle vraiment accessible ?",
    description:
      "En 30 minutes, nous évaluons votre corpus documentaire et le cas d'usage le plus utile pour vos équipes.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const agentReporting: AgentPageContent = {
  meta: {
    title: "Agent IA de reporting : vos rapports générés automatiquement",
    description:
      "Un agent IA qui collecte les données dans vos outils, les consolide et génère vos rapports au format attendu, à la fréquence choisie. Fini les fins de mois à compiler.",
  },
  breadcrumbLabel: "Agent de reporting",
  hero: {
    eyebrow: "Agent IA · Reporting",
    title: "L'agent qui assemble vos rapports à votre place",
    description:
      "Collecte des chiffres, consolidation et mise en forme : vos rapports arrivent prêts, à la fréquence que vous choisissez.",
  },
  mission: {
    title: "Sa mission",
    description:
      "Supprimer les heures passées à compiler des chiffres en fin de mois. L'agent collecte les données là où elles vivent (CRM, tableurs, outils métier), vérifie leur cohérence et produit le rapport au format attendu, avec une synthèse lisible.",
  },
  capabilities: {
    title: "Il peut",
    items: [
      "Collecter les données depuis plusieurs outils à la fois",
      "Consolider les chiffres et vérifier leur cohérence",
      "Générer le rapport au format voulu : PDF, tableur, Notion",
      "Rédiger une synthèse lisible des chiffres clés",
      "Envoyer le rapport aux bonnes personnes, à la bonne fréquence",
      "Signaler les anomalies : chiffre manquant, écart inhabituel",
    ],
  },
  control: {
    title: "Contrôle",
    description:
      "Chaque chiffre reste traçable jusqu'à sa source. Le rapport peut passer par une validation avant envoi, et les anomalies détectées sont signalées au lieu d'être lissées.",
  },
  howItWorks: {
    title: "Comment ça marche dans vos outils",
    steps: [
      {
        title: "L'échéance arrive, ou vous le demandez",
        description:
          "Chaque semaine, chaque mois ou à la demande : l'agent lance la préparation du rapport selon votre calendrier.",
      },
      {
        title: "Les données sont collectées et consolidées",
        description:
          "L'agent rassemble les chiffres depuis vos outils, les recoupe et signale ce qui manque ou ce qui détonne.",
      },
      {
        title: "Le rapport part, vérifié",
        description:
          "Le document est généré depuis votre modèle, avec sa synthèse, puis envoyé aux bonnes personnes ou soumis à votre validation.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Avant / Après",
    title: "Ce qui change au quotidien",
    rows: [
      {
        before: "Une demi-journée de compilation chaque fin de mois",
        after: "Le rapport prêt le 1er du mois, sans y penser",
      },
      {
        before: "Des chiffres différents selon le fichier consulté",
        after: "Une seule source, des chiffres cohérents",
      },
      {
        before: "Un reporting fait quand il reste du temps",
        after: "Une cadence tenue, sans effort",
      },
    ],
  },
  integrations: {
    title: "Outils connectés",
    tools: ["Google Sheets", "Excel", "Airtable", "Notion", "HubSpot", "Pipedrive", "Slack"],
  },
  faq: [
    {
      question: "Depuis quelles sources de données l'agent peut-il travailler ?",
      answer:
        "CRM, tableurs, bases de données, outils métier accessibles par API ou par export. Le diagnostic vérifie l'accès à chaque source avant tout engagement.",
    },
    {
      question: "Peut-on garder notre modèle de rapport actuel ?",
      answer:
        "Oui, c'est même recommandé : l'agent remplit votre modèle existant (PDF, tableur, présentation) plutôt que d'imposer un nouveau format.",
    },
    {
      question: "Que se passe-t-il si une donnée manque ?",
      answer:
        "L'agent le signale explicitement au lieu de produire un rapport faux : la donnée manquante est listée, avec sa source, pour une correction rapide.",
    },
  ],
  related: {
    title: "À découvrir aussi",
    items: [
      { label: "Agent documentaire", href: "/agent-ia-documentaire" },
      { label: "Agent commercial", href: "/agent-ia-commercial" },
      { label: "Nos cas clients", href: "/cas-clients" },
    ],
  },
  cta: {
    title: "Combien d'heures partent dans vos reportings chaque mois ?",
    description:
      "En 30 minutes, nous listons vos rapports récurrents et estimons ce que l'agent peut préparer à votre place.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

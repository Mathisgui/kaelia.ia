import type { SolutionPageContent, SectorPageContent } from "../types";

export const automationsHub: SolutionPageContent = {
  meta: {
    title: "Automatisation de processus métier (n8n, Make)",
    description:
      "Des workflows sur mesure qui connectent vos outils et exécutent vos processus répétitifs : formulaires, factures, onboarding, relances, reporting. Sans changer d'outils.",
  },
  hero: {
    eyebrow: "Automatisations",
    title: "Des workflows qui exécutent vos processus, sans erreur",
    description:
      "Une automatisation connecte vos outils entre eux et exécute un processus prédéfini, de façon fiable et traçable. C'est la brique la plus rentable pour éliminer la ressaisie et les oublis.",
    cta: "Identifier mes processus automatisables",
  },
  useCases: {
    eyebrow: "Cas d'usage",
    title: "Des exemples de workflows que nous déployons",
    description:
      "Chaque workflow est construit sur mesure autour de vos outils et de vos règles métier.",
    items: [
      {
        title: "Formulaire → CRM → email → tâche",
        description:
          "Une demande arrive : le contact est créé dans le CRM, l'email de confirmation part, la tâche commerciale est assignée.",
      },
      {
        title: "Facture → extraction → classement → comptabilité",
        description:
          "Les factures reçues sont lues, extraites, classées et transmises à votre outil comptable, sans saisie.",
      },
      {
        title: "Signature → onboarding client",
        description:
          "Dès la signature : création des espaces client, envoi du dossier de bienvenue, planification des étapes.",
      },
      {
        title: "Feuille de présence → OCR → tableur → reporting",
        description:
          "Les feuilles scannées sont lues et consolidées automatiquement dans vos tableaux de suivi.",
      },
      {
        title: "Devis sans réponse → relances automatiques",
        description:
          "Passé votre délai, la relance part selon vos règles : nombre, ton, exceptions.",
      },
      {
        title: "Données CRM → rapport PDF",
        description:
          "Votre reporting hebdomadaire ou mensuel généré automatiquement depuis les données réelles.",
      },
    ],
  },
  explainer: {
    title: "Pourquoi n8n et Make",
    paragraphs: [
      "Nous construisons les workflows sur n8n et Make, deux plateformes éprouvées qui se connectent à des centaines d'outils. Vous restez propriétaire de vos automatisations : pas de boîte noire, pas de dépendance à un développement opaque.",
      "Quand un processus demande de la compréhension (lire un email, interpréter un document), un agent IA s'insère dans le workflow : l'agent comprend et décide, le workflow exécute et trace.",
    ],
  },
  children: {
    eyebrow: "Par secteur",
    title: "Des automatisations pensées pour votre métier",
    description:
      "Deux secteurs où nous avons une expertise particulière, détaillés sur leur propre page.",
    items: [
      {
        title: "Organismes de formation",
        description:
          "Inscriptions, convocations, émargements, facturation : automatiser l'administratif d'un OF, y compris les exigences Qualiopi.",
        href: "/automatisation-organisme-formation",
        linkLabel: "Voir la page organismes de formation",
      },
      {
        title: "Cabinets d'avocats et professions réglementées",
        description:
          "Intake client, pièces, délais, courriers types : automatiser sans compromettre la confidentialité.",
        href: "/automatisation-cabinet-avocat",
        linkLabel: "Voir la page cabinets d'avocats",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Impact",
    title: "Ce qui change avec des workflows en place",
    rows: [
      {
        before: "Des heures de copier-coller entre outils",
        after: "Les données circulent seules, sans erreur",
      },
      {
        before: "Des processus qui dépendent d'une personne",
        after: "Des processus documentés qui tournent tout seuls",
      },
      {
        before: "Des oublis dans les étapes (relance, envoi, création)",
        after: "Chaque étape exécutée et tracée systématiquement",
      },
    ],
  },
  faq: [
    {
      question: "Quelle différence avec un agent IA ?",
      answer:
        "Une automatisation suit un scénario prédéfini, sans interprétation : c'est fiable, rapide et peu coûteux. Un agent IA s'ajoute quand il faut comprendre un contenu variable. Beaucoup de projets commencent par une automatisation pure, puis ajoutent l'IA là où elle apporte vraiment.",
    },
    {
      question: "Que se passe-t-il si un workflow tombe en panne ?",
      answer:
        "Chaque exécution est tracée, les erreurs déclenchent une alerte et un traitement de secours est prévu : rien ne se perd en silence. La maintenance couvre la surveillance et les corrections.",
    },
    {
      question: "Nos outils sont-ils compatibles ?",
      answer:
        "n8n et Make se connectent à des centaines d'outils, et tout logiciel disposant d'une API peut être intégré. Le diagnostic vérifie la faisabilité sur votre environnement.",
    },
    {
      question: "Quel budget prévoir ?",
      answer:
        "Au forfait, à partir de 1 500 € pour un premier workflow. Le diagnostic gratuit estime le coût et le temps gagné avant tout engagement.",
    },
  ],
  cta: {
    title: "Quel processus vous coûte le plus de temps ?",
    description:
      "En 30 minutes, nous cartographions vos processus répétitifs et sélectionnons le workflow le plus rentable à déployer en premier.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const sectorTraining: SectorPageContent = {
  meta: {
    title: "Automatisation pour organismes de formation",
    description:
      "Inscriptions, convocations, émargements, facturation, exigences Qualiopi : automatisez l'administratif de votre organisme de formation avec des workflows sur mesure.",
  },
  breadcrumbLabel: "Organismes de formation",
  hero: {
    eyebrow: "Secteur · Organismes de formation",
    title: "Automatiser l'administratif d'un organisme de formation",
    description:
      "Nous connaissons ce métier de l'intérieur : Kael'IA est la branche IA du groupe Kaelia, organisme de formation certifié Qualiopi. Les processus décrits ici, nous les vivons.",
  },
  painPoints: {
    eyebrow: "Le quotidien",
    title: "Ce qui dévore le temps d'un OF",
    items: [
      {
        title: "Le dossier de chaque stagiaire",
        description:
          "Inscription, convention, convocation, feuilles d'émargement, attestation : des dizaines de documents par session, souvent produits à la main.",
      },
      {
        title: "Les exigences Qualiopi",
        description:
          "Traçabilité, questionnaires à froid et à chaud, preuves à archiver : indispensable, mais chronophage quand rien n'est automatisé.",
      },
      {
        title: "La facturation multi-financeurs",
        description:
          "OPCO, CPF, entreprises, financements mixtes : chaque montage a son circuit, ses justificatifs et ses relances.",
      },
      {
        title: "Le suivi des sessions",
        description:
          "Relances des inscrits, gestion des reports, consolidation des présences, reporting : un flux permanent de petites tâches.",
      },
    ],
  },
  caseExample: {
    title: "Exemple : le parcours stagiaire automatisé",
    context:
      "Scénario type pour un OF qui gère plusieurs sessions par mois avec une petite équipe administrative.",
    rows: [
      {
        before: "Convocations et conventions rédigées une par une",
        after: "Documents générés depuis le dossier d'inscription",
      },
      {
        before: "Émargements papier ressaisis dans le tableur",
        after: "Feuilles lues par OCR et consolidées automatiquement",
      },
      {
        before: "Questionnaires qualité envoyés quand on y pense",
        after: "Envois déclenchés automatiquement aux bonnes dates",
      },
      {
        before: "Preuves Qualiopi rassemblées avant l'audit",
        after: "Archivage structuré au fil de l'eau",
      },
    ],
    result:
      "Résultat attendu : plusieurs heures récupérées par session, un dossier stagiaire complet sans ressaisie et des preuves qualité prêtes en continu.",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Les briques que nous déployons pour les OF",
    items: [
      {
        title: "Workflows administratifs",
        description:
          "Inscription → convention → convocation → émargement → attestation → facturation, orchestré de bout en bout.",
        href: "/automatisations",
        linkLabel: "Voir les automatisations",
      },
      {
        title: "Agent documentaire",
        description:
          "Lecture des émargements, extraction des données, génération des attestations et bilans.",
        href: "/agent-ia-documentaire",
        linkLabel: "Voir l'agent documentaire",
      },
      {
        title: "Agent de gestion des emails",
        description:
          "Tri des demandes entrantes (inscriptions, financements, reports) et préparation des réponses.",
        href: "/agent-ia-email",
        linkLabel: "Voir l'agent email",
      },
    ],
  },
  faq: [
    {
      question: "Est-ce compatible avec nos obligations Qualiopi ?",
      answer:
        "Oui, et c'est même un des bénéfices : l'automatisation produit une traçabilité systématique (envois, dates, preuves archivées) qui facilite les audits. Nous connaissons le référentiel pour le pratiquer nous-mêmes via Kaelia.",
    },
    {
      question: "Travaillez-vous avec les outils du secteur (Digiforma, etc.) ?",
      answer:
        "Nous nous connectons aux outils disposant d'une API ou d'exports exploitables, et nous construisons autour de votre existant. Le diagnostic vérifie précisément votre configuration.",
    },
    {
      question: "Par quoi commencer ?",
      answer:
        "Généralement par le parcours documentaire du stagiaire (convocations, émargements, attestations) : volume élevé, règles claires, gain immédiat. Le diagnostic le confirme sur vos chiffres.",
    },
  ],
  cta: {
    title: "Parlons de votre organisme de formation",
    description:
      "En 30 minutes, nous identifions le processus le plus chronophage de votre OF et estimons le temps récupérable par session.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

/* ------------------------------------------------------------------ */

export const sectorLegal: SectorPageContent = {
  meta: {
    title: "Automatisation pour cabinets d'avocats",
    description:
      "Intake client, gestion des pièces, courriers types, suivi des délais : automatisez les tâches répétitives de votre cabinet sans compromettre la confidentialité.",
  },
  breadcrumbLabel: "Cabinets d'avocats",
  hero: {
    eyebrow: "Secteur · Professions juridiques",
    title: "Automatiser un cabinet d'avocats, sans compromis sur la confidentialité",
    description:
      "Les cabinets perdent des heures facturables sur des tâches administratives répétitives. Des workflows encadrés les prennent en charge, avec des garanties adaptées au secret professionnel.",
  },
  painPoints: {
    eyebrow: "Le quotidien",
    title: "Ce qui dévore le temps d'un cabinet",
    items: [
      {
        title: "L'intake des nouveaux dossiers",
        description:
          "Premier contact, collecte des pièces, vérification des conflits d'intérêts, création du dossier : un circuit répété pour chaque client.",
      },
      {
        title: "Les pièces et les documents",
        description:
          "Classement des pièces, renommage, bordereaux : de la rigueur indispensable, produite manuellement.",
      },
      {
        title: "Les courriers et actes répétitifs",
        description:
          "Mises en demeure, courriers de suivi, conclusions types : des trames réécrites au lieu d'être générées.",
      },
      {
        title: "Les délais et les relances",
        description:
          "Échéances de procédure, relances clients pour les pièces manquantes, suivi des impayés d'honoraires.",
      },
    ],
  },
  caseExample: {
    title: "Exemple : l'intake client automatisé",
    context:
      "Scénario type pour un cabinet de petite ou moyenne taille qui traite un flux régulier de nouveaux dossiers.",
    rows: [
      {
        before: "Informations client recopiées du mail vers le logiciel métier",
        after: "Dossier créé automatiquement depuis le formulaire de contact",
      },
      {
        before: "Pièces réclamées par email, une par une",
        after: "Liste de pièces envoyée et relancée automatiquement",
      },
      {
        before: "Bordereaux de pièces assemblés à la main",
        after: "Bordereaux générés depuis le dossier structuré",
      },
      {
        before: "Échéances suivies dans plusieurs agendas",
        after: "Alertes centralisées, en amont de chaque délai",
      },
    ],
    result:
      "Résultat attendu : des heures administratives converties en temps facturable et un risque d'oubli fortement réduit sur les délais et les pièces.",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Les briques que nous déployons pour les cabinets",
    items: [
      {
        title: "Workflows d'intake et de suivi",
        description:
          "Du premier contact à l'ouverture du dossier, puis relances de pièces et suivi des échéances.",
        href: "/automatisations",
        linkLabel: "Voir les automatisations",
      },
      {
        title: "Agent documentaire",
        description:
          "Classement des pièces, extraction des informations, génération des courriers et bordereaux types.",
        href: "/agent-ia-documentaire",
        linkLabel: "Voir l'agent documentaire",
      },
      {
        title: "Agent de connaissance interne",
        description:
          "Recherche dans vos dossiers, modèles et notes internes, avec les sources citées.",
        href: "/agent-ia-connaissance",
        linkLabel: "Voir l'agent de connaissance",
      },
    ],
  },
  faq: [
    {
      question: "Comment garantissez-vous la confidentialité des dossiers ?",
      answer:
        "Les données restent dans vos outils, les accès suivent vos permissions existantes et les modèles IA sont appelés via des API professionnelles qui n'utilisent pas vos données pour l'entraînement. Le périmètre exact est documenté avant tout déploiement.",
      },
    {
      question: "L'IA rédige-t-elle des actes juridiques ?",
      answer:
        "Non. Les agents préparent des trames et des courriers types à partir de vos modèles, toujours soumis à votre validation. Le fond juridique reste entre les mains de l'avocat.",
    },
    {
      question: "Est-ce compatible avec notre logiciel métier ?",
      answer:
        "Nous nous intégrons aux outils disposant d'une API ou d'exports, et les workflows peuvent aussi fonctionner autour de votre logiciel (email, documents, agenda). Le diagnostic vérifie votre configuration.",
    },
  ],
  cta: {
    title: "Parlons de votre cabinet",
    description:
      "En 30 minutes, nous identifions les tâches non facturables les plus lourdes et ce qui peut être automatisé en premier.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

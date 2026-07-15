import type { MethodPageContent } from "../types";

export const method: MethodPageContent = {
  meta: {
    title: "Notre méthode : diagnostic, prototype, déploiement, optimisation",
    description:
      "Comment Kael'IA déploie agents IA et automatisations : un diagnostic gratuit, un prototype mesurable, un déploiement documenté et une optimisation continue.",
  },
  hero: {
    eyebrow: "Méthode",
    title: "Un déploiement maîtrisé, pas un projet tunnel",
    description:
      "Quatre étapes, chacune avec un livrable concret. Vous voyez des résultats sur vos vraies données avant de vous engager sur la suite.",
  },
  steps: [
    {
      number: "01",
      title: "Diagnostic",
      description:
        "Nous cartographions vos opérations réelles : documents, ressaisies, relances, emails, outils. L'objectif est d'identifier les gisements de temps et de sélectionner un premier cas d'usage à fort potentiel.",
      deliverables: [
        "Cartographie de vos processus répétitifs",
        "Estimation des gains par processus",
        "Priorisation impact / faisabilité",
        "Sélection d'un premier pilote",
      ],
      duration: "30 minutes offertes, puis 1 à 2 jours si approfondissement",
    },
    {
      number: "02",
      title: "Prototype",
      description:
        "Nous construisons un pilote limité et mesurable sur le cas d'usage sélectionné. Il tourne sur vos vraies données, dans un périmètre restreint, pour valider le résultat avant d'industrialiser.",
      deliverables: [
        "Agent ou automatisation fonctionnelle sur périmètre restreint",
        "Test sur vos données réelles",
        "Mesure du gain constaté",
        "Décision d'industrialisation en connaissance de cause",
      ],
      duration: "1 à 2 semaines selon le cas d'usage",
    },
    {
      number: "03",
      title: "Déploiement",
      description:
        "Nous connectons le système à votre environnement réel, traitons les cas limites, documentons tout et formons vos équipes à l'utilisation et à la supervision. La prise en main fait partie du déploiement.",
      deliverables: [
        "Intégration complète à vos outils",
        "Gestion des cas limites et des erreurs",
        "Documentation du système",
        "Prise en main et formation des équipes",
      ],
      duration: "1 à 3 semaines selon les intégrations",
    },
    {
      number: "04",
      title: "Optimisation",
      description:
        "Un système vivant se surveille et s'améliore : suivi des erreurs, des coûts d'API et des résultats, ajustement des règles métier, évolution des intégrations quand vos outils changent.",
      deliverables: [
        "Surveillance des automatisations et alertes",
        "Correction des anomalies",
        "Suivi des coûts et des gains",
        "Améliorations continues des prompts et règles",
      ],
      duration: "En continu : forfait de maintenance, ou reprise en interne après formation",
    },
  ],
  maintenance: {
    title: "Et après ? Deux options pour la maintenance",
    description:
      "Soit vous la reprenez en interne : le système est documenté et vos équipes sont formées pour être autonomes. Soit nous nous en occupons, avec un forfait de maintenance qui couvre :",
    items: [
      "La surveillance des automatisations et la correction des erreurs",
      "L'évolution des intégrations quand vos outils changent",
      "Le suivi des coûts d'API et leur optimisation",
      "L'amélioration continue des prompts et des règles métier",
    ],
  },
  faq: [
    {
      question: "Que contient exactement le diagnostic gratuit ?",
      answer:
        "30 minutes d'échange structuré : vos tâches les plus chronophages, vos outils, vos volumes. À la fin, vous repartez avec un à trois processus automatisables identifiés et une estimation de faisabilité. Ce n'est pas un appel commercial déguisé : si rien n'est rentable à automatiser chez vous, nous vous le disons.",
    },
    {
      question: "Faut-il déjà avoir un projet précis en tête ?",
      answer:
        "Non. La plupart des clients arrivent avec une intuition (« on perd trop de temps sur les emails ») et le diagnostic la transforme en cas d'usage chiffré.",
    },
    {
      question: "Qui fait quoi pendant le projet ?",
      answer:
        "Nous construisons, vous validez. Votre implication se limite à quelques échanges par étape : accès aux outils, exemples réels, retours sur le prototype. Pas de mobilisation d'équipe à temps plein.",
    },
  ],
  cta: {
    title: "Commençons par le diagnostic",
    description:
      "30 minutes pour cartographier vos processus et identifier le premier cas d'usage rentable.",
    button: "Réserver mon diagnostic gratuit",
    note: "30 minutes · Sans engagement",
  },
};

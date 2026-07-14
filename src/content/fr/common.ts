import type { CommonContent } from "../types";

export const CALENDAR_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0elwGhJ_Xy3KFyk17moeheL-G9N4jsDSeZf0mLVqNvsF3QGGyCE3UOtbPzWDkJ_6gHO8ZAJlE0";

export const common: CommonContent = {
  brand: "KAEL'IA",

  nav: {
    links: [
      { label: "Agents IA", href: "/agents-ia" },
      { label: "Automatisations", href: "/automatisations" },
      { label: "Cas clients", href: "/cas-clients" },
      { label: "Méthode", href: "/methode" },
      { label: "Blog", href: "/blog" },
      { label: "À propos", href: "/a-propos" },
    ],
    cta: {
      label: "Diagnostic gratuit",
      href: CALENDAR_URL,
      external: true,
    },
  },

  langSwitchLabel: "EN",

  contact: {
    email: "m.guillemois@kaelia-formacoach.com",
    calendarUrl: CALENDAR_URL,
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Kael'IA. Tous droits réservés.`,
    tagline:
      "Agents IA et automatisations métier pour les entreprises. Formations IA finançables en partenariat avec Kaelia.",
    secondary: [
      { label: "Formation IA", href: "/formation-ia" },
      { label: "Automatisation pour organismes de formation", href: "/automatisation-organisme-formation" },
      { label: "Automatisation pour cabinets d'avocats", href: "/automatisation-cabinet-avocat" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/confidentialite" },
    ],
  },

  labels: {
    learnMore: "En savoir plus",
    seeAlso: "À découvrir aussi",
    faqTitle: "Questions fréquentes",
    before: "Avant",
    after: "Après",
  },
};

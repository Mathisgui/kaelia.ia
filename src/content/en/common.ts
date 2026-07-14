import type { CommonContent } from "../types";
import { CALENDAR_URL } from "../fr/common";

export const common: CommonContent = {
  brand: "KAEL'IA",

  nav: {
    links: [
      { label: "AI Agents", href: "/en/ai-agents" },
      { label: "Automations", href: "/en/automations" },
      { label: "Case Studies", href: "/en/case-studies" },
      { label: "Method", href: "/en/method" },
      { label: "Blog", href: "/en/blog" },
      { label: "About", href: "/en/about" },
    ],
    cta: {
      label: "Free assessment",
      href: CALENDAR_URL,
      external: true,
    },
  },

  langSwitchLabel: "FR",

  contact: {
    email: "m.guillemois@kaelia-formacoach.com",
    calendarUrl: CALENDAR_URL,
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Kael'IA. All rights reserved.`,
    tagline:
      "AI agents and business automation for companies. Fundable AI training programs in partnership with Kaelia.",
    secondary: [
      { label: "AI Training", href: "/en/ai-training" },
      { label: "Automation for training providers", href: "/en/training-provider-automation" },
      { label: "Automation for law firms", href: "/en/law-firm-automation" },
    ],
    legal: [
      { label: "Legal notice", href: "/mentions-legales" },
      { label: "Privacy policy", href: "/confidentialite" },
    ],
  },

  labels: {
    learnMore: "Learn more",
    seeAlso: "Also worth exploring",
    faqTitle: "Frequently asked questions",
    before: "Before",
    after: "After",
  },
};

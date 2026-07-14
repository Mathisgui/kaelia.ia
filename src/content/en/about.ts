import type { AboutPageContent } from "../types";

export const about: AboutPageContent = {
  meta: {
    title: "About: The People Behind Kael'IA",
    description:
      "Kael'IA builds AI agents and business automations for companies. Meet Mathis Guillemois and discover the Kaelia ecosystem.",
  },
  hero: {
    eyebrow: "The AI arm of the Kaelia group",
    brand: "KAEL'IA",
    manifesto:
      "Kael'IA builds AI agents and automations that genuinely take over part of a company's operations: email, documents, CRM, follow-ups, reporting. Concrete, measurable systems, integrated into your existing tools.",
    vision:
      "What we believe: the right question is not \"how do we use AI?\" but \"which tasks can we hand over to it, with what controls and what results?\". That is the question every engagement answers.",
    chips: ["AI Agents", "Automations", "Kael'IA · 2025"],
  },
  profile: {
    label: "Partner · CTO · Founder · AI division",
    name: "Mathis Guillemois",
    paragraphs: [
      "Trained in management at the IAE (a French university business school), then shaped by years in marketing and operational management, I saw from the inside what slows teams down: tools that don't talk to each other, repetitive tasks, hours lost on what should be instant.",
      "When generative AI emerged, I went back to school for a degree in data and AI. The goal: not just talk about it, but know how to build. Today I design and deploy AI agents and automations for companies of every size.",
      "My approach fits in one sentence: systems that run and that last. Every deployment is documented, supervisable and designed to make your teams autonomous, not dependent.",
    ],
  },
  timeline: {
    title: "From business school to AI",
    items: [
      {
        year: "Master's, IAE",
        title: "The strategic foundations",
        description:
          "A master's in management at the IAE, a French university business school. That is where I learned to read a company, structure a decision and understand what moves an organization.",
      },
      {
        year: "Marketing & Management",
        title: "The field",
        description:
          "Early years in marketing and management. I saw from the inside what slows teams down: siloed tools, repetitive tasks, endless re-keying.",
      },
      {
        year: "The AI turn",
        title: "Back to learning",
        description:
          "Generative AI emerges. I go back to school, earn a degree in data and AI, and dive into the technical side to be able to build, not just advise.",
      },
      {
        year: "Freelance & Kael'IA",
        title: "From conviction to impact",
        description:
          "I deploy AI agents and automations for companies, first as a freelancer, then by launching Kaelia's AI division with my partners. Every engagement confirms the same thing: applied well, AI gives back time and margin.",
      },
      {
        year: "Today",
        title: "Systems in production",
        description:
          "Companies supported across several industries, agents and workflows running in production every day, and one constant standard: deliver measurable results.",
      },
    ],
  },
  skills: {
    title: "Expertise",
    items: [
      "AI agents & LLMs",
      "n8n / Make automation",
      "RAG & vector databases",
      "Prompt engineering",
      "OpenAI · Anthropic · Mistral",
      "API & business tool integrations",
      "Assessment & ROI prioritization",
      "Team adoption & training",
    ],
  },
  team: {
    title: "The Kaelia partners",
    description:
      "Kael'IA is the AI arm of the Kaelia group. Three partners, three complementary areas of expertise.",
    members: [
      {
        name: "Killian Guillemois",
        role: "CEO · Kaelia",
        description:
          "Leads the Kaelia group's overall strategy and growth. Guarantees demanding execution and a clear course for every division.",
        image: "/ki-kaelia-1.jpg",
      },
      {
        name: "Karine Weil",
        role: "COO · Kaelia",
        description:
          "Architect of Kaelia's operations and teaching model. Ensures the quality and compliance of every engagement.",
        image: "/ka-kaelia.jpg",
      },
    ],
  },
  quote: {
    text: "AI brings the power to execute. People bring the clarity of direction.",
    author: "Mathis Guillemois",
  },
  partnership: {
    title: "The Kaelia ecosystem",
    paragraphs: [
      "Kaelia is a Qualiopi-certified training provider (Qualiopi is the French training quality certification), co-founded by the three partners. Kael'IA is its division dedicated to AI agents and automations.",
      "This dual structure has a concrete advantage for you: when a deployment requires training your teams, that training can be delivered within a certified framework eligible for French funding. The technical system and the upskilling move forward together.",
    ],
  },
  cta: {
    title: "Let's talk about your processes",
    description:
      "In 30 minutes, we identify a first concrete use case for your business.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/**
 * Types partagés du modèle de contenu bilingue.
 * Chaque dictionnaire de langue (fr/index.ts, en/index.ts) est validé
 * avec `satisfies Dictionary` : impossible d'oublier une clé dans une langue.
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CtaContent {
  title: string;
  description: string;
  button: string;
  /** Petit texte de réassurance sous le bouton. */
  note?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BeforeAfterRow {
  before: string;
  after: string;
}

export interface SectionHeading {
  eyebrow: string;
  title: string;
  description?: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

/* ------------------------------------------------------------------ */
/* Commun (nav, footer, contact)                                       */
/* ------------------------------------------------------------------ */

export interface CommonContent {
  brand: string;
  nav: {
    links: NavLink[];
    cta: NavLink;
  };
  langSwitchLabel: string;
  contact: {
    email: string;
    calendarUrl: string;
  };
  footer: {
    copyright: string;
    /** Baseline de la colonne 3 du footer. */
    tagline: string;
    /** Liens secondaires (Formation IA, etc.). */
    secondary: NavLink[];
    legal: NavLink[];
  };
  /** Libellés partagés par les templates. */
  labels: {
    learnMore: string;
    seeAlso: string;
    faqTitle: string;
    before: string;
    after: string;
  };
}

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export interface HomeContent {
  meta: PageMeta;
  hero: {
    title: string;
    description: string;
    ctaPrimary: string;
    ctaPrimaryNote: string;
    ctaSecondary: string;
  };
  operations: SectionHeading & {
    items: { icon: string; title: string; description: string }[];
  };
  pedagogy: SectionHeading & {
    automation: { title: string; description: string; example: string };
    agent: { title: string; description: string; example: string };
    combined: { title: string; description: string };
  };
  agents: SectionHeading & {
    items: {
      title: string;
      mission: string;
      canDo: string[];
      /** Page agent interne. Absent si la carte pointe vers un lien externe (externalHref). */
      routeKey?: "agentEmail" | "agentDocs" | "agentSales" | "agentKnowledge" | "agentReporting";
      /** Lien externe (ex. diagnostic) pour les cartes sans page dédiée. Exclusif avec routeKey. */
      externalHref?: string;
      linkLabel: string;
    }[];
  };
  beforeAfter: SectionHeading & { rows: BeforeAfterRow[] };
  stats: SectionHeading & {
    items: {
      value: string;
      suffix: string;
      label: string;
      description: string;
      percentage: number;
    }[];
  };
  method: SectionHeading & {
    steps: { number: string; title: string; description: string; details: string }[];
    pageLink: string;
  };
  integrations: SectionHeading & { tools: string[] };
  security: SectionHeading & {
    items: { title: string; description: string }[];
  };
  faq: SectionHeading & { items: FaqItem[] };
  finalCta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Pages hub (Agents IA, Automatisations)                              */
/* ------------------------------------------------------------------ */

export interface SolutionPageContent {
  meta: PageMeta;
  hero: SectionHeading & { cta: string };
  useCases: SectionHeading & {
    items: { title: string; description: string }[];
  };
  explainer: { title: string; paragraphs: string[] };
  children: SectionHeading & {
    items: { title: string; description: string; href: string; linkLabel: string }[];
  };
  beforeAfter: SectionHeading & { rows: BeforeAfterRow[] };
  faq: FaqItem[];
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Pages agent spécialisé                                              */
/* ------------------------------------------------------------------ */

export interface AgentPageContent {
  meta: PageMeta;
  breadcrumbLabel: string;
  hero: SectionHeading;
  mission: { title: string; description: string };
  capabilities: { title: string; items: string[] };
  control: { title: string; description: string };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  beforeAfter: SectionHeading & { rows: BeforeAfterRow[] };
  integrations: { title: string; tools: string[] };
  faq: FaqItem[];
  related: { title: string; items: { label: string; href: string }[] };
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Pages sectorielles                                                  */
/* ------------------------------------------------------------------ */

export interface SectorPageContent {
  meta: PageMeta;
  breadcrumbLabel: string;
  hero: SectionHeading;
  painPoints: SectionHeading & {
    items: { title: string; description: string }[];
  };
  caseExample: {
    title: string;
    context: string;
    rows: BeforeAfterRow[];
    result: string;
  };
  solutions: SectionHeading & {
    items: { title: string; description: string; href: string; linkLabel: string }[];
  };
  faq: FaqItem[];
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Cas clients                                                         */
/* ------------------------------------------------------------------ */

export interface CaseStudy {
  sector: string;
  size: string;
  title: string;
  context: string;
  problem: string[];
  solution: string;
  tools: string[];
  duration: string;
  results: { label: string; before: string; after: string }[];
  outcome: string;
}

export interface CasesPageContent {
  meta: PageMeta;
  hero: SectionHeading;
  /** Transparence : ces cas sont des scénarios représentatifs. */
  disclaimer: string;
  labels: {
    context: string;
    problem: string;
    solution: string;
    tools: string;
    duration: string;
    results: string;
    metric: string;
    before: string;
    after: string;
  };
  cases: CaseStudy[];
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Méthode, Formation, À propos                                        */
/* ------------------------------------------------------------------ */

export interface MethodPageContent {
  meta: PageMeta;
  hero: SectionHeading;
  steps: {
    number: string;
    title: string;
    description: string;
    deliverables: string[];
    duration: string;
  }[];
  maintenance: { title: string; description: string; items: string[] };
  faq: FaqItem[];
  cta: CtaContent;
}

export interface FormationPageContent {
  meta: PageMeta;
  hero: SectionHeading;
  intro: string;
  objectives: { title: string; items: string[] };
  formats: SectionHeading & {
    items: { title: string; description: string }[];
  };
  funding: { title: string; description: string };
  adoption: { title: string; description: string };
  faq: FaqItem[];
  cta: CtaContent;
}

export interface AboutPageContent {
  meta: PageMeta;
  hero: {
    eyebrow: string;
    brand: string;
    manifesto: string;
    vision: string;
    chips: string[];
  };
  profile: {
    label: string;
    name: string;
    paragraphs: string[];
  };
  timeline: {
    title: string;
    items: { year: string; title: string; description: string }[];
  };
  skills: { title: string; items: string[] };
  team: {
    title: string;
    description: string;
    members: { name: string; role: string; description: string; image: string }[];
  };
  quote: { text: string; author: string };
  partnership: { title: string; paragraphs: string[] };
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export interface BlogPageContent {
  meta: PageMeta;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  readMore: string;
  backToList: string;
}

/* ------------------------------------------------------------------ */
/* Dictionnaire complet                                                */
/* ------------------------------------------------------------------ */

export interface Dictionary {
  common: CommonContent;
  home: HomeContent;
  agentsHub: SolutionPageContent;
  automationsHub: SolutionPageContent;
  agentEmail: AgentPageContent;
  agentDocs: AgentPageContent;
  agentSales: AgentPageContent;
  agentKnowledge: AgentPageContent;
  agentReporting: AgentPageContent;
  sectorTraining: SectorPageContent;
  sectorLegal: SectorPageContent;
  cases: CasesPageContent;
  method: MethodPageContent;
  formation: FormationPageContent;
  about: AboutPageContent;
  blog: BlogPageContent;
}

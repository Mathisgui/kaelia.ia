import type { SolutionPageContent, SectorPageContent } from "../types";

export const automationsHub: SolutionPageContent = {
  meta: {
    title: "Business Process Automation (n8n, Make)",
    description:
      "Custom automations that connect your tools and run your repetitive processes: invoices, follow-ups, forms, reporting, onboarding. Without changing your tools.",
  },
  hero: {
    eyebrow: "Automations",
    title: "Automations that run your processes, error-free",
    description:
      "An automation connects your tools to each other and runs a predefined process, reliably and with a full audit trail. It is the highest-return building block for eliminating re-keying and missed steps.",
    cta: "Identify my automation opportunities",
  },
  useCases: {
    eyebrow: "Use cases",
    title: "Examples of automations we deploy",
    description:
      "Every automation is built to order around your tools and your business rules.",
    items: [
      {
        title: "Invoice → extraction → filing → accounting",
        description:
          "Incoming invoices are read, extracted, filed and passed to your accounting tool, with no data entry.",
      },
      {
        title: "Form → CRM → email → task",
        description:
          "A request comes in: the contact is created in the CRM, the confirmation email goes out, the sales task is assigned.",
      },
      {
        title: "Unanswered quote → automatic follow-ups",
        description:
          "Once your deadline passes, the follow-up goes out per your rules: number, tone, exceptions.",
      },
      {
        title: "Attendance sheet → OCR → spreadsheet → reporting",
        description:
          "Scanned sheets are read and consolidated automatically into your tracking spreadsheets.",
      },
      {
        title: "CRM data → PDF report",
        description:
          "Your weekly or monthly reporting generated automatically from the live data.",
      },
      {
        title: "Contract signed → client onboarding",
        description:
          "The moment the contract is signed: client workspaces created, welcome pack sent, milestones scheduled.",
      },
    ],
  },
  explainer: {
    title: "Automations you actually own",
    paragraphs: [
      "No black box, no dependency on opaque custom code: everything is documented, reversible and plugged into the tools you already use. We build on n8n and Make, two proven platforms that connect to hundreds of tools.",
      "When a process requires understanding (reading an email, interpreting a document), an AI agent slots into the automation: the agent understands and decides, the automation executes and logs.",
    ],
  },
  children: {
    eyebrow: "By industry",
    title: "Automations designed for your line of work",
    description:
      "Two industries where we have deep expertise, each detailed on its own page.",
    items: [
      {
        title: "Training providers",
        description:
          "Enrollments, session notices, attendance sheets, invoicing: automating a training provider's admin work, including Qualiopi requirements (the French training quality certification).",
        href: "/en/training-provider-automation",
        linkLabel: "See the training providers page",
      },
      {
        title: "Law firms and regulated professions",
        description:
          "Client intake, case documents, deadlines, standard letters: automating without compromising confidentiality.",
        href: "/en/law-firm-automation",
        linkLabel: "See the law firms page",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Impact",
    title: "What changes with automations in place",
    rows: [
      {
        before: "Hours of copy-paste between tools",
        after: "Data flows on its own, without errors",
      },
      {
        before: "Processes that depend on one person",
        after: "Documented processes that run by themselves",
      },
      {
        before: "Missed steps (follow-up, sending, creation)",
        after: "Every step executed and logged, every time",
      },
    ],
  },
  faq: [
    {
      question: "How is this different from an AI agent?",
      answer:
        "An automation follows a predefined scenario, with no interpretation: it is reliable, fast and inexpensive. An AI agent is added when variable content needs to be understood. Many projects start with pure automation, then add AI where it genuinely earns its keep.",
    },
    {
      question: "What happens if an automation breaks down?",
      answer:
        "Every run is logged, errors trigger an alert and a fallback handling path is in place: nothing is lost silently. From there, two options: we monitor and fix through a maintenance plan, or you run it in-house with the documented system and training included.",
    },
    {
      question: "Are our tools compatible?",
      answer:
        "n8n and Make connect to hundreds of tools, and any software with an API can be integrated. The assessment confirms feasibility on your environment.",
    },
    {
      question: "What budget should we plan for?",
      answer:
        "Fixed-price, from €1,500 for a first automation. The free assessment estimates the cost and the time saved before any commitment.",
    },
  ],
  cta: {
    title: "Which process costs you the most time?",
    description:
      "In 30 minutes, we map your repetitive processes and select the most profitable automation to deploy first.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const sectorTraining: SectorPageContent = {
  meta: {
    title: "Automation for Training Providers",
    description:
      "Enrollments, session notices, attendance sheets, invoicing, Qualiopi requirements: automate your training organization's admin work with custom automations.",
  },
  breadcrumbLabel: "Training providers",
  hero: {
    eyebrow: "Industry · Training providers",
    title: "Automating a training provider's admin work",
    description:
      "We know this business from the inside: Kael'IA is the AI arm of the Kaelia group, a Qualiopi-certified training provider (Qualiopi is the French training quality certification). The processes described here are ones we live with every day.",
  },
  painPoints: {
    eyebrow: "The daily grind",
    title: "What eats up a training provider's time",
    items: [
      {
        title: "Each trainee's file",
        description:
          "Enrollment, training agreement, session notice, attendance sheets, completion certificate: dozens of documents per session, often produced by hand.",
      },
      {
        title: "Qualiopi requirements",
        description:
          "Traceability, immediate and follow-up satisfaction surveys, evidence to archive: essential, but time-consuming when nothing is automated.",
      },
      {
        title: "Multi-funder invoicing",
        description:
          "Public training funds (OPCO, CPF), corporate clients, blended funding: each setup has its own circuit, supporting documents and follow-ups.",
      },
      {
        title: "Session tracking",
        description:
          "Reminders to enrollees, rescheduling, attendance consolidation, reporting: a constant stream of small tasks.",
      },
    ],
  },
  caseExample: {
    title: "Example: the automated trainee journey",
    context:
      "A typical scenario for a training provider running several sessions a month with a small admin team.",
    rows: [
      {
        before: "Session notices and agreements drafted one by one",
        after: "Documents generated from the enrollment file",
      },
      {
        before: "Paper attendance sheets re-keyed into a spreadsheet",
        after: "Sheets read by OCR and consolidated automatically",
      },
      {
        before: "Quality surveys sent when someone remembers",
        after: "Sends triggered automatically on the right dates",
      },
      {
        before: "Qualiopi evidence gathered right before the audit",
        after: "Structured archiving as you go",
      },
    ],
    result:
      "Expected outcome: several hours recovered per session, a complete trainee file with no re-keying, and quality evidence ready at all times.",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "The building blocks we deploy for training providers",
    items: [
      {
        title: "Administrative automations",
        description:
          "Enrollment → agreement → session notice → attendance → certificate → invoicing, orchestrated end to end.",
        href: "/en/automations",
        linkLabel: "See the automations",
      },
      {
        title: "Document agent",
        description:
          "Reads attendance sheets, extracts the data, generates certificates and session reports.",
        href: "/en/ai-document-agent",
        linkLabel: "See the document agent",
      },
      {
        title: "Email management agent",
        description:
          "Sorts incoming requests (enrollments, funding, rescheduling) and drafts the replies.",
        href: "/en/ai-email-agent",
        linkLabel: "See the email agent",
      },
    ],
  },
  faq: [
    {
      question: "Is this compatible with our Qualiopi obligations?",
      answer:
        "Yes, and it is actually one of the benefits: automation produces systematic traceability (sends, dates, archived evidence) that makes audits easier. We know the standard because we operate under it ourselves through Kaelia.",
    },
    {
      question: "Do you work with industry tools (Digiforma, etc.)?",
      answer:
        "We connect to tools that offer an API or usable exports, and we build around your existing setup. The assessment checks your exact configuration.",
    },
    {
      question: "Where should we start?",
      answer:
        "Usually with the trainee document journey (session notices, attendance sheets, certificates): high volume, clear rules, immediate gains. The assessment confirms it with your numbers.",
    },
  ],
  cta: {
    title: "Let's talk about your training organization",
    description:
      "In 30 minutes, we identify your most time-consuming process and estimate the hours you could recover per session.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const sectorLegal: SectorPageContent = {
  meta: {
    title: "Automation for Law Firms",
    description:
      "Client intake, document management, standard letters, deadline tracking: automate your firm's repetitive tasks without compromising confidentiality.",
  },
  breadcrumbLabel: "Law firms",
  hero: {
    eyebrow: "Industry · Legal professions",
    title: "Automating a law firm, with no compromise on confidentiality",
    description:
      "Firms lose billable hours to repetitive administrative tasks. Tightly scoped automations take them over, with safeguards built for professional secrecy.",
  },
  painPoints: {
    eyebrow: "The daily grind",
    title: "What eats up a firm's time",
    items: [
      {
        title: "New matter intake",
        description:
          "First contact, document collection, conflict-of-interest checks, file creation: the same circuit repeated for every client.",
      },
      {
        title: "Exhibits and documents",
        description:
          "Filing exhibits, renaming, exhibit schedules: rigor that is essential, yet produced by hand.",
      },
      {
        title: "Repetitive letters and filings",
        description:
          "Demand letters, follow-up correspondence, standard pleadings: templates rewritten instead of generated.",
      },
      {
        title: "Deadlines and follow-ups",
        description:
          "Procedural deadlines, chasing clients for missing documents, tracking unpaid fees.",
      },
    ],
  },
  caseExample: {
    title: "Example: automated client intake",
    context:
      "A typical scenario for a small or mid-sized firm handling a steady flow of new matters.",
    rows: [
      {
        before: "Client details re-typed from email into the practice software",
        after: "File created automatically from the contact form",
      },
      {
        before: "Documents requested by email, one by one",
        after: "Document checklist sent and chased automatically",
      },
      {
        before: "Exhibit schedules assembled by hand",
        after: "Schedules generated from the structured file",
      },
      {
        before: "Deadlines tracked across several calendars",
        after: "Centralized alerts, ahead of every deadline",
      },
    ],
    result:
      "Expected outcome: administrative hours converted into billable time and a sharply reduced risk of missed deadlines or documents.",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "The building blocks we deploy for firms",
    items: [
      {
        title: "Intake and follow-up automations",
        description:
          "From first contact to file opening, then document chasing and deadline tracking.",
        href: "/en/automations",
        linkLabel: "See the automations",
      },
      {
        title: "Document agent",
        description:
          "Files exhibits, extracts information, generates standard letters and exhibit schedules.",
        href: "/en/ai-document-agent",
        linkLabel: "See the document agent",
      },
      {
        title: "Internal knowledge agent",
        description:
          "Searches your case files, templates and internal notes, with cited sources.",
        href: "/en/ai-knowledge-agent",
        linkLabel: "See the knowledge agent",
      },
    ],
  },
  faq: [
    {
      question: "How do you guarantee case-file confidentiality?",
      answer:
        "Data stays in your tools, access follows your existing permissions, and AI models are called through business APIs that do not use your data for training. The exact scope is documented before any deployment.",
    },
    {
      question: "Does the AI draft legal documents?",
      answer:
        "No. The agents prepare templates and standard letters from your models, always subject to your approval. The legal substance stays in the lawyer's hands.",
    },
    {
      question: "Is it compatible with our practice management software?",
      answer:
        "We integrate with tools that offer an API or exports, and automations can also run around your software (email, documents, calendar). The assessment checks your setup.",
    },
  ],
  cta: {
    title: "Let's talk about your firm",
    description:
      "In 30 minutes, we identify your heaviest non-billable tasks and what can be automated first.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

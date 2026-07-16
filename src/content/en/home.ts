import type { HomeContent } from "../types";
import { CALENDAR_URL } from "../fr/common";

export const home: HomeContent = {
  meta: {
    title: "AI Agents & Business Automation | Kael'IA",
    description:
      "Kael'IA builds custom AI agents and automations that handle your documents, CRM, email, follow-ups and reporting. Free 30-minute assessment.",
  },

  hero: {
    title: "Automate the work that slows your teams down.",
    description:
      "Kael'IA automates your company's documents, CRM, follow-ups, email and reporting with custom AI agents and automations. Less re-keying. Fewer things slipping through the cracks. More time for your teams.",
    ctaPrimary: "Identify my automation opportunities",
    ctaPrimaryNote: "30-minute assessment · First use case identified · No commitment",
    ctaSecondary: "See example AI agents",
  },

  operations: {
    eyebrow: "What we automate",
    title: "The operations Kael'IA can take off your plate",
    description:
      "Every company loses hours to the same tasks: re-keying, chasing, sorting, reporting. Here is what our AI agents and automations handle for you.",
    items: [
      {
        icon: "document",
        title: "Documents and data",
        description:
          "Data extracted from your invoices, quotes and forms, then filed and entered into the right tools, with no copy-paste.",
      },
      {
        icon: "target",
        title: "Sales and CRM",
        description:
          "Requests qualified, records updated automatically, follow-ups triggered by the sales rules you define.",
      },
      {
        icon: "mail",
        title: "Email and incoming requests",
        description:
          "Messages sorted, urgent requests flagged, replies drafted and follow-up tasks created automatically.",
      },
      {
        icon: "chart",
        title: "Reporting and oversight",
        description:
          "Your reports generated automatically from the live data in your tools, on whatever schedule you choose.",
      },
      {
        icon: "handshake",
        title: "Client onboarding",
        description:
          "From the moment the contract is signed: client workspaces created, documents sent, milestones scheduled. The same journey for every client.",
      },
      {
        icon: "book",
        title: "Internal knowledge base",
        description:
          "An AI connected to your internal documents that answers your teams' questions, sources included.",
      },
    ],
  },

  pedagogy: {
    eyebrow: "Understand",
    title: "What we actually set up for you",
    description:
      "Two simple building blocks, combined to fit your need. You don't have to pick the technology: you describe the expected result, we assemble what it takes.",
    automation: {
      title: "Repetitive tasks run themselves",
      description:
        "An automation chains the steps of a process, the same way every time, with no errors and nothing forgotten.",
      example:
        "A form is submitted: the contact is created in the CRM, a welcome email goes out, a sales task is assigned.",
    },
    agent: {
      title: "AI reads and understands for you",
      description:
        "An AI agent reads variable content (an email, a document) and chooses the right action, within boundaries you define.",
      example:
        "A customer email arrives: the agent understands the request, pulls the relevant information and drafts a suitable reply.",
    },
    combined: {
      title: "Together is where it gets powerful",
      description:
        "The AI understands and decides, the automation executes and logs. The result: processes that run end to end, with human review exactly where it matters.",
    },
  },

  agents: {
    eyebrow: "Example agents",
    title: "Agents built around your real operations",
    description:
      "Every agent works inside your existing tools, with a defined scope of action and optional human review.",
    items: [
      {
        title: "Document agent",
        mission:
          "Reads your documents, extracts the useful data and generates deliverables.",
        canDo: [
          "Extract data from invoices and forms",
          "File documents in the right place",
          "Generate reports and standard documents",
        ],
        routeKey: "agentDocs",
        linkLabel: "Explore the document agent",
      },
      {
        title: "Sales agent",
        mission:
          "Qualifies requests, keeps the CRM up to date and triggers follow-ups.",
        canDo: [
          "Qualify inbound leads",
          "Update records and opportunities",
          "Chase quotes left without a reply",
        ],
        routeKey: "agentSales",
        linkLabel: "Explore the sales agent",
      },
      {
        title: "Email management agent",
        mission:
          "Reads incoming requests, drafts the replies and organizes follow-up.",
        canDo: [
          "Sort messages and flag urgent requests",
          "Draft a reply ready for your approval",
          "Create tasks and update the CRM",
        ],
        routeKey: "agentEmail",
        linkLabel: "Explore the email agent",
      },
      {
        title: "Reporting agent",
        mission:
          "Collects the numbers from your tools, consolidates them and generates your reports.",
        canDo: [
          "Gather data from several tools at once",
          "Generate the report from your template",
          "Send it to the right people, at the right frequency",
        ],
        routeKey: "agentReporting",
        linkLabel: "Explore the reporting agent",
      },
      {
        title: "Internal knowledge agent",
        mission:
          "Answers your teams' questions from your internal documents.",
        canDo: [
          "Search your procedures and contracts",
          "Answer with cited sources",
          "Stay current as your documents change",
        ],
        routeKey: "agentKnowledge",
        linkLabel: "Explore the knowledge agent",
      },
      {
        title: "Custom agent",
        mission:
          "Your need doesn't fit any of these boxes? We design the agent you need, for your business and your tools.",
        canDo: [
          "Scope the need during the free assessment",
          "Define a clear, safe scope of action",
          "Keep human approval wherever you want it",
        ],
        externalHref: CALENDAR_URL,
        linkLabel: "Book a free assessment",
      },
    ],
  },

  beforeAfter: {
    eyebrow: "Before / After",
    title: "What actually changes",
    rows: [
      {
        before: "Information re-typed into the CRM",
        after: "CRM updated automatically after every exchange",
      },
      {
        before: "Follow-ups that depend on someone remembering",
        after: "Follow-ups triggered by your rules, nothing forgotten",
      },
      {
        before: "Email sorted by hand every morning",
        after: "Continuous automatic classification and routing",
      },
      {
        before: "Reports assembled by hand at month end",
        after: "Documents generated from live data, on demand",
      },
      {
        before: "Digging through ten folders to find one answer",
        after: "A single sourced answer in seconds",
      },
    ],
  },

  stats: {
    eyebrow: "Results",
    title: "Results that speak for themselves",
    description:
      "Every engagement is designed to deliver measurable results and a lasting impact on your business.",
    items: [
      {
        value: "97",
        suffix: "%",
        label: "Client satisfaction",
        description:
          "97% client satisfaction across all our engagements. Our priorities: concrete deliverables, transparent communication and results that live up to your expectations.",
        percentage: 97,
      },
      {
        value: "3",
        suffix: "x",
        label: "Productivity",
        description:
          "The systems we deploy multiply team throughput by 3 on average. Processes that used to take hours now run in minutes.",
        percentage: 75,
      },
      {
        value: "50",
        suffix: "%",
        label: "Time savings",
        description:
          "By automating your repetitive processes, your teams recover 50% of their time on average, reinvested in high-value work.",
        percentage: 88,
      },
    ],
  },

  method: {
    eyebrow: "Our method",
    title: "A controlled rollout, in four steps",
    description:
      "No black-box, months-long project: every step produces a concrete deliverable and you stay in control of every decision.",
    steps: [
      {
        number: "01",
        title: "Assessment",
        description:
          "We map your processes and pinpoint where the hours are going.",
        details:
          "We analyze your actual operations: documents, double data entry, follow-ups, email, tools. Deliverable: a prioritized list of your automatable processes, each with an estimate of the gains and the feasibility.",
      },
      {
        number: "02",
        title: "Prototype",
        description:
          "We build a small, measurable pilot on your most profitable use case.",
        details:
          "A first working agent or automation on a limited scope. You see the results on your real data before going any further.",
      },
      {
        number: "03",
        title: "Deployment",
        description:
          "Connection to your tools, edge-case testing, documentation and hands-on training for your teams.",
        details:
          "Integration into your live environment, handling of edge cases, complete documentation. Your teams are trained to use and supervise the system.",
      },
      {
        number: "04",
        title: "Optimization",
        description:
          "Errors, costs and results are tracked. The system keeps improving.",
        details:
          "Automation monitoring, anomaly fixes, business-rule tuning and usage cost tracking. You always know what the system is doing and what it is earning you.",
      },
    ],
    pageLink: "See the method in detail",
  },

  integrations: {
    eyebrow: "Integrations",
    title: "Connected to the tools you already use",
    description:
      "No new platform to adopt: agents and automations plug into your existing environment.",
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
    eyebrow: "Security & control",
    title: "You stay in control, at every step",
    description:
      "An AI agent in a business needs guardrails. Here is how we design every deployment.",
    items: [
      {
        title: "Where does your data go?",
        description:
          "Your data stays in your tools. AI models are only called on what is strictly necessary, and your data is never used to train them.",
      },
      {
        title: "Who can trigger an action?",
        description:
          "Each agent operates within a scope defined with you: which actions, on which tools, within which limits. Nothing else.",
      },
      {
        title: "Which actions require human approval?",
        description:
          "Sending an email, editing a document, committing to a client: you choose what goes out automatically and what waits for your green light.",
      },
      {
        title: "What happens if an automation fails?",
        description:
          "Every run is logged. On error, the system raises an alert, falls back to manual handling, and nothing is lost silently.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "What budget should we plan for?",
        answer:
          "Projects are fixed-price, from €1,500 for a first automation or a first agent. The free assessment gives you a precise estimate of the cost and the expected gains before any commitment.",
      },
      {
        question: "How long does a first deployment take?",
        answer:
          "A first pilot is usually up and running 2 to 4 weeks after the assessment, depending on the complexity of the process and access to your tools. The goal: a measurable result quickly, not a six-month project.",
      },
      {
        question: "Can the solution connect to our current tools?",
        answer:
          "Yes, that is the whole point. We work with n8n and Make, which connect to hundreds of tools: Google Workspace, Microsoft 365, Notion, Airtable, HubSpot, Pipedrive, and industry software via API. The assessment confirms feasibility on your specific environment.",
      },
      {
        question: "Is human approval possible?",
        answer:
          "Yes, and we recommend it for every outgoing action at the start: the agent prepares, a human approves in one click. Once trust is established, you choose what switches to fully automatic.",
      },
      {
        question: "How is maintenance handled?",
        answer:
          "Two options, depending on what suits you. Either we handle it through a maintenance plan: monitoring, error fixes, integration updates and cost tracking. Or you take it over in-house: every deployment includes a documented system and training so your team is autonomous.",
      },
      {
        question: "What is the difference between an AI agent and an automation?",
        answer:
          "An automation follows a predefined scenario (if X then Y), reliably and with a full audit trail. An AI agent reads variable content (an email, a document) and chooses an action within a defined scope. Most projects combine the two: the agent understands and decides, the automation executes and logs.",
      },
      {
        question: "Is our data used to train the models?",
        answer:
          "No. We use the business APIs of OpenAI, Anthropic and Mistral, whose terms exclude training on your data. Your data stays in your tools and only passes through for the requested processing.",
      },
      {
        question: "Do you train the teams after deployment?",
        answer:
          "Yes, hands-on training is part of every deployment. To go further, full AI training programs, eligible for French professional training funding, are available in partnership with Kaelia, a Qualiopi-certified organization (the French training quality certification).",
      },
    ],
  },

  finalCta: {
    title: "Let's identify your first process to automate",
    description:
      "In 30 minutes, we review your most time-consuming tasks and select a realistic first use case, with an estimate of the gains.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

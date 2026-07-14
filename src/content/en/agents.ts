import type { SolutionPageContent, AgentPageContent } from "../types";

export const agentsHub: SolutionPageContent = {
  meta: {
    title: "Custom AI Agents for Business",
    description:
      "AI agents that understand your requests, use your company's context and take action inside your tools: email, documents, CRM, internal knowledge.",
  },
  hero: {
    eyebrow: "AI Agents",
    title: "AI agents that work inside your tools",
    description:
      "An AI agent understands a request, uses your company's context, chooses an action within a defined scope and executes it in your existing tools. Not magic AI: a supervised, auditable digital coworker with clear boundaries.",
    cta: "Identify my use cases",
  },
  useCases: {
    eyebrow: "Use cases",
    title: "What an AI agent can take on",
    description:
      "Agents are designed around your actual tasks, not around the technology.",
    items: [
      {
        title: "Understand and sort incoming requests",
        description:
          "Email, forms, messages: the agent identifies the topic, the urgency and the right recipient, then prepares the handling.",
      },
      {
        title: "Draft context-aware replies",
        description:
          "The agent draws on your documents, your client history and your business rules to write a reply ready for approval.",
      },
      {
        title: "Keep your tools up to date",
        description:
          "CRM, spreadsheets, databases: the agent logs the information extracted from each exchange, with no manual re-entry.",
      },
      {
        title: "Search your internal knowledge",
        description:
          "Procedures, contracts, meeting notes: the agent finds the information and answers with cited sources.",
      },
      {
        title: "Generate documents",
        description:
          "Reports, summaries, proposals: the agent assembles documents from your data and your templates.",
      },
      {
        title: "Trigger the right actions",
        description:
          "Create a task, schedule a follow-up, alert the right person: the agent chains actions within the boundaries you set.",
      },
    ],
  },
  explainer: {
    title: "An AI agent is not a chatbot",
    paragraphs: [
      "A chatbot answers questions. An AI agent executes tasks: it reads, understands, decides within a defined scope, then acts in your tools (reply, file, update, create, follow up).",
      "Every agent ships with its scope of action, its human-approval rules and a full audit trail. You always know what it did and why, and you can take back control at any time.",
    ],
  },
  children: {
    eyebrow: "Our agents",
    title: "Four agents, four jobs",
    description:
      "Each agent specializes in one type of operation and has its own detailed page.",
    items: [
      {
        title: "Email management agent",
        description:
          "Sorts incoming requests, drafts the replies, creates tasks and updates the CRM.",
        href: "/en/ai-email-agent",
        linkLabel: "See the email agent",
      },
      {
        title: "Document agent",
        description:
          "Extracts data from your invoices, quotes and forms, files documents and generates deliverables.",
        href: "/en/ai-document-agent",
        linkLabel: "See the document agent",
      },
      {
        title: "Sales agent",
        description:
          "Qualifies leads, keeps the CRM up to date and triggers follow-ups at the right time.",
        href: "/en/ai-sales-agent",
        linkLabel: "See the sales agent",
      },
      {
        title: "Internal knowledge agent",
        description:
          "Answers your teams' questions from your documents, sources included.",
        href: "/en/ai-knowledge-agent",
        linkLabel: "See the knowledge agent",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Impact",
    title: "What changes with an agent in production",
    rows: [
      {
        before: "Every request read, sorted and handled by hand",
        after: "The agent prepares, you approve what matters",
      },
      {
        before: "Information scattered across tools",
        after: "Tools kept up to date automatically",
      },
      {
        before: "Replies that take hours to go out",
        after: "Replies ready within minutes",
      },
    ],
  },
  faq: [
    {
      question: "How is an agent's scope of action defined?",
      answer:
        "Together, during the assessment: which tasks, which tools, which limits, which actions run automatically and which wait for approval. That scope is documented and the agent cannot step outside it.",
    },
    {
      question: "What happens when the agent doesn't know?",
      answer:
        "It hands off to a human, with the context already prepared. In a business setting, a good agent above all knows what it should not handle on its own.",
    },
    {
      question: "How much does an AI agent cost?",
      answer:
        "Every project is fixed-price, from €1,500 depending on the complexity of the scope and the integrations. The free assessment gives you a precise quote before any commitment.",
    },
    {
      question: "Do we need to change our tools?",
      answer:
        "No. The agent connects to your existing environment: Gmail or Outlook, Notion, Drive, HubSpot, Pipedrive, spreadsheets, and industry software via API.",
    },
  ],
  cta: {
    title: "Which agent fits your business?",
    description:
      "In 30 minutes, we identify your teams' most time-consuming task and check whether an agent can take it on.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const agentEmail: AgentPageContent = {
  meta: {
    title: "AI Email Management Agent",
    description:
      "An AI agent that sorts your incoming email, flags urgent requests, drafts the replies and updates your CRM. Optional human approval before every send.",
  },
  breadcrumbLabel: "Email agent",
  hero: {
    eyebrow: "AI Agent · Email",
    title: "The agent that handles your incoming email",
    description:
      "It reads requests, drafts the replies and organizes follow-up. Your teams stop sorting and start approving.",
  },
  mission: {
    title: "Its mission",
    description:
      "Cut the time spent on sorting and repetitive replies, and make sure no request is ever forgotten. The agent reads every incoming message, understands the topic and the urgency, then prepares the right handling.",
  },
  capabilities: {
    title: "It can",
    items: [
      "Sort messages by topic and urgency",
      "Detect sensitive requests and escalate them",
      "Look up information in your documents and history",
      "Draft a suitable reply, in your tone of voice",
      "Create a follow-up task assigned to the right person",
      "Update the client record in the CRM",
    ],
  },
  control: {
    title: "Control",
    description:
      "Optional human approval before every send: the agent prepares, you click. Once trust is established, you choose which categories of messages go out automatically.",
  },
  howItWorks: {
    title: "How it works in your tools",
    steps: [
      {
        title: "An email arrives",
        description:
          "The agent analyzes the topic, the urgency and the sender, then files the message in the right category.",
      },
      {
        title: "It prepares the handling",
        description:
          "It searches your document base and your history, drafts a reply and creates the follow-up task.",
      },
      {
        title: "You approve, it executes",
        description:
          "The reply goes out after your approval (or automatically, per your rules), the CRM is updated and the follow-up is logged.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Before / After",
    title: "What changes day to day",
    rows: [
      {
        before: "30 to 60 minutes of sorting every morning",
        after: "Inbox sorted continuously, urgent items flagged",
      },
      {
        before: "Repetitive replies rewritten every time",
        after: "Replies drafted and ready for approval",
      },
      {
        before: "Requests buried in the inbox thread",
        after: "A follow-up task created for every request",
      },
    ],
  },
  integrations: {
    title: "Connected tools",
    tools: ["Gmail", "Outlook", "Notion", "Google Drive", "HubSpot", "Pipedrive", "Slack"],
  },
  faq: [
    {
      question: "Does the agent send emails on its own?",
      answer:
        "Only if you decide it should, category by category. At the start, everything goes through human approval: the agent prepares, you approve in one click.",
    },
    {
      question: "Can it handle a shared inbox (contact@, support@)?",
      answer:
        "Yes, that is actually the highest-return use case: high volume, repetitive requests, and a real need for traceability.",
    },
    {
      question: "How does it learn our tone and our rules?",
      answer:
        "From your standard replies, your procedures and real examples. The style and rules are fine-tuned during the prototype phase, based on your feedback.",
    },
  ],
  related: {
    title: "Also worth exploring",
    items: [
      { label: "Sales agent", href: "/en/ai-sales-agent" },
      { label: "Internal knowledge agent", href: "/en/ai-knowledge-agent" },
      { label: "Our case studies", href: "/en/case-studies" },
    ],
  },
  cta: {
    title: "How many hours does your team spend on email?",
    description:
      "In 30 minutes, we estimate the volume the agent can handle and the time you could recover every week.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const agentDocs: AgentPageContent = {
  meta: {
    title: "AI Document Agent: OCR, Extraction and Generation",
    description:
      "An AI agent that reads your invoices, quotes and forms, extracts the data, files the documents and generates your deliverables. No more manual re-keying.",
  },
  breadcrumbLabel: "Document agent",
  hero: {
    eyebrow: "AI Agent · Documents",
    title: "The agent that reads and produces your documents",
    description:
      "Data extraction, automatic filing, report generation: your documents flow through without re-keying.",
  },
  mission: {
    title: "Its mission",
    description:
      "Eliminate re-keying and copy-paste errors. The agent reads your incoming documents (invoices, quotes, forms, attendance sheets), extracts the useful data and feeds it into your tools, then generates outgoing documents from your templates.",
  },
  capabilities: {
    title: "It can",
    items: [
      "Read PDFs, scans and photos of documents (OCR)",
      "Extract the useful fields: amounts, dates, references, contact details",
      "Check the consistency of the extracted data",
      "File each document in the right place, with consistent naming",
      "Feed your spreadsheets, CRM and accounting tools",
      "Generate reports, summaries and standard documents from your data",
    ],
  },
  control: {
    title: "Control",
    description:
      "Every extraction is logged with its source document. Ambiguous cases (an unreadable document, an inconsistent amount) are set aside for human review instead of being guessed.",
  },
  howItWorks: {
    title: "How it works in your tools",
    steps: [
      {
        title: "A document comes in",
        description:
          "By email, folder drop or upload: the agent detects the document type and starts reading.",
      },
      {
        title: "The data is extracted and checked",
        description:
          "The useful fields are extracted, validated (totals, formats, duplicates) and normalized.",
      },
      {
        title: "Your tools are updated",
        description:
          "The document is filed, the data entered into the right tools, and outgoing documents generated when needed.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Before / After",
    title: "What changes day to day",
    rows: [
      {
        before: "45 minutes of data entry per batch of invoices",
        after: "Automatic extraction and entry, checked in 5 minutes",
      },
      {
        before: "Files named and stored haphazardly",
        after: "Systematic filing, consistent naming",
      },
      {
        before: "Reports pieced together by hand from three tools",
        after: "Report generated automatically from the data",
      },
    ],
  },
  integrations: {
    title: "Connected tools",
    tools: ["Google Drive", "SharePoint", "Notion", "Airtable", "Google Sheets", "Excel", "Accounting software"],
  },
  faq: [
    {
      question: "Which document types are supported?",
      answer:
        "Invoices, quotes, purchase orders, forms, attendance sheets, contracts: any structured or semi-structured document, including scans. Feasibility is checked on your actual documents during the assessment.",
    },
    {
      question: "How reliable is the extraction?",
      answer:
        "It depends on document quality, which is why the prototype runs on your real files. Doubtful cases are systematically routed to human review rather than guessed.",
    },
    {
      question: "Can it generate documents, not just read them?",
      answer:
        "Yes: PDF reports, summaries, proposals, standard letters. The agent assembles the document from your data and your existing templates.",
    },
  ],
  related: {
    title: "Also worth exploring",
    items: [
      { label: "Email management agent", href: "/en/ai-email-agent" },
      { label: "Business automations", href: "/en/automations" },
      { label: "Our case studies", href: "/en/case-studies" },
    ],
  },
  cta: {
    title: "How much of your time goes into re-keying?",
    description:
      "Bring two or three typical documents to the assessment: we check together what can be extracted automatically.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const agentSales: AgentPageContent = {
  meta: {
    title: "AI Sales Agent: Qualification, CRM and Follow-ups",
    description:
      "An AI agent that qualifies your leads, updates your CRM and triggers follow-ups at the right time. No opportunity left behind.",
  },
  breadcrumbLabel: "Sales agent",
  hero: {
    eyebrow: "AI Agent · Sales",
    title: "The agent that keeps your pipeline alive",
    description:
      "Leads qualified, CRM up to date, follow-ups triggered on time: your salespeople sell, the agent handles the rest.",
  },
  mission: {
    title: "Its mission",
    description:
      "Make sure every opportunity gets followed up. The agent qualifies incoming requests, keeps records current from the actual exchanges and triggers follow-ups according to your sales rules.",
  },
  capabilities: {
    title: "It can",
    items: [
      "Qualify inbound leads against your criteria",
      "Create and enrich CRM records from emails and forms",
      "Detect quotes left without a reply",
      "Prepare personalized follow-ups, approved or automatic",
      "Prepare a briefing before each meeting",
      "Feed your sales reporting",
    ],
  },
  control: {
    title: "Control",
    description:
      "Follow-ups run on the rules you define: timing, number, tone, exclusions. Every message can go through approval before sending, and the full history stays in the CRM.",
  },
  howItWorks: {
    title: "How it works in your tools",
    steps: [
      {
        title: "A request comes in",
        description:
          "Form, email or logged call: the agent qualifies the lead and creates a complete record in the CRM.",
      },
      {
        title: "The pipeline stays alive",
        description:
          "The record is updated after every exchange. Quotes without a reply are detected based on your timing rules.",
      },
      {
        title: "Follow-ups go out on time",
        description:
          "The agent prepares a follow-up suited to the context. You approve it, or it goes out automatically per your rules.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Before / After",
    title: "What changes day to day",
    rows: [
      {
        before: "CRM filled in when there is time left over",
        after: "Records updated after every exchange, effortlessly",
      },
      {
        before: "Follow-ups that depend on someone remembering",
        after: "Systematic follow-ups, at the right time",
      },
      {
        before: "Quotes that die without a reply",
        after: "Every quote tracked until a decision",
      },
    ],
  },
  integrations: {
    title: "Connected tools",
    tools: ["HubSpot", "Pipedrive", "Airtable", "Gmail", "Outlook", "Google Sheets", "Slack"],
  },
  faq: [
    {
      question: "Won't automatic follow-ups annoy our prospects?",
      answer:
        "The rules are yours: timing, maximum number, tone, exclusion cases. The agent applies the sales policy you would have wanted to run manually, without the lapses or the excess.",
    },
    {
      question: "Does it work with our current CRM?",
      answer:
        "HubSpot, Pipedrive and Airtable out of the box, plus most CRMs accessible via API. The assessment checks compatibility with your setup.",
    },
    {
      question: "Can it do outbound prospecting?",
      answer:
        "The agent is designed first to lose nothing from your inbound flow and existing pipeline. Outbound sequences are possible, in compliance with consent rules.",
    },
  ],
  related: {
    title: "Also worth exploring",
    items: [
      { label: "Email management agent", href: "/en/ai-email-agent" },
      { label: "Business automations", href: "/en/automations" },
      { label: "Our case studies", href: "/en/case-studies" },
    ],
  },
  cta: {
    title: "How many opportunities do you lose to poor follow-up?",
    description:
      "In 30 minutes, we map your lead journey and pinpoint where the agent recovers revenue.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

/* ------------------------------------------------------------------ */

export const agentKnowledge: AgentPageContent = {
  meta: {
    title: "AI Internal Knowledge Agent (RAG)",
    description:
      "An AI connected to your internal documents that answers your teams' questions with cited sources. Procedures, contracts, project history.",
  },
  breadcrumbLabel: "Knowledge agent",
  hero: {
    eyebrow: "AI Agent · Internal knowledge",
    title: "The agent that knows your documents by heart",
    description:
      "Your teams ask a question, the agent answers from your internal documents, sources included.",
  },
  mission: {
    title: "Its mission",
    description:
      "Make your internal knowledge genuinely accessible. Procedures, contracts, meeting notes, product documentation: the agent finds the right information in seconds instead of sending people digging through ten folders, and it always cites its sources.",
  },
  capabilities: {
    title: "It can",
    items: [
      "Answer questions from your documents (RAG)",
      "Cite the exact sources behind every answer",
      "Search Notion, Drive, SharePoint and your internal databases",
      "Respect each user's existing access rights",
      "Stay current as your documents change",
      "Say \"I don't know\" rather than make things up",
    ],
  },
  control: {
    title: "Control",
    description:
      "The agent only answers from the corpus you define, respects existing permissions and cites its sources. If it cannot find the answer, it says so and points to the right person.",
  },
  howItWorks: {
    title: "How it works in your tools",
    steps: [
      {
        title: "Your documents are indexed",
        description:
          "The corpus you choose (procedures, contracts, internal wiki) is indexed and stays in sync with every update.",
      },
      {
        title: "A question is asked",
        description:
          "From Slack, a dedicated interface or your internal tool: the agent searches the corpus for the relevant passages.",
      },
      {
        title: "A sourced answer",
        description:
          "The agent answers, citing the documents it used, with links to verify or dig deeper.",
      },
    ],
  },
  beforeAfter: {
    eyebrow: "Before / After",
    title: "What changes day to day",
    rows: [
      {
        before: "20 minutes hunting for the right procedure",
        after: "A sourced answer in seconds",
      },
      {
        before: "The same questions asked of the same experts",
        after: "Experts consulted only on genuinely complex cases",
      },
      {
        before: "Knowledge that walks out the door with departures",
        after: "Knowledge captured and searchable",
      },
    ],
  },
  integrations: {
    title: "Connected tools",
    tools: ["Notion", "Google Drive", "SharePoint", "Slack", "Confluence", "Internal PDFs"],
  },
  faq: [
    {
      question: "Are our confidential documents safe?",
      answer:
        "The corpus stays in your tools, the agent only surfaces what the user is already allowed to see, and your data is never used to train the models.",
    },
    {
      question: "What happens if the answer isn't in the documents?",
      answer:
        "The agent says so explicitly instead of making something up, and can point to the right contact person. That is a design rule, not an option.",
    },
    {
      question: "How many documents can it handle?",
      answer:
        "From a few dozen to several thousand. The real issue is corpus quality: the assessment includes a review of your sources so you start on a solid base.",
    },
  ],
  related: {
    title: "Also worth exploring",
    items: [
      { label: "Document agent", href: "/en/ai-document-agent" },
      { label: "Email management agent", href: "/en/ai-email-agent" },
      { label: "Our case studies", href: "/en/case-studies" },
    ],
  },
  cta: {
    title: "Is your internal knowledge really accessible?",
    description:
      "In 30 minutes, we evaluate your document corpus and the most useful use case for your teams.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

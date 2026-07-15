import type { CasesPageContent } from "../types";

export const cases: CasesPageContent = {
  meta: {
    title: "Case Studies: AI Agents and Automations in Production",
    description:
      "Detailed scenarios of business automation and AI agents in action: context, solution, connected tools and before/after results.",
  },
  hero: {
    eyebrow: "Case studies",
    title: "What these systems change, in concrete terms",
    description:
      "Three typical deployments, detailed end to end: the context, the original process, the solution put in place and the results.",
  },
  disclaimer:
    "Representative scenarios based on our deployments, anonymized and presented by industry and company size.",
  labels: {
    context: "Context",
    problem: "Original process",
    solution: "Solution deployed",
    tools: "Connected tools",
    duration: "Time to production",
    results: "Results",
    metric: "Metric",
    before: "Before",
    after: "After",
  },
  cases: [
    {
      sector: "Training provider",
      size: "12 employees",
      title: "The trainee journey without re-keying",
      context:
        "A training provider running around ten sessions a month. Two people on admin, buried in documents: training agreements, session notices, attendance sheets, certificates, quality surveys.",
      problem: [
        "Each session meant producing around twenty documents by hand",
        "Paper attendance sheets were re-keyed into a spreadsheet",
        "Immediate and follow-up surveys went out late, or not at all",
        "Qualiopi compliance evidence (the French training quality certification) was scrambled together before each audit",
      ],
      solution:
        "An n8n automation orchestrates the full journey from enrollment: generating agreements and session notices, reading attendance sheets by OCR, consolidating attendance, sending surveys automatically on the right dates and archiving the evidence in a structured way.",
      tools: ["n8n", "Google Workspace", "Google Sheets", "OCR", "Notion"],
      duration: "4 weeks, from assessment to production",
      results: [
        {
          label: "Producing one session's documents",
          before: "About 3 hours",
          after: "Under 15 minutes of review",
        },
        {
          label: "Entering attendance data",
          before: "45 minutes per session",
          after: "Automatic, checked in 5 minutes",
        },
        {
          label: "Quality surveys sent",
          before: "Inconsistent",
          after: "100% on schedule",
        },
      ],
      outcome:
        "The admin team recovered the equivalent of one day per week, reinvested in trainee relationships and business development.",
    },
    {
      sector: "B2B services SMB",
      size: "25 employees",
      title: "The contact@ inbox handled by an agent",
      context:
        "A services SMB whose contact@ inbox mixes sales inquiries, client questions and job applications. Sorting tied up one person every morning, and requests were falling through the cracks.",
      problem: [
        "60 to 80 incoming emails a day, sorted by hand",
        "Sales inquiries discovered several days after arrival",
        "Repetitive replies rewritten every time",
        "No trace of requests in the CRM",
      ],
      solution:
        "An AI agent analyzes every incoming email: classification by topic, urgency detection, a draft reply ready for approval on routine requests, and automatic creation of the contact and task in the CRM for sales inquiries.",
      tools: ["n8n", "Gmail", "Anthropic API", "HubSpot", "Slack"],
      duration: "3 weeks, from assessment to production",
      results: [
        {
          label: "Daily sorting time",
          before: "About 1 hour",
          after: "Eliminated, continuous sorting",
        },
        {
          label: "First response time on sales inquiries",
          before: "24 to 72 hours",
          after: "Under 4 hours",
        },
        {
          label: "Requests logged in the CRM",
          before: "Left to individual goodwill",
          after: "100% automatic",
        },
      ],
      outcome:
        "No sales inquiry gets forgotten anymore, and replies go out the same day with one-click approval.",
    },
    {
      sector: "Consulting firm",
      size: "8 employees",
      title: "Client reporting generated from the data",
      context:
        "A firm producing a monthly activity report per client, assembled by hand from the CRM, timesheets and tracking spreadsheets.",
      problem: [
        "Half a day per consultant per month spent on reports",
        "Figures copied over with recurring errors",
        "Formats that varied from one consultant to the next",
        "Late deliveries during busy periods",
      ],
      solution:
        "An automation consolidates the data from the three sources, generates a PDF report in the firm's single format and submits it to the consultant for approval before the scheduled send to the client.",
      tools: ["Make", "Airtable", "Google Sheets", "Google Docs", "Gmail"],
      duration: "2 weeks, from assessment to production",
      results: [
        {
          label: "Production time per report",
          before: "3 to 4 hours",
          after: "15 minutes of proofreading",
        },
        {
          label: "Figure errors reported by clients",
          before: "Several per quarter",
          after: "Zero since go-live",
        },
        {
          label: "On-time delivery",
          before: "Variable",
          after: "100% on a fixed date",
        },
      ],
      outcome:
        "The firm standardized its reporting quality and recovered several days of billable time every month.",
    },
  ],
  cta: {
    title: "What about your business?",
    description:
      "Every one of these cases started with the same 30-minute assessment: your processes, your tools, an estimate of the gains.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

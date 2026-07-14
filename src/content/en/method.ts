import type { MethodPageContent } from "../types";

export const method: MethodPageContent = {
  meta: {
    title: "Our Method: Assessment, Prototype, Deployment, Optimization",
    description:
      "How Kael'IA deploys AI agents and automations: a free assessment, a measurable prototype, a documented deployment and continuous optimization.",
  },
  hero: {
    eyebrow: "Method",
    title: "A controlled rollout, not a black-box project",
    description:
      "Four steps, each with a concrete deliverable. You see results on your real data before committing to the next stage.",
  },
  steps: [
    {
      number: "01",
      title: "Assessment",
      description:
        "We map your actual operations: email, documents, tools, double data entry, follow-ups. The goal is to pinpoint where the hours are going and select a first high-potential use case.",
      deliverables: [
        "Map of your repetitive processes",
        "Estimated gains per process",
        "Impact / feasibility prioritization",
        "Selection of a first pilot",
      ],
      duration: "30 minutes free, then 1 to 2 days for a deep dive",
    },
    {
      number: "02",
      title: "Prototype",
      description:
        "We build a small, measurable pilot on the selected use case. It runs on your real data, within a limited scope, to validate the results before scaling up.",
      deliverables: [
        "Working agent or workflow on a limited scope",
        "Testing on your real data",
        "Measurement of the observed gains",
        "An informed decision on scaling up",
      ],
      duration: "1 to 2 weeks depending on the use case",
    },
    {
      number: "03",
      title: "Deployment",
      description:
        "We connect the system to your live environment, handle the edge cases, document everything and train your teams to use and supervise it. Hands-on adoption is part of the deployment.",
      deliverables: [
        "Full integration with your tools",
        "Edge-case and error handling",
        "System documentation",
        "Hands-on training for your teams",
      ],
      duration: "1 to 3 weeks depending on the integrations",
    },
    {
      number: "04",
      title: "Optimization",
      description:
        "A living system needs monitoring and improvement: tracking errors, API costs and results, tuning business rules, updating integrations as your tools evolve.",
      deliverables: [
        "Workflow monitoring and alerts",
        "Anomaly fixes",
        "Cost and gains tracking",
        "Continuous improvement of prompts and rules",
      ],
      duration: "Ongoing, through an optional maintenance plan",
    },
  ],
  maintenance: {
    title: "And afterwards? Maintenance",
    description:
      "You stay autonomous: the system is documented and your teams are trained. For those who prefer to delegate, a maintenance plan covers:",
    items: [
      "Workflow monitoring and error fixes",
      "Integration updates as your tools evolve",
      "API cost tracking and optimization",
      "Continuous improvement of prompts and business rules",
    ],
  },
  faq: [
    {
      question: "What exactly does the free assessment include?",
      answer:
        "A structured 30-minute conversation: your most time-consuming tasks, your tools, your volumes. You walk away with one to three automatable processes identified and a feasibility estimate. It is not a sales call in disguise: if nothing at your company is worth automating, we tell you.",
    },
    {
      question: "Do we need a specific project in mind beforehand?",
      answer:
        "No. Most clients arrive with a hunch (\"we spend too much time on email\") and the assessment turns it into a quantified use case.",
    },
    {
      question: "Who does what during the project?",
      answer:
        "We build, you approve. Your involvement is limited to a few exchanges per step: access to tools, real examples, feedback on the prototype. No full-time team mobilization.",
    },
  ],
  cta: {
    title: "Let's start with the assessment",
    description:
      "30 minutes to map your processes and identify the first profitable use case.",
    button: "Book my free assessment",
    note: "30 minutes · No commitment",
  },
};

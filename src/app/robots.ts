import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Les robots des moteurs génératifs sont autorisés explicitement, et non
 * seulement par le joker : être cité dans une réponse d'IA suppose d'être
 * lisible par ces agents, et le choix mérite d'être écrit noir sur blanc.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

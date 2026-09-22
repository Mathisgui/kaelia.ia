import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/lib/routes";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const FEED_META: Record<Locale, { title: string; description: string; base: string }> = {
  fr: {
    title: `${SITE_NAME}, le blog`,
    description:
      "Guides concrets sur les agents IA et l'automatisation en entreprise : cas d'usage, méthodes, chiffres.",
    base: "/blog",
  },
  en: {
    title: `${SITE_NAME} blog`,
    description:
      "Practical guides on AI agents and business automation: use cases, methods, numbers.",
    base: "/en/blog",
  },
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Flux RSS 2.0 d'une langue, construit depuis les articles publiés. */
export function buildRssFeed(locale: Locale): string {
  const meta = FEED_META[locale];
  const posts = getAllPosts(locale);
  const feedUrl = `${SITE_URL}${locale === "fr" ? "/feed.xml" : "/en/feed.xml"}`;
  const lastBuild = posts[0]
    ? new Date(posts[0].updated ?? posts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${meta.base}/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        "      <author>m.guillemois@kaelia-formacoach.com (Mathis Guillemois)</author>",
        ...post.keywords.map((kw) => `      <category>${escapeXml(kw)}</category>`),
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(meta.title)}</title>`,
    `    <link>${SITE_URL}${meta.base}</link>`,
    `    <description>${escapeXml(meta.description)}</description>`,
    `    <language>${locale}</language>`,
    `    <lastBuildDate>${lastBuild}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");
}

export function rssResponse(locale: Locale): Response {
  return new Response(buildRssFeed(locale), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "./routes";

const BLOG_ROOT = path.join(process.cwd(), "src/content/blog");

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date attendue au format YYYY-MM-DD");

export const FaqItemSchema = z.object({
  question: z.string().min(10),
  answer: z.string().min(40),
});

export const SourceSchema = z.object({
  title: z.string().min(3),
  url: z.string().url(),
  date: isoDate.optional(),
});

/** Regroupement thématique d'un article : pilote les articles liés et `articleSection`. */
export const CLUSTERS = [
  "automatisation",
  "agents-ia",
  "metiers",
  "prix-roi",
  "securite-rgpd",
  "outils",
] as const;

/**
 * Frontmatter d'un article. Les 5 champs historiques sont requis, tout le
 * reste est optionnel : les articles déjà publiés valident sans modification.
 * `.strict()` refuse une clé inconnue, pour que le frontmatter ne dérive pas.
 */
export const PostFrontmatter = z
  .object({
    title: z.string().min(20).max(70),
    date: isoDate,
    excerpt: z.string().min(100).max(180),
    keywords: z.array(z.string()).min(3).max(8),
    translationKey: z.string().min(3),
    updated: isoDate.optional(),
    primaryKeyword: z.string().optional(),
    cluster: z.enum(CLUSTERS).optional(),
    /** Page mère de l'article : clé de `routes.ts` (ex. "automations"). */
    pillar: z.string().optional(),
    image: z.string().startsWith("/blog/").optional(),
    imageAlt: z.string().min(10).max(125).optional(),
    faq: z.array(FaqItemSchema).max(8).default([]),
    sources: z.array(SourceSchema).default([]),
    draft: z.boolean().default(false),
  })
  .strict();

export type PostFrontmatterInput = z.input<typeof PostFrontmatter>;

export interface BlogPostMeta extends z.output<typeof PostFrontmatter> {
  slug: string;
  locale: Locale;
  /** `primaryKeyword` explicite, sinon le premier mot-clé. */
  focusKeyword: string;
  /** Temps de lecture en minutes (base 200 mots/minute). */
  readingMinutes: number;
}

function blogDir(locale: Locale): string {
  return path.join(BLOG_ROOT, locale);
}

function parseMeta(
  locale: Locale,
  filename: string,
  raw: string
): BlogPostMeta {
  const slug = filename.replace(/\.mdx$/, "");
  const { data, content } = matter(raw);
  const parsed = PostFrontmatter.safeParse(data);

  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "(racine)"} : ${issue.message}`)
      .join(" · ");
    throw new Error(`[blog] ${locale}/${filename} — frontmatter invalide : ${details}`);
  }

  const meta = parsed.data;

  return {
    ...meta,
    slug,
    locale,
    focusKeyword: meta.primaryKeyword ?? meta.keywords[0],
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
  };
}

export function getAllPosts(locale: Locale): BlogPostMeta[] {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];

  const posts = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) =>
      parseMeta(locale, filename, fs.readFileSync(path.join(dir, filename), "utf-8"))
    )
    .filter((post) => !post.draft);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(locale: Locale, slug: string) {
  const filePath = path.join(blogDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  const meta = parseMeta(locale, `${slug}.mdx`, raw);
  if (meta.draft) return null;

  return { meta, content };
}

export function getAllSlugs(locale: Locale): string[] {
  return getAllPosts(locale).map((post) => post.slug);
}

/**
 * Articles du même cluster, les plus récents d'abord. Repli sur les articles
 * les plus récents toutes thématiques confondues quand le cluster est absent
 * ou trop peu peuplé, pour qu'un article ne reste jamais sans voisins.
 */
export function getRelatedPosts(
  locale: Locale,
  slug: string,
  limit = 3
): BlogPostMeta[] {
  const all = getAllPosts(locale);
  const current = all.find((post) => post.slug === slug);
  if (!current) return [];

  const others = all.filter((post) => post.slug !== slug);
  const sameCluster = current.cluster
    ? others.filter((post) => post.cluster === current.cluster)
    : [];

  const picked = [...sameCluster];
  for (const post of others) {
    if (picked.length >= limit) break;
    if (!picked.some((p) => p.slug === post.slug)) picked.push(post);
  }

  return picked.slice(0, limit);
}

/** Index translationKey -> slug, construit une fois par locale et par build. */
const translationIndex = new Map<Locale, Map<string, string>>();

function getTranslationIndex(locale: Locale): Map<string, string> {
  const cached = translationIndex.get(locale);
  if (cached) return cached;

  const index = new Map<string, string>();
  for (const post of getAllPosts(locale)) {
    index.set(post.translationKey, post.slug);
  }
  translationIndex.set(locale, index);
  return index;
}

/** Slug de la version traduite d'un article, via son translationKey. */
export function getTranslatedSlug(
  fromLocale: Locale,
  slug: string
): string | null {
  const post = getPostBySlug(fromLocale, slug);
  if (!post) return null;
  const other: Locale = fromLocale === "fr" ? "en" : "fr";
  return getTranslationIndex(other).get(post.meta.translationKey) ?? null;
}

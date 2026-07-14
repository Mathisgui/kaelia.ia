import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./routes";

const BLOG_ROOT = path.join(process.cwd(), "src/content/blog");

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  excerpt: string;
  keywords: string[];
  /** Identique entre les versions FR et EN d'un même article (hreflang). */
  translationKey: string;
}

function blogDir(locale: Locale): string {
  return path.join(BLOG_ROOT, locale);
}

function parseMeta(locale: Locale, filename: string, raw: string): BlogPostMeta {
  const slug = filename.replace(/\.mdx$/, "");
  const { data } = matter(raw);
  return {
    slug,
    locale,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    keywords: data.keywords ?? [],
    translationKey: data.translationKey ?? slug,
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
    );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(locale: Locale, slug: string) {
  const filePath = path.join(blogDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  return {
    meta: parseMeta(locale, `${slug}.mdx`, raw),
    content,
  };
}

export function getAllSlugs(locale: Locale): string[] {
  const dir = blogDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Slug de la version traduite d'un article, via son translationKey. */
export function getTranslatedSlug(
  fromLocale: Locale,
  slug: string
): string | null {
  const post = getPostBySlug(fromLocale, slug);
  if (!post) return null;
  const other: Locale = fromLocale === "fr" ? "en" : "fr";
  const match = getAllPosts(other).find(
    (p) => p.translationKey === post.meta.translationKey
  );
  return match?.slug ?? null;
}

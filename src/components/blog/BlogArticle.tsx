import React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { getPostBySlug } from "@/lib/blog";
import type { Locale } from "@/lib/routes";

interface BlogArticleProps {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  locale: Locale;
  backLabel: string;
}

const DATE_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-US" };

export default function BlogArticle({ post, locale, backLabel }: BlogArticleProps) {
  const basePath = locale === "fr" ? "/blog" : "/en/blog";

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link
        href={basePath}
        className="mb-8 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        {backLabel}
      </Link>

      <time className="block text-sm text-white/40">
        {new Date(post.meta.date).toLocaleDateString(DATE_LOCALE[locale], {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-3 mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
        {post.meta.title}
      </h1>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-serif prose-p:text-white/75 prose-li:text-white/75 prose-a:text-[#a78bfa] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-[#7c3aed] prose-blockquote:text-white/70 prose-code:text-[#a78bfa]">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {post.meta.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40"
          >
            {kw}
          </span>
        ))}
      </div>
    </article>
  );
}

import React from "react";
import Link from "next/link";
import type { BlogPageContent } from "@/content/types";
import type { BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/routes";

interface BlogListProps {
  posts: BlogPostMeta[];
  content: BlogPageContent;
  locale: Locale;
}

const DATE_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-US" };

export default function BlogList({ posts, content, locale }: BlogListProps) {
  const basePath = locale === "fr" ? "/blog" : "/en/blog";

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold text-white">{content.title}</h1>
      <p className="mb-12 text-lg text-white/60">{content.description}</p>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
          <p className="text-lg text-white/40">{content.emptyTitle}</p>
          <p className="mt-2 text-white/30">{content.emptyDescription}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#7c3aed]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
            >
              <time className="text-sm text-white/40">
                {new Date(post.date).toLocaleDateString(DATE_LOCALE[locale], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-[#a78bfa]">
                {post.title}
              </h2>
              <p className="mt-3 text-white/60 leading-relaxed">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

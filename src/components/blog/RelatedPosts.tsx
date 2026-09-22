import React from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/routes";

/**
 * Articles liés en pied d'article : donne au lecteur une suite, et relie
 * entre elles les pages du blog, qui sinon ne pointent que vers les pages
 * d'offre.
 */
export default function RelatedPosts({
  posts,
  title,
  locale,
}: {
  posts: BlogPostMeta[];
  title: string;
  locale: Locale;
}) {
  if (posts.length === 0) return null;
  const basePath = locale === "fr" ? "/blog" : "/en/blog";

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-xl font-semibold text-white">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`${basePath}/${post.slug}`}
              className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[#7c3aed]/40"
            >
              <span className="text-sm font-medium leading-snug text-white">
                {post.title}
              </span>
              <span className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/50">
                {post.excerpt}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

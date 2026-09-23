import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { getPostBySlug, BlogPostMeta } from "@/lib/blog";
import type { Locale } from "@/lib/routes";
import { routePath } from "@/lib/routes";
import type { BlogPageContent } from "@/content/types";
import FaqAccordion from "@/components/ui/FaqAccordion";
import AuthorCard from "./AuthorCard";
import RelatedPosts from "./RelatedPosts";
import { mdxComponents } from "./mdx-components";
import { insecables, remarkInsecables } from "@/lib/typographie";

interface BlogArticleProps {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  locale: Locale;
  content: BlogPageContent;
  related: BlogPostMeta[];
}

const DATE_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-US" };

function formatDate(value: string, locale: Locale): string {
  return new Date(value).toLocaleDateString(DATE_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogArticle({
  post,
  locale,
  content,
  related,
}: BlogArticleProps) {
  const { meta } = post;
  const labels = content.article;
  const basePath = routePath("blog", locale);

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <nav
        aria-label={labels.home}
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/40"
      >
        <Link href={routePath("home", locale)} className="hover:text-white/70">
          {labels.home}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={basePath} className="hover:text-white/70">
          {content.title}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-white/60">{insecables(meta.title)}</span>
      </nav>

      <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
        {insecables(meta.title)}
      </h1>

      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/40">
        <span>
          {labels.by}{" "}
          <Link
            href={routePath("about", locale)}
            className="text-white/60 hover:text-white/80"
          >
            Mathis Guillemois
          </Link>
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {labels.published}{" "}
          <time dateTime={meta.date}>{formatDate(meta.date, locale)}</time>
        </span>
        {meta.updated ? (
          <>
            <span aria-hidden="true">·</span>
            <span>
              {labels.updated}{" "}
              <time dateTime={meta.updated}>
                {formatDate(meta.updated, locale)}
              </time>
            </span>
          </>
        ) : null}
        <span aria-hidden="true">·</span>
        <span>
          {meta.readingMinutes} {labels.readingTime}
        </span>
      </p>

      {meta.image ? (
        <Image
          src={meta.image}
          alt={meta.imageAlt ?? meta.title}
          width={1200}
          height={800}
          priority
          className="mt-8 w-full rounded-2xl border border-white/10 object-cover"
        />
      ) : null}

      <div className="mt-10 prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-serif prose-p:text-white/75 prose-li:text-white/75 prose-a:text-[#a78bfa] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-[#7c3aed] prose-blockquote:text-white/70 prose-code:text-[#a78bfa] prose-th:text-white prose-td:text-white/75">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkInsecables] } }}
        />
      </div>

      {meta.faq.length > 0 ? (
        <section id="faq" className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-white">
            {labels.faqTitle}
          </h2>
          <FaqAccordion
            items={meta.faq.map((item) => ({
              question: insecables(item.question),
              answer: insecables(item.answer),
            }))}
          />
        </section>
      ) : null}

      {meta.sources.length > 0 ? (
        <section id="sources" className="mt-16">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {labels.sourcesTitle}
          </h2>
          <ul className="space-y-2 text-sm text-white/60">
            {meta.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a78bfa] hover:underline"
                >
                  {insecables(source.title)}
                </a>
                {source.date ? (
                  <span className="text-white/40">
                    {" "}
                    ({labels.consultedOn} {formatDate(source.date, locale)})
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12 flex flex-wrap gap-2">
        {meta.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40"
          >
            {kw}
          </span>
        ))}
      </div>

      <AuthorCard locale={locale} />

      <RelatedPosts
        posts={related}
        title={labels.relatedTitle}
        locale={locale}
      />

      <Link
        href={basePath}
        className="mt-12 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        {content.backToList}
      </Link>
    </article>
  );
}

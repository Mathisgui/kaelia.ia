import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.meta.title} | Kael'IA`,
    description: post.meta.excerpt,
    keywords: post.meta.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.excerpt,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "Mathis Guillemois",
    },
    publisher: {
      "@type": "Organization",
      name: "Kael'IA",
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <time className="text-sm text-white/40">
        {new Date(post.meta.date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <h1 className="mt-3 mb-8 text-4xl font-bold leading-tight text-white md:text-5xl">
        {post.meta.title}
      </h1>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-[#7c3aed] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-[#7c3aed] prose-pre:border prose-pre:border-white/10 prose-pre:bg-white/5">
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

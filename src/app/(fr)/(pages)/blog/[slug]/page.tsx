import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getTranslatedSlug } from "@/lib/blog";
import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { articleJsonLd, jsonLdScript } from "@/lib/jsonld";
import BlogArticle from "@/components/blog/BlogArticle";

interface Props {
  params: Promise<{ slug: string }>;
}

const dict = getDictionary("fr");

export async function generateStaticParams() {
  return getAllSlugs("fr").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("fr", slug);
  if (!post) return {};

  const translatedSlug = getTranslatedSlug("fr", slug);

  return {
    ...buildMetadata({
      locale: "fr",
      path: `/blog/${slug}`,
      alternate: translatedSlug
        ? { locale: "en", path: `/en/blog/${translatedSlug}` }
        : undefined,
      title: post.meta.title,
      description: post.meta.excerpt,
    }),
    keywords: post.meta.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("fr", slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            articleJsonLd({
              title: post.meta.title,
              description: post.meta.excerpt,
              datePublished: post.meta.date,
              path: `/blog/${slug}`,
              locale: "fr",
            })
          ),
        }}
      />
      <BlogArticle post={post} locale="fr" backLabel={dict.blog.backToList} />
    </>
  );
}

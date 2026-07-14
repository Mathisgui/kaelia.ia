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

const dict = getDictionary("en");

export async function generateStaticParams() {
  return getAllSlugs("en").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("en", slug);
  if (!post) return {};

  const translatedSlug = getTranslatedSlug("en", slug);

  return {
    ...buildMetadata({
      locale: "en",
      path: `/en/blog/${slug}`,
      alternate: translatedSlug
        ? { locale: "fr", path: `/blog/${translatedSlug}` }
        : undefined,
      title: post.meta.title,
      description: post.meta.excerpt,
    }),
    keywords: post.meta.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("en", slug);
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
              path: `/en/blog/${slug}`,
              locale: "en",
            })
          ),
        }}
      />
      <BlogArticle post={post} locale="en" backLabel={dict.blog.backToList} />
    </>
  );
}

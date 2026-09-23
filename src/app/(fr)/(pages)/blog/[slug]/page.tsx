import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getAllSlugs,
  getTranslatedSlug,
  getRelatedPosts,
} from "@/lib/blog";
import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { routePath } from "@/lib/routes";
import {
  articleJsonLd,
  faqPageJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/jsonld";
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
      type: "article",
      // L'aperçu social est le JPEG 1200x630, recadré pour ce format.
      image: post.meta.image?.replace(/^\/blog\/(.+)\.webp$/, "/blog/og/$1.jpg"),
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updated,
    }),
    keywords: post.meta.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("fr", slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;
  const related = getRelatedPosts("fr", slug);

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
              dateModified: post.meta.updated,
              path,
              locale: "fr",
              image: post.meta.image,
              keywords: post.meta.keywords,
              section: post.meta.cluster,
              authorPath: routePath("about", "fr"),
            })
          ),
        }}
      />
      {post.meta.faq.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(faqPageJsonLd(post.meta.faq)),
          }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: dict.blog.article.home, path: routePath("home", "fr") },
              { name: dict.blog.title, path: routePath("blog", "fr") },
              { name: post.meta.title, path },
            ])
          ),
        }}
      />
      <BlogArticle
        post={post}
        locale="fr"
        content={dict.blog}
        related={related}
      />
    </>
  );
}

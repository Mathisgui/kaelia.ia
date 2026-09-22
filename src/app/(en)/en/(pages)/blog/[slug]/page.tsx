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
      type: "article",
      image: post.meta.image,
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updated,
    }),
    keywords: post.meta.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("en", slug);
  if (!post) notFound();

  const path = `/en/blog/${slug}`;
  const related = getRelatedPosts("en", slug);

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
              locale: "en",
              image: post.meta.image,
              keywords: post.meta.keywords,
              section: post.meta.cluster,
              authorPath: routePath("about", "en"),
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
              { name: dict.blog.article.home, path: routePath("home", "en") },
              { name: dict.blog.title, path: routePath("blog", "en") },
              { name: post.meta.title, path },
            ])
          ),
        }}
      />
      <BlogArticle
        post={post}
        locale="en"
        content={dict.blog}
        related={related}
      />
    </>
  );
}

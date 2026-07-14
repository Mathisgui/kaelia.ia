import { getDictionary } from "@/content";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";

const dict = getDictionary("fr");

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "blog",
  title: dict.blog.meta.title,
  description: dict.blog.meta.description,
});

export default function BlogPage() {
  const posts = getAllPosts("fr");
  return <BlogList posts={posts} content={dict.blog} locale="fr" />;
}

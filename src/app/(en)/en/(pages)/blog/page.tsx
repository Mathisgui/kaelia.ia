import { getDictionary } from "@/content";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import BlogList from "@/components/blog/BlogList";

const dict = getDictionary("en");

export const metadata = buildMetadata({
  locale: "en",
  routeKey: "blog",
  title: dict.blog.meta.title,
  description: dict.blog.meta.description,
});

export default function BlogPage() {
  const posts = getAllPosts("en");
  return <BlogList posts={posts} content={dict.blog} locale="en" />;
}

import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Kael'IA — Actualités IA & Automatisation",
  description:
    "Articles et actualités sur l'intelligence artificielle, l'automatisation et la transformation digitale des entreprises.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold text-white">Actualités</h1>
      <p className="mb-12 text-lg text-white/60">
        Articles et analyses sur l&apos;intelligence artificielle,
        l&apos;automatisation et la transformation digitale.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
          <p className="text-lg text-white/40">Articles à venir...</p>
          <p className="mt-2 text-white/30">
            Les premiers articles seront publiés prochainement.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#7c3aed]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
            >
              <time className="text-sm text-white/40">
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-[#7c3aed]">
                {post.title}
              </h2>
              <p className="mt-3 text-white/60 leading-relaxed">
                {post.excerpt}
              </p>
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

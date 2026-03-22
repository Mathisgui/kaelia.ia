import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Kael'IA — Actualités IA & Automatisation",
  description:
    "Articles et actualités sur l'intelligence artificielle, l'automatisation et la transformation digitale des entreprises.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="mb-6 text-4xl font-bold text-white">Actualités</h1>
      <p className="mb-12 text-lg text-white/60">
        Articles et analyses sur l&apos;intelligence artificielle,
        l&apos;automatisation et la transformation digitale.
      </p>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-md">
        <p className="text-lg text-white/40">Articles à venir...</p>
        <p className="mt-2 text-white/30">
          Les premiers articles seront publiés prochainement.
        </p>
      </div>
    </div>
  );
}

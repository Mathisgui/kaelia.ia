"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const expertiseAreas = [
  {
    title: "Systèmes IA sur mesure",
    description:
      "Conception et déploiement d'agents IA adaptés aux besoins spécifiques de chaque organisation.",
    icon: "🤖",
  },
  {
    title: "Automatisation de processus",
    description:
      "Workflows n8n et Make pour éliminer les tâches répétitives et gagner en productivité.",
    icon: "⚡",
  },
  {
    title: "Formation et montée en compétences",
    description:
      "Programmes certifiés Qualiopi pour rendre les équipes autonomes face aux outils IA.",
    icon: "🎓",
  },
  {
    title: "Conseil stratégique",
    description:
      "Audit et feuille de route IA pour maximiser le ROI de chaque investissement technologique.",
    icon: "📊",
  },
];

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in animations for sections
      gsap.utils.toArray<HTMLElement>(".about-fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Stagger cards
      gsap.fromTo(
        ".expertise-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".expertise-grid",
            start: "top 80%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero Banner */}
      <section className="relative px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="about-fade-in mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Qui sommes-nous
          </p>
          <h1 className="about-fade-in mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            À PROPOS DE KAEL&apos;IA
          </h1>
          <div className="about-fade-in mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
        </div>
      </section>

      {/* Mission */}
      <section className="about-fade-in mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
          <h2 className="mb-6 text-3xl font-bold text-white">Notre mission</h2>
          <p className="text-lg leading-relaxed text-white/70">
            Transformer les entreprises grâce à l&apos;intelligence artificielle.
            Kael&apos;IA accompagne les organisations dans leur transition IA avec
            une approche pragmatique, centrée sur les résultats. Chaque solution
            est pensée pour s&apos;intégrer naturellement dans les processus
            existants et générer un impact mesurable dès les premières semaines.
          </p>
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="about-fade-in mb-12 text-center text-3xl font-bold text-white">
          Domaines d&apos;expertise
        </h2>
        <div className="expertise-grid grid gap-6 sm:grid-cols-2">
          {expertiseAreas.map((area) => (
            <div
              key={area.title}
              className="expertise-card rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors hover:border-violet-500/30"
            >
              <span className="mb-4 block text-4xl">{area.icon}</span>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {area.title}
              </h3>
              <p className="text-white/60">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="about-fade-in mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-10 backdrop-blur-md">
          <h2 className="mb-6 text-3xl font-bold text-white">Notre vision</h2>
          <p className="text-lg leading-relaxed text-white/70">
            L&apos;IA n&apos;est pas une menace, c&apos;est un levier.
            L&apos;objectif : rendre l&apos;intelligence artificielle accessible,
            pratique et profitable pour chaque entreprise, quelle que soit sa
            taille ou son secteur. La technologie doit servir l&apos;humain, pas
            le remplacer.
          </p>
        </div>
      </section>

      {/* Partnership */}
      <section className="about-fade-in mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
          <h2 className="mb-6 text-3xl font-bold text-white">Partenariat</h2>
          <p className="text-lg leading-relaxed text-white/70">
            En partenariat avec{" "}
            <span className="font-semibold text-violet-400">Kaelia</span>,
            organisme de formation certifié Qualiopi, des formations IA
            finançables par les OPCO sont proposées. Cette collaboration garantit
            un cadre pédagogique rigoureux et des programmes adaptés aux
            exigences professionnelles actuelles.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="about-fade-in px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Prêt à transformer votre entreprise ?
        </h2>
        <p className="mb-8 text-lg text-white/60">
          Discutons de vos enjeux et trouvons la solution IA adaptée.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
        >
          Prendre contact
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>
    </div>
  );
}

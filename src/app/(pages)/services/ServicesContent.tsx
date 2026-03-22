"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Formation IA",
    subtitle: "Rendez vos équipes autonomes",
    description: [
      "Les formations IA proposées par Kael'IA, en partenariat avec Kaelia (organisme certifié Qualiopi), permettent aux équipes de maîtriser les outils d'intelligence artificielle les plus pertinents pour leur métier.",
      "Chaque programme est conçu sur mesure : du niveau débutant aux usages avancés, en passant par la création de prompts efficaces, l'utilisation de ChatGPT, Claude, Midjourney ou encore l'intégration d'IA dans les workflows existants.",
      "Les formations sont finançables par les OPCO, garantissant un investissement accessible et rentable pour toutes les structures.",
    ],
    benefits: [
      "Programmes adaptés à chaque niveau",
      "Certifié Qualiopi — finançable OPCO",
      "Cas pratiques issus de votre secteur",
      "Suivi post-formation inclus",
    ],
  },
  {
    title: "Automatisation de processus",
    subtitle: "Éliminez les tâches répétitives",
    description: [
      "L'automatisation est le moyen le plus rapide de gagner en productivité. Kael'IA conçoit des workflows intelligents avec n8n, Make et Zapier pour connecter les outils existants et supprimer les tâches manuelles à faible valeur ajoutée.",
      "De la gestion des emails à la synchronisation CRM, en passant par la génération automatique de rapports, chaque automatisation est testée, documentée et maintenue.",
      "Le résultat : des équipes libérées des tâches chronophages qui peuvent se concentrer sur ce qui compte vraiment.",
    ],
    benefits: [
      "Gain de temps immédiat et mesurable",
      "Intégration avec vos outils actuels",
      "Zéro code requis côté client",
      "Maintenance et évolution incluses",
    ],
  },
  {
    title: "Conseil stratégique IA",
    subtitle: "Investissez au bon endroit",
    description: [
      "Avant de déployer quoi que ce soit, il est essentiel de comprendre où l'IA peut réellement apporter de la valeur. Un audit complet des processus permet d'identifier les opportunités à fort ROI et d'éviter les investissements inutiles.",
      "La feuille de route IA produite est concrète, priorisée et adaptée aux ressources disponibles. Pas de buzzwords, uniquement des recommandations actionnables.",
      "L'accompagnement inclut la veille technologique continue pour ajuster la stratégie aux évolutions du marché.",
    ],
    benefits: [
      "Audit complet de vos processus",
      "Feuille de route priorisée par ROI",
      "Recommandations actionnables",
      "Veille technologique continue",
    ],
  },
  {
    title: "Agents IA",
    subtitle: "Des assistants intelligents 24/7",
    description: [
      "Les agents IA développés par Kael'IA sont des systèmes autonomes capables de gérer des tâches complexes : support client, qualification de leads, analyse de documents, rédaction automatisée et bien plus encore.",
      "Chaque agent est entraîné sur les données et le contexte métier spécifiques de l'entreprise, garantissant des réponses pertinentes et cohérentes avec l'image de marque.",
      "Les agents s'intègrent aux outils existants (CRM, messagerie, site web) et évoluent en continu grâce aux retours utilisateurs.",
    ],
    benefits: [
      "Disponibles 24h/24, 7j/7",
      "Entraînés sur vos données métier",
      "Intégrés à vos outils existants",
      "Amélioration continue automatique",
    ],
  },
  {
    title: "Développement sur mesure",
    subtitle: "Des solutions qui vous ressemblent",
    description: [
      "Quand les outils standards ne suffisent plus, Kael'IA conçoit des solutions IA entièrement personnalisées. Applications web, APIs, dashboards, systèmes de recommandation — chaque projet est développé avec les technologies les plus adaptées.",
      "Le processus de développement est transparent : sprints courts, démonstrations régulières et communication constante pour garantir que le résultat correspond exactement aux attentes.",
      "Chaque livrable inclut documentation technique, formation des équipes et support post-déploiement.",
    ],
    benefits: [
      "Architecture sur mesure",
      "Développement agile et transparent",
      "Documentation complète",
      "Support et maintenance inclus",
    ],
  },
];

export default function ServicesContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-fade-in").forEach((el) => {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="service-fade-in mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Ce que nous faisons
          </p>
          <h1 className="service-fade-in mb-6 text-5xl font-bold leading-tight text-white md:text-6xl">
            NOS SERVICES
          </h1>
          <p className="service-fade-in mx-auto max-w-2xl text-lg text-white/60">
            Des solutions IA concrètes pour chaque besoin. De la formation au
            développement sur mesure, chaque prestation est pensée pour générer
            un impact réel et mesurable.
          </p>
          <div className="service-fade-in mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
        </div>
      </section>

      {/* Service Blocks */}
      <section className="mx-auto max-w-5xl space-y-20 px-6 py-16">
        {services.map((service, index) => {
          const isReversed = index % 2 !== 0;
          return (
            <div
              key={service.title}
              className={`service-fade-in flex flex-col gap-8 lg:flex-row lg:items-start ${
                isReversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Text */}
              <div className="flex-1">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-violet-400">
                  {service.subtitle}
                </p>
                <h2 className="mb-6 text-3xl font-bold text-white">
                  {service.title}
                </h2>
                <div className="space-y-4">
                  {service.description.map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-white/70">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Benefits Card */}
              <div className="w-full flex-shrink-0 lg:w-80">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-400">
                    Points clés
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-3 text-white/70"
                      >
                        <span className="mt-1 block h-2 w-2 flex-shrink-0 rounded-full bg-violet-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="service-fade-in px-6 py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Un projet en tête ?
        </h2>
        <p className="mb-8 text-lg text-white/60">
          Chaque entreprise est unique. Discutons de vos besoins pour construire
          la solution adaptée.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
        >
          Demander un devis
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>
    </div>
  );
}

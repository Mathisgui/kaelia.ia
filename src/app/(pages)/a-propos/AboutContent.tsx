"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "Agents IA & LLMs",
  "Automatisation n8n / Make",
  "RAG & bases vectorielles",
  "Prompt Engineering",
  "OpenAI · Anthropic · Mistral",
  "Conseil & transformation",
  "Formation & pédagogie",
  "Stratégie IA d'entreprise",
];

const TIMELINE = [
  {
    year: "2023",
    title: "Le déclic",
    desc: "Je regardais des équipes entières passer leurs journées à copier-coller, à relancer des e-mails, à remplir des tableaux. Des heures de travail intelligent sacrifiées sur l'autel du répétitif. J'ai su que l'IA pouvait changer ça. Alors j'ai commencé à le prouver.",
  },
  {
    year: "2024",
    title: "La preuve par les faits",
    desc: "Un à un, les résultats sont arrivés. Des workflows qui tournaient en 3 heures s'exécutaient en 4 minutes. Des dirigeants qui me disaient : \"mes équipes font enfin le travail qui compte.\" Ce n'était plus une conviction. C'était une certitude.",
  },
  {
    year: "2025",
    title: "Kael'IA",
    desc: "J'ai fondé Kael'IA avec une règle simple : ne jamais livrer un système que je ne montrerais pas à ma propre équipe. Chaque automatisation, chaque agent IA, chaque formation doit avoir un impact réel, mesurable, immédiat. Pas de gadget. Pas de promesse creuse.",
  },
  {
    year: "Maintenant",
    title: "Ce n'est que le début",
    desc: "Des dizaines d'entreprises qui travaillent autrement. Des centaines d'heures rendues à ce qui compte vraiment. Et une conviction qui grandit chaque jour : les organisations qui embrassent l'IA aujourd'hui ne joueront plus dans la même catégorie demain.",
  },
];

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid slow drift
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPositionX: "60px",
          backgroundPositionY: "60px",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Name char-by-char reveal
      if (nameRef.current) {
        const text = nameRef.current.textContent ?? "";
        nameRef.current.innerHTML = text
          .split("")
          .map((c) =>
            c === " "
              ? "&nbsp;"
              : `<span class="inline-block opacity-0 translate-y-6">${c}</span>`
          )
          .join("");
        gsap.to(nameRef.current.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Photo reveal
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { opacity: 0, scale: 0.85, x: 40 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
        );
        gsap.to(photoRef.current, {
          y: -10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
        });
      }

      // Hero sub-elements
      gsap.fromTo(".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2 }
      );

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Cards stagger
      gsap.utils.toArray<HTMLElement>(".about-card").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Timeline line draw
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1, duration: 2, ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: 1.2,
            },
          }
        );
      }

      // Timeline items
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      // Skill chips
      gsap.fromTo(".skill-chip",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".skills-grid", start: "top 85%", once: true },
        }
      );

      // Quote reveal
      gsap.fromTo(".quote-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".quote-text", start: "top 85%", once: true },
        }
      );

      // Section labels (tech tags)
      gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      // Scan line
      gsap.to(".scan-line", {
        y: "100vh", duration: 3.5, repeat: -1, ease: "none", opacity: 0.05,
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Scan line */}
      <div className="scan-line pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center px-6 py-32 overflow-hidden">
        {/* Animated grid */}
        <div
          ref={gridRef}
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Corner brackets */}
        <div className="pointer-events-none absolute top-24 left-8 h-10 w-10 border-t-2 border-l-2 border-[#7c3aed]/40" />
        <div className="pointer-events-none absolute top-24 right-8 h-10 w-10 border-t-2 border-r-2 border-[#7c3aed]/40" />
        <div className="pointer-events-none absolute bottom-12 left-8 h-10 w-10 border-b-2 border-l-2 border-[#7c3aed]/30" />
        <div className="pointer-events-none absolute bottom-12 right-8 h-10 w-10 border-b-2 border-r-2 border-[#7c3aed]/30" />

        {/* Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/8 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <p className="hero-fade opacity-0 mb-5 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
                Fondateur &amp; CEO — Kael&apos;IA
              </p>

              <h1
                ref={nameRef}
                className="mb-6 text-5xl font-bold leading-none tracking-tight text-white md:text-7xl"
              >
                Mathis Guillemois
              </h1>

              <div className="hero-fade opacity-0 mb-8 h-px w-40 bg-gradient-to-r from-[#7c3aed] to-transparent" />

              <p className="hero-fade opacity-0 max-w-lg text-lg leading-relaxed text-white/60">
                J&apos;ai toujours cru qu&apos;un travail bien fait, c&apos;est un travail qui a de la valeur.
                Pas du remplissage. Pas de la friction. J&apos;ai fondé Kael&apos;IA pour que l&apos;IA
                fasse le reste, et que vos équipes se concentrent sur ce que les machines ne feront jamais.
              </p>

              <div className="hero-fade opacity-0 mt-8 flex flex-wrap gap-3 font-mono text-xs text-white/30 uppercase tracking-widest">
                <span className="rounded-full border border-white/10 px-3 py-1">Automatisation</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Systèmes IA</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Formation</span>
                <span className="rounded-full border border-[#7c3aed]/30 px-3 py-1 text-[#7c3aed]">Kael&apos;IA 2025</span>
              </div>
            </div>

            {/* Right — photo futuristic */}
            <div className="flex justify-center lg:justify-end">
              <div ref={photoRef} className="relative opacity-0">
                {/* Outer spinning rings */}
                <div
                  className="absolute inset-0 rounded-full border border-[#7c3aed]/20"
                  style={{ animation: "spin 20s linear infinite", margin: "-20px" }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-[#a78bfa]/10"
                  style={{ animation: "spin 14s linear infinite reverse", margin: "-36px" }}
                />

                {/* Orbit dots */}
                {[0, 90, 180, 270].map((deg) => (
                  <div
                    key={deg}
                    className="absolute h-2 w-2 rounded-full bg-[#7c3aed]"
                    style={{
                      top: "50%",
                      left: "50%",
                      marginLeft: "-4px",
                      marginTop: "-4px",
                      transform: `rotate(${deg}deg) translateX(160px)`,
                      boxShadow: "0 0 8px rgba(124,58,237,0.9)",
                    }}
                  />
                ))}

                {/* Photo container */}
                <div className="relative h-72 w-72 md:h-80 md:w-80 overflow-hidden rounded-full"
                  style={{
                    boxShadow: "0 0 0 2px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)",
                  }}
                >
                  <Image
                    src="/mathis.jpg"
                    alt="Mathis Guillemois"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 15%" }}
                    priority
                  />
                  {/* Gloss overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 via-transparent to-transparent" />
                </div>

                {/* Corner tag */}
                <div className="absolute -bottom-4 -right-4 rounded-xl border border-[#7c3aed]/30 bg-[#0d0d1a]/90 px-4 py-2 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-widest text-[#7c3aed] uppercase">Fondateur Kael&apos;IA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISION ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-5xl px-6 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-[#7c3aed]/20 bg-[#0b0b16] p-10 md:p-14">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/5 blur-2xl rounded-full" />
          <div className="absolute top-4 right-4 h-7 w-7 border-t border-r border-[#7c3aed]/30" />

          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">Vision</p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Notre vision</h2>
          <p className="text-lg leading-relaxed text-white/60">
            L&apos;IA n&apos;est pas une menace, c&apos;est un levier.
            L&apos;objectif : rendre l&apos;intelligence artificielle accessible,
            pratique et profitable pour chaque entreprise, quelle que soit sa
            taille ou son secteur. La technologie doit servir l&apos;humain, pas
            le remplacer.
          </p>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="about-reveal opacity-0 mb-16 text-center">
          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">Parcours</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">De la passion à l&apos;impact</h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px w-px">
            <div
              ref={lineRef}
              className="h-full w-full bg-gradient-to-b from-[#7c3aed] via-[#7c3aed]/60 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-14">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="timeline-item relative flex items-center opacity-0">
                  {/* Dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-10 h-3 w-3 rounded-full bg-[#0a0a12] border-2 border-[#7c3aed]"
                    style={{ boxShadow: "0 0 12px rgba(124,58,237,0.7)" }}
                  />

                  {/* Year badge */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -top-6 font-mono text-[11px] font-bold tracking-widest"
                    style={{ color: "#7c3aed" }}
                  >
                    {item.year}
                  </div>

                  <div className={`w-1/2 ${isLeft ? "pr-10 text-right" : "pl-10 ml-auto"}`}>
                    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d1a] p-6 transition-all duration-300 hover:border-[#7c3aed]/30">
                      <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">Expertise</p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">Stack &amp; savoir-faire</h2>
        </div>

        <div className="skills-grid flex flex-wrap justify-center gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill}
              className="skill-chip opacity-0 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 px-5 py-2.5 font-mono text-sm text-[#c084fc] transition-all duration-200 hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/10"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="relative py-32 px-6">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/15 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="quote-text opacity-0">
            <div className="mb-6 mx-auto h-px w-12 bg-gradient-to-r from-transparent via-[#7c3aed]/60 to-transparent" />
            <p className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
              &ldquo;L&apos;IA apporte la puissance d&apos;exécution.
              <br />
              <span className="text-[#a78bfa]">L&apos;humain apporte la clarté du cap.&rdquo;</span>
            </p>
            <p className="mt-6 font-mono text-sm tracking-widest text-[#7c3aed]">
              Mathis Guillemois
            </p>
          </div>
        </div>
      </section>

      {/* ─── PARTNERSHIP ─── */}
      <section className="relative mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="about-card opacity-0 rounded-2xl border border-white/[0.07] bg-[#0d0d1a] p-8">
            <div className="section-label opacity-0 mb-4 font-mono text-xs tracking-widest text-[#7c3aed] uppercase">Partenariat</div>
            <h3 className="mb-3 text-xl font-bold text-white">Kaelia — Savoir faire, savoir transmettre</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Déployer un système IA sans former les équipes qui l&apos;utilisent,
              c&apos;est construire sur du sable. Le partenariat avec Kaelia, organisme certifié Qualiopi,
              garantit que la technologie s&apos;installe dans les habitudes — pas seulement dans les serveurs.
            </p>
          </div>
          <div className="about-card opacity-0 rounded-2xl border border-[#7c3aed]/20 bg-[#0d0d1a] p-8">
            <div className="section-label opacity-0 mb-4 font-mono text-xs tracking-widest text-[#7c3aed] uppercase">Approche</div>
            <h3 className="mb-3 text-xl font-bold text-white">La règle des 48 heures</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              Chaque mission commence par une question : quelle tâche répétitive fait perdre
              le plus de temps à vos équipes cette semaine ? En 48 heures, on a un prototype qui tourne.
              En 30 jours, un système en production. Pas de roadmap à 18 mois. Des résultats maintenant.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-reveal opacity-0 px-6 py-28 text-center">
        <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">Contact</p>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          Votre prochaine heure gagnée<br />commence ici.
        </h2>
        <p className="mb-10 text-lg text-white/50">
          30 minutes. Pas de pitch. On regarde ensemble où l&apos;IA peut avoir un impact
          réel dans votre organisation — et on sort avec un plan concret.
        </p>
        <Link
          href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0elwGhJ_Xy3KFyk17moeheL-G9N4jsDSeZf0mLVqNvsF3QGGyCE3UOtbPzWDkJ_6gHO8ZAJlE0"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-medium text-white transition-all duration-300 hover:border-[#7c3aed] hover:bg-[#7c3aed]/10 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >
          Réserver un créneau
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </div>
  );
}

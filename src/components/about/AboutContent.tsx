"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import type { AboutPageContent } from "@/content/types";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent({
  content,
  calendarUrl,
}: {
  content: AboutPageContent;
  calendarUrl: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPositionX: "60px",
          backgroundPositionY: "60px",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      if (brandRef.current) {
        const text = brandRef.current.textContent ?? "";
        brandRef.current.innerHTML = text
          .split("")
          .map((c) =>
            c === " "
              ? "&nbsp;"
              : `<span class="inline-block opacity-0 translate-y-8">${c}</span>`
          )
          .join("");
        gsap.to(brandRef.current.querySelectorAll("span"), {
          opacity: 1,
          y: 0,
          duration: 0.08,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.85, x: 40 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.4,
          }
        );
        gsap.to(photoRef.current, {
          y: -10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.5,
        });
      }

      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 70%",
              end: "bottom 50%",
              scrub: 1.2,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });

      gsap.fromTo(
        ".skill-chip",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".quote-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".quote-text",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.to(".scan-line", {
        y: "100vh",
        duration: 3.5,
        repeat: -1,
        ease: "none",
        opacity: 0.05,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div className="scan-line pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

      {/* ─── HERO : KAEL'IA en grand ─── */}
      <section className="relative min-h-screen flex items-center px-6 py-32 overflow-hidden">
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

        <div className="pointer-events-none absolute top-24 left-8 h-10 w-10 border-t-2 border-l-2 border-[#7c3aed]/40" />
        <div className="pointer-events-none absolute top-24 right-8 h-10 w-10 border-t-2 border-r-2 border-[#7c3aed]/40" />
        <div className="pointer-events-none absolute bottom-12 left-8 h-10 w-10 border-b-2 border-l-2 border-[#7c3aed]/30" />
        <div className="pointer-events-none absolute bottom-12 right-8 h-10 w-10 border-b-2 border-r-2 border-[#7c3aed]/30" />

        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl w-full text-center">
          <p className="hero-fade opacity-0 mb-6 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
            {content.hero.eyebrow}
          </p>

          <h1
            ref={brandRef}
            className="mb-8 text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl md:text-[8rem] lg:text-[10rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            {content.hero.brand}
          </h1>

          <div className="hero-fade opacity-0 mx-auto mb-10 h-px w-40 bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

          <p className="hero-fade opacity-0 mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
            {content.hero.manifesto}
          </p>

          <p className="hero-fade opacity-0 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 italic">
            {content.hero.vision}
          </p>

          <div className="hero-fade opacity-0 mt-10 flex flex-wrap justify-center gap-3 font-mono text-xs text-white/60 uppercase tracking-widest">
            {content.hero.chips.map((chip, i) => (
              <span
                key={chip}
                className={
                  i === content.hero.chips.length - 1
                    ? "rounded-full border border-[#7c3aed]/40 px-3 py-1 text-[#c084fc]"
                    : "rounded-full border border-white/15 px-3 py-1"
                }
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MATHIS : storytelling + photo ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Photo — colonne droite, sur fond blanc pour harmoniser */}
          <div className="lg:col-span-2 flex justify-center lg:justify-start lg:order-2">
            <div ref={photoRef} className="relative opacity-0">
              <div
                className="absolute inset-0 rounded-full border border-[#7c3aed]/20"
                style={{ animation: "spin 20s linear infinite", margin: "-20px" }}
              />
              <div
                className="absolute inset-0 rounded-full border border-[#a78bfa]/10"
                style={{ animation: "spin 14s linear infinite reverse", margin: "-36px" }}
              />

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

              <div
                className="relative h-72 w-72 md:h-80 md:w-80 overflow-hidden rounded-full"
                style={{
                  boxShadow:
                    "0 0 0 2px rgba(124,58,237,0.4), 0 0 60px rgba(124,58,237,0.2)",
                }}
              >
                <Image
                  src="/mathis.jpg"
                  alt={content.profile.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 15%" }}
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -right-4 rounded-xl border border-[#7c3aed]/30 bg-[#0d0d1a]/90 px-4 py-2 backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-widest text-[#7c3aed] uppercase">
                  {content.profile.label}
                </p>
              </div>
            </div>
          </div>

          {/* Texte storytelling — colonne gauche */}
          <div className="lg:col-span-3 lg:order-1">
            <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
              {content.profile.label}
            </p>
            <h2 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {content.profile.name}
            </h2>

            <div className="mb-8 h-px w-32 bg-gradient-to-r from-[#7c3aed] to-transparent" />

            <div className="space-y-5 text-base leading-relaxed text-white/85 md:text-lg">
              {content.profile.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === content.profile.paragraphs.length - 1
                      ? "text-[#c084fc] font-medium"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE / ROADMAP ─── */}
      <section className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="about-reveal opacity-0 mb-16 text-center">
          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">
            Roadmap
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {content.timeline.title}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px w-px">
            <div
              ref={lineRef}
              className="h-full w-full bg-gradient-to-b from-[#7c3aed] via-[#7c3aed]/60 to-transparent"
            />
          </div>

          <div className="flex flex-col gap-14">
            {content.timeline.items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="timeline-item relative flex items-center opacity-0"
                >
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-10 h-3 w-3 rounded-full bg-[#0a0a12] border-2 border-[#7c3aed]"
                    style={{ boxShadow: "0 0 12px rgba(124,58,237,0.7)" }}
                  />

                  <div
                    className="absolute left-1/2 -translate-x-1/2 -top-6 font-mono text-[11px] font-bold tracking-widest text-[#c084fc]"
                  >
                    {item.year}
                  </div>

                  <div
                    className={`w-1/2 ${isLeft ? "pr-10 text-right" : "pl-10 ml-auto"}`}
                  >
                    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d1a] p-6 transition-all duration-300 hover:border-[#7c3aed]/30">
                      <h3 className="mb-2 font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-white/85">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── EXPERTISES ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">
            Stack
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {content.skills.title}
          </h2>
        </div>

        <div className="skills-grid flex flex-wrap justify-center gap-3">
          {content.skills.items.map((skill) => (
            <div
              key={skill}
              className="skill-chip opacity-0 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/5 px-5 py-2.5 font-mono text-sm text-[#c084fc] transition-all duration-200 hover:border-[#7c3aed]/60 hover:bg-[#7c3aed]/10"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* ─── AUTRES ASSOCIÉS ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 text-center">
          <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">
            Les associés
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {content.team.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70 italic">
            {content.team.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {content.team.members.map((member) => (
            <div
              key={member.name}
              className="about-card opacity-0 group relative overflow-hidden rounded-2xl border border-[#7c3aed]/20 bg-[#0d0d1a] transition-all duration-300 hover:border-[#7c3aed]/40"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="mt-1 font-mono text-xs tracking-wider text-[#c084fc] uppercase">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="relative py-24 px-6">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/15 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="quote-text opacity-0">
            <div className="mb-6 mx-auto h-px w-12 bg-gradient-to-r from-transparent via-[#7c3aed]/60 to-transparent" />
            <p className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
              &ldquo;{content.quote.text}&rdquo;
            </p>
            <p className="mt-6 font-mono text-sm tracking-widest text-[#7c3aed]">
              {content.quote.author}
            </p>
          </div>
        </div>
      </section>

      {/* ─── VISION + PARTENARIAT KAELIA ─── */}
      <section className="about-reveal opacity-0 relative mx-auto max-w-5xl px-6 py-20">
        <div className="relative overflow-hidden rounded-2xl border border-[#7c3aed]/25 bg-[#0b0b16] p-10 md:p-14">
          <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#7c3aed]/10 blur-[80px]" />
          <div className="absolute top-4 right-4 h-7 w-7 border-t border-r border-[#7c3aed]/30" />
          <div className="absolute bottom-4 left-4 h-7 w-7 border-b border-l border-[#7c3aed]/20" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">
                Vision &amp; Partenariat
              </p>
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                {content.partnership.title}
              </h2>
              {content.partnership.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-base leading-relaxed text-white/90 md:text-lg"
                      : "mt-4 text-base leading-relaxed text-white/70 italic"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                <Image
                  src="/logo-kaelia.png"
                  alt="Logo Kaelia"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="about-reveal opacity-0 px-6 py-28 text-center">
        <p className="section-label opacity-0 mb-3 font-mono text-xs tracking-[0.3em] text-[#7c3aed] uppercase">
          Contact
        </p>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {content.cta.title}
        </h2>
        <p className="mb-10 text-lg text-white/85">{content.cta.description}</p>
        <Link
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-medium text-white transition-all duration-300 hover:border-[#7c3aed] hover:bg-[#7c3aed]/10 hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >
          {content.cta.button}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        {content.cta.note && (
          <p className="mt-6 font-mono text-xs tracking-widest text-white/50 uppercase">
            {content.cta.note}
          </p>
        )}
      </section>
    </div>
  );
}

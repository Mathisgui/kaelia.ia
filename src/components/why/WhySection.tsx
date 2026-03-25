"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";

const icons: Record<string, React.ReactNode> = {
  target: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  certificate: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  handshake: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
      <path d="M12 5.36L8.87 8.5a2.13 2.13 0 0 0 0 3 2.13 2.13 0 0 0 3 0l3.13-3.14" />
      <path d="M15.13 8.5a2.13 2.13 0 0 1 0 3 2.13 2.13 0 0 1-3 0" />
    </svg>
  ),
};

/* Layout config per card index for the bento grid */
const cardLayout = [
  /* 0: full-width hero card */
  {
    span: "md:col-span-2",
    inner: "flex flex-col md:flex-row md:items-center gap-6",
    minH: "min-h-[180px]",
    padding: "p-10",
  },
  /* 1: left half */
  {
    span: "md:col-span-1",
    inner: "flex flex-col gap-5",
    minH: "min-h-[220px]",
    padding: "p-8",
  },
  /* 2: right half */
  {
    span: "md:col-span-1",
    inner: "flex flex-col gap-5",
    minH: "min-h-[220px]",
    padding: "p-8",
  },
  /* 3: full-width bottom card */
  {
    span: "md:col-span-2",
    inner: "flex flex-col md:flex-row md:items-center gap-6",
    minH: "min-h-[180px]",
    padding: "p-10",
  },
];

const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardEls = cards.querySelectorAll(".why-card");

    const ctx = gsap.context(() => {
      /* Section header fade in */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      /* Staggered card entrance */
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION.fadeInDuration,
          stagger: ANIMATION.staggerDelay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      /* Subtle glow pulse on the background mesh */
      gsap.to(".why-glow", {
        opacity: 0.5,
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* ── Violet gradient mesh / glow background ── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="why-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.15)_0%,rgba(124,58,237,0.05)_40%,transparent_70%)] blur-3xl" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#7c3aed]/[0.07] blur-[120px]" />
        <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#7c3aed]/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-16 text-center opacity-0">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            Pourquoi nous
          </p>
          <h2 className="font-serif mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.why.sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/50">
            {content.why.sectionDescription}
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {content.why.items.map((item, i) => {
            const layout = cardLayout[i];

            return (
              <div
                key={i}
                className={`why-card ${layout.span}`}
              >
                {/* Gradient border wrapper */}
                <div className="rounded-2xl bg-gradient-to-br from-[#7c3aed]/30 to-transparent p-[1px]">
                  <div
                    className={`
                      group relative rounded-2xl bg-[#0a0a12]/90 backdrop-blur-sm
                      ${layout.padding} ${layout.minH}
                      transition-all duration-500
                      hover:bg-[#0a0a12]/80
                      hover:shadow-[0_0_40px_rgba(124,58,237,0.25)]
                    `}
                  >
                    {/* Hover glow overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c3aed]/0 to-[#7c3aed]/0 transition-all duration-500 group-hover:from-[#7c3aed]/[0.04] group-hover:to-transparent" />

                    <div className={`relative ${layout.inner}`}>
                      {/* Icon */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10 ring-1 ring-[#7c3aed]/20 transition-all duration-500 group-hover:bg-[#7c3aed]/15 group-hover:ring-[#7c3aed]/40 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                        {icons[item.icon]}
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <h3 className="mb-2 font-serif text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#a78bfa]">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/55 transition-colors duration-300 group-hover:text-white/70">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySection;

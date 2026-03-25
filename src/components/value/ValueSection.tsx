"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";

const icons: Record<string, React.ReactNode> = {
  clock: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  rocket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

const ValueSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* Left title — slow zoom in from left */
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, x: -80, scale: 0.85 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      /* Right items — slow rise, big stagger for smooth scroll effect */
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            delay: 0.6 + i * 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] overflow-hidden py-40 md:py-56"
    >
      {/* Subtle violet glow — same style as other sections */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-[500px] w-[400px] rounded-full bg-[#7c3aed]/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-0">
          {/* Left column — particles visible behind, title zooms in */}
          <div
            ref={titleRef}
            className="flex flex-col justify-center opacity-0 md:w-5/12 md:pr-12"
          >
            <p className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              L&apos;IA n&apos;attend pas
              <br />
              <span className="text-[#a78bfa]">Vous non plus</span>
            </p>
          </div>

          {/* Right column — 3 items rise up one by one */}
          <div className="flex flex-col gap-10 md:w-7/12 md:gap-12 md:pl-12">
            {content.value.items.map((item, i) => (
              <div
                key={i}
                ref={(el) => { itemsRef.current[i] = el; }}
                className="group flex items-start gap-5 opacity-0"
              >
                {/* Icon with soft glow */}
                <div className="relative mt-1.5 shrink-0">
                  <div className="absolute -inset-3 rounded-full bg-[#7c3aed]/10 blur-lg transition-all duration-500 group-hover:bg-[#7c3aed]/25 group-hover:blur-xl" />
                  <div className="relative transition-colors duration-300 group-hover:text-[#c4b5fd]">
                    {icons[item.icon]}
                  </div>
                </div>

                {/* Text — no card, no container */}
                <div>
                  <h3 className="font-serif mb-2 text-xl font-semibold text-white md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="max-w-lg text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/65 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

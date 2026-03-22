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

const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardEls = cards.querySelectorAll(".why-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
            {content.why.sectionTitle}
          </p>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/60">
            {content.why.sectionDescription}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {content.why.items.map((item, i) => (
            <div
              key={i}
              className="why-card group rounded-2xl border border-white/10 border-l-[#7c3aed]/50 border-l-2 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:border-l-[#7c3aed] hover:bg-white/[0.07]"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/10">
                  {icons[item.icon]}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;

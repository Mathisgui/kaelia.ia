"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  brain: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16l4.24-3.76A6 6 0 0 0 12 2z" />
      <path d="M12 16v6" />
      <path d="M9 8a3 3 0 0 1 6 0" />
      <path d="M8 12h8" />
    </svg>
  ),
  workflow: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="6" height="6" rx="1" />
      <rect x="16" y="4" width="6" height="6" rx="1" />
      <rect x="9" y="14" width="6" height="6" rx="1" />
      <path d="M8 7h8" />
      <path d="M5 10v4l7 0" />
      <path d="M19 10v4l-7 0" />
    </svg>
  ),
  strategy: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" />
      <path d="M5 20V8l5-5 5 5v12" />
      <path d="M9 20v-4h2v4" />
      <path d="M17 20V12l3-3v11" />
    </svg>
  ),
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate each card from alternating sides
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          { opacity: 0, x: fromLeft ? -80 : 80 },
          {
            opacity: 1,
            x: 0,
            duration: ANIMATION.fadeInDuration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Animate counters
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        const target = content.services.items[i].counter;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: ANIMATION.counterDuration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (counter) {
              counter.textContent = Math.round(obj.val).toString();
            }
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-40 md:py-56 min-h-[70vh]"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.services.sectionTitle}
        </p>
        <p className="mx-auto mb-20 max-w-2xl text-center text-white/60 leading-relaxed">
          {content.services.sectionDescription}
        </p>

        {/* Service cards */}
        <div className="flex flex-col gap-20">
          {content.services.items.map((item, i) => {
            const isEven = i % 2 === 1;

            return (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`group relative flex flex-col gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-xl transition-all duration-500 hover:border-[#7c3aed]/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Icon area */}
                <div className="flex shrink-0 items-center justify-center md:w-1/3">
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/5">
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-[#7c3aed]/10 blur-2xl transition-all duration-500 group-hover:bg-[#7c3aed]/20" />
                    <div className="relative">
                      {iconMap[item.icon] ?? null}
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="flex flex-1 flex-col justify-center">
                  {/* Counter + Title row */}
                  <div className="mb-4 flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-[#7c3aed]">
                      <span
                        ref={(el) => {
                          countersRef.current[i] = el;
                        }}
                      >
                        0
                      </span>
                      {item.suffix}
                    </span>
                    <h3 className="text-2xl font-bold text-white md:text-3xl">
                      {item.title}
                    </h3>
                  </div>

                  {/* Long description */}
                  <p className="mb-6 text-white/60 leading-relaxed">
                    {item.longDescription}
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-3">
                    {item.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg
                          className="mt-1 h-5 w-5 shrink-0 text-[#7c3aed]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-white/70">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

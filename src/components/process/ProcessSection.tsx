"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate the vertical timeline line (desktop only)
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.8,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      // Animate each step sequentially
      stepsRef.current.forEach((step, i) => {
        if (!step) return;

        gsap.fromTo(
          step,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: ANIMATION.fadeInDuration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // Animate dots
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
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
      id="methode"
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.process.sectionTitle}
        </p>
        <p className="mx-auto mb-20 max-w-2xl text-center text-white/60 leading-relaxed">
          {content.process.sectionDescription}
        </p>

        {/* Desktop: vertical timeline */}
        <div className="relative hidden md:block">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px">
            <div
              ref={lineRef}
              className="h-full w-full bg-gradient-to-b from-[#7c3aed] via-[#7c3aed]/60 to-[#7c3aed]/20"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {content.process.steps.map((step, i) => (
              <div key={i} className="relative flex items-start gap-16 pl-8">
                {/* Dot on timeline */}
                <div
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                  className="absolute left-8 top-3 z-10 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-[#7c3aed] bg-[#0a0a12] shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                />

                {/* Step content */}
                <div
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="ml-12 flex-1"
                >
                  <span className="mb-2 block text-6xl font-bold text-[#7c3aed]/20">
                    {step.number}
                  </span>
                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mb-2 text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-white/50 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: simple stacked layout */}
        <div className="flex flex-col gap-12 md:hidden">
          {content.process.steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  stepsRef.current[i] = el;
                }
              }}
              className="relative"
            >
              <span className="mb-2 block text-5xl font-bold text-[#7c3aed]/20">
                {step.number}
              </span>
              <h3 className="mb-3 text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="mb-2 text-white/70 leading-relaxed">
                {step.description}
              </p>
              <p className="text-white/50 leading-relaxed">
                {step.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

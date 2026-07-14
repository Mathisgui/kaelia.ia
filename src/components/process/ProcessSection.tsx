"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-register";
import { ANIMATION } from "@/lib/constants";
import type { HomeContent } from "@/content/types";

interface ProcessSectionProps {
  content: HomeContent["method"];
  methodHref: string;
}

type Step = HomeContent["method"]["steps"][number];

const StepContent: React.FC<{ step: Step; compact?: boolean }> = ({ step, compact }) => (
  <>
    <span
      className={`mb-2 block font-bold ${compact ? "text-5xl" : "text-6xl"}`}
      style={{ color: "#a78bfa" }}
    >
      {step.number}
    </span>
    <h3 className={`font-serif mb-3 font-bold text-white ${compact ? "text-xl" : "text-2xl"}`}>
      {step.title}
    </h3>
    <p className="mb-3 text-white leading-relaxed font-medium">{step.description}</p>
    <p className="text-white/55 leading-relaxed text-sm italic">{step.details}</p>
  </>
);

const ProcessSection: React.FC<ProcessSectionProps> = ({ content, methodHref }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      headerRef.current?.classList.remove("opacity-0");
      return;
    }

    const ctx = gsap.context(() => {
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

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const fromLeft = i % 2 === 0;

        gsap.fromTo(
          step,
          { opacity: 0, x: fromLeft ? -50 : 50, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
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

      dotsRef.current.forEach((dot) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 80%", once: true },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="methode" ref={sectionRef} className="relative py-40 md:py-56">
      {/* Violet gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/4 h-[500px] w-[400px] rounded-full bg-[#7c3aed]/8 blur-[100px]" />
        <div className="absolute left-0 bottom-1/4 h-[400px] w-[300px] rounded-full bg-[#5b21b6]/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="opacity-0">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            {content.eyebrow}
          </p>
          <h2 className="font-serif mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mb-20 max-w-2xl text-center text-white leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="relative hidden md:block">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-px w-[2px]">
            <div
              ref={lineRef}
              className="h-full w-full bg-gradient-to-b from-[#7c3aed] via-[#a78bfa] to-[#7c3aed]/20"
              style={{ transformOrigin: "top center" }}
            />
          </div>

          <div className="flex flex-col gap-24">
            {content.steps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="relative flex items-start">
                  {/* Dot on center line */}
                  <div
                    ref={(el) => { dotsRef.current[i] = el; }}
                    className="absolute left-1/2 top-6 z-10 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-[#7c3aed] bg-[#0a0a12] shadow-[0_0_20px_rgba(124,58,237,0.6)]"
                  />

                  <div className={`w-1/2 ${isLeft ? "pr-16 text-right" : ""}`}>
                    {isLeft && (
                      <div ref={(el) => { stepsRef.current[i] = el; }}>
                        <StepContent step={step} />
                      </div>
                    )}
                  </div>

                  <div className={`w-1/2 ${!isLeft ? "pl-16" : ""}`}>
                    {!isLeft && (
                      <div ref={(el) => { stepsRef.current[i] = el; }}>
                        <StepContent step={step} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="flex flex-col gap-12 md:hidden">
          {content.steps.map((step, i) => (
            <div
              key={i}
              className="relative pl-8 border-l-2 border-[#7c3aed]/30"
            >
              <div className="absolute left-0 top-2 -translate-x-[5px] h-3 w-3 rounded-full bg-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.5)]" />
              <StepContent step={step} compact />
            </div>
          ))}
        </div>

        {/* Link to full method page */}
        <div className="mt-16 text-center">
          <Link
            href={methodHref}
            className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/[0.08] px-6 py-2.5 text-sm text-white/85 transition-colors duration-300 hover:bg-[#7c3aed]/[0.15] hover:text-white"
          >
            {content.pageLink}
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

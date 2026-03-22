"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: ANIMATION.fadeInDuration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
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
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={innerRef}
          className="relative overflow-hidden rounded-3xl border border-[#7c3aed]/20 bg-white/[0.03] px-8 py-16 text-center backdrop-blur-sm md:px-16 md:py-20"
        >
          {/* Subtle purple glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_60px_rgba(124,58,237,0.06)]" />
          <div className="pointer-events-none absolute -left-1/4 -top-1/2 h-96 w-96 rounded-full bg-[#7c3aed]/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-96 w-96 rounded-full bg-[#7c3aed]/5 blur-3xl" />

          <div className="relative z-10">
            <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {content.cta.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              {content.cta.description}
            </p>
            <MagneticButton href="#contact">
              {content.cta.button}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

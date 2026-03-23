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
        { opacity: 0, scale: 0.93, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: ANIMATION.fadeInDuration + 0.2,
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
    <section ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={innerRef}
          className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16 md:py-24"
        >
          {/* Gradient background instead of flat card */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/15 via-[#5b21b6]/8 to-[#0a0a12]" />
          <div className="absolute inset-px rounded-[calc(2rem-1px)] bg-[#0c0c18]" />

          {/* Bright glow orbs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#7c3aed]/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#5b21b6]/12 blur-[80px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#7c3aed]/50 to-transparent" />

          <div className="relative z-10">
            <h2 className="font-serif mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              {content.cta.title}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
              {content.cta.description}
            </p>
            <MagneticButton href={content.contact.calendarUrl}>
              {content.cta.button}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";

const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tools = toolsRef.current;
    const banner = bannerRef.current;
    if (!section || !tools) return;

    const ctx = gsap.context(() => {
      const toolCards = tools.querySelectorAll(".tool-card");

      // Pop-in effect: scale from 0.8 to 1
      gsap.fromTo(
        toolCards,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: ANIMATION.fadeInDuration,
          stagger: ANIMATION.staggerDelay,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: tools,
            start: "top 80%",
            once: true,
          },
        }
      );

      if (banner) {
        gsap.fromTo(
          banner,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION.fadeInDuration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: banner,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="technologie"
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.technology.sectionTitle}
        </p>
        <p className="mx-auto mb-16 max-w-2xl text-center text-white/60 leading-relaxed">
          {content.technology.description}
        </p>

        {/* 3x2 tool grid */}
        <div
          ref={toolsRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {content.technology.tools.map((tool, i) => (
            <div
              key={i}
              className="tool-card group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#7c3aed]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
            >
              <span className="mb-2 text-lg font-bold text-white">
                {tool.name}
              </span>
              <span className="text-center text-sm text-white/60 leading-relaxed">
                {tool.description}
              </span>
            </div>
          ))}
        </div>

        {/* Kaelia banner */}
        <div
          ref={bannerRef}
          className="mt-16 rounded-2xl border border-white/10 border-l-4 border-l-[#7c3aed] bg-white/[0.03] px-10 py-10 backdrop-blur-xl"
        >
          <h4 className="mb-3 text-xl font-bold text-white">
            {content.technology.kaelia.title}
          </h4>
          <p className="text-white/60 leading-relaxed">
            {content.technology.kaelia.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

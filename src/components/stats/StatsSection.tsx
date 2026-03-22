"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";
import CircularProgress from "./CircularProgress";

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Staggered reveal of the 3 circular progress items
      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: ANIMATION.fadeInDuration,
            delay: i * ANIMATION.staggerDelay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      id="resultats"
      ref={sectionRef}
      className="relative min-h-[70vh] py-40 md:py-56"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section title */}
        <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.stats.sectionTitle}
        </p>

        {/* Section description */}
        <p className="mx-auto mb-20 max-w-2xl text-center text-white/60">
          {content.stats.sectionDescription}
        </p>

        {/* Grid of circular progress items */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {content.stats.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="opacity-0"
            >
              <CircularProgress
                percentage={item.percentage}
                value={item.value}
                suffix={item.suffix}
                label={item.label}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

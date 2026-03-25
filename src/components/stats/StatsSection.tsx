"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";
import CircularProgress from "./CircularProgress";

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

      itemsRef.current.forEach((el, i) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
    >
      {/* Brighter violet glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-[#7c3aed]/15 blur-[100px]" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-[#5b21b6]/10 blur-[80px]" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-[#7c3aed]/8 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="opacity-0">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            Résultats
          </p>
          <h2 className="font-serif mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.stats.sectionTitle}
          </h2>
          <p className="mx-auto mb-20 max-w-2xl text-center text-white/50">
            {content.stats.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {content.stats.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
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

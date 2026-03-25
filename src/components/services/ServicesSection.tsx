"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";

/* Large abstract illustrations for each service */
const illustrations: Record<string, React.ReactNode> = {
  workflow: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="grad-wf" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity="0.6" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Connected nodes — automation flow */}
      <circle cx="25" cy="30" r="12" stroke="url(#grad-wf)" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.08" />
      <circle cx="95" cy="30" r="12" stroke="url(#grad-wf)" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.08" />
      <circle cx="60" cy="60" r="16" stroke="#7c3aed" strokeWidth="2" fill="#7c3aed" fillOpacity="0.12" />
      <circle cx="30" cy="95" r="10" stroke="url(#grad-wf)" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.06" />
      <circle cx="90" cy="95" r="10" stroke="url(#grad-wf)" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.06" />
      {/* Flow lines */}
      <path d="M37 30h46M25 42l35 18M95 42L60 60M60 76l-30 19M60 76l30 19" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 3" />
      {/* Pulse dots */}
      <circle cx="60" cy="60" r="4" fill="#a78bfa" fillOpacity="0.6" />
      <circle cx="25" cy="30" r="3" fill="#a78bfa" fillOpacity="0.4" />
      <circle cx="95" cy="30" r="3" fill="#a78bfa" fillOpacity="0.4" />
    </svg>
  ),
  brain: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="grad-br" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Abstract brain — two hemispheres */}
      <path d="M60 20C40 20 28 35 28 52c0 12 6 22 15 28l17 15 17-15c9-6 15-16 15-28C92 35 80 20 60 20z" stroke="url(#grad-br)" strokeWidth="1.5" fill="#7c3aed" fillOpacity="0.06" />
      <path d="M60 25c-15 0-25 12-25 27s10 25 25 35c15-10 25-20 25-35s-10-27-25-27z" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      {/* Neural connections */}
      <circle cx="48" cy="45" r="4" fill="#a78bfa" fillOpacity="0.5" />
      <circle cx="72" cy="45" r="4" fill="#a78bfa" fillOpacity="0.5" />
      <circle cx="60" cy="58" r="5" fill="#7c3aed" fillOpacity="0.4" />
      <circle cx="42" cy="62" r="3" fill="#a78bfa" fillOpacity="0.3" />
      <circle cx="78" cy="62" r="3" fill="#a78bfa" fillOpacity="0.3" />
      <line x1="48" y1="45" x2="60" y2="58" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="72" y1="45" x2="60" y2="58" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="42" y1="62" x2="60" y2="58" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="78" y1="62" x2="60" y2="58" stroke="#a78bfa" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Lightbulb glow */}
      <circle cx="60" cy="58" r="14" fill="#7c3aed" fillOpacity="0.08" />
    </svg>
  ),
  strategy: (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <defs>
        <linearGradient id="grad-st" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Rising chart / roadmap */}
      <path d="M20 95L45 70 65 80 100 35" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M20 95L45 70 65 80 100 35" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 4" />
      {/* Data points */}
      <circle cx="20" cy="95" r="5" fill="#7c3aed" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
      <circle cx="45" cy="70" r="5" fill="#7c3aed" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
      <circle cx="65" cy="80" r="5" fill="#7c3aed" fillOpacity="0.3" stroke="#a78bfa" strokeWidth="1" />
      <circle cx="100" cy="35" r="7" fill="#7c3aed" fillOpacity="0.4" stroke="#a78bfa" strokeWidth="1.5" />
      {/* Target at top */}
      <circle cx="100" cy="35" r="14" stroke="#7c3aed" strokeWidth="1" strokeOpacity="0.2" fill="none" />
      <circle cx="100" cy="35" r="20" stroke="#7c3aed" strokeWidth="0.5" strokeOpacity="0.1" fill="none" />
      {/* Arrow tip */}
      <path d="M93 42l7-7 7 0" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: ANIMATION.fadeInDuration + 0.1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

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
            if (counter) counter.textContent = Math.round(obj.val).toString();
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
      {/* Bright violet ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={headerRef} className="opacity-0">
          <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            Nos expertises
          </p>
          <h2 className="font-serif mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.services.sectionTitle}
          </h2>
          <p className="mx-auto mb-20 max-w-2xl text-center text-white/50 leading-relaxed">
            {content.services.sectionDescription}
          </p>
        </div>

        {/* 2 + 1 grid layout with liquid-glass cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {content.services.items.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`group relative ${i === 2 ? "md:col-span-2 md:max-w-3xl md:mx-auto w-full" : ""}`}
            >
              {/* Liquid-glass card — ultra transparent */}
              <div className="relative rounded-2xl overflow-hidden h-full border border-white/[0.03] backdrop-blur-sm bg-white/[0.008] transition-all duration-500 hover:bg-white/[0.02] hover:border-white/[0.06] hover:shadow-[0_8px_40px_rgba(124,58,237,0.06)]">
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:from-[#7c3aed]/[0.03]" />

                <div className="relative flex flex-col gap-6 p-8 md:p-10">
                  {/* Top row: illustration + counter */}
                  <div className="flex items-center gap-6">
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-full bg-[#7c3aed]/8 blur-2xl scale-150 transition-all duration-500 group-hover:bg-[#7c3aed]/15 group-hover:blur-3xl" />
                      <div className="relative scale-75">{illustrations[item.icon] ?? null}</div>
                    </div>
                    <div>
                      <span className="text-3xl font-bold text-[#a78bfa]">
                        <span ref={(el) => { countersRef.current[i] = el; }}>0</span>
                        {item.suffix}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 leading-relaxed">
                    {item.longDescription}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-2.5">
                    {item.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg className="mt-1 h-4 w-4 shrink-0 text-[#a78bfa]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-white/60">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

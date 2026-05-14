"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";

const icons: Record<string, React.ReactNode> = {
  handshake: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  certificate: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

const WhySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }

      // Orb breathe
      if (orbRef.current) {
        gsap.fromTo(orbRef.current, { scale: 0.7, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
        gsap.to(orbRef.current, {
          scale: 1.06, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }

      // Cards entrance
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(el,
          { opacity: 0, x: fromX, y: 20 },
          {
            opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          }
        );
      });

      // Connector lines fade
      gsap.fromTo(".why-connector",
        { opacity: 0, scaleX: 0 },
        {
          opacity: 1, scaleX: 1, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 65%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const items = content.why.items;

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12)_0%,transparent_65%)] blur-3xl" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#7c3aed]/[0.06] blur-[100px]" />
        <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#7c3aed]/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div ref={headerRef} className="mb-20 text-center opacity-0">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            Pourquoi nous
          </p>
          <h2 className="font-serif mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {content.why.sectionTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/90">
            {content.why.sectionDescription}
          </p>
        </div>

        {/* Orb + cards layout — inspired by reference */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0">

          {/* LEFT column */}
          <div className="flex flex-col gap-6">
            {[items[0], items[2]].map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx === 0 ? 0 : 2] = el; }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c18]/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-[#7c3aed]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-[#a78bfa]">
                    {icons[item.icon]}
                  </div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[#c084fc]">
                    {item.title}
                  </h3>
                </div>

                {/* Title underline */}
                <div className="why-connector mb-5 h-px w-full origin-left bg-gradient-to-r from-[#7c3aed]/60 via-[#a78bfa]/30 to-transparent" />

                <p className="text-sm leading-relaxed text-white/90 transition-colors group-hover:text-white/85">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#7c3aed]/0 blur-3xl transition-all duration-700 group-hover:bg-[#7c3aed]/10" />
              </div>
            ))}
          </div>

          {/* CENTER — glowing orb */}
          <div className="hidden md:flex items-center justify-center px-8 lg:px-14">
            <div ref={orbRef} className="relative flex items-center justify-center opacity-0">
              {/* Outer ring */}
              <div className="absolute h-64 w-64 rounded-full border border-[#7c3aed]/15 animate-[spin_20s_linear_infinite]" />
              <div className="absolute h-48 w-48 rounded-full border border-[#7c3aed]/20 animate-[spin_14s_linear_infinite_reverse]" />

              {/* Core glow */}
              <div className="relative h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35)_0%,rgba(91,33,182,0.15)_50%,transparent_75%)] blur-sm" />
              <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.5)_0%,rgba(124,58,237,0.2)_60%,transparent_100%)]"
                style={{ boxShadow: "0 0 60px rgba(124,58,237,0.6), 0 0 120px rgba(124,58,237,0.2)" }}
              />

              {/* Center dot */}
              <div className="absolute h-3 w-3 rounded-full bg-white"
                style={{ boxShadow: "0 0 16px rgba(255,255,255,0.9), 0 0 40px rgba(124,58,237,0.8)" }}
              />

              {/* Floating particles */}
              {[
                { deg: 0, op: 0.8 },
                { deg: 60, op: 0.65 },
                { deg: 120, op: 0.9 },
                { deg: 180, op: 0.7 },
                { deg: 240, op: 0.85 },
                { deg: 300, op: 0.6 },
              ].map(({ deg, op }) => (
                <div
                  key={deg}
                  className="absolute h-1 w-1 rounded-full bg-[#a78bfa]"
                  style={{
                    transform: `rotate(${deg}deg) translateX(70px)`,
                    boxShadow: "0 0 6px rgba(167,139,250,0.8)",
                    opacity: op,
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-6">
            {[items[1], items[3]].map((item, idx) => (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx === 0 ? 1 : 3] = el; }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c18]/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-[#7c3aed]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed]/10 text-[#a78bfa]">
                    {icons[item.icon]}
                  </div>
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-[#c084fc]">
                    {item.title}
                  </h3>
                </div>

                {/* Title underline */}
                <div className="why-connector mb-5 h-px w-full origin-left bg-gradient-to-r from-[#7c3aed]/60 via-[#a78bfa]/30 to-transparent" />

                <p className="text-sm leading-relaxed text-white/90 transition-colors group-hover:text-white/85">
                  {item.description}
                </p>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#7c3aed]/0 blur-3xl transition-all duration-700 group-hover:bg-[#7c3aed]/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;

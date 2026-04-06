"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import MagneticButton from "@/components/ui/MagneticButton";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
    <circle cx="8" cy="8" r="8" fill="#7c3aed" fillOpacity="0.2" />
    <path d="M5 8l2 2 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FormationSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header label + title + description
      gsap.fromTo(".fm-label",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true } }
      );
      gsap.fromTo(".fm-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: section, start: "top 80%", once: true } }
      );
      gsap.fromTo(".fm-desc",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.22,
          scrollTrigger: { trigger: section, start: "top 80%", once: true } }
      );

      // Left col — tagline
      gsap.fromTo(".fm-tagline",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".fm-tagline", start: "top 86%", once: true } }
      );

      // Left col — "Ce que vous allez acquérir" label
      gsap.fromTo(".fm-obj-label",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: ".fm-obj-label", start: "top 88%", once: true } }
      );

      // Left col — each objective item
      gsap.fromTo(".fm-obj-item",
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".fm-obj-list", start: "top 87%", once: true } }
      );

      // Left col — adaptability card
      gsap.fromTo(".fm-adapt",
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".fm-adapt", start: "top 88%", once: true } }
      );

      // Right col — "Pourquoi nos formations" card
      gsap.fromTo(".fm-why-card",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".fm-why-card", start: "top 86%", once: true } }
      );

      // Right col — differentiators paragraph
      gsap.fromTo(".fm-diff-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ".fm-why-card", start: "top 82%", once: true } }
      );

      // Right col — finançable card
      gsap.fromTo(".fm-fin-card",
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".fm-fin-card", start: "top 88%", once: true } }
      );

      // Button reveal
      gsap.fromTo(".fm-btn",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".fm-btn", start: "top 90%", once: true } }
      );

      // Connector line in "Pourquoi nos formations" card
      gsap.fromTo(".fm-connector",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ".fm-why-card", start: "top 83%", once: true } }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const t = content.training;

  return (
    <section
      id="formation"
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      {/* Glow ambiant */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[400px] rounded-full bg-[#5b21b6]/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="fm-label opacity-0 mb-3 text-sm font-medium uppercase tracking-wider text-[#c084fc]">
            Formation
          </p>
          <h2 className="fm-title opacity-0 font-serif mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t.sectionTitle}
          </h2>
          <p className="fm-desc opacity-0 mx-auto max-w-2xl text-white/50 leading-relaxed">
            {t.sectionDescription}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">

          {/* ── Left column ── */}
          <div className="space-y-8">

            <p className="fm-tagline opacity-0 text-[#a78bfa] font-medium text-lg">
              {t.tagline}
            </p>

            <div>
              <p className="fm-obj-label opacity-0 mb-4 text-sm font-medium uppercase tracking-wider text-white/40">
                Ce que vous allez acquérir
              </p>
              <ul className="fm-obj-list space-y-3">
                {t.objectives.map((obj, i) => (
                  <li key={i} className="fm-obj-item opacity-0 flex items-start gap-3 text-white/70">
                    <CheckIcon />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fm-adapt opacity-0 rounded-xl border border-[#7c3aed]/30 bg-[#0e0b1a] px-6 py-5">
              <p className="text-white/70 text-sm leading-relaxed">
                {t.adaptability}
              </p>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-8">

            <div className="fm-why-card opacity-0 rounded-2xl border border-white/20 bg-[#0e0b1a] p-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-white/40">
                Pourquoi nos formations
              </p>
              <div className="fm-connector mb-6 h-px w-full bg-gradient-to-r from-[#7c3aed]/60 via-[#a78bfa]/30 to-transparent" />
              <p className="fm-diff-item opacity-0 text-white/70 leading-relaxed text-sm">
                {t.differentiators}
              </p>
            </div>

            <div className="fm-fin-card opacity-0 rounded-2xl border border-[#7c3aed]/40 bg-[#100d20] p-8">
              <p className="mb-2 text-white font-semibold text-lg">
                Formations finançables
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Éligibles aux dispositifs de financement de la formation professionnelle.
                Notre expertise, sans surcoût pour votre entreprise.
              </p>
              <div className="fm-btn opacity-0">
                <MagneticButton href={content.contact.calendarUrl}>
                  {t.cta}
                </MagneticButton>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FormationSection;

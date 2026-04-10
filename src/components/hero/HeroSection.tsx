"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-register";
import { content } from "@/content/fr";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    const words = content.hero.title.split(" ");
    titleEl.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block opacity-0 translate-y-[30px]" style="transition:none">${word}</span>`
      )
      .join(" ");

    const wordSpans = titleEl.querySelectorAll("span");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.5,
      });

      tl.to(wordSpans, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        [bottomLeftRef.current, bottomRightRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Main content — text left-aligned */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 xl:px-32">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold max-w-3xl leading-[1.05] mb-8 text-white"
        >
          {content.hero.title}
        </h1>

        <div ref={ctaRef} className="opacity-0 flex flex-col items-start gap-3">
          <a
            href={content.contact.calendarUrl}
            className="inline-flex items-center gap-3 px-7 py-3.5 border border-white/30 rounded-full text-sm uppercase tracking-wider text-white hover:bg-white hover:text-[#0a0a12] transition-all duration-300"
          >
            {content.hero.cta}
          </a>

          <a
            href="#formation"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a78bfa]/40 bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 transition-all duration-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#formation")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a78bfa] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a78bfa]" />
            </span>
            <span className="text-xs font-semibold text-[#a78bfa] uppercase tracking-wide">Offre de lancement formation</span>
            <span className="text-xs font-bold text-white">−30%</span>
          </a>
        </div>
      </div>

      {/* Bottom bar — descriptive texts left + right */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 lg:px-24 xl:px-32 pb-12">
        <div className="flex items-end justify-between gap-8 pt-6">
          <div ref={bottomLeftRef} className="opacity-0 max-w-lg">
            <p className="text-base leading-relaxed text-white/70">
              {content.hero.description}
            </p>
          </div>
          <div ref={bottomRightRef} className="opacity-0 max-w-sm text-right hidden md:block">
            <p className="text-base font-medium text-white/70 leading-relaxed">
              {content.hero.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

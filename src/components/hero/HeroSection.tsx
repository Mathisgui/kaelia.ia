"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-register";
import type { HomeContent } from "@/content/types";

interface HeroSectionProps {
  content: HomeContent["hero"];
  calendarUrl: string;
  secondaryHref: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content, calendarUrl, secondaryHref }) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctaRef.current?.classList.remove("opacity-0");
      bottomLeftRef.current?.classList.remove("opacity-0");
      return;
    }

    const words = content.title.split(" ");
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
        stagger: 0.12,
        ease: "power3.out",
      });

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        bottomLeftRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [content.title]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Main content — text left-aligned */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 xl:px-32">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-[1.08] mb-8 text-white"
        >
          {content.title}
        </h1>

        <div ref={ctaRef} className="opacity-0 flex flex-col items-start gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm uppercase tracking-wider bg-white text-[#0a0a12] hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              {content.ctaPrimary}
            </a>
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 rounded-full text-sm uppercase tracking-wider text-white hover:bg-white hover:text-[#0a0a12] transition-all duration-300"
            >
              {content.ctaSecondary}
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
          <p className="text-xs uppercase tracking-widest text-white/50">
            {content.ctaPrimaryNote}
          </p>
        </div>
      </div>

      {/* Bottom bar — descriptive text */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 lg:px-24 xl:px-32 pb-12">
        <div ref={bottomLeftRef} className="opacity-0 max-w-xl">
          <p className="text-base leading-relaxed text-white/90">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

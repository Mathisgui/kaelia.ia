"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (!titleEl) return;

    // Split title into words, wrap each in a span
    const words = content.hero.title.split(" ");
    titleEl.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block opacity-0 translate-y-[20px]" style="transition:none">${word}</span>`
      )
      .join(" ");

    const wordSpans = titleEl.querySelectorAll("span");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      // Subtitle fades in
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      // Title words appear one by one — slow reveal
      tl.to(
        wordSpans,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.3"
      );

      // Description fades in
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      );

      // CTA fades in
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );

      // Scroll indicator
      tl.fromTo(
        indicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Subtle gradient overlay for text readability — matches #0a0a12 */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a12]/30 via-transparent to-[#0a0a12]/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <span
          ref={subtitleRef}
          className="text-sm tracking-[0.3em] uppercase text-accent mb-6"
        >
          {content.hero.subtitle}
        </span>

        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6"
        >
          {content.hero.title}
        </h1>

        <p
          ref={descRef}
          className="text-lg text-white/60 max-w-2xl mb-10 leading-relaxed"
        >
          {content.hero.description}
        </p>

        <div ref={ctaRef}>
          <MagneticButton href={content.contact.calendarUrl}>
            {content.hero.cta}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-2"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
          Scroll
        </span>
        <div className="animate-bounce-gentle">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-accent/60"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

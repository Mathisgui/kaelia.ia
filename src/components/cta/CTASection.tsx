"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import MagneticButton from "@/components/ui/MagneticButton";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      // Title word-by-word reveal
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".cta-word");
        gsap.fromTo(words,
          { opacity: 0, y: 30, rotateX: -40 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.7, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          }
        );
      }

      // Desc + button stagger
      gsap.fromTo([descRef.current, btnRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        }
      );

      // Orbs float
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -24, x: 12, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 20, x: -16, duration: 6.5, repeat: -1, yoyo: true, ease: "sine.inOut",
          delay: 1,
        });
      }

      // Grid slow drift
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPositionX: "60px",
          backgroundPositionY: "60px",
          duration: 16, repeat: -1, ease: "none",
        });
      }

      // Shimmer line animation
      gsap.fromTo(".cta-shimmer",
        { x: "-100%" },
        { x: "200%", duration: 2.5, repeat: -1, repeatDelay: 3, ease: "power1.inOut" }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Split title into word spans
  const titleWords = content.cta.title.split(" ").map((word, i) => (
    <span key={i} className="cta-word inline-block opacity-0" style={{ transformStyle: "preserve-3d" }}>
      {word}&nbsp;
    </span>
  ));

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={innerRef}
          className="relative overflow-hidden rounded-[2.5rem] opacity-0"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 8px 80px rgba(124,58,237,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Animated tech grid overlay */}
          <div
            ref={gridRef}
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(167,139,250,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <div
              className="cta-shimmer absolute top-0 bottom-0 w-1/3"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.06), transparent)",
              }}
            />
          </div>

          {/* Floating orbs */}
          <div
            ref={orb1Ref}
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
          />
          <div
            ref={orb2Ref}
            className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(91,33,182,0.14) 0%, transparent 70%)", filter: "blur(50px)" }}
          />

          {/* Top shimmer border */}
          <div className="pointer-events-none absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#a78bfa]/40 to-transparent" />
          {/* Bottom shimmer border */}
          <div className="pointer-events-none absolute bottom-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />

          {/* Corner brackets */}
          <div className="pointer-events-none absolute top-6 left-6 h-6 w-6 border-t border-l border-[#a78bfa]/30" />
          <div className="pointer-events-none absolute top-6 right-6 h-6 w-6 border-t border-r border-[#a78bfa]/30" />
          <div className="pointer-events-none absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#a78bfa]/20" />
          <div className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#a78bfa]/20" />

          {/* Content */}
          <div className="relative z-10 px-8 py-20 text-center md:px-16 md:py-28">
            <h2
              ref={titleRef}
              className="font-serif mb-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              style={{ perspective: "600px" }}
            >
              {titleWords}
            </h2>

            <p
              ref={descRef}
              className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg whitespace-pre-line opacity-0"
            >
              {content.cta.description}
            </p>

            <div ref={btnRef} className="opacity-0 flex flex-col items-center gap-3">
              <MagneticButton href={content.contact.calendarUrl}>
                {content.cta.button}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

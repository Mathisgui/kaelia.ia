"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { content } from "@/content/fr";
import { ANIMATION } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".contact-animate"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION.fadeInDuration,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-40 md:py-56"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="contact-animate mb-6 text-sm font-medium uppercase tracking-wider text-[#7c3aed]">
          {content.contact.sectionTitle}
        </h2>
        <p className="contact-animate mx-auto mb-10 max-w-2xl text-lg text-white/60 leading-relaxed">
          {content.contact.description}
        </p>

        <div className="contact-animate mb-12">
          <MagneticButton href={content.contact.calendarUrl}>
            {content.contact.ctaButton}
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

        <div className="contact-animate flex items-center justify-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <a
            href={`mailto:${content.contact.email}`}
            className="text-white/60 transition-colors hover:text-white"
          >
            {content.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

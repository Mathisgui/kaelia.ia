"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { ANIMATION } from "@/lib/constants";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = "",
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 50, scale: 0.97, filter: "blur(6px)" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: ANIMATION.fadeInDuration + 0.2,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;

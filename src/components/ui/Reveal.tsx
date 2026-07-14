"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-register";

interface RevealProps {
  children: React.ReactNode;
  /** Délai en secondes (pour décaler des cartes d'une même grille). */
  delay?: number;
  /** Décalage vertical initial. */
  y?: number;
  className?: string;
}

/**
 * Wrapper de reveal au scroll (pattern GSAP historique du site).
 * SSR-safe : le contenu est visible dans le HTML initial, l'animation
 * ne fait que le présenter. Respecte prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 40, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

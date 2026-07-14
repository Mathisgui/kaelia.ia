"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-register";
import { ANIMATION } from "@/lib/constants";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/**
 * Compteur SSR-safe : la valeur finale est rendue dans le HTML initial
 * (crawlers et no-JS la voient), puis le JS remet à zéro au montage et
 * anime au scroll. Respecte prefers-reduced-motion.
 */
export default function Counter({ value, suffix = "", className }: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = "0";
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: ANIMATION.counterDuration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value]);

  return (
    <span className={className}>
      <span ref={numberRef}>{value}</span>
      {suffix}
    </span>
  );
}

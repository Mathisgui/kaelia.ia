"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { COLORS, ANIMATION } from "@/lib/constants";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = "",
  duration = ANIMATION.counterDuration,
  className = "",
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    el.textContent = `0${suffix}`;

    const proxy = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(proxy, {
          value: target,
          duration,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(proxy.value)}${suffix}`;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [target, suffix, duration]);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{
        color: COLORS.accent,
        fontWeight: 700,
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        lineHeight: 1.1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      0{suffix}
    </span>
  );
};

export default AnimatedCounter;

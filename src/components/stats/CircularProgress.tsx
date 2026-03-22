"use client";

import React, { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { ANIMATION } from "@/lib/constants";

interface CircularProgressProps {
  percentage: number;
  value: string;
  suffix: string;
  label: string;
  description: string;
}

const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = 150;
const STROKE_WIDTH = 4;

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  value,
  suffix,
  label,
  description,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const numberEl = numberRef.current;
    const container = containerRef.current;
    if (!circle || !numberEl || !container) return;

    // Set initial state
    gsap.set(circle, { strokeDashoffset: CIRCUMFERENCE });
    numberEl.textContent = `0${suffix}`;

    const targetOffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
    const targetValue = parseInt(value, 10);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true,
        },
      });

      // Animate stroke
      tl.to(
        circle,
        {
          strokeDashoffset: targetOffset,
          duration: ANIMATION.counterDuration,
          ease: "power2.out",
        },
        0
      );

      // Animate number counter
      const proxy = { value: 0 };
      tl.to(
        proxy,
        {
          value: targetValue,
          duration: ANIMATION.counterDuration,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            numberEl.textContent = `${Math.round(proxy.value)}${suffix}`;
          },
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, [percentage, value, suffix]);

  return (
    <div ref={containerRef} className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
        >
          <defs>
            <filter id={`glow-${value}`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#7c3aed" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Background circle */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={STROKE_WIDTH}
          />

          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#7c3aed"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            filter={`url(#glow-${value})`}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numberRef}
            className="text-3xl font-bold text-white"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            0{suffix}
          </span>
          <span className="text-xs text-white/60">{label}</span>
        </div>
      </div>

      {/* Description below circle */}
      <p className="mt-6 max-w-xs text-center text-sm text-white/60">
        {description}
      </p>
    </div>
  );
};

export default CircularProgress;

"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-register";

const LOGOS = [
  "Mazars",
  "Capgemini",
  "Société Générale",
  "L'Oréal",
  "Decathlon",
  "SNCF",
  "Airbus",
  "BNP Paribas",
  "Michelin",
  "Orange",
];

const TrustBanner: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const anim = gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      anim.kill();
    };
  }, []);

  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="relative py-14 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#0a0a12] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#0a0a12] to-transparent" />

      <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-white/30">
        Ils nous ont fait confiance
      </p>

      <div className="flex overflow-hidden">
        <div ref={trackRef} className="flex gap-16 will-change-transform">
          {items.map((name, i) => (
            <div
              key={i}
              className="flex items-center justify-center shrink-0 px-6 py-3 rounded-lg border border-white/[0.07] bg-white/[0.03] min-w-[140px]"
            >
              <span className="text-sm font-semibold tracking-wide text-white/40 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;

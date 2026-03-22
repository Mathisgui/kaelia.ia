"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap-register";
import { COLORS } from "@/lib/constants";
import { content } from "@/content/fr";
import ShimmerText from "@/components/ui/ShimmerText";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const [ready, setReady] = useState(false);

  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    const counter = counterRef.current;
    const circle = circleRef.current;
    if (!counter || !circle) return;

    gsap.set(circle, { strokeDashoffset: CIRCUMFERENCE });

    const proxy = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => setReady(true),
    });

    /* Phase 1: fast ramp to ~30 */
    tl.to(proxy, {
      value: 30,
      duration: 0.6,
      ease: "power1.in",
      onUpdate: () => {
        const v = Math.round(proxy.value);
        counter.textContent = `${v}%`;
        circle.style.strokeDashoffset = String(
          CIRCUMFERENCE - (CIRCUMFERENCE * v) / 100,
        );
      },
    });

    /* Phase 2: slower crawl to ~75 */
    tl.to(proxy, {
      value: 75,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(proxy.value);
        counter.textContent = `${v}%`;
        circle.style.strokeDashoffset = String(
          CIRCUMFERENCE - (CIRCUMFERENCE * v) / 100,
        );
      },
    });

    /* Phase 3: quick finish */
    tl.to(proxy, {
      value: 100,
      duration: 0.5,
      ease: "power3.out",
      onUpdate: () => {
        const v = Math.round(proxy.value);
        counter.textContent = `${v}%`;
        circle.style.strokeDashoffset = String(
          CIRCUMFERENCE - (CIRCUMFERENCE * v) / 100,
        );
      },
    });

    return () => {
      tl.kill();
    };
  }, [CIRCUMFERENCE]);

  /* Fade in the enter button once counter reaches 100 */
  useEffect(() => {
    if (!ready || !enterRef.current) return;

    gsap.fromTo(
      enterRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
    );
  }, [ready]);

  const handleEnter = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        overlay.style.display = "none";
        onComplete();
      },
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.bg,
      }}
    >
      {/* Title */}
      <div style={{ marginBottom: "2.5rem" }}>
        <ShimmerText
          text={content.brand}
          className="preloader-title"
        />
      </div>

      {/* Progress ring */}
      <div
        style={{
          position: "relative",
          width: 100,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={COLORS.glassBorder}
            strokeWidth="2"
          />
          {/* Progress */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
          />
        </svg>

        {/* Counter text */}
        <span
          ref={counterRef}
          style={{
            position: "relative",
            color: COLORS.whiteAlpha60,
            fontSize: "0.85rem",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          0%
        </span>
      </div>

      {/* Enter button */}
      {ready && (
        <button
          ref={enterRef}
          onClick={handleEnter}
          type="button"
          style={{
            marginTop: "2.5rem",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `1px solid ${COLORS.accent}`,
            backgroundColor: "transparent",
            color: COLORS.white,
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: 0,
            transition: "box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              `0 0 24px ${COLORS.accent}50, inset 0 0 24px ${COLORS.accent}15`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Entrer
        </button>
      )}

      <style jsx>{`
        .preloader-title {
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 700;
          letter-spacing: 0.3em;
        }
      `}</style>
    </div>
  );
};

export default Preloader;

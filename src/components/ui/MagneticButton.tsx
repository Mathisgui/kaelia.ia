"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";
import { COLORS, ANIMATION } from "@/lib/constants";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  href,
}) => {
  const buttonRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.35;
    const deltaY = (e.clientY - centerY) * 0.35;

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      scale: ANIMATION.magneticScale,
      backgroundColor: `${COLORS.accent}20`,
      borderColor: COLORS.accentLight,
      color: COLORS.white,
      boxShadow: `0 0 30px ${COLORS.accent}50, inset 0 0 20px ${COLORS.accent}10`,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      backgroundColor: "transparent",
      borderColor: COLORS.accent,
      boxShadow: `0 0 0px transparent`,
      duration: 0.6,
      ease: "power4.out",
    });
  }, []);

  const sharedStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.875rem 2rem",
    border: `1px solid ${COLORS.accent}`,
    borderRadius: "9999px",
    backgroundColor: "transparent",
    color: COLORS.white,
    fontSize: "0.9rem",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    textDecoration: "none",
    cursor: "pointer",
    willChange: "transform",
    transition: "border-color 0.3s ease",
  };

  const commonProps = {
    ref: buttonRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>,
    className: `magnetic-button ${className}`,
    style: sharedStyles,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a {...commonProps} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default MagneticButton;

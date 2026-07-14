import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Glow violet au hover (pattern historique des cartes services). */
  hoverGlow?: boolean;
}

/** Carte liquid-glass standard du site (extraite de l'ex-ServicesSection). */
export default function GlassCard({ children, className = "", hoverGlow = true }: GlassCardProps) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden h-full border border-white/[0.03] backdrop-blur-sm bg-white/[0.008] transition-all duration-500 hover:bg-white/[0.02] hover:border-white/[0.06] ${
        hoverGlow ? "hover:shadow-[0_8px_40px_rgba(124,58,237,0.06)]" : ""
      } ${className}`}
    >
      {hoverGlow && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7c3aed]/0 to-transparent transition-all duration-500 group-hover:from-[#7c3aed]/[0.03]" />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
}

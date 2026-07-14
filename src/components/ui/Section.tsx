import React from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Glow violet d'ambiance (pattern historique du site). */
  glow?: boolean;
  className?: string;
}

/**
 * Structure de section standard du site : glow violet, eyebrow,
 * H2 serif centré, description, puis contenu libre.
 */
export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  glow = true,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative py-24 md:py-36 ${className}`}>
      {glow && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal y={30}>
          {eyebrow && (
            <p className="mb-3 text-center text-sm font-medium uppercase tracking-wider text-[#c084fc]">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mb-4 max-w-2xl text-center text-white/90 leading-relaxed">
              {description}
            </p>
          )}
        </Reveal>

        {children && <div className="mt-12 md:mt-16">{children}</div>}
      </div>
    </section>
  );
}

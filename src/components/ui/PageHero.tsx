import React from "react";
import Reveal from "./Reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string; external?: boolean };
}

/** Hero standard des pages intérieures (H1 + eyebrow + description + CTA optionnel). */
export default function PageHero({ eyebrow, title, description, cta }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-[#7c3aed]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal y={24}>
          {eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#c084fc]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto max-w-2xl leading-relaxed text-white/85 md:text-lg">
              {description}
            </p>
          )}
          {cta && (
            <a
              href={cta.href}
              {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative mt-9 inline-flex items-center overflow-hidden rounded-full px-8 py-3.5 text-[15px] font-medium"
            >
              <span className="absolute inset-0 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-full" />
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#9f1239] transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 text-[#0a0a12] transition-colors duration-300 group-hover:text-white">
                {cta.label}
              </span>
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

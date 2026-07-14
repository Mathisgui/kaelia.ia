import React from "react";
import type { CtaContent } from "@/content/types";
import Reveal from "./Reveal";

interface CtaBannerProps {
  content: CtaContent;
  href: string;
  external?: boolean;
}

/** Bandeau CTA final réutilisable (paramétrisation de l'ex-CTASection). */
export default function CtaBanner({ content, href, external = true }: CtaBannerProps) {
  return (
    <section className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[#7c3aed]/12 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal y={30}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm px-8 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7c3aed]/[0.06] to-transparent" />

            <div className="relative">
              <h2 className="font-serif mb-5 text-3xl font-bold text-white md:text-4xl">
                {content.title}
              </h2>
              <p className="mx-auto mb-9 max-w-xl leading-relaxed text-white/85">
                {content.description}
              </p>

              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group relative inline-flex items-center overflow-hidden rounded-full px-8 py-3.5 text-[15px] font-medium"
              >
                <span className="absolute inset-0 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-full" />
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#9f1239] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 text-[#0a0a12] transition-colors duration-300 group-hover:text-white">
                  {content.button}
                </span>
              </a>

              {content.note && (
                <p className="mt-5 text-xs uppercase tracking-widest text-white/40">
                  {content.note}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

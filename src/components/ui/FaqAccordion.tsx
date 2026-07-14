import React from "react";
import type { FaqItem } from "@/content/types";
import Reveal from "./Reveal";

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * FAQ en <details>/<summary> : le contenu est dans le HTML initial (SEO)
 * et fonctionne sans JavaScript.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, i) => (
        <Reveal key={i} delay={Math.min(i * 0.06, 0.3)} y={24}>
          <details className="group/faq relative rounded-2xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm transition-colors duration-300 open:bg-white/[0.02] open:border-white/[0.08]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
              <span className="font-medium text-white">{item.question}</span>
              <svg
                className="h-4 w-4 shrink-0 text-[#a78bfa] transition-transform duration-300 group-open/faq:rotate-45"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M8 2v12M2 8h12" />
              </svg>
            </summary>
            <p className="px-6 pb-6 text-sm leading-relaxed text-white/80">
              {item.answer}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}

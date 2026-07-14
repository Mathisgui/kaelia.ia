import React from "react";
import type { MethodPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";

interface MethodPageProps {
  content: MethodPageContent;
  common: CommonContent;
}

const CheckIcon = () => (
  <svg className="mt-1 h-4 w-4 shrink-0 text-[#a78bfa]" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/** Page méthode : 4 étapes détaillées avec livrables + maintenance + FAQ. */
export default function MethodPage({ content, common }: MethodPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <div className="relative mx-auto max-w-4xl space-y-8 px-6 pb-8">
        {content.steps.map((step, i) => (
          <Reveal key={i} y={36}>
            <GlassCard>
              <div className="p-8 md:p-10">
                <div className="mb-4 flex items-baseline gap-5">
                  <span className="text-5xl font-bold" style={{ color: "#a78bfa" }}>
                    {step.number}
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
                    {step.title}
                  </h2>
                </div>
                <p className="mb-6 leading-relaxed text-white/85">{step.description}</p>
                <ul className="mb-6 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {step.deliverables.map((deliverable, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-white/90">{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-widest text-white/40">{step.duration}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}

        <Reveal y={36}>
          <div className="rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/[0.06] p-8 md:p-10">
            <h2 className="font-serif mb-3 text-2xl font-bold text-white">
              {content.maintenance.title}
            </h2>
            <p className="mb-5 leading-relaxed text-white/85">{content.maintenance.description}</p>
            <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {content.maintenance.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Section title={common.labels.faqTitle} glow={false}>
        <FaqAccordion items={content.faq} />
      </Section>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

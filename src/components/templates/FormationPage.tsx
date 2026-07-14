import React from "react";
import type { FormationPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";

interface FormationPageProps {
  content: FormationPageContent;
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

/** Page formation (offre secondaire) : formats, financement, adoption. */
export default function FormationPage({ content, common }: FormationPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-8">
        <Reveal y={30}>
          <p className="mx-auto mb-14 max-w-3xl text-center leading-relaxed text-white/85">
            {content.intro}
          </p>
        </Reveal>

        <Reveal y={30}>
          <GlassCard>
            <div className="p-8 md:p-10">
              <h2 className="font-serif mb-6 text-2xl font-bold text-white">
                {content.objectives.title}
              </h2>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {content.objectives.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <Section eyebrow={content.formats.eyebrow} title={content.formats.title} glow={false}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.formats.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/[0.06] p-8">
              <h3 className="font-serif mb-3 text-xl font-bold text-white">
                {content.funding.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/85">{content.funding.description}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.015] p-8">
              <h3 className="font-serif mb-3 text-xl font-bold text-white">
                {content.adoption.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/85">{content.adoption.description}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title={common.labels.faqTitle}>
        <FaqAccordion items={content.faq} />
      </Section>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

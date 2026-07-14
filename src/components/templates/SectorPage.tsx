import React from "react";
import Link from "next/link";
import type { SectorPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";

interface SectorPageProps {
  content: SectorPageContent;
  common: CommonContent;
}

/** Template des pages sectorielles (organismes de formation, cabinets d'avocats). */
export default function SectorPage({ content, common }: SectorPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section eyebrow={content.painPoints.eyebrow} title={content.painPoints.title} glow={false}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.painPoints.items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.1, 0.4)}>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={content.caseExample.title} description={content.caseExample.context}>
        <BeforeAfter
          rows={content.caseExample.rows}
          beforeLabel={common.labels.before}
          afterLabel={common.labels.after}
        />
        <Reveal y={24} className="mt-10">
          <p className="mx-auto max-w-3xl rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/[0.05] px-8 py-6 text-center text-sm leading-relaxed text-white/90">
            {content.caseExample.result}
          </p>
        </Reveal>
      </Section>

      <Section
        eyebrow={content.solutions.eyebrow}
        title={content.solutions.title}
        glow={false}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.solutions.items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.1, 0.4)}>
              <Link href={item.href} className="block h-full">
                <GlassCard>
                  <div className="flex h-full flex-col gap-3 p-8">
                    <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#a78bfa]">
                      {item.linkLabel}
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title={common.labels.faqTitle}>
        <FaqAccordion items={content.faq} />
      </Section>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

import React from "react";
import Link from "next/link";
import type { SolutionPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";

interface SolutionPageProps {
  content: SolutionPageContent;
  common: CommonContent;
}

/** Template des pages hub : /agents-ia et /automatisations. */
export default function SolutionPage({ content, common }: SolutionPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        cta={{ label: content.hero.cta, href: common.contact.calendarUrl, external: true }}
      />

      <Section
        eyebrow={content.useCases.eyebrow}
        title={content.useCases.title}
        description={content.useCases.description}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.useCases.items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.1, 0.5)}>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal y={30} className="mt-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/[0.05] p-8 md:p-10">
            <h3 className="font-serif mb-4 text-xl font-bold text-white">
              {content.explainer.title}
            </h3>
            {content.explainer.paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-3 text-sm leading-relaxed text-white/85 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow={content.children.eyebrow}
        title={content.children.title}
        description={content.children.description}
        glow={false}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.children.items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.1, 0.4)}>
              <Link href={item.href} className="block h-full">
                <GlassCard>
                  <div className="flex h-full flex-col gap-3 p-8">
                    <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#a78bfa] transition-colors group-hover:text-white">
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

      <Section
        eyebrow={content.beforeAfter.eyebrow}
        title={content.beforeAfter.title}
        description={content.beforeAfter.description}
      >
        <BeforeAfter
          rows={content.beforeAfter.rows}
          beforeLabel={common.labels.before}
          afterLabel={common.labels.after}
        />
      </Section>

      <Section title={common.labels.faqTitle} glow={false}>
        <FaqAccordion items={content.faq} />
      </Section>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

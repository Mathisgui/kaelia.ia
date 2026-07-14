import React from "react";
import Link from "next/link";
import type { AgentPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";

interface AgentPageProps {
  content: AgentPageContent;
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

/** Template des pages agents spécialisés (email, documentaire, commercial, connaissance). */
export default function AgentPage({ content, common }: AgentPageProps) {
  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <section className="relative pb-8">
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                    {content.mission.title}
                  </p>
                  <p className="leading-relaxed text-white/90">{content.mission.description}</p>
                </div>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.1}>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                    {content.control.title}
                  </p>
                  <p className="leading-relaxed text-white/90">{content.control.description}</p>
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <Reveal y={30} className="mt-6">
            <GlassCard>
              <div className="p-8 md:p-10">
                <h2 className="font-serif mb-6 text-2xl font-bold text-white">
                  {content.capabilities.title}
                </h2>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {content.capabilities.items.map((item, i) => (
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
      </section>

      <Section title={content.howItWorks.title} glow={false}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {content.howItWorks.steps.map((step, i) => (
            <Reveal key={i} delay={Math.min(i * 0.12, 0.4)}>
              <GlassCard>
                <div className="flex h-full flex-col gap-3 p-8">
                  <span className="font-mono text-3xl font-bold text-[#7c3aed]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/80">{step.description}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={content.beforeAfter.eyebrow} title={content.beforeAfter.title}>
        <BeforeAfter
          rows={content.beforeAfter.rows}
          beforeLabel={common.labels.before}
          afterLabel={common.labels.after}
        />

        <Reveal y={24} className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-white/40">
              {content.integrations.title}
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {content.integrations.tools.map((tool, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-sm text-white/75"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section title={common.labels.faqTitle} glow={false}>
        <FaqAccordion items={content.faq} />

        <Reveal y={24} className="mt-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-white/40">
              {content.related.title}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {content.related.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/[0.08] px-5 py-2 text-sm text-white/85 transition-colors duration-300 hover:bg-[#7c3aed]/[0.15] hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

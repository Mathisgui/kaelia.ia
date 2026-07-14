import React from "react";
import type { CasesPageContent, CommonContent } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import CtaBanner from "@/components/ui/CtaBanner";

interface CasesPageProps {
  content: CasesPageContent;
  common: CommonContent;
}

/** Page cas clients : cas détaillés au format contexte → solution → résultats. */
export default function CasesPage({ content, common }: CasesPageProps) {
  const { labels } = content;

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-8">
        <p className="mx-auto mb-14 max-w-2xl text-center text-xs uppercase tracking-widest text-white/35">
          {content.disclaimer}
        </p>

        <div className="space-y-16">
          {content.cases.map((caseStudy, i) => (
            <Reveal key={i} y={40}>
              <GlassCard hoverGlow={false}>
                <div className="p-8 md:p-12">
                  {/* En-tête du cas */}
                  <div className="mb-8 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-[#7c3aed]/35 bg-[#7c3aed]/10 px-4 py-1.5 text-sm font-medium text-[#a78bfa]">
                      {caseStudy.sector}
                    </span>
                    <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-sm text-white/60">
                      {caseStudy.size}
                    </span>
                  </div>

                  <h2 className="font-serif mb-6 text-2xl font-bold text-white md:text-3xl">
                    {caseStudy.title}
                  </h2>

                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                          {labels.context}
                        </p>
                        <p className="text-sm leading-relaxed text-white/85">
                          {caseStudy.context}
                        </p>
                      </div>

                      <div>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                          {labels.problem}
                        </p>
                        <ul className="space-y-2">
                          {caseStudy.problem.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                              <span className="text-sm leading-relaxed text-white/70">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                          {labels.solution}
                        </p>
                        <p className="text-sm leading-relaxed text-white/85">
                          {caseStudy.solution}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                        <div>
                          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                            {labels.tools}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.tools.map((tool, j) => (
                              <span
                                key={j}
                                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-xs text-white/70"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                            {labels.duration}
                          </p>
                          <p className="text-sm text-white/70">{caseStudy.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Résultats */}
                  <div className="mt-10">
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
                      {labels.results}
                    </p>
                    <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
                      <div className="hidden grid-cols-3 gap-px bg-white/[0.04] md:grid">
                        <p className="bg-[#0d0d18] px-5 py-3 text-xs uppercase tracking-wider text-white/40">
                          {labels.metric}
                        </p>
                        <p className="bg-[#0d0d18] px-5 py-3 text-xs uppercase tracking-wider text-white/40">
                          {labels.before}
                        </p>
                        <p className="bg-[#0d0d18] px-5 py-3 text-xs uppercase tracking-wider text-[#a78bfa]">
                          {labels.after}
                        </p>
                      </div>
                      {caseStudy.results.map((result, j) => (
                        <div key={j} className="grid grid-cols-1 gap-px border-t border-white/[0.04] bg-white/[0.04] md:grid-cols-3">
                          <p className="bg-[#0b0b14] px-5 py-4 text-sm font-medium text-white/85">
                            {result.label}
                          </p>
                          <p className="bg-[#0b0b14] px-5 py-4 text-sm text-white/50">
                            <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-white/30 md:hidden">
                              {labels.before}
                            </span>
                            {result.before}
                          </p>
                          <p className="bg-[#7c3aed]/[0.06] px-5 py-4 text-sm text-white/90">
                            <span className="mr-2 font-mono text-[10px] uppercase tracking-widest text-[#a78bfa]/70 md:hidden">
                              {labels.after}
                            </span>
                            {result.after}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-8 rounded-2xl border border-[#7c3aed]/20 bg-[#7c3aed]/[0.05] px-6 py-5 text-sm leading-relaxed text-white/90">
                    {caseStudy.outcome}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>

      <CtaBanner content={content.cta} href={common.contact.calendarUrl} />
    </>
  );
}

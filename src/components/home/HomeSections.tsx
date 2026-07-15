import React from "react";
import Link from "next/link";
import type { HomeContent } from "@/content/types";
import { routePath, type Locale } from "@/lib/routes";
import Section from "@/components/ui/Section";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";

/* Icônes simples des cartes opérations (style filaire violet du site). */
const operationIcons: Record<string, React.ReactNode> = {
  mail: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  document: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  target: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="#a78bfa" />
    </svg>
  ),
  handshake: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l4-7h8l4 7-8 9z" />
      <path d="M8 5l4 7 4-7M4 12h16" />
    </svg>
  ),
  chart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-8M21 20H3" />
    </svg>
  ),
  book: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20V4H6.5A2.5 2.5 0 004 6.5z" />
      <path d="M4 19.5A2.5 2.5 0 006.5 22H20v-5" />
    </svg>
  ),
};

export function OperationsSection({ content }: { content: HomeContent["operations"] }) {
  return (
    <Section
      id="operations"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.items.map((item, i) => (
          <Reveal key={i} delay={Math.min(i * 0.08, 0.4)}>
            <GlassCard>
              <div className="flex h-full flex-col gap-4 p-8">
                <div className="relative w-fit">
                  <div className="absolute inset-0 rounded-full bg-[#7c3aed]/10 blur-xl scale-150" />
                  <div className="relative">{operationIcons[item.icon] ?? null}</div>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function PedagogySection({ content }: { content: HomeContent["pedagogy"] }) {
  const blocks = [content.automation, content.agent];
  return (
    <Section
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      glow={false}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {blocks.map((block, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <GlassCard>
              <div className="flex h-full flex-col gap-4 p-8 md:p-10">
                <h3 className="font-serif text-2xl font-bold text-white">{block.title}</h3>
                <p className="leading-relaxed text-white/85">{block.description}</p>
                <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm italic leading-relaxed text-white/70">
                  {block.example}
                </p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <Reveal y={30} className="mt-6">
        <div className="rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/[0.07] p-8 text-center md:p-10">
          <h3 className="font-serif mb-3 text-xl font-bold text-white">
            {content.combined.title}
          </h3>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/85">
            {content.combined.description}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

export function AgentsShowcase({
  content,
  locale,
}: {
  content: HomeContent["agents"];
  locale: Locale;
}) {
  return (
    <Section
      id="agents"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.items.map((item, i) => {
          const card = (
            <GlassCard>
              <div className="flex h-full flex-col gap-4 p-8 md:p-10">
                <h3 className="font-serif text-2xl font-bold text-white">{item.title}</h3>
                <p className="leading-relaxed text-white/85">{item.mission}</p>
                <ul className="space-y-2.5">
                  {item.canDo.map((capability, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="mt-1 h-4 w-4 shrink-0 text-[#a78bfa]" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-white/90">{capability}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-[#a78bfa]">
                  {item.linkLabel}
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </GlassCard>
          );
          return (
            <Reveal key={i} delay={Math.min(i * 0.08, 0.3)}>
              {item.externalHref && !item.routeKey ? (
                <a href={item.externalHref} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                <Link href={routePath(item.routeKey ?? "agents", locale)} className="block h-full">
                  {card}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function IntegrationsSection({ content }: { content: HomeContent["integrations"] }) {
  return (
    <Section
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      glow={false}
    >
      <Reveal y={24}>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {content.tools.map((tool, i) => (
            <span
              key={i}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2 text-sm text-white/80 transition-colors duration-300 hover:border-[#7c3aed]/40 hover:text-white"
            >
              {tool}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function SecuritySection({ content }: { content: HomeContent["security"] }) {
  return (
    <Section
      id="securite"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.items.map((item, i) => (
          <Reveal key={i} delay={Math.min(i * 0.08, 0.3)}>
            <GlassCard hoverGlow={false}>
              <div className="flex h-full flex-col gap-3 p-8">
                <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

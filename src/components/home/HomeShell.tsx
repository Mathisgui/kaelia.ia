"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { HomeContent, CommonContent } from "@/content/types";
import { routePath, type Locale } from "@/lib/routes";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/hero/HeroSection";
import StatsSection from "@/components/stats/StatsSection";
import ProcessSection from "@/components/process/ProcessSection";
import AmbientSound from "@/components/ui/AmbientSound";
import Section from "@/components/ui/Section";
import BeforeAfter from "@/components/ui/BeforeAfter";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CtaBanner from "@/components/ui/CtaBanner";
import {
  OperationsSection,
  PedagogySection,
  AgentsShowcase,
  IntegrationsSection,
  SecuritySection,
} from "./HomeSections";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

interface HomeShellProps {
  home: HomeContent;
  common: CommonContent;
  locale: Locale;
}

export default function HomeShell({ home, common, locale }: HomeShellProps) {
  return (
    <>
      {/* Fixed full-page 3D background */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      <div className="relative z-10">
        <Navbar common={common} locale={locale} />
        <main>
          <HeroSection
            content={home.hero}
            calendarUrl={common.contact.calendarUrl}
            secondaryHref={routePath("agents", locale)}
          />
          <OperationsSection content={home.operations} />
          <PedagogySection content={home.pedagogy} />
          <AgentsShowcase content={home.agents} locale={locale} />
          <Section
            eyebrow={home.beforeAfter.eyebrow}
            title={home.beforeAfter.title}
            description={home.beforeAfter.description}
            glow={false}
          >
            <BeforeAfter
              rows={home.beforeAfter.rows}
              beforeLabel={common.labels.before}
              afterLabel={common.labels.after}
            />
          </Section>
          <StatsSection content={home.stats} />
          <ProcessSection content={home.method} methodHref={routePath("method", locale)} />
          <IntegrationsSection content={home.integrations} />
          <SecuritySection content={home.security} />
          <Section eyebrow={home.faq.eyebrow} title={home.faq.title} glow={false}>
            <FaqAccordion items={home.faq.items} />
          </Section>
          <CtaBanner content={home.finalCta} href={common.contact.calendarUrl} />
        </main>
        <Footer common={common} />
      </div>

      <AmbientSound />
    </>
  );
}

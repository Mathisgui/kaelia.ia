"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/nav/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ValueSection from "@/components/value/ValueSection";
import ServicesSection from "@/components/services/ServicesSection";
import StatsSection from "@/components/stats/StatsSection";
import ProcessSection from "@/components/process/ProcessSection";
import WhySection from "@/components/why/WhySection";
import CTASection from "@/components/cta/CTASection";
import TechnologySection from "@/components/technology/TechnologySection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import AmbientSound from "@/components/ui/AmbientSound";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Fixed full-page 3D background */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroSection />
          <ValueSection />
          <ServicesSection />
          <StatsSection />
          <ProcessSection />
          <WhySection />
          <CTASection />
          <TechnologySection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <AmbientSound />
    </>
  );
}

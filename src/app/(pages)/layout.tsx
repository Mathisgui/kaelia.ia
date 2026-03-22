"use client";

import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import AmbientSound from "@/components/ui/AmbientSound";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Subtle gradient background for secondary pages */}
      <div className="fixed inset-0 z-0 bg-[#0a0a12]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </div>

      <AmbientSound />
    </>
  );
}

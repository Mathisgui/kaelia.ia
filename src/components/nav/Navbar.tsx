"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { content } from "@/content/fr";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      setMobileOpen(false);
      if (!href.startsWith("#")) return;

      if (isHome) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        window.location.href = `/${href}`;
      }
    },
    [isHome]
  );

  // Separate nav links from CTA
  const navLinks = content.nav.links.filter((l) => l.href !== "#contact");
  const ctaLink = content.nav.links.find((l) => l.href === "#contact");

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 h-20 flex items-center">
        <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
          {/* Left group: Logo + pill with links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center select-none shrink-0"
            >
              <Image
                src="/logo-kaelia.png"
                alt="Kael'IA"
                width={36}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </a>

            {/* Desktop links in pill */}
            <div
              className={`hidden md:flex items-center gap-6 rounded-full px-6 py-2 transition-all duration-500 ${
                scrolled
                  ? "bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.08] backdrop-blur-md border border-white/[0.1]"
              }`}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA button */}
          {ctaLink && (
            <a
              href={ctaLink.href}
              onClick={(e) => handleNavClick(e, ctaLink.href)}
              className="group hidden md:inline-flex relative items-center px-6 py-2.5 rounded-full text-[15px] font-medium whitespace-nowrap overflow-hidden"
            >
              {/* White background — slides up on hover */}
              <span className="absolute inset-0 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-full" />
              {/* Premium violet-rouge gradient — slides up from below */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#9f1239] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              {/* Text */}
              <span className="relative z-10 text-[#0a0a12] transition-colors duration-300 group-hover:text-white">
                {ctaLink.label}
              </span>
            </a>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-50"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-white/70 transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white/70 transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white/70 transition-all duration-300 origin-center ${
                mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0a0a12]/95 backdrop-blur-xl"
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[75%] max-w-xs bg-[#0e0e1a]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-6 pt-28 px-8">
            {content.nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg text-white/60 hover:text-white transition-colors duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

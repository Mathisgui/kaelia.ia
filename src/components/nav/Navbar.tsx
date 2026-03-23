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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          {/* Logo — always visible, no background */}
          <a
            href="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center select-none shrink-0 relative z-10"
          >
            <Image
              src="/logo-kaelia.png"
              alt="Kael'IA"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </a>

          {/* Desktop links — pill background only around these */}
          <div
            className={`hidden md:flex items-center gap-8 transition-all duration-500 ${
              scrolled
                ? "bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.06] rounded-full px-8 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent px-0 py-0 border border-transparent"
            }`}
          >
            {content.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative text-sm uppercase tracking-wider bg-gradient-to-r from-[#a78bfa] to-[#c084fc] bg-clip-text text-transparent transition-all duration-300 hover:from-[#c4b5fd] hover:to-[#e9d5ff] hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.6)] whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-50"
            aria-label="Menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#a78bfa] transition-all duration-300 origin-center ${
                mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#a78bfa] transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#a78bfa] transition-all duration-300 origin-center ${
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
                className="text-lg uppercase tracking-wider text-[#a78bfa]/80 hover:text-[#c4b5fd] transition-colors duration-300"
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

"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { CommonContent } from "@/content/types";
import { routes, type Locale, type RouteKey } from "@/lib/routes";

interface NavbarProps {
  common: CommonContent;
  locale: Locale;
}

/** Chemin équivalent dans l'autre langue pour la page courante. */
function alternateForPathname(pathname: string, locale: Locale): string {
  const other: Locale = locale === "fr" ? "en" : "fr";

  for (const key of Object.keys(routes) as RouteKey[]) {
    const entry = routes[key] as Partial<Record<Locale, string>>;
    if (entry[locale] === pathname && entry[other]) return entry[other]!;
  }
  // Articles de blog : retomber sur la liste de l'autre langue.
  if (pathname.startsWith("/blog/")) return "/en/blog";
  if (pathname.startsWith("/en/blog/")) return "/blog";

  return other === "fr" ? "/" : "/en";
}

const Navbar: React.FC<NavbarProps> = ({ common, locale }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const homePath = locale === "fr" ? "/" : "/en";
  const isHome = pathname === homePath;
  const altHref = alternateForPathname(pathname, locale);

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 h-20 flex items-center">
        <div className="w-full mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
          {/* Left group: Logo + pill with links */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link
              href={homePath}
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
                width={40}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop links in pill */}
            <div
              className={`hidden lg:flex items-center gap-6 rounded-full px-6 py-2 transition-all duration-500 ${
                scrolled
                  ? "bg-[#0a0a12]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                  : "bg-white/[0.08] backdrop-blur-md border border-white/[0.1]"
              }`}
            >
              {common.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: lang switch + CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={altHref}
              className="text-[13px] font-medium uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-200"
              aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
            >
              {common.langSwitchLabel}
            </Link>
            <a
              href={common.nav.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-medium whitespace-nowrap overflow-hidden"
            >
              <span className="absolute inset-0 bg-white transition-transform duration-300 ease-out group-hover:-translate-y-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#3b0764] via-[#6d28d9] to-[#9f1239] translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 text-[#0a0a12] transition-colors duration-300 group-hover:text-white">
                {common.nav.cta.label}
              </span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-50"
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
        className={`fixed inset-0 z-30 transition-all duration-500 lg:hidden ${
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
            {common.nav.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-white/60 hover:text-white transition-colors duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={common.nav.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-[#a78bfa] hover:text-white transition-colors duration-300"
            >
              {common.nav.cta.label}
            </a>
            <Link
              href={altHref}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-wider text-white/40 hover:text-white transition-colors duration-300"
            >
              {common.langSwitchLabel}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

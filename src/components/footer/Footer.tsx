import React from "react";
import Link from "next/link";
import type { CommonContent } from "@/content/types";

interface FooterProps {
  common: CommonContent;
}

const Footer: React.FC<FooterProps> = ({ common }) => {
  return (
    <footer className="relative bg-[#08080f]/90 backdrop-blur-sm">
      {/* Purple accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Column 1: Brand + tagline + Copyright */}
          <div>
            <p className="mb-4 text-lg font-bold tracking-wider text-white">
              {common.brand}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/40">
              {common.footer.tagline}
            </p>
            <p className="text-sm text-white/40">{common.footer.copyright}</p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Navigation
            </p>
            <ul className="space-y-3">
              {common.nav.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Secondary + Legal */}
          <div>
            <ul className="mb-6 space-y-3">
              {common.footer.secondary.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {common.footer.legal.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

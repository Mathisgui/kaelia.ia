"use client";

import React from "react";
import { content } from "@/content/fr";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#08080f]/90 backdrop-blur-sm">
      {/* Purple accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Column 1: Brand + Copyright */}
          <div>
            <p className="mb-4 text-lg font-bold tracking-wider text-white">
              {content.brand}
            </p>
            <p className="text-sm text-white/40">{content.footer.copyright}</p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Navigation
            </p>
            <ul className="space-y-3">
              {content.nav.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kaelia + Legal */}
          <div>
            <p className="mb-6 text-sm leading-relaxed text-white/40">
              {content.footer.kaelia}
            </p>
            <ul className="space-y-3">
              {content.footer.legal.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                  >
                    {link.label}
                  </a>
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

import React from "react";
import type { BeforeAfterRow } from "@/content/types";
import Reveal from "./Reveal";

interface BeforeAfterProps {
  rows: BeforeAfterRow[];
  beforeLabel: string;
  afterLabel: string;
}

/** Blocs avant/après : colonne "avant" éteinte, colonne "après" accentuée. */
export default function BeforeAfter({ rows, beforeLabel, afterLabel }: BeforeAfterProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-3">
      <div className="hidden grid-cols-2 gap-3 md:grid">
        <p className="px-6 font-mono text-[11px] uppercase tracking-widest text-white/40">
          {beforeLabel}
        </p>
        <p className="px-6 font-mono text-[11px] uppercase tracking-widest text-[#a78bfa]">
          {afterLabel}
        </p>
      </div>

      {rows.map((row, i) => (
        <Reveal key={i} delay={Math.min(i * 0.08, 0.4)} y={24}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.04] bg-white/[0.008] px-6 py-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30 md:hidden">
                {beforeLabel}
              </p>
              <p className="text-sm leading-relaxed text-white/50">{row.before}</p>
            </div>
            <div className="rounded-2xl border border-[#7c3aed]/25 bg-[#7c3aed]/[0.06] px-6 py-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#a78bfa]/70 md:hidden">
                {afterLabel}
              </p>
              <p className="text-sm leading-relaxed text-white/90">{row.after}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

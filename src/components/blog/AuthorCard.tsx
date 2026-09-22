import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/routes";
import { routePath } from "@/lib/routes";

/**
 * Bloc auteur en pied d'article. Rend visible ce que les données structurées
 * affirment déjà, et distingue explicitement Kael'IA de Kaelia : les deux
 * marques portent des noms voisins, ce qui embrouille lecteurs et moteurs.
 */

const COPY: Record<
  Locale,
  { role: string; bio: string; link: string }
> = {
  fr: {
    role: "Fondateur de Kael'IA",
    bio: "Mathis Guillemois conçoit des agents IA et des automatisations sur mesure pour des TPE et PME françaises. Il est aussi associé de Kaelia, organisme de formation certifié Qualiopi : les formations passent par Kaelia, les agents et les automatisations par Kael'IA.",
    link: "En savoir plus",
  },
  en: {
    role: "Founder of Kael'IA",
    bio: "Mathis Guillemois builds custom AI agents and business automations for French small and mid-sized companies. He is also a partner at Kaelia, a Qualiopi-certified training organisation: training goes through Kaelia, agents and automations through Kael'IA.",
    link: "Learn more",
  },
};

export default function AuthorCard({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <aside className="mt-16 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-start">
      <Image
        src="/mathis-portrait.jpg"
        alt="Mathis Guillemois"
        width={72}
        height={72}
        className="h-18 w-18 shrink-0 rounded-full object-cover"
      />
      <div>
        <p className="text-base font-semibold text-white">Mathis Guillemois</p>
        <p className="text-sm text-[#a78bfa]">{copy.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{copy.bio}</p>
        <Link
          href={routePath("about", locale)}
          className="mt-3 inline-block text-sm text-[#a78bfa] hover:underline"
        >
          {copy.link}
        </Link>
      </div>
    </aside>
  );
}

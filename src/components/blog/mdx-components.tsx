import React from "react";
import Link from "next/link";

/**
 * Composants disponibles dans les articles MDX.
 *
 * Règle : aucun de ces composants ne prend d'expression JavaScript en prop.
 * Les MDX ne contiennent que du texte et des props chaîne, ce qui les garde
 * lisibles, vérifiables par le linter de contenu, et insensibles au retrait
 * des expressions JS par next-mdx-remote.
 */

interface BlockProps {
  children: React.ReactNode;
}

/** Encadré de retour d'expérience, signé, distinct du corps de l'article. */
export function Terrain({
  titre = "Vu sur le terrain",
  children,
}: BlockProps & { titre?: string }) {
  return (
    <aside className="my-10 rounded-2xl border border-[#7c3aed]/30 bg-[#7c3aed]/[0.06] px-6 py-5 not-prose">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a78bfa]">
        {titre}
      </p>
      <div className="space-y-3 text-[0.95rem] leading-relaxed text-white/80 [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/**
 * Situation illustrative, annoncée comme telle. Sert quand aucun cas réel
 * n'existe sur le sujet : un exemple construit aide le lecteur, à condition
 * qu'il ne soit jamais pris pour une expérience vécue.
 */
export function Scenario({
  titre = "Un exemple, pas un cas client",
  children,
}: BlockProps & { titre?: string }) {
  return (
    <aside className="my-10 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 not-prose">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/45">
        {titre}
      </p>
      <div className="space-y-3 text-[0.95rem] leading-relaxed text-white/75 [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/** Définition autonome : un terme, une explication courte et citable. */
export function Definition({
  terme,
  children,
}: BlockProps & { terme: string }) {
  return (
    <dl className="my-8 rounded-xl border border-white/10 bg-white/[0.02] px-6 py-5 not-prose">
      <dt className="text-base font-semibold text-white">{terme}</dt>
      <dd className="mt-2 text-[0.95rem] leading-relaxed text-white/75 [&>p]:m-0">
        {children}
      </dd>
    </dl>
  );
}

/** Encadré neutre : précision, mise en garde, chiffre à retenir. */
export function Note({ children }: BlockProps) {
  return (
    <aside className="my-8 rounded-xl border-l-2 border-white/20 bg-white/[0.02] px-5 py-4 text-[0.95rem] leading-relaxed text-white/75 not-prose [&>p]:m-0">
      {children}
    </aside>
  );
}

/** Liens internes en navigation client, liens externes en nouvel onglet. */
function MdxLink({
  href = "",
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return <Link href={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Tableaux lisibles sur mobile : défilement horizontal plutôt que débordement. */
function MdxTable({ children }: BlockProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}

export const mdxComponents = {
  Terrain,
  Scenario,
  Definition,
  Note,
  a: MdxLink,
  table: MdxTable,
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Kael'IA",
  description: "Mentions légales du site Kael'IA.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 text-4xl font-bold text-white">Mentions légales</h1>

      <div className="space-y-8 text-white/70">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Éditeur du site
          </h2>
          <p>
            Kael&apos;IA
            <br />
            Adresse : [À compléter]
            <br />
            Email : contact@kaelia.fr
            <br />
            SIRET : [À compléter]
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Hébergement</h2>
          <p>
            Ce site est hébergé par Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, graphismes,
            logo, icônes, etc.) est la propriété exclusive de Kael&apos;IA, sauf
            mention contraire. Toute reproduction, représentation, modification
            ou exploitation, totale ou partielle, est interdite sans
            autorisation écrite préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Responsabilité
          </h2>
          <p>
            Kael&apos;IA s&apos;efforce de fournir des informations aussi précises
            que possible. Toutefois, il ne pourra être tenu responsable des
            omissions, inexactitudes ou carences dans la mise à jour des
            informations.
          </p>
        </section>
      </div>
    </div>
  );
}

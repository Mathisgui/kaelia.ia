import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Kael'IA",
  description:
    "Politique de confidentialité et gestion des données personnelles du site Kael'IA.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Politique de confidentialité
      </h1>

      <div className="space-y-8 text-white/70">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Collecte des données
          </h2>
          <p>
            Kael&apos;IA collecte uniquement les données personnelles nécessaires
            au traitement des demandes de contact : nom, adresse email, numéro
            de téléphone (facultatif) et message. Aucune donnée n&apos;est
            collectée sans le consentement explicite de l&apos;utilisateur.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Utilisation des données
          </h2>
          <p>
            Les données collectées sont utilisées exclusivement pour répondre
            aux demandes de contact et fournir les services sollicités. Elles ne
            sont en aucun cas vendues, échangées ou transmises à des tiers sans
            consentement.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Conservation des données
          </h2>
          <p>
            Les données personnelles sont conservées pour la durée strictement
            nécessaire au traitement de la demande et au maximum pendant 3 ans à
            compter du dernier contact.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">
            Droits des utilisateurs
          </h2>
          <p>
            Conformément au RGPD, chaque utilisateur dispose d&apos;un droit
            d&apos;accès, de rectification, de suppression et de portabilité de
            ses données personnelles. Pour exercer ces droits, contactez-nous à
            l&apos;adresse : contact@kaelia.fr.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Cookies</h2>
          <p>
            Ce site utilise des cookies strictement nécessaires à son
            fonctionnement. Aucun cookie de suivi ou publicitaire n&apos;est
            utilisé. En naviguant sur ce site, vous acceptez l&apos;utilisation
            de ces cookies techniques.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-white">Contact</h2>
          <p>
            Pour toute question relative à la politique de confidentialité,
            contactez-nous à : contact@kaelia.fr.
          </p>
        </section>
      </div>
    </div>
  );
}

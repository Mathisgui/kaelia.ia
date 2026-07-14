import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { routePath } from "@/lib/routes";
import { faqPageJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import SectorPage from "@/components/templates/SectorPage";

const dict = getDictionary("fr");
const content = dict.sectorTraining;

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "sectorTraining",
  title: content.meta.title,
  description: content.meta.description,
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(content.faq)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            breadcrumbJsonLd([
              { name: "Accueil", path: routePath("home", "fr") },
              { name: "Automatisations", path: routePath("automations", "fr") },
              { name: content.breadcrumbLabel, path: routePath("sectorTraining", "fr") },
            ])
          ),
        }}
      />
      <SectorPage content={content} common={dict.common} />
    </>
  );
}

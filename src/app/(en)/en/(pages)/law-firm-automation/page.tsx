import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { routePath } from "@/lib/routes";
import { faqPageJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import SectorPage from "@/components/templates/SectorPage";

const dict = getDictionary("en");
const content = dict.sectorLegal;

export const metadata = buildMetadata({
  locale: "en",
  routeKey: "sectorLegal",
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
              { name: "Home", path: routePath("home", "en") },
              { name: "Automations", path: routePath("automations", "en") },
              { name: content.breadcrumbLabel, path: routePath("sectorLegal", "en") },
            ])
          ),
        }}
      />
      <SectorPage content={content} common={dict.common} />
    </>
  );
}

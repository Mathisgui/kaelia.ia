import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";
import FormationPage from "@/components/templates/FormationPage";

const dict = getDictionary("en");
const content = dict.formation;

export const metadata = buildMetadata({
  locale: "en",
  routeKey: "formation",
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
      <FormationPage content={content} common={dict.common} />
    </>
  );
}

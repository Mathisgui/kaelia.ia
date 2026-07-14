import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";
import SolutionPage from "@/components/templates/SolutionPage";

const dict = getDictionary("fr");
const content = dict.agentsHub;

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "agents",
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
      <SolutionPage content={content} common={dict.common} />
    </>
  );
}

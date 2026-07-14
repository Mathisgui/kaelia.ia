import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { routePath } from "@/lib/routes";
import { faqPageJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import AgentPage from "@/components/templates/AgentPage";

const dict = getDictionary("fr");
const content = dict.agentDocs;

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "agentDocs",
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
              { name: "Agents IA", path: routePath("agents", "fr") },
              { name: content.breadcrumbLabel, path: routePath("agentDocs", "fr") },
            ])
          ),
        }}
      />
      <AgentPage content={content} common={dict.common} />
    </>
  );
}

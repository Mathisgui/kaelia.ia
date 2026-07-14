import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { routePath } from "@/lib/routes";
import { faqPageJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/jsonld";
import AgentPage from "@/components/templates/AgentPage";

const dict = getDictionary("en");
const content = dict.agentEmail;

export const metadata = buildMetadata({
  locale: "en",
  routeKey: "agentEmail",
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
              { name: "AI Agents", path: routePath("agents", "en") },
              { name: content.breadcrumbLabel, path: routePath("agentEmail", "en") },
            ])
          ),
        }}
      />
      <AgentPage content={content} common={dict.common} />
    </>
  );
}

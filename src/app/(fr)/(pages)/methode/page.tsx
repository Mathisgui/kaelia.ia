import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";
import MethodPage from "@/components/templates/MethodPage";

const dict = getDictionary("fr");
const content = dict.method;

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "method",
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
      <MethodPage content={content} common={dict.common} />
    </>
  );
}

import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import { faqPageJsonLd, jsonLdScript } from "@/lib/jsonld";
import HomeShell from "@/components/home/HomeShell";

const dict = getDictionary("fr");

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "home",
  title: dict.home.meta.title,
  description: dict.home.meta.description,
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(dict.home.faq.items)) }}
      />
      <HomeShell home={dict.home} common={dict.common} locale="fr" />
    </>
  );
}

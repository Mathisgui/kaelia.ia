import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import CasesPage from "@/components/templates/CasesPage";

const dict = getDictionary("en");
const content = dict.cases;

export const metadata = buildMetadata({
  locale: "en",
  routeKey: "cases",
  title: content.meta.title,
  description: content.meta.description,
});

export default function Page() {
  return <CasesPage content={content} common={dict.common} />;
}

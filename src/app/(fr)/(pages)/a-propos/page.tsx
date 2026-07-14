import { getDictionary } from "@/content";
import { buildMetadata } from "@/lib/seo";
import AboutContent from "@/components/about/AboutContent";

const dict = getDictionary("fr");

export const metadata = buildMetadata({
  locale: "fr",
  routeKey: "about",
  title: dict.about.meta.title,
  description: dict.about.meta.description,
});

export default function AboutPage() {
  return <AboutContent content={dict.about} calendarUrl={dict.common.contact.calendarUrl} />;
}

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontClasses } from "@/lib/fonts";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { professionalServiceJsonLd, jsonLdScript } from "@/lib/jsonld";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Agents IA & automatisation pour entreprises | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kael'IA conçoit des agents IA et des automatisations sur mesure pour gérer vos documents, CRM, emails, relances et reportings. Diagnostic gratuit.",
  keywords: [
    "agent IA entreprise",
    "agent IA sur mesure",
    "automatisation IA entreprise",
    "agence automatisation IA",
    "automatisation processus métier",
    "automatisation n8n",
    "automatisation Make",
    "automatisation PME",
    "agent IA reporting",
    "RAG entreprise",
    "Kael'IA",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  verification: {
    google: "EboTpzkAGNxKEak1aSfB5v_lYuXGr77iwxiCqQBSV0g",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={fontClasses}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(professionalServiceJsonLd("fr")) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-white font-[family-name:var(--font-sans)]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

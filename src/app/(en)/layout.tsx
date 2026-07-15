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
    default: `AI Agents & Business Automation | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kael'IA designs custom AI agents and automations to handle your documents, CRM, emails, follow-ups and reporting. Free 30-minute assessment.",
  keywords: [
    "AI agent for business",
    "custom AI agent",
    "business automation agency",
    "business process automation",
    "n8n automation",
    "Make automation",
    "AI automation SMB",
    "enterprise RAG",
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
    <html lang="en" className={fontClasses}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(professionalServiceJsonLd("en")) }}
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

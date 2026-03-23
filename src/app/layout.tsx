import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaelia.vercel.app"),
  title: {
    default: "Kael'IA | Systèmes IA & Automatisation pour Entreprises",
    template: "%s | Kael'IA",
  },
  description:
    "Des systèmes IA sur mesure, des automatisations intelligentes et un accompagnement stratégique pour transformer votre entreprise. Formation certifiée Qualiopi, conseil IA et déploiement d'agents intelligents.",
  keywords: [
    "systèmes IA",
    "automatisation IA",
    "intégration IA entreprise",
    "formation IA",
    "agent IA",
    "n8n automatisation",
    "conseil stratégique IA",
    "transformation digitale IA",
    "accompagnement IA",
    "automatisation des processus",
    "Kael'IA",
    "Qualiopi IA",
  ],
  authors: [{ name: "Kael'IA" }],
  creator: "Kael'IA",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://kaelia.vercel.app",
    title: "Kael'IA | Systèmes IA & Automatisation pour Entreprises",
    description:
      "Des systèmes IA sur mesure, des automatisations intelligentes et un accompagnement stratégique. +100 automatisations déployées, +50 formations réalisées.",
    siteName: "Kael'IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kael'IA | Systèmes IA & Automatisation",
    description:
      "Des systèmes IA sur mesure pour transformer votre entreprise. Automatisation, formation certifiée Qualiopi et conseil stratégique.",
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
  alternates: {
    canonical: "https://kaelia.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Kael'IA",
  description:
    "Systèmes IA sur mesure, automatisation de processus, formation certifiée Qualiopi et conseil stratégique pour les entreprises.",
  url: "https://kaelia.vercel.app",
  areaServed: { "@type": "Country", name: "France" },
  serviceType: [
    "Intégration IA en entreprise",
    "Automatisation de processus (n8n, Make)",
    "Formation IA certifiée Qualiopi",
    "Développement d'agents IA",
    "Conseil stratégique IA",
  ],
  knowsAbout: [
    "Intelligence artificielle",
    "Automatisation",
    "n8n",
    "Claude AI",
    "OpenAI",
    "Machine Learning",
    "NLP",
    "Python",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services IA & Automatisation",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Formation IA",
          description: "Formations sur mesure certifiées Qualiopi pour maîtriser l'IA en entreprise.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatisation de processus",
          description: "Workflows automatisés avec n8n et Make pour éliminer les tâches répétitives.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Conseil stratégique IA",
          description: "Audit des processus et feuille de route IA adaptée à votre entreprise.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-white font-[family-name:var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

// En-têtes de sécurité (rapport Strix du 2026-11-19 : absents sur tout le site).
// Pas de CSP stricte pour l'instant : les scripts en ligne de Next et three.js demandent un
// réglage par nonce, à faire avant toute zone privée ou formulaire.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Domaine unique : le déploiement vercel.app redirige vers le domaine principal.
      {
        source: "/:path*",
        has: [{ type: "host", value: "kaelia.vercel.app" }],
        destination: "https://kaelia-ai.com/:path*",
        permanent: true,
      },
      // www -> domaine nu (comme sur Vercel), une seule version indexée.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kaelia-ai.com" }],
        destination: "https://kaelia-ai.com/:path*",
        permanent: true,
      },
      // Ancienne page services, remplacée par les pages Agents IA / Automatisations.
      {
        source: "/services",
        destination: "/agents-ia",
        permanent: true,
      },
      // Article fusionné dans « par où commencer » (action SEO 2026-S46-05, 2026-11-18).
      {
        source: "/blog/taches-a-automatiser-pme",
        destination: "/blog/par-ou-commencer-automatisation",
        permanent: true,
      },
      {
        source: "/en/blog/tasks-smb-can-automate",
        destination: "/en/blog/where-to-start-automation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

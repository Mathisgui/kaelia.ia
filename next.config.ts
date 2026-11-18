import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Domaine unique : le déploiement vercel.app redirige vers le domaine principal.
      {
        source: "/:path*",
        has: [{ type: "host", value: "kaelia.vercel.app" }],
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

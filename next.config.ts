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
    ];
  },
};

export default nextConfig;

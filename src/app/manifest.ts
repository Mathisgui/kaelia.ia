import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kael'IA",
    short_name: "Kael'IA",
    description:
      "Agents IA et automatisations métier sur mesure pour les entreprises.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a12",
    theme_color: "#0a0a12",
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  };
}

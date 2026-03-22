import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | Kael'IA — Formation IA, Automatisation & Conseil",
  description:
    "Découvrez les services Kael'IA : formation IA certifiée Qualiopi, automatisation de processus, conseil stratégique, agents IA et développement sur mesure.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}

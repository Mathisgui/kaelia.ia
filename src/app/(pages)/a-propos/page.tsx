import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "À propos | Kael'IA — Systèmes IA & Automatisation",
  description:
    "Découvrez Kael'IA : expertise en systèmes IA, automatisation de processus et formation certifiée Qualiopi pour transformer votre entreprise.",
};

export default function AboutPage() {
  return <AboutContent />;
}

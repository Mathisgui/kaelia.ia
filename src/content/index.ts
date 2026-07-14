import type { Locale } from "@/lib/routes";
import type { Dictionary } from "./types";
import { fr } from "./fr";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

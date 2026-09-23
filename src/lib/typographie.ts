/**
 * Typographie française à l'affichage : un « ? », un « : » ou un « % » ne doit
 * jamais commencer une ligne, et « 1 500 » ne doit jamais se couper en deux.
 * Les textes sources gardent des espaces ordinaires, faciles à écrire pour la
 * routine comme pour un humain ; c'est l'affichage qui les rend insécables.
 * Sans effet sur l'anglais, qui ne met pas d'espace avant ces signes.
 */

const INSECABLE = " ";

export function insecables(texte: string): string {
  return texte
    .replace(/ ([:;!?»%€])/g, `${INSECABLE}$1`)
    .replace(/« /g, `«${INSECABLE}`)
    .replace(/(\d) (?=\d{3}\b)/g, `$1${INSECABLE}`)
    .replace(/(\d) (euros?|mois|ans?|jours?|heures?|minutes?|h|min)\b/g, `$1${INSECABLE}$2`);
}

interface Noeud {
  type: string;
  value?: string;
  children?: Noeud[];
}

function parcourir(noeud: Noeud) {
  // Seuls les nœuds de texte sont touchés : le code et les URL restent intacts.
  if (noeud.type === "text" && typeof noeud.value === "string") {
    noeud.value = insecables(noeud.value);
  }
  noeud.children?.forEach(parcourir);
}

/** Plugin remark : applique `insecables` à tout le texte d'un article MDX. */
export function remarkInsecables() {
  return (arbre: Noeud) => parcourir(arbre);
}

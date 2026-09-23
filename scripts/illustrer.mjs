#!/usr/bin/env node
/**
 * Génère l'illustration des articles publiés sans image.
 *
 * Exécuté par la GitHub Action .github/workflows/illustrations.yml après chaque
 * publication. La routine de rédaction n'a ni la clé ni l'accès réseau : c'est
 * voulu, la clé reste dans les secrets du dépôt.
 *
 * Deux appels par article : un petit modèle texte conçoit la scène et le texte
 * alternatif à partir du titre et du résumé, puis le modèle d'image la dessine
 * dans le style fixe du site. Le style ne varie jamais d'un article à l'autre ;
 * seule la scène change.
 *
 * Usage :
 *   node scripts/illustrer.mjs         génère et modifie les articles
 *   node scripts/illustrer.mjs --dry   liste les articles concernés, n'appelle rien
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const BLOG = path.join(ROOT, "src/content/blog");
const PUBLIC_BLOG = path.join(ROOT, "public/blog");
const CLE = process.env.OPENAI_API_KEY;
const DRY = process.argv.includes("--dry");

const MODELE_TEXTE = "gpt-5.4-mini";
const MODELE_IMAGE = "gpt-image-2";
const ACCENTUEES = /[àâäçéèêëîïôöùûüÿœæ]/i;

/** Le style du site : fond presque noir, lueur violette, touche de cyan, verre. */
const STYLE = [
  "Style: minimal, premium, cinematic, dark.",
  "Deep midnight navy background close to #0a0a12.",
  "Soft violet glow (#7c3aed and #a78bfa) with a faint cyan rim light (#22d3ee).",
  "Glassmorphism: translucent glass objects on a dark reflective surface,",
  "soft volumetric light, shallow depth of field, generous negative space on the left.",
  "No text, no letters, no numbers, no logos, no people, no faces, no screens showing writing.",
].join(" ");

function lireArticles(locale) {
  const dir = path.join(BLOG, locale);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const fichier = path.join(dir, f);
      const { data } = matter(fs.readFileSync(fichier, "utf-8"));
      return { fichier, data };
    });
}

/** Nettoie un texte produit par un modèle pour qu'il passe le linter. */
function propre(texte, max) {
  let t = String(texte ?? "")
    .replace(/[’‘]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/[—–]/g, ",")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  t = t.replace(/^(image|photo|illustration)\s+(de|du|d'|of)\s+/i, "");
  t = t.charAt(0).toUpperCase() + t.slice(1);
  if (t.length > max) t = `${t.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "")}.`;
  return t;
}

async function openai(chemin, corps) {
  const reponse = await fetch(`https://api.openai.com/v1/${chemin}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${CLE}`, "Content-Type": "application/json" },
    body: JSON.stringify(corps),
  });
  const json = await reponse.json();
  if (!reponse.ok) {
    throw new Error(`${chemin} : HTTP ${reponse.status}, ${json.error?.message ?? "réponse inattendue"}`);
  }
  return json;
}

/** Conçoit la scène et les deux textes alternatifs. */
async function concevoir(article) {
  const json = await openai("chat/completions", {
    model: MODELE_TEXTE,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You design the header illustration of a blog article for a French company that builds AI agents and business automations for small businesses. " +
          "Return a JSON object with three keys. " +
          "scene: in English, one or two sentences describing a calm still life of two or three concrete, recognisable objects that symbolise the article topic, rendered as glass objects. Never text, letters, numbers, people, faces or screens showing writing. " +
          "The objects always stand on a dark reflective surface in a dark room, lit in violet: describe them that way. " +
          "The readers are French: every symbol must fit a French context. Never a judge's gavel (French courts do not use one), never a dollar sign, never a US flag. " +
          "alt_fr : en français correctement orthographié et accentué (é, è, à, ç, ô), de 60 à 110 caractères, une description factuelle de ce qu'on voit, qui commence par un nom, jamais par « Illustration », « Image » ou « Photo ». " +
          "alt_en: the same description in English, same constraints.",
      },
      {
        role: "user",
        content: `Titre : ${article.title}\nRequête visée : ${article.primaryKeyword ?? ""}\nRésumé : ${article.excerpt}`,
      },
    ],
  });
  const brut = JSON.parse(json.choices[0].message.content);
  return {
    scene: propre(brut.scene, 600),
    altFr: await accentuer(propre(brut.alt_fr, 120)),
    altEn: propre(brut.alt_en, 120),
  };
}

/**
 * Le petit modèle écrit parfois le français sans un seul accent (constaté le
 * 23/09 sur le blog Kaelia). Un texte alternatif sans aucune lettre accentuée
 * est relu une fois ; s'il n'en fallait pas, il revient tel quel.
 */
async function accentuer(alt) {
  if (ACCENTUEES.test(alt)) return alt;
  const json = await openai("chat/completions", {
    model: MODELE_TEXTE,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "Corrige l'orthographe et les accents de ce texte français, sans rien changer d'autre. " +
          "Réponds par un objet JSON dont la seule clé est texte.",
      },
      { role: "user", content: alt },
    ],
  });
  return propre(JSON.parse(json.choices[0].message.content).texte ?? alt, 120);
}

async function dessiner(scene) {
  const json = await openai("images/generations", {
    model: MODELE_IMAGE,
    prompt: `Editorial illustration for a blog article. Scene: ${scene} ${STYLE}`,
    size: "1536x1024",
    quality: "medium",
    n: 1,
  });
  return Buffer.from(json.data[0].b64_json, "base64");
}

/** Deux formats : le visuel d'en-tête, et l'aperçu pour les réseaux et les IA. */
async function enregistrer(png, cle) {
  fs.mkdirSync(path.join(PUBLIC_BLOG, "og"), { recursive: true });
  const webp = path.join(PUBLIC_BLOG, `${cle}.webp`);
  await sharp(png).resize(1200, 800, { fit: "cover", position: "attention" }).webp({ quality: 80 }).toFile(webp);
  await sharp(png)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(PUBLIC_BLOG, "og", `${cle}.jpg`));
  return Math.round(fs.statSync(webp).size / 1024);
}

/**
 * Ajoute image et imageAlt au frontmatter, sans le réécrire : une réécriture
 * complète changerait les guillemets et l'ordre des champs de tout le fichier.
 * Les valeurs sont écrites en chaînes JSON, qui sont du YAML valide.
 */
function annoter(fichier, image, alt) {
  const texte = fs.readFileSync(fichier, "utf-8");
  const fin = texte.indexOf("\n---", 3);
  if (!texte.startsWith("---") || fin < 0) throw new Error(`frontmatter introuvable : ${fichier}`);
  const lignes = `image: ${JSON.stringify(image)}\nimageAlt: ${JSON.stringify(alt)}\n`;
  const avantFaq = texte.indexOf("\nfaq:");
  const position = avantFaq > 0 && avantFaq < fin ? avantFaq + 1 : fin + 1;
  fs.writeFileSync(fichier, texte.slice(0, position) + lignes + texte.slice(position));
}

async function main() {
  const fr = lireArticles("fr");
  const en = lireArticles("en");
  const aIllustrer = fr.filter((a) => a.data.cluster && !a.data.image);

  console.log(`${aIllustrer.length} article(s) à illustrer.`);
  if (aIllustrer.length === 0) return;
  if (!DRY && !CLE) {
    console.error("OPENAI_API_KEY absent : aucune illustration générée.");
    process.exit(2);
  }

  for (const article of aIllustrer) {
    const cle = article.data.translationKey;
    const jumeau = en.find((a) => a.data.translationKey === cle);
    console.log(`- ${cle} : ${article.data.title}`);
    if (DRY) continue;

    const { scene, altFr, altEn } = await concevoir(article.data);
    console.log(`  scène : ${scene}`);
    const png = await dessiner(scene);
    const ko = await enregistrer(png, cle);
    console.log(`  image : /blog/${cle}.webp (${ko} Ko)`);

    annoter(article.fichier, `/blog/${cle}.webp`, altFr);
    if (jumeau) annoter(jumeau.fichier, `/blog/${cle}.webp`, altEn);
    console.log(`  alt FR : ${altFr}`);
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});

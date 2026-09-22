#!/usr/bin/env node
/**
 * Linter de contenu du blog.
 *
 * Il existe parce que les articles partent en production sans relecture
 * humaine : ce qui n'est pas vérifié mécaniquement ne l'est pas du tout.
 * Le build valide la forme du frontmatter ; ce script valide l'éditorial,
 * le maillage et l'originalité.
 *
 * Usage :
 *   node scripts/content-lint.mjs            tous les articles
 *   node scripts/content-lint.mjs --changed  ceux modifiés par rapport à HEAD
 *   node scripts/content-lint.mjs --briefs   les briefs de editorial/briefs/a-faire
 *   node scripts/content-lint.mjs --against ../autre-depot/articles
 *
 * Deux régimes : les articles au nouveau format (champ `cluster` présent)
 * subissent toutes les règles ; les articles antérieurs ne déclenchent que
 * des avertissements sur les règles qui leur sont postérieures.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import YAML from "yaml";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "src/content/blog");
const EDITORIAL = path.join(ROOT, "editorial");
const LOCALES = ["fr", "en"];

const args = process.argv.slice(2);
const MODE_CHANGED = args.includes("--changed");
const MODE_BRIEFS = args.includes("--briefs");
const AGAINST = (() => {
  const i = args.indexOf("--against");
  return i >= 0 ? args[i + 1] : null;
})();

/* ------------------------------------------------------------------ */
/* Seuils                                                              */
/* ------------------------------------------------------------------ */

const LIMITS = {
  titleMin: 45,
  titleMax: 62,
  excerptMin: 140,
  excerptMax: 168,
  slugWordsMax: 6,
  leadWordsMin: 40,
  leadWordsMax: 75,
  h2Min: 5,
  h2Max: 8,
  h2QuestionsMin: 2,
  listsMin: 2,
  tablesMin: 1,
  faqMin: 3,
  faqMax: 5,
  faqAnswerWordsMin: 35,
  faqAnswerWordsMax: 95,
  sourcesMin: 2,
  internalLinksMin: 4,
  externalLinksMin: 2,
  wordsMin: 1000,
  wordsMax: 1800,
  imageMaxKb: 250,
  similarityBlock: 0.35,
  similarityWarn: 0.2,
  briefConstraintsMax: 300,
};

const FORBIDDEN_CHARS = [
  ["—", "tiret cadratin"],
  ["–", "tiret demi-cadratin"],
  ["’", "apostrophe typographique"],
  ["“", "guillemet anglais ouvrant"],
  ["”", "guillemet anglais fermant"],
];

/** Mots qui trahissent une écriture d'IA (business/kael-ia/voice/signs-of-ai.md). */
const AI_TELLS = [
  "delve",
  "tapestry",
  "unlock",
  "leverage",
  "synergy",
  "game-changer",
  "landscape",
  "furthermore",
  "moreover",
  "crucial",
  "pivotal",
  "showcase",
  "underscore",
  "testament",
  "in conclusion",
  "il est important de noter",
  "dans un monde où",
  "à l'ère du numérique",
  "révolutionner",
  "incontournable",
];

/* ------------------------------------------------------------------ */
/* Rapport                                                             */
/* ------------------------------------------------------------------ */

const findings = [];
function report(level, file, rule, message) {
  findings.push({ level, file, rule, message });
}
const fail = (file, rule, message) => report("BLOQUANT", file, rule, message);
const warn = (file, rule, message) => report("AVERTIR", file, rule, message);

/* ------------------------------------------------------------------ */
/* Aides                                                               */
/* ------------------------------------------------------------------ */

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf-8") : null;
}

function loadYaml(file) {
  const raw = readIfExists(file);
  return raw ? YAML.parse(raw) : null;
}

/** Chemins déclarés dans routes.ts, sans importer du TypeScript. */
function knownRoutes() {
  const raw = readIfExists(path.join(ROOT, "src/lib/routes.ts")) ?? "";
  return new Set([...raw.matchAll(/["'](\/[a-z0-9\-/]*)["']/g)].map((m) => m[1]));
}

function stripCode(body) {
  return body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
}

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOPWORDS = new Set(
  "le la les un une des de du d et ou a au aux en dans sur pour par avec sans ce cet cette ces qui que quoi dont ou est sont etre avoir il elle ils elles on nous vous je tu se sa son ses leur leurs plus moins tres bien tout tous toute toutes the a an of to in for on with and or is are be this that it as at by from your you we our".split(
    " "
  )
);

function shingles(text, size = 3) {
  const tokens = normalize(text).split(" ").filter((t) => t && !STOPWORDS.has(t));
  const set = new Set();
  for (let i = 0; i + size <= tokens.length; i += 1) {
    set.add(tokens.slice(i, i + size).join(" "));
  }
  return set;
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const item of a) if (b.has(item)) inter += 1;
  return inter / (a.size + b.size - inter);
}

/** Contient la requête cible si 80 % de ses mots pleins sont présents. */
function containsKeyword(text, keyword) {
  const target = normalize(keyword)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t));
  if (target.length === 0) return true;
  const haystack = normalize(text);
  const hits = target.filter((t) => haystack.includes(t)).length;
  return hits / target.length >= 0.8;
}

/* ------------------------------------------------------------------ */
/* Chargement des articles                                             */
/* ------------------------------------------------------------------ */

function loadArticles(dir, locale) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const full = path.join(dir, filename);
      const raw = fs.readFileSync(full, "utf-8");
      const { data, content } = matter(raw);
      return {
        file: path.relative(ROOT, full),
        slug: filename.replace(/\.mdx?$/, ""),
        locale,
        meta: data,
        body: content,
        isNewFormat: Boolean(data.cluster),
      };
    });
}

function changedFiles() {
  try {
    const out = execSync("git diff --name-only HEAD && git ls-files --others --exclude-standard", {
      cwd: ROOT,
      encoding: "utf-8",
    });
    return new Set(out.split("\n").filter(Boolean));
  } catch {
    return new Set();
  }
}

/* ------------------------------------------------------------------ */
/* Règles sur un article                                               */
/* ------------------------------------------------------------------ */

function checkArticle(article, context) {
  const { file, meta, body, isNewFormat, locale } = article;
  const strict = isNewFormat || context.forceStrict.has(file);
  const level = strict ? fail : warn;
  const clean = stripCode(body);
  const focus = meta.primaryKeyword ?? (meta.keywords ?? [])[0] ?? "";

  // Titre et méta-description
  const titleLen = (meta.title ?? "").length;
  if (titleLen < LIMITS.titleMin || titleLen > LIMITS.titleMax) {
    level(file, "titre", `${titleLen} caractères, attendu ${LIMITS.titleMin}-${LIMITS.titleMax}`);
  }
  if (focus && !containsKeyword(meta.title ?? "", focus)) {
    level(file, "titre", `ne contient pas la requête cible « ${focus} »`);
  }
  const excerptLen = (meta.excerpt ?? "").length;
  if (excerptLen < LIMITS.excerptMin || excerptLen > LIMITS.excerptMax) {
    level(
      file,
      "meta-description",
      `${excerptLen} caractères, attendu ${LIMITS.excerptMin}-${LIMITS.excerptMax}`
    );
  }

  // Slug
  const slugWords = article.slug.split("-");
  if (slugWords.length > LIMITS.slugWordsMax) {
    level(file, "slug", `${slugWords.length} mots, maximum ${LIMITS.slugWordsMax}`);
  }
  if (!/^[a-z0-9-]+$/.test(article.slug)) {
    fail(file, "slug", "caractères non ASCII ou majuscules");
  }

  // Accroche : première réponse, directement citable
  const lead = clean.trim().split(/\n\s*\n/)[0] ?? "";
  const leadWords = words(lead).length;
  if (leadWords < LIMITS.leadWordsMin || leadWords > LIMITS.leadWordsMax) {
    level(
      file,
      "accroche",
      `${leadWords} mots, attendu ${LIMITS.leadWordsMin}-${LIMITS.leadWordsMax} (réponse directe)`
    );
  }
  if (focus && !containsKeyword(lead, focus)) {
    level(file, "accroche", `ne contient pas la requête cible « ${focus} »`);
  }

  // Structure
  if (/^#\s/m.test(clean)) {
    fail(file, "structure", "H1 dans le corps : le titre est rendu par la page");
  }
  const h2s = [...clean.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  if (h2s.length < LIMITS.h2Min || h2s.length > LIMITS.h2Max) {
    level(file, "structure", `${h2s.length} sections H2, attendu ${LIMITS.h2Min}-${LIMITS.h2Max}`);
  }
  const questions = h2s.filter((h) => h.includes("?")).length;
  if (questions < LIMITS.h2QuestionsMin) {
    level(
      file,
      "structure",
      `${questions} H2 formulés en question, attendu ${LIMITS.h2QuestionsMin}`
    );
  }

  // Richesse de mise en forme
  const lists = (clean.match(/^\s*(?:[-*]|\d+\.)\s+/gm) ?? []).length;
  if (lists < LIMITS.listsMin) {
    level(file, "mise-en-forme", `${lists} éléments de liste, attendu ${LIMITS.listsMin}`);
  }
  const tables = (clean.match(/^\|.+\|\s*$/gm) ?? []).length;
  if (tables < LIMITS.tablesMin) {
    level(file, "mise-en-forme", "aucun tableau");
  }

  // FAQ
  const faq = meta.faq ?? [];
  if (faq.length < LIMITS.faqMin || faq.length > LIMITS.faqMax) {
    level(file, "faq", `${faq.length} questions, attendu ${LIMITS.faqMin}-${LIMITS.faqMax}`);
  }
  for (const item of faq) {
    const n = words(item.answer ?? "").length;
    if (n < LIMITS.faqAnswerWordsMin || n > LIMITS.faqAnswerWordsMax) {
      level(
        file,
        "faq",
        `réponse de ${n} mots (« ${(item.question ?? "").slice(0, 40)}… »), attendu ${LIMITS.faqAnswerWordsMin}-${LIMITS.faqAnswerWordsMax}`
      );
    }
    if (h2s.some((h) => normalize(h) === normalize(item.question ?? ""))) {
      level(file, "faq", "une question de FAQ reprend un H2 mot pour mot");
    }
  }

  // Sources
  const sources = meta.sources ?? [];
  if (sources.length < LIMITS.sourcesMin) {
    level(file, "sources", `${sources.length} source(s), attendu ${LIMITS.sourcesMin}`);
  }
  for (const source of sources) {
    const url = source.url ?? "";
    if (!url.startsWith("https://")) {
      level(file, "sources", `${url} n'est pas en https`);
      continue;
    }
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (context.allowedDomains.size > 0) {
      const allowed = [...context.allowedDomains].some(
        (d) => host === d || host.endsWith(`.${d}`)
      );
      if (!allowed) level(file, "sources", `domaine non autorisé : ${host}`);
    }
    if (!clean.includes(url)) {
      level(file, "sources", `source jamais citée dans le corps : ${url}`);
    }
  }

  // Liens
  const links = [...clean.matchAll(/\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  const internal = links.filter((l) => l.startsWith("/"));
  const external = links.filter((l) => l.startsWith("http"));
  if (internal.length < LIMITS.internalLinksMin) {
    level(file, "maillage", `${internal.length} liens internes, attendu ${LIMITS.internalLinksMin}`);
  }
  if (external.length < LIMITS.externalLinksMin) {
    level(file, "maillage", `${external.length} liens externes, attendu ${LIMITS.externalLinksMin}`);
  }
  for (const link of internal) {
    const target = link.split("#")[0].replace(/\/$/, "") || "/";
    const isBlogLink = /^\/(en\/)?blog\//.test(target);
    if (isBlogLink) {
      const [, , targetSlug] = target.replace(/^\/en/, "").split("/");
      const targetLocale = target.startsWith("/en/") ? "en" : "fr";
      if (!context.slugs[targetLocale].has(targetSlug)) {
        fail(file, "maillage", `lien vers un article inexistant : ${link}`);
      }
      if (targetLocale !== locale) {
        fail(file, "maillage", `lien vers l'autre langue : ${link}`);
      }
    } else if (!context.routes.has(target)) {
      fail(file, "maillage", `lien vers une page inconnue : ${link}`);
    } else if (locale === "en" && !target.startsWith("/en")) {
      fail(file, "maillage", `article anglais pointant vers une page française : ${link}`);
    } else if (locale === "fr" && target.startsWith("/en")) {
      fail(file, "maillage", `article français pointant vers une page anglaise : ${link}`);
    }
  }
  const anchors = new Map();
  for (const m of clean.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
    const key = m[2];
    const list = anchors.get(key) ?? [];
    list.push(normalize(m[1]));
    anchors.set(key, list);
  }
  for (const [target, list] of anchors) {
    if (list.length > 1 && new Set(list).size === 1) {
      warn(file, "maillage", `ancre identique répétée vers ${target}`);
    }
    if (list.some((a) => ["ici", "cliquez ici", "ce lien", "here"].includes(a))) {
      level(file, "maillage", `ancre non descriptive vers ${target}`);
    }
  }

  // Typographie et vocabulaire
  for (const [char, label] of FORBIDDEN_CHARS) {
    if (body.includes(char)) fail(file, "typographie", `${label} interdit (${char})`);
  }
  if (/\p{Extended_Pictographic}/u.test(body)) {
    fail(file, "typographie", "emoji interdit");
  }
  if (locale === "fr" && /\bworkflows?\b/i.test(clean)) {
    level(file, "vocabulaire", "« workflow » : écrire « automatisation »");
  }
  const tells = AI_TELLS.filter((t) => normalize(clean).includes(normalize(t)));
  if (tells.length >= 3) {
    warn(file, "voix", `tournures d'IA : ${tells.slice(0, 5).join(", ")}`);
  }
  const braces = clean.match(/\{[^}]*\}/g) ?? [];
  if (braces.length > 0) {
    fail(file, "mdx", `expression JS dans le MDX : ${braces[0].slice(0, 30)}`);
  }

  // Illustration
  if (meta.image) {
    const imagePath = path.join(ROOT, "public", meta.image);
    if (!fs.existsSync(imagePath)) {
      fail(file, "image", `fichier absent : public${meta.image}`);
    } else {
      const kb = fs.statSync(imagePath).size / 1024;
      if (kb > LIMITS.imageMaxKb) {
        level(file, "image", `${Math.round(kb)} Ko, maximum ${LIMITS.imageMaxKb} Ko`);
      }
    }
    if (!meta.imageAlt) level(file, "image", "imageAlt manquant");
    else if (/^(image|photo|illustration) (de|du|d')/i.test(meta.imageAlt)) {
      warn(file, "image", "alt commençant par « image de »");
    }
  } else {
    level(file, "image", "aucune illustration");
  }

  // Longueur
  const wordCount = words(clean).length;
  if (wordCount < LIMITS.wordsMin || wordCount > LIMITS.wordsMax) {
    warn(file, "longueur", `${wordCount} mots, cible ${LIMITS.wordsMin}-${LIMITS.wordsMax}`);
  }

  // Page mère
  if (strict && !meta.pillar) {
    fail(file, "maillage", "champ pillar manquant (page mère de l'article)");
  }
}

/* ------------------------------------------------------------------ */
/* Règles transversales                                                */
/* ------------------------------------------------------------------ */

/**
 * Liens du site vers le blog. Un slug d'article recopié de mémoire dans une
 * page produit donne un lien mort qu'aucun build ne signale : ces liens sont
 * des chaînes de caractères, pas des routes typées.
 */
function checkSiteLinks(context) {
  const dir = path.join(ROOT, "src/content");
  const files = [];
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== "blog") walk(full);
      } else if (entry.name.endsWith(".ts")) {
        files.push(full);
      }
    }
  };
  walk(dir);

  for (const full of files) {
    const file = path.relative(ROOT, full);
    const raw = fs.readFileSync(full, "utf-8");
    for (const match of raw.matchAll(/["'](\/(?:en\/)?blog\/[a-z0-9-]+)["']/g)) {
      const target = match[1];
      const locale = target.startsWith("/en/") ? "en" : "fr";
      const slug = target.split("/").pop();
      if (!context.slugs[locale].has(slug)) {
        fail(file, "maillage", `lien vers un article inexistant : ${target}`);
      }
    }
  }
}

function checkPairs(articles) {
  const byKey = new Map();
  for (const a of articles) {
    const key = a.meta.translationKey;
    if (!key) continue;
    const entry = byKey.get(key) ?? {};
    entry[a.locale] = a;
    byKey.set(key, entry);
  }
  for (const [key, entry] of byKey) {
    if (!entry.fr || !entry.en) {
      const present = entry.fr ?? entry.en;
      fail(present.file, "paire", `translationKey « ${key} » sans version ${entry.fr ? "EN" : "FR"}`);
      continue;
    }
    if (entry.fr.meta.date !== entry.en.meta.date) {
      warn(entry.en.file, "paire", "dates FR et EN différentes");
    }
    const faqFr = (entry.fr.meta.faq ?? []).length;
    const faqEn = (entry.en.meta.faq ?? []).length;
    if (faqFr !== faqEn) {
      fail(entry.en.file, "paire", `FAQ de taille différente (FR ${faqFr}, EN ${faqEn})`);
    }
  }
}

function checkSimilarity(articles, extra) {
  const byLocale = {};
  for (const a of [...articles, ...extra]) {
    (byLocale[a.locale] ??= []).push({ ...a, shingles: shingles(a.body) });
  }
  for (const locale of Object.keys(byLocale)) {
    const list = byLocale[locale];
    for (let i = 0; i < list.length; i += 1) {
      for (let j = i + 1; j < list.length; j += 1) {
        const score = jaccard(list[i].shingles, list[j].shingles);
        if (score >= LIMITS.similarityBlock) {
          fail(
            list[j].file,
            "doublon",
            `${Math.round(score * 100)} % de similarité avec ${list[i].file}`
          );
        } else if (score >= LIMITS.similarityWarn) {
          warn(
            list[j].file,
            "doublon",
            `${Math.round(score * 100)} % de similarité avec ${list[i].file}`
          );
        }
        const kwA = normalize(list[i].meta.primaryKeyword ?? "");
        const kwB = normalize(list[j].meta.primaryKeyword ?? "");
        if (kwA && kwA === kwB) {
          fail(list[j].file, "doublon", `même requête cible que ${list[i].file} : « ${kwA} »`);
        }
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Briefs                                                              */
/* ------------------------------------------------------------------ */

const INSTRUCTION_VERBS = /\b(ignore|ignorer|exécute|execute|run|curl|git|rm\s|sudo|token|api[_ -]?key|password|mot de passe)\b/i;

function checkBriefs() {
  const dir = path.join(EDITORIAL, "briefs/a-faire");
  if (!fs.existsSync(dir)) return;
  const allowed = new Set(
    (loadYaml(path.join(EDITORIAL, "sources-autorisees.yaml"))?.domains ?? []).map(String)
  );
  const map = loadYaml(path.join(EDITORIAL, "carte-contenu.yaml"));
  const ids = new Set((map?.entries ?? []).map((e) => e.id));

  for (const filename of fs.readdirSync(dir).filter((f) => f.endsWith(".yaml"))) {
    const file = path.relative(ROOT, path.join(dir, filename));
    let brief;
    try {
      brief = YAML.parse(fs.readFileSync(path.join(dir, filename), "utf-8"));
    } catch (error) {
      fail(file, "brief", `YAML illisible : ${error.message}`);
      continue;
    }
    for (const key of ["id", "primaryKeyword", "angle", "outline", "sources", "internalLinks"]) {
      if (!brief?.[key]) fail(file, "brief", `champ obligatoire manquant : ${key}`);
    }
    if (brief?.id && ids.size > 0 && !ids.has(brief.id)) {
      fail(file, "brief", `id « ${brief.id} » absent de carte-contenu.yaml`);
    }
    for (const source of brief?.sources ?? []) {
      const url = source?.url ?? "";
      if (!url.startsWith("https://")) {
        fail(file, "brief", `source non https : ${url}`);
        continue;
      }
      const host = new URL(url).hostname.replace(/^www\./, "");
      if (allowed.size > 0 && ![...allowed].some((d) => host === d || host.endsWith(`.${d}`))) {
        fail(file, "brief", `domaine non autorisé : ${host}`);
      }
    }
    const constraints = String(brief?.constraints ?? "");
    if (constraints.length > LIMITS.briefConstraintsMax) {
      fail(file, "brief", `champ constraints de ${constraints.length} caractères, maximum ${LIMITS.briefConstraintsMax}`);
    }
    const serialized = YAML.stringify(brief ?? {});
    if (INSTRUCTION_VERBS.test(serialized)) {
      fail(file, "brief", "verbe d'instruction système dans le brief (contenu traité comme donnée)");
    }
  }
}

/* ------------------------------------------------------------------ */
/* Exécution                                                           */
/* ------------------------------------------------------------------ */

function main() {
  if (MODE_BRIEFS) {
    checkBriefs();
  } else {
    const articles = LOCALES.flatMap((locale) =>
      loadArticles(path.join(BLOG_DIR, locale), locale)
    );
    const extra = AGAINST
      ? LOCALES.flatMap((locale) => loadArticles(path.resolve(AGAINST, locale), locale))
      : [];

    const context = {
      routes: knownRoutes(),
      slugs: Object.fromEntries(
        LOCALES.map((locale) => [
          locale,
          new Set(articles.filter((a) => a.locale === locale).map((a) => a.slug)),
        ])
      ),
      allowedDomains: new Set(
        (loadYaml(path.join(EDITORIAL, "sources-autorisees.yaml"))?.domains ?? []).map(String)
      ),
      forceStrict: MODE_CHANGED ? changedFiles() : new Set(),
    };

    const scope = MODE_CHANGED
      ? articles.filter((a) => context.forceStrict.has(a.file))
      : articles;

    for (const article of scope) checkArticle(article, context);
    checkSiteLinks(context);
    checkPairs(articles);
    checkSimilarity(scope, MODE_CHANGED ? articles.filter((a) => !scope.includes(a)) : extra);
    if (fs.existsSync(path.join(EDITORIAL, "briefs/a-faire"))) checkBriefs();
  }

  const blocking = findings.filter((f) => f.level === "BLOQUANT");
  const warnings = findings.filter((f) => f.level === "AVERTIR");

  for (const group of [blocking, warnings]) {
    for (const f of group) {
      console.log(`${f.level.padEnd(8)} ${f.file}  [${f.rule}]  ${f.message}`);
    }
  }
  console.log(
    `\n${blocking.length} bloquant(s), ${warnings.length} avertissement(s).`
  );
  process.exit(blocking.length > 0 ? 1 : 0);
}

main();

#!/usr/bin/env node
/**
 * Prépare l'illustration d'un article : une image générée arrive en PNG
 * lourd, le site a besoin d'un WebP léger pour le corps et d'un JPEG au
 * format des aperçus sociaux.
 *
 * Usage : node scripts/image-post.mjs <source.png> <translationKey>
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const [source, key] = process.argv.slice(2);

if (!source || !key) {
  console.error("Usage : node scripts/image-post.mjs <source.png> <translationKey>");
  process.exit(2);
}
if (!fs.existsSync(source)) {
  console.error(`Fichier introuvable : ${source}`);
  process.exit(2);
}

const OUT_DIR = path.join(process.cwd(), "public/blog");
const OG_DIR = path.join(OUT_DIR, "og");
fs.mkdirSync(OG_DIR, { recursive: true });

const webp = path.join(OUT_DIR, `${key}.webp`);
const jpg = path.join(OG_DIR, `${key}.jpg`);

await sharp(source)
  .resize(1200, 800, { fit: "cover", position: "attention" })
  .webp({ quality: 82 })
  .toFile(webp);

await sharp(source)
  .resize(1200, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(jpg);

const kb = (file) => Math.round(fs.statSync(file).size / 1024);
console.log(`/blog/${key}.webp     ${kb(webp)} Ko`);
console.log(`/blog/og/${key}.jpg   ${kb(jpg)} Ko`);

if (kb(webp) > 250) {
  console.error("Image trop lourde (> 250 Ko) : le linter la refusera.");
  process.exit(1);
}

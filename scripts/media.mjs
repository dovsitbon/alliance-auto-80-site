// Prépare les photos d'Alliance Auto 80 pour le web, et les images de partage.
//   npm run media
// Sources : assets/raw/ (photos Google Maps éventuelles) et assets/<dossier>/ (photos prises sur place).
// Copie classée dans assets/<dossier>/, version web dans public/media/<dossier>/ (next/image sert ensuite AVIF/WebP),
// dimensions réelles dans data/media-sizes.json. Pour une nouvelle photo : l'ajouter à PICKS, relancer, puis la
// brancher dans data/photos.json. Voir assets/A-PHOTOGRAPHIER.md.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIRS = ["raw", "hero", "atelier", "equipe", "facade"];

// [fichier source (depuis assets/), dossier, nom, recadrage { top, bottom, left, right } en pixels retirés]
// Le nom commence par la clé du texte alternatif (locales → alt) : facade-…, atelier-…, equipe-…, vidange-…, embrayage-…, pieces-…
const PICKS = [
  // Exemples, à décommenter quand les photos seront prises :
  // ["hero/atelier-pont.jpg", "hero", "atelier-pont", {}],
  // ["facade/facade-garage.jpg", "facade", "facade-garage", {}],
  // ["atelier/vidange-moteur.jpg", "atelier", "vidange-moteur", {}],
  // ["atelier/embrayage-kit.jpg", "atelier", "embrayage-kit", {}],
  // ["atelier/pieces-usees.jpg", "atelier", "pieces-usees", {}],
  // ["equipe/equipe-atelier.jpg", "equipe", "equipe-atelier", {}],
];

const sizes = {};
for (const [src, dir, name, c] of PICKS) {
  const file = path.join(ROOT, "assets", src);
  const meta = await sharp(file).metadata();
  const box = { left: c.left ?? 0, top: c.top ?? 0, width: meta.width - (c.left ?? 0) - (c.right ?? 0), height: meta.height - (c.top ?? 0) - (c.bottom ?? 0) };
  await mkdir(path.join(ROOT, "assets", dir), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", dir), { recursive: true });
  const cropped = sharp(file).rotate().extract(box);
  const keep = path.join(ROOT, "assets", dir, `${name}.jpg`);
  if (!src.startsWith(`${dir}/`) || !existsSync(keep)) await cropped.clone().jpeg({ quality: 92 }).toFile(keep);
  const max = dir === "hero" ? 2400 : 1600;
  const info = await cropped.clone().resize({ width: max, height: max, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(ROOT, "public/media", dir, `${name}.jpg`));
  sizes[`/media/${dir}/${name}.jpg`] = [info.width, info.height];
}
for (const dir of DIRS) await mkdir(path.join(ROOT, "assets", dir), { recursive: true });
await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");

// Image de partage (Open Graph) 1200 × 630 : la photo du hero si elle existe, sinon une composition typographique
const photos = JSON.parse(await readFile(path.join(ROOT, "data/photos.json"), "utf8"));
const W = "M40.42 11.63A5 5 0 1 1 36.37 7.58M31.96 16.04 16.04 31.96M11.63 40.42A5 5 0 1 1 7.58 36.37M7.58 11.63A5 5 0 1 0 11.63 7.58M16.04 16.04 31.96 31.96M36.37 40.42A5 5 0 1 0 40.42 36.37";
const emblem = (x, y, s, ring, key) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="24" cy="24" r="21.5" fill="none" stroke="${ring}" stroke-width="2.4"/><g transform="translate(24 24) scale(0.74) translate(-24 -24)" fill="none" stroke="${key}" stroke-width="3" stroke-linecap="round"><path d="${W}"/></g></g>`;
const grid = Array.from({ length: 40 }, (_, i) => `<path d="M${i * 32} 0V630" /><path d="M0 ${i * 32}H1200" />`).join("");
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#1B2A41"/>
<g stroke="#FAFAF8" stroke-opacity="0.06">${grid}</g>
${emblem(760, 70, 10, "#FAFAF8", "#FAFAF8").replace("<g ", '<g opacity="0.08" ')}
${emblem(80, 92, 2.2, "#E07A1F", "#FAFAF8")}
<text x="80" y="300" fill="#FAFAF8" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="78">ALLIANCE AUTO 80</text>
<text x="80" y="372" fill="#E07A1F" font-family="Arial, sans-serif" font-weight="700" font-size="28" letter-spacing="3">GARAGE · MÉCANIQUE · ENTRETIEN · CAMON</text>
<text x="80" y="470" fill="#FAFAF8" fill-opacity="0.85" font-family="Arial, sans-serif" font-size="30">Vidange, freins, embrayage, distribution, près d'Amiens</text>
<text x="80" y="530" fill="#FAFAF8" font-family="Arial, sans-serif" font-weight="700" font-size="30">Devis gratuit · 09 80 37 44 12</text>
</svg>`;
if (photos.hero) {
  await sharp(path.join(ROOT, "public", photos.hero)).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ROOT, "public/og.jpg"));
} else {
  await sharp(Buffer.from(card)).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(ROOT, "public/og.jpg"));
}

// Icône Apple (180 × 180) depuis app/icon.svg
await sharp(path.join(ROOT, "app/icon.svg"), { density: 600 }).resize(180, 180).png().toFile(path.join(ROOT, "app/apple-icon.png"));

console.log(`${PICKS.length} photo(s) prête(s), og.jpg et apple-icon.png générés`);

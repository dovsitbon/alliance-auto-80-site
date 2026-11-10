// Affichette A5 imprimable (PDF) avec QR code vers la demande de devis, à poser à l'accueil ou en vitrine.
//   npm run affichette   →   public/affichette-alliance-auto-80-a5.pdf
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr/devis`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const NIGHT = hex("#1B2A41");
const ORANGE = hex("#E07A1F");
const PAPER = hex("#FAFAF8");
const INK = hex("#161616");
const MUTED = hex("#4B5462");
const GRAY = hex("#DADAD6");

const pdf = await PDFDocument.create();
pdf.setTitle("Alliance Auto 80 : affichette A5");
pdf.setAuthor("Alliance Auto 80");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PAPER });

// Bandeau bleu nuit, trame au trait, emblème (deux clés croisées dans un anneau)
const bandH = 236;
page.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: NIGHT });
for (let x = 0; x <= W; x += 24) page.drawLine({ start: { x, y: H - bandH }, end: { x, y: H }, thickness: 0.4, color: PAPER, opacity: 0.07 });
for (let y = H - bandH; y <= H; y += 24) page.drawLine({ start: { x: 0, y }, end: { x: W, y }, thickness: 0.4, color: PAPER, opacity: 0.07 });
page.drawRectangle({ x: 0, y: H - bandH - 4, width: W, height: 4, color: ORANGE });

const WRENCHES = [
  "M40.42 11.63A5 5 0 1 1 36.37 7.58M31.96 16.04 16.04 31.96M11.63 40.42A5 5 0 1 1 7.58 36.37",
  "M7.58 11.63A5 5 0 1 0 11.63 7.58M16.04 16.04 31.96 31.96M36.37 40.42A5 5 0 1 0 40.42 36.37",
];
const s = 1.5;
const ox = (W - 48 * s) / 2;
const oy = H - 34;
page.drawCircle({ x: ox + 24 * s, y: oy - 24 * s, size: 21.5 * s, borderColor: ORANGE, borderWidth: 2.4 * s });
const k = 0.74;
for (const d of WRENCHES) page.drawSvgPath(d, { x: ox + 24 * s * (1 - k), y: oy - 24 * s * (1 - k), scale: s * k, borderColor: PAPER, borderWidth: 3 * s * k, borderLineCap: 1 });

const center = (text, font, size, y, color = INK) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

let y = H - 34 - 72 - 40;
center("ALLIANCE AUTO 80", bold, 30, y, PAPER);
y -= 22;
center("GARAGE · MÉCANIQUE · ENTRETIEN · CAMON", bold, 8.5, y, ORANGE);

y = H - bandH - 50;
center("Un mécanicien honnête,", bold, 22, y, NIGHT);
y -= 26;
center("tout simplement", bold, 22, y, NIGHT);
y -= 22;
center("Vidange · Révision · Freins · Embrayage · Distribution · Diagnostic · Pneus", sans, 8.5, y, MUTED);

// QR code vers la demande de devis
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1B2A41", light: "#FAFAF8" }, errorCorrectionLevel: "M" });
const qr = await pdf.embedPng(qrPng);
const qrS = 104;
y -= 22 + qrS;
page.drawImage(qr, { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 18;
center("Devis gratuit : scannez et décrivez votre besoin", bold, 9.5, y, INK);
y -= 13;
center(url.replace(/^https?:\/\//, ""), sans, 8.5, y, MUTED);

// Pied : téléphone, adresse, horaires, note
y -= 22;
page.drawLine({ start: { x: 50, y }, end: { x: W - 50, y }, thickness: 0.6, color: GRAY });
y -= 24;
center(site.phone, bold, 20, y, NIGHT);
y -= 17;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`, sans, 9, y, INK);
y -= 13;
center("Du lundi au vendredi, 9 h – 12 h 30 et 13 h 30 – 18 h 30", sans, 9, y, INK);
y -= 13;
center(`${String(site.rating.value).replace(".", ",")}/5 sur Google (${site.rating.count} avis) · Toutes marques`, sans, 8.5, y, MUTED);

const file = path.join(ROOT, "public/affichette-alliance-auto-80-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", url);

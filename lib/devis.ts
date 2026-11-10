import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay } from "@/lib/shop";

/** Besoins proposés (libellés dans locales → devis.needs). Mêmes identifiants que les catégories de tarifs. */
export const NEEDS = ["entretien", "embrayage", "freins", "distribution", "diagnostic", "pneus", "autre"] as const;
export type NeedId = (typeof NEEDS)[number];
export const MAX_PHOTOS = 3;

export type Devis = {
  vehicle: string;
  mileage: string;
  needs: NeedId[];
  details: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

export const emptyDevis = (): Devis => ({ vehicle: "", mileage: "", needs: [], details: "", date: "", name: "", phone: "", email: "", message: "" });

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une demande reçue côté serveur ; null si l'essentiel manque. */
export function parseDevis(v: unknown): Devis | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const q: Devis = {
    vehicle: str(o.vehicle, 80),
    mileage: str(o.mileage, 12).replace(/[^\d\s]/g, ""),
    needs: Array.isArray(o.needs) ? [...new Set(o.needs.filter((x): x is NeedId => (NEEDS as readonly unknown[]).includes(x)))] : [],
    details: str(o.details, 800),
    date: ISO.test(str(o.date, 10)) ? str(o.date, 10) : "",
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
    message: str(o.message, 1500),
  };
  if (!q.vehicle || !q.name || !isPhone(q.phone)) return null;
  if (!q.needs.length && !q.details && !q.message) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Récapitulatif lisible (e-mail du garage, confirmation client), dans une langue donnée. */
export function devisMessage(q: Devis, lang: Locale, d: Dict, opts: { title?: boolean; photos?: number } = {}) {
  const m = d.devis.message;
  const c = lang === "fr" ? " :" : ":";
  const line = (label: string, value: string) => (value ? `${label}${c} ${value}` : "");
  const needs = q.needs.map((n) => d.devis.needs[n]).join(", ");
  const km = q.mileage ? `${q.mileage.replace(/\s/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, lang === "fr" ? " " : ",")} km` : "";
  const blocks = [
    opts.title === false ? [] : [`*${m.title}*`],
    [line(m.vehicle, q.vehicle), line(m.mileage, km), line(m.needs, needs), line(m.details, q.details), line(m.date, q.date ? formatDay(q.date, lang) : "")],
    [line(m.name, q.name), line(m.phone, q.phone), line(m.email, q.email), line(m.message, q.message)],
    [opts.photos ? `${m.photos}${c} ${opts.photos}` : ""],
  ];
  return blocks
    .map((x) => x.filter(Boolean).join("\n"))
    .filter(Boolean)
    .join("\n\n");
}

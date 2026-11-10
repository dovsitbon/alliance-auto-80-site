import type { Locale } from "@/lib/locales";

// Adresses des pages, traduites. Les pages SEO ont une adresse propre à chaque langue (hreflang).
export const PAGES = {
  devis: { fr: "devis", en: "quote" },
  tarifs: { fr: "tarifs", en: "prices" },
  camon: { fr: "garage-camon", en: "car-garage-camon-amiens" },
  vidange: { fr: "vidange-entretien-amiens", en: "oil-change-car-service-amiens" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageId = keyof typeof PAGES;

/** Chemin d'une page (« home » = accueil), avec une ancre facultative. */
export function href(lang: Locale, page: PageId | "home", hash = "") {
  const base = page === "home" ? `/${lang}` : `/${lang}/${PAGES[page][lang]}`;
  return hash ? `${base}#${hash}` : base;
}

/** Retrouve la page correspondant à un slug, quelle que soit la langue. */
export function pageOf(lang: Locale, slug: string): PageId | null {
  for (const [id, s] of Object.entries(PAGES)) if (s[lang] === slug) return id as PageId;
  return null;
}

/** Même page dans l'autre langue (sélecteur FR · EN). */
export function switchPath(pathname: string, to: Locale) {
  const [, from, slug = ""] = pathname.split("/");
  if (!slug) return `/${to}`;
  for (const s of Object.values(PAGES)) if ((s as Record<string, string>)[from] === slug) return `/${to}/${s[to]}`;
  return `/${to}`;
}

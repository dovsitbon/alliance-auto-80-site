import data from "@/data/tarifs.json";
import type { L10n } from "@/lib/locales";

export type Service = { id: string; name: L10n; price: number | null; duration: L10n | null; confirm?: boolean };
export type Category = { id: string; name: L10n; items: Service[] };

export const categories = data.categories as Category[];
export const categoryOf = (id: string) => categories.find((c) => c.id === id);
/** Prix « à partir de » le plus bas d'une catégorie (null si aucun prix renseigné). */
export const fromPrice = (id: string) => {
  const prices = (categoryOf(id)?.items ?? []).map((s) => s.price).filter((p): p is number => p != null);
  return prices.length ? Math.min(...prices) : null;
};

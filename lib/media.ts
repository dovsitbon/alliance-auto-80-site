import sizes from "@/data/media-sizes.json";
import photos from "@/data/photos.json";

export type Img = { src: string; width: number; height: number };

/** Photo de public/media avec ses dimensions réelles (générées par npm run media). */
export function img(path: string): Img {
  const s = (sizes as Record<string, number[]>)[path];
  if (!s) throw new Error(`Image inconnue : ${path} (lancer npm run media)`);
  return { src: path, width: s[0], height: s[1] };
}

type Slots = Omit<typeof photos, "_note" | "tiles">;
/** Photo d'un emplacement (data/photos.json), ou null tant qu'elle n'a pas été prise. */
export const slot = (key: keyof Slots): string | null => (photos[key] as string | null) ?? null;
export const tileSlot = (key: string): string | null => (photos.tiles as Record<string, string | null>)[key] ?? null;

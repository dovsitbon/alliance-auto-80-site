"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers";
import { CloseIcon } from "@/components/icons";
import { activeAnnouncement, parisNow, type Annonce } from "@/lib/shop";
import { href, type PageId } from "@/lib/routes";

const KEY = "alliance-auto-80-annonce";

/** Bandeau d’infos pratiques (data/annonces.json : horaires par défaut, ou une fermeture datée), qu'on peut fermer. */
export function AnnounceBar() {
  const { lang, d } = useLocale();
  const [a, setA] = useState<Annonce | null>(null);

  useEffect(() => {
    const next = activeAnnouncement(parisNow().iso);
    let closed = false;
    try {
      closed = !!next && localStorage.getItem(KEY) === next.id;
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage, lisible seulement après hydratation
    setA(closed ? null : next);
  }, []);

  if (!a) return null;

  const close = () => {
    try {
      localStorage.setItem(KEY, a.id);
    } catch {}
    setA(null);
  };

  const text = a.text[lang];
  const target = href(lang, a.page as PageId | "home", "hash" in a && a.hash ? a.hash : "");
  const link = { label: a.link[lang], to: target + ("query" in a && a.query ? a.query : "") };

  return (
    <div className="fade-in relative bg-night text-paper">
      <p className="mx-auto max-w-6xl px-12 py-2.5 text-center text-[0.8125rem] leading-snug">
        {text}{" "}
        <Link href={link.to} className="link-line ms-1 font-medium whitespace-nowrap text-orange">
          {link.label}
        </Link>
      </p>
      <button type="button" onClick={close} aria-label={d.announce.close} className="absolute top-1/2 end-2 grid size-10 -translate-y-1/2 place-items-center opacity-80 hover:opacity-100">
        <CloseIcon />
      </button>
    </div>
  );
}

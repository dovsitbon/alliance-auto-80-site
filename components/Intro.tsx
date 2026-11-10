"use client";

import { useEffect, useState } from "react";
import { Emblem } from "@/components/Logo";

const KEY = "alliance-auto-80-intro";

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) :
 * fond gris clair, deux clés au trait bleu nuit pivotent et se croisent, l'anneau se dessine autour,
 * « ALLIANCE AUTO 80 » apparaît, fondu sur le hero. Bouton « Passer ».
 * Ignorée si l'utilisateur préfère réduire les animations (script en tête du layout).
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-night">
      <Emblem className="size-24" mono ringClass="intro-ring" aClass="intro-wrench-a" bClass="intro-wrench-b" />
      <p className="intro-fade display mt-7 text-[1.6rem] tracking-[0.02em] sm:text-[2rem]" translate="no" aria-hidden="true">
        ALLIANCE AUTO 80
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 px-4 text-[0.875rem] font-medium text-night/80 transition-colors hover:text-night"
      >
        {skipLabel}
      </button>
    </div>
  );
}

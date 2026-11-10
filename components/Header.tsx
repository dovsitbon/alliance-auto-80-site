"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { Logo } from "@/components/Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { locales } from "@/lib/locales";
import { href, switchPath } from "@/lib/routes";

/** En-tête fixe : Entretien, Mécanique, Tarifs, Infos à gauche, logo au centre, langue + téléphone + « Demander un devis » à droite. */
export function Header() {
  const { lang, d } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refermer le menu au changement de page
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  const n = d.nav;
  const links = [
    { label: n.entretien, to: href(lang, "vidange") },
    { label: n.mecanique, to: href(lang, "home", "mecanique") },
    { label: n.tarifs, to: href(lang, "tarifs") },
    { label: n.infos, to: href(lang, "home", "infos") },
  ];

  const langSwitch = (
    <nav aria-label={n.lang} className="flex items-center gap-1 text-[0.8125rem] font-medium tracking-[0.06em]">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-muted">·</span>}
          {l === lang ? (
            <span aria-current="true" className="px-1 py-2 text-night">
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={switchPath(pathname, l)}
              hrefLang={l}
              lang={l}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
              }}
              className="px-1 py-2 text-muted hover:text-night"
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );

  useEffect(() => {
    if (!open) return;
    // Le panneau commence sous le header, quelle que soit la hauteur du bandeau au-dessus
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mesure du DOM à l'ouverture
    setPanelTop(headerRef.current?.getBoundingClientRect().bottom ?? 0);
  }, [open]);

  return (
    // Pas de backdrop-blur quand le menu est ouvert : il ferait du header le bloc conteneur du panneau `fixed` (hauteur 0)
    <header ref={headerRef} className={`sticky top-0 z-40 border-b border-line transition-[background-color,box-shadow] duration-300 ${open ? "bg-paper" : scrolled ? "bg-paper/95 shadow-[0_6px_20px_-12px_rgb(27_42_65/0.25)] backdrop-blur" : "bg-paper"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-4 focus:py-2">
        {n.skip}
      </a>
      <div className="mx-auto grid h-16 max-w-[84rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <div className="flex items-center">
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="-ms-2 grid size-11 place-items-center text-night lg:hidden" aria-label={open ? n.close : n.menu}>
            {open ? <CloseIcon className="size-5" /> : <MenuIcon />}
          </button>
          <nav aria-label={n.menu} className="hidden lg:block">
            <ul className="flex items-center gap-x-6 whitespace-nowrap xl:gap-x-8">
              {links.map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="nav-link py-2 text-night/85 transition-colors hover:text-rust">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link href={href(lang, "home")} aria-label={n.home} className="block text-night">
          <Logo className="h-8 w-auto sm:h-9 xl:h-10" />
        </Link>

        <div className="flex items-center justify-end gap-3 lg:gap-5">
          <div className="hidden sm:block">{langSwitch}</div>
          <a href={`tel:${site.tel}`} aria-label={`${n.call} ${site.phone}`} className="grid size-11 place-items-center text-night xl:hidden">
            <PhoneIcon className="size-5" />
          </a>
          <a href={`tel:${site.tel}`} className="hidden items-center gap-2 font-semibold whitespace-nowrap text-night tabular-nums hover:text-rust xl:inline-flex">
            <PhoneIcon /> {site.phone}
          </a>
          <Link href={href(lang, "devis")} className="btn-solid hidden !min-h-11 !px-4 whitespace-nowrap lg:inline-flex">
            {n.devis}
          </Link>
        </div>
      </div>

      {open && (
        <div id="menu" style={{ top: panelTop }} className="fade-in fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-paper px-6 pt-6 pb-28 lg:hidden">
          <nav aria-label={n.menu}>
            <ul className="divide-y divide-line border-y border-line">
              {links.map((l) => (
                <li key={l.to}>
                  <Link href={l.to} onClick={() => setOpen(false)} className="display block py-4 text-[1.75rem] text-night">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">{langSwitch}</div>
          <a href={`tel:${site.tel}`} className="mt-6 flex items-center gap-2 text-[1.125rem] font-semibold text-night">
            <PhoneIcon /> {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Demander un devis » + « Appeler », toujours visibles. */
export function MobileBar() {
  const { lang, d } = useLocale();
  const pathname = usePathname();
  if (pathname === href(lang, "devis")) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <Link href={href(lang, "devis")} className="btn-solid flex-1 !px-3">
          {d.nav.devis}
        </Link>
        <a href={`tel:${site.tel}`} className="btn-solid night !px-4" aria-label={`${d.nav.call} ${site.phone}`}>
          <PhoneIcon /> {d.nav.call}
        </a>
      </div>
    </div>
  );
}

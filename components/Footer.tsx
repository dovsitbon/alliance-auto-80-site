import Link from "next/link";
import site from "@/data/site.json";
import type { Dict, Locale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { Logo } from "@/components/Logo";
import { PhoneIcon, PinIcon } from "@/components/icons";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const f = d.footer;
  const links = [
    { label: d.nav.devis, to: href(lang, "devis") },
    { label: d.tarifsPage.title, to: href(lang, "tarifs") },
    { label: d.pages.camon.title, to: href(lang, "camon") },
    { label: d.pages.vidange.title, to: href(lang, "vidange") },
  ];
  return (
    <footer className="bg-night-deep pb-24 text-paper/85 lg:pb-0">
      <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Logo className="h-9 w-auto text-paper" title="Alliance Auto 80, garage automobile à Camon" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-paper/70">{f.tagline}</p>
        </div>
        <div>
          <p className="eyebrow !text-orange">{f.contact}</p>
          <address className="mt-4 text-[0.9375rem] leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
            <br />
            <a href={site.maps} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-2 underline-offset-4 hover:underline">
              <PinIcon /> {d.infos.route}
            </a>
            <br />
            <a href={`tel:${site.tel}`} className="mt-2 inline-flex items-center gap-2 font-semibold text-paper hover:text-orange">
              <PhoneIcon /> {site.phone}
            </a>
          </address>
        </div>
        <div>
          <p className="eyebrow !text-orange">{d.infos.hours}</p>
          <p className="mt-4 text-[0.9375rem] leading-relaxed whitespace-pre-line">{f.days}</p>
          <p className="mt-1 text-[0.9375rem] text-paper/65">{f.closed}</p>
        </div>
        <div>
          <p className="eyebrow !text-orange">{f.pages}</p>
          <ul className="mt-4 space-y-2 text-[0.9375rem]">
            {links.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="underline-offset-4 hover:text-paper hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[84rem] flex-wrap items-center justify-between gap-4 border-t border-paper/15 px-5 py-6 text-[0.8125rem] text-paper/65 sm:px-8">
        <p>
          © {new Date().getFullYear()} {f.rights} · SIRET {site.legal.siret}
        </p>
        <Link href={href(lang, "legal")} className="underline-offset-4 hover:text-paper hover:underline">
          {f.legal}
        </Link>
      </div>
    </footer>
  );
}

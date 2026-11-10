import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import site from "@/data/site.json";
import horaires from "@/data/horaires.json";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { img } from "@/lib/media";
import { hourLabel, money, upcomingClosures, weekRows } from "@/lib/shop";
import { href } from "@/lib/routes";
import { intlLocale } from "@/lib/locales";
import { categories, type Category } from "@/lib/tarifs";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { BeltIcon, BrakeIcon, ClutchIcon, DiagIcon, OilIcon, PhoneIcon, PinIcon, StarIcon, TyreIcon } from "@/components/icons";

/** Picto de chaque prestation (mêmes identifiants que data/tarifs.json). */
export const SERVICE_ICONS: Record<string, (p: { className?: string }) => ReactNode> = {
  entretien: OilIcon,
  embrayage: ClutchIcon,
  freins: BrakeIcon,
  distribution: BeltIcon,
  diagnostic: DiagIcon,
  pneus: TyreIcon,
};

export const alt = (d: Dict, src: string) => (d.alt as Record<string, string>)[src.split("/").pop()!.replace(/\.\w+$/, "").split("-")[0]] ?? "";

/** Photo de public/media avec ses vraies dimensions et son texte alternatif dans la langue de la page. */
export function Photo({ src, d, className = "", sizes, priority = false }: { src: string; d: Dict; className?: string; sizes: string; priority?: boolean }) {
  const i = img(src);
  return <Image src={i.src} width={i.width} height={i.height} alt={alt(d, src)} sizes={sizes} priority={priority} quality={80} className={className} />;
}

/**
 * Emplacement photo : la vraie photo si elle existe (data/photos.json), sinon un panneau gris (ou bleu nuit)
 * à trame technique, avec le picto du sujet. Jamais de fausse photo.
 */
export function Slot({ src, d, sizes, className = "", icon, label, priority = false, dark = false, imgClass = "" }: { src: string | null; d: Dict; sizes: string; className?: string; icon?: ReactNode; label?: string; priority?: boolean; dark?: boolean; imgClass?: string }) {
  if (src)
    return (
      <div className={`overflow-hidden rounded-md bg-gray ${className}`}>
        <Photo src={src} d={d} sizes={sizes} priority={priority} className={`size-full object-cover ${imgClass}`} />
      </div>
    );
  return (
    <div className={`slot grid place-items-center rounded-md ${dark ? "dark text-orange" : "text-night/70"} ${className}`} aria-hidden="true">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        {icon}
        {label && <span className={`text-[0.8125rem] font-medium ${dark ? "text-paper/70" : "text-night/70"}`}>{label}</span>}
      </div>
    </div>
  );
}

export function SectionHead({ eyebrow, title, lead, id, light = false, className = "" }: { eyebrow: string; title: string; lead?: string; id?: string; light?: boolean; className?: string }) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      <p className={`eyebrow flex items-center gap-3 ${light ? "!text-orange" : ""}`}>
        <span className="h-0.5 w-6 bg-orange" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">
        {title}
      </h2>
      {lead && <p className={`lead mt-4 ${light ? "!text-paper/75" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

/** Note Google (4,6/5, 139 avis), avec la date du relevé. */
export function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const r = site.rating;
  const value = new Intl.NumberFormat(intlLocale[lang], { maximumFractionDigits: 1 }).format(r.value);
  const date = new Intl.DateTimeFormat(intlLocale[lang], { month: "long", year: "numeric" }).format(new Date(r.asOf));
  return (
    <a href={site.maps} target="_blank" rel="noopener" className={`inline-flex items-center gap-2 ${className}`} title={fill(d.rating.asOf, { date })}>
      <span className="flex text-orange" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <span>
        <strong className="font-semibold">{fill(d.rating.label, { value })}</strong> · {fill(d.rating.count, { count: r.count })}
      </span>
    </a>
  );
}

export function PhoneLink({ className = "", label }: { className?: string; label?: string }) {
  return (
    <a href={`tel:${site.tel}`} className={className}>
      <PhoneIcon /> {label ?? site.phone}
    </a>
  );
}

/** Horaires de la semaine (data/horaires.json) et fermetures à venir. */
export function HoursTable({ lang, d }: { lang: Locale; d: Dict }) {
  const rows = weekRows();
  const today = new Date().toISOString().slice(0, 10);
  const closures = upcomingClosures(today);
  return (
    <div>
      <table className="w-full text-[0.9375rem]">
        <tbody>
          {rows.map((r) => (
            <tr key={r.day} className="border-b border-line last:border-0">
              <th scope="row" className="py-2 text-start font-normal capitalize">
                {d.days[r.day]}
              </th>
              <td className={`py-2 text-end tabular-nums ${r.ranges ? "" : "text-muted"}`}>
                {r.ranges ? r.ranges.map(([a, b]) => `${hourLabel(a, lang)} – ${hourLabel(b, lang)}`).join(", ") : r.day === 6 && horaires.saturdayToConfirm ? d.infos.saturday : d.infos.closedDay}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {closures.length > 0 && (
        <p className="mt-4 text-[0.875rem] text-muted">
          {d.infos.closures}
          {lang === "fr" ? " : " : ": "}
          {closures
            .map((c) => {
              const f = new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "long", timeZone: "UTC" });
              const from = f.format(new Date(c.from));
              return `${c.label[lang]} (${c.from === c.to ? from : `${from} – ${f.format(new Date(c.to))}`})`;
            })
            .join(", ")}
        </p>
      )}
    </div>
  );
}

const priceOf = (price: number | null, lang: Locale, d: Dict) => (price != null ? fill(d.tarifs.from, { price: money(price, lang) }) : null);

/** Tableau des tarifs : prestation, prix « à partir de », durée. Une ligne d'en-tête par catégorie. */
export function PriceTable({ lang, d, cats = categories, devisLinks = true, anchors = false }: { lang: Locale; d: Dict; cats?: Category[]; devisLinks?: boolean; anchors?: boolean }) {
  const t = d.tarifs;
  return (
    <div className="overflow-hidden rounded-md border border-line bg-white">
      <table className="w-full border-collapse text-start text-[0.9375rem]">
        <thead className="bg-night text-paper">
          <tr>
            <th scope="col" className="px-4 py-3 text-start font-medium sm:px-5">
              {t.head.service}
            </th>
            <th scope="col" className="w-32 px-4 py-3 text-end font-medium sm:w-40 sm:px-5">
              {t.head.price}
            </th>
            <th scope="col" className="hidden w-48 px-5 py-3 text-start font-medium sm:table-cell">
              {t.head.duration}
            </th>
          </tr>
        </thead>
        {cats.map((c) => {
          const Icon = SERVICE_ICONS[c.id];
          return (
            <tbody key={c.id} id={anchors ? c.id : undefined} className="scroll-mt-28 border-t border-line">
              <tr className="bg-mist">
                <th scope="colgroup" colSpan={3} className="px-4 py-2.5 text-start sm:px-5">
                  <span className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2.5 font-semibold">
                      {Icon && <Icon className="size-5 text-rust" />}
                      {c.name[lang]}
                    </span>
                    {devisLinks && (
                      <Link href={`${href(lang, "devis")}?b=${c.id}`} className="link-line text-[0.8125rem] font-medium text-rust">
                        {t.ask}
                      </Link>
                    )}
                  </span>
                </th>
              </tr>
              {c.items.map((s) => (
                <tr key={s.id} className="border-t border-line">
                  <th scope="row" className="px-4 py-3 text-start font-normal sm:px-5">
                    {s.name[lang]}
                    <span className="mt-0.5 block text-[0.8125rem] text-muted sm:hidden">{s.duration ? s.duration[lang] : s.confirm ? t.confirm : ""}</span>
                  </th>
                  <td className="px-4 py-3 text-end font-medium whitespace-nowrap tabular-nums sm:px-5">{priceOf(s.price, lang, d) ?? <span className="font-normal text-muted">{t.onQuote}</span>}</td>
                  <td className="hidden px-5 py-3 text-muted sm:table-cell">{s.duration ? s.duration[lang] : s.confirm ? t.confirm : "—"}</td>
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

/** Infos pratiques : adresse, carte, horaires, accès, téléphone. */
export function InfosBlock({ lang, d }: { lang: Locale; d: Dict }) {
  const i = d.infos;
  return (
    <section id="infos" aria-labelledby="infos-title" className="border-t border-line bg-mist">
      <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <SectionHead eyebrow={i.eyebrow} title={i.title} id="infos-title" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="eyebrow">{i.address}</dt>
              <dd className="mt-3 leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}
                <br />
                <a href={site.maps} target="_blank" rel="noopener" className="link-line mt-2 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  <PinIcon /> {i.route}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">{i.phone}</dt>
              <dd className="mt-3">
                <PhoneLink className="display inline-flex items-center gap-2 text-[1.6rem] [&_svg]:size-5" />
                <div className="mt-2 text-[0.875rem] text-muted">
                  <OpenStatus />
                </div>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="eyebrow">{i.hours}</dt>
              <dd className="mt-3">
                <HoursTable lang={lang} d={d} />
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="eyebrow">{i.access}</dt>
              <dd className="mt-3 leading-relaxed text-muted">{i.accessText}</dd>
            </div>
          </dl>
        </div>
        <Reveal className="min-h-[22rem] overflow-hidden rounded-md border border-line bg-gray lg:min-h-0">
          <iframe title={i.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full min-h-[22rem] border-0 grayscale-[0.4]" />
        </Reveal>
      </div>
    </section>
  );
}

export function Faq({ d, className = "" }: { d: Dict; className?: string }) {
  return (
    <section aria-labelledby="faq-title" className={`mx-auto max-w-[84rem] px-5 py-20 sm:px-8 lg:py-24 ${className}`}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} id="faq-title" />
        <div className="divide-y divide-line border-y border-line">
          {d.faq.items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0625rem] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full border border-line text-[1.1rem] leading-none text-rust transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bloc d'appel à l'action « Demander un devis / Appeler ». */
export function DevisCta({ lang, d, label, query = "", light = false }: { lang: Locale; d: Dict; label?: string; query?: string; light?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={`${href(lang, "devis")}${query}`} className="btn-solid">
        {label ?? d.nav.devis}
      </Link>
      <a href={`tel:${site.tel}`} className={`btn-line ${light ? "on-dark text-paper" : "text-night"}`}>
        <PhoneIcon /> {site.phone}
      </a>
    </div>
  );
}

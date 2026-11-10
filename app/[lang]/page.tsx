import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { fill, getDict, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { slot, tileSlot } from "@/lib/media";
import { href } from "@/lib/routes";
import { categories, fromPrice } from "@/lib/tarifs";
import { money } from "@/lib/shop";
import { intlLocale } from "@/lib/locales";
import { faqJsonLd } from "@/lib/jsonld";
import { Faq, InfosBlock, Photo, PriceTable, Rating, SectionHead, SERVICE_ICONS, Slot } from "@/components/Blocks";
import { OpenStatus } from "@/components/OpenStatus";
import { Reveal } from "@/components/Reveal";
import { Emblem } from "@/components/Logo";
import { ArrowIcon, CarIcon, ClutchIcon, OilIcon, PhoneIcon, QuoteIcon, StarIcon, TagIcon, WrenchIcon } from "@/components/icons";

type TileId = keyof Dict["tiles"]["items"];
const TILES: TileId[] = ["entretien", "embrayage", "freins", "distribution", "diagnostic", "pneus"];
const tileHref = (lang: Locale, id: TileId) => (id === "entretien" ? href(lang, "vidange") : href(lang, "tarifs", id));

/** Hero plein écran : la photo de l'atelier (ou un panneau bleu nuit tant qu'elle n'est pas prise), champ immatriculation → devis. */
function Hero({ lang, d }: { lang: Locale; d: Dict }) {
  const h = d.hero;
  const photo = slot("hero");
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-night text-paper lg:min-h-[calc(100svh-5rem)]">
      {photo ? (
        <>
          <Photo src={photo} d={d} priority sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_32_51/0.92),rgb(20_32_51/0.55)_55%,rgb(20_32_51/0.25))]" aria-hidden="true" />
        </>
      ) : (
        <div className="slot dark absolute inset-0 -z-10 !rounded-none text-paper/[0.08]" aria-hidden="true">
          <Emblem mono className="absolute -end-[12vw] top-1/2 size-[min(78vw,46rem)] -translate-y-1/2 lg:end-[4vw]" />
        </div>
      )}
      <div className="mx-auto w-full max-w-[84rem] px-5 pt-16 pb-12 sm:px-8 lg:pb-20">
        <p className="eyebrow rise !text-orange">{h.eyebrow}</p>
        <h1 id="hero-title" className="display rise mt-5 max-w-[13ch] text-[clamp(2.75rem,7.4vw,6.4rem)] [animation-delay:0.08s]">
          {h.title}
        </h1>
        <p className="rise mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-paper/80 [animation-delay:0.16s]">{h.lead}</p>

        <form action={href(lang, "devis")} method="get" className="rise mt-9 max-w-2xl [animation-delay:0.24s]">
          <label htmlFor="hero-vehicle" className="mb-2 block text-[0.875rem] font-medium text-paper/85">
            {h.field}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="hero-vehicle" name="v" autoComplete="off" maxLength={80} placeholder={h.fieldPh} className="field plate min-h-12 flex-1 !border-paper/30" />
            <button type="submit" className="btn-solid min-h-12 whitespace-nowrap">
              {h.devis}
              <ArrowIcon />
            </button>
            <a href={`tel:${site.tel}`} className="btn-line on-dark min-h-12 whitespace-nowrap text-paper">
              <PhoneIcon /> {h.call}
            </a>
          </div>
        </form>

        <div className="rise mt-7 flex flex-col gap-2 text-[0.9375rem] text-paper/85 [animation-delay:0.32s] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
          <Rating lang={lang} d={d} className="hover:text-paper" />
          <OpenStatus />
        </div>
      </div>
    </section>
  );
}

/** Tuiles de prestations juste après le hero, avec prix « à partir de ». */
function Tiles({ lang, d }: { lang: Locale; d: Dict }) {
  const t = d.tiles;
  return (
    <section id="services" aria-labelledby="tiles-title" className="mx-auto max-w-[84rem] px-5 pt-16 pb-20 sm:px-8 lg:pt-24">
      <SectionHead eyebrow={t.eyebrow} title={t.title} id="tiles-title" />
      <ul className="mt-10 grid grid-cols-1 gap-3 min-[520px]:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {TILES.map((id, i) => {
          const it = t.items[id];
          const p = fromPrice(id);
          const Icon = SERVICE_ICONS[id];
          const photo = tileSlot(id);
          return (
            <Reveal as="li" key={id} delay={(i % 3) * 0.05} className="h-full">
              <Link href={tileHref(lang, id)} className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-night/40 hover:shadow-[0_10px_30px_-18px_rgb(27_42_65/0.45)]">
                {photo && <Slot src={photo} d={d} sizes="(min-width:1024px) 30vw, (min-width:520px) 48vw, 100vw" className="shine aspect-[16/9] !rounded-none" />}
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  {!photo && <Icon className="size-10 text-rust" />}
                  <h3 className={`display flex items-center justify-between gap-2 text-[1.45rem] ${photo ? "" : "mt-6"}`}>
                    {it.title}
                    <ArrowIcon className="size-5 shrink-0 text-rust transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100" />
                  </h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{it.text}</p>
                  <p className="mt-5 border-t border-line pt-4 text-[0.9375rem] font-semibold tabular-nums">{p != null ? fill(t.from, { price: money(p, lang) }) : <span className="font-medium text-muted">{t.onQuote}</span>}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/** Bande de services : 4 pictos. */
function Strip({ d }: { d: Dict }) {
  const icons = [QuoteIcon, TagIcon, CarIcon, PhoneIcon];
  return (
    <section aria-label={d.strip.label} className="bg-night text-paper">
      <ul className="mx-auto grid max-w-[84rem] grid-cols-2 lg:grid-cols-4">
        {d.strip.items.map((it, i) => {
          const Icon = icons[i];
          const inner = (
            <>
              <Icon className="size-8 text-orange" />
              <span className="display mt-5 block text-[1.2rem] sm:text-[1.35rem]">{it.title}</span>
              <span className="mt-2 block text-[0.875rem] leading-relaxed text-paper/75">{it.text}</span>
            </>
          );
          return (
            <Reveal as="li" key={it.title} delay={i * 0.05} className={`px-5 py-10 sm:px-8 lg:py-12 ${i % 2 ? "border-s border-paper/12" : ""} ${i > 1 ? "border-t border-paper/12 lg:border-t-0" : ""} ${i === 2 ? "lg:border-s" : ""}`}>
              {i === 3 ? (
                <a href={`tel:${site.tel}`} className="block hover:text-orange">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/** Tarifs indicatifs en tableau (deux prestations par catégorie ; la page Tarifs donne tout). */
function Tarifs({ lang, d }: { lang: Locale; d: Dict }) {
  const t = d.tarifs;
  const short = categories.map((c) => ({ ...c, items: c.items.slice(0, 2) }));
  return (
    <section id="tarifs" aria-labelledby="tarifs-title" className="border-y border-line bg-mist">
      <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.7fr] lg:gap-16 lg:py-24">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} id="tarifs-title" />
          <p className="mt-5 text-[0.875rem] text-muted">{t.note}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href={href(lang, "devis")} className="btn-solid">
              {d.nav.devis}
            </Link>
            <Link href={href(lang, "tarifs")} className="link-line font-medium text-night">
              {t.all}
            </Link>
          </div>
          <Rating lang={lang} d={d} className="mt-6 text-[0.875rem] text-muted hover:text-ink" />
        </div>
        <Reveal>
          <PriceTable lang={lang} d={d} cats={short} />
        </Reveal>
      </div>
    </section>
  );
}

/** Bloc alterné : photo + texte court + un seul bouton. */
function Feature({ id, eyebrow, title, text, action, media, flip = false }: { id: string; eyebrow: string; title: string; text: string; action: ReactNode; media: ReactNode; flip?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-[84rem] px-5 py-12 sm:px-8 lg:py-16">
      <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-20">
        <Reveal className={flip ? "md:order-2" : ""}>{media}</Reveal>
        <Reveal delay={0.08} className="max-w-xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-0.5 w-6 bg-orange" aria-hidden="true" />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)]">
            {title}
          </h2>
          <p className="lead mt-5">{text}</p>
          <div className="mt-8">{action}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Features({ lang, d }: { lang: Locale; d: Dict }) {
  const b = d.blocks;
  const box = (src: string | null) => (src ? "aspect-[4/3] md:aspect-[5/4]" : "aspect-[4/3]");
  return (
    <div className="py-8 lg:py-12">
      <Feature
        id="entretien"
        {...b.entretien}
        action={
          <Link href={`${href(lang, "devis")}?b=entretien`} className="btn-solid">
            {b.entretien.cta}
          </Link>
        }
        media={<Slot src={slot("entretien")} d={d} sizes="(min-width:768px) 45vw, 100vw" className={box(slot("entretien"))} icon={<OilIcon className="size-16" />} label={d.tiles.items.entretien.title} />}
      />
      <Feature
        id="mecanique"
        {...b.reparations}
        flip
        action={
          <Link href={`${href(lang, "devis")}?b=embrayage`} className="btn-solid">
            {b.reparations.cta}
          </Link>
        }
        media={<Slot src={slot("reparations")} d={d} sizes="(min-width:768px) 45vw, 100vw" className={box(slot("reparations"))} icon={<ClutchIcon className="size-16" />} label={`${d.tiles.items.embrayage.title} · ${d.tiles.items.distribution.title}`} dark />}
      />
      <Feature
        id="transparence"
        {...b.transparence}
        action={
          <a href={`tel:${site.tel}`} className="btn-solid night">
            <PhoneIcon /> {b.transparence.cta}
          </a>
        }
        media={<Slot src={slot("transparence")} d={d} sizes="(min-width:768px) 45vw, 100vw" className={box(slot("transparence"))} icon={<WrenchIcon className="size-16" />} label={b.transparence.eyebrow} />}
      />
    </div>
  );
}

type Avis = { author: string; date: string; rating: number; text: Record<Locale, string> };

/** Avis : la note Google et les thèmes qui reviennent ; les vrais avis s'ajoutent dans data/avis.json (aucun inventé). */
function Reviews({ lang, d }: { lang: Locale; d: Dict }) {
  const r = d.reviews;
  const value = new Intl.NumberFormat(intlLocale[lang], { maximumFractionDigits: 1 }).format(site.rating.value);
  const items = avis.items as Avis[];
  return (
    <section aria-labelledby="reviews-title" className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 lg:py-20">
      <Reveal className="grid items-center gap-10 rounded-md border border-line bg-white p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:gap-16 lg:p-12">
        <div className="flex items-end gap-5">
          <p className="display text-[clamp(4.5rem,9vw,6.5rem)] leading-[0.8] text-night">{value}</p>
          <div className="pb-1">
            <span className="flex text-orange" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="size-4" />
              ))}
            </span>
            <p className="eyebrow mt-2">{r.eyebrow}</p>
            <p className="mt-1 text-[0.875rem] text-muted">{fill(d.rating.count, { count: site.rating.count })}</p>
          </div>
        </div>
        <div>
          <h2 id="reviews-title" className="display text-[clamp(1.6rem,3vw,2.2rem)]">
            {r.title}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {r.themes.map((t) => (
              <li key={t} className="rounded-full border border-line bg-mist px-4 py-1.5 text-[0.9375rem]">
                {t}
              </li>
            ))}
          </ul>
          <a href={site.maps} target="_blank" rel="noopener" className="link-line mt-6 inline-block text-[0.9375rem] font-medium text-night">
            {r.cta}
          </a>
        </div>
      </Reveal>
      {items.length > 0 ? (
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((a) => (
            <Reveal as="li" key={a.author + a.date} className="rounded-md border border-line bg-white p-7">
              <span className="flex text-orange" aria-label={`${a.rating}/5`}>
                {Array.from({ length: a.rating }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <blockquote className="mt-4 leading-relaxed">{a.text[lang]}</blockquote>
              <p className="mt-4 text-[0.875rem] text-muted">
                {a.author} · Google, {a.date}
              </p>
            </Reveal>
          ))}
        </ul>
      ) : (
        <div hidden dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json), avec l'accord du garage --><!-- À REMPLIR avec de vrais avis clients --><!-- À REMPLIR avec de vrais avis clients -->" }} />
      )}
    </section>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(d.faq.items)) }} />
      <Hero lang={lang} d={d} />
      <Tiles lang={lang} d={d} />
      <Strip d={d} />
      <Tarifs lang={lang} d={d} />
      <Features lang={lang} d={d} />
      <Reviews lang={lang} d={d} />
      <InfosBlock lang={lang} d={d} />
      <Faq d={d} />
    </>
  );
}

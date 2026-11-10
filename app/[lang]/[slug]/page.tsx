import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { href, PAGES, pageOf, type PageId } from "@/lib/routes";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { ogLocale } from "@/lib/locales";
import { money } from "@/lib/shop";
import { categories, categoryOf, fromPrice } from "@/lib/tarifs";
import { slot } from "@/lib/media";
import { DevisCta, Faq, PhoneLink, PriceTable, Rating, SERVICE_ICONS, Slot } from "@/components/Blocks";
import { DevisForm } from "@/components/DevisForm";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { CarIcon, OilIcon } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.values(PAGES).map((s) => ({ lang, slug: s[lang] })));
}

function metaOf(id: PageId, d: Dict) {
  if (id === "legal") return { title: d.legal.metaTitle, description: d.meta.description };
  if (id === "devis") return { title: `${d.devis.title} | Alliance Auto 80, garage à Camon`, description: d.devis.lead };
  if (id === "tarifs") return { title: d.tarifsPage.metaTitle, description: d.tarifsPage.metaDescription };
  const p = d.pages[id];
  return { title: p.metaTitle, description: p.metaDescription };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const id = pageOf(lang, slug);
  if (!id) return {};
  const d = getDict(lang);
  const m = metaOf(id, d);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: href(lang, id),
      languages: { ...Object.fromEntries(locales.map((l) => [l, href(l, id)])), "x-default": href("fr", id) },
    },
    openGraph: { type: "website", url: href(lang, id), siteName: site.name, title: m.title, description: m.description, locale: ogLocale[lang], images: [{ url: "/og.jpg", width: 1200, height: 630, alt: d.meta.ogAlt }] },
    robots: id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="h-0.5 w-6 bg-orange" aria-hidden="true" />
      {children}
    </p>
  );
}

function PageHero({ eyebrow, title, intro, media, children }: { eyebrow: string; title: string; intro: string; media: ReactNode; children?: ReactNode }) {
  return (
    <section className="mx-auto grid max-w-[84rem] items-center gap-10 px-5 pt-10 pb-16 sm:px-8 md:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-16 lg:pb-20">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display mt-5 text-[clamp(2.5rem,5.6vw,4.4rem)]">{title}</h1>
        <p className="lead mt-6 max-w-xl">{intro}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
      {media}
    </section>
  );
}

type SeoPage = Dict["pages"]["camon"] | Dict["pages"]["vidange"];

/** Pages SEO locales (Garage à Camon, Vidange près d'Amiens) : hero, prestations, étapes, tarifs, FAQ. */
function ServicePage({ lang, d, p, cats, media, query }: { lang: Locale; d: Dict; p: SeoPage; cats: string[]; media: ReactNode; query: string }) {
  const list = cats.map((id) => categoryOf(id)).filter((c) => !!c);
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} intro={p.intro} media={media}>
        <DevisCta lang={lang} d={d} label={p.cta} query={query} />
        <div className="mt-6 flex flex-col gap-2 text-[0.9375rem] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
          <Rating lang={lang} d={d} className="hover:text-ink" />
          <OpenStatus />
        </div>
      </PageHero>
      <section className="border-y border-line bg-mist">
        <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.6rem)]">{p.listTitle}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.list.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="rounded-md border border-line bg-white p-6">
                <span className="display text-[1.1rem] text-rust tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-3 text-[1.3rem]">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl border-s-2 border-orange ps-5 text-[1.0625rem] leading-relaxed">{p.extra}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
        <div>
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.6rem)]">{p.howTitle}</h2>
          <ol className="mt-10 space-y-8">
            {p.how.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="grid grid-cols-[2.75rem_1fr] gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-night font-semibold text-paper tabular-nums">{i + 1}</span>
                <div>
                  <h3 className="text-[1.0625rem] font-semibold">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.6rem)]">{d.tarifs.title}</h2>
          <div className="mt-8">
            <PriceTable lang={lang} d={d} cats={list} />
          </div>
          <p className="mt-4 text-[0.8125rem] text-muted">{d.tarifs.note}</p>
          <Link href={href(lang, "tarifs")} className="link-line mt-5 inline-block font-medium text-night">
            {d.tarifs.all}
          </Link>
        </div>
      </section>
      <section className="bg-night text-paper">
        <div className="mx-auto flex max-w-[84rem] flex-col items-center px-5 py-16 text-center sm:px-8 lg:py-20">
          <p className="display max-w-2xl text-[clamp(1.9rem,4vw,3rem)]">{d.hero.title}</p>
          <div className="mt-9">
            <DevisCta lang={lang} d={d} label={p.cta} query={query} light />
          </div>
        </div>
      </section>
      <Faq d={d} />
    </>
  );
}

/** Page Tarifs : cartes « à partir de » par prestation, puis le tableau complet (prestation, prix, durée). */
function TarifsPage({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.tarifsPage;
  const t = d.tarifs;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(d.faq.items)) }} />
      <section className="mx-auto max-w-[84rem] px-5 pt-10 pb-12 sm:px-8 lg:pt-16">
        <Eyebrow>{p.eyebrow}</Eyebrow>
        <h1 className="display mt-5 text-[clamp(2.5rem,5.6vw,4.4rem)]">{p.title}</h1>
        <p className="lead mt-5 max-w-2xl">{p.lead}</p>
        <div className="mt-7 flex flex-col gap-2 text-[0.9375rem] text-muted sm:flex-row sm:flex-wrap sm:gap-x-6">
          <Rating lang={lang} d={d} className="hover:text-ink" />
          <OpenStatus />
        </div>
      </section>
      <section aria-label={t.cardsTitle} className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => {
            const Icon = SERVICE_ICONS[c.id];
            const price = fromPrice(c.id);
            return (
              <li key={c.id}>
                <a href={`#${c.id}`} className="flex h-full flex-col rounded-md border border-line bg-white p-5 transition-colors hover:border-night/40">
                  {Icon && <Icon className="size-8 text-rust" />}
                  <span className="mt-4 font-semibold">{c.name[lang]}</span>
                  <span className="mt-1 text-[0.875rem] text-muted tabular-nums">{price != null ? fill(t.from, { price: money(price, lang) }) : t.onQuote}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mx-auto grid max-w-[84rem] gap-10 px-5 pt-12 pb-20 sm:px-8 lg:grid-cols-[1.8fr_1fr] lg:gap-14 lg:pb-24">
        <div>
          <PriceTable lang={lang} d={d} anchors />
          <p className="mt-4 text-[0.875rem] text-muted">{t.note}</p>
        </div>
        <aside className="h-fit rounded-md bg-night p-7 text-paper lg:sticky lg:top-28">
          <p className="display text-[1.6rem]">{d.devis.title}</p>
          <p className="mt-3 leading-relaxed text-paper/80">{d.devis.lead}</p>
          <div className="mt-6">
            <DevisCta lang={lang} d={d} light />
          </div>
          <div className="mt-5 text-[0.875rem] text-paper/80">
            <OpenStatus />
          </div>
        </aside>
      </section>
      <Faq d={d} className="border-t border-line" />
    </>
  );
}

function DevisPage({ lang, d }: { lang: Locale; d: Dict }) {
  const b = d.devis;
  return (
    <section className="mx-auto grid max-w-[84rem] gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1fr_20rem] lg:gap-16 lg:pt-16 lg:pb-24">
      <div className="max-w-3xl">
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <h1 className="display mt-5 text-[clamp(2.4rem,5.6vw,4rem)]">{b.title}</h1>
        <p className="lead mt-5 max-w-2xl">{b.lead}</p>
        <div className="mt-10">
          <DevisForm />
        </div>
      </div>
      <aside className="h-fit space-y-6 lg:sticky lg:top-28">
        <div className="rounded-md bg-night p-7 text-paper">
          <p className="display text-[1.5rem]">{b.preferCall}</p>
          <PhoneLink className="mt-4 inline-flex items-center gap-2 text-[1.3rem] font-semibold hover:text-orange [&_svg]:size-5" />
          <div className="mt-3 text-[0.875rem] text-paper/80">
            <OpenStatus />
          </div>
        </div>
        <div className="space-y-2 px-1 text-[0.875rem] text-muted">
          <Rating lang={lang} d={d} className="hover:text-ink" />
          <p>
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </p>
          <p className="whitespace-pre-line">{d.footer.days}</p>
        </div>
      </aside>
    </section>
  );
}

function Legal({ d }: { d: Dict }) {
  const l = d.legal;
  const g = site.legal;
  const rows: [string, string][] = [
    [l.editor, `${fill(l.editorText, { company: g.company })} ${fill(l.siret, { siret: g.siret })}`],
    [l.host, g.host],
    [l.data, l.dataText],
    [l.cookies, l.cookiesText],
  ];
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <h1 className="display text-[clamp(2.4rem,5vw,3.4rem)]">{l.title}</h1>
      <dl className="mt-10 space-y-8">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="eyebrow">{k}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const id = pageOf(lang, slug);
  if (!id) notFound();
  const d = getDict(lang);
  const m = metaOf(id, d);
  const crumbs = breadcrumbJsonLd(lang, m.title.split(" | ")[0], href(lang, id));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {id === "devis" && <DevisPage lang={lang} d={d} />}
      {id === "tarifs" && <TarifsPage lang={lang} d={d} />}
      {id === "camon" && (
        <ServicePage
          lang={lang}
          d={d}
          p={d.pages.camon}
          cats={["entretien", "freins", "embrayage"]}
          query=""
          media={<Slot src={slot("facade") ?? slot("atelier")} d={d} priority sizes="(min-width:768px) 45vw, 100vw" className="aspect-[4/3]" icon={<CarIcon className="size-20" />} label={`${site.address.city} · ${site.address.postalCode}`} dark />}
        />
      )}
      {id === "vidange" && (
        <ServicePage
          lang={lang}
          d={d}
          p={d.pages.vidange}
          cats={["entretien"]}
          query="?b=entretien"
          media={<Slot src={slot("entretien")} d={d} priority sizes="(min-width:768px) 45vw, 100vw" className="aspect-[4/3]" icon={<OilIcon className="size-20" />} label={d.tiles.items.entretien.title} />}
        />
      )}
      {id === "legal" && <Legal d={d} />}
    </>
  );
}

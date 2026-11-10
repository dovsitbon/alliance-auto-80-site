"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { CameraIcon, CloseIcon, PhoneIcon } from "@/components/icons";
import { emptyDevis, isEmail, isPhone, MAX_PHOTOS, NEEDS, type Devis, type NeedId } from "@/lib/devis";
import { fill } from "@/lib/i18n";
import { parisNow } from "@/lib/shop";

type Errors = Partial<Record<"vehicle" | "need" | "name" | "phone" | "email" | "photo" | "generic", string>>;
type Done = { notified: boolean; confirmed: boolean };
type Shot = { blob: Blob; url: string };

const MAX_SIDE = 1400;

/** Réduit chaque photo dans le navigateur (JPEG ≤ 1400 px) : trois photos restent sous la limite d'envoi. */
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  return new Promise((ok, ko) => canvas.toBlob((b) => (b ? ok(b) : ko(new Error("photo"))), "image/jpeg", 0.8));
}

function Fieldset({ legend, children, hint, step }: { legend: string; children: ReactNode; hint?: string; step: number }) {
  return (
    <fieldset className="border-t border-line pt-8">
      <legend className="display float-left flex w-full items-center gap-3 text-[1.6rem]">
        <span className="grid size-8 place-items-center rounded-full bg-night font-[family-name:var(--font-inter)] text-[0.875rem] font-semibold tracking-normal text-paper tabular-nums">{step}</span>
        {legend}
      </legend>
      {hint && <p className="clear-left pt-2 text-[0.875rem] text-muted">{hint}</p>}
      <div className="clear-left space-y-6 pt-6">{children}</div>
    </fieldset>
  );
}

const Err = ({ id, children }: { id?: string; children?: string }) =>
  children ? (
    <p id={id} role="alert" className="mt-2 text-[0.875rem] text-[#b42318]">
      {children}
    </p>
  ) : null;

/**
 * Demande de devis : immatriculation ou modèle, kilométrage, besoin, 1 à 3 photos, date souhaitée, coordonnées, message.
 * Envoi à /api/devis (e-mail au garage avec les photos + confirmation au client, via Resend).
 * Préremplissage : ?v=<immatriculation ou modèle> (champ du hero), ?b=<besoin> (tableau des tarifs, blocs).
 */
export function DevisForm() {
  const { lang, d } = useLocale();
  const uid = useId();
  const reduce = useReducedMotion();
  const f = d.devis.fields;
  const [q, setQ] = useState<Devis>(emptyDevis);
  const [shots, setShots] = useState<Shot[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const [minDate, setMinDate] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const shotsRef = useRef<Shot[]>([]);
  useEffect(() => {
    shotsRef.current = shots;
  }, [shots]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = (params.get("v") ?? "").trim().slice(0, 80);
    const b = params.get("b") ?? "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- paramètres d'URL, lisibles seulement côté client
    setMinDate(parisNow().iso);
    setQ((x) => ({ ...x, vehicle: v || x.vehicle, needs: (NEEDS as readonly string[]).includes(b) ? [b as NeedId] : x.needs }));
  }, []);

  useEffect(() => () => shotsRef.current.forEach((s) => URL.revokeObjectURL(s.url)), []);

  const set = <K extends keyof Devis>(k: K, v: Devis[K]) => setQ((x) => ({ ...x, [k]: v }));
  const err = d.devis.errors;

  async function addPhotos(files: FileList | null) {
    setErrors((e) => ({ ...e, photo: undefined }));
    if (!files) return;
    const room = MAX_PHOTOS - shots.length;
    const next: Shot[] = [];
    for (const file of Array.from(files).slice(0, room)) {
      try {
        const blob = await shrink(file);
        next.push({ blob, url: URL.createObjectURL(blob) });
      } catch {
        setErrors((e) => ({ ...e, photo: err.photo }));
      }
    }
    setShots((s) => [...s, ...next].slice(0, MAX_PHOTOS));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePhoto(i: number) {
    setShots((s) => {
      URL.revokeObjectURL(s[i].url);
      return s.filter((_, j) => j !== i);
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!q.vehicle.trim()) next.vehicle = err.vehicle;
    if (!q.needs.length && !q.details.trim() && !q.message.trim()) next.need = err.need;
    if (!q.name.trim()) next.name = err.name;
    if (!isPhone(q.phone)) next.phone = err.phone;
    if (q.email && !isEmail(q.email)) next.email = err.email;
    setErrors(next);
    if (Object.keys(next).length) {
      document.querySelector<HTMLElement>(`[data-err="${Object.keys(next)[0]}"]`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
      return;
    }
    setSending(true);
    try {
      const body = new FormData();
      body.set("lang", lang);
      body.set("data", JSON.stringify(q));
      shots.forEach((s, i) => body.append("photos", s.blob, `photo-${i + 1}.jpg`));
      const r = await fetch("/api/devis", { method: "POST", body });
      const json = (await r.json()) as { ok: boolean } & Done;
      if (!r.ok || !json.ok) throw new Error();
      setDone({ notified: json.notified, confirmed: json.confirmed });
      topRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    } catch {
      setErrors({ generic: err.generic });
    } finally {
      setSending(false);
    }
  }

  const fade = reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] as const } };
  const s = d.devis.success;
  const toggleNeed = (n: NeedId) => set("needs", q.needs.includes(n) ? q.needs.filter((x) => x !== n) : [...q.needs, n]);

  return (
    <div ref={topRef} className="scroll-mt-28">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" {...fade} role="status" className="rounded-md border border-line bg-white p-8 sm:p-10">
            <p className="display text-[clamp(1.9rem,4vw,2.4rem)]">{s.title}</p>
            <p className="lead mt-4">{s.text}</p>
            {done.confirmed && <p className="mt-3 text-muted">{s.email}</p>}
            {!done.notified && (
              <div className="mt-6 border-t border-line pt-6">
                <p>{s.notNotified}</p>
                <a href={`tel:${site.tel}`} className="btn-solid mt-4">
                  <PhoneIcon /> {site.phone}
                </a>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setDone(null);
                setQ(emptyDevis());
                setShots([]);
              }}
              className="link-line mt-8 inline-block text-[0.9375rem] font-medium"
            >
              {s.again}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" {...fade} onSubmit={submit} noValidate className="space-y-10">
            <Fieldset step={1} legend={d.devis.sections.vehicle}>
              <div className="grid gap-6 sm:grid-cols-[1.6fr_1fr]">
                <div data-err="vehicle">
                  <label htmlFor={`${uid}-v`} className="label">
                    {f.vehicle}
                  </label>
                  <input id={`${uid}-v`} value={q.vehicle} maxLength={80} autoComplete="off" onChange={(e) => set("vehicle", e.target.value)} placeholder={f.vehiclePh} aria-invalid={!!errors.vehicle} aria-describedby={`${uid}-v-h${errors.vehicle ? ` ${uid}-v-e` : ""}`} className="field plate" />
                  <p id={`${uid}-v-h`} className="mt-2 text-[0.8125rem] text-muted">
                    {f.vehicleHint}
                  </p>
                  <Err id={`${uid}-v-e`}>{errors.vehicle}</Err>
                </div>
                <div>
                  <label htmlFor={`${uid}-km`} className="label">
                    {f.mileage}
                  </label>
                  <input id={`${uid}-km`} inputMode="numeric" maxLength={12} value={q.mileage} onChange={(e) => set("mileage", e.target.value.replace(/[^\d\s]/g, ""))} placeholder={f.mileagePh} className="field tabular-nums" />
                </div>
              </div>
            </Fieldset>

            <Fieldset step={2} legend={d.devis.sections.need}>
              <div data-err="need" className="space-y-6">
                <div role="group" aria-label={f.needsLabel}>
                  <p className="label">
                    {f.needsLabel} <span className="font-normal text-muted">({f.needsHint})</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {NEEDS.map((n) => (
                      <label key={n} className="chip">
                        <input type="checkbox" name="needs" checked={q.needs.includes(n)} onChange={() => toggleNeed(n)} className="sr-only" />
                        {d.devis.needs[n]}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor={`${uid}-dt`} className="label">
                    {f.details}
                  </label>
                  <textarea id={`${uid}-dt`} rows={3} value={q.details} onChange={(e) => set("details", e.target.value)} placeholder={f.detailsPh} className="field resize-y" />
                </div>
                <Err>{errors.need}</Err>
              </div>
            </Fieldset>

            <Fieldset step={3} legend={d.devis.sections.photos} hint={f.photosHint}>
              <div>
                <input ref={fileRef} id={`${uid}-ph`} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(e.target.files)} />
                <ul className="flex flex-wrap gap-3">
                  {shots.map((sh, i) => (
                    <li key={sh.url} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element -- aperçu local (blob:) */}
                      <img src={sh.url} alt="" className="size-24 rounded-md object-cover sm:size-28" />
                      <button type="button" onClick={() => removePhoto(i)} aria-label={`${f.photoRemove} ${i + 1}`} className="absolute -end-2 -top-2 grid size-8 place-items-center rounded-full bg-night text-paper">
                        <CloseIcon className="size-3.5" />
                      </button>
                    </li>
                  ))}
                  {shots.length < MAX_PHOTOS && (
                    <li>
                      <label htmlFor={`${uid}-ph`} className="slot grid size-24 cursor-pointer place-items-center text-night transition-colors hover:bg-gray sm:size-28">
                        <span className="flex flex-col items-center gap-1.5 text-center text-[0.8125rem] leading-tight font-medium">
                          <CameraIcon className="size-6" />
                          {f.photos}
                        </span>
                      </label>
                    </li>
                  )}
                </ul>
                <p className="mt-3 text-[0.8125rem] text-muted tabular-nums">{fill(f.photosCount, { count: shots.length })}</p>
                <Err>{errors.photo}</Err>
              </div>
            </Fieldset>

            <Fieldset step={4} legend={d.devis.sections.date}>
              <div className="max-w-xs">
                <label htmlFor={`${uid}-date`} className="label">
                  {f.date}
                </label>
                <input id={`${uid}-date`} type="date" min={minDate} value={q.date} onChange={(e) => set("date", e.target.value)} aria-describedby={`${uid}-date-h`} className="field" />
                <p id={`${uid}-date-h`} className="mt-2 text-[0.8125rem] text-muted">
                  {f.dateHint}
                </p>
              </div>
            </Fieldset>

            <Fieldset step={5} legend={d.devis.sections.contact}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div data-err="name">
                  <label htmlFor={`${uid}-n`} className="label">
                    {f.name}
                  </label>
                  <input id={`${uid}-n`} autoComplete="name" value={q.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-n-e` : undefined} className="field" />
                  <Err id={`${uid}-n-e`}>{errors.name}</Err>
                </div>
                <div data-err="phone">
                  <label htmlFor={`${uid}-p`} className="label">
                    {f.phone}
                  </label>
                  <input id={`${uid}-p`} type="tel" autoComplete="tel" inputMode="tel" value={q.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${uid}-p-e` : undefined} className="field" />
                  <Err id={`${uid}-p-e`}>{errors.phone}</Err>
                </div>
                <div data-err="email" className="sm:col-span-2">
                  <label htmlFor={`${uid}-e`} className="label">
                    {f.email} <span className="font-normal text-muted">{f.emailHint}</span>
                  </label>
                  <input id={`${uid}-e`} type="email" autoComplete="email" value={q.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-e-e` : undefined} className="field" />
                  <Err id={`${uid}-e-e`}>{errors.email}</Err>
                </div>
              </div>
              <div>
                <label htmlFor={`${uid}-m`} className="label">
                  {f.message}
                </label>
                <textarea id={`${uid}-m`} rows={4} value={q.message} onChange={(e) => set("message", e.target.value)} placeholder={f.messagePh} className="field resize-y" />
              </div>
            </Fieldset>

            <div className="border-t border-line pt-8">
              {errors.generic && (
                <p role="alert" className="mb-4 text-[#b42318]">
                  {errors.generic}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={sending} className="btn-solid min-w-56 disabled:opacity-60">
                  {sending ? d.devis.sending : d.devis.submit}
                </button>
                <a href={`tel:${site.tel}`} className="btn-line text-night">
                  <PhoneIcon /> {site.phone}
                </a>
              </div>
              <p className="mt-4 text-[0.8125rem] text-muted">{d.devis.privacy}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

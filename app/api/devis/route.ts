import { Resend } from "resend";
import site from "@/data/site.json";
import { devisMessage, MAX_PHOTOS, parseDevis } from "@/lib/devis";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de devis → e-mails via Resend :
//  1. notification au garage, toujours en français (suivie de la version anglaise si le client a écrit en anglais),
//     avec les photos (1 à 3) en pièces jointes et affichées dans le message ;
//  2. confirmation au client, dans sa langue, s'il a donné son e-mail.
// Variables (Vercel → Settings → Environment Variables) :
//   RESEND_API_KEY        clé Resend
//   DEVIS_NOTIFY_EMAIL    adresse du garage qui reçoit les demandes
//   RESEND_FROM           expéditeur sur un domaine vérifié, ex. « Alliance Auto 80 <devis@alliance-auto-80.fr> »
// Sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte (la confirmation client est alors ignorée).
// Tant que ces variables manquent, la réponse indique notified: false et le site invite le client à appeler.

const MAX_PHOTO = 1.5 * 1024 * 1024;

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(text: string, photos: string[] = []) {
  const body = escapeHtml(text).replace(/\*(.+?)\*/g, '<strong style="display:block;font-size:20px;font-weight:800;color:#1B2A41">$1</strong>');
  const imgs = photos.map((cid) => `<img src="cid:${cid}" alt="" width="168" style="width:168px;height:auto;margin:0 8px 8px 0;border:1px solid #DADAD6;border-radius:4px;vertical-align:top">`).join("");
  return `<div style="background:#EFEFEC;padding:32px 16px"><div style="max-width:580px;margin:0 auto;background:#FFFFFF;border:1px solid #DADAD6;border-radius:6px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#161616"><div style="background:#1B2A41;color:#FAFAF8;padding:16px 24px;font-size:13px;font-weight:bold;letter-spacing:.08em">ALLIANCE AUTO 80</div><div style="height:3px;background:#E07A1F"></div><div style="padding:24px"><div style="white-space:pre-wrap">${body}</div>${imgs ? `<div style="margin-top:20px">${imgs}</div>` : ""}<div style="margin-top:24px;padding-top:14px;border-top:1px solid #DADAD6;font-size:12px;color:#4B5462">${escapeHtml(`${site.address.street}, ${site.address.postalCode} ${site.address.city} · ${site.phone}`)}</div></div></div></div>`;
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const rawLang = form.get("lang");
  const lang: Locale = typeof rawLang === "string" && isLocale(rawLang) ? rawLang : "fr";
  let data: unknown = null;
  try {
    data = JSON.parse(String(form.get("data") ?? ""));
  } catch {}
  const q = parseDevis(data);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const photos = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0 && f.size <= MAX_PHOTO && f.type.startsWith("image/"))
    .slice(0, MAX_PHOTOS);

  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = devisMessage(q, "fr", fr, { photos: photos.length });
  const clientText = devisMessage(q, lang, d, { title: false });
  const subject = `${fr.devis.email.subject} · ${q.vehicle.toUpperCase()}${q.needs.length ? ` · ${q.needs.map((n) => fr.devis.needs[n]).join(", ")}` : ""} · ${q.name}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.DEVIS_NOTIFY_EMAIL ?? site.email ?? undefined;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Alliance Auto 80 <onboarding@resend.dev>";
  const text = lang === "fr" ? frText : `${frText}\n\n— EN —\n\n${devisMessage(q, lang, d, { photos: photos.length })}`;
  const attachments = await Promise.all(
    photos.map(async (p, i) => ({ filename: `photo-${i + 1}.jpg`, content: Buffer.from(await p.arrayBuffer()), contentId: `photo-${i + 1}` })),
  );

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({
      from,
      to,
      replyTo: q.email || undefined,
      subject,
      html: html(text, attachments.map((a) => a.contentId)),
      text,
      attachments: attachments.length ? attachments : undefined,
    });
    notified = !r.error;
  } catch {}

  if (q.email) {
    const e = d.devis.email;
    const msg = `${fill(e.confirmIntro, { name: q.name })}\n\n${clientText}\n\n${fill(e.confirmOutro, { phone: site.phone })}`;
    try {
      const r = await resend.emails.send({ from, to: q.email, replyTo: to, subject: e.confirmSubject, html: html(msg), text: msg });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}

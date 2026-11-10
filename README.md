# Alliance Auto 80

Site vitrine et demande de devis d'Alliance Auto 80, garage automobile au 80 impasse Antoine Parmentier, 80450 Camon (près d'Amiens). Français (par défaut) et anglais.

Next.js 16, Tailwind 4, Motion. Polices locales (Archivo, Inter). Formulaire de devis avec photos, envoyé par Resend.

## Commandes

- `npm run dev` : serveur local
- `npm run build` : build de production
- `npm run media` : prépare les photos (`assets/` → `public/media/`), l'image de partage et l'icône Apple
- `npm run contenu` : régénère `CONTENU.md` (tous les textes et prix, pour validation)
- `npm run affichette` : régénère l'affichette A5 (`public/affichette-alliance-auto-80-a5.pdf`)

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Textes FR / EN | `locales/fr.json`, `locales/en.json` |
| Tarifs et durées | `data/tarifs.json` |
| Horaires, fermetures | `data/horaires.json` |
| Bandeau d'annonces | `data/annonces.json` |
| Avis clients (vrais, avec accord) | `data/avis.json` |
| Photos | `data/photos.json` + `assets/A-PHOTOGRAPHIER.md` |
| Coordonnées, note Google | `data/site.json` |
| Logo | `components/Logo.tsx`, `public/logo.svg`, `app/icon.svg` |

## Variables d'environnement (Vercel)

`RESEND_API_KEY`, `DEVIS_NOTIFY_EMAIL`, `RESEND_FROM`. Voir `INFOS-A-DEMANDER.md`.

# Alliance Auto 80 : infos à demander au garage

Tout ce qui manque sur le site est affiché de façon neutre (« Sur devis », « Appelez-nous ») ou marqué **à valider** dans [CONTENU.md](CONTENU.md). Une fois les réponses obtenues, chaque info se règle dans un seul fichier.

## Déjà trouvé (registres publics, à confirmer avec lui)

- Société : SARL ALLIANCE AUTO 80, SIRET 890 999 089 00018, créée le 1er novembre 2020 (affiché dans les mentions légales et le pied de page).
- Adresse : 80 impasse Antoine Parmentier, 80450 Camon, zone d'activité de la Blanche Tâche.
- Téléphone fixe : 09 80 37 44 12.
- Google : 4,6/5 sur 139 avis (relevé le 10/11/2026).

## À lui demander

| # | Question | Où ça va |
|---|---|---|
| 1 | **Son prénom** et l'histoire du garage (depuis quand, son parcours, combien de mécaniciens) | `locales/*.json` (page « Garage à Camon », bloc Transparence) |
| 2 | **La liste des services et ses prix** « à partir de » (vidange, révision, plaquettes, disques, kit embrayage, distribution, diagnostic, pneus…). Des repères de marché sont donnés dans CONTENU.md pour l'aider | `data/tarifs.json` → `price` |
| 3 | Les **durées** habituelles d'immobilisation (celles du site sont des estimations) | `data/tarifs.json` → `duration` |
| 4 | Les **marques** qu'il préfère ou refuse ; hybrides / électriques ? Utilitaires ? Climatisation, géométrie (parallélisme), contrôle technique ? | `locales/*.json`, `data/tarifs.json` |
| 5 | Un **véhicule de prêt** ? Si oui, à quelles conditions | FAQ (`locales/*.json` → `faq.items`) |
| 6 | Les **horaires exacts**, et surtout le **samedi** (ouvert ? matin seulement ?), fermetures d'été, jours fériés | `data/horaires.json` (+ `saturdayToConfirm: false`), `data/annonces.json` |
| 7 | Un **portable** pour WhatsApp (pratique pour envoyer une photo de voyant ou de fuite) | `data/site.json` → `whatsapp` |
| 8 | **L'e-mail** qui recevra les demandes de devis | Vercel → variable `DEVIS_NOTIFY_EMAIL` (+ `data/site.json` → `email`) |
| 9 | **Des photos de l'atelier** (voir [assets/A-PHOTOGRAPHIER.md](assets/A-PHOTOGRAPHIER.md)) ou l'autorisation d'en prendre | `assets/`, `data/photos.json` |
| 10 | **Le logo**, s'il en a un (fichier vectoriel, ou photo nette de l'enseigne) | `components/Logo.tsx`, `public/logo.svg`, `app/icon.svg` |
| 11 | **SIRET** et nom du gérant à faire figurer (à confirmer) | `data/site.json` → `legal` |
| 12 | Moyens de paiement acceptés (CB, espèces, chèque, paiement en plusieurs fois ?) | FAQ |
| 13 | Le stationnement : peut-on se garer devant l'atelier ? Dépôt des clés hors horaires ? | `infos.accessText`, FAQ |
| 14 | Son accord pour reprendre 3 à 6 **vrais avis Google** sur le site (prénom + initiale) | `data/avis.json` |
| 15 | Un nom de domaine (ex. alliance-auto-80.fr) ? Nécessaire pour envoyer la confirmation e-mail au client | Vercel + Resend |

## Mise en service du formulaire (Resend)

Sur Vercel → Settings → Environment Variables :

- `RESEND_API_KEY` : clé du compte Resend ;
- `DEVIS_NOTIFY_EMAIL` : l'adresse du garage ;
- `RESEND_FROM` : expéditeur sur un domaine vérifié, par exemple `Alliance Auto 80 <devis@alliance-auto-80.fr>`.

Tant que ces variables manquent, la demande est acceptée mais le client voit un message l'invitant à appeler le garage (rien n'est perdu sans prévenir).

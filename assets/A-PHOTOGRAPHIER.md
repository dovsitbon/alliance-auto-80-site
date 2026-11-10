# Photos à prendre sur place

Aucune photo du garage n'était disponible (pas d'images `allianceauto_*.jpg` dans Téléchargements). Le site affiche des emplacements dessinés, sans fausse photo. Chaque photo prise remplace un emplacement.

Règles : lumière du jour, téléphone à l'horizontale (sauf mention), pas de visage de client, pas de plaque d'immatriculation lisible (ou floutée), atelier rangé.

| Emplacement (`data/photos.json`) | Dossier | Nom conseillé | Sujet |
|---|---|---|---|
| `hero` (la plus importante) | `assets/hero/` | `atelier-pont.jpg` | Vue large de l'atelier, une voiture levée sur le pont, lumière du jour. Laisser de l'air à gauche pour le texte. |
| `facade` | `assets/facade/` | `facade-garage.jpg` | La façade et l'enseigne depuis l'impasse, porte ouverte. |
| `entretien` | `assets/atelier/` | `vidange-moteur.jpg` | Une vidange en cours : bac, huile qui s'écoule, mains du mécanicien. |
| `reparations` | `assets/atelier/` | `embrayage-kit.jpg` | Un kit embrayage ou distribution posé sur l'établi. |
| `transparence` | `assets/atelier/` | `pieces-usees.jpg` | Des plaquettes ou un disque usés à côté des neufs. |
| `equipe` | `assets/equipe/` | `equipe-atelier.jpg` | Le ou les mécaniciens devant l'atelier (avec leur accord). |
| `tiles.*` (facultatif) | `assets/atelier/` | `freins-…`, `pneus-…` | Un détail par prestation, cadrage serré, format paysage. |

## Pour les mettre en ligne

1. Déposer la photo dans le bon dossier de `assets/`.
2. L'ajouter à la liste `PICKS` de `scripts/media.mjs` (des exemples sont déjà en commentaire).
3. Lancer `npm run media` (crée la version web dans `public/media/`, ses dimensions, et refait l'image de partage).
4. Renseigner le chemin dans `data/photos.json`, par exemple `"hero": "/media/hero/atelier-pont.jpg"`.

Le nom du fichier commence par la clé de son texte alternatif (`facade`, `atelier`, `equipe`, `vidange`, `embrayage`, `pieces`), déjà rédigé en français et en anglais dans `locales/*.json` → `alt`.

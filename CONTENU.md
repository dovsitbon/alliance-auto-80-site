# Alliance Auto 80 : contenu du site

Tous les textes du site, en français et en anglais, pour relecture avec le garage. Les corrections se font dans `locales/fr.json` et `locales/en.json` ; tarifs, durées, horaires, annonces, avis et photos dans `data/*.json`. Ce fichier se régénère avec `npm run contenu`.

Rien n'a été inventé côté chiffres : **aucun prix n'est renseigné** (affiché « sur devis ») tant que le garage ne les a pas donnés. Les durées sont des ordres de grandeur **à valider**. La note Google (4.6/5, 139 avis) est celle relevée le 2026-11-10. Aucun avis n'est cité ni inventé : le site reprend seulement les thèmes qui reviennent (prix, mécanicien honnête, vidange, embrayage, soin du véhicule). Les vrais avis s'ajoutent dans `data/avis.json`, avec l'accord du garage.

Voir aussi : [INFOS-A-DEMANDER.md](INFOS-A-DEMANDER.md) et [assets/A-PHOTOGRAPHIER.md](assets/A-PHOTOGRAPHIER.md).

## Titre du hero : 3 propositions

Le site utilise la n° 1 (`hero.title`).

1. **Un mécanicien honnête, tout simplement** / *An honest mechanic, plain and simple* (reprend le mot le plus cité dans les avis)
2. **L'entretien au juste prix** / *Car servicing at a fair price*
3. **Votre voiture, notre engagement** / *Your car, our commitment*

## Tarifs et durées (`data/tarifs.json`)

Prix « à partir de », TTC, pièces et main-d'œuvre. Colonne « repère marché » : ordres de grandeur courants pour une citadine ou une compacte, **à titre d'aide uniquement**, jamais affichés sur le site. C'est au garage de donner ses prix.

### Vidange & révision / Oil change & service

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Vidange huile moteur + filtre à huile**<br>*Engine oil and oil filter change* | Environ 1 h (à valider) | **à remplir** | 60 – 120 € |
| **Révision selon le carnet constructeur**<br>*Service to the manufacturer schedule* | 2 à 3 h (à valider) | **à remplir** | 150 – 300 € |
| **Filtres à air, habitacle, gazole**<br>*Air, cabin and fuel filters* | Moins d'1 h (à valider) | **à remplir** | 20 – 60 € pièce |
| **Batterie : contrôle et remplacement**<br>*Battery check and replacement* | Moins d'1 h (à valider) | **à remplir** | 90 – 200 € |

### Embrayage / Clutch

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Kit embrayage (disque, mécanisme, butée)**<br>*Clutch kit (disc, pressure plate, bearing)* | 1 journée (à valider) | **à remplir** | 500 – 1 000 € |
| **Volant moteur bimasse**<br>*Dual-mass flywheel* | 1 journée, avec l'embrayage (à valider) | **à remplir** | + 400 – 900 € |
| **Émetteur, récepteur, câble d'embrayage**<br>*Clutch master or slave cylinder, cable* | Quelques heures (à valider) | **à remplir** | 150 – 350 € |

### Freins / Brakes

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Plaquettes avant ou arrière**<br>*Front or rear brake pads* | Environ 1 h (à valider) | **à remplir** | 80 – 150 € / essieu |
| **Disques + plaquettes, un essieu**<br>*Discs and pads, one axle* | 1 h 30 à 2 h (à valider) | **à remplir** | 180 – 350 € / essieu |
| **Purge du liquide de frein**<br>*Brake fluid change* | Moins d'1 h (à valider) | **à remplir** | 50 – 90 € |

### Distribution / Timing belt

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Kit distribution + pompe à eau**<br>*Timing belt kit and water pump* | 1 journée (à valider) | **à remplir** | 400 – 900 € |
| **Courroie d'accessoires**<br>*Auxiliary drive belt* | 1 à 2 h (à valider) | **à remplir** | 100 – 250 € |

### Diagnostic / Diagnostics

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Diagnostic électronique, voyant allumé**<br>*Electronic diagnostics, warning light on* | 30 min à 1 h (à valider) | **à remplir** | 40 – 80 € |
| **Préparation au contrôle technique**<br>*Pre-MOT check* | Environ 1 h (à valider) | **à remplir** | 30 – 60 € |
| **Recherche de bruit ou de fuite, essai**<br>*Noise or leak investigation, road test* | Selon le cas (à valider) | **à remplir** | selon le temps passé |

### Pneus / Tyres

| Prestation | Durée indicative | Prix « à partir de » | Repère marché (aide) |
|---|---|---|---|
| **Montage et équilibrage, par pneu**<br>*Fitting and balancing, per tyre* | Environ 1 h les quatre (à valider) | **à remplir** | 10 – 20 € / pneu |
| **Réparation de crevaison**<br>*Puncture repair* | Moins d'1 h (à valider) | **à remplir** | 15 – 30 € |
| **Parallélisme**<br>*Wheel alignment* | à remplir | **à remplir** · **prestation à confirmer** | 50 – 90 € |

## Horaires (`data/horaires.json`)

- lundi : 09:00 – 12:30, 13:30 – 18:30
- mardi : 09:00 – 12:30, 13:30 – 18:30
- mercredi : 09:00 – 12:30, 13:30 – 18:30
- jeudi : 09:00 – 12:30, 13:30 – 18:30
- vendredi : 09:00 – 12:30, 13:30 – 18:30
- samedi : fermé
- dimanche : fermé

**Samedi : à confirmer** (affiché « Appelez-nous » ; à régler dans `horaires.json`).

Fermetures exceptionnelles (jours fériés, **à valider**) : Armistice (2026-11-11), Noël (2026-12-25), Jour de l'an (2027-01-01).

## Bandeau d'annonces (`data/annonces.json`)

- **Par défaut** : Devis gratuit, prix honnêtes. Toutes marques, du lundi au vendredi. *(Free quotes, honest prices. All makes, Monday to Friday.)*
- **2026-11-09 → 2026-11-11** : Le garage sera fermé le mercredi 11 novembre (jour férié). *(The garage will be closed on Wednesday 11 November (bank holiday).)* — lien « Horaires »
- **2026-12-18 → 2027-01-01** : Fêtes de fin d'année : le garage sera fermé le 25 décembre et le 1er janvier. Pensez à prendre rendez-vous avant les départs. *(Holidays: the garage will be closed on 25 December and 1 January. Book your car in before you travel.)* — lien « Prendre rendez-vous »

## Textes du site

Chaque ligne : clé, français, anglais. Les textes marqués **à valider** demandent une confirmation de l'atelier.

### meta

| Clé | Français | English | |
|---|---|---|---|
| `meta.title` | Garage et mécanique à Camon, près d'Amiens | Alliance Auto 80 | Car garage and mechanic in Camon, near Amiens | Alliance Auto 80 | |
| `meta.description` | Alliance Auto 80, garage automobile indépendant à Camon, aux portes d'Amiens : vidange, révision, freins, embrayage, distribution, diagnostic, pneus. Devis gratuit, toutes marques. 4,6/5 sur Google. | Alliance Auto 80, an independent car garage in Camon, on the edge of Amiens: oil change, servicing, brakes, clutch, timing belt, diagnostics, tyres. Free quotes, all makes. Rated 4.6/5 on Google. | |
| `meta.ogAlt` | Alliance Auto 80, garage automobile à Camon, près d'Amiens | Alliance Auto 80, car garage in Camon, near Amiens | |

### nav

| Clé | Français | English | |
|---|---|---|---|
| `nav.entretien` | Entretien | Servicing | |
| `nav.mecanique` | Mécanique | Repairs | |
| `nav.tarifs` | Tarifs | Prices | |
| `nav.infos` | Infos | Info | |
| `nav.devis` | Demander un devis | Get a quote | |
| `nav.call` | Appeler | Call | |
| `nav.menu` | Menu | Menu | |
| `nav.close` | Fermer le menu | Close menu | |
| `nav.home` | Alliance Auto 80, accueil | Alliance Auto 80, home | |
| `nav.lang` | Langue | Language | |
| `nav.skip` | Aller au contenu | Skip to content | |

### intro

| Clé | Français | English | |
|---|---|---|---|
| `intro.skip` | Passer | Skip | |

### announce

| Clé | Français | English | |
|---|---|---|---|
| `announce.close` | Fermer le bandeau | Close banner | |

### status

| Clé | Français | English | |
|---|---|---|---|
| `status.open` | Ouvert maintenant | Open now | |
| `status.closed` | Fermé | Closed | |
| `status.until` | jusqu'à {time} | until {time} | |
| `status.reopens` | réouverture {day} à {time} | opens {day} at {time} | |
| `status.today` | aujourd'hui | today | |
| `status.tomorrow` | demain | tomorrow | |

### rating

| Clé | Français | English | |
|---|---|---|---|
| `rating.label` | {value}/5 sur Google | {value}/5 on Google | |
| `rating.count` | {count} avis | {count} reviews | |
| `rating.asOf` | Note relevée en {date} | Rating as of {date} | |

### hero

| Clé | Français | English | |
|---|---|---|---|
| `hero.eyebrow` | Garage · Mécanique · Entretien · Camon | Garage · Repairs · Servicing · Camon | |
| `hero.title` | Un mécanicien honnête, tout simplement | An honest mechanic, plain and simple | |
| `hero.lead` | Garage indépendant à Camon, aux portes d'Amiens. Vidange, freins, embrayage, distribution : un devis clair avant chaque intervention, et pas de surprise sur la facture. | An independent garage in Camon, just outside Amiens. Oil changes, brakes, clutches, timing belts: a clear quote before any work, and no surprises on the bill. | **à valider** |
| `hero.field` | Immatriculation ou modèle | Registration or model | |
| `hero.fieldPh` | AB-123-CD ou Clio 4 dCi | AB-123-CD or Clio 4 dCi | |
| `hero.devis` | Demander un devis | Get a quote | |
| `hero.call` | Appeler | Call | |

### tiles

| Clé | Français | English | |
|---|---|---|---|
| `tiles.eyebrow` | Prestations | Services | |
| `tiles.title` | Ce qu'on fait à l'atelier | What we do in the workshop | |
| `tiles.from` | à partir de {price} | from {price} | |
| `tiles.onQuote` | Prix sur devis | Price on quote | |
| `tiles.items.entretien.title` | Vidange & révision | Oil change & service | |
| `tiles.items.entretien.text` | Huile, filtres, révision selon le carnet constructeur. | Oil, filters, servicing to the manufacturer schedule. | |
| `tiles.items.embrayage.title` | Embrayage | Clutch | |
| `tiles.items.embrayage.text` | Kit complet, volant moteur, émetteur et récepteur. | Full kit, flywheel, master and slave cylinders. | |
| `tiles.items.freins.title` | Freins | Brakes | |
| `tiles.items.freins.text` | Plaquettes, disques, liquide de frein. | Pads, discs, brake fluid. | |
| `tiles.items.distribution.title` | Distribution | Timing belt | |
| `tiles.items.distribution.text` | Courroie, galets, pompe à eau, au bon kilométrage. | Belt, tensioners, water pump, at the right mileage. | |
| `tiles.items.diagnostic.title` | Diagnostic | Diagnostics | |
| `tiles.items.diagnostic.text` | Voyant allumé, bruit, fuite : on cherche avant de changer. | Warning light, noise, leak: we find the cause before replacing anything. | |
| `tiles.items.pneus.title` | Pneus | Tyres | |
| `tiles.items.pneus.text` | Montage, équilibrage, crevaison. | Fitting, balancing, punctures. | |

### strip

| Clé | Français | English | |
|---|---|---|---|
| `strip.label` | Nos engagements | Our commitments | |
| `strip.items.0.title` | Devis gratuit | Free quote | |
| `strip.items.0.text` | Avant toute intervention, sans engagement. | Before any work, no obligation. | |
| `strip.items.1.title` | Prix honnêtes | Honest prices | |
| `strip.items.1.text` | On répare ce qui doit l'être, pas plus. | We fix what needs fixing, nothing more. | |
| `strip.items.2.title` | Toutes marques | All makes | |
| `strip.items.2.text` | Citadines, familiales, utilitaires, essence ou diesel. | City cars, family cars, vans, petrol or diesel. | |
| `strip.items.3.title` | 09 80 37 44 12 | 09 80 37 44 12 | **à valider (horaires)** |
| `strip.items.3.text` | Du lundi au vendredi, de 9 h à 18 h 30. | Monday to Friday, 9am to 6:30pm. | **à valider (horaires)** |

### tarifs

| Clé | Français | English | |
|---|---|---|---|
| `tarifs.eyebrow` | Tarifs | Prices | |
| `tarifs.title` | Prix indicatifs et durées | Guide prices and times | |
| `tarifs.lead` | Des prix « à partir de », TTC, pièces et main-d'œuvre. Ils varient selon le modèle et la motorisation : le devis, lui, est précis et gratuit. | Prices are “from” prices, including VAT, parts and labour. They vary with the model and engine: the quote itself is exact and free. | |
| `tarifs.note` | Durées données à titre indicatif, selon la disponibilité des pièces. | Times are a guide and depend on parts availability. | |
| `tarifs.head.service` | Prestation | Service | |
| `tarifs.head.price` | Prix | Price | |
| `tarifs.head.duration` | Durée | Time | |
| `tarifs.from` | à partir de {price} | from {price} | |
| `tarifs.onQuote` | Sur devis | On quote | |
| `tarifs.confirm` | À confirmer | To be confirmed | |
| `tarifs.ask` | Devis | Quote | |
| `tarifs.all` | Tous les tarifs | All prices | |
| `tarifs.cardsTitle` | Par prestation | By service | |

### tarifsPage

| Clé | Français | English | |
|---|---|---|---|
| `tarifsPage.metaTitle` | Tarifs vidange, freins, embrayage à Camon, près d'Amiens | Alliance Auto 80 | Oil change, brake and clutch prices in Camon, near Amiens | Alliance Auto 80 | |
| `tarifsPage.metaDescription` | Prix indicatifs « à partir de » et durées d'immobilisation : vidange, révision, freins, embrayage, distribution, diagnostic, pneus. Devis gratuit chez Alliance Auto 80, Camon. | Guide “from” prices and typical times: oil change, servicing, brakes, clutch, timing belt, diagnostics, tyres. Free quote at Alliance Auto 80, Camon. | |
| `tarifsPage.eyebrow` | Tarifs | Prices | |
| `tarifsPage.title` | Tarifs et durées | Prices and times | |
| `tarifsPage.lead` | Pour chaque prestation, un prix « à partir de » et le temps d'immobilisation habituel. Le prix exact dépend de votre voiture : demandez un devis, c'est gratuit et sans engagement. | For each service, a “from” price and the usual time your car stays with us. The exact price depends on your car: ask for a quote, it is free and comes with no obligation. | |

### blocks

| Clé | Français | English | |
|---|---|---|---|
| `blocks.entretien.eyebrow` | Entretien | Servicing | **à valider** |
| `blocks.entretien.title` | La vidange, sans attendre la panne | Change the oil before it turns into a breakdown | **à valider** |
| `blocks.entretien.text` | Vidange, filtres, révision selon le carnet de votre constructeur, contrôle des freins et des niveaux. On suit ce que prévoit le fabricant, ni plus ni moins. | Oil change, filters, servicing to your manufacturer’s schedule, brake and fluid checks. We follow what the manufacturer recommends, no more and no less. | **à valider** |
| `blocks.entretien.cta` | Prendre rendez-vous | Book a slot | **à valider** |
| `blocks.reparations.eyebrow` | Mécanique | Repairs | |
| `blocks.reparations.title` | Embrayage, distribution : le prix annoncé avant de démonter | Clutch, timing belt: the price agreed before we take anything apart | |
| `blocks.reparations.text` | Une pédale qui patine, un bruit au démarrage, une courroie qui arrive à son kilométrage. On diagnostique, on vous remet un devis détaillé, pièces et main-d'œuvre, et on s'y tient. | A slipping pedal, a noise on start-up, a belt reaching its mileage. We diagnose, give you a detailed quote for parts and labour, and stick to it. | |
| `blocks.reparations.cta` | Demander un devis | Get a quote | |
| `blocks.transparence.eyebrow` | Transparence | Transparency | **à valider (pièces montrées, facture détaillée)** |
| `blocks.transparence.title` | On vous montre les pièces changées | We show you the parts we replaced | **à valider (pièces montrées, facture détaillée)** |
| `blocks.transparence.text` | Vous récupérez votre voiture propre, les anciennes pièces si vous le souhaitez, et une facture qui détaille chaque ligne. Si une réparation peut attendre, on vous le dit aussi. | You get your car back clean, the old parts if you want them, and an invoice that lists every line. If a repair can wait, we tell you that too. | **à valider (pièces montrées, facture détaillée)** |
| `blocks.transparence.cta` | Appeler le garage | Call the garage | **à valider (pièces montrées, facture détaillée)** |

### reviews

| Clé | Français | English | |
|---|---|---|---|
| `reviews.eyebrow` | Avis Google | Google reviews | |
| `reviews.title` | Ce que nos clients mentionnent le plus | What our customers mention most | |
| `reviews.themes.0` | Des prix corrects | Fair prices | |
| `reviews.themes.1` | Un mécanicien honnête | An honest mechanic | |
| `reviews.themes.2` | Vidange et embrayage | Oil changes and clutches | |
| `reviews.themes.3` | Une voiture rendue propre | Cars handed back clean | |
| `reviews.cta` | Lire les avis sur Google | Read the reviews on Google | |

### infos

| Clé | Français | English | |
|---|---|---|---|
| `infos.eyebrow` | Infos pratiques | Practical info | |
| `infos.title` | Venir au garage | Finding the garage | |
| `infos.address` | Adresse | Address | |
| `infos.route` | Itinéraire | Directions | |
| `infos.phone` | Téléphone | Phone | |
| `infos.hours` | Horaires | Opening hours | |
| `infos.access` | Accès et stationnement | Access and parking | |
| `infos.accessText` | Dans la zone d'activité de la Blanche Tâche, à Camon, à quelques minutes d'Amiens. Vous pouvez vous garer devant l'atelier. | In the Blanche Tâche business park in Camon, a few minutes from Amiens. You can park right outside the workshop. | **à valider (stationnement devant l'atelier)** |
| `infos.mapTitle` | Plan d'accès au garage Alliance Auto 80, Camon | Map to the Alliance Auto 80 garage, Camon | |
| `infos.closedDay` | Fermé | Closed | |
| `infos.saturday` | Appelez-nous | Please call | |
| `infos.closures` | Fermetures à venir | Upcoming closures | |

### faq

| Clé | Français | English | |
|---|---|---|---|
| `faq.eyebrow` | Questions fréquentes | Frequently asked questions | |
| `faq.title` | Avant de venir | Before you come | |
| `faq.items.0.q` | Faut-il prendre rendez-vous ? | Do I need an appointment? | **à valider (rendez-vous)** |
| `faq.items.0.a` | Pour une vidange ou une révision, c'est préférable : appelez-nous ou envoyez une demande, on vous propose un créneau. Pour un bruit, un voyant ou une fuite, appelez : on regarde dès que possible. | For an oil change or a service, it is best to book: call us or send a request and we will offer you a slot. For a noise, a warning light or a leak, call us and we will look at it as soon as we can. | **à valider (rendez-vous)** |
| `faq.items.1.q` | Le devis est-il vraiment gratuit ? | Is the quote really free? | |
| `faq.items.1.a` | Oui, gratuit et sans engagement. Et si on découvre autre chose pendant l'intervention, on vous appelle avant d'aller plus loin. | Yes, free and with no obligation. If we find something else while working on the car, we call you before going any further. | |
| `faq.items.2.q` | Combien de temps vais-je rester sans voiture ? | How long will I be without my car? | **à valider (délais)** |
| `faq.items.2.a` | Une vidange prend environ une heure, des plaquettes à peu près autant. Un embrayage ou une distribution demandent en général une journée, selon la disponibilité des pièces. On vous donne le délai avec le devis. | An oil change takes about an hour, brake pads about the same. A clutch or a timing belt usually takes a day, depending on parts. We give you the time with the quote. | **à valider (délais)** |
| `faq.items.3.q` | Est-ce que je garde la garantie constructeur ? | Do I keep the manufacturer’s warranty? | |
| `faq.items.3.a` | Oui. Vous pouvez faire entretenir une voiture sous garantie dans un garage indépendant, à condition de suivre le programme d'entretien du constructeur avec des pièces de qualité équivalente. C'est ce que nous faisons. | Yes. You can have a car under warranty serviced by an independent garage, as long as the manufacturer’s service schedule is followed with parts of matching quality. That is what we do. | |
| `faq.items.4.q` | Quels moyens de paiement acceptez-vous ? | How can I pay? | **à valider (moyens de paiement)** |
| `faq.items.4.a` | Carte bancaire et espèces, au moment où vous récupérez votre voiture. Il n'y a pas de paiement en ligne. | By card or cash, when you collect your car. There is no online payment. | **à valider (moyens de paiement)** |
| `faq.items.5.q` | Où se garer ? | Where can I park? | **à valider (stationnement)** |
| `faq.items.5.a` | Le garage est au 80 impasse Antoine Parmentier, dans la zone de la Blanche Tâche à Camon. Vous pouvez vous garer devant l'atelier. | The garage is at 80 impasse Antoine Parmentier, in the Blanche Tâche business park in Camon. You can park right outside the workshop. | **à valider (stationnement)** |

### devis

| Clé | Français | English | |
|---|---|---|---|
| `devis.eyebrow` | Devis gratuit | Free quote | |
| `devis.title` | Demander un devis | Get a quote | |
| `devis.lead` | Dites-nous quelle voiture et ce qui ne va pas. On vous rappelle avec un prix et un créneau, en général dans la journée ouvrée. | Tell us which car and what is wrong. We call you back with a price and a slot, usually within the working day. | **à valider (rappel dans la journée)** |
| `devis.preferCall` | Plus simple au téléphone ? | Easier on the phone? | |
| `devis.sections.vehicle` | Votre voiture | Your car | |
| `devis.sections.need` | Votre besoin | What you need | |
| `devis.sections.photos` | Photos | Photos | |
| `devis.sections.date` | Date souhaitée | Preferred date | |
| `devis.sections.contact` | Vos coordonnées | Your details | |
| `devis.fields.vehicle` | Immatriculation ou modèle | Registration or model | |
| `devis.fields.vehiclePh` | AB-123-CD ou Clio 4 dCi 90 | AB-123-CD or Clio 4 dCi 90 | |
| `devis.fields.vehicleHint` | L'immatriculation nous permet de trouver les bonnes pièces. | The registration helps us find the right parts. | |
| `devis.fields.mileage` | Kilométrage | Mileage (km) | |
| `devis.fields.mileagePh` | 120 000 | 120,000 | |
| `devis.fields.needsLabel` | De quoi s'agit-il ? | What is it about? | |
| `devis.fields.needsHint` | plusieurs choix possibles | choose as many as you like | |
| `devis.fields.details` | Précisions | Details | |
| `devis.fields.detailsPh` | Bruit au freinage, voyant moteur allumé, révision des 60 000 km… | Noise when braking, engine light on, 60,000 km service… | |
| `devis.fields.photos` | Ajouter | Add | |
| `devis.fields.photosHint` | Facultatif : un voyant, une fuite, un pneu, la carte grise. 1 à 3 photos. | Optional: a warning light, a leak, a tyre, the registration document. 1 to 3 photos. | |
| `devis.fields.photosCount` | {count} / 3 photos | {count} / 3 photos | |
| `devis.fields.photoRemove` | Retirer la photo | Remove photo | |
| `devis.fields.date` | Date souhaitée | Preferred date | |
| `devis.fields.dateHint` | Du lundi au vendredi. On confirme le créneau par téléphone. | Monday to Friday. We confirm the slot by phone. | |
| `devis.fields.name` | Nom | Name | |
| `devis.fields.phone` | Téléphone | Phone | |
| `devis.fields.email` | E-mail | Email | |
| `devis.fields.emailHint` | (facultatif, pour recevoir une copie) | (optional, to get a copy) | |
| `devis.fields.message` | Message | Message | |
| `devis.fields.messagePh` | Une question, une contrainte d'horaire… | A question, a time constraint… | |
| `devis.needs.entretien` | Vidange, révision | Oil change, service | |
| `devis.needs.embrayage` | Embrayage | Clutch | |
| `devis.needs.freins` | Freins | Brakes | |
| `devis.needs.distribution` | Distribution | Timing belt | |
| `devis.needs.diagnostic` | Diagnostic, voyant | Diagnostics, warning light | |
| `devis.needs.pneus` | Pneus | Tyres | |
| `devis.needs.autre` | Autre | Something else | |
| `devis.errors.vehicle` | Indiquez l'immatriculation ou le modèle. | Please give the registration or the model. | |
| `devis.errors.need` | Choisissez un besoin ou décrivez-le en quelques mots. | Choose what you need or describe it in a few words. | |
| `devis.errors.name` | Indiquez votre nom. | Please give your name. | |
| `devis.errors.phone` | Indiquez un numéro de téléphone valide. | Please give a valid phone number. | |
| `devis.errors.email` | Cette adresse e-mail ne semble pas valide. | This email address does not look right. | |
| `devis.errors.photo` | Cette photo n'a pas pu être ajoutée. Essayez un autre fichier. | This photo could not be added. Try another file. | |
| `devis.errors.generic` | L'envoi n'a pas abouti. Réessayez, ou appelez-nous au 09 80 37 44 12. | Sending failed. Please try again, or call us on 09 80 37 44 12. | |
| `devis.submit` | Envoyer la demande | Send request | |
| `devis.sending` | Envoi… | Sending… | |
| `devis.privacy` | Vos coordonnées servent uniquement à vous répondre. Elles ne sont ni revendues ni utilisées pour de la publicité. | Your details are only used to reply to you. They are never sold or used for advertising. | |
| `devis.success.title` | Demande bien reçue | Request received | |
| `devis.success.text` | Merci. On regarde votre demande et on vous rappelle avec un prix et un créneau. | Thank you. We will look at your request and call you back with a price and a slot. | |
| `devis.success.email` | Une copie vient de partir sur votre adresse e-mail. | A copy has been sent to your email address. | |
| `devis.success.notNotified` | Pour être sûr qu'elle nous parvienne rapidement, le plus simple reste de nous appeler : | To make sure it reaches us quickly, the simplest is to call us: | |
| `devis.success.again` | Faire une autre demande | Send another request | |
| `devis.message.title` | Nouvelle demande de devis | New quote request | |
| `devis.message.vehicle` | Véhicule | Vehicle | |
| `devis.message.mileage` | Kilométrage | Mileage | |
| `devis.message.needs` | Besoin | Needs | |
| `devis.message.details` | Précisions | Details | |
| `devis.message.date` | Date souhaitée | Preferred date | |
| `devis.message.name` | Nom | Name | |
| `devis.message.phone` | Téléphone | Phone | |
| `devis.message.email` | E-mail | Email | |
| `devis.message.message` | Message | Message | |
| `devis.message.photos` | Photos jointes | Photos attached | |
| `devis.email.subject` | Demande de devis | Quote request | |
| `devis.email.confirmSubject` | Votre demande de devis, Alliance Auto 80 | Your quote request, Alliance Auto 80 | |
| `devis.email.confirmIntro` | Bonjour {name},<br><br>Nous avons bien reçu votre demande. Nous vous rappelons rapidement avec un prix et un créneau. Voici ce que vous nous avez envoyé : | Hello {name},<br><br>We have received your request and will call you back soon with a price and a slot. Here is what you sent us: | |
| `devis.email.confirmOutro` | Pour toute question : {phone}, du lundi au vendredi.<br><br>Alliance Auto 80 | Any questions: {phone}, Monday to Friday.<br><br>Alliance Auto 80 | |

### pages

| Clé | Français | English | |
|---|---|---|---|
| `pages.camon.metaTitle` | Garage à Camon (80450), mécanique et entretien | Alliance Auto 80 | Car garage in Camon (80450), repairs and servicing | Alliance Auto 80 | |
| `pages.camon.metaDescription` | Garage automobile indépendant à Camon, près d'Amiens : entretien, vidange, freins, embrayage, distribution, diagnostic. Devis gratuit, toutes marques, 4,6/5 sur Google. | Independent car garage in Camon, near Amiens: servicing, oil change, brakes, clutch, timing belt, diagnostics. Free quotes, all makes, rated 4.6/5 on Google. | |
| `pages.camon.eyebrow` | Garage automobile · Camon, 80450 | Car garage · Camon, 80450 | |
| `pages.camon.title` | Garage à Camon | Car garage in Camon | |
| `pages.camon.intro` | Alliance Auto 80 est un garage indépendant installé depuis 2020 dans la zone de la Blanche Tâche, à Camon. Entretien et mécanique toutes marques, avec un devis clair avant de commencer. | Alliance Auto 80 is an independent garage, set up in 2020 in the Blanche Tâche business park in Camon. Servicing and repairs on all makes, with a clear quote before we start. | **à valider** |
| `pages.camon.cta` | Demander un devis | Get a quote | |
| `pages.camon.listTitle` | Ce qu'on fait à l'atelier | What we do in the workshop | |
| `pages.camon.list.0.title` | Entretien | Servicing | |
| `pages.camon.list.0.text` | Vidange, filtres, révision constructeur, batterie. | Oil change, filters, manufacturer service, battery. | |
| `pages.camon.list.1.title` | Freins | Brakes | |
| `pages.camon.list.1.text` | Plaquettes, disques, liquide, contrôle complet. | Pads, discs, fluid, full check. | |
| `pages.camon.list.2.title` | Embrayage & distribution | Clutch & timing belt | |
| `pages.camon.list.2.text` | Les grosses réparations, avec un devis détaillé. | The big jobs, with a detailed quote. | |
| `pages.camon.list.3.title` | Diagnostic & pneus | Diagnostics & tyres | |
| `pages.camon.list.3.text` | Voyants, bruits, fuites ; montage et équilibrage. | Warning lights, noises, leaks; fitting and balancing. | |
| `pages.camon.howTitle` | Comment ça se passe | How it works | |
| `pages.camon.how.0.title` | Vous nous appelez ou envoyez une demande | Call us or send a request | **à valider** |
| `pages.camon.how.0.text` | Avec l'immatriculation, on identifie la voiture et les pièces. | With the registration, we identify the car and its parts. | **à valider** |
| `pages.camon.how.1.title` | On vous donne un prix | We give you a price | **à valider** |
| `pages.camon.how.1.text` | Un devis gratuit, ligne par ligne, et le temps d'immobilisation. | A free quote, line by line, and how long the car will stay with us. | **à valider** |
| `pages.camon.how.2.title` | On répare et on vous explique | We fix it and explain | **à valider** |
| `pages.camon.how.2.text` | Ce qui a été fait, ce qui pourra attendre, et les pièces changées si vous voulez les voir. | What was done, what can wait, and the replaced parts if you want to see them. | **à valider** |
| `pages.camon.extra` | Le garage est facile d'accès depuis Amiens, Longueau, Rivery ou Glisy, à quelques minutes de la rocade. | The garage is easy to reach from Amiens, Longueau, Rivery or Glisy, a few minutes from the ring road. | |
| `pages.vidange.metaTitle` | Vidange et entretien près d'Amiens, à Camon | Alliance Auto 80 | Oil change and car servicing near Amiens, in Camon | Alliance Auto 80 | |
| `pages.vidange.metaDescription` | Vidange, filtres et révision selon le carnet constructeur, à Camon près d'Amiens. Garantie constructeur préservée, devis gratuit, toutes marques. | Oil change, filters and servicing to the manufacturer schedule, in Camon near Amiens. Manufacturer warranty kept, free quotes, all makes. | |
| `pages.vidange.eyebrow` | Vidange & entretien · près d'Amiens | Oil change & servicing · near Amiens | |
| `pages.vidange.title` | Vidange et entretien près d'Amiens | Oil change and servicing near Amiens | |
| `pages.vidange.intro` | Une vidange faite à temps, c'est un moteur qui dure. Au garage, à Camon, on fait l'entretien de votre voiture selon le programme du constructeur, avec l'huile et les filtres qui conviennent à votre moteur. | An oil change done on time keeps an engine going. At our garage in Camon, we service your car to the manufacturer’s schedule, with the oil and filters your engine needs. | |
| `pages.vidange.cta` | Prendre rendez-vous | Book a slot | |
| `pages.vidange.listTitle` | Ce que comprend l'entretien | What a service includes | |
| `pages.vidange.list.0.title` | Vidange | Oil change | |
| `pages.vidange.list.0.text` | Huile aux normes de votre constructeur, filtre à huile neuf. | Oil to your manufacturer’s standard, new oil filter. | |
| `pages.vidange.list.1.title` | Révision | Service | |
| `pages.vidange.list.1.text` | Les opérations prévues par le carnet, au bon kilométrage. | The work listed in the service book, at the right mileage. | |
| `pages.vidange.list.2.title` | Filtres | Filters | |
| `pages.vidange.list.2.text` | Air, habitacle, gazole, selon l'échéance. | Air, cabin, diesel, when they are due. | |
| `pages.vidange.list.3.title` | Contrôles | Checks | |
| `pages.vidange.list.3.text` | Freins, pneus, niveaux, batterie, éclairage. | Brakes, tyres, fluids, battery, lights. | |
| `pages.vidange.howTitle` | Quand faire la vidange ? | When should the oil be changed? | |
| `pages.vidange.how.0.title` | Regardez le carnet d'entretien | Check the service book | |
| `pages.vidange.how.0.text` | Selon le moteur, une vidange tous les 10 000 à 30 000 km, ou au moins une fois par an. | Depending on the engine, every 10,000 to 30,000 km, or at least once a year. | |
| `pages.vidange.how.1.title` | Un voyant ou un niveau bas ? | Warning light or low level? | |
| `pages.vidange.how.1.text` | N'attendez pas l'échéance : appelez-nous, on vérifie. | Don’t wait for the due date: call us and we will check. | |
| `pages.vidange.how.2.title` | Une heure environ | About an hour | |
| `pages.vidange.how.2.text` | Prenez rendez-vous : la vidange se fait en général dans l'heure. | Book a slot: an oil change usually takes around an hour. | |
| `pages.vidange.extra` | Bon à savoir : faire entretenir votre voiture hors du réseau de la marque ne fait pas perdre la garantie constructeur, tant que le programme d'entretien est respecté. | Good to know: having your car serviced outside the brand’s dealer network does not void the manufacturer’s warranty, as long as the service schedule is followed. | |

### footer

| Clé | Français | English | |
|---|---|---|---|
| `footer.tagline` | Garage automobile indépendant à Camon, près d'Amiens. Entretien et mécanique toutes marques. | Independent car garage in Camon, near Amiens. Servicing and repairs on all makes. | |
| `footer.contact` | Contact | Contact | |
| `footer.pages` | Pages | Pages | |
| `footer.days` | Du lundi au vendredi<br>9 h – 12 h 30, 13 h 30 – 18 h 30 | Monday to Friday<br>9am – 12:30pm, 1:30pm – 6:30pm | |
| `footer.closed` | Samedi : appelez-nous · Dimanche : fermé | Saturday: please call · Sunday: closed | **à valider (samedi)** |
| `footer.legal` | Mentions légales | Legal notice | |
| `footer.rights` | Alliance Auto 80 | Alliance Auto 80 | |

### legal

| Clé | Français | English | |
|---|---|---|---|
| `legal.metaTitle` | Mentions légales | Alliance Auto 80 | Legal notice | Alliance Auto 80 | |
| `legal.title` | Mentions légales | Legal notice | |
| `legal.editor` | Éditeur | Publisher | |
| `legal.editorText` | {company}, 80 impasse Antoine Parmentier, 80450 Camon. Téléphone : 09 80 37 44 12. | {company}, 80 impasse Antoine Parmentier, 80450 Camon, France. Phone: +33 9 80 37 44 12. | |
| `legal.siret` | SIRET : {siret}. | SIRET: {siret}. | |
| `legal.host` | Hébergement | Hosting | |
| `legal.data` | Données personnelles | Personal data | |
| `legal.dataText` | Les informations envoyées par le formulaire de devis (véhicule, coordonnées, photos) servent uniquement à répondre à votre demande. Elles sont transmises par e-mail au garage et ne sont ni revendues ni utilisées à des fins publicitaires. Vous pouvez demander leur suppression en appelant le garage. | The information sent through the quote form (vehicle, contact details, photos) is only used to answer your request. It is emailed to the garage and is never sold or used for advertising. You can ask for it to be deleted by calling the garage. | |
| `legal.cookies` | Cookies | Cookies | |
| `legal.cookiesText` | Le site ne dépose aucun cookie publicitaire ni de mesure d'audience. Seul votre choix de langue est mémorisé. La carte intégrée est fournie par Google Maps. | This site sets no advertising or analytics cookies. Only your language choice is remembered. The embedded map is provided by Google Maps. | |

## Textes alternatifs des photos

| Photo | Français | English |
|---|---|---|
| facade | La façade du garage Alliance Auto 80, impasse Antoine Parmentier à Camon | The front of the Alliance Auto 80 garage, impasse Antoine Parmentier in Camon |
| atelier | L'atelier du garage Alliance Auto 80, une voiture sur le pont élévateur | The Alliance Auto 80 workshop, a car up on the lift |
| equipe | L'équipe du garage Alliance Auto 80 à l'atelier | The Alliance Auto 80 team in the workshop |
| vidange | Vidange en cours : l'huile usagée s'écoule sous le moteur | Oil change in progress: old oil draining from under the engine |
| embrayage | Un kit embrayage neuf posé sur l'établi avant montage | A new clutch kit on the workbench before fitting |
| pieces | Des plaquettes usées à côté des neuves, montrées au client | Worn brake pads next to new ones, shown to the customer |

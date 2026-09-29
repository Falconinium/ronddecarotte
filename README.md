# Rond de Carotte

Site vitrine du restaurant **Rond de Carotte** (restaurant · cave à vin · coffee shop), 50 rue de la Vignette, Saint-Gervais-les-Bains.

Stack : Next.js (App Router) · Tailwind CSS v4 · Motion (animations) · Lenis (défilement fluide).

## Développement

```bash
npm install
npm run dev
```

## Modifier le contenu

Tout est dans [`src/lib/content.ts`](src/lib/content.ts) : horaires, coordonnées, et surtout :

- `reservationUrl` : lien CoverManager utilisé par tous les boutons « Réserver ».
- `annualClosure` : période de fermeture annuelle, affichée avec les horaires.
- `cartes` : un lien `pdf` par carte (Déjeuner & Dîner, Vins, Brunch, Carte de l'après-midi), actuellement sur Google Drive. URL externe, ou fichier déposé dans `public/cartes/` puis référencé en `/cartes/nom.pdf`. Tant qu'il est vide, la carte affiche « Bientôt en ligne ».

Photos : `public/images/`. Le choix de la photo par section est fait dans [`src/components/ImagePanel.tsx`](src/components/ImagePanel.tsx).

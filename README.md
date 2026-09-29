# Rond de Carotte

Site vitrine du restaurant **Rond de Carotte** (restaurant · cave à vin · coffee shop), 50 rue de la Vignette, Saint-Gervais-les-Bains.

Stack : Next.js (App Router) · Tailwind CSS v4 · Motion (animations) · Lenis (défilement fluide).

## Développement

```bash
npm install
npm run dev
```

## Modifier le contenu

Horaires, coordonnées, cartes (brunch, déjeuner & dîner, vins, coffee shop) : tout est dans [`src/lib/content.ts`](src/lib/content.ts).
Un champ `price` optionnel peut être ajouté à chaque plat.

Photos : `public/images/`. Le choix de la photo par section est fait dans [`src/components/ImagePanel.tsx`](src/components/ImagePanel.tsx).

## Réservations

Le formulaire envoie la demande par e-mail via [Resend](https://resend.com). À configurer dans les variables d'environnement Vercel (voir `.env.example`) :

- `RESEND_API_KEY`
- `RESERVATION_TO_EMAIL` : adresse du restaurant qui reçoit les demandes
- `RESERVATION_FROM_EMAIL` (optionnel) : expéditeur sur un domaine vérifié

Sans configuration, le formulaire invite à réserver par téléphone.

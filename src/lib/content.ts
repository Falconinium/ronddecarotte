// Toutes les informations éditables du site sont centralisées ici.

export const info = {
  name: "Rond de Carotte",
  tagline: "Restaurant · Cave à vin · Coffee shop",
  address: "50 rue de la Vignette",
  city: "74170 Saint-Gervais-les-Bains",
  phone: "04 50 47 76 39",
  phoneHref: "tel:+33450477639",
  instagram: "@ronddecarotte_stgervais",
  instagramHref: "https://www.instagram.com/ronddecarotte_stgervais/",
  raisinHref: "https://www.raisin.digital/fr/rond-de-carotte-1119/",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Rond+de+Carotte+50+rue+de+la+Vignette+Saint-Gervais-les-Bains",
};

export type Day = { day: string; short: string; hours: string; closed?: boolean };

export const hours: Day[] = [
  { day: "Lundi", short: "Lun.", hours: "9h – 18h" },
  { day: "Mardi", short: "Mar.", hours: "Fermé", closed: true },
  { day: "Mercredi", short: "Mer.", hours: "Fermé", closed: true },
  { day: "Jeudi", short: "Jeu.", hours: "9h – 18h" },
  { day: "Vendredi", short: "Ven.", hours: "9h – 22h30" },
  { day: "Samedi", short: "Sam.", hours: "9h – 22h30" },
  { day: "Dimanche", short: "Dim.", hours: "9h – 18h" },
];

export const services = [
  { label: "Brunch & déjeuner", time: "9h – 14h" },
  { label: "Coffee shop", time: "9h – 18h" },
  { label: "Dîner", time: "Ven. & sam. soir" },
];

// À compléter : lien CoverManager. Tant qu'il est vide, les boutons « Réserver » appellent le restaurant.
export const reservationUrl = "";

export const bookingHref = reservationUrl || info.phoneHref;

// Ouvre les liens externes (CoverManager, PDF) dans un nouvel onglet.
export const external = (href: string) =>
  href.startsWith("http") || href.endsWith(".pdf") ? { target: "_blank", rel: "noreferrer" } : {};

export type Carte = { id: string; label: string; when: string; pdf: string };

// À compléter : liens vers les cartes en PDF (URL ou fichier déposé dans /public/cartes/).
export const cartes: Carte[] = [
  { id: "dejeuner-diner", label: "Déjeuner & Dîner", when: "Midi · Vendredi & samedi soir", pdf: "" },
  { id: "vins", label: "Vins", when: "Plus de 500 références", pdf: "" },
  { id: "brunch", label: "Brunch", when: "9h – 14h", pdf: "" },
  { id: "apres-midi", label: "Carte de l'après-midi", when: "À partir de 14h", pdf: "" },
];

export type MenuItem = { name: string };

export const coffeeMenu: MenuItem[] = [
  { name: "Espresso, allongé, cappuccino" },
  { name: "Latte, flat white, chaï" },
  { name: "Chocolat chaud & thés" },
  { name: "Pâtisseries maison" },
];

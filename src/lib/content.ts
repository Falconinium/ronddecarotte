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
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Rond+de+Carotte+50+rue+de+la+Vignette+Saint-Gervais-les-Bains",
};

export type Day = { day: string; hours: string; closed?: boolean };

export const hours: Day[] = [
  { day: "Lundi", hours: "9h – 19h" },
  { day: "Mardi", hours: "Fermé", closed: true },
  { day: "Mercredi", hours: "Fermé", closed: true },
  { day: "Jeudi", hours: "9h – 19h" },
  { day: "Vendredi", hours: "9h – 22h30" },
  { day: "Samedi", hours: "9h – 22h30" },
  { day: "Dimanche", hours: "9h – 18h" },
];

export const services = [
  { label: "Brunch & déjeuner", time: "9h – 14h" },
  { label: "Coffee shop", time: "14h – 19h" },
  { label: "Dîner", time: "Ven. & sam. soir" },
];

export type MenuItem = { name: string; desc?: string; price?: string };
export type MenuSection = { title: string; items: MenuItem[] };
export type Menu = {
  id: string;
  label: string;
  when: string;
  intro: string;
  sections: MenuSection[];
};

// Extraits de carte : la carte évolue au fil des saisons et du marché.
export const menus: Menu[] = [
  {
    id: "brunch",
    label: "Brunch",
    when: "Tous les jours d'ouverture · 9h – 14h",
    intro:
      "Le brunch se prend sans se presser : produits fermiers, pain au levain et pâtisseries faites maison.",
    sections: [
      {
        title: "Sucré",
        items: [
          { name: "Granola maison", desc: "Yaourt fermier, fruits de saison, miel du pays" },
          { name: "Pancakes", desc: "Sirop d'érable, fruits rouges, crème fouettée" },
          { name: "Pâtisseries du jour", desc: "Cookies, banana bread, brioche" },
        ],
      },
      {
        title: "Salé",
        items: [
          {
            name: "Œuf fermier poché",
            desc: "Châtaignes, crémeux de potimarron",
          },
          { name: "Toast au levain", desc: "Avocat, œuf mollet, herbes du jardin" },
          { name: "Assiette de montagne", desc: "Tomme, jambon de pays, pickles maison" },
        ],
      },
    ],
  },
  {
    id: "dejeuner-diner",
    label: "Déjeuner & Dîner",
    when: "Midi · Dîner les vendredis et samedis",
    intro:
      "Une cuisine de saison, courte et précise, qui met en avant les producteurs de la vallée.",
    sections: [
      {
        title: "Pour commencer",
        items: [
          { name: "Escargots de Magland", desc: "Beurre d'herbes, pain grillé" },
          { name: "Carpaccio de poisson", desc: "Huile d'olive, condiment croquant" },
        ],
      },
      {
        title: "Plats",
        items: [
          { name: "Risotto crémeux", desc: "Girolles poêlées, persil" },
          { name: "Poulpe grillé", desc: "Roquette, pommes grenaille, huile verte" },
          { name: "Poisson du lac", desc: "Beurre blanc, purée de brocolis" },
          { name: "Paleron de bœuf", desc: "Cuit longuement, jus corsé" },
        ],
      },
      {
        title: "Douceurs",
        items: [{ name: "Dessert du moment", desc: "Selon l'humeur du chef" }],
      },
    ],
  },
  {
    id: "vins",
    label: "Vins",
    when: "Au verre, à la bouteille ou à emporter",
    intro:
      "Plus de 500 références choisies chez des vignerons que l'on aime. Toutes les bouteilles de la cave peuvent être ouvertes à table.",
    sections: [
      {
        title: "Au verre",
        items: [
          { name: "Blanc de Savoie", desc: "Jacquère, Altesse, Chignin-Bergeron" },
          { name: "Rouge de Savoie", desc: "Mondeuse, Gamay, Persan" },
          { name: "Bulles", desc: "Crémant, pétillant naturel" },
        ],
      },
      {
        title: "À la bouteille",
        items: [
          { name: "Savoie & Jura", desc: "Les vignerons voisins" },
          { name: "Bourgogne & Beaujolais", desc: "Chardonnay, Pinot noir, Gamay" },
          { name: "Loire, Rhône & ailleurs", desc: "Vins nature et en biodynamie" },
        ],
      },
    ],
  },
];

export const coffeeMenu: MenuItem[] = [
  { name: "Espresso, allongé, cappuccino" },
  { name: "Latte, flat white, chaï" },
  { name: "Chocolat chaud & thés" },
  { name: "Pâtisseries maison" },
  { name: "Un verre de vin, une planche" },
];

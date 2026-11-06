import { ICE_FORMATS } from "@/lib/ice-fit";
import { LOCAL_PAGES } from "@/lib/local-pages";

export const DISCOVERY_GROUPS = [
  {
    title: "Comprendre et choisir",
    links: [
      { href: "/clear-ice", label: "Clear ice : le guide" },
      { href: "/glacons-pour-cocktails", label: "Choisir un glaçon pour cocktail" },
      { href: "/gravure-clear-ice-personnalisee", label: "Gravure et personnalisation" },
      { href: "/professionnels-evenements", label: "Bars, hôtels et événements" },
      { href: "/fondateur", label: "La maison Ice4Riches" },
    ],
  },
  {
    title: "Les formats de clear ice",
    links: ICE_FORMATS.map((format) => ({
      href: `/clear-ice/${format.id}`,
      label: `${format.title} · ${format.dimensions}`,
    })),
  },
  {
    title: "Préparer une livraison",
    links: [
      { href: "/livraison-glacons-cote-d-azur", label: "Côte d’Azur" },
      ...LOCAL_PAGES.map((page) => ({ href: `/livraison-clear-ice/${page.slug}`, label: page.city })),
      { href: "/livraison-glacons-paris", label: "Livraison à Paris" },
      { href: "/glace-cristalline-paris", label: "Glace cristalline à Paris" },
    ],
  },
];

export type LocalPage = {
  slug: string;
  city: string;
  areaServed: string[];
  title: string;
  description: string;
  intro: string;
  venueTypes: string[];
  localContext: string[];
};

export const LOCAL_PAGES: LocalPage[] = [
  {
    slug: "monaco",
    city: "Monaco",
    areaServed: ["Monaco", "Monte-Carlo", "Beausoleil", "Cap-d’Ail"],
    title: "Livraison de Clear Ice à Monaco et Monte-Carlo",
    description:
      "Clear Ice premium à Monaco et Monte-Carlo : grands glaçons transparents pour hôtels, bars, restaurants, yachts et événements. Commande directe par WhatsApp.",
    intro:
      "Ice4Riches fournit aux établissements et événements de Monaco des glaçons transparents de grand format, conçus pour les cocktails et les spiritueux d’exception.",
    venueTypes: [
      "Bars d’hôtels et palaces",
      "Restaurants et clubs",
      "Yachts et villas privées",
      "Réceptions de marque",
    ],
    localContext: [
      "À Monaco, la régularité du service et la présentation du verre font partie intégrante de l’expérience. Les formats Collins, Old Fashioned, Deluxe Cube et sphère permettent d’associer une pièce de glace précise à chaque famille de cocktails.",
      "Notre implantation à Monaco et notre dépôt à Saint-Laurent-du-Var facilitent l’étude des besoins récurrents comme des événements ponctuels à Monte-Carlo, Fontvieille, Larvotto et dans les communes limitrophes.",
    ],
  },
  {
    slug: "nice",
    city: "Nice",
    areaServed: ["Nice", "Saint-Laurent-du-Var", "Villefranche-sur-Mer", "Èze"],
    title: "Livraison de Clear Ice à Nice",
    description:
      "Livraison de Clear Ice à Nice : glaçons transparents premium pour bars à cocktails, hôtels, restaurants, plages et événements sur la Côte d’Azur.",
    intro:
      "Depuis notre dépôt de Saint-Laurent-du-Var, Ice4Riches accompagne les professionnels de Nice avec des glaçons transparents premium pour cocktails courts, highballs et dégustations.",
    venueTypes: [
      "Bars à cocktails",
      "Hôtels et rooftops",
      "Restaurants et plages",
      "Traiteurs et réceptions",
    ],
    localContext: [
      "Du Vieux-Nice à la Promenade des Anglais, les cartes de cocktails demandent des formats capables de rester nets dans le verre et constants d’un service à l’autre. Notre collection couvre les verres hauts, les verres rocks et les dégustations sur glace.",
      "Les commandes sont préparées selon le format, la quantité, la date et l’adresse de réception. Pour un service régulier, indiquez votre consommation moyenne et les dimensions de vos verres afin de sélectionner la référence adaptée.",
    ],
  },
  {
    slug: "cannes",
    city: "Cannes",
    areaServed: ["Cannes", "Mougins", "Mandelieu-la-Napoule", "Le Cannet"],
    title: "Livraison de Clear Ice à Cannes",
    description:
      "Clear Ice à Cannes : glaçons cristallins premium livrés pour hôtels, bars, restaurants, plages, villas, yachts et événements professionnels.",
    intro:
      "Ice4Riches propose à Cannes une collection de Clear Ice grand format pour valoriser cocktails, spiritueux et réceptions sur la Croisette comme dans les environs.",
    venueTypes: [
      "Palaces et bars d’hôtels",
      "Plages et restaurants",
      "Yachts et villas",
      "Congrès et soirées privées",
    ],
    localContext: [
      "À Cannes, un même événement peut mobiliser plusieurs bars et plusieurs types de verres. Le Collins structure les long drinks, tandis que le Deluxe Cube, l’Old Fashioned et la sphère donnent une présence nette aux cocktails courts.",
      "Pour les congrès, festivals, lancements et réceptions privées, transmettez la date, le lieu, le nombre de boissons et les contraintes d’accès. Ice4Riches confirme ensuite les disponibilités et les modalités logistiques.",
    ],
  },
  {
    slug: "antibes",
    city: "Antibes",
    areaServed: ["Antibes", "Juan-les-Pins", "Cap d’Antibes", "Biot"],
    title: "Livraison de Clear Ice à Antibes et Juan-les-Pins",
    description:
      "Livraison de Clear Ice à Antibes, Juan-les-Pins et Cap d’Antibes : glaçons transparents pour bars, hôtels, restaurants, villas et yachts.",
    intro:
      "Ice4Riches fournit des glaçons transparents premium à Antibes, Juan-les-Pins et au Cap d’Antibes pour les cartes de cocktails, les yachts et les réceptions privées.",
    venueTypes: [
      "Hôtels et restaurants",
      "Bars de Juan-les-Pins",
      "Yachts et ports",
      "Villas et événements",
    ],
    localContext: [
      "Entre les établissements du littoral, les villas du Cap et les yachts à quai, les besoins varient fortement en volume et en format. La gamme Ice4Riches permet de composer une sélection cohérente pour les highballs, les cocktails courts et les spiritueux.",
      "Une demande complète précise l’adresse, la date, le créneau souhaité, les quantités et les références. Ces informations permettent de confirmer une organisation adaptée au lieu et au rythme du service.",
    ],
  },
  {
    slug: "saint-tropez",
    city: "Saint-Tropez",
    areaServed: ["Saint-Tropez", "Ramatuelle", "Gassin", "Grimaud", "Cogolin"],
    title: "Livraison de Clear Ice à Saint-Tropez",
    description:
      "Clear Ice premium à Saint-Tropez, Ramatuelle et dans le golfe : grands glaçons transparents pour plages, hôtels, restaurants, villas, yachts et événements.",
    intro:
      "Ice4Riches dessert Saint-Tropez et son golfe avec une collection de glaçons transparents grand format destinée aux établissements haut de gamme et aux événements privés.",
    venueTypes: [
      "Beach clubs et restaurants",
      "Hôtels et bars de prestige",
      "Yachts et villas privées",
      "Événements et services de conciergerie",
    ],
    localContext: [
      "À Saint-Tropez, Ramatuelle, Gassin, Grimaud et Cogolin, la saison impose d’anticiper les volumes, les accès et les horaires. Les formats Ice4Riches sont conditionnés par pièces pour planifier précisément le nombre de cocktails servis.",
      "Pour une plage, un yacht, une villa ou une réception, indiquez la date, le lieu exact, les contraintes d’accès et la quantité souhaitée. Les modalités de livraison sont confirmées directement avec l’équipe avant le service.",
    ],
  },
];

export function getLocalPage(slug: string) {
  return LOCAL_PAGES.find((page) => page.slug === slug);
}

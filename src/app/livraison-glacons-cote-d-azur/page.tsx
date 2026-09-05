import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/livraison-glacons-cote-d-azur",
  title: "Livraison de glace cristalline sur la Côte d’Azur",
  description:
    "Préparez votre demande de glaçons transparents Ice4Riches à Nice, Cannes, Antibes, Monaco ou Saint-Tropez : formats, prix TTC et commande WhatsApp.",
  socialTitle: "Glace cristalline sur la Côte d’Azur",
  socialDescription:
    "Des glaçons premium nés sur la Côte d’Azur pour les bars, hôtels, restaurants et événements de la Riviera.",
});

const serviceAreas = ["Nice", "Cannes", "Antibes", "Monaco", "Saint-Tropez"];

const faq = [
  {
    question: "Comment demander une livraison de glaçons sur la Côte d’Azur ?",
    answer:
      "Sélectionnez les formats et quantités dans le catalogue Ice4Riches, renseignez le lieu et la date souhaités, puis ouvrez le récapitulatif dans WhatsApp. La demande doit ensuite être envoyée pour que l’équipe confirme la disponibilité et les modalités.",
  },
  {
    question: "Quelles villes peut-on indiquer dans une demande ?",
    answer:
      "Vous pouvez notamment indiquer Nice, Cannes, Antibes, Monaco, Saint-Tropez ou une autre destination. Ice4Riches étudie les demandes en France et à l’international, puis confirme les possibilités selon le lieu, la date et les quantités.",
  },
  {
    question: "Quel est le minimum de commande ?",
    answer:
      "Le minimum affiché dans le catalogue est de 100 € TTC. Le panier indique le montant restant avant de pouvoir préparer la demande WhatsApp.",
  },
  {
    question: "Quels formats conviennent aux bars et hôtels ?",
    answer:
      "Le Collins accompagne les verres hauts. Le Deluxe Cube, l’Old Fashioned et la sphère sont pensés pour les cocktails courts et les spiritueux servis dans un verre bas. Vérifiez toujours les dimensions intérieures du verre avant de choisir.",
  },
  {
    question: "La demande WhatsApp confirme-t-elle la livraison ?",
    answer:
      "Non. Le message transmet le panier et les informations de livraison à Ice4Riches. Les disponibilités et modalités sont confirmées directement avec le client avant le service.",
  },
];

export default function LivraisonGlaconsCoteDAzurPage() {
  return (
    <SeoLandingPage
      path="/livraison-glacons-cote-d-azur"
      serviceName="Livraison de glace cristalline sur la Côte d’Azur"
      areaServed={serviceAreas}
      eyebrow="Côte d’Azur"
      title="Glace cristalline premium sur la Côte d’Azur"
      intro="Née sur la Riviera, Ice4Riches propose aux bars, hôtels, restaurants et événements des glaçons transparents de grand format. Préparez votre demande pour Nice, Cannes, Antibes, Monaco, Saint-Tropez ou une autre destination."
      highlights={[
        { value: "4 formats", label: "Collins, Old Fashioned, cube et sphère" },
        { value: "100 € TTC", label: "Montant minimum du panier" },
        {
          value: "Sur confirmation",
          label: "Disponibilités et modalités validées avec Ice4Riches",
        },
      ]}
      sections={[
        {
          title: "Une signature visuelle née sur la Riviera",
          paragraphs: [
            "Sur la Côte d’Azur, le cocktail accompagne les bars d’hôtels, les restaurants, les plages, les villas et les réceptions. Ice4Riches place la glace au centre de cette mise en scène avec des pièces transparentes et régulières qui valorisent la couleur de la boisson.",
            "La congélation directionnelle limite les bulles d’air et les zones troubles. Le résultat donne au verre une présence nette, sans remplacer le travail du bartender ni le choix du spiritueux.",
          ],
        },
        {
          title: "Nice, Cannes, Antibes, Monaco et Saint-Tropez",
          paragraphs: [
            "Le catalogue permet de préparer une demande pour les principaux pôles de la Riviera comme pour une autre destination. Indiquez précisément le lieu de réception afin que l’équipe puisse étudier les possibilités logistiques adaptées.",
            "Aucun délai ou créneau n’est automatiquement garanti par le panier. La date, l’adresse, les conditions d’accès et la disponibilité des références sont confirmées directement après l’envoi de la demande.",
          ],
          bullets: [
            "Nice et ses environs",
            "Cannes et Antibes",
            "Monaco et Monte-Carlo",
            "Saint-Tropez et le golfe",
          ],
        },
        {
          title: "Le bon format pour chaque verre",
          paragraphs: [
            "Le Collins 4 × 4 × 12 cm suit la ligne des highballs et des cocktails allongés. Le Deluxe Cube 5 × 5 × 5 cm et l’Old Fashioned 5 × 5 × 7 cm structurent les verres bas. La sphère de 5,5 cm apporte une présence plus sculpturale.",
            "Avant de commander, mesurez l’ouverture et la hauteur utile des verres. Pour un établissement ou un événement, répartissez ensuite les boissons prévues par format et ajoutez une marge cohérente avec le rythme du service.",
          ],
        },
        {
          title: "Une demande complète, prête à confirmer",
          paragraphs: [
            "Composez un panier d’au moins 100 € TTC, puis renseignez le contact et l’adresse de livraison. Le bouton final prépare un message WhatsApp qui reprend les références, les quantités et le total sans envoyer automatiquement la commande.",
            "Ajoutez dans la remarque la date souhaitée, le créneau envisagé, le type de lieu et les éventuelles contraintes d’accès. Ces informations permettent à Ice4Riches de répondre sur la disponibilité et les modalités réelles de la demande.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        {
          href: "/livraison-clear-ice/monaco",
          title: "Clear Ice à Monaco",
          description:
            "Glaçons transparents pour hôtels, bars, restaurants, yachts et événements à Monaco et Monte-Carlo.",
        },
        {
          href: "/livraison-clear-ice/nice",
          title: "Clear Ice à Nice",
          description:
            "Service destiné aux bars, hôtels, restaurants, plages et réceptions à Nice et aux environs.",
        },
        {
          href: "/livraison-clear-ice/cannes",
          title: "Clear Ice à Cannes",
          description:
            "Une collection premium pour la Croisette, les hôtels, plages, yachts, villas et grands événements.",
        },
        {
          href: "/livraison-clear-ice/antibes",
          title: "Clear Ice à Antibes",
          description:
            "Glaçons grand format pour Antibes, Juan-les-Pins, le Cap d’Antibes, les villas et les yachts.",
        },
        {
          href: "/livraison-clear-ice/saint-tropez",
          title: "Clear Ice à Saint-Tropez",
          description:
            "Livraison étudiée pour Saint-Tropez, Ramatuelle, Gassin, Grimaud et l’ensemble du golfe.",
        },
        {
          href: "/glacons-pour-cocktails",
          title: "Choisir le format adapté au cocktail",
          description:
            "Comparez Collins, Deluxe Cube, Old Fashioned et sphère selon le verre et la recette.",
        },
        {
          href: "/professionnels-evenements",
          title: "Préparer un besoin professionnel",
          description:
            "Anticipez les formats, les quantités et les informations utiles pour un établissement ou une réception.",
        },
      ]}
    />
  );
}

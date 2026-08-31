import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/livraison-glacons-paris",
  title: "Livraison de glaçons premium à Paris",
  description:
    "Commandez des glaçons transparents Ice4Riches à livrer à Paris : 4 formats, prix TTC affichés, minimum de 100 € et envoi direct par WhatsApp.",
  socialTitle: "Livraison de glaçons transparents à Paris",
  socialDescription:
    "Composez votre panier Ice4Riches, renseignez l’adresse de livraison et envoyez la demande directement par WhatsApp.",
});

const faq = [
  {
    question: "Comment commander des glaçons avec livraison à Paris ?",
    answer:
      "Ouvrez le catalogue Ice4Riches, choisissez les formats et quantités, puis renseignez le nom, le téléphone et l’adresse de livraison. Le bouton final prépare le récapitulatif et l’ouvre dans WhatsApp pour envoi à Ice4Riches.",
  },
  {
    question: "Quel est le montant minimum de commande ?",
    answer:
      "Le panier minimum affiché par Ice4Riches est de 100 € TTC. Le catalogue indique en temps réel le montant restant avant de pouvoir envoyer la demande.",
  },
  {
    question: "Quels glaçons transparents peut-on faire livrer ?",
    answer:
      "La collection comprend le Deluxe Cube 5 × 5 × 5 cm en 60 pièces, l’Old Fashioned 5 × 5 × 7 cm en 60 pièces, le Collins 4 × 4 × 12 cm en 54 pièces et les sphères de 5,5 cm en 25 pièces.",
  },
  {
    question: "Comment préciser la date et les contraintes de livraison ?",
    answer:
      "Ajoutez la date souhaitée, le créneau visé, l’accès au lieu et toute contrainte utile dans la remarque de commande. Ice4Riches confirme ensuite directement la disponibilité et les modalités applicables.",
  },
  {
    question: "La demande envoyée sur WhatsApp vaut-elle confirmation ?",
    answer:
      "L’envoi transmet votre panier et vos coordonnées à Ice4Riches. La disponibilité et les modalités de livraison sont ensuite confirmées directement avec vous avant le service.",
  },
];

export default function LivraisonGlaconsParisPage() {
  return (
    <SeoLandingPage
      path="/livraison-glacons-paris"
      serviceName="Livraison de glaçons transparents à Paris"
      eyebrow="Livraison à Paris"
      title="Livraison de glaçons transparents premium à Paris"
      intro="Ice4Riches simplifie la commande de glace cristalline à Paris : sélectionnez le format adapté à vos verres, composez un panier d’au moins 100 € TTC et transmettez votre demande directement sur WhatsApp."
      highlights={[
        { value: "100 € TTC", label: "Montant minimum du panier" },
        { value: "4 formats", label: "Cube, Old Fashioned, Collins et sphère" },
        {
          value: "WhatsApp",
          label: "Demande transmise directement à Ice4Riches",
        },
      ]}
      sections={[
        {
          title: "Commander des glaçons à livrer à Paris",
          paragraphs: [
            "Le catalogue Ice4Riches rassemble les références disponibles, leur conditionnement et leur prix TTC. Vous ajoutez les produits au panier sans quitter le site, puis vous renseignez les informations nécessaires à la livraison.",
            "Lorsque le minimum de 100 € TTC est atteint, le récapitulatif peut être transmis à Ice4Riches par WhatsApp. Ce parcours direct évite de recopier les références et permet de garder les quantités, le total et l’adresse dans un même message.",
          ],
        },
        {
          title: "Choisir le format selon le verre",
          paragraphs: [
            "Le Collins allongé est pensé pour les highballs et les verres hauts. Le Deluxe Cube et l’Old Fashioned occupent les verres bas avec une présence visuelle nette. La sphère convient aux spiritueux et aux cocktails courts lorsqu’une forme plus sculpturale est recherchée.",
            "Chaque référence est vendue par conditionnement. Pour estimer le besoin, partez du nombre de boissons prévues, associez une pièce au verre concerné, puis gardez une marge adaptée au rythme du service.",
          ],
          bullets: [
            "Deluxe Cube : 60 pièces",
            "Old Fashioned : 60 pièces",
            "Collins : 54 pièces",
            "Sphères : 25 pièces",
          ],
        },
        {
          title: "Préparer les informations de livraison",
          paragraphs: [
            "Une adresse complète accélère la qualification de la demande. Indiquez le nom du contact sur place, son téléphone, l’adresse parisienne et, si nécessaire, un point de repère ou les conditions d’accès.",
            "Pour un bar, un hôtel, un restaurant ou un événement, ajoutez dans la remarque la date souhaitée, le créneau visé et toute contrainte de réception. Ice4Riches pourra ainsi confirmer les modalités en tenant compte du lieu et du besoin réel.",
          ],
          bullets: [
            "Nom et téléphone du contact",
            "Adresse complète à Paris",
            "Date et créneau souhaités",
            "Accès et consignes de réception",
          ],
        },
        {
          title: "Un parcours clair jusqu’à la confirmation",
          paragraphs: [
            "La demande se prépare en quatre étapes : choisir les produits, ajuster les quantités, compléter les coordonnées de livraison puis ouvrir le message WhatsApp prérempli. Les prix et le total restent visibles avant l’envoi.",
            "Le message WhatsApp constitue une demande de commande. La disponibilité des références et les conditions applicables sont confirmées directement par Ice4Riches avant la livraison.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        {
          href: "/glace-cristalline-paris",
          title: "Découvrir la glace cristalline à Paris",
          description:
            "Comprenez le rôle de la transparence, du grand format et de la dilution dans le verre.",
        },
        {
          href: "/glacons-pour-cocktails",
          title: "Choisir ses glaçons pour cocktails",
          description:
            "Comparez le cube, l’Old Fashioned, le Collins et la sphère selon votre service.",
        },
        {
          href: "/professionnels-evenements",
          title: "Préparer un besoin professionnel",
          description:
            "Anticipez les quantités et les contraintes d’un bar, d’un hôtel ou d’un événement.",
        },
      ]}
    />
  );
}

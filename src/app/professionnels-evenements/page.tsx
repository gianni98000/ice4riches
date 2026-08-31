import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/professionnels-evenements",
  title: "Glaçons premium pour professionnels et événements",
  description:
    "Nés sur la Côte d’Azur et livrés dans le monde entier, les glaçons cristallins Ice4Riches subliment bars, hôtels, restaurants et événements.",
  socialTitle: "Glaçons premium pour professionnels et événements",
  socialDescription:
    "Une collection née sur la Côte d’Azur, livrée dans le monde entier pour sublimer cocktails, spiritueux et réceptions.",
});

const faq = [
  {
    question: "Ice4Riches travaille-t-il avec les bars et restaurants ?",
    answer:
      "Oui. La collection est présentée pour les bars, restaurants, hôtels et événements. Le catalogue permet de préparer une demande avec les références et les quantités souhaitées.",
  },
  {
    question: "Peut-on commander plusieurs formats pour un même événement ?",
    answer:
      "Le catalogue permet d’ajouter plusieurs références au panier avant l’envoi de la demande par WhatsApp. Vous pouvez ainsi associer un format aux verres hauts et un autre aux cocktails courts.",
  },
  {
    question: "Comment estimer le nombre de pièces nécessaire ?",
    answer:
      "Partez du nombre de boissons prévues pour chaque format et ajoutez une marge adaptée au déroulement du service. Les conditionnements affichés sur le site indiquent le nombre de pièces par référence.",
  },
  {
    question: "Comment demander une commande professionnelle récurrente ?",
    answer:
      "Préparez une première demande dans le catalogue et précisez dans la remarque qu’il s’agit d’un besoin récurrent. Ice4Riches pourra alors confirmer directement les modalités adaptées.",
  },
  {
    question: "Où consulter les tarifs professionnels ?",
    answer:
      "Les prix et références disponibles sont affichés dans le catalogue de commande Ice4Riches. Pour un volume ou un besoin particulier, transmettez les détails par WhatsApp afin d’obtenir une confirmation.",
  },
];

export default function ProfessionnelsEvenementsPage() {
  return (
    <SeoLandingPage
      path="/professionnels-evenements"
      serviceName="Glaçons premium pour professionnels et événements"
      eyebrow="Offre professionnelle"
      title="Glaçons premium pour bars, hôtels et événements"
      intro="Née sur la Côte d’Azur et livrée dans le monde entier, la collection Ice4Riches aide les professionnels à construire un service visuel cohérent, du highball au verre Old Fashioned."
      highlights={[
        {
          value: "25 à 60 pièces",
          label: "Des conditionnements lisibles selon les références",
        },
        {
          value: "4 formes",
          label: "Pour répartir les formats selon les verres",
        },
        {
          value: "Demande directe",
          label: "Panier transmis à Ice4Riches par WhatsApp",
        },
      ]}
      sections={[
        {
          title: "Une signature visuelle pour la carte des cocktails",
          paragraphs: [
            "Dans un bar ou un restaurant, la glace participe à la constance du dressage. Utiliser un format défini pour chaque famille de cocktails aide les équipes à reproduire la même présentation d’un service à l’autre.",
            "Le Collins accompagne les verres hauts, tandis que l’Old Fashioned, le Deluxe Cube et la sphère structurent les cocktails courts et les dégustations de spiritueux. Cette répartition simplifie le choix au poste de bar.",
          ],
        },
        {
          title: "Bars, restaurants, hôtels et traiteurs",
          paragraphs: [
            "Chaque métier a son rythme : une carte permanente dans un bar, un service de chambre dans un hôtel, une sélection de spiritueux au restaurant ou plusieurs points de service pour un traiteur. Les références Ice4Riches permettent d’adapter la forme au verre et à l’expérience attendue.",
            "Pour un besoin récurrent, indiquez la fréquence envisagée, les formats utilisés et le nombre moyen de boissons dans la remarque de commande. Ces éléments facilitent la confirmation de la demande.",
          ],
          bullets: [
            "Bars à cocktails et bars d’hôtels",
            "Restaurants et lieux de dégustation",
            "Traiteurs et bartenders événementiels",
            "Réceptions privées ou de marque",
          ],
        },
        {
          title: "Préparer les quantités d’un événement",
          paragraphs: [
            "Commencez par répartir les boissons prévues par type de verre. Une recette servie en highball appelle un Collins ; un cocktail court peut utiliser un cube, un Old Fashioned ou une sphère. Multipliez ensuite le nombre de boissons par le nombre de glaçons prévu par verre.",
            "Les fiches de la collection précisent le nombre de pièces par conditionnement. Prévoyez une marge selon la durée de la réception, le nombre de postes de bar et les éventuels changements de programme.",
          ],
        },
        {
          title: "Une commande simple à transmettre aux équipes",
          paragraphs: [
            "Le catalogue en ligne centralise les références disponibles. Après avoir constitué le panier, renseignez le contact et l’adresse demandés, puis envoyez le récapitulatif par WhatsApp à Ice4Riches.",
            "Pour accélérer la validation, mentionnez la date du service, le lieu, les formats de verres et toute contrainte utile. Ice4Riches pourra confirmer les modalités à partir d’une demande complète, sans échange dispersé entre plusieurs canaux.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        {
          href: "/glacons-pour-cocktails",
          title: "Guide des formats de glaçons",
          description:
            "Associez Collins, cube, Old Fashioned et sphère aux bons cocktails.",
        },
        {
          href: "/#contact",
          title: "Livraison dans le monde entier",
          description:
            "Présentez votre destination et votre besoin à l’équipe Ice4Riches.",
        },
      ]}
    />
  );
}

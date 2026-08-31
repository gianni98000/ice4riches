import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/glace-cristalline-paris",
  title: "Glace cristalline à Paris",
  description:
    "Découvrez les glaçons transparents Ice4Riches à Paris : cubes, Collins, Old Fashioned et sphères pour bars, hôtels, restaurants et événements.",
  socialTitle: "Glace cristalline et glaçons transparents à Paris",
  socialDescription:
    "Des formats de glace premium pensés pour les cocktails, les spiritueux et les événements à Paris.",
});

const faq = [
  {
    question: "Où commander de la glace cristalline à Paris ?",
    answer:
      "Le catalogue Ice4Riches permet de sélectionner les formats souhaités, de renseigner les coordonnées de livraison et d’envoyer la demande directement par WhatsApp. La commande est ensuite confirmée avec Ice4Riches.",
  },
  {
    question: "Quels formats de glaçons transparents sont proposés ?",
    answer:
      "La collection présentée sur le site comprend le Collins 4 × 4 × 12 cm, l’Old Fashioned 5 × 5 × 7 cm, le Deluxe Cube 5 × 5 × 5 cm et la sphère de 5,5 cm.",
  },
  {
    question: "À quels professionnels s’adresse Ice4Riches ?",
    answer:
      "Les formats Ice4Riches sont destinés notamment aux bars à cocktails, restaurants, hôtels, traiteurs et organisateurs d’événements qui recherchent une présentation premium des boissons.",
  },
  {
    question: "Pourquoi choisir un grand glaçon pour un cocktail ?",
    answer:
      "Un grand format présente moins de surface par rapport à son volume que plusieurs petits glaçons. Il permet ainsi de maîtriser plus progressivement la dilution, tandis que la transparence valorise visuellement le verre.",
  },
  {
    question: "Où se trouve Ice4Riches à Paris ?",
    answer:
      "L’adresse professionnelle indiquée par Ice4Riches est 18-26 rue Goubet, 75019 Paris. Les modalités de commande se traitent directement via le catalogue en ligne et WhatsApp.",
  },
];

export default function GlaceCristallineParisPage() {
  return (
    <SeoLandingPage
      path="/glace-cristalline-paris"
      serviceName="Glace cristalline premium à Paris"
      eyebrow="Glace à Paris"
      title="Glace cristalline et glaçons transparents à Paris"
      intro="Ice4Riches propose des glaçons de grand format conçus pour mettre en valeur cocktails et spiritueux. Une collection premium accessible aux établissements et aux événements parisiens."
      highlights={[
        { value: "4 formats", label: "Collins, Old Fashioned, cube et sphère" },
        { value: "Paris 19e", label: "Adresse professionnelle rue Goubet" },
        {
          value: "Commande directe",
          label: "Catalogue en ligne puis confirmation WhatsApp",
        },
      ]}
      sections={[
        {
          title: "Une glace pensée comme un ingrédient du cocktail",
          paragraphs: [
            "Dans un cocktail, la glace agit sur la température, la dilution et la présentation. Ice4Riches privilégie des pièces transparentes et régulières qui prennent pleinement leur place dans le verre, au même titre que le spiritueux, les bitters ou la garniture.",
            "La clarté est obtenue par un processus de congélation directionnelle qui limite les zones troubles. Le résultat met en valeur la couleur de la boisson et donne au service une signature visuelle immédiatement identifiable.",
          ],
        },
        {
          title: "Des formats adaptés aux verres et aux recettes",
          paragraphs: [
            "Le Collins allongé accompagne les highballs et les verres hauts. L’Old Fashioned et le Deluxe Cube conviennent aux cocktails courts ou aux spiritueux servis sur glace. La sphère apporte une présence plus sculpturale dans un verre bas.",
            "Le choix ne repose pas uniquement sur l’esthétique : la forme doit correspondre au diamètre du verre, au volume de boisson et au rythme de dégustation recherché.",
          ],
          bullets: [
            "Collins 4 × 4 × 12 cm",
            "Old Fashioned 5 × 5 × 7 cm",
            "Deluxe Cube 5 × 5 × 5 cm",
            "Sphère de 5,5 cm",
          ],
        },
        {
          title: "Pour les bars, hôtels, restaurants et réceptions",
          paragraphs: [
            "La collection répond aux besoins des professionnels qui veulent harmoniser le rendu de leurs boissons : carte de cocktails, service d’un bar d’hôtel, dégustation de spiritueux, dîner privé ou réception de marque.",
            "Les conditionnements indiquent un nombre de pièces précis. Cela facilite le choix d’un format en fonction du nombre de verres prévu, tout en conservant une présentation cohérente pendant le service.",
          ],
        },
        {
          title: "Commander Ice4Riches depuis Paris",
          paragraphs: [
            "Le bouton de commande ouvre le catalogue Ice4Riches. Il suffit de sélectionner les références, d’indiquer les quantités et de compléter les coordonnées demandées. Le récapitulatif est ensuite transmis directement par WhatsApp.",
            "Cette confirmation permet de vérifier les modalités adaptées à chaque demande avant le service. Pour un événement ou un besoin professionnel spécifique, ajoutez les informations utiles dans la remarque de commande.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        {
          href: "/glacons-pour-cocktails",
          title: "Choisir son format pour un cocktail",
          description:
            "Cube, Collins, Old Fashioned ou sphère : comparez les usages de chaque forme.",
        },
        {
          href: "/professionnels-evenements",
          title: "Solutions pour professionnels et événements",
          description:
            "Préparez un service cohérent pour un bar, un hôtel, un restaurant ou une réception.",
        },
      ]}
    />
  );
}

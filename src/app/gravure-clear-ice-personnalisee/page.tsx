import { EngravingStudio } from "@/components/engraving/engraving-studio";
import { ENGRAVING_PATH } from "@/lib/engraving";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { LOCAL_PAGES } from "@/lib/local-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: ENGRAVING_PATH,
  title: "Gravure de clear ice et glaçons personnalisés",
  description:
    "Testez votre logo sur un glaçon de clear ice en 3D, calculez le prix et envoyez votre commande en ligne. Atelier Ice4Riches sur la Côte d’Azur.",
});

const faq = [
  {
    question: "Où demander des glaçons personnalisés avec un logo sur la Côte d’Azur ?",
    answer:
      "Importez votre logo dans l’atelier Ice4Riches, choisissez le format et la quantité puis indiquez votre date et adresse. L’équipe confirme les modalités de livraison à Monaco, Nice, Cannes, Antibes et Saint-Tropez.",
  },
  {
    question: "Peut-on graver un logo, des initiales ou un motif dans un glaçon ?",
    answer:
      "Oui. Ice4Riches étudie les logos de marques ou d’établissements, les initiales et les motifs pour personnaliser la clear ice. Le rendu, l’emplacement et le format de glace sont validés selon le visuel et la faisabilité du projet.",
  },
  {
    question: "Quel est le prix des glaçons gravés ?",
    answer:
      "L’atelier calcule le prix estimatif des glaçons, de la gravure, du calibrage et de la TVA. Le coût de livraison est calculé pour les tournées à Cannes et confirmé par l’équipe pour les autres destinations.",
  },
  {
    question: "Quel délai et quelle quantité minimum prévoir pour une personnalisation ?",
    answer:
      "Le délai et les quantités acceptées sont confirmés directement pour chaque projet. Indiquez votre date et votre volume souhaités dès la première demande. La disponibilité n’est pas garantie avant confirmation par Ice4Riches.",
  },
  {
    question: "Comment transmettre mon logo pour obtenir un devis ?",
    answer:
      "Déposez votre fichier PNG, JPG, WebP ou SVG dans l’atelier. Le diagnostic en ligne aide à repérer les détails fins ou les aplats. Le fichier et le motif sélectionné sont transmis avec votre commande pour validation.",
  },
  {
    question: "Comment commander des glaçons personnalisés ?",
    answer:
      "Vous pouvez envoyer votre commande directement depuis l’atelier. Ice4Riches vous contacte pour confirmer le logo, le tarif et la livraison, puis le paiement intégral se fait par virement avant production.",
  },
];

export default function GravureClearIcePage() {
  return (
    <SeoLandingPage
      path={ENGRAVING_PATH}
      serviceName="Atelier de gravure et personnalisation de clear ice"
      eyebrow="Gravure sur mesure"
      title="Atelier de gravure Clear Ice"
      intro="Essayez votre logo sur la glace, affinez le rendu et commandez vos glaçons gravés."
      studio={<EngravingStudio />}
      areaServed={LOCAL_PAGES.map((page) => page.city)}
      highlights={[
        { value: "Logo, initiales, motif", label: "Une signature adaptée à votre projet" },
        { value: "Estimation en direct", label: "Glace, gravure et calibrage" },
        { value: "Côte d’Azur", label: "De Monaco à Saint-Tropez, modalités à confirmer" },
      ]}
      sections={[
        {
          title: "Qu’est-ce que la clear ice personnalisée ?",
          paragraphs: [
            "La clear ice désigne une glace transparente destinée notamment au service des cocktails et des spiritueux. La personnalisation lui ajoute un signe distinctif : le logo de votre maison, des initiales ou un motif lié à votre événement.",
            "Chez Ice4Riches, la gravure fait l’objet d’une étude spécifique. Le format de glace, l’emplacement du visuel et sa faisabilité sont confirmés avec vous avant validation du projet.",
          ],
        },
        {
          title: "Une signature pour vos cocktails et événements",
          paragraphs: [
            "La personnalisation peut accompagner l’identité d’un bar ou d’un hôtel, une réception de mariage, un lancement de marque ou un service à bord d’un yacht. Le visuel doit être pensé avec le verre et la présentation du cocktail.",
            "Parmi les projets à étudier : un logo pour un cocktail signature, des initiales pour une réception privée ou un motif pour un événement de marque. Chaque demande reste soumise à validation de la faisabilité.",
          ],
          bullets: ["Bars et hôtels", "Mariages et réceptions privées", "Événements de marque", "Yachts et conciergeries"],
        },
        {
          title: "Comment préparer votre commande ?",
          paragraphs: [
            "Adressez votre visuel à hello@ice4riches.com ou sur WhatsApp au +377 6 40 62 29 56. Précisez le nombre de pièces souhaité, la date, la ville et le lieu de service. Les dimensions des verres et le type de cocktail aideront à étudier le format adapté.",
            "Après réception de votre commande, notre équipe confirme la faisabilité, le tarif et la livraison. Pour un autre format ou un emplacement différent, écrivez à hello@ice4riches.com.",
          ],
          bullets: ["Logo, initiales ou motif", "Quantités souhaitées", "Date et lieu de service", "Verres et format envisagé"],
        },
        {
          title: "Votre projet de Monaco à Saint-Tropez",
          paragraphs: [
            "Ice4Riches étudie les demandes de clear ice personnalisée à Monaco, Nice, Cannes, Antibes et Saint-Tropez. Consultez la page de votre ville ci-dessous pour découvrir l’offre locale de clear ice.",
            "Pour un hôtel, une villa, un lieu de réception ou un yacht, indiquez l’adresse et les contraintes d’accès dans votre demande. Le lieu et la date permettent de confirmer les modalités adaptées à votre projet.",
          ],
        },
      ]}
      faq={faq}
      relatedLinks={[
        ...LOCAL_PAGES.map((page) => ({
          href: `/livraison-clear-ice/${page.slug}`,
          title: `Clear Ice à ${page.city}`,
          description: `Découvrez l’offre locale pour vos cocktails et événements à ${page.city}.`,
        })),
        {
          href: "/professionnels-evenements",
          title: "Professionnels et événements",
          description: "Préparez les formats et les quantités pour votre service.",
        },
      ]}
    />
  );
}

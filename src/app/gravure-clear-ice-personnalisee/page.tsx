import { SeoLandingPage } from "@/components/seo-landing-page";
import { LOCAL_PAGES } from "@/lib/local-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/gravure-clear-ice-personnalisee",
  title: "Gravure de clear ice et glaçons personnalisés",
  description:
    "Clear ice gravée avec logo, initiales ou motif. Personnalisation sur devis à Monaco, Nice, Cannes, Antibes et Saint-Tropez pour bars, hôtels et événements.",
});

const faq = [
  {
    question: "Où demander des glaçons personnalisés avec un logo sur la Côte d’Azur ?",
    answer:
      "Ice4Riches propose la gravure et la personnalisation de clear ice sur devis pour Monaco, Nice, Cannes, Antibes et Saint-Tropez. Contactez hello@ice4riches.com ou WhatsApp au +377 6 40 62 29 56 avec votre visuel, les quantités, la date et le lieu. Les modalités de livraison sont confirmées selon le projet.",
  },
  {
    question: "Peut-on graver un logo, des initiales ou un motif dans un glaçon ?",
    answer:
      "Oui. Ice4Riches étudie les logos de marques ou d’établissements, les initiales et les motifs pour personnaliser la clear ice. Le rendu, l’emplacement et le format de glace sont validés selon le visuel et la faisabilité du projet.",
  },
  {
    question: "Quel est le prix des glaçons gravés ?",
    answer:
      "La gravure est proposée sur devis. Le tarif est confirmé après étude du visuel, du format, des quantités et du lieu de livraison. Les prix du catalogue standard ne constituent pas un tarif de personnalisation.",
  },
  {
    question: "Quel délai et quelle quantité minimum prévoir pour une personnalisation ?",
    answer:
      "Le délai et les quantités acceptées sont confirmés directement pour chaque projet. Indiquez votre date et votre volume souhaités dès la première demande. La disponibilité n’est pas garantie avant confirmation par Ice4Riches.",
  },
  {
    question: "Comment transmettre mon logo pour obtenir un devis ?",
    answer:
      "Envoyez votre visuel par e-mail à hello@ice4riches.com ou sur WhatsApp au +377 6 40 62 29 56. Ajoutez les quantités, la date, la ville, le lieu et, si possible, les dimensions des verres. L’équipe vous indiquera les éléments complémentaires nécessaires à l’étude.",
  },
  {
    question: "La personnalisation se commande-t-elle dans la boutique en ligne ?",
    answer:
      "Non. La gravure et la personnalisation sont traitées uniquement sur devis, par contact direct avec Ice4Riches. Elles ne sont pas proposées comme option dans les commandes en ligne.",
  },
];

export default function GravureClearIcePage() {
  return (
    <SeoLandingPage
      path="/gravure-clear-ice-personnalisee"
      serviceName="Gravure et personnalisation de clear ice sur devis"
      eyebrow="Clear Ice sur mesure"
      title="Gravure de clear ice et glaçons personnalisés"
      intro="Ice4Riches personnalise la clear ice avec un logo, des initiales ou un motif pour les bars, hôtels, marques et événements privés. Cette prestation est proposée sur devis à Monaco, Nice, Cannes, Antibes et Saint-Tropez, avec étude du visuel et confirmation des modalités pour chaque projet."
      quoteOnly
      areaServed={LOCAL_PAGES.map((page) => page.city)}
      highlights={[
        { value: "Logo, initiales, motif", label: "Une signature adaptée à votre projet" },
        { value: "Sur devis", label: "Contact direct par WhatsApp ou e-mail" },
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
          title: "Comment préparer votre demande de devis ?",
          paragraphs: [
            "Adressez votre visuel à hello@ice4riches.com ou sur WhatsApp au +377 6 40 62 29 56. Précisez le nombre de pièces souhaité, la date, la ville et le lieu de service. Les dimensions des verres et le type de cocktail aideront à étudier le format adapté.",
            "Notre équipe étudie votre demande et confirme le format, la faisabilité, le tarif, le délai et les modalités de livraison. La gravure et la personnalisation se traitent par contact direct, exclusivement sur devis.",
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

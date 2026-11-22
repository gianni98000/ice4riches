import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  path: "/livraison-glacons-france",
  title: "Livraison de clear ice partout en France",
  description:
    "Ice4Riches livre ses glaçons transparents et personnalisés partout en France : bars, hôtels, restaurants et événements. Choisissez vos formats et quantités.",
});

export default function LivraisonGlaconsFrancePage() {
  return (
    <SeoLandingPage
      path="/livraison-glacons-france"
      serviceName="Livraison de clear ice partout en France"
      areaServed={["France", "Monaco"]}
      eyebrow="Livraison en France"
      title="Votre clear ice, partout en France"
      intro="Ice4Riches livre ses glaçons transparents partout en France et à Monaco. Pour votre bar, hôtel, restaurant ou événement, choisissez votre format et indiquez votre adresse : notre équipe prépare avec vous les modalités de livraison."
      highlights={[
        { value: "Toute la France", label: "Livraison nationale et à Monaco" },
        { value: "4 formats", label: "Deluxe Cube, Old Fashioned, Collins et sphère" },
        { value: "Sur mesure", label: "Logo, initiales ou motif dans l’atelier de gravure" },
      ]}
      sections={[
        {
          title: "De la Côte d’Azur à toutes les régions de France",
          paragraphs: [
            "Née sur la Côte d’Azur, Ice4Riches accompagne les professionnels et les événements dans toute la France. Paris, Lyon, Marseille, Bordeaux, Lille, Nantes, Strasbourg ou une autre commune : notre service de livraison ne se limite pas à la Riviera.",
            "Indiquez l’adresse complète, les quantités, la date souhaitée et les contraintes de réception. Les disponibilités, les frais et le créneau sont confirmés directement avec notre équipe avant la livraison.",
          ],
        },
        {
          title: "Commander vos glaçons transparents",
          paragraphs: [
            "Le catalogue présente les formats, dimensions, conditionnements et prix TTC. Comparez le Deluxe Cube, l’Old Fashioned, le Collins et la sphère selon vos verres et vos cocktails.",
            "Composez un panier d’au moins 100 € TTC, renseignez vos coordonnées et votre adresse, puis ouvrez le récapitulatif WhatsApp. Vérifiez le message et envoyez-le à Ice4Riches pour confirmer votre commande avec l’équipe.",
          ],
        },
        {
          title: "Des glaçons personnalisés, livrés à votre événement",
          paragraphs: [
            "La livraison nationale concerne aussi la clear ice personnalisée. Importez votre logo, vos initiales ou votre motif dans l’atelier, visualisez le rendu sur la glace et préparez votre commande en ligne.",
            "Notre équipe valide le visuel, la faisabilité, le tarif et les modalités de livraison avant production. Pour un projet à l’international, contactez-nous avec le lieu, la date et les quantités souhaitées.",
          ],
        },
      ]}
      faq={[
        {
          question: "Livrez-vous partout en France ?",
          answer: "Oui. Ice4Riches livre sa clear ice et ses glaçons personnalisés partout en France, ainsi qu’à Monaco. Renseignez votre adresse complète pour que notre équipe confirme les frais et le créneau de livraison.",
        },
        {
          question: "Quels sont les frais et délais de livraison ?",
          answer: "Les frais et délais sont confirmés avec notre équipe selon l’adresse, les quantités, les produits et la date souhaitée. Le panier ou l’envoi d’une demande ne garantit pas automatiquement un créneau.",
        },
        {
          question: "Comment préparer une livraison pour un établissement ou un événement ?",
          answer: "Précisez les formats, les quantités, l’adresse complète, la date souhaitée et le contact sur place. Ajoutez les consignes d’accès et de réception pour organiser la livraison avec Ice4Riches.",
        },
      ]}
      relatedLinks={[
        { href: "/clear-ice", title: "Choisir votre clear ice", description: "Comparez les quatre formats et leurs usages dans le verre." },
        { href: "/gravure-clear-ice-personnalisee", title: "Personnaliser vos glaçons", description: "Essayez votre logo et préparez votre commande dans l’atelier de gravure." },
        { href: "/professionnels-evenements", title: "Professionnels et événements", description: "Préparez vos quantités et les informations utiles pour votre service." },
      ]}
    />
  );
}

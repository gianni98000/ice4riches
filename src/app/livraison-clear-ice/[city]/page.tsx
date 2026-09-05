import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";
import { getLocalPage, LOCAL_PAGES } from "@/lib/local-pages";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return LOCAL_PAGES.map((page) => ({ city: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const page = getLocalPage(city);

  if (!page) {
    return {};
  }

  return createPageMetadata({
    path: `/livraison-clear-ice/${page.slug}`,
    title: page.title,
    description: page.description,
    socialTitle: `${page.city} · Clear Ice premium`,
    socialDescription: page.description,
  });
}

export default async function LocalClearIcePage({ params }: PageProps) {
  const { city } = await params;
  const page = getLocalPage(city);

  if (!page) {
    notFound();
  }

  const otherCities = LOCAL_PAGES.filter((item) => item.slug !== page.slug).slice(0, 2);

  return (
    <SeoLandingPage
      path={`/livraison-clear-ice/${page.slug}`}
      serviceName={`Fourniture et livraison de Clear Ice à ${page.city}`}
      areaServed={page.areaServed}
      eyebrow={page.city}
      title={page.title}
      intro={page.intro}
      highlights={[
        { value: "4 formats", label: "Collins, Old Fashioned, cube et sphère" },
        { value: "Clear Ice", label: "Glace transparente premium pour cocktails" },
        { value: "Commande directe", label: "Demande détaillée transmise par WhatsApp" },
      ]}
      sections={[
        {
          title: `La Clear Ice à ${page.city}`,
          paragraphs: page.localContext,
          bullets: page.venueTypes,
        },
        {
          title: "Quatre formats pour les cartes de cocktails",
          paragraphs: [
            "Le Collins 4 × 4 × 12 cm accompagne les highballs et les cocktails allongés. Le Deluxe Cube 5 × 5 × 5 cm et l’Old Fashioned 5 × 5 × 7 cm occupent les verres bas avec une seule grande pièce. La sphère de 5,5 cm crée une présentation plus sculpturale.",
            "Avant de commander, vérifiez l’ouverture et la hauteur utile de chaque verre. Une bonne correspondance entre la glace, le verre et la recette améliore la régularité du dressage et permet de prévoir les quantités par service.",
          ],
        },
        {
          title: "Une glace pensée pour les professionnels",
          paragraphs: [
            "Ice4Riches s’adresse aux bars, hôtels, restaurants, traiteurs, conciergeries, yachts et organisateurs d’événements qui recherchent une glace visuelle, régulière et prête à intégrer au service.",
            "Pour une demande récurrente, précisez la fréquence, le nombre moyen de boissons et les formats de verres utilisés. Pour un événement, ajoutez le nombre d’invités, les horaires et le nombre de postes de bar.",
          ],
        },
        {
          title: `Commander votre Clear Ice à ${page.city}`,
          paragraphs: [
            "Composez votre panier dans le catalogue en ligne, renseignez l’adresse et ajoutez la date souhaitée dans la remarque. Le récapitulatif est ensuite préparé dans WhatsApp afin que vous puissiez le vérifier et l’envoyer à Ice4Riches.",
            "Le minimum affiché dans le catalogue est de 100 € TTC. La disponibilité, le délai et les modalités de livraison sont confirmés directement après réception de la demande complète.",
          ],
        },
      ]}
      faq={[
        {
          question: `Ice4Riches livre-t-il la Clear Ice à ${page.city} ?`,
          answer: `Oui. Ice4Riches étudie les demandes de livraison à ${page.areaServed.join(", ")}. La date, l’adresse, les quantités et les modalités sont confirmées directement avec le client.`,
        },
        {
          question: "Quels formats de glaçons transparents sont disponibles ?",
          answer:
            "La collection comprend le Collins 4 × 4 × 12 cm, l’Old Fashioned 5 × 5 × 7 cm, le Deluxe Cube 5 × 5 × 5 cm et la sphère de 5,5 cm.",
        },
        {
          question: "Peut-on organiser un approvisionnement régulier ?",
          answer:
            "Oui. Indiquez dans votre demande la fréquence souhaitée, les formats utilisés et votre consommation moyenne. Ice4Riches pourra confirmer une organisation adaptée à votre établissement.",
        },
        {
          question: "Quel est le minimum de commande ?",
          answer:
            "Le catalogue demande un panier minimum de 100 € TTC avant de préparer le récapitulatif WhatsApp.",
        },
        {
          question: "Comment obtenir un devis pour un événement ?",
          answer:
            "Ajoutez les références au panier, puis précisez la date, le lieu, le nombre d’invités, les horaires et les contraintes d’accès dans la remarque avant d’envoyer la demande sur WhatsApp.",
        },
      ]}
      relatedLinks={[
        {
          href: "/livraison-glacons-cote-d-azur",
          title: "Clear Ice sur toute la Côte d’Azur",
          description:
            "Découvrez la collection et les principales zones desservies entre Monaco et Saint-Tropez.",
        },
        ...otherCities.map((item) => ({
          href: `/livraison-clear-ice/${item.slug}`,
          title: `Clear Ice à ${item.city}`,
          description: `Consultez l’offre locale Ice4Riches pour ${item.city} et ses environs.`,
        })),
      ]}
    />
  );
}

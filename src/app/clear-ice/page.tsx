import Link from "next/link";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";
import { ICE_FORMATS } from "@/lib/ice-fit";

export const metadata = createPageMetadata({
  path: "/clear-ice",
  title: "Clear ice : glaçons transparents, formats et gravure",
  description: "Qu’est-ce que la clear ice ? Comparez les formats Ice4Riches, choisissez votre verre et préparez une livraison ou une gravure personnalisée sur devis.",
});

export default function ClearIcePage() {
  return (
    <SeoLandingPage
      path="/clear-ice" serviceName="Guide de la clear ice Ice4Riches" entityType="Article"
      eyebrow="Le guide Clear Ice" title="Clear ice : choisir sa glace transparente"
      intro="La clear ice, ou glace cristalline, est une glace transparente utilisée pour présenter les cocktails et les spiritueux. Ice4Riches propose quatre formats de glaçons pour les bars, hôtels, restaurants, yachts et événements, ainsi qu’une prestation de gravure et de personnalisation sur devis."
      highlights={[
        { value: "4 formats", label: "Cube, Old Fashioned, Collins et sphère" },
        { value: "Le bon verre", label: "Dimensions et usages à comparer avant la commande" },
        { value: "Gravure sur devis", label: "Logo, initiales ou motif selon faisabilité" },
      ]}
      sections={[
        { title: "Qu’est-ce que la clear ice ?", paragraphs: [
          "Clear ice signifie glace transparente. On parle aussi de glace cristalline ou de glaçons transparents. La congélation directionnelle limite les bulles d’air et les zones troubles pour obtenir une pièce visuellement plus nette.",
          "La transparence est un critère visuel ; elle ne suffit pas à garantir une fonte plus lente. La masse, la surface exposée, la température de la glace et celle de la boisson influencent la dilution.",
        ] },
        { title: "Quel format choisir pour votre cocktail ?", paragraphs: [
          "Le Deluxe Cube convient aux cocktails courts comme le Negroni. L’Old Fashioned, plus haut, demande davantage de hauteur utile dans le verre. Le Collins accompagne les highballs et long drinks. La sphère apporte une présentation ronde pour les spiritueux et les verres bas adaptés.",
          "Mesurez l’ouverture, la hauteur utile et le passage intérieur du verre. Pour un bloc carré dans un verre rond, vérifiez la diagonale de la section, pas seulement sa largeur. Ice Lab vous aide à comparer les mesures avec une marge de service.",
        ] },
        { title: "Où acheter de la clear ice ?", paragraphs: [
          "Ice4Riches fournit de la clear ice pour les établissements et événements sur la Côte d’Azur : Monaco, Nice, Cannes, Antibes et Saint-Tropez. Les demandes pour Paris et les autres destinations sont étudiées directement avec l’équipe.",
          "Le catalogue affiche les références, conditionnements et prix TTC. Après avoir choisi les quantités, transmettez votre demande par WhatsApp avec la date et l’adresse. Les disponibilités, délais et conditions de livraison sont confirmés avant le service.",
        ] },
        { title: "Comment demander une gravure de clear ice ?", paragraphs: [
          "Pour des glaçons personnalisés avec un logo, des initiales ou un motif, envoyez votre visuel, les quantités, la date et le lieu à hello@ice4riches.com ou par WhatsApp au +377 6 40 62 29 56.",
          "La gravure est exclusivement sur devis. L’équipe étudie le format, l’emplacement du motif, la faisabilité, le tarif et le délai. Cette prestation ne se commande pas comme une option dans le panier en ligne.",
        ] },
      ]}
      faq={[
        { question: "Clear ice et glaçons transparents désignent-ils le même produit ?", answer: "Oui. Clear ice est l’expression anglaise utilisée pour la glace transparente, également appelée glace cristalline. Il faut ensuite préciser le format, les dimensions et les quantités recherchés." },
        { question: "Ice4Riches propose-t-il de la clear ice aux professionnels ?", answer: "Oui. Ice4Riches s’adresse aux bars, hôtels, restaurants, traiteurs, yachts et organisateurs d’événements. Les besoins récurrents et les réceptions ponctuelles sont étudiés en fonction des formats, volumes, dates et lieux de service." },
        { question: "La clear ice peut-elle porter mon logo ?", answer: "Ice4Riches propose une prestation de gravure et personnalisation avec logo, initiales ou motif, exclusivement sur devis. La faisabilité et le rendu sont étudiés selon le visuel et le format envisagé." },
        { question: "La clear ice fond-elle toujours moins vite ?", answer: "Non. La transparence ne garantit pas une durée de fonte. La taille, la forme, la masse de glace, les températures et le mouvement dans le verre influencent le refroidissement et la dilution." },
      ]}
      relatedLinks={[
        { href: "/gravure-clear-ice-personnalisee", title: "Gravure et glaçons personnalisés", description: "Les informations à transmettre pour votre devis de personnalisation." },
        { href: "/glacons-pour-cocktails", title: "Le guide des cocktails", description: "Comparez les formats selon les verres, recettes et conditions de service." },
        { href: "/livraison-glacons-cote-d-azur", title: "Livraison sur la Côte d’Azur", description: "Préparez votre demande de Monaco à Saint-Tropez." },
      ]}
    >
      <section className="mx-auto max-w-5xl px-6 pt-16" aria-labelledby="formats-table">
        <h2 id="formats-table" className="mb-6 text-3xl">Les formats de clear ice Ice4Riches</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm leading-6">
            <caption className="sr-only">Dimensions et usages des quatre formats de glaçons transparents</caption>
            <thead><tr className="border-b border-white/30"><th scope="col" className="p-3">Format</th><th scope="col" className="p-3">Dimensions</th><th scope="col" className="p-3">Usages</th></tr></thead>
            <tbody>{ICE_FORMATS.map((format) => <tr key={format.id} className="border-b border-white/15"><th scope="row" className="p-3"><Link className="underline underline-offset-4" href={`/clear-ice/${format.id}`}>{format.title}</Link></th><td className="whitespace-nowrap p-3">{format.dimensions}</td><td className="p-3">{format.use}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/70">Les fiches détaillent les dimensions et les points à vérifier dans votre verre. Les prix et conditionnements à jour restent dans le catalogue.</p>
      </section>
    </SeoLandingPage>
  );
}

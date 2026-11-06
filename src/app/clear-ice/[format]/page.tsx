import Image from "next/image";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { createPageMetadata } from "@/lib/metadata";
import { ICE_FORMATS } from "@/lib/ice-fit";
import { FORMAT_DETAILS } from "@/lib/format-details";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ format: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ICE_FORMATS.map((format) => ({ format: format.id })); }
export async function generateMetadata({ params }: Props) {
  const { format: id } = await params;
  const format = ICE_FORMATS.find((item) => item.id === id);
  if (!format) return {};
  const detail = FORMAT_DETAILS[format.id];
  return createPageMetadata({ path: `/clear-ice/${format.id}`, title: detail.title, description: `${format.title} Ice4Riches, ${format.dimensions} : ${format.use.toLowerCase()}. Dimensions, choix du verre et demande de livraison de clear ice.` });
}

export default async function ClearIceFormatPage({ params }: Props) {
  const { format: id } = await params;
  const format = ICE_FORMATS.find((item) => item.id === id);
  if (!format) notFound();
  const detail = FORMAT_DETAILS[format.id];
  const passage = (format.shape === "sphere" ? format.width : Math.hypot(format.width, format.depth)) + 4;
  return (
    <SeoLandingPage
      path={`/clear-ice/${format.id}`} serviceName={detail.title} title={detail.title}
      eyebrow="La collection" intro={detail.intro} entityType="Product"
      entityProperties={{
        image: `${SITE_URL}${format.image}`,
        brand: { "@type": "Brand", name: "Ice4Riches" },
        width: { "@type": "QuantitativeValue", value: format.width, unitCode: "MMT" },
        depth: { "@type": "QuantitativeValue", value: format.depth, unitCode: "MMT" },
        height: { "@type": "QuantitativeValue", value: format.height, unitCode: "MMT" },
      }}
      highlights={[
        { value: format.dimensions, label: "Dimensions du format" },
        { value: format.title, label: format.use },
        { value: "Sur confirmation", label: "Disponibilité et livraison à valider avec notre équipe" },
      ]}
      sections={[
        { title: detail.heading, paragraphs: [detail.advice] },
        { title: "Vérifier les dimensions du verre", paragraphs: [
          `Pour un verre rond à parois droites, notre outil Ice Lab ajoute une marge de service de 4 mm au passage et de 5 mm à la hauteur de glace. Pour ce format, cela correspond à environ ${passage.toFixed(1).replace(".", ",")} mm de diamètre intérieur et ${format.height + 5} mm de hauteur utile.`,
          "Ces valeurs sont une aide géométrique au choix, pas une garantie de compatibilité. Mesurez l’ouverture, la base intérieure et les zones rétrécies. Un verre courbe, facetté ou irrégulier demande une vérification physique.",
        ] },
        { title: "Préparer votre demande de clear ice", paragraphs: [
          "Consultez le catalogue pour les prix, conditionnements et disponibilités affichés. Indiquez les quantités, la date, le lieu et les contraintes d’accès avant de transmettre votre demande par WhatsApp à Ice4Riches.",
          "Notre équipe confirme les modalités pour Monaco, Nice, Cannes, Antibes, Saint-Tropez, Paris ou une autre destination. Un panier préparé ne constitue pas une confirmation de livraison.",
        ] },
        { title: "Vous souhaitez une gravure ?", paragraphs: [
          "La personnalisation avec logo, initiales ou motif est une prestation distincte, exclusivement sur devis. Envoyez votre visuel, le format envisagé, les quantités, la date et le lieu à hello@ice4riches.com. La faisabilité sur ce format est étudiée avant confirmation ; aucune option de gravure n’est ajoutée au panier en ligne.",
        ] },
      ]}
      faq={[
        { question: `Quelles sont les dimensions du format ${format.title} ?`, answer: `Le format ${format.title} Ice4Riches mesure ${format.dimensions}. Il est présenté pour les usages suivants : ${format.use.toLowerCase()}. Vérifiez les dimensions intérieures du verre avant de choisir.` },
        { question: detail.question, answer: detail.answer },
        { question: "Où trouver le prix et le conditionnement à jour ?", answer: "Les prix TTC et le nombre de pièces sont affichés dans le catalogue de commande Ice4Riches. Les disponibilités et modalités sont confirmées avec l’équipe après réception de votre demande. La gravure fait l’objet d’un devis séparé." },
      ]}
      relatedLinks={[
        { href: "/#ice-lab", title: "Vérifier votre verre dans Ice Lab", description: "Comparez vos mesures aux dimensions de la glace avec nos marges de service." },
        { href: "/glacons-pour-cocktails", title: "Comparer les formats", description: "Associez cube, Collins, Old Fashioned et sphère à votre cocktail." },
        { href: "/gravure-clear-ice-personnalisee", title: "Gravure de clear ice", description: "Préparez votre demande de personnalisation sur devis." },
      ]}
    >
      <figure className="mx-auto max-w-3xl px-6 pt-16">
        <Image src={format.image} alt={`${format.title} Ice4Riches — clear ice ${format.dimensions}`} width={1000} height={750} className="max-h-[480px] w-full object-contain" />
        <figcaption className="mt-4 text-center text-sm text-[#f5f3ef]/70">{format.title} · {format.dimensions} · Visuel du format standard, sans gravure.</figcaption>
      </figure>
    </SeoLandingPage>
  );
}

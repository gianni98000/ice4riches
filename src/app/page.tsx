import { DiscoveryLinks } from "@/components/discovery-links";
import { LiquidMark } from "@/components/liquid-mark";
import { JsonLd } from "@/components/json-ld";
import { CinematicMotion } from "@/components/cinematic-motion";
import { CinematicStage } from "@/components/cinematic-stage";
import { IceLab } from "@/components/ice-lab";
import { getOrderProducts } from "@/lib/order-catalog";
import { ICE_FORMATS, orderLink } from "@/lib/ice-fit";
import {
  ORDER_ACCESSORIES_URL,
  ORDER_URL,
  SEO_PAGES,
  SITE_URL,
} from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import "./switzer.css";
import "./cinematic.css";

export const revalidate = 300;
const money = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});
const homeFaq = [
  {
    question: "Où acheter de la clear ice sur la Côte d’Azur ?",
    answer: "Ice4Riches propose des glaçons transparents pour les bars, hôtels, restaurants, yachts et événements à Monaco, Nice, Cannes, Antibes et Saint-Tropez. Choisissez les formats au catalogue et transmettez votre demande par WhatsApp. La disponibilité et la livraison sont confirmées directement avec l’équipe.",
  },
  {
    question: "Peut-on personnaliser ou faire graver sa Clear Ice ?",
    answer:
      "Oui. Ice4Riches propose la gravure et la personnalisation de Clear Ice avec un logo, des initiales ou un motif pour les bars, hôtels, marques et événements privés. Envoyez votre visuel, les quantités, la date et le lieu par WhatsApp ou par e-mail pour un devis. Le format, la faisabilité, le tarif et le délai sont confirmés selon le projet. Cette prestation se demande directement auprès de notre équipe.",
  },
  {
    question: "Qu’est-ce que la glace cristalline ?",
    answer:
      "La glace cristalline est une glace transparente ou presque transparente, produite en contrôlant le sens de congélation afin de limiter les bulles d’air et les zones troubles visibles.",
  },
  {
    question: "Quels glaçons choisir pour un cocktail ?",
    answer:
      "Le Collins convient aux verres hauts, tandis que l’Old Fashioned, le grand cube et la sphère sont adaptés aux cocktails courts et aux spiritueux servis dans un verre bas.",
  },
  {
    question: "Ice4Riches s’adresse-t-il aux professionnels ?",
    answer:
      "Oui. Ice4Riches présente sa collection aux bars, restaurants, hôtels, traiteurs et organisateurs d’événements qui recherchent des glaçons premium pour leurs boissons.",
  },
  {
    question: "Comment commander chez Ice4Riches ?",
    answer:
      "Le bouton Commander ouvre le catalogue en ligne. Après avoir choisi les références pour un minimum de 100 € TTC et renseigné les coordonnées de livraison, le récapitulatif est préparé dans WhatsApp pour que vous puissiez le vérifier et l’envoyer à Ice4Riches.",
  },
];

const homeFaqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default async function Home() {
  const catalog = await getOrderProducts();
  const products = ICE_FORMATS.flatMap((format) => {
    const product = catalog.find(
      (p) => p.category === "Ice" && p.name.startsWith(format.match),
    );
    return product ? [{ ...product, format }] : [];
  });
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "La collection Ice4Riches",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        image: p.image,
        brand: { "@type": "Brand", name: "Ice4Riches" },
        offers: {
          "@type": "Offer",
          url: SITE_URL + orderLink(p.name),
          price: p.price.toFixed(2),
          priceCurrency: "EUR",
          availability: p.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };
  return (
    <div className="cinematic-site">
      <CinematicMotion />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE_URL}/#webpage`, url: SITE_URL, name: "Ice4Riches — Clear ice et gravure sur mesure", inLanguage: "fr-FR", isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${SITE_URL}/#organization` } }} />
      <JsonLd data={schema} />
      <JsonLd data={homeFaqStructuredData} />
      <header className="studio-header">
        <Link
          href="/"
          className="studio-wordmark"
          aria-label="Ice4Riches accueil"
        >
          ice4riches
        </Link>
        <nav aria-label="Navigation principale">
          <a href="#produits">La glace</a>
          <a href="#ice-lab">Votre verre</a>
          <a href="#personnalisation">Sur mesure</a>
        </nav>
        <a href={ORDER_URL} className="header-order">
          Commander
        </a>
      </header>
      <a href="#ice-lab" className="skip-link">
        Aller au sélecteur de glace
      </a>
      <main>
        <CinematicStage
          videoSrc="/cinematic/ice4riches-hero-2k.mp4"
          posterSrc="/cinematic/ice4riches-hero-poster.webp"
        />
        <section className="clear-ice-intro" aria-labelledby="clear-ice-offer">
          <h2 id="clear-ice-offer">Clear ice et gravure sur mesure.</h2>
          <p>Ice4Riches fournit des glaçons transparents pour les cocktails des bars, hôtels, restaurants, yachts et événements. Cube, Old Fashioned, Collins ou sphère : choisissez votre format pour Monaco, Nice, Cannes, Antibes et Saint-Tropez. Les demandes pour Paris et l’international sont étudiées avec notre équipe.</p>
          <p>Pour signer un cocktail, la gravure de clear ice avec logo, initiales ou motif se demande exclusivement sur devis.</p>
          <div><Link href="/clear-ice">Comprendre et choisir la clear ice →</Link><Link href="/gravure-clear-ice-personnalisee">Découvrir la gravure →</Link></div>
        </section>
        <IceLab products={catalog.filter((p) => p.category === "Ice")} />
        <section id="produits" className="collection-section">
          <div className="section-intro" data-reveal>
            <h2>
              La forme fait
              <br />
              la différence.
            </h2>
            <p>
              Un bloc qui habille un verre haut. Une sphère qui accompagne un
              spiritueux. Choisissez le format qui sert votre idée.
            </p>
          </div>
          <div className="product-spread">
            {products.map((p) => (
              <article
                className={`ice-product product-${p.format.id}`}
                key={p.name}
                data-reveal
              >
                <a
                  className="product-picture"
                  href={orderLink(p.name)}
                  aria-label={`Commander ${p.format.title}`}
                >
                  <Image
                    src={p.format.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </a>
                <div className="product-copy">
                  <h3><Link href={`/clear-ice/${p.format.id}`}>{p.format.title}</Link></h3>
                  <p>
                    {p.format.dimensions} · {p.format.use}
                  </p>
                  <div className="product-price">
                    <span>
                      {p.caption} · {money.format(p.price)} TTC
                    </span>
                    <a href={orderLink(p.name)}>
                      {p.available ? "Choisir" : "Voir la référence"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="collection-note">
            Minimum de commande : 100 € TTC. Consultez le catalogue pour les
            disponibilités.
          </p>
        </section>
        <section className="craft-section" id="matiere">
          <div data-reveal>
            <h2>
              Transparente.
              <br />
              Tout simplement.
            </h2>
            <p>
              La congélation directionnelle limite les bulles et les zones
              troubles. Elle révèle les couleurs du cocktail et laisse la
              lumière traverser la glace.
            </p>
            <p>
              Le grand format, lui, donne sa place à la dégustation. Le résultat
              se juge dans le verre.
            </p>
            <a className="text-link" href="/fondateur">
              Rencontrer le fondateur
            </a>
          </div>
          <div className="craft-picture" data-reveal>
            <Image
              src="/cinematic/old-fashioned.jpg"
              alt="Transparence du bloc Old Fashioned Ice4Riches"
              fill
              sizes="(max-width:700px) 100vw, 50vw"
            />
          </div>
        </section>
        <section
          className="references-section"
          aria-labelledby="references-title"
        >
          <h2 id="references-title" data-reveal>
            À leurs comptoirs.
          </h2>
          <div className="reference-logos">
            {[
              { name: "La Chèvre d’Or", src: "chevre-dor.png" },
              { name: "Amazónico Monte-Carlo", src: "amazonico.svg" },
              { name: "Twiga Monte-Carlo", src: "twiga-monte-carlo.svg" },
              { name: "Le Bar Américain Monaco", src: "bar-americain.webp" },
              { name: "COYA Monte-Carlo", src: "coya-monte-carlo.webp" },
              { name: "The Maybourne Riviera", src: "maybourne-riviera.webp" },
            ].map((c) => (
              <div key={c.name}>
                <Image
                  src={`/clients/${c.src}`}
                  alt={c.name}
                  width={180}
                  height={80}
                />
              </div>
            ))}
          </div>
        </section>
        <section id="personnalisation" className="signature-section">
          <div className="signature-photo" data-reveal>
            <Image
              src="/cinematic/cube.jpg"
              alt="Cube de clear ice Ice4Riches avant personnalisation"
              fill
              sizes="(max-width:700px) 100vw, 50vw"
            />
          </div>
          <div className="signature-copy" data-reveal>
            <h2>
              Votre marque.
              <br />
              Dans la glace.
            </h2>
            <p>
              Un logo, des initiales, un motif. La gravure prolonge l’identité
              de votre maison jusque dans le verre.
            </p>
            <p>
              Partagez votre visuel, vos quantités, votre date et votre lieu.
              Nous étudions le format, la faisabilité et le devis avec vous.
            </p>
            <a
              className="button"
              href={`https://wa.me/377640622956?text=${encodeURIComponent("Bonjour Ice4Riches, je souhaite un devis pour une gravure de clear ice. Visuel, quantités, date et lieu : ")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Créer ma signature
            </a>
            <Link className="text-link" href="/gravure-clear-ice-personnalisee">
              Découvrir la gravure et la personnalisation
            </Link>
            <a className="text-link" href={ORDER_ACCESSORIES_URL}>
              Voir les outils de service
            </a>
          </div>
        </section>
        <section className="faq-section">
          <h2>En toute clarté.</h2>
          <div>
            {homeFaq.map((q) => (
              <details key={q.question}>
                <summary>{q.question}</summary>
                <p>{q.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-finale">
          <h2>À vous de servir.</h2>
          <a className="button" href={ORDER_URL}>
            Composer ma commande
          </a>
          <a className="text-link" href="mailto:hello@ice4riches.com">
            Parlons de votre établissement
          </a>
          <nav className="city-links" aria-label="Informations de livraison">
            {[
              { city: "Monaco", slug: "monaco" },
              { city: "Cannes", slug: "cannes" },
              { city: "Saint-Tropez", slug: "saint-tropez" },
              { city: "Nice", slug: "nice" },
              { city: "Antibes", slug: "antibes" },
            ].map((v) => (
              <a href={`/livraison-clear-ice/${v.slug}`} key={v.slug}>
                {v.city}
              </a>
            ))}
          </nav>
          <p>
            Disponibilités et modalités de livraison confirmées avec notre
            équipe.
          </p>
        </section>
      </main>
      <DiscoveryLinks currentPath="/" />
      <footer className="cinema-footer">
        <Link className="footer-wordmark" href="/">
          <LiquidMark text="ice4riches" />
        </Link>
        <div className="footer-links">
          <p>
            Clear ice, Côte d’Azur.
            <br />© {new Date().getFullYear()} Ice4Riches
          </p>
          <nav aria-label="Informations">
            {SEO_PAGES.map((p) => (
              <a href={p.href} key={p.href}>
                {p.label}
              </a>
            ))}
          </nav>
          <div>
            <a href="mailto:hello@ice4riches.com">hello@ice4riches.com</a>
            <a
              href="https://www.instagram.com/ice4riches/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="/licenses/liquid-logo.txt">
              Effet Liquid Logo · Paper Design
            </a>
            <a
              href="https://wa.me/377640622956"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

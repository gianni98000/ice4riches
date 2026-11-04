import { JsonLd } from "@/components/json-ld";
import { ClientMarquee } from "@/components/client-marquee";
import { SiteHeader } from "@/components/site-header";
import { CinematicMotion, HeroFilm } from "@/components/cinematic-motion";
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
import "./cinematic.css";

export const revalidate = 300;
const money = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});
const homeFaq = [
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
      "Le bouton Commander ouvre le catalogue en ligne. Après avoir choisi les références pour un minimum de 100 € TTC et renseigné les coordonnées de livraison, le récapitulatif est envoyé directement à Ice4Riches par WhatsApp.",
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
      <JsonLd data={schema} />
      <JsonLd data={homeFaqStructuredData} />
      <SiteHeader cinematic />
      <a href="#ice-lab" className="skip-link">
        Aller au sélecteur de glace
      </a>
      <main>
        <section className="cinema-hero" aria-labelledby="hero-title">
          <HeroFilm />
          <div className="hero-content">
            <p className="eyebrow">
              <span className="tiny-star">✳</span> CLEAR ICE · CÔTE D’AZUR
            </p>
            <h1 id="hero-title">
              Le détail
              <br />
              qui change
              <br />
              <em>tout.</em>
            </h1>
            <p className="hero-description">
              Avant la première gorgée, il y a le regard.
              <br />
              Une glace cristalline. Un cocktail qui se distingue.
            </p>
            <div className="hero-actions">
              <a href="#ice-lab" className="button button-gold">
                Trouvez votre glace <span>↗</span>
              </a>
              <a className="hero-collection-link" href="#produits">
                Explorer la collection <span>↗</span>
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#matiere" className="scroll-cue">
              <span>↓</span> L’ART DU CLEAR ICE
            </a>
            <p>
              NÉE SUR LA RIVIERA.
              <br />
              <span>PENSÉE POUR L’EXCEPTION.</span>
            </p>
            <span className="hero-counter">01 — 04</span>
          </div>
        </section>
        <div
          className="location-ribbon"
          aria-label="Nos destinations sur la Côte d’Azur"
        >
          <span>MONACO</span>
          <i>✳</i>
          <span>CANNES</span>
          <i>✳</i>
          <span>SAINT-TROPEZ</span>
          <i>✳</i>
          <span>NICE</span>
          <i>✳</i>
          <span>ANTIBES</span>
        </div>
        <section id="matiere" className="ice-section manifesto">
          <p className="eyebrow" data-reveal>
            <span>01 /</span> LA BEAUTÉ DE L’ESSENTIEL
          </p>
          <div className="manifesto-body" data-reveal>
            <h2>
              Vous composez le cocktail.
              <br />
              Nous sculptons <em>son écrin.</em>
            </h2>
            <div>
              <p>
                La transparence révèle les couleurs. La forme dessine le
                service. Le grand format accompagne la dégustation.
              </p>
              <p>
                Par congélation directionnelle, Ice4Riches donne à la glace une
                clarté qui se remarque. Pour les bars, hôtels, restaurants et
                instants qui méritent mieux que l’ordinaire.
              </p>
              <a href="/fondateur" className="text-link">
                L’histoire d’Ice4Riches <span>↗</span>
              </a>
            </div>
          </div>
          <div className="editorial-detail">
            <span>TRANSPARENCE</span>
            <span>PRÉCISION</span>
            <span>PRÉSENCE</span>
            <span className="detail-sign">I4R.</span>
          </div>
        </section>
        <IceLab products={catalog.filter((p) => p.category === "Ice")} />
        <section id="produits" className="ice-section collection-section">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span>03 /</span> LA COLLECTION
              </p>
              <h2>
                Quatre formes.
                <br />
                <em>Une signature.</em>
              </h2>
            </div>
            <div>
              <p>
                Le format juste, du premier regard
                <br />à la dernière gorgée.
              </p>
              <a className="text-link" href={ORDER_URL}>
                Tout le catalogue <span>↗</span>
              </a>
            </div>
          </div>
          <div className="ice-collection">
            {products.map((p, i) => (
              <article key={p.name} className="ice-product" data-reveal>
                <a
                  href={orderLink(p.name)}
                  className="product-picture"
                  aria-label={`Découvrir ${p.format.title}`}
                >
                  <span className="product-number">0{i + 1}</span>
                  <Image
                    src={p.format.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 23vw"
                  />
                  <span className="product-arrow">↗</span>
                </a>
                <div className="product-heading">
                  <h3>{p.format.title}</h3>
                  <span>{p.format.dimensions}</span>
                </div>
                <p>{p.format.use}</p>
                <div className="product-price">
                  <span>{p.caption}</span>
                  <span>
                    {money.format(p.price)} <small>TTC</small>
                  </span>
                </div>
                {!p.available && <p>Actuellement indisponible</p>}
              </article>
            ))}
          </div>
          <div className="collection-foot">
            <span>Tarifs TTC · Minimum de commande : 100 € TTC</span>
            <a href="#ice-lab">Un doute sur le format ? Essayez l’Ice Lab ↗</a>
          </div>
        </section>
        <section className="ritual-section" aria-labelledby="ritual-title">
          <Image
            src="/cinematic/cocktail.jpg"
            alt="Un cocktail ambré dans la lumière d’un bar"
            fill
            sizes="100vw"
          />
          <div className="ritual-shade" />
          <div className="ritual-copy" data-reveal>
            <p className="eyebrow">L’ART DE RECEVOIR</p>
            <h2 id="ritual-title">
              Certains détails
              <br />
              ne passent jamais
              <br />
              <em>inaperçus.</em>
            </h2>
            <a
              href="/professionnels-evenements"
              className="button button-outline"
            >
              Pensé pour votre établissement <span>↗</span>
            </a>
          </div>
          <span className="ritual-caption">
            BARS · HÔTELS · YACHTS · ÉVÉNEMENTS
          </span>
        </section>
        <div className="cinema-clients">
          <ClientMarquee />
        </div>
        <section
          id="personnalisation"
          className="ice-section signature-section"
        >
          <div className="signature-visual" data-reveal>
            <Image
              src="/cinematic/clear-ice-poster.webp"
              alt="La lumière traverse un bloc de clear ice"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <div className="signature-visual-copy">
              <span>VOTRE EMPREINTE.</span>
              <strong>
                Votre
                <br />
                <em>signature.</em>
              </strong>
              <small>GRAVURE & PERSONNALISATION</small>
            </div>
          </div>
          <div className="signature-copy" data-reveal>
            <p className="eyebrow">
              <span>04 /</span> L’ATTENTION SUR MESURE
            </p>
            <h2>
              Votre identité.
              <br />
              <em>Dans chaque verre.</em>
            </h2>
            <p>
              Un logo. Des initiales. Un motif. Prolongez l’univers de votre
              maison jusque dans la glace.
            </p>
            <p>
              Pour un bar d’hôtel, un lancement de marque ou une réception
              privée, nous étudions votre visuel, le format, les quantités et la
              date souhaitée.
            </p>
            <a
              className="button button-gold"
              href={`https://wa.me/377640622956?text=${encodeURIComponent("Bonjour Ice4Riches, je souhaite un devis pour une gravure de clear ice. Mon visuel, mes quantités, la date et le lieu : ")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Imaginons votre signature <span>↗</span>
            </a>
            <small>
              Faisabilité, tarif et délai confirmés avec notre équipe.
            </small>
          </div>
        </section>
        <section id="accessoires" className="accessory-strip ice-section">
          <div>
            <p className="eyebrow">LE SENS DU GESTE</p>
            <h2>
              Les outils <em>du rituel.</em>
            </h2>
          </div>
          <p>
            Pics, couteaux et accessoires.
            <br />
            L’exigence se prolonge dans le service.
          </p>
          <a href={ORDER_ACCESSORIES_URL} className="text-link">
            Découvrir les accessoires ↗
          </a>
        </section>
        <section className="ice-section faq-section">
          <div>
            <p className="eyebrow">LES RÉPONSES, EN TOUTE CLARTÉ</p>
            <h2>
              Avant de
              <br />
              <em>briser la glace.</em>
            </h2>
          </div>
          <div className="faq-list">
            {homeFaq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span>+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-finale ice-section">
          <p className="eyebrow">DE LA CÔTE D’AZUR À VOTRE COMPTOIR</p>
          <h2>
            Le prochain verre
            <br />
            pourrait être <em>le vôtre.</em>
          </h2>
          <div className="finale-actions">
            <a href={ORDER_URL} className="button button-gold">
              Composer ma commande <span>↗</span>
            </a>
            <a href="mailto:hello@ice4riches.com" className="text-link">
              Parlons de votre projet ↗
            </a>
          </div>
          <nav className="city-links" aria-label="Informations de livraison">
            {[
              { city: "Monaco", slug: "monaco" },
              { city: "Cannes", slug: "cannes" },
              { city: "Saint-Tropez", slug: "saint-tropez" },
              { city: "Nice", slug: "nice" },
              { city: "Antibes", slug: "antibes" },
            ].map((v) => (
              <a key={v.slug} href={`/livraison-clear-ice/${v.slug}`}>
                {v.city} ↗
              </a>
            ))}
          </nav>
          <p className="finale-note">
            Disponibilités et modalités de livraison confirmées avec notre
            équipe.
            <br />
            Pour toute autre destination, contactez-nous.
          </p>
        </section>
      </main>
      <footer className="cinema-footer">
        <Link href="/" className="footer-wordmark">
          ICE4RICHES<span>✳</span>
        </Link>
        <div className="footer-main">
          <p>
            CLEAR ICE. PURE DISTINCTION.
            <br />
            <span>Née sur la Côte d’Azur, France.</span>
          </p>
          <nav aria-label="Liens complémentaires">
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
              Instagram ↗
            </a>
            <a
              href="https://wa.me/377640622956"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ice4Riches</span>
          <a href="#hero-title">RETOUR EN HAUT ↑</a>
          <span>LE DÉTAIL FAIT LA DIFFÉRENCE.</span>
        </div>
      </footer>
    </div>
  );
}

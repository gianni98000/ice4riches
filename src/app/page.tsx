import { JsonLd } from "@/components/json-ld";
import { ClientMarquee } from "@/components/client-marquee";
import { SiteHeader } from "@/components/site-header";
import { getOrderProducts } from "@/lib/order-catalog";
import { ORDER_ACCESSORIES_URL, ORDER_URL, SEO_PAGES, SITE_URL } from "@/lib/site";
import Image from "next/image";

const featuredIceOrder = ["COLLINS", "OLD FASHIONED", "DELUXE CUBE", "SPHERES"];

const productDescriptions: Record<string, string> = {
  COLLINS: "Parfait pour les highballs et cocktails allongés",
  "OLD FASHIONED": "Idéal pour les cocktails classiques et whisky",
  "DELUXE CUBE": "Le cube parfait pour une dilution lente",
  SPHERES: "L’élégance ultime pour vos spiritueux",
};

const toolDescriptions: Record<string, string> = {
  "PIC À GLACE": "Pour sculpter vos glaçons avec précision",
  COUTEAU: "Lame artisanale pour une coupe nette",
};

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function descriptionFor(name: string, descriptions: Record<string, string>) {
  const key = Object.keys(descriptions).find((candidate) =>
    name.toLocaleUpperCase("fr-FR").startsWith(candidate),
  );

  return key ? descriptions[key] : "Produit premium Ice4Riches";
}

const homeFaq = [
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
  const products = featuredIceOrder
    .map((featuredName) =>
      catalog.find(
        (product) =>
          product.category === "Ice" && product.name.startsWith(featuredName),
      ),
    )
    .filter((product) => product !== undefined);
  const tools = catalog
    .filter((product) => product.category === "Dérivée")
    .slice(0, 2);
  const catalogStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Collection de glace cristalline Ice4Riches",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: `${product.caption} · ${descriptionFor(product.name, productDescriptions)}`,
        image: product.image,
        brand: {
          "@type": "Brand",
          name: "Ice4Riches",
        },
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}${ORDER_URL}`,
          price: product.price.toFixed(2),
          priceCurrency: "EUR",
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: product.price.toFixed(2),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
        },
      },
    })),
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <JsonLd data={[homeFaqStructuredData, catalogStructuredData]} />
      <SiteHeader productsHref="#produits" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=90"
            alt="Premium Cocktail"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/80 via-transparent to-[#0f0f0f]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-8">
              Premium Clear Ice
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 animate-fade-up text-shadow-gold"
            style={{ animationDelay: "0.4s" }}
          >
            L'Art du Clear Ice
            <span className="block text-gradient-gold font-semibold italic">
              sur la Côte d’Azur
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-[#f5f3ef]/60 max-w-2xl mx-auto mb-12 animate-fade-up font-light"
            style={{ animationDelay: "0.6s" }}
          >
            De Monaco à Saint-Tropez, notre glace cristalline premium sublime
            les cocktails des bars, hôtels, restaurants, yachts et événements.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "0.8s" }}
          >
            <a
              href={ORDER_URL}
              className="group px-8 py-4 bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] text-[#0f0f0f] font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,98,0.5)] hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Découvrir nos produits
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#produits"
              className="px-8 py-4 border border-[#c9a962]/50 text-[#c9a962] font-semibold tracking-wider uppercase hover:bg-[#c9a962]/10 transition-all duration-300"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-[#c9a962]/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#c9a962] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produits" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-6">
              Notre Collection
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">
              Glaçons transparents{" "}
              <span className="text-gradient-gold italic">
                nés sur la Côte d’Azur
              </span>
            </h2>
            <p className="text-[#f5f3ef]/65 max-w-xl mx-auto">
              Chaque glaçon est fabriqué selon un processus de congélation
              directionnelle pour une transparence cristalline parfaite. Tarifs
              TTC · Minimum de commande 100 € TTC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <a
                key={product.name}
                href={ORDER_URL}
                className="group relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#c9a962]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gradient-gold mb-1">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#f5f3ef]/75">
                        {product.caption}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-light text-[#c9a962]">
                        {priceFormatter.format(product.price)} TTC
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#f5f3ef]/75 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    {descriptionFor(product.name, productDescriptions)}
                  </p>
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#c9a962]/30 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee />

      {/* SEO discovery section */}
      <section className="relative border-y border-[#f5f3ef]/10 bg-[#151515] py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block border border-[#c9a962]/30 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-[#c9a962]">
              De la Côte d’Azur au monde
            </span>
            <h2 className="mt-6 text-4xl font-light md:text-6xl">
              Le bon format pour chaque{" "}
              <span className="text-gradient-gold italic">service</span>
            </h2>
            <p className="mt-6 leading-8 text-[#f5f3ef]/55">
              Ice4Riches accompagne les cocktails courts, les highballs, les
              dégustations de spiritueux et les réceptions avec des formats
              pensés pour le verre et la présentation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <a
              href="/livraison-glacons-cote-d-azur"
              className="group border border-[#f5f3ef]/10 p-8 transition-colors hover:border-[#c9a962]/50"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#c9a962]">
                Origine
              </p>
              <h3 className="mt-4 text-2xl">Nés sur la Côte d’Azur</h3>
              <p className="mt-4 leading-7 text-[#f5f3ef]/50">
                Une glace d’exception inspirée par l’exigence, l’élégance et
                l’art de recevoir de la Riviera.
              </p>
              <span className="mt-6 inline-block text-sm text-[#c9a962]">
                Découvrir le service régional →
              </span>
            </a>
            <a
              href={ORDER_URL}
              className="group border border-[#f5f3ef]/10 p-8 transition-colors hover:border-[#c9a962]/50"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#c9a962]">
                International
              </p>
              <h3 className="mt-4 text-2xl">Livraison dans le monde entier</h3>
              <p className="mt-4 leading-7 text-[#f5f3ef]/50">
                Indiquez votre destination et vos besoins : notre équipe étudie
                chaque demande de livraison internationale.
              </p>
              <span className="mt-6 inline-block text-sm text-[#c9a962]">
                Demander une livraison →
              </span>
            </a>
            <a
              href="/glacons-pour-cocktails"
              className="group border border-[#f5f3ef]/10 p-8 transition-colors hover:border-[#c9a962]/50"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#c9a962]">
                Guide
              </p>
              <h3 className="mt-4 text-2xl">
                Choisir son glaçon pour cocktail
              </h3>
              <p className="mt-4 leading-7 text-[#f5f3ef]/50">
                Comparez Collins, cube, Old Fashioned et sphère selon le verre
                et la recette.
              </p>
              <span className="mt-6 inline-block text-sm text-[#c9a962]">
                Comparer →
              </span>
            </a>
            <a
              href="/professionnels-evenements"
              className="group border border-[#f5f3ef]/10 p-8 transition-colors hover:border-[#c9a962]/50"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#c9a962]">
                Professionnels
              </p>
              <h3 className="mt-4 text-2xl">Bars, hôtels et événements</h3>
              <p className="mt-4 leading-7 text-[#f5f3ef]/50">
                Préparez des formats et quantités cohérents pour un
                établissement ou une réception.
              </p>
              <span className="mt-6 inline-block text-sm text-[#c9a962]">
                Préparer le service →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="outils" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80"
            alt="Bar Ambiance"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0f0f0f]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-6">
              Accessoires
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">
              Outils de{" "}
              <span className="text-gradient-gold italic">Précision</span>
            </h2>
            <p className="text-[#f5f3ef]/50 max-w-xl mx-auto">
              Des outils professionnels pour sculpter et servir votre glace avec
              excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <a
                key={tool.name}
                href={ORDER_ACCESSORIES_URL}
                className="group p-8 glass-effect hover:gold-border transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gradient-gold mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-[#f5f3ef]/75">{tool.caption}</p>
                  </div>
                  <span className="text-3xl font-light text-[#c9a962]">
                    {priceFormatter.format(tool.price)} TTC
                  </span>
                </div>
                <p className="text-[#f5f3ef]/70">
                  {descriptionFor(tool.name, toolDescriptions)}
                </p>

                <div className="mt-6 flex items-center gap-2 text-[#c9a962] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm tracking-wider uppercase">
                    Commander
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-[#151515] py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a962]">
              Questions fréquentes
            </span>
            <h2 className="mt-5 text-4xl font-light md:text-5xl">
              Tout savoir avant de commander
            </h2>
          </div>
          <div className="mt-12 divide-y divide-[#f5f3ef]/10 border-y border-[#f5f3ef]/10">
            {homeFaq.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-[#f5f3ef]/85">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-2xl font-light text-[#c9a962] transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pt-4 leading-7 text-[#f5f3ef]/55">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#0f0f0f]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Prêt à sublimer vos{" "}
            <span className="text-gradient-gold italic">cocktails</span> ?
          </h2>
          <p className="text-[#f5f3ef]/50 max-w-xl mx-auto mb-12">
            Commandez maintenant et transformez chaque boisson en une expérience
            visuelle et gustative exceptionnelle.
          </p>

          <a
            href={ORDER_URL}
            className="inline-block px-12 py-5 bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] text-[#0f0f0f] text-lg font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,169,98,0.5)] hover:scale-105"
          >
            Passer Commande
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 border-t border-[#f5f3ef]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/logo.svg"
                    alt="Ice4Riches"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-semibold tracking-wider text-gradient-gold">
                  ICE4RICHES
                </span>
              </div>
              <p className="text-sm text-[#f5f3ef]/40 leading-relaxed">
                Née sur la Côte d’Azur, notre glace cristalline premium est
                livrée dans le monde entier.
              </p>
            </div>

            <div>
              <h4 className="text-[#c9a962] font-semibold tracking-wider uppercase text-sm mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#produits"
                    className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                  >
                    Nos Produits
                  </a>
                </li>
                <li>
                  <a
                    href="#outils"
                    className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                  >
                    Nos Outils
                  </a>
                </li>
                {SEO_PAGES.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={ORDER_URL}
                    className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                  >
                    Commander
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#c9a962] font-semibold tracking-wider uppercase text-sm mb-4">
                Origine & livraison
              </h4>
              <div className="text-sm text-[#f5f3ef]/50 space-y-2">
                <p className="font-medium text-[#f5f3ef]/70">ICE4RICHES</p>
                <p>Née sur la Côte d’Azur, France</p>
                <p>Livraison dans le monde entier</p>
                <p>
                  <a
                    href="mailto:hello@ice4riches.com"
                    className="hover:text-[#c9a962]"
                  >
                    hello@ice4riches.com
                  </a>
                </p>
                <p>
                  <a
                    href="https://wa.me/377640622956"
                    className="hover:text-[#c9a962]"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>

              <div className="mt-6">
                <a
                  href="https://www.instagram.com/ice4riches/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @ice4riches
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#f5f3ef]/5 text-center">
            <p className="text-xs text-[#f5f3ef]/30">
              © 2026 Ice4Riches. Tous droits réservés. Premium Clear Ice
              Solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

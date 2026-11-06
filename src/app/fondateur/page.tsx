import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { DiscoveryLinks } from "@/components/discovery-links";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = createPageMetadata({
  path: "/fondateur",
  title: "Gianni Angelini, fondateur d’Ice4Riches",
  description: "Gianni Angelini, fondateur d’Ice4Riches : clear ice pour cocktails, formats de glaçons transparents et gravure personnalisée sur devis.",
});

export default function FondateurPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/fondateur#webpage`, url: `${SITE_URL}/fondateur`, name: "Gianni Angelini, fondateur d’Ice4Riches", inLanguage: "fr-FR", isPartOf: { "@id": `${SITE_URL}/#website` }, mainEntity: { "@id": `${SITE_URL}/fondateur/#gianni-angelini` } }} />
      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-[#0f0f0f] px-5 pb-24 pt-36 text-[#f5f3ef] sm:px-8 md:pt-44">
        <article className="mx-auto max-w-4xl border-t border-[#c9a962]/45 pt-10">
          <p className="font-[family-name:var(--font-outfit)] text-xs uppercase tracking-[0.28em] text-[#c9a962]">Le fondateur</p>
          <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-cormorant)] text-5xl leading-[0.95] sm:text-7xl">
            Gianni Angelini
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 font-[family-name:var(--font-outfit)] text-base font-light leading-8 text-[#f5f3ef]/78 sm:text-lg">
            <p>
              Entrepreneur basé à Monaco, Gianni Angelini a fondé Ice4Riches avec une idée simple : faire de la glace un élément à part entière de l’expérience du cocktail.
            </p>
            <p>
              La marque développe une glace cristalline premium destinée aux bars, restaurants, hôtels et événements. Le travail porte autant sur la transparence et le format des glaçons que sur leur intégration dans un service exigeant, de la Côte d’Azur à l’international.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 font-[family-name:var(--font-outfit)] text-sm uppercase tracking-wider">
            <Link href="/#produits" className="border border-[#c9a962] px-6 py-3 text-[#c9a962] transition-colors hover:bg-[#c9a962] hover:text-[#0f0f0f]">
              Découvrir les produits
            </Link>
            <a href="https://www.linkedin.com/in/gianni-angelini-69855610" target="_blank" rel="noopener noreferrer" className="border border-[#f5f3ef]/35 px-6 py-3 transition-colors hover:border-[#f5f3ef]">
              Profil LinkedIn
            </a>
          </div>
        </article>
      </main>
      <DiscoveryLinks currentPath="/fondateur" />
    </>
  );
}

import { JsonLd } from "@/components/json-ld";
import { BUSINESS_ADDRESS, ORDER_URL, SEO_PAGES, SITE_URL } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

type Highlight = {
  value: string;
  label: string;
};

type ContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

type SeoLandingPageProps = {
  path: string;
  serviceName: string;
  eyebrow: string;
  title: string;
  intro: string;
  highlights: Highlight[];
  sections: ContentSection[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
};

export function SeoLandingPage({
  path,
  serviceName,
  eyebrow,
  title,
  intro,
  highlights,
  sections,
  faq,
  relatedLinks,
}: SeoLandingPageProps) {
  const pageUrl = `${SITE_URL}${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: serviceName,
        url: pageUrl,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "City",
          name: "Paris",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0f0f0f]">
      <JsonLd data={structuredData} />

      <header className="fixed inset-x-0 top-0 z-50 glass-effect">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Ice4Riches - accueil"
          >
            <span className="relative h-11 w-11">
              <Image src="/logo.svg" alt="" fill className="object-contain" />
            </span>
            <span className="text-lg font-semibold tracking-wider text-gradient-gold">
              ICE4RICHES
            </span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-6 lg:flex"
          >
            {SEO_PAGES.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-widest text-[#f5f3ef]/70 transition-colors hover:text-[#c9a962]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0f0f0f] transition-shadow hover:shadow-[0_0_30px_rgba(201,169,98,0.4)]"
          >
            Commander
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-32 md:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,169,98,0.16),transparent_48%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <nav
              aria-label="Fil d’Ariane"
              className="mb-8 text-xs uppercase tracking-[0.22em] text-[#f5f3ef]/40"
            >
              <Link href="/" className="transition-colors hover:text-[#c9a962]">
                Accueil
              </Link>
              <span aria-hidden="true" className="mx-3">
                /
              </span>
              <span className="text-[#c9a962]">{eyebrow}</span>
            </nav>

            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#c9a962]">
              {eyebrow}
            </p>
            <h1 className="mx-auto max-w-4xl text-5xl font-light leading-tight md:text-7xl">
              {title}
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-8 text-[#f5f3ef]/65 md:text-xl">
              {intro}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#0f0f0f]"
              >
                Voir le catalogue
              </a>
              <Link
                href="/#produits"
                className="border border-[#c9a962]/50 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-[#c9a962] transition-colors hover:bg-[#c9a962]/10"
              >
                Découvrir les produits
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-label="Points clés"
          className="border-y border-[#f5f3ef]/10 bg-[#151515] px-6 py-10"
        >
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight.value} className="text-center">
                <p className="text-2xl font-semibold text-gradient-gold">
                  {highlight.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#f5f3ef]/50">
                  {highlight.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="grid gap-8 border-b border-[#f5f3ef]/10 py-14 first:pt-0 md:grid-cols-[0.8fr_1.2fr] md:gap-16"
            >
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#c9a962]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="text-3xl font-light leading-tight md:text-4xl">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-[#f5f3ef]/60">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="grid gap-3 pt-2 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-l border-[#c9a962]/50 pl-4 text-[#f5f3ef]/70"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-[#151515] px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-[#c9a962]">
              Questions fréquentes
            </p>
            <h2 className="mt-4 text-center text-4xl font-light md:text-5xl">
              L’essentiel avant de commander
            </h2>
            <div className="mt-12 divide-y divide-[#f5f3ef]/10 border-y border-[#f5f3ef]/10">
              {faq.map((item) => (
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

        <section className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-light md:text-4xl">
              À découvrir aussi
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group border border-[#f5f3ef]/10 bg-[#151515] p-8 transition-colors hover:border-[#c9a962]/50"
                >
                  <h3 className="text-2xl text-[#c9a962]">{link.title}</h3>
                  <p className="mt-3 leading-7 text-[#f5f3ef]/50">
                    {link.description}
                  </p>
                  <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-[#f5f3ef]/70 group-hover:text-[#c9a962]">
                    Lire la suite →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-[#f5f3ef]/10 px-6 py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,169,98,0.12),transparent_55%)]" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-4xl font-light md:text-5xl">
              Un format de glace pour chaque service
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#f5f3ef]/55">
              Consultez les formats disponibles, composez votre demande et
              envoyez-la directement à Ice4Riches via WhatsApp.
            </p>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-block bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] px-10 py-4 text-sm font-semibold uppercase tracking-wider text-[#0f0f0f]"
            >
              Commander
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f5f3ef]/10 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="text-lg font-semibold tracking-wider text-gradient-gold"
            >
              ICE4RICHES
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#f5f3ef]/40">
              Glace cristalline premium pour cocktails, professionnels et
              événements à Paris.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c9a962]">
              Découvrir
            </h2>
            <ul className="mt-4 space-y-2">
              {SEO_PAGES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c9a962]">
              Adresse
            </h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-[#f5f3ef]/50">
              <p>{BUSINESS_ADDRESS.name}</p>
              <p>{BUSINESS_ADDRESS.street}</p>
              <p>
                {BUSINESS_ADDRESS.postalCode} {BUSINESS_ADDRESS.city},{" "}
                {BUSINESS_ADDRESS.country}
              </p>
            </address>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-7xl border-t border-[#f5f3ef]/5 pt-7 text-center text-xs text-[#f5f3ef]/30">
          © 2026 Ice4Riches. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

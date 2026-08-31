import Image from "next/image";

const clients = [
  {
    name: "La Chèvre d’Or",
    src: "/clients/chevre-dor.png",
  },
  {
    name: "Amazónico Monte-Carlo",
    src: "/clients/amazonico.svg",
    enlarge: true,
  },
  {
    name: "Twiga Monte-Carlo",
    src: "/clients/twiga-monte-carlo.svg",
  },
  {
    name: "Le Bar Américain Monaco",
    src: "/clients/bar-americain.webp",
  },
  {
    name: "COYA Monte-Carlo",
    src: "/clients/coya-monte-carlo.webp",
  },
  {
    name: "The Maybourne Riviera",
    src: "/clients/maybourne-riviera.webp",
  },
  {
    name: "Gustave — Hôtel Hermitage Monte-Carlo",
    src: "/clients/gustave.webp",
  },
  {
    name: "Buddha-Bar Monte-Carlo",
    src: "/clients/buddha-bar.webp",
  },
  {
    name: "Maison Albar Hotels",
    src: "/clients/maison-albar.svg",
    label: "Maison Albar Hotels",
  },
  {
    name: "Mirazur",
    src: "/clients/mirazur.svg",
  },
  {
    name: "Groupe Mauro Colagreco",
    src: "/clients/groupe-mauro-colagreco.jpg",
    crop: true,
  },
  {
    name: "MAMO Michelangelo",
    src: "/clients/mamo-michelangelo.png",
  },
];

function ClientList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="client-marquee-list"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {clients.map((client) => (
        <li
          className={
            client.label
              ? "client-logo-card client-logo-card--stacked"
              : "client-logo-card"
          }
          key={client.name}
        >
          <Image
            src={client.src}
            alt={duplicate ? "" : client.name}
            width={220}
            height={88}
            sizes="220px"
            className={[
              "client-logo-image",
              client.crop ? "client-logo-image--crop" : "",
              client.enlarge ? "client-logo-image--enlarge" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
          {client.label ? (
            <span className="client-logo-label">{client.label}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function ClientMarquee() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-y border-[#f5f3ef]/10 bg-[#111111] py-20 md:py-24"
      aria-labelledby="clients-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,169,98,0.08),transparent_48%)]" />

      <div className="relative mb-12 px-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#c9a962]">
          Nos références
        </span>
        <h2 id="clients-title" className="mt-4 text-4xl font-light md:text-5xl">
          Ils nous font{" "}
          <span className="text-gradient-gold italic">confiance</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#f5f3ef]/45 md:text-base">
          Des maisons, hôtels, bars et restaurants d’exception font confiance à
          la glace cristalline Ice4Riches.
        </p>
      </div>

      <div
        className="client-marquee relative"
        aria-label="Établissements clients Ice4Riches"
      >
        <div className="client-marquee-track">
          <ClientList />
          <ClientList duplicate />
        </div>
      </div>
    </section>
  );
}

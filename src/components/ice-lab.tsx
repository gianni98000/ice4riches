"use client";

import { useState } from "react";
import type { OrderProduct } from "@/lib/order-catalog";
import {
  checkFit,
  ICE_FORMATS,
  orderLink,
  type Glass,
  type IceFormat,
} from "@/lib/ice-fit";

const presets = [
  {
    name: "Rocks",
    detail: "Court & généreux",
    opening: 85,
    base: 78,
    height: 95,
    ice: "cube",
  },
  {
    name: "Highball",
    detail: "Haut & élancé",
    opening: 66,
    base: 62,
    height: 155,
    ice: "collins",
  },
  {
    name: "Dégustation",
    detail: "Place au spiritueux",
    opening: 78,
    base: 70,
    height: 90,
    ice: "sphere",
  },
];
const drinks = [
  { name: "Negroni", color: "#b14e2d", prefer: "cube" },
  { name: "Whisky", color: "#c28a3a", prefer: "old-fashioned" },
  { name: "Highball", color: "#d1c382", prefer: "collins" },
];

function GlassDrawing({
  glass,
  ice,
  color,
  fits,
  view,
}: {
  glass: Glass;
  ice: IceFormat;
  color: string;
  fits: boolean;
  view: string;
}) {
  const s = 1.65,
    cx = 180,
    floor = 350;
  const top = floor - glass.height * s;
  const a = (glass.opening * s) / 2,
    b = (glass.base * s) / 2;
  const iw = ice.width * s,
    ih = ice.height * s;
  const liquidY = floor - Math.min(glass.height * 0.62, glass.height - 12) * s;
  const liquidHalf = b + (a - b) * ((floor - liquidY) / (floor - top));
  const line = fits ? "#d8e9eb" : "#e4a58b";
  return (
    <svg
      viewBox="0 0 360 440"
      className="glass-drawing"
      role="img"
      aria-label={`${ice.title} dans un verre de ${glass.opening} millimètres d’ouverture, ${glass.base} millimètres à la base et ${glass.height} millimètres de hauteur. ${view === "top" ? "Vue du dessus." : "Vue de face."}`}
    >
      <defs>
        <linearGradient id="glass-shine" x1="0" x2="1">
          <stop stopColor="#d7e9eb" stopOpacity=".16" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".01" />
          <stop offset=".85" stopColor="#d7e9eb" stopOpacity=".08" />
          <stop offset="1" stopColor="#fff" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="ice-shine" x1="0" x2="1" y2="1">
          <stop stopColor="#f3ffff" stopOpacity=".65" />
          <stop offset=".3" stopColor="#c2e6e8" stopOpacity=".12" />
          <stop offset=".65" stopColor="#e9ffff" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity=".6" />
        </linearGradient>
        <radialGradient id="glass-glow">
          <stop stopColor="#b6dce3" stopOpacity=".12" />
          <stop offset="1" stopColor="#b6dce3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="180" cy="260" rx="175" ry="170" fill="url(#glass-glow)" />
      {view === "side" ? (
        <>
          <line
            x1="40"
            y1={floor + 12}
            x2="320"
            y2={floor + 12}
            stroke="#c4d6d7"
            strokeOpacity=".14"
          />
          <path
            d={`M${cx - a},${top} L${cx - b},${floor} Q${cx},${floor + 12} ${cx + b},${floor} L${cx + a},${top}`}
            fill="url(#glass-shine)"
            stroke="#c8dbdf"
            strokeOpacity=".65"
            strokeWidth="1.4"
          />
          <path
            d={`M${cx - liquidHalf},${liquidY} L${cx - b},${floor - 2} Q${cx},${floor + 6} ${cx + b},${floor - 2} L${cx + liquidHalf},${liquidY} Z`}
            fill={color}
            opacity=".42"
          />
          <ellipse
            cx={cx}
            cy={liquidY}
            rx={liquidHalf}
            ry="6"
            fill={color}
            opacity=".65"
          />
          <g className="ice-in-glass" key={ice.id}>
            {ice.shape === "sphere" ? (
              <>
                <circle
                  cx={cx}
                  cy={floor - ih / 2 - 3}
                  r={iw / 2}
                  fill="url(#ice-shine)"
                  stroke={line}
                />
                <path
                  d={`M${cx - iw * 0.3},${floor - ih * 0.5} Q${cx - iw * 0.2},${floor - ih * 0.88} ${cx + iw * 0.16},${floor - ih * 0.87}`}
                  fill="none"
                  stroke="#fff"
                  strokeOpacity=".8"
                  strokeWidth="2"
                />
              </>
            ) : (
              <>
                <rect
                  x={cx - iw / 2}
                  y={floor - ih - 3}
                  width={iw}
                  height={ih}
                  rx="3"
                  fill="url(#ice-shine)"
                  stroke={line}
                  strokeWidth="1.4"
                />
                <path
                  d={`M${cx - iw / 2 + 6},${floor - 9} L${cx - iw / 2 + 6},${floor - ih + 3} L${cx + iw / 2 - 6},${floor - ih + 3} M${cx - iw / 2 + 9},${floor - ih * 0.4} L${cx + iw * 0.2},${floor - ih * 0.75}`}
                  fill="none"
                  stroke="#eefaff"
                  strokeOpacity=".45"
                />
              </>
            )}
          </g>
          <ellipse
            cx={cx}
            cy={top}
            rx={a}
            ry="7"
            fill="none"
            stroke="#d1e0e2"
            strokeOpacity=".75"
          />
          <line
            x1={cx - a}
            x2={cx + a}
            y1={top - 25}
            y2={top - 25}
            stroke="#9bb0b1"
            strokeDasharray="3 4"
          />
          <text x={cx} y={top - 36} textAnchor="middle">
            Ø {glass.opening} mm
          </text>
          <line
            x1={cx + a + 28}
            x2={cx + a + 28}
            y1={top}
            y2={floor}
            stroke="#9bb0b1"
            strokeDasharray="3 4"
          />
          <text
            x={cx + a + 37}
            y={(top + floor) / 2}
            transform={`rotate(90 ${cx + a + 37} ${(top + floor) / 2})`}
            textAnchor="middle"
          >
            {glass.height} mm
          </text>
          <text x={cx} y="393" textAnchor="middle">
            BASE INTÉRIEURE · Ø {glass.base} mm
          </text>
        </>
      ) : (
        <>
          <circle
            cx={cx}
            cy="235"
            r={a}
            fill="url(#glass-shine)"
            stroke="#d1e0e2"
          />
          <circle
            cx={cx}
            cy="235"
            r={b}
            fill="none"
            stroke="#d1e0e2"
            strokeOpacity=".45"
            strokeDasharray="3 5"
          />
          {ice.shape === "sphere" ? (
            <circle
              cx={cx}
              cy="235"
              r={iw / 2}
              fill="url(#ice-shine)"
              stroke={line}
            />
          ) : (
            <>
              <rect
                x={cx - iw / 2}
                y={235 - iw / 2}
                width={iw}
                height={iw}
                rx="2"
                fill="url(#ice-shine)"
                stroke={line}
              />
              <line
                x1={cx - iw / 2}
                y1={235 - iw / 2}
                x2={cx + iw / 2}
                y2={235 + iw / 2}
                stroke={line}
                strokeDasharray="4 4"
              />
            </>
          )}
          <text x={cx} y="110" textAnchor="middle">
            OUVERTURE · Ø {glass.opening} mm
          </text>
          <text x={cx} y="365" textAnchor="middle">
            {ice.shape === "sphere" ? "DIAMÈTRE" : "DIAGONALE"} ·{" "}
            {checkFit(ice, glass).footprint.toFixed(1).replace(".", ",")} mm
          </text>
          <text x={cx} y="390" textAnchor="middle">
            + 4 mm de marge de service
          </text>
        </>
      )}
    </svg>
  );
}

export function IceLab({ products }: { products: OrderProduct[] }) {
  const [preset, setPreset] = useState("Rocks");
  const [glass, setGlass] = useState<Glass>({
    opening: 85,
    base: 78,
    height: 95,
    irregular: false,
  });
  const [selected, setSelected] = useState("cube");
  const [drink, setDrink] = useState(0);
  const [view, setView] = useState("side");
  const formats = ICE_FORMATS.filter((format) =>
    products.some((p) => p.name.startsWith(format.match)),
  );
  const ice = formats.find((f) => f.id === selected) ?? formats[0];
  if (!ice)
    return (
      <section id="ice-lab" className="ice-section">
        <h2>Votre verre, notre conseil.</h2>
        <a href="mailto:hello@ice4riches.com">
          Contactez-nous pour choisir votre format.
        </a>
      </section>
    );
  const fit = checkFit(ice, glass);
  const compatible = formats.filter((f) => checkFit(f, glass).fits);
  const ideal =
    compatible.find((f) => f.id === drinks[drink].prefer) ?? compatible[0];
  const product = products.find((p) => p.name.startsWith(ice.match))!;
  const message = `Bonjour Ice4Riches, je souhaite un conseil / des échantillons pour mon établissement. Format étudié : ${ice.title} (${ice.dimensions}). Verre : ouverture intérieure ${glass.opening} mm, base intérieure ${glass.base} mm, hauteur utile ${glass.height} mm. Forme ${glass.irregular ? "irrégulière" : "droite ou évasée"}. Cocktail : ${drinks[drink].name}. Résultat indicatif : ${fit.reason} Mon établissement, ma ville et la quantité souhaitée : `;
  function update(key: "opening" | "base" | "height", value: number) {
    setPreset("Sur mesure");
    setGlass((g) => ({ ...g, [key]: value }));
  }
  return (
    <section
      id="ice-lab"
      className="ice-section lab-section"
      aria-labelledby="lab-title"
    >
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow">
            <span>02 /</span> L’ATELIER INTERACTIF
          </p>
          <h2 id="lab-title">
            À chaque verre,
            <br />
            <em>sa glace.</em>
          </h2>
        </div>
        <p>
          Le bon accord se voit.
          <br />
          Choisissez un verre. Jouez avec les formats.
          <br />
          Trouvez l’équilibre, au millimètre près.
        </p>
      </div>
      <div className="ice-lab">
        <div className="lab-settings">
          <div className="lab-step">
            <span>01</span> Votre verrerie
          </div>
          <div className="glass-presets" aria-label="Modèles de verre">
            {presets.map((p) => (
              <button
                key={p.name}
                aria-pressed={preset === p.name}
                onClick={() => {
                  setPreset(p.name);
                  setGlass({
                    opening: p.opening,
                    base: p.base,
                    height: p.height,
                    irregular: false,
                  });
                  setSelected(p.ice);
                  setDrink(
                    p.name === "Highball"
                      ? 2
                      : p.name === "Dégustation"
                        ? 1
                        : 0,
                  );
                }}
              >
                <svg viewBox="0 0 36 46" aria-hidden="true">
                  <path
                    d={
                      p.name === "Highball"
                        ? "M10 5 L12 41 L25 41 L27 5 Z"
                        : p.name === "Rocks"
                          ? "M5 17 L8 41 L28 41 L31 17 Z"
                          : "M7 12 L10 41 L26 41 L29 12 Z"
                    }
                    fill="none"
                    stroke="currentColor"
                  />
                  <path d="M11 30 L25 30" stroke="currentColor" opacity=".4" />
                </svg>
                <strong>{p.name}</strong>
                <small>{p.detail}</small>
              </button>
            ))}
          </div>
          <p className="lab-hint">
            Dimensions d’exemple. Ajustez avec les mesures intérieures de votre
            verre.
          </p>
          <div className="measurements">
            {(
              [
                {
                  key: "opening",
                  label: "Diamètre à l’ouverture",
                  min: 40,
                  max: 120,
                },
                { key: "base", label: "Diamètre à la base", min: 35, max: 120 },
                { key: "height", label: "Hauteur utile", min: 50, max: 190 },
              ] as const
            ).map(({ key, label, min, max }) => (
              <label key={key} className="measure-label">
                <span>
                  {label}
                  <output htmlFor={`measure-${key}`}>
                    {glass[key]} <small>mm</small>
                  </output>
                </span>
                <input
                  id={`measure-${key}`}
                  type="range"
                  min={min}
                  max={max}
                  step="1"
                  value={glass[key]}
                  onChange={(e) => update(key, Number(e.target.value))}
                />
                <span className="range-extents">
                  <small>{min} mm</small>
                  <small>{max} mm</small>
                </span>
              </label>
            ))}
          </div>
          <label className="irregular-check">
            <input
              type="checkbox"
              checked={glass.irregular}
              onChange={(e) =>
                setGlass((g) => ({ ...g, irregular: e.target.checked }))
              }
            />{" "}
            Mon verre a un col, des courbes ou des facettes.
          </label>
          <div className="lab-step second-step">
            <span>02</span> L’esprit du cocktail
          </div>
          <div className="drink-options">
            {drinks.map((d, i) => (
              <button
                key={d.name}
                aria-pressed={drink === i}
                onClick={() => setDrink(i)}
              >
                <span style={{ backgroundColor: d.color }} />
                {d.name}
              </button>
            ))}
          </div>
        </div>
        <div className="lab-stage">
          <div className="stage-topline">
            <span>
              ICE LAB <i>01</i>
            </span>
            <span>ÉCHELLE PROPORTIONNELLE</span>
          </div>
          <GlassDrawing
            glass={glass}
            ice={ice}
            color={drinks[drink].color}
            fits={fit.fits}
            view={view}
          />
          <div className="view-switch" aria-label="Point de vue">
            <button
              aria-pressed={view === "side"}
              onClick={() => setView("side")}
            >
              De face
            </button>
            <button
              aria-pressed={view === "top"}
              onClick={() => setView("top")}
            >
              Du dessus
            </button>
          </div>
          <p className="stage-caption">
            {glass.irregular
              ? "Schéma simplifié — courbes non représentées"
              : "Dimensions à l’échelle · niveau de boisson illustratif"}
          </p>
        </div>
        <div className="lab-result">
          <div className="lab-step">
            <span>03</span> Trouvez votre accord
          </div>
          <div className="format-options">
            {formats.map((f) => {
              const result = checkFit(f, glass);
              return (
                <button
                  key={f.id}
                  aria-pressed={ice.id === f.id}
                  onClick={() => setSelected(f.id)}
                >
                  <span>
                    {f.title}
                    <small>{f.dimensions}</small>
                  </span>
                  <span
                    className={`format-status ${result.fits ? "yes" : "no"}`}
                    aria-label={
                      result.fits
                        ? "Compatible"
                        : result.uncertain
                          ? "À vérifier"
                          : "Non adapté"
                    }
                  >
                    {result.fits ? "↗" : result.uncertain ? "?" : "—"}
                  </span>
                </button>
              );
            })}
          </div>
          <div
            className={`fit-feedback ${fit.fits ? "fits" : "does-not-fit"}`}
            role="status"
            aria-live="polite"
          >
            <p className="fit-label">
              <span />{" "}
              {fit.fits
                ? "COMPATIBLE SELON VOS MESURES"
                : fit.uncertain
                  ? "À VÉRIFIER AVEC VOTRE VERRE"
                  : "CE FORMAT NE CONVIENT PAS"}
            </p>
            <h3>{ice.title}</h3>
            <p>{fit.reason}</p>
            {fit.fits && (
              <p className="fit-advice">
                {ideal?.id === ice.id
                  ? `Notre accord pour un ${drinks[drink].name.toLowerCase()}.`
                  : ideal
                    ? `Pour un ${drinks[drink].name.toLowerCase()}, essayez aussi le ${ideal.title}.`
                    : ""}{" "}
                Le choix final dépend de votre recette et du volume servi.
              </p>
            )}
            {!fit.fits && compatible.length > 0 && (
              <button
                className="text-link"
                onClick={() => setSelected(ideal!.id)}
              >
                Essayer le {ideal!.title} ↗
              </button>
            )}
            {!fit.fits && compatible.length === 0 && (
              <p>
                Aucun format standard validé avec ces mesures. Notre équipe peut
                étudier votre verrerie.
              </p>
            )}
          </div>
          {fit.fits && product.available && (
            <a
              className="button button-gold lab-order"
              href={orderLink(product.name)}
            >
              Choisir ce format <span>↗</span>
            </a>
          )}
          {fit.fits && !product.available && (
            <p className="lab-hint">
              Référence actuellement indisponible au catalogue.
            </p>
          )}
          <a
            className="lab-contact"
            href={`https://wa.me/377640622956?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conseil & échantillons sur WhatsApp ↗
          </a>
        </div>
      </div>
      <details className="lab-method">
        <summary>
          Comment l’Ice Lab vérifie-t-il votre verre ? <span>+</span>
        </summary>
        <p>
          Pour une ouverture ronde, un bloc carré doit pouvoir passer avec sa
          diagonale : 70,7 mm pour un cube de 50 mm et 56,6 mm pour le Collins
          de 40 mm. Nous ajoutons 4 mm au diamètre (2 mm de chaque côté) et 5 mm
          en hauteur. La vérification, prudente, utilise le plus petit des
          diamètres à l’ouverture et à la base, avec la glace verticale. Elle
          s’applique à un verre circulaire droit ou régulièrement évasé. Une
          sphère peut parfois se poser plus haut dans un verre conique : ce cas
          est à vérifier. Les cols, courbes, facettes, tolérances de découpe et
          irrégularités demandent un essai réel. Ce schéma n’est pas une
          simulation de flottabilité ou de dilution.
        </p>
      </details>
    </section>
  );
}

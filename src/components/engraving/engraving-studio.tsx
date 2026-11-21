"use client";

import Link from "next/link";
import { ArrowLeft, Check, CircleHelp, Rotate3D, ScanLine, Upload } from "lucide-react";
import { type CSSProperties, type DragEvent, type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  DELIVERY_LABELS, ENGRAVING_ENDPOINT, ENGRAVING_FORM, FORMATS, MAX_BOXES, MAX_LOGO_BYTES,
  engravingMoney as money, engravingPrice, type Delivery, type Format,
} from "@/lib/engraving";
import { buildMark, readLogo, sampleLogo, type LogoSource, type Tone } from "./logo-preview";
import styles from "./engraving-studio.module.css";

const steps = ["Logo", "Glaçon", "Commande"];
const titles = ["Déposez votre logo", "Façonnez votre glaçon", "Finalisez votre commande"];

export function EngravingStudio() {
  const [step, setStep] = useState(0);
  const [logo, setLogo] = useState<LogoSource | null>(null);
  const [logoError, setLogoError] = useState("");
  const [reading, setReading] = useState(false);
  const [over, setOver] = useState(false);
  const [size, setSize] = useState(34);
  const [tone, setTone] = useState<Tone>("dark");
  const [threshold, setThreshold] = useState(128);
  const [format, setFormat] = useState<Format>("cube");
  const [boxes, setBoxes] = useState(1);
  const [delivery, setDelivery] = useState<Delivery>("other");
  const [top, setTop] = useState(false);
  const [spin, setSpin] = useState(0);
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState("");
  const [received, setReceived] = useState("");
  const picker = useRef<HTMLInputElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const submission = useRef("");
  const submitting = useRef(false);
  const uploadVersion = useRef(0);
  const mark = useMemo(() => logo ? buildMark(logo, size, tone, threshold) : null, [logo, size, tone, threshold]);
  const price = engravingPrice(format, boxes, delivery);
  const isSample = logo !== null && logo.attachment === null;
  const markWidth = size / 50 * 100 * Math.min(1, mark?.ratio ?? 1);

  useEffect(() => {
    if (submission.current || step > 0 || received) heading.current?.focus({ preventScroll: true });
  }, [step, received]);

  async function upload(file?: File) {
    if (!file) return;
    const version = ++uploadVersion.current;
    setLogoError("");
    setReading(false);
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("Le fichier dépasse 5 Mo. Essayez une version plus légère.");
      return;
    }
    setReading(true);
    try {
      const result = await readLogo(file);
      if (version !== uploadVersion.current) return;
      setLogo(result);
      setTone("dark");
      setThreshold(128);
    } catch (error) {
      if (version !== uploadVersion.current) return;
      const message = error instanceof Error && error.message.startsWith("Choisissez") ? error.message : "Impossible de lire ce logo. Essayez un PNG ou un SVG avec le texte vectorisé.";
      setLogoError(message);
    } finally {
      if (version === uploadVersion.current) setReading(false);
    }
  }

  function drop(event: DragEvent) {
    event.preventDefault();
    setOver(false);
    void upload(event.dataTransfer.files[0]);
  }

  function goTo(next: number) {
    setStep(next);
    setFailure("");
    setTimeout(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.scrollIntoView({ block: "nearest" });
    }, 0);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !logo?.attachment || !mark?.url) return;
    submitting.current = true;
    setPending(true);
    setFailure("");
    const data = new FormData(event.currentTarget);
    if (!submission.current) submission.current = "I4R-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    data.set("reference", submission.current);
    data.set("logo", logo.attachment, "logo-" + submission.current + ".png");
    data.set("fichier-original", logo.name.slice(0, 200));
    data.set("recapitulatif", [
      submission.current, FORMATS[format].name + " · " + FORMATS[format].size,
      `${boxes} cartons · ${price.quantity} glaçons · gravure sur le dessus`,
      `Motif ${size} mm · tons ${tone === "dark" ? "foncés" : "clairs"} · seuil ${threshold} · ${mark.status}`,
      DELIVERY_LABELS[delivery],
      `${money(price.ht)} HT · TVA ${money(price.vat)} · ${money(price.ttc)} TTC${price.shipping === null ? " hors livraison" : ""}`,
    ].join("\n"));
    try {
      const markBlob = await fetch(mark.url).then((response) => response.blob());
      data.set("motif", markBlob, "motif-" + submission.current + ".png");
      const response = await fetch(ENGRAVING_ENDPOINT, { method: "POST", body: data, signal: AbortSignal.timeout(35000) });
      if (!response.ok) throw new Error("Envoi refusé");
      setReceived(submission.current);
    } catch {
      setFailure(`Envoi non confirmé. Vos informations sont encore saisies. Réessayez avec la même référence (${submission.current}).`);
    } finally {
      setPending(false);
      submitting.current = false;
    }
  }

  return (
    <section id="atelier" className={styles.studio} aria-label="Atelier interactif de gravure">
      <div className={styles.stage}>
        <div className={styles.stageTop}><span>Aperçu de la gravure</span><span>{FORMATS[format].size}</span></div>
        <div className={styles.scene} aria-hidden="true">
          <div className={styles.halo} />
          <div className={styles.sculpture}>
            <div className={styles.ice} style={{ "--turn": `${top ? 0 : spin * 90 - 27}deg`, "--tilt": top ? "-90deg" : "-33deg", "--height": format === "cube" ? "var(--face)" : "calc(var(--face) * 1.4)" } as CSSProperties}>
              <div className={`${styles.facet} ${styles.front}`} />
              <div className={`${styles.facet} ${styles.back}`} />
              <div className={`${styles.facet} ${styles.left}`} />
              <div className={`${styles.facet} ${styles.right}`} />
              <div className={`${styles.facet} ${styles.bottom}`} />
              <div className={`${styles.facet} ${styles.upper}`}>
                {mark?.url ? <span className={styles.mark} style={{ width: `${markWidth}%`, aspectRatio: mark.ratio, backgroundImage: `url(${mark.url})` }} /> : <ScanLine className={styles.emptyMark} />}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stageBottom}>
          <div className={styles.viewControls} aria-label="Angle de vue">
            <button type="button" onClick={() => setTop(false)} aria-pressed={!top}>Perspective</button>
            <button type="button" onClick={() => setTop(true)} aria-pressed={top}>Du dessus</button>
            <button type="button" aria-label="Faire pivoter le glaçon" onClick={() => { setTop(false); setSpin((n) => n + 1); }}><Rotate3D size={18} /></button>
          </div>
          <span>Simulation à l’écran</span>
        </div>
      </div>

      <div className={styles.panel}>
        {received ? (
          <div className={styles.confirmation}>
            <Check size={34} aria-hidden="true" />
            <h2 ref={heading} tabIndex={-1}>Commande transmise</h2>
            <p>Votre référence <strong>{received}</strong></p>
            <p>Ice4Riches vous contactera pour valider le logo, confirmer la livraison et vous transmettre les modalités de paiement avant production.</p>
            <Link href="/">Retour à Ice4Riches</Link>
          </div>
        ) : (
          <>
            <nav className={styles.steps} aria-label="Étapes de personnalisation">
              {steps.map((label, index) => (
                <button key={label} type="button" aria-current={step === index ? "step" : undefined} disabled={index > step || pending} onClick={() => goTo(index)}>
                  <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>{label}
                </button>
              ))}
            </nav>
            <h2 ref={heading} tabIndex={-1}>{titles[step]}</h2>

            {step === 0 && (
              <>
                <input ref={picker} type="file" accept=".png,.jpg,.jpeg,.webp,.svg" className={styles.hidden} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ""; }} />
                <button type="button" className={styles.drop} data-over={over} onClick={() => picker.current?.click()} onDragOver={(event) => { event.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={drop}>
                  <Upload size={23} aria-hidden="true" />
                  <strong>{reading ? "Lecture du logo…" : logo?.attachment ? logo.name : "Importer mon logo"}</strong>
                  <span>{logo?.attachment ? "Touchez ici pour remplacer le fichier" : "Cliquez ou déposez un PNG, JPG, WebP ou SVG · 5 Mo max."}</span>
                </button>
                {logoError && <p className={styles.error} role="alert">{logoError}</p>}
                {!logo?.attachment && <button type="button" className={styles.textButton} onClick={() => { ++uploadVersion.current; setReading(false); setLogoError(""); setLogo(sampleLogo()); setThreshold(128); setTone("dark"); }}>Essayer avec un exemple</button>}
                {mark && (
                  <div className={styles.diagnostic} data-level={mark.level} role="status">
                    {mark.level === "good" ? <Check size={18} /> : <CircleHelp size={18} />}
                    <div><strong>{mark.status}{isSample ? " · Exemple" : ""}</strong><p>{mark.description}</p></div>
                  </div>
                )}
                {logo && (
                  <details className={styles.details} open={mark?.level === "empty" || undefined}>
                    <summary>Ajuster le contraste</summary>
                    <div className={styles.tones} aria-label="Tons à graver">
                      <button type="button" aria-pressed={tone === "dark"} onClick={() => setTone("dark")}>Tons foncés</button>
                      <button type="button" aria-pressed={tone === "light"} onClick={() => setTone("light")}>Tons clairs</button>
                    </div>
                    <label className={styles.range}>Seuil de contraste<input aria-label="Seuil de contraste" type="range" min="32" max="224" value={threshold} onChange={(event) => setThreshold(Number(event.target.value))} /></label>
                  </details>
                )}
                <button className={styles.primary} type="button" onClick={() => goTo(1)} disabled={!mark?.url || reading}>Choisir mon glaçon</button>
              </>
            )}

            {step === 1 && (
              <>
                <fieldset className={styles.formatOptions}>
                  <legend>Format · gravure sur le dessus</legend>
                  {(Object.entries(FORMATS) as [Format, typeof FORMATS[Format]][]).map(([key, item]) => (
                    <label key={key} data-selected={format === key}>
                      <input type="radio" name="format" value={key} checked={format === key} onChange={() => setFormat(key)} />
                      <strong>{item.name}</strong><span>{item.size}</span>
                    </label>
                  ))}
                </fieldset>
                <label className={styles.range}><span>Taille du motif <strong>{size} mm</strong></span>
                  <input type="range" min="18" max="42" value={size} onChange={(event) => setSize(Number(event.target.value))} />
                </label>
                {mark && <p className={styles.readability} role="status"><strong>{mark.status}.</strong> {mark.description}</p>}
                <div className={styles.quantity}>
                  <label htmlFor="engraving-boxes">Cartons de 60 <span>{price.quantity.toLocaleString("fr-FR")} glaçons gravés</span></label>
                  <div className={styles.counter}>
                    <button type="button" aria-label="Retirer un carton" disabled={boxes === 1} onClick={() => setBoxes(boxes - 1)}>−</button>
                    <input type="number" id="engraving-boxes" min="1" max={MAX_BOXES} value={boxes} onChange={(event) => setBoxes(Math.min(MAX_BOXES, Math.max(1, Math.floor(Number(event.target.value)) || 1)))} />
                    <button type="button" aria-label="Ajouter un carton" disabled={boxes === MAX_BOXES} onClick={() => setBoxes(boxes + 1)}>+</button>
                  </div>
                </div>
                <div className={styles.total}><span>Estimation TTC hors livraison</span><strong aria-live="polite">{money(engravingPrice(format, boxes, "other").ttc)}</strong></div>
                <button className={styles.primary} type="button" disabled={isSample} onClick={() => goTo(2)}>Livraison et commande</button>
                {isSample && <button type="button" className={styles.textButton} onClick={() => goTo(0)}>Importer mon logo pour commander</button>}
              </>
            )}

            <form className={styles.order} name={ENGRAVING_FORM} method="POST" encType="multipart/form-data" action={ENGRAVING_ENDPOINT} onSubmit={submit} hidden={step !== 2}>
              <input type="hidden" name="form-name" value={ENGRAVING_FORM} />
              <p className={styles.hidden}><label>Laisser vide<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className={styles.orderGrid}>
                <label>Nom ou établissement<input name="nom" required maxLength={100} autoComplete="name" /></label>
                <label>E-mail<input type="email" name="email" required maxLength={160} autoComplete="email" /></label>
                <label>Téléphone<input type="tel" name="telephone" required maxLength={35} autoComplete="tel" /></label>
                <label>Date souhaitée<input type="date" name="date-souhaitee" required onFocus={(event) => { event.currentTarget.min = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }} /></label>
              </div>
              <label>Adresse de livraison<input name="adresse" required maxLength={250} autoComplete="street-address" placeholder="Rue, code postal et ville" /></label>
              <label htmlFor="engraving-delivery">Livraison</label>
              <select id="engraving-delivery" value={delivery} name="livraison" onChange={(event) => setDelivery(event.target.value as Delivery)}>
                <option value="other">Autre ville · tarif sur confirmation</option>
                <option value="cannes-1">Cannes · 1 tournée</option>
                <option value="cannes-2">Cannes · 2 tournées</option>
              </select>
              <details className={styles.details}>
                <summary>Détail du prix · {price.quantity.toLocaleString("fr-FR")} glaçons</summary>
                <dl className={styles.breakdown}>
                  <div><dt>Glace HT</dt><dd>{money(price.ice)}</dd></div>
                  <div><dt>Gravure HT</dt><dd>{money(price.engraving)}</dd></div>
                  <div><dt>Calibrage HT</dt><dd>{money(price.calibration)}</dd></div>
                  <div><dt>Livraison HT</dt><dd>{price.shipping === null ? "À confirmer" : money(price.shipping)}</dd></div>
                  <div><dt>TVA</dt><dd>{money(price.vat)}</dd></div>
                </dl>
              </details>
              <div className={styles.total}><span>Estimation TTC{price.shipping === null ? " hors livraison" : ", livraison incluse"}</span><strong aria-live="polite">{money(price.ttc)}</strong></div>
              <label className={styles.consent}><input type="checkbox" name="autorisation-logo" value="oui" required /> <span>J’ai le droit d’utiliser ce logo et j’autorise Ice4Riches à le traiter avec mes coordonnées pour cette commande.</span></label>
              <p className={styles.readability}>L’équipe valide le logo, le tarif et le créneau. Le paiement intégral s’effectue par virement sur confirmation, avant production.</p>
              {failure && <p className={styles.error} role="alert">{failure}</p>}
              <button className={styles.primary} type="submit" disabled={pending}>{pending ? "Transmission…" : "Envoyer ma commande"}</button>
            </form>

            {step > 0 && <button className={styles.backButton} type="button" disabled={pending} onClick={() => goTo(step - 1)}><ArrowLeft size={17} /> Retour</button>}
          </>
        )}
      </div>
    </section>
  );
}

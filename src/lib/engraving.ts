export const ENGRAVING_PATH = "/gravure-clear-ice-personnalisee";
export const ENGRAVING_FORM = "commande-gravure";
export const ENGRAVING_ENDPOINT = "/formulaire-gravure.html";
export const PIECES_PER_BOX = 60;
export const MAX_BOXES = 999;
export const MAX_LOGO_BYTES = 5 * 1024 * 1024;
export const FORMATS = {
  cube: { name: "Deluxe Cube", size: "5 × 5 × 5 cm", cents: 3502 },
  tall: { name: "Old Fashioned", size: "5 × 5 × 7 cm", cents: 4199 },
} as const;
export type Format = keyof typeof FORMATS;
export type Delivery = "cannes-1" | "cannes-2" | "other";

const euro = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
export const engravingMoney = (cents: number) => euro.format(cents / 100);

export function engravingPrice(format: Format, boxes: number, delivery: Delivery) {
  const quantity = boxes * PIECES_PER_BOX;
  const ice = boxes * FORMATS[format].cents;
  const engraving = quantity * 94;
  const calibration = 4000;
  const shipping = delivery === "other" ? null : delivery === "cannes-1" ? 5000 : 10000;
  const namedShipping = shipping ?? 0;
  const ht = ice + engraving + calibration + namedShipping;
  const vat = Math.round(ice * 55 / 1000) + Math.round((engraving + calibration + namedShipping) / 5);
  return { quantity, ice, engraving, calibration, shipping, ht, vat, ttc: ht + vat };
}

export const DELIVERY_LABELS: Record<Delivery, string> = {
  "cannes-1": "Cannes · 1 tournée",
  "cannes-2": "Cannes · 2 tournées",
  other: "Autre ville · livraison à confirmer",
};

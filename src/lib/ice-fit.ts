// Dimensions in millimetres, from the public Ice4Riches catalogue.
export const ICE_FORMATS = [
  {
    id: "cube",
    match: "DELUXE CUBE",
    title: "Deluxe Cube",
    width: 50,
    depth: 50,
    height: 50,
    shape: "block",
    dimensions: "5 × 5 × 5 cm",
    use: "Negroni, cocktails courts",
    image: "/cinematic/cube.jpg",
  },
  {
    id: "old-fashioned",
    match: "OLD FASHIONED",
    title: "Old Fashioned",
    width: 50,
    depth: 50,
    height: 70,
    shape: "block",
    dimensions: "5 × 5 × 7 cm",
    use: "Old Fashioned, whisky",
    image: "/cinematic/old-fashioned.jpg",
  },
  {
    id: "collins",
    match: "COLLINS",
    title: "Collins",
    width: 40,
    depth: 40,
    height: 120,
    shape: "block",
    dimensions: "4 × 4 × 12 cm",
    use: "Highballs, long drinks",
    image: "/cinematic/collins.jpg",
  },
  {
    id: "sphere",
    match: "SPHERES",
    title: "Sphère",
    width: 55,
    depth: 55,
    height: 55,
    shape: "sphere",
    dimensions: "Ø 5,5 cm",
    use: "Spiritueux, dégustation",
    image: "/cinematic/sphere.jpg",
  },
] as const;

export type IceFormat = (typeof ICE_FORMATS)[number];
export type Glass = {
  opening: number;
  base: number;
  height: number;
  irregular: boolean;
};
export const SERVICE_MARGIN = 4; // total diametral allowance: 2 mm each side
export const HEADROOM = 5;

export function checkFit(ice: IceFormat, glass: Glass) {
  const footprint =
    ice.shape === "sphere" ? ice.width : Math.hypot(ice.width, ice.depth);
  const needed = footprint + SERVICE_MARGIN;
  const valid = [glass.opening, glass.base, glass.height].every(
    (v) => Number.isFinite(v) && v > 0,
  );
  const openingFits = valid && glass.opening >= needed;
  const baseFits = valid && glass.base >= needed;
  const heightFits = valid && glass.height >= ice.height + HEADROOM;
  const fits = openingFits && baseFits && heightFits && !glass.irregular;
  const reason = !valid
    ? "Renseignez des mesures valides."
    : !openingFits
      ? `Ouverture trop étroite : prévoyez au moins ${needed.toFixed(1).replace(".", ",")} mm.`
      : !heightFits
        ? `Verre trop bas : prévoyez ${ice.height + HEADROOM} mm de hauteur utile.`
        : glass.irregular
          ? "Un col, une courbe ou des facettes demandent une vérification du passage intérieur."
          : !baseFits
            ? "Passage possible à l’ouverture, mais base trop étroite pour valider la pose. À vérifier avec votre verre."
            : "Passe à l’ouverture et tient dans le verre avec nos marges de service.";
  return {
    fits,
    reason,
    needed,
    footprint,
    openingFits,
    heightFits,
    baseFits,
    uncertain: openingFits && heightFits && (!baseFits || glass.irregular),
  };
}

export function orderLink(name: string) {
  return `/order?product=${encodeURIComponent(name)}#Ice`;
}

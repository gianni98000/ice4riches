"use client";

export type LogoSource = { name: string; pixels: ImageData; attachment: Blob | null; resolution: number };
export type Mark = { url: string; ratio: number; status: string; description: string; level: "good" | "review" | "empty" };
export type Tone = "dark" | "light";

function canvas(width: number, height: number) {
  const element = document.createElement("canvas");
  element.width = width;
  element.height = height;
  return { element, context: element.getContext("2d", { willReadFrequently: true })! };
}

export function sampleLogo(): LogoSource {
  const { context } = canvas(360, 330);
  context.strokeStyle = "#111";
  context.lineWidth = 13;
  context.beginPath();
  context.arc(180, 165, 139, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = "#111";
  context.font = "bold 145px Georgia";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("IR", 180, 174);
  return { name: "Exemple Ice4Riches", pixels: context.getImageData(0, 0, 360, 330), attachment: null, resolution: 1000 };
}

export async function readLogo(file: File): Promise<LogoSource> {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = ({ png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", svg: "image/svg+xml" } as Record<string, string>)[extension];
  if (!mime) throw new Error("Choisissez un logo PNG, JPG, WebP ou SVG.");
  // Decode with the browser’s non-interactive image loader, then only transmit a raster PNG.
  const url = URL.createObjectURL(file.slice(0, file.size, mime));
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const originalSize = Math.max(image.naturalWidth, image.naturalHeight);
    if (!originalSize) throw new Error("Image vide");
    const render = (limit: number) => {
      const scale = limit / originalSize;
      const layer = canvas(Math.max(1, Math.round(image.naturalWidth * scale)), Math.max(1, Math.round(image.naturalHeight * scale)));
      layer.context.drawImage(image, 0, 0, layer.element.width, layer.element.height);
      return layer;
    };
    const { element, context } = render(360);
    const raster = render(Math.min(mime === "image/svg+xml" ? 1024 : originalSize, 1024));
    const attachment = await new Promise<Blob>((resolve, reject) => {
      raster.element.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Fichier illisible")), "image/png");
    });
    return { name: file.name, pixels: context.getImageData(0, 0, element.width, element.height), attachment, resolution: mime === "image/svg+xml" ? 1024 : originalSize };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function buildMark(source: LogoSource, size: number, tone: Tone, threshold: number): Mark {
  const { data, width, height } = source.pixels;
  let alphaCount = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] < 30) alphaCount++;
  const transparent = alphaCount > width * height * 0.025;
  const ink = new Uint8Array(width * height);
  let left = width, right = 0, top = height, bottom = 0, count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const i = p * 4;
      const luminance = (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722);
      const value = transparent && tone === "dark" ? data[i + 3] : (tone === "dark" ? 255 - luminance : luminance) * data[i + 3] / 255;
      if (value < threshold) continue;
      ink[p] = 1;
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
      count++;
    }
  }
  if (count < 12) return { url: "", ratio: 1, status: "Motif introuvable", description: "Inversez les tons, baissez le seuil ou essayez un logo plus contrasté.", level: "empty" };

  const w = right - left + 1, h = bottom - top + 1;
  const { element, context } = canvas(w, h);
  const preview = context.createImageData(w, h);
  const minRun = Math.max(2, Math.ceil(0.8 * Math.max(w, h) / size));
  const horizontal = new Uint16Array(w * h);
  let thin = 0;
  // Estimate fine strokes at the selected physical size in both scan directions.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w;) {
      if (!ink[(y + top) * width + x + left]) { x++; continue; }
      const start = x;
      while (x < w && ink[(y + top) * width + x + left]) x++;
      horizontal.fill(x - start, y * w + start, y * w + x);
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = 0; y < h;) {
      if (!ink[(y + top) * width + x + left]) { y++; continue; }
      const start = y;
      while (y < h && ink[(y + top) * width + x + left]) y++;
      for (let row = start; row < y; row++) {
        const p = row * w + x;
        preview.data.set([244, 251, 255, 255], p * 4);
        if (y - start < minRun || horizontal[p] < minRun) thin++;
      }
    }
  }
  context.putImageData(preview, 0, 0);
  const solid = count / (w * h) > 0.9;
  const lowRes = source.resolution < 180;
  const review = solid || lowRes || thin / count > 0.12;
  const description = solid ? "Le motif forme presque un aplat. Inversez les tons ou importez un fichier à fond transparent."
    : lowRes ? "L’image est peu définie. Essayez un SVG ou une image de meilleure résolution."
    : review ? "Des détails fins risquent de se perdre. Agrandissez le motif ou essayez un logo aux traits plus épais."
    : "Le motif se détache à cette taille. L’équipe vérifiera le tracé sur glace avant production.";
  return { url: element.toDataURL(), ratio: w / h, status: review ? "À vérifier" : "Motif lisible", description, level: review ? "review" : "good" };
}

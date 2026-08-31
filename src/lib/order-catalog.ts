export type OrderProduct = {
  name: string;
  category: string;
  caption: string;
  image: string;
  price: number;
  available: boolean;
};

type SourceItem = {
  Item: string;
  Category: string;
  Caption: string;
  ItemImageURL: string;
  Price: string;
  Available: string;
};

const SOURCE_URL =
  "https://whatsorder.com/2PACX-1vQazKHWzdH1rVYddC1c5v36h7Te7M4GTdXX_CGg8_roSYt7ZS9uF0WbtnU4gBn4AviUtfdS6QZ6tHZi";

const FALLBACK_PRODUCTS = [
  {
    name: "DELUXE CUBE 5x5x5 cm",
    category: "Ice",
    caption: "60 pièces",
    image: "https://i.imgur.com/FSQ0iAX.jpg",
    price: 48,
    available: true,
  },
  {
    name: "OLD FASHIONED 5x5x7 cm",
    category: "Ice",
    caption: "60 pièces",
    image: "https://i.imgur.com/IbFAcQx.jpg",
    price: 49.9,
    available: true,
  },
  {
    name: "COLLINS 4x4x12 cm",
    category: "Ice",
    caption: "54 pièces",
    image: "https://i.imgur.com/J6WtRQn.jpg",
    price: 56.4,
    available: true,
  },
  {
    name: "SPHERES 5.5 cm",
    category: "Ice",
    caption: "25 pièces",
    image: "https://i.imgur.com/sy82Ip5.jpg",
    price: 50.07,
    available: true,
  },
  {
    name: "PIC À GLACE DELUXE 3 GRIFFES 18CM",
    category: "Dérivée",
    caption: "1 pièce",
    image: "https://i.imgur.com/r7O940M.jpg",
    price: 30,
    available: true,
  },
  {
    name: "COUTEAU À GLACE LAME MARTELÉE 12CM",
    category: "Dérivée",
    caption: "1 pièce",
    image: "https://i.imgur.com/KBOdZGf.jpg",
    price: 81,
    available: true,
  },
  {
    name: "WATER STAMP personalisé+ HEATER",
    category: "Dérivée",
    caption: "1 pièce",
    image: "https://i.imgur.com/7GbWLDj.jpg",
    price: 172.8,
    available: true,
  },
  {
    name: "ICE STAMP Personalisé + WOOD HANDLE",
    category: "Dérivée",
    caption: "1 pièce",
    image: "https://i.imgur.com/31AOwGA.jpg",
    price: 87.2,
    available: true,
  },
  {
    name: "EVIAN EAU MINÉRALE NATURELLE 1 L VERRE CONSIGNÉ",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/O1n6xlH.jpg",
    price: 29.26,
    available: true,
  },
  {
    name: "EVIAN EAU MINERALE NATURELLE 50 CL VERRE CONSIGNE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/YLpWrdC.jpg",
    price: 41.08,
    available: true,
  },
  {
    name: "EVIAN EAU MINERALE NATURELLE  75 cl VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/LdlpIPd.jpg",
    price: 66.38,
    available: true,
  },
  {
    name: "PERRIER EAU MINERALE NATURELLE FINES BULLES 50 CL VERRE CONSIGNE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/aEvaVgv.jpg",
    price: 44.88,
    available: true,
  },
  {
    name: "PERRIER EAU MINÉRALE NATURELLE FINES BULLES 1 L VERRE CONSIGNÉ",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/dVraEGF.jpg",
    price: 31.38,
    available: true,
  },
  {
    name: "PERRIER EAU MINERALE NATURELLE GAZEUSE 33 CL VERRE CONSIGNE",
    category: "Water",
    caption: "24 pièces",
    image: "https://i.imgur.com/k94scAL.jpg",
    price: 71.2,
    available: true,
  },
  {
    name: "PERRIER EAU MINÉRALE NATURELLE GAZEUSE 20 CL VERRE PERDU",
    category: "Water",
    caption: "24 pièces",
    image: "https://i.imgur.com/FbYFefl.jpg",
    price: 32.02,
    available: true,
  },
  {
    name: "S.PELLEGRINO EAU MINERALE NATURELLE GAZEUSE 50 CL VERRE CONSIGNE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/3RjiZ10.jpg",
    price: 48.06,
    available: true,
  },
  {
    name: "S.PELLEGRINO EAU MINERALE NATURELLE GAZEUSE 1 L VERRE CONSIGNE",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/AHJfk82.jpg",
    price: 35.36,
    available: true,
  },
  {
    name: "BADOIT EAU MINERALE NATURELLE GAZEUSE 1 L VERRE CONSIGNE",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/KlXyjAJ.jpg",
    price: 30.76,
    available: true,
  },
  {
    name: "BADOIT EAU MINERALE NATURELLE GAZEUSE 50 CL VERRE CONSIGNE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/Ay1IZIH.jpg",
    price: 37.6,
    available: true,
  },
  {
    name: "BADOIT EAU MINERALE NATURELLE GAZEUSE 33 cl VERRE PERDU ROUGE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/9A6sVwg.jpg",
    price: 50.22,
    available: true,
  },
  {
    name: "BADOIT  VERTE 75 cl VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/vGvSsYX.jpg",
    price: 63.58,
    available: true,
  },
  {
    name: "VITTEL EAU MINERALE NATURELLE 1 L VERRE CONSIGNE",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/j0N42ch.jpg",
    price: 27.56,
    available: true,
  },
  {
    name: "VITTEL EAU MINERALE NATURELLE 50 CL VERRE CONSIGNE",
    category: "Water",
    caption: "20 pièces",
    image: "https://i.imgur.com/Ikk9M7Q.jpg",
    price: 39.74,
    available: true,
  },
  {
    name: "CHATELDON EAU MINÉRALE NATURELLE GAZEUSE 12 X 75 CL VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/3N6a7PW.jpg",
    price: 62.62,
    available: true,
  },
  {
    name: "ST GEORGES EAU MINÉRALE NATURELLE 50 CL VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/wGwguc2.jpg",
    price: 42.42,
    available: true,
  },
  {
    name: "ST GEORGES EAU MINÉRALE NATURELLE PLATE 1 L VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/F8Zfdzz.jpg",
    price: 65.96,
    available: true,
  },
  {
    name: "THONON EAU MINÉRALE NATURELLE 75 CL VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/UrYabK6.jpg",
    price: 42.64,
    available: true,
  },
  {
    name: "ZILIA EAU MINÉRALE NATURELLE GAZEUSE 1 L VERRE PERDU",
    category: "Water",
    caption: "6 pièces",
    image: "https://i.imgur.com/YoRRxK0.jpg",
    price: 42.18,
    available: true,
  },
  {
    name: "ZILIA EAU PLATE 1 L VERRE PERDU",
    category: "Water",
    caption: "6 pièces",
    image: "https://i.imgur.com/HnoXYkc.jpg",
    price: 23.92,
    available: true,
  },
  {
    name: "ZILIA EAU PLATE 50 CL VERRE PERDU",
    category: "Water",
    caption: "12 pièces",
    image: "https://i.imgur.com/XdJHrqB.jpg",
    price: 36.96,
    available: true,
  },
] satisfies OrderProduct[];

function rot13(input: string) {
  return input.replace(/[A-Za-z]/g, (character) => {
    const code = character.charCodeAt(0) + 13;
    const limit = character <= "Z" ? 90 : 122;
    return String.fromCharCode(code <= limit ? code : code - 26);
  });
}

function normalizeImage(input: string) {
  const image = input.trim().replace(/^Https:/, "https:");

  try {
    const url = new URL(image);
    return url.protocol === "https:" && url.hostname === "i.imgur.com"
      ? url.href
      : "/logo.svg";
  } catch {
    return "/logo.svg";
  }
}

function decodeCatalog(html: string): OrderProduct[] {
  const payload = html.match(/var view0 = .([^;]+).;/)?.[1];

  if (!payload) {
    throw new Error("WhatsOrder catalog payload is missing");
  }

  const decoded = rot13(Buffer.from(payload, "base64").toString("utf8"));
  const sourceItems = JSON.parse(decoded) as SourceItem[];

  return sourceItems
    .filter((item) =>
      ["yes", "oos"].includes(item.Available.trim().toLowerCase()),
    )
    .map((item) => {
      const rawPrice = item.Price.trim();
      const effectivePrice = rawPrice.includes("~")
        ? rawPrice.replace(/~[^~]+~/, " ").trim()
        : rawPrice;

      return {
        name: item.Item.trim(),
        category: item.Category.trim(),
        caption: item.Caption.trim()
          .replace(/\b1 pieces\b/i, "1 pièce")
          .replace(/\bpieces\b/i, "pièces"),
        image: normalizeImage(item.ItemImageURL),
        price: Number.parseFloat(effectivePrice.replace(",", ".")),
        available: item.Available.trim().toLowerCase() === "yes",
      };
    });
}

export async function getOrderProducts(): Promise<OrderProduct[]> {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      throw new Error(`WhatsOrder returned ${response.status}`);
    }

    const products = decodeCatalog(await response.text());
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch (error) {
    console.warn("Using the local order catalog fallback", error);
    return FALLBACK_PRODUCTS;
  }
}

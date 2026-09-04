"use client";

import type { OrderProduct } from "@/lib/order-catalog";
import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const MINIMUM_ORDER_CENTS = 10_000;
const WHATSAPP_PHONE = "377640622956";
const CUSTOMER_STORAGE_KEY = "ice4riches-order-customer";
const CART_STORAGE_KEY = "ice4riches-order-cart";
const MAX_QUANTITY = 99;

const categoryLabels: Record<string, string> = {
  Ice: "Glace",
  Dérivée: "Accessoires",
  Water: "Eaux",
};

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

function formatCents(cents: number) {
  return priceFormatter.format(cents / 100);
}

function priceInCents(price: number) {
  return Math.round(price * 100);
}

type Customer = {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  note: string;
};

const emptyCustomer: Customer = {
  name: "",
  phone: "",
  address: "",
  landmark: "",
  note: "",
};

const rememberedCustomerFields = [
  "name",
  "phone",
  "address",
  "landmark",
] as const;

function readStoredCustomer(raw: string): Customer | null {
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  if (
    rememberedCustomerFields.some(
      (field) => field in record && typeof record[field] !== "string",
    )
  ) {
    return null;
  }

  return {
    name: typeof record.name === "string" ? record.name.slice(0, 100) : "",
    phone: typeof record.phone === "string" ? record.phone.slice(0, 30) : "",
    address:
      typeof record.address === "string" ? record.address.slice(0, 180) : "",
    landmark:
      typeof record.landmark === "string" ? record.landmark.slice(0, 180) : "",
    note: "",
  };
}

function readStoredQuantities(
  raw: string,
  products: OrderProduct[],
): Record<string, number> {
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }

  const availableNames = new Set(
    products
      .filter((product) => product.available)
      .map((product) => product.name),
  );

  return Object.fromEntries(
    Object.entries(parsed as Record<string, unknown>).filter(
      ([name, quantity]) =>
        availableNames.has(name) &&
        Number.isInteger(quantity) &&
        Number(quantity) > 0 &&
        Number(quantity) <= MAX_QUANTITY,
    ),
  ) as Record<string, number>;
}

type OrderCatalogProps = {
  products: OrderProduct[];
};

export function OrderCatalog({ products }: OrderCatalogProps) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products],
  );
  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "Ice");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartLoaded, setCartLoaded] = useState(false);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [rememberCustomer, setRememberCustomer] = useState(false);
  const [customerLoaded, setCustomerLoaded] = useState(false);

  useEffect(() => {
    function syncCategoryFromHash() {
      try {
        const hash = window.location.hash.slice(1);
        const categoryFromHash = hash ? decodeURIComponent(hash) : "";
        if (categories.includes(categoryFromHash)) {
          setActiveCategory(categoryFromHash);
        }
      } catch {
        // Ignore malformed URL fragments and keep the current category.
      }
    }

    syncCategoryFromHash();
    window.addEventListener("hashchange", syncCategoryFromHash);

    try {
      const storedCart = window.sessionStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setQuantities(readStoredQuantities(storedCart, products));
      }
    } catch {
      // Session storage is optional; ordering still works without it.
    } finally {
      setCartLoaded(true);
    }

    try {
      const storedCustomer = window.localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (storedCustomer) {
        const validCustomer = readStoredCustomer(storedCustomer);
        if (validCustomer) {
          setCustomer(validCustomer);
          setRememberCustomer(true);
        } else {
          window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
        }
      }
    } catch {
      // Local storage is optional; the form still works without it.
    } finally {
      setCustomerLoaded(true);
    }

    return () => window.removeEventListener("hashchange", syncCategoryFromHash);
  }, [categories, products]);

  useEffect(() => {
    if (!cartLoaded) {
      return;
    }

    try {
      window.sessionStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(quantities),
      );
    } catch {
      // Ignore storage restrictions in private browsing.
    }
  }, [cartLoaded, quantities]);

  useEffect(() => {
    if (!customerLoaded) {
      return;
    }

    try {
      if (rememberCustomer) {
        window.localStorage.setItem(
          CUSTOMER_STORAGE_KEY,
          JSON.stringify({
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            landmark: customer.landmark,
          }),
        );
      } else {
        window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
      }
    } catch {
      // Ignore storage restrictions in private browsing.
    }
  }, [customer, customerLoaded, rememberCustomer]);

  const visibleProducts = products.filter(
    (product) => product.category === activeCategory,
  );
  const cart = products
    .map((product) => ({
      product,
      quantity: quantities[product.name] ?? 0,
    }))
    .filter((item) => item.quantity > 0);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotalCents = cart.reduce(
    (total, item) => total + priceInCents(item.product.price) * item.quantity,
    0,
  );
  const missingAmountCents = Math.max(0, MINIMUM_ORDER_CENTS - subtotalCents);
  const customerComplete =
    customer.name.trim() !== "" &&
    customer.phone.trim() !== "" &&
    customer.address.trim() !== "";
  const canSubmit =
    itemCount > 0 && missingAmountCents === 0 && customerComplete;

  function changeQuantity(product: OrderProduct, change: number) {
    if (!product.available) {
      return;
    }

    setQuantities((current) => ({
      ...current,
      [product.name]: Math.min(
        MAX_QUANTITY,
        Math.max(0, (current[product.name] ?? 0) + change),
      ),
    }));
  }

  function removeFromCart(productName: string) {
    setQuantities((current) => {
      const next = { ...current };
      delete next[productName];
      return next;
    });
  }

  function updateCustomer(field: keyof Customer, value: string) {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function clearRememberedCustomer() {
    setCustomer(emptyCustomer);
    setRememberCustomer(false);
    try {
      window.localStorage.removeItem(CUSTOMER_STORAGE_KEY);
    } catch {
      // The fields are still cleared when storage is unavailable.
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const reference = Math.random().toString(16).slice(2, 7).toUpperCase();
    const cartLines = cart
      .map((item) => `▪${item.quantity} x ${item.product.name}`)
      .join("\n");
    const customerDetails = [
      customer.name.trim(),
      customer.phone.trim(),
      customer.address.trim(),
      customer.landmark.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    const message = [
      "nouvelle commande 🛵 (ICE4Riches)",
      `(# ${reference})`,
      "",
      cartLines,
      "",
      `*Payable: EUR TTC ${(subtotalCents / 100).toFixed(2)}*`,
      "",
      "*Détails du client*",
      customerDetails,
      customer.note.trim() ? `**${customer.note.trim()}**` : "",
      "",
      "-----------------------------",
      "(Message pour la clientèle)",
      "",
      "payable à 30 jours date de facture",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f3ef]">
      <header className="sticky top-0 z-50 border-b border-[#f5f3ef]/10 bg-[#0f0f0f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-6">
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

          <a
            href="#panier"
            className="border border-[#c9a962]/50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#c9a962] lg:hidden"
          >
            Panier · {itemCount}
          </a>

          <Link
            href="/"
            className="hidden text-xs uppercase tracking-[0.2em] text-[#f5f3ef]/60 transition-colors hover:text-[#c9a962] lg:block"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <main>
        <section className="border-b border-[#f5f3ef]/10 px-5 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[0.3em] text-[#c9a962]">
              Commande rapide
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-light leading-tight md:text-6xl">
              Composez votre panier, puis envoyez-le sur WhatsApp
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-[#f5f3ef]/55">
              Le catalogue et le panier s’ouvrent directement sur Ice4Riches.
              Vous choisissez si vos coordonnées doivent être mémorisées dans
              votre navigateur.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#f5f3ef]/60">
              <span className="border border-[#f5f3ef]/10 px-4 py-2">
                Livraison
              </span>
              <span className="border border-[#f5f3ef]/10 px-4 py-2">
                Minimum {formatCents(MINIMUM_ORDER_CENTS)} TTC
              </span>
              <span className="border border-[#f5f3ef]/10 px-4 py-2">
                Prix TTC
              </span>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.7fr)] lg:items-start lg:py-14">
          <section aria-labelledby="catalogue-title">
            <div className="flex flex-col gap-6 border-b border-[#f5f3ef]/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#c9a962]">
                  Catalogue
                </p>
                <h2 id="catalogue-title" className="mt-2 text-3xl font-light">
                  Choisissez vos produits
                </h2>
              </div>

              <div
                className="flex max-w-full gap-2 overflow-x-auto pb-1"
                aria-label="Catégories du catalogue"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={category === activeCategory}
                    onClick={() => {
                      setActiveCategory(category);
                      window.history.replaceState(
                        null,
                        "",
                        `#${encodeURIComponent(category)}`,
                      );
                    }}
                    className={
                      category === activeCategory
                        ? "whitespace-nowrap bg-[#c9a962] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0f0f0f]"
                        : "whitespace-nowrap border border-[#f5f3ef]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#f5f3ef]/55 transition-colors hover:border-[#c9a962]/50 hover:text-[#c9a962]"
                    }
                  >
                    {categoryLabels[category] ?? category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {visibleProducts.map((product) => {
                const quantity = quantities[product.name] ?? 0;

                return (
                  <article
                    key={product.name}
                    className="flex min-h-44 gap-4 border border-[#f5f3ef]/10 bg-[#151515] p-4 transition-colors hover:border-[#c9a962]/35"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-white/5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-[#c9a962]">
                          {product.caption}
                        </p>
                        <h3 className="mt-2 text-base leading-6 text-[#f5f3ef]/90">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-lg text-[#c9a962]">
                          {priceFormatter.format(product.price)}
                        </p>
                      </div>

                      {product.available ? (
                        <div className="mt-4 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => changeQuantity(product, -1)}
                            disabled={quantity === 0}
                            aria-label={`Retirer ${product.name}`}
                            className="h-9 w-9 border border-[#f5f3ef]/15 text-lg text-[#f5f3ef]/65 disabled:cursor-not-allowed disabled:opacity-25"
                          >
                            −
                          </button>
                          <output
                            aria-live="polite"
                            className="min-w-6 text-center text-lg"
                          >
                            {quantity}
                          </output>
                          <button
                            type="button"
                            onClick={() => changeQuantity(product, 1)}
                            aria-label={`Ajouter ${product.name}`}
                            className="h-9 w-9 bg-[#c9a962] text-lg font-semibold text-[#0f0f0f]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <p className="mt-4 text-right text-xs uppercase tracking-wider text-[#f5f3ef]/35">
                          Indisponible
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <aside id="panier" className="scroll-mt-24 lg:sticky lg:top-24">
            <form
              onSubmit={handleSubmit}
              className="border border-[#c9a962]/25 bg-[#151515] p-5 md:p-7"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#c9a962]">
                    Votre sélection
                  </p>
                  <h2 className="mt-2 text-3xl font-light">Panier</h2>
                </div>
                <p className="text-sm text-[#f5f3ef]/45">
                  {itemCount} article{itemCount > 1 ? "s" : ""}
                </p>
              </div>

              <div
                className="mt-6 space-y-4 border-y border-[#f5f3ef]/10 py-5"
                aria-live="polite"
              >
                {cart.length === 0 ? (
                  <p className="text-sm leading-6 text-[#f5f3ef]/40">
                    Votre panier est vide. Ajoutez un produit avec le bouton +.
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.name}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="leading-6 text-[#f5f3ef]/75">
                          {item.quantity} × {item.product.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.name)}
                          className="mt-1 text-xs text-[#f5f3ef]/55 underline decoration-[#c9a962]/50 underline-offset-4 hover:text-[#c9a962]"
                        >
                          Supprimer
                        </button>
                      </div>
                      <p className="whitespace-nowrap text-[#c9a962]">
                        {formatCents(
                          item.quantity * priceInCents(item.product.price),
                        )}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between py-5 text-lg">
                <span>Total TTC</span>
                <strong className="font-medium text-[#c9a962]">
                  {formatCents(subtotalCents)}
                </strong>
              </div>

              {missingAmountCents > 0 && itemCount > 0 && (
                <p className="mb-5 border border-[#c9a962]/25 bg-[#c9a962]/5 p-3 text-sm leading-6 text-[#c9a962]">
                  Ajoutez encore {formatCents(missingAmountCents)} pour
                  atteindre le minimum de livraison.
                </p>
              )}

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-[#f5f3ef]/65">Nom *</span>
                  <input
                    required
                    autoComplete="name"
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomer("name", event.target.value)
                    }
                    maxLength={100}
                    className="mt-2 w-full border border-[#f5f3ef]/15 bg-[#0f0f0f] px-4 py-3 text-[#f5f3ef] outline-none transition-colors focus:border-[#c9a962]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#f5f3ef]/65">
                    Numéro de téléphone *
                  </span>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomer("phone", event.target.value)
                    }
                    maxLength={30}
                    className="mt-2 w-full border border-[#f5f3ef]/15 bg-[#0f0f0f] px-4 py-3 text-[#f5f3ef] outline-none transition-colors focus:border-[#c9a962]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#f5f3ef]/65">Adresse *</span>
                  <input
                    required
                    autoComplete="street-address"
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomer("address", event.target.value)
                    }
                    maxLength={180}
                    className="mt-2 w-full border border-[#f5f3ef]/15 bg-[#0f0f0f] px-4 py-3 text-[#f5f3ef] outline-none transition-colors focus:border-[#c9a962]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#f5f3ef]/65">
                    Point de repère / NPA
                  </span>
                  <input
                    value={customer.landmark}
                    onChange={(event) =>
                      updateCustomer("landmark", event.target.value)
                    }
                    maxLength={180}
                    className="mt-2 w-full border border-[#f5f3ef]/15 bg-[#0f0f0f] px-4 py-3 text-[#f5f3ef] outline-none transition-colors focus:border-[#c9a962]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-[#f5f3ef]/65">Remarque</span>
                  <textarea
                    value={customer.note}
                    onChange={(event) =>
                      updateCustomer("note", event.target.value)
                    }
                    maxLength={500}
                    rows={3}
                    className="mt-2 w-full resize-y border border-[#f5f3ef]/15 bg-[#0f0f0f] px-4 py-3 text-[#f5f3ef] outline-none transition-colors focus:border-[#c9a962]"
                  />
                </label>
              </div>

              <div className="mt-5 border-t border-[#f5f3ef]/10 pt-5">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#f5f3ef]/70">
                  <input
                    type="checkbox"
                    checked={rememberCustomer}
                    onChange={(event) =>
                      setRememberCustomer(event.target.checked)
                    }
                    className="mt-1 h-4 w-4 accent-[#c9a962]"
                  />
                  Mémoriser mes coordonnées sur cet appareil
                </label>
                <button
                  type="button"
                  onClick={clearRememberedCustomer}
                  className="mt-3 text-xs text-[#f5f3ef]/55 underline decoration-[#c9a962]/50 underline-offset-4 hover:text-[#c9a962]"
                >
                  Effacer mes coordonnées mémorisées
                </button>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-6 w-full bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] px-5 py-4 text-sm font-semibold uppercase tracking-wider text-[#0f0f0f] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                Continuer sur WhatsApp
              </button>

              {!customerComplete &&
                itemCount > 0 &&
                missingAmountCents === 0 && (
                  <p className="mt-3 text-center text-xs leading-5 text-[#f5f3ef]/40">
                    Complétez le nom, le téléphone et l’adresse pour continuer.
                  </p>
                )}

              <p className="mt-4 text-center text-xs leading-5 text-[#f5f3ef]/35">
                WhatsApp s’ouvrira avec votre commande préremplie. Vérifiez-la,
                puis appuyez sur Envoyer dans WhatsApp pour nous la transmettre.
              </p>
            </form>
          </aside>
        </div>
      </main>
    </div>
  );
}

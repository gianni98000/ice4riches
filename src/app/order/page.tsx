import { OrderCatalog } from "@/app/order/order-catalog";
import { getOrderProducts } from "@/lib/order-catalog";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Commande rapide",
  description:
    "Composez votre panier Ice4Riches et envoyez votre commande directement sur WhatsApp.",
  alternates: {
    canonical: "/order",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OrderPage() {
  const products = await getOrderProducts();

  return <OrderCatalog products={products} />;
}

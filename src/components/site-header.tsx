"use client";

import { ORDER_URL, SEO_PAGES } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  productsHref?: string;
};

export function SiteHeader({ productsHref = "/#produits" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  const navigation = [{ href: productsHref, label: "Produits" }, ...SEO_PAGES];

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-effect">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Ice4Riches - accueil"
          onClick={closeMenu}
        >
          <span className="relative h-10 w-10 shrink-0 sm:h-12 sm:w-12">
            <Image
              src="/logo.svg"
              alt=""
              fill
              sizes="48px"
              className="object-contain"
            />
          </span>
          <span className="hidden text-xl font-semibold tracking-wider text-gradient-gold sm:inline">
            ICE4RICHES
          </span>
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-6 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-widest text-[#f5f3ef]/75 transition-colors hover:text-[#c9a962]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#c9a962]/50 text-[#c9a962] lg:hidden"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>

          <Link
            href={ORDER_URL}
            onClick={closeMenu}
            className="bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0f0f0f] transition-shadow hover:shadow-[0_0_30px_rgba(201,169,98,0.4)] sm:px-6 sm:text-sm"
          >
            Commander
          </Link>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navigation mobile"
        hidden={!menuOpen}
        className="border-t border-[#f5f3ef]/10 bg-[#0f0f0f]/98 px-4 py-4 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-[#f5f3ef]/10 px-2 py-4 text-sm uppercase tracking-widest text-[#f5f3ef]/80 last:border-b-0 hover:text-[#c9a962]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

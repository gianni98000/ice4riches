"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const ORDER_URL = "https://whatsorder.com/2PACX-1vQazKHWzdH1rVYddC1c5v36h7Te7M4GTdXX_CGg8_roSYt7ZS9uF0WbtnU4gBn4AviUtfdS6QZ6tHZi#Ice";

const products = [
  {
    name: "COLLINS",
    dimensions: "4x4x12 Cm",
    pieces: "54 pièces",
    price: "56.40",
    description: "Parfait pour les highballs et cocktails allongés",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
  },
  {
    name: "OLD FASHIONED",
    dimensions: "5x5x7 Cm",
    pieces: "60 pièces",
    price: "49.90",
    description: "Idéal pour les cocktails classiques et whisky",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
  },
  {
    name: "DELUXE CUBE",
    dimensions: "5x5x5 Cm",
    pieces: "60 pièces",
    price: "45.00",
    description: "Le cube parfait pour une dilution lente",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80",
  },
  {
    name: "SPHERES",
    dimensions: "5.5 Cm",
    pieces: "25 pièces",
    price: "50.07",
    description: "L'élégance ultime pour vos spiritueux",
    image: "https://thumbs.dreamstime.com/b/close-up-drink-photography-single-clear-ice-sphere-lowball-glass-dark-cocktail-bar-background-soft-dramatic-lighting-minimalist-435990867.jpg",
  },
];

const tools = [
  {
    name: "Pic à Glace Deluxe",
    spec: "3 Griffes 18cm",
    price: "30.00",
    description: "Pour sculpter vos glaçons avec précision",
  },
  {
    name: "Couteau à Glace",
    spec: "Lame Martelée 12cm",
    price: "81.00",
    description: "Lame artisanale pour une coupe nette",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo.svg"
                alt="Ice4Riches"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold tracking-wider text-gradient-gold">ICE4RICHES</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#produits" className="text-sm tracking-widest uppercase text-[#f5f3ef]/70 hover:text-[#c9a962] transition-colors">
              Produits
            </a>
            <a href="#outils" className="text-sm tracking-widest uppercase text-[#f5f3ef]/70 hover:text-[#c9a962] transition-colors">
              Outils
            </a>
            <a href="#contact" className="text-sm tracking-widest uppercase text-[#f5f3ef]/70 hover:text-[#c9a962] transition-colors">
              Contact
            </a>
          </nav>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] text-[#0f0f0f] text-sm font-semibold tracking-wider uppercase rounded-none hover:shadow-[0_0_30px_rgba(201,169,98,0.4)] transition-all duration-300"
          >
            Commander
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=90"
            alt="Premium Cocktail"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-transparent to-[#0f0f0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/80 via-transparent to-[#0f0f0f]/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-8">
              Premium Clear Ice
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 animate-fade-up text-shadow-gold"
            style={{ animationDelay: "0.4s" }}
          >
            L'Art de la
            <span className="block text-gradient-gold font-semibold italic">Glace Cristalline</span>
          </h1>

          <p
            className="text-lg md:text-xl text-[#f5f3ef]/60 max-w-2xl mx-auto mb-12 animate-fade-up font-light"
            style={{ animationDelay: "0.6s" }}
          >
            Nous fournissons une glace parfaitement pure, conçue pour sublimer
            vos cocktails et événements d'exception.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.8s" }}>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] text-[#0f0f0f] font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,169,98,0.5)] hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                Découvrir nos produits
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="#produits"
              className="px-8 py-4 border border-[#c9a962]/50 text-[#c9a962] font-semibold tracking-wider uppercase hover:bg-[#c9a962]/10 transition-all duration-300"
            >
              En savoir plus
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-[#c9a962]/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#c9a962] rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produits" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-6">
              Notre Collection
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">
              Glaces <span className="text-gradient-gold italic">Premium</span>
            </h2>
            <p className="text-[#f5f3ef]/50 max-w-xl mx-auto">
              Chaque glaçon est fabriqué selon un processus de congélation directionnelle
              pour une transparence cristalline parfaite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <a
                key={product.name}
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#c9a962]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gradient-gold mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#f5f3ef]/50">{product.dimensions}</p>
                      <p className="text-xs text-[#f5f3ef]/40 mt-1">{product.pieces}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-light text-[#c9a962]">€{product.price}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#f5f3ef]/40 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.description}
                  </p>
                </div>

                {/* Border Animation */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#c9a962]/30 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="outils" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80"
            alt="Bar Ambiance"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0f0f0f]/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-xs tracking-[0.3em] uppercase text-[#c9a962] border border-[#c9a962]/30 mb-6">
              Accessoires
            </span>
            <h2 className="text-4xl md:text-6xl font-light mb-4">
              Outils de <span className="text-gradient-gold italic">Précision</span>
            </h2>
            <p className="text-[#f5f3ef]/50 max-w-xl mx-auto">
              Des outils professionnels pour sculpter et servir votre glace avec excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.map((tool, index) => (
              <a
                key={tool.name}
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-8 glass-effect hover:gold-border transition-all duration-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gradient-gold mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-[#f5f3ef]/50">{tool.spec}</p>
                  </div>
                  <span className="text-3xl font-light text-[#c9a962]">€{tool.price}</span>
                </div>
                <p className="text-[#f5f3ef]/40">{tool.description}</p>

                <div className="mt-6 flex items-center gap-2 text-[#c9a962] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm tracking-wider uppercase">Commander</span>
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0f0f0f] to-[#0f0f0f]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Prêt à sublimer vos <span className="text-gradient-gold italic">cocktails</span> ?
          </h2>
          <p className="text-[#f5f3ef]/50 max-w-xl mx-auto mb-12">
            Commandez maintenant et transformez chaque boisson en une expérience visuelle et gustative exceptionnelle.
          </p>

          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-gradient-to-r from-[#9a7b3e] via-[#c9a962] to-[#9a7b3e] text-[#0f0f0f] text-lg font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,169,98,0.5)] hover:scale-105"
          >
            Passer Commande
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 border-t border-[#f5f3ef]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 relative">
                  <Image
                    src="/logo.svg"
                    alt="Ice4Riches"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-semibold tracking-wider text-gradient-gold">ICE4RICHES</span>
              </div>
              <p className="text-sm text-[#f5f3ef]/40 leading-relaxed">
                Premium Clear Ice Solutions pour bars, restaurants, hôtels et événements d'exception.
              </p>
            </div>

            <div>
              <h4 className="text-[#c9a962] font-semibold tracking-wider uppercase text-sm mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#produits" className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors">
                    Nos Produits
                  </a>
                </li>
                <li>
                  <a href="#outils" className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors">
                    Nos Outils
                  </a>
                </li>
                <li>
                  <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors">
                    Commander
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#c9a962] font-semibold tracking-wider uppercase text-sm mb-4">Contact</h4>
              <address className="not-italic text-sm text-[#f5f3ef]/50 space-y-2">
                <p className="font-medium text-[#f5f3ef]/70">BUSINESS SOURCING SOLUTION</p>
                <p>18-26 Rue Goubet</p>
                <p>75019 Paris, France</p>
              </address>

              <div className="mt-6">
                <a
                  href="https://www.instagram.com/ice4riches/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#f5f3ef]/50 hover:text-[#c9a962] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @ice4riches
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-[#f5f3ef]/5 text-center">
            <p className="text-xs text-[#f5f3ef]/30">
              © 2026 Ice4Riches. Tous droits réservés. Premium Clear Ice Solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

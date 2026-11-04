"use client";

import { useEffect, useRef, useState } from "react";

export function CinematicMotion() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!reduced.matches)
              e.target.animate(
                [
                  { opacity: 0.5, transform: "translateY(18px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 560, easing: "cubic-bezier(.23,1,.32,1)" },
              );
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const userPaused = useRef(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const update = () => setEnabled(!motion.matches && !connection?.saveData);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const el = video.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current)
          el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);
  return (
    <div className="hero-film">
      {/* A real H3 product shot, with a static poster and no soundtrack. */}
      <video
        ref={video}
        poster="/cinematic/clear-ice-poster.webp"
        src={enabled ? "/cinematic/clear-ice-h3.mp4" : undefined}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Un bloc de glace cristalline se révèle dans la lumière"
      >
        Votre navigateur ne prend pas en charge la vidéo.
      </video>
      <div className="hero-film-shade" />

      <button
        className="film-control"
        onClick={() => {
          if (!enabled) {
            userPaused.current = false;
            setEnabled(true);
            return;
          }
          if (playing) {
            userPaused.current = true;
            video.current?.pause();
          } else {
            userPaused.current = false;
            video.current?.play().catch(() => {});
          }
        }}
        aria-label={playing ? "Mettre la vidéo en pause" : "Lire la vidéo"}
      >
        <span>{playing ? "Mettre en pause" : "Lire le film"}</span>
      </button>
    </div>
  );
}

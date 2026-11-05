"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cinematic-stage.module.css";
import { LiquidMark } from "./liquid-mark";

const DEFAULT_FILM = "/cinematic/clear-ice-h3.mp4";
const DEFAULT_POSTER = "/cinematic/clear-ice-poster.webp";

type CinematicStageProps = {
  /** Supply the finished film and poster together once they are available. */
  videoSrc?: string;
  posterSrc?: string;
  labHref?: string;
};

/** An editorial introduction; Ice Lab remains the actual selection interface. */
export function CinematicStage({
  videoSrc = DEFAULT_FILM,
  posterSrc = DEFAULT_POSTER,
  labHref = "#ice-lab",
}: CinematicStageProps) {
  const stageRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const visible = useRef(false);
  const [allowed, setAllowed] = useState(false);
  const [activeSrc, setActiveSrc] = useState(videoSrc);
  const [activePoster, setActivePoster] = useState(posterSrc);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [beat, setBeat] = useState<number | null>(null);

  useEffect(() => {
    setActiveSrc(videoSrc);
    setActivePoster(posterSrc);
    setReady(false);
    setFailed(false);
    setEnded(false);
    setBeat(null);
  }, [videoSrc, posterSrc]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; addEventListener?: (type: string, listener: () => void) => void; removeEventListener?: (type: string, listener: () => void) => void };
    }).connection;
    const update = () => {
      if (motion.matches || connection?.saveData) {
        videoRef.current?.pause();
        setReady(false);
        setAllowed(false);
      } else {
        setAllowed(true);
      }
    };
    update();
    motion.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      motion.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!stage || !video || !allowed) return;
    const sync = () => {
      if (visible.current && !document.hidden && !userPaused.current && !video.ended) {
        void video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
      }
    };
    if (!("IntersectionObserver" in window)) {
      visible.current = true;
      sync();
      document.addEventListener("visibilitychange", sync);
      return () => { document.removeEventListener("visibilitychange", sync); video.pause(); };
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(stage);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); video.pause(); };
  }, [allowed, activeSrc]);

  function toggleFilm() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
      return;
    }
    userPaused.current = false;
    if (video.ended) video.currentTime = 0;
    // Start within the click gesture, including when preferences suppressed loading.
    if (!allowed) {
      video.src = activeSrc;
      setAllowed(true);
    }
    void video.play().catch(() => setPlaying(false));
  }

  return (
    <section ref={stageRef} className={styles.stage} aria-labelledby="cinematic-stage-title">
      <div className={styles.intro}>
        <h1 id="cinematic-stage-title">La <span className={styles.iceWord}><LiquidMark text="glace" /></span> change le verre.</h1>
        <p>La clear ice de la Côte d’Azur, pensée pour le service.</p>
      </div>
      <div className={styles.frame}>
        {/* Decorative media: the surrounding text carries the meaning. */}
        <img className={styles.poster} src={activePoster} alt="" onError={() => {
          if (activePoster !== DEFAULT_POSTER) setActivePoster(DEFAULT_POSTER);
        }} />
        <video
          ref={videoRef}
          className={styles.film}
          data-ready={ready}
          src={allowed && !failed ? activeSrc : undefined}
          muted
          playsInline
          poster={activePoster}
          preload="none"
          aria-hidden="true"
          onLoadedData={() => setReady(true)}
          onPlay={() => { setPlaying(true); setEnded(false); }}
          onTimeUpdate={(event) => {
            if (activeSrc === DEFAULT_FILM) return;
            const time = event.currentTarget.currentTime;
            setBeat(time < 73 / 24 ? 0 : time < 145 / 24 ? 1 : 2);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setEnded(true); }}
          onError={() => {
            setReady(false);
            setPlaying(false);
            setBeat(null);
            if (activeSrc !== DEFAULT_FILM) {
              setActivePoster(DEFAULT_POSTER);
              setActiveSrc(DEFAULT_FILM);
            } else setFailed(true);
          }}
        />
        <button className={styles.filmControl} type="button" onClick={toggleFilm} disabled={failed}>
          {failed ? "Film indisponible" : playing ? "Mettre le film en pause" : ended ? "Revoir le film" : "Lire le film"}
        </button>
      </div>
      <div className={styles.close}>
        <p className={styles.beats} aria-label="Suspension, rencontre, service">
          {["Suspension", "Rencontre", "Service"].map((label, index) => (
            <span key={label} data-active={beat === null || beat === index} aria-current={beat === index ? "step" : undefined}>{label}</span>
          ))}
        </p>
        <a className={styles.action} href={labHref}>
          Trouver ma glace <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

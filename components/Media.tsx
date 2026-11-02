"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  kind: "video" | "image";
  src: string;
  poster?: string;
  alt: string;
  caption: string;
};

// Screen recordings play on loop while visible. With reduced motion they stay paused
// on their first frame and show a play button instead.
export default function Media({ kind, src, poster, alt, caption }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    if (reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="media">
      <div className="media-frame">
        {kind === "video" ? (
          <video
            ref={ref}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
            controls={reduced}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        )}
        {kind === "video" && !reduced && (
          <button
            type="button"
            className="media-toggle"
            onClick={() => (playing ? ref.current?.pause() : ref.current?.play())}
            aria-label={playing ? "Pause recording" : "Play recording"}
          >
            {playing ? (
              <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3" width="3" height="10" /><rect x="9" y="3" width="3" height="10" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l8 5-8 5z" /></svg>
            )}
          </button>
        )}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

"use client";

import { useState } from "react";

// Images are hotlinked from the original portfolio. If one fails, the frame disappears
// instead of showing a broken image.
export default function Media({
  src,
  alt,
  className,
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={`media ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

"use client";

import { useState } from "react";

export default function CardCompare({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="compare">
      <div className="compare-frame" style={{ ["--pos" as string]: `${pos}%` }}>
        <div className="compare-pane compare-after">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={after} alt="Redesigned order card" loading="lazy" />
          <span className="compare-tag">New card</span>
        </div>
        <div className="compare-pane compare-before" aria-hidden={pos < 2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={before} alt="Original order card" loading="lazy" />
          <span className="compare-tag">Old card</span>
        </div>
        <div className="compare-handle" aria-hidden="true" />
      </div>
      <label className="compare-range">
        <span className="sr-only">Drag to compare the old and new order card</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
        />
      </label>
      <div className="compare-buttons" role="group" aria-label="Jump to version">
        <button type="button" onClick={() => setPos(100)} aria-pressed={pos === 100}>
          Old card
        </button>
        <button type="button" onClick={() => setPos(50)} aria-pressed={pos === 50}>
          Side by side
        </button>
        <button type="button" onClick={() => setPos(0)} aria-pressed={pos === 0}>
          New card
        </button>
      </div>
    </div>
  );
}

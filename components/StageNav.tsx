"use client";

import { useEffect, useRef, useState } from "react";

export type Chapter = { id: string; stage: string; title: string; count: number; color: string };

export default function StageNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let current: string | null = null;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = c.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chapters]);

  // Keep the active chapter visible on narrow screens without moving the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const item = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (item) {
      list.scrollTo({ left: item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  const activeIndex = chapters.findIndex((c) => c.id === active);

  return (
    <nav className="stagenav" aria-label="Case study chapters">
      <ol ref={listRef}>
        {chapters.map((c, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
          return (
            <li key={c.id} data-id={c.id} data-state={state} style={{ ["--c" as string]: c.color }}>
              <a href={`#${c.id}`} aria-current={state === "active" ? "step" : undefined}>
                <span className="sn-stage">{c.stage}</span>
                <span className="sn-title">{c.title}</span>
                <span className="count">{c.count}</span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="stagenav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}

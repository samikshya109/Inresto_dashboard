"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = it.id;
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
  }, [items]);

  return (
    <nav className="secnav" aria-label="Sections">
      <div className="secnav-inner">
        <a className="secnav-home" href="#top">Inresto</a>
        <ol>
          {items.map((it) => (
            <li key={it.id}>
              <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="secnav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}

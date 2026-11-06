"use client";

import { useState } from "react";
import { siteNav } from "@/content/caseStudy";

// Portfolio-wide top navigation, matching samikshyadesigns.com.
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sitehead">
      <div className="sitehead-inner">
        <a className="sitehead-logo" href={siteNav.home} aria-label="Samikshya Satpathy, home">
          ss
        </a>

        <nav className="sitehead-links" aria-label="Portfolio">
          {siteNav.links.map((l) => (
            <a key={l.label} href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="sitehead-end">
          <a className="sitehead-cta" href={siteNav.cta.href}>
            <span className="sitehead-dot" aria-hidden="true" />
            {siteNav.cta.label}
          </a>
          <button
            type="button"
            className="sitehead-menu"
            aria-expanded={open}
            aria-controls="sitehead-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="sitehead-bars" aria-hidden="true" data-open={open || undefined}>
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <nav id="sitehead-drawer" className="sitehead-drawer" hidden={!open} aria-label="Portfolio">
        {siteNav.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

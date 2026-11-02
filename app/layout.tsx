import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inresto order dashboard — Samikshya Satpathy",
  description:
    "Case study: redesigning Inresto’s order management dashboard for restaurant teams working delivery, takeaway, curbside and dine-in at peak hours.",
  openGraph: {
    title: "Inresto order dashboard — case study",
    description:
      "How a unified, stage-based order dashboard helped restaurant teams move faster with fewer errors.",
    type: "article",
  },
};

export const viewport: Viewport = {
  themeColor: "#16202E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

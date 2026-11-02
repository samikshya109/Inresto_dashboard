# Inresto order dashboard — case study

A concise case study site for Samikshya Satpathy's redesign of the Inresto (Dineout) order dashboard. Built with Next.js, ready to deploy on Vercel.

## Structure

Problem → Goals → Solution → Key decisions → Outcome → Reflection.

Each key decision shows:
1. The decision and why it was made.
2. How it evolved, as low-fidelity wireframes (Before → Explored → Chosen).
3. The real screens or screen recordings from the product.

## Editing

- **Copy:** all text lives in `content/caseStudy.ts`.
- **Evolution notes:** each decision's `evolution` steps are short notes beside the wireframes. Edit them to match your actual explorations.
- **Metrics:** add results to the `metrics` array (e.g. `{ value: "38%", label: "faster acceptance" }`) and they appear in the Outcome section.
- **Media:** files live in `public/media`. Screen recordings were converted from GIF to MP4 (about 10× smaller, same motion). They play on loop while visible and respect reduced-motion settings.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository.
3. Keep the detected Next.js defaults and select **Deploy**.

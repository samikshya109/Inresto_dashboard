# Inresto order dashboard — case study

An interactive case study site for Samikshya Satpathy's redesign of the Inresto (Dineout) CRM order dashboard. Built with Next.js, ready to deploy on Vercel.

## How the story is structured

The page reads like the product it describes. A sticky stage bar follows the reader through six chapters named after order stages, each with a live count:

| Stage | Chapter | What's there |
| --- | --- | --- |
| Received | The problem | Five problem tickets pinned to the counter, the cost on the floor, the core insight |
| Accepted | Goals | Six goals; pick one to see which decisions deliver it |
| Preparing | Decisions | Seven decisions, each with its rationale, the tension it created and how it resolved, plus a hands-on demo: unified dashboard, stage tabs, accept drawer, status track with close indicator, bulk actions with pause and outlet switch, card/list views, and an annotated old-vs-new card slider |
| Dispatched | The solution | A playable order from accept to close, and the same dashboard switchable between phone and desktop |
| Delivered | Outcome | A shift-report receipt of outcomes, plus what the project demonstrates |
| Closed | Reflection | The closing belief |

## Editing content

All copy lives in `content/caseStudy.ts`.

- **Metrics:** add measured results to the `metrics` array (for example `{ value: "38%", label: "faster acceptance" }`). They appear on the outcome receipt automatically.
- **Tradeoffs:** each decision's `tension` and `resolution` fields were written from the decisions in the original case study. Adjust them to match what actually happened.
- **No images:** every visual is a working, coded interaction in `components/Interactives.tsx`, `components/Demos.tsx`, `components/FlowSim.tsx` and `components/HeroBoard.tsx`. Sample orders live in `components/orders.ts`.

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

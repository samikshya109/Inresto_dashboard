// All copy for the case study. Edit text here without touching layout code.
// Media files live in /public/media.

export const meta = {
  title: "Inresto order dashboard",
  summary:
    "Redesigning how restaurant teams manage delivery, takeaway, curbside and dine-in orders, so peak hours run on one clear screen.",
  facts: [
    { label: "Role", value: "Product Designer (UX)" },
    { label: "Project", value: "B2B SaaS, CRM platform, enterprise UX" },
    { label: "Platform", value: "Inresto, part of the Dineout–Inresto suite" },
    { label: "Users", value: "Brand managers, ops, support, marketing and growth teams" },
  ],
  author: "Samikshya Satpathy",
  email: "samikshyawork@gmail.com",
  portfolio: "https://www.samikshyadesigns.com",
  nextProject: "https://www.samikshyadesigns.com/sayf",
  linkedin: "https://www.linkedin.com/in/samikshya-satpathy-2186231b0/",
  behance: "https://www.behance.net/samikshsatpath",
};

export const overview =
  "Inresto powers CRM, reservations, payments and operations for leading restaurant and delivery chains in India. Its order management wasn’t built for the pace of a live kitchen. I redesigned the order dashboard so teams could manage orders faster, make fewer errors and trust what they see.";

export const problems = [
  "Delivery, takeaway, curbside and dine-in tickets lived in different places",
  "Accepting, assigning riders, billing and updating status took too many steps",
  "No clear view of which stage each order was in",
  "Critical order details were buried under layers",
  "Inconsistent UI patterns raised the learning curve",
];

export const impact = [
  "Orders delayed, missed or handled wrongly",
  "Staff fell back on manual workarounds at peak hours",
  "Efficiency dropped as volume rose",
  "Teams stopped trusting the system",
];

export const insight = "It wasn’t a lack of features. It was a clarity and system design problem.";

export const goals = [
  { title: "One command center", text: "Every order type, managed from one place" },
  { title: "Real-time visibility", text: "Stage-based navigation with live counts" },
  { title: "Lower cognitive load", text: "The right details first, in cards or lists" },
  { title: "Faster critical flows", text: "Accept, assign, bill and update with fewer steps" },
  { title: "Control at scale", text: "Bulk actions, outlet switching, pause orders" },
  { title: "System trust", text: "Predictable flows and clear closure" },
];

export type WireKind =
  | "nav-before" | "nav-explored" | "nav-final"
  | "card-before" | "card-explored" | "card-final"
  | "ops-before" | "ops-explored" | "ops-final"
  | "view-card" | "view-list";

export type Step = { label: string; wire: WireKind; note: string; chosen?: boolean };

export type Decision = {
  id: string;
  title: string;
  decision: string;
  why: string;
  // Wireframes show how the thinking moved. Edit the notes to match your real explorations.
  evolution: Step[];
  media: { kind: "video" | "image"; src: string; poster?: string; alt: string; caption: string }[];
};

export const decisions: Decision[] = [
  {
    id: "navigation",
    title: "One dashboard, sorted by type and stage",
    decision:
      "Order types became chips at the top. Stages (Incoming, Preparing, Ready, Dispatched, Delivered, Cancelled) became tabs with live counts.",
    why: "Staff see the whole floor in one glance and know exactly where the bottleneck is.",
    evolution: [
      { label: "Before", wire: "nav-before", note: "A separate screen per order type. Status hidden inside each order." },
      { label: "Explored", wire: "nav-explored", note: "One mixed list with a status dropdown. Simpler, but counts stayed invisible." },
      { label: "Chosen", wire: "nav-final", note: "Type chips plus stage tabs with counts. Two taps reach any queue.", chosen: true },
    ],
    media: [
      {
        kind: "video",
        src: "/media/type-and-stage-nav.mp4",
        poster: "/media/type-and-stage-nav.jpg",
        alt: "Order type chips and stage tabs with live counts",
        caption: "Order-type chips and stage tabs with live counts",
      },
    ],
  },
  {
    id: "card",
    title: "An order card built for a glance",
    decision:
      "Each card leads with type and ID, then due time, customer, items and bill value. One primary action changes with the stage: Accept, then Prepare.",
    why: "In a rush, staff scan, decide and act. Everything else waits behind “more” or the overflow menu.",
    evolution: [
      { label: "Before", wire: "card-before", note: "Every field at equal weight. Hard to tell what needs action." },
      { label: "Explored", wire: "card-explored", note: "Full details on the card. Clear, but too tall: fewer orders per screen." },
      { label: "Chosen", wire: "card-final", note: "Priority fields up top, tags for Future, Repeat and COD, one action.", chosen: true },
    ],
    media: [
      {
        kind: "video",
        src: "/media/order-cards.mp4",
        poster: "/media/order-cards.jpg",
        alt: "Incoming order cards with Accept actions and Future and Repeat tags",
        caption: "Incoming orders as cards, each with one clear action",
      },
    ],
  },
  {
    id: "operations",
    title: "Bulk actions and operational controls",
    decision:
      "A toolbar for Accept all, Print KOT, Print bill, Delivery partners and Pause new orders. Checkboxes on cards for batch actions, and an outlet selector up top.",
    why: "At volume, acting on orders one by one is the bottleneck. Teams need to move many orders and control intake.",
    evolution: [
      { label: "Before", wire: "ops-before", note: "Actions one order at a time, repeated dozens of times an hour." },
      { label: "Explored", wire: "ops-explored", note: "Batch options in each card’s menu. Hidden and easy to miss." },
      { label: "Chosen", wire: "ops-final", note: "One toolbar plus card checkboxes. Always visible, never accidental.", chosen: true },
    ],
    media: [
      {
        kind: "video",
        src: "/media/ops-toolbar.mp4",
        poster: "/media/ops-toolbar.jpg",
        alt: "Outlet selector, filters and bulk action toolbar",
        caption: "Outlet selector, filters and the bulk action toolbar",
      },
      {
        kind: "video",
        src: "/media/bulk-select.mp4",
        poster: "/media/bulk-select.jpg",
        alt: "Selecting several order cards with checkboxes",
        caption: "Selecting orders for a batch action",
      },
    ],
  },
  {
    id: "views",
    title: "Card view and list view",
    decision: "The same orders in two layouts, switched from one control.",
    why: "Kitchen staff scan cards; managers compare rows. Both see the same fields in the same order.",
    evolution: [
      { label: "Card view", wire: "view-card", note: "Best for scanning and acting on the floor." },
      { label: "List view", wire: "view-list", note: "Best for comparing outlets, times and items across many orders.", chosen: true },
    ],
    media: [
      {
        kind: "image",
        src: "/media/list-view.jpg",
        alt: "List view of incoming orders with outlet, placed by, times, items and Accept actions",
        caption: "List view: outlet, customer, placed and delivery time, items, action",
      },
    ],
  },
];

export const outcomes = [
  "Faster order management, especially at peak hours",
  "Clear status visibility for quicker prioritising",
  "Lower cognitive load, with critical details upfront",
  "Standardised workflows that rebuilt trust",
  "A scalable design system for future features",
];

// Add measured results when available, e.g. { value: "38%", label: "faster acceptance" }.
export const metrics: { value: string; label: string }[] = [];

export const reflection =
  "In enterprise products, users don’t need more power; they need confidence that the power will behave as expected.";

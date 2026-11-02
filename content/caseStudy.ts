// All copy for the case study lives here, so it can be edited without touching layout code.
// Images are served from the original portfolio (Wix). To self-host, drop files in /public
// and swap the URLs below for "/your-file.png".

const wix = (id: string) => `https://static.wixstatic.com/media/${id}`;

export const media = {
  cover: wix("ee2b8d_12f154c570104fa8a44cc54083c672e0~mv2.png"),
  mockup: wix("ee2b8d_c223c0d9b2ed4d6f9fab88623b4eac5a~mv2.jpg"),
  dashboardA: wix("ee2b8d_e05c2a00b335463784244617991922dd~mv2.gif"),
  dashboardB: wix("ee2b8d_ffd8a28a1b8d401e90322c34e178a97d~mv2.gif"),
  acceptA: wix("ee2b8d_a8017e483d65457cb611f1eb0eb8d09f~mv2.gif"),
  acceptB: wix("ee2b8d_8823c5d470ef46b5a27a7eb85fef2d8f~mv2.gif"),
  bulkA: wix("ee2b8d_5094cfd620504d6f8d4ebc7199ffe681~mv2.png"),
  bulkB: wix("ee2b8d_e5230ffbdbeb4487917f51c4b8282d88~mv2.png"),
  bulkGif: wix("ee2b8d_e9934740a6eb4689b2f222500f471d49~mv2.gif"),
  oldCard: wix("ee2b8d_5aaef76a2bfe434fb7f7581ff450af20~mv2.png"),
  newCard: wix("ee2b8d_292ea3a4312248119edf0e4edaf61496~mv2.png"),
};

export const meta = {
  title: "Inresto order dashboard",
  subtitle:
    "Redesigning how restaurant teams accept, track and close orders across delivery, takeaway, curbside and dine-in, so the busiest hour of the night feels like the calmest.",
  facts: [
    { label: "Project", value: "B2B SaaS, CRM platform, enterprise UX" },
    { label: "Role", value: "Product Designer (UX)" },
    { label: "Platform", value: "Inresto Campaigns, part of the Dineout–Inresto suite" },
    {
      label: "Users",
      value: "Brand managers, ops, customer support, marketing and growth teams",
    },
  ],
  author: "Samikshya Satpathy",
  email: "samikshyawork@gmail.com",
  portfolio: "https://www.samikshyadesigns.com",
  nextProject: "https://www.samikshyadesigns.com/sayf",
  linkedin: "https://www.linkedin.com/in/samikshya-satpathy-2186231b0/",
  behance: "https://www.behance.net/samikshsatpath",
};

export const overview =
  "Inresto is a restaurant technology platform powering CRM, reservations, payments and operations for leading restaurant and delivery chains in India. Its order management experience wasn’t built for environments where decisions happen in seconds. This project redesigned the order dashboard to streamline delivery, takeaway, curbside and dine-in workflows, so teams could manage orders faster, make fewer errors and work with confidence.";

export const problems = [
  {
    tag: "Fragmented",
    text: "Delivery, takeaway, curbside and dine-in tickets lived in different places.",
  },
  {
    tag: "Complex",
    text: "Accepting orders, assigning riders, choosing billing and updating status took too many steps.",
  },
  {
    tag: "Opaque",
    text: "Limited visibility into order stages made prioritising in real time hard.",
  },
  {
    tag: "Buried",
    text: "Layered information architecture slowed access to critical item and order details.",
  },
  {
    tag: "Inconsistent",
    text: "Mismatched UI patterns raised the learning curve and cognitive load.",
  },
];

export const consequences = [
  "Orders were delayed, missed, or prone to operational errors",
  "Staff relied on manual coordination and workarounds during peak hours",
  "Team efficiency dropped in high-volume situations",
  "Confidence in the system weakened, eroding operational trust",
];

export const insight = {
  lead: "This wasn’t a lack of features.",
  rest: "It was a UX clarity and system design problem.",
};

export type Goal = { title: string; text: string; decisions: number[] };

export const goals: Goal[] = [
  {
    title: "A unified command center",
    text: "One dashboard that sorts orders by type while letting teams see or manage every ticket from one place.",
    decisions: [1, 6],
  },
  {
    title: "Real-time visibility",
    text: "Quick filtering and stage-based navigation so staff instantly understand status and priority.",
    decisions: [2, 4],
  },
  {
    title: "Lower cognitive load",
    text: "Surface the details that matter through considered cards and flexible list views.",
    decisions: [6, 7],
  },
  {
    title: "Streamlined critical workflows",
    text: "Simplify accepting orders, editing rider details, choosing billing and updating status.",
    decisions: [3],
  },
  {
    title: "Efficiency at scale",
    text: "Bulk actions, outlet switching and pausing incoming orders keep teams in control at volume.",
    decisions: [5],
  },
  {
    title: "System trust",
    text: "Predictable, transparent flows with notification indicators and clear closures.",
    decisions: [2, 4],
  },
];

export type Decision = {
  n: number;
  title: string;
  decision: string;
  why: string;
  // Tradeoffs are written from the decisions above. Edit to match what actually happened.
  tension: string;
  resolution: string;
  media?: { src: string; alt: string }[];
  demo?: "views" | "stages";
};

export const decisions: Decision[] = [
  {
    n: 1,
    title: "One dashboard for every order type",
    decision:
      "A centralized dashboard consolidates all orders and groups them into Delivery, Takeaway, Curbside and Dine-in.",
    why: "A single command center improves situational awareness, cuts navigation and helps teams handle high volume.",
    tension: "Everything in one place can mean everything at once.",
    resolution:
      "Order-type tabs sit on top of an All view, so teams can zoom out for the full picture or narrow to the queue they own.",
    media: [
      { src: media.dashboardA, alt: "Unified dashboard switching between order types" },
      { src: media.dashboardB, alt: "Unified dashboard showing tickets grouped by type" },
    ],
  },
  {
    n: 2,
    title: "Stage navigation with live counts",
    decision:
      "A top bar of stages (Accepted, Prepared, Dispatched, Delivered), each showing a live ticket count for one-tap filtering.",
    why: "Clear status visibility speeds up prioritising, prevents bottlenecks and supports decisions in the moment.",
    tension: "Numbers that change constantly can become noise.",
    resolution:
      "Counts stay quiet inside the navigation instead of firing alerts, so a growing number reads as a bottleneck at a glance.",
    demo: "stages",
  },
  {
    n: 3,
    title: "Acceptance in one flow",
    decision:
      "Accept a ticket, assign a rider (in-house or third party), edit details and choose billing without leaving the flow.",
    why: "Fewer steps in critical workflows means fewer errors and orders that keep moving.",
    tension: "Putting every choice in one place risks a crowded form.",
    resolution:
      "Choices appear in the order staff make them, so the flow reads top to bottom and only asks for what’s needed next.",
    media: [
      { src: media.acceptA, alt: "Accepting an order and assigning a rider" },
      { src: media.acceptB, alt: "Choosing a billing method during acceptance" },
    ],
  },
  {
    n: 4,
    title: "Status updates with close indicators",
    decision:
      "Tickets move Prepared → Dispatched → Delivered, and a notification indicator prompts staff to close each one.",
    why: "Visible progress and a clear finish line improve accountability and prevent operational gaps.",
    tension: "An explicit close is one more tap than closing automatically.",
    resolution:
      "The extra tap is the point: a human confirms the order is done, so nothing slips out of view unnoticed.",
  },
  {
    n: 5,
    title: "Bulk actions and operational controls",
    decision:
      "Multi-select for batch edits, plus controls to pause incoming orders, switch outlets and quickly modify details.",
    why: "High-volume workflows need agility; these controls keep teams in charge during the rush.",
    tension: "Power tools make it just as fast to make a mistake at scale.",
    resolution:
      "Selection is a deliberate mode, and pausing orders is a visible state, so batch actions never happen by accident.",
    media: [
      { src: media.bulkGif, alt: "Selecting several orders for a batch action" },
      { src: media.bulkA, alt: "Pause incoming orders control" },
      { src: media.bulkB, alt: "Outlet switcher" },
    ],
  },
  {
    n: 6,
    title: "Card view and list view",
    decision: "Both card and list views, so each team picks the format that fits how it works.",
    why: "Letting people match the interface to their mental model makes them faster.",
    tension: "Two views means two layouts to design, build and keep consistent.",
    resolution:
      "Both views draw on the same order fields in the same hierarchy, so switching changes density, never meaning.",
    demo: "views",
  },
  {
    n: 7,
    title: "An order card built for a glance",
    decision: "Order cards surface the most relevant details first, with a firm visual hierarchy.",
    why: "Prioritised information lowers mental effort and speeds up action when time is short.",
    tension: "Showing less upfront means some details move one tap away.",
    resolution:
      "The card answers what, for whom, and what next. Everything else waits in the order detail.",
  },
];

export const outcomes = [
  "Faster order management and better operational efficiency, especially at peak hours",
  "Clear status visibility for quicker prioritising and decisions",
  "Lower cognitive load, with critical information surfaced upfront",
  "Standardised workflows that increased trust and reliability",
  "A scalable design system ready for future features",
];

// Add measured results here when available, e.g. { value: "38%", label: "faster acceptance" }.
// The outcome receipt shows this block only when the list is non-empty.
export const metrics: { value: string; label: string }[] = [];

export const demonstrates = [
  "Workflow and interaction design for complex, multi-stage processes",
  "Systems thinking and consistent UI patterns",
  "Information architecture for clarity and speed",
  "Problem framing and designing for real-world constraints",
  "Strategic product thinking for efficiency, trust and scale",
];

export const reflection = {
  intro: "This project reinforced a core belief in my design practice:",
  quote:
    "In enterprise products, users don’t need more power; they need confidence that the power will behave as expected.",
  outro:
    "By redesigning Inresto CRM around transparency, edge cases and system clarity, the platform became easier to use, easier to trust and easier to scale.",
};

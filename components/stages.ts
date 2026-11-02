// The four order stages from the product. Their colors carry meaning across the whole site.
export const orderStages = [
  { key: "accepted", label: "Accepted", color: "var(--accepted)" },
  { key: "prepared", label: "Prepared", color: "var(--prepared)" },
  { key: "dispatched", label: "Dispatched", color: "var(--dispatched)" },
  { key: "delivered", label: "Delivered", color: "var(--delivered)" },
] as const;

export type StageKey = (typeof orderStages)[number]["key"];

export const orderTypes = ["Delivery", "Takeaway", "Curbside", "Dine-in"] as const;
export type OrderType = (typeof orderTypes)[number];

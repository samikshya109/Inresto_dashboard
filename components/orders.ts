import type { OrderType, StageKey } from "./stages";

// Sample orders used across the interactive demos. Not real customer data.
export type Order = {
  id: number;
  type: OrderType;
  who: string;
  items: string[];
  total: number;
  stage: StageKey;
  mins: number;
  billing: string;
  outlet: string;
};

export const sampleOrders: Order[] = [
  { id: 4201, type: "Delivery", who: "Riya S.", items: ["Butter chicken", "Garlic naan", "Raita"], total: 640, stage: "accepted", mins: 2, billing: "Prepaid", outlet: "Indiranagar" },
  { id: 4202, type: "Dine-in", who: "Table 6", items: ["Thali", "Thali", "Lassi", "Gulab jamun", "Papad"], total: 1280, stage: "accepted", mins: 4, billing: "Card", outlet: "Indiranagar" },
  { id: 4203, type: "Curbside", who: "Neha G.", items: ["Veg biryani", "Salan"], total: 450, stage: "accepted", mins: 1, billing: "Prepaid", outlet: "Koramangala" },
  { id: 4197, type: "Takeaway", who: "Kabir N.", items: ["Masala dosa", "Filter coffee"], total: 410, stage: "prepared", mins: 9, billing: "Cash", outlet: "Indiranagar" },
  { id: 4198, type: "Curbside", who: "Meera T.", items: ["Paneer roll"], total: 220, stage: "prepared", mins: 7, billing: "Prepaid", outlet: "Indiranagar" },
  { id: 4195, type: "Delivery", who: "Dev P.", items: ["Chole bhature", "Lassi", "Samosa", "Jalebi"], total: 890, stage: "prepared", mins: 12, billing: "Cash", outlet: "Koramangala" },
  { id: 4199, type: "Dine-in", who: "Table 2", items: ["Pav bhaji", "Cold coffee"], total: 380, stage: "prepared", mins: 6, billing: "Card", outlet: "Koramangala" },
  { id: 4193, type: "Delivery", who: "Isha K.", items: ["Hakka noodles", "Manchurian"], total: 530, stage: "dispatched", mins: 18, billing: "Prepaid", outlet: "Indiranagar" },
  { id: 4192, type: "Takeaway", who: "Rohan V.", items: ["Idli vada", "Coffee"], total: 210, stage: "dispatched", mins: 15, billing: "Cash", outlet: "Koramangala" },
  { id: 4190, type: "Takeaway", who: "Arjun R.", items: ["Veg burger", "Fries"], total: 360, stage: "delivered", mins: 26, billing: "Card", outlet: "Indiranagar" },
  { id: 4188, type: "Dine-in", who: "Table 9", items: ["Dal makhani", "Jeera rice", "Roti"], total: 720, stage: "delivered", mins: 31, billing: "Card", outlet: "Indiranagar" },
];

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

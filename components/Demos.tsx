"use client";

import { useState } from "react";
import { orderStages, type StageKey } from "./stages";

const orders: { id: number; type: string; who: string; items: string; total: string; stage: StageKey }[] = [
  { id: 4201, type: "Delivery", who: "Riya S.", items: "3 items", total: "₹640", stage: "accepted" },
  { id: 4202, type: "Dine-in", who: "Table 6", items: "5 items", total: "₹1,280", stage: "accepted" },
  { id: 4197, type: "Takeaway", who: "Kabir N.", items: "2 items", total: "₹410", stage: "prepared" },
  { id: 4198, type: "Curbside", who: "Meera T.", items: "1 item", total: "₹220", stage: "prepared" },
  { id: 4195, type: "Delivery", who: "Dev P.", items: "4 items", total: "₹890", stage: "prepared" },
  { id: 4193, type: "Delivery", who: "Isha K.", items: "2 items", total: "₹530", stage: "dispatched" },
  { id: 4190, type: "Takeaway", who: "Arjun R.", items: "2 items", total: "₹360", stage: "delivered" },
];

// Decision 2: stage tabs with live counts that filter the queue.
export function StagesDemo() {
  const [stage, setStage] = useState<StageKey>("prepared");
  const shown = orders.filter((o) => o.stage === stage);
  return (
    <div className="demo">
      <div className="demo-tabs" role="tablist" aria-label="Order stages">
        {orderStages.map((s) => {
          const n = orders.filter((o) => o.stage === s.key).length;
          return (
            <button
              key={s.key}
              role="tab"
              aria-selected={stage === s.key}
              onClick={() => setStage(s.key)}
              style={{ ["--c" as string]: s.color }}
            >
              {s.label}
              <span className="count">{n}</span>
            </button>
          );
        })}
      </div>
      <ul className="demo-rows" role="tabpanel">
        {shown.map((o) => (
          <li key={o.id}>
            <span className="mono">#{o.id}</span>
            <span>{o.type}</span>
            <span className="muted">{o.who}</span>
          </li>
        ))}
      </ul>
      <p className="demo-note">Try it: switch stages. Sample data.</p>
    </div>
  );
}

// Decision 6: same fields, two densities.
export function ViewsDemo() {
  const [view, setView] = useState<"card" | "list">("card");
  const shown = orders.slice(0, 4);
  return (
    <div className="demo">
      <div className="seg" role="group" aria-label="View">
        <button aria-pressed={view === "card"} onClick={() => setView("card")}>Card view</button>
        <button aria-pressed={view === "list"} onClick={() => setView("list")}>List view</button>
      </div>
      {view === "card" ? (
        <ul className="demo-cards">
          {shown.map((o) => (
            <li key={o.id} style={{ ["--c" as string]: stageColor(o.stage) }}>
              <span className="dc-top"><span>{o.type}</span><span className="mono">#{o.id}</span></span>
              <strong>{o.who}</strong>
              <span className="muted">{o.items} · {o.total}</span>
            </li>
          ))}
        </ul>
      ) : (
        <table className="demo-table">
          <thead>
            <tr><th>Order</th><th>Type</th><th>Customer</th><th>Total</th></tr>
          </thead>
          <tbody>
            {shown.map((o) => (
              <tr key={o.id}>
                <td className="mono">#{o.id}</td><td>{o.type}</td><td>{o.who}</td><td>{o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="demo-note">Same fields, same order, different density. Sample data.</p>
    </div>
  );
}

function stageColor(s: StageKey) {
  return orderStages.find((x) => x.key === s)!.color;
}

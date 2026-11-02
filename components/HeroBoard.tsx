"use client";

import { useEffect, useRef, useState } from "react";
import { orderStages, type OrderType, type StageKey } from "./stages";

type Ticket = { id: number; type: OrderType; items: number; stage: StageKey; closing?: boolean };

const types: OrderType[] = ["Delivery", "Takeaway", "Curbside", "Dine-in"];
const stageOrder: StageKey[] = ["accepted", "prepared", "dispatched", "delivered"];

const seed: Ticket[] = [
  { id: 4182, type: "Delivery", items: 3, stage: "accepted" },
  { id: 4183, type: "Dine-in", items: 5, stage: "accepted" },
  { id: 4179, type: "Takeaway", items: 2, stage: "prepared" },
  { id: 4180, type: "Curbside", items: 1, stage: "prepared" },
  { id: 4176, type: "Delivery", items: 4, stage: "dispatched" },
  { id: 4174, type: "Takeaway", items: 2, stage: "delivered" },
];

export default function HeroBoard() {
  const [tickets, setTickets] = useState<Ticket[]>(seed);
  const [paused, setPaused] = useState(false);
  const nextId = useRef(4184);
  const tick = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      tick.current += 1;
      setTickets((prev) => {
        let list = prev.filter((x) => !x.closing);
        // A delivered ticket gets closed first, then the oldest ticket in each earlier stage moves on.
        const delivered = list.find((x) => x.stage === "delivered");
        const step = tick.current % 4;
        if (step === 0 && delivered) {
          return list.map((x) => (x.id === delivered.id ? { ...x, closing: true } : x));
        }
        const from = stageOrder[2 - ((tick.current + 2) % 3)];
        const mover = [...list].filter((x) => x.stage === from).sort((a, b) => a.id - b.id)[0];
        if (mover) {
          const to = stageOrder[stageOrder.indexOf(from) + 1];
          list = list.map((x) => (x.id === mover.id ? { ...x, stage: to } : x));
        }
        if (list.filter((x) => x.stage === "accepted").length < 2) {
          const id = nextId.current++;
          list = [
            ...list,
            { id, type: types[id % 4], items: (id % 5) + 1, stage: "accepted" },
          ];
        }
        return list;
      });
    }, 1700);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div className="board" aria-label="Illustration: orders moving through the four stages">
      <div className="board-bar">
        <span className="board-outlet">Outlet: Indiranagar</span>
        <button
          type="button"
          className="board-pause"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          <span className="board-pause-dot" data-on={!paused} />
          {paused ? "Resume orders" : "Pause orders"}
        </button>
      </div>
      <div className="board-cols">
        {orderStages.map((s) => {
          const inStage = tickets.filter((t) => t.stage === s.key);
          return (
            <div className="board-col" key={s.key} style={{ ["--c" as string]: s.color }}>
              <div className="board-col-head">
                <span>{s.label}</span>
                <span className="count" aria-label={`${inStage.length} orders`}>
                  {inStage.length}
                </span>
              </div>
              <ul className="board-list">
                {inStage.map((t) => (
                  <li key={t.id} className="mini-ticket" data-closing={t.closing || undefined}>
                    <span className="mt-id">#{t.id}</span>
                    <span className="mt-type">{t.type}</span>
                    <span className="mt-items">{t.items} {t.items === 1 ? "item" : "items"}</span>
                    {s.key === "delivered" && <span className="mt-close">Close</span>}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

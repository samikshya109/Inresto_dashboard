"use client";

import { useState } from "react";
import { orderStages } from "./stages";

type Step = "new" | "rider" | "billing" | "accepted" | "prepared" | "dispatched" | "delivered" | "closed";

const baseCounts = { accepted: 4, prepared: 3, dispatched: 2, delivered: 1 };

const riders = ["In-house rider", "Third-party rider"];
const billing = ["Prepaid online", "Cash on delivery", "Card on delivery"];

export default function FlowSim() {
  const [step, setStep] = useState<Step>("new");
  const [rider, setRider] = useState<string | null>(null);
  const [bill, setBill] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);

  const go = (s: Step) => {
    setStep(s);
    setTaps((t) => t + 1);
  };
  const reset = () => {
    setStep("new");
    setRider(null);
    setBill(null);
    setTaps(0);
  };

  const stageOf: Record<Step, keyof typeof baseCounts | null> = {
    new: null,
    rider: null,
    billing: null,
    accepted: "accepted",
    prepared: "prepared",
    dispatched: "dispatched",
    delivered: "delivered",
    closed: null,
  };
  const current = stageOf[step];
  const needsClose = step === "delivered";

  return (
    <div className="sim">
      <div className="sim-stages" role="list" aria-label="Stage counts">
        {orderStages.map((s) => {
          const n = baseCounts[s.key] + (current === s.key ? 1 : 0);
          return (
            <div
              key={s.key}
              role="listitem"
              className="sim-stage"
              data-on={current === s.key || undefined}
              style={{ ["--c" as string]: s.color }}
            >
              <span>{s.label}</span>
              <span className="count">{n}</span>
              {s.key === "delivered" && needsClose && <span className="notif" aria-label="Needs closing" />}
            </div>
          );
        })}
      </div>

      <div className="sim-body">
        <article className="ticket" data-step={step} aria-live="polite">
          <header className="ticket-head">
            <span className="ticket-type">Delivery</span>
            <span className="ticket-id">#4190</span>
            <span className="ticket-time">2 min ago</span>
          </header>
          <p className="ticket-customer">Aarav M. · 2.4 km</p>
          <ul className="ticket-items">
            <li><span>1×</span> Paneer tikka bowl</li>
            <li><span>2×</span> Masala lemonade</li>
          </ul>
          <dl className="ticket-meta">
            <div><dt>Rider</dt><dd>{rider ?? "Not assigned"}</dd></div>
            <div><dt>Billing</dt><dd>{bill ?? "Not selected"}</dd></div>
            <div><dt>Status</dt><dd className="ticket-status">{statusLabel(step)}</dd></div>
          </dl>
        </article>

        <div className="sim-controls">
          {step === "new" && (
            <Panel title="A new order just came in">
              <button className="btn-primary" onClick={() => go("rider")}>Accept order</button>
            </Panel>
          )}
          {step === "rider" && (
            <Panel title="Who’s delivering it?">
              {riders.map((r) => (
                <button key={r} className="btn-choice" onClick={() => { setRider(r); go("billing"); }}>{r}</button>
              ))}
            </Panel>
          )}
          {step === "billing" && (
            <Panel title="How is it being paid?">
              {billing.map((b) => (
                <button key={b} className="btn-choice" onClick={() => { setBill(b); go("accepted"); }}>{b}</button>
              ))}
            </Panel>
          )}
          {step === "accepted" && (
            <Panel title="Accepted. The kitchen has it.">
              <button className="btn-primary" onClick={() => go("prepared")}>Mark as prepared</button>
            </Panel>
          )}
          {step === "prepared" && (
            <Panel title="Food’s ready.">
              <button className="btn-primary" onClick={() => go("dispatched")}>Mark as dispatched</button>
            </Panel>
          )}
          {step === "dispatched" && (
            <Panel title="On the way.">
              <button className="btn-primary" onClick={() => go("delivered")}>Mark as delivered</button>
            </Panel>
          )}
          {step === "delivered" && (
            <Panel title="Delivered. The dot on Delivered asks you to close it.">
              <button className="btn-primary" onClick={() => go("closed")}>Close ticket</button>
            </Panel>
          )}
          {step === "closed" && (
            <Panel title={`Ticket closed in ${taps} taps, all from one screen.`}>
              <button className="btn-ghost" onClick={reset}>Try another order</button>
            </Panel>
          )}
          <p className="sim-note">Interactive illustration of the redesigned flow. Order details are sample data.</p>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sim-panel">
      <p className="sim-panel-title">{title}</p>
      <div className="sim-panel-actions">{children}</div>
    </div>
  );
}

function statusLabel(s: Step) {
  switch (s) {
    case "new": return "New";
    case "rider": case "billing": return "Accepting";
    case "accepted": return "Accepted";
    case "prepared": return "Prepared";
    case "dispatched": return "Dispatched";
    case "delivered": return "Delivered, close pending";
    case "closed": return "Closed";
  }
}

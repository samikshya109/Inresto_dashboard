"use client";

import { useMemo, useState } from "react";
import { orderStages, orderTypes, type OrderType, type StageKey } from "./stages";
import { rupees, sampleOrders, type Order } from "./orders";

const stageIndex = (s: StageKey) => orderStages.findIndex((x) => x.key === s);
const colorOf = (s: StageKey) => orderStages[stageIndex(s)].color;
const nextLabel: Record<StageKey, string> = {
  accepted: "Mark prepared",
  prepared: "Mark dispatched",
  dispatched: "Mark delivered",
  delivered: "Close",
};

/* ---------------------------------------------------------------
   Decision 1 — one dashboard, every order type
---------------------------------------------------------------- */
export function UnifiedDashboard() {
  const [type, setType] = useState<"All" | OrderType>("All");
  const shown = sampleOrders.filter((o) => type === "All" || o.type === type);
  const tabs: ("All" | OrderType)[] = ["All", ...orderTypes];

  return (
    <div className="ix">
      <div className="ix-chrome">
        <span className="ix-dot" /><span className="ix-dot" /><span className="ix-dot" />
        <span className="ix-title">Orders</span>
      </div>
      <div className="ix-pad">
        <div className="pilltabs" role="tablist" aria-label="Order type">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={type === t} onClick={() => setType(t)}>
              {t}
              <span className="count">
                {t === "All" ? sampleOrders.length : sampleOrders.filter((o) => o.type === t).length}
              </span>
            </button>
          ))}
        </div>
        <div className="dash-cols">
          {orderStages.map((s) => {
            const list = shown.filter((o) => o.stage === s.key);
            return (
              <div key={s.key} className="dash-col" style={{ ["--c" as string]: s.color }}>
                <div className="dash-col-head">
                  <span>{s.label}</span>
                  <span className="count">{list.length}</span>
                </div>
                {list.map((o) => (
                  <div key={o.id} className="dash-card">
                    <span className="dash-card-top">
                      <strong>{o.type}</strong>
                      <span className="mono">#{o.id}</span>
                    </span>
                    <span className="muted">{o.who}</span>
                  </div>
                ))}
                {list.length === 0 && <p className="dash-empty">Nothing here</p>}
              </div>
            );
          })}
        </div>
      </div>
      <p className="ix-note">Switch order types. The stages stay put, so the picture never reshuffles. Sample data.</p>
    </div>
  );
}

/* ---------------------------------------------------------------
   Decision 3 — accept, assign, bill: one flow
---------------------------------------------------------------- */
const inHouse = ["Ramesh K.", "Imran S.", "Vikas P."];
const fleet = ["Fleet partner, ETA 8 min", "Fleet partner, ETA 14 min"];

export function AcceptDrawer() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [riderType, setRiderType] = useState<"in" | "third">("in");
  const [rider, setRider] = useState<string | null>(null);
  const [prep, setPrep] = useState(15);
  const [bill, setBill] = useState("Prepaid");

  const reset = () => {
    setOpen(false);
    setDone(false);
    setRider(null);
    setRiderType("in");
    setPrep(15);
    setBill("Prepaid");
  };

  const riders = riderType === "in" ? inHouse : fleet;

  return (
    <div className="ix">
      <div className="ix-chrome">
        <span className="ix-dot" /><span className="ix-dot" /><span className="ix-dot" />
        <span className="ix-title">New orders</span>
      </div>
      <div className="accept-stage" data-open={open || undefined}>
        <div className="accept-list">
          <div className="accept-card" data-done={done || undefined}>
            <div className="accept-card-top">
              <span className="badge" data-tone={done ? "ok" : "new"}>{done ? "Accepted" : "New"}</span>
              <span className="mono">#4207</span>
              <span className="muted accept-time">just now</span>
            </div>
            <strong>Delivery · Priya D.</strong>
            <span className="muted">Butter chicken, Garlic naan × 2 · {rupees(720)}</span>
            {done ? (
              <dl className="accept-summary">
                <div><dt>Rider</dt><dd>{rider}</dd></div>
                <div><dt>Ready in</dt><dd>{prep} min</dd></div>
                <div><dt>Billing</dt><dd>{bill}</dd></div>
              </dl>
            ) : (
              <button className="btn-dark" onClick={() => setOpen(true)} disabled={open}>
                Accept order
              </button>
            )}
          </div>
          {done && (
            <button className="btn-outline" onClick={reset}>Try it again</button>
          )}
        </div>

        {open && !done && (
          <div className="drawer" role="dialog" aria-label="Accept order #4207">
            <div className="drawer-head">
              <strong>Accept #4207</strong>
              <button className="icon-btn" aria-label="Cancel" onClick={() => setOpen(false)}>×</button>
            </div>

            <fieldset className="field">
              <legend>Rider</legend>
              <div className="seg seg-sm">
                <button aria-pressed={riderType === "in"} onClick={() => { setRiderType("in"); setRider(null); }}>In-house</button>
                <button aria-pressed={riderType === "third"} onClick={() => { setRiderType("third"); setRider(null); }}>Third-party</button>
              </div>
              <div className="choice-list">
                {riders.map((r) => (
                  <label key={r} className="choice">
                    <input type="radio" name="rider" checked={rider === r} onChange={() => setRider(r)} />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend>Prep time</legend>
              <div className="stepper">
                <button aria-label="Less time" onClick={() => setPrep((p) => Math.max(5, p - 5))}>−</button>
                <span>{prep} min</span>
                <button aria-label="More time" onClick={() => setPrep((p) => Math.min(60, p + 5))}>+</button>
              </div>
            </fieldset>

            <fieldset className="field">
              <legend>Billing</legend>
              <div className="choice-row">
                {["Prepaid", "Cash", "Card"].map((b) => (
                  <label key={b} className="chip">
                    <input type="radio" name="bill" checked={bill === b} onChange={() => setBill(b)} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button className="btn-dark btn-block" disabled={!rider} onClick={() => setDone(true)}>
              {rider ? "Accept and assign rider" : "Choose a rider to accept"}
            </button>
          </div>
        )}
      </div>
      <p className="ix-note">Rider, prep time and billing in the order staff decide them, in one panel. Sample data.</p>
    </div>
  );
}

/* ---------------------------------------------------------------
   Decision 4 — status track with close indicator
---------------------------------------------------------------- */
const track = [
  { label: "Prepared", c: "var(--prepared)", action: "Mark dispatched" },
  { label: "Dispatched", c: "var(--dispatched)", action: "Mark delivered" },
  { label: "Delivered", c: "var(--delivered)", action: "Close ticket" },
  { label: "Closed", c: "var(--ink)", action: "Start over" },
];

export function StatusTrack() {
  const [i, setI] = useState(0);
  const needsClose = i === 2;
  return (
    <div className="ix ix-pad-all">
      <ol className="closeline" aria-label="Order status">
        {track.map((s, k) => (
          <li
            key={s.label}
            style={{ ["--c" as string]: s.c }}
            data-state={k < i ? "done" : k === i ? "now" : "todo"}
          >
            <span className="closeline-pip" />
            <span>{s.label}</span>
            {k === 2 && needsClose && <span className="notif" aria-label="Needs closing" />}
          </li>
        ))}
      </ol>
      <div className="track-foot" aria-live="polite">
        <p>
          {i === 0 && "Order #4197 is packed and waiting for its rider."}
          {i === 1 && "On the way to Kabir N."}
          {i === 2 && "Delivered. The red dot stays until someone closes the ticket."}
          {i === 3 && "Closed. Nothing left hanging at the end of the shift."}
        </p>
        <button className={needsClose ? "btn-alert" : "btn-dark"} onClick={() => setI((i + 1) % 4)}>
          {track[i].action}
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Decision 5 — bulk actions and operational controls
---------------------------------------------------------------- */
export function BulkControls() {
  const [outlet, setOutlet] = useState("Indiranagar");
  const [orders, setOrders] = useState<Order[]>(() =>
    sampleOrders.filter((o) => o.stage === "accepted" || o.stage === "prepared"),
  );
  const [selecting, setSelecting] = useState(false);
  const [sel, setSel] = useState<number[]>([]);
  const [paused, setPaused] = useState(false);
  const [queued, setQueued] = useState(0);
  const [seq, setSeq] = useState(4210);
  const [toast, setToast] = useState<string | null>(null);

  const list = orders.filter((o) => o.outlet === outlet && o.stage !== "dispatched");
  const toggle = (id: number) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const advance = () => {
    setOrders((os) =>
      os.map((o) => (sel.includes(o.id) ? { ...o, stage: orderStages[stageIndex(o.stage) + 1].key } : o)),
    );
    setToast(`${sel.length} ${sel.length === 1 ? "order" : "orders"} moved to the next stage`);
    setSel([]);
    setSelecting(false);
  };

  const incoming = () => {
    if (paused) {
      setQueued((q) => q + 1);
      return;
    }
    setOrders((os) => [
      { id: seq, type: orderTypes[seq % 4], who: "New guest", items: ["Combo meal"], total: 350, stage: "accepted", mins: 0, billing: "Prepaid", outlet, },
      ...os,
    ]);
    setSeq((s) => s + 1);
  };

  return (
    <div className="ix">
      <div className="ix-chrome">
        <span className="ix-dot" /><span className="ix-dot" /><span className="ix-dot" />
        <span className="ix-title">Kitchen queue</span>
      </div>
      <div className="ix-pad">
        <div className="bulk-bar">
          <label className="select">
            <span className="sr-only">Outlet</span>
            <select value={outlet} onChange={(e) => { setOutlet(e.target.value); setSel([]); }}>
              <option>Indiranagar</option>
              <option>Koramangala</option>
            </select>
          </label>
          <button className="switch" role="switch" aria-checked={paused} onClick={() => { setPaused(!paused); if (paused) setQueued(0); }}>
            <span className="switch-track"><span className="switch-thumb" /></span>
            Pause incoming
          </button>
          <button className="btn-outline btn-sm" aria-pressed={selecting} onClick={() => { setSelecting(!selecting); setSel([]); setToast(null); }}>
            {selecting ? "Cancel" : "Select"}
          </button>
        </div>

        {paused && (
          <p className="paused-banner" role="status">
            Incoming orders are paused{queued > 0 ? `. ${queued} waiting for you to resume.` : "."}
          </p>
        )}

        <ul className="bulk-list">
          {list.map((o) => (
            <li key={o.id} data-sel={sel.includes(o.id) || undefined} style={{ ["--c" as string]: colorOf(o.stage) }}>
              {selecting && (
                <input type="checkbox" aria-label={`Select order ${o.id}`} checked={sel.includes(o.id)} onChange={() => toggle(o.id)} />
              )}
              <span className="mono">#{o.id}</span>
              <span>{o.type}</span>
              <span className="muted bulk-who">{o.who}</span>
              <span className="stage-tag">{orderStages[stageIndex(o.stage)].label}</span>
            </li>
          ))}
        </ul>

        <div className="bulk-foot">
          {selecting ? (
            <button className="btn-dark" disabled={sel.length === 0} onClick={advance}>
              {sel.length === 0 ? "Select orders to update" : `Move ${sel.length} to next stage`}
            </button>
          ) : (
            <button className="btn-outline" onClick={incoming}>Simulate an incoming order</button>
          )}
          {toast && !selecting && <span className="toast" role="status">{toast}</span>}
        </div>
      </div>
      <p className="ix-note">Switch outlets, pause incoming orders, then select several and move them at once. Sample data.</p>
    </div>
  );
}

/* ---------------------------------------------------------------
   Decision 7 — old card vs new card, both built in code
---------------------------------------------------------------- */
const demoOrder = sampleOrders[0];

function OldCard() {
  const rows: [string, string][] = [
    ["Order ID", String(demoOrder.id)],
    ["Source", "ONLINE"],
    ["Type", "DEL"],
    ["Status", "ACCEPTED"],
    ["Cust.", demoOrder.who],
    ["Ph.", "98XXXXXX21"],
    ["Amt", demoOrder.total.toFixed(2)],
    ["Pay", demoOrder.billing.toUpperCase()],
    ["Items", String(demoOrder.items.length)],
    ["Time", "12:41:07"],
  ];
  return (
    <div className="oldcard">
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}><dt>{k}:</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <div className="oldcard-actions">
        <span>View</span><span>Edit</span><span>Print</span><span>Status ▾</span>
      </div>
    </div>
  );
}

function NewCard({ notes }: { notes: boolean }) {
  return (
    <div className="newcard" style={{ ["--c" as string]: "var(--accepted)" }}>
      <div className="newcard-top">
        {notes && <span className="pin" style={{ left: -48, top: -2 }}>1</span>}
        <span className="newcard-type">{demoOrder.type}</span>
        <span className="mono muted">#{demoOrder.id}</span>
        <span className="newcard-time">{demoOrder.mins} min</span>
      </div>
      <div className="newcard-mid">
        {notes && <span className="pin" style={{ left: -48, top: 2 }}>2</span>}
        <strong>{demoOrder.who}</strong>
        <span className="muted">{demoOrder.items.join(", ")}</span>
      </div>
      <div className="newcard-foot">
        <span>{rupees(demoOrder.total)} <span className="paid">{demoOrder.billing}</span></span>
        <span className="newcard-cta">
          {notes && <span className="pin" style={{ right: -10, top: -12 }}>3</span>}
          {nextLabel[demoOrder.stage]}
        </span>
      </div>
    </div>
  );
}

export function CardCompareCoded() {
  const [pos, setPos] = useState(50);
  const [notes, setNotes] = useState(false);
  return (
    <div className="compare">
      <div className="compare-frame" style={{ ["--pos" as string]: `${pos}%` }}>
        <div className="compare-pane compare-after" aria-hidden={pos > 98}>
          <NewCard notes={notes} />
          <span className="compare-tag">New card</span>
        </div>
        <div className="compare-pane compare-before" aria-hidden={pos < 2}>
          <OldCard />
          <span className="compare-tag">Old card</span>
        </div>
        <div className="compare-handle" aria-hidden="true" />
      </div>
      <label className="compare-range">
        <span className="sr-only">Drag to compare the old and new order card</span>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} />
      </label>
      <div className="compare-buttons" role="group" aria-label="Compare">
        <button type="button" onClick={() => setPos(100)} aria-pressed={pos === 100}>Old card</button>
        <button type="button" onClick={() => setPos(50)} aria-pressed={pos === 50}>Side by side</button>
        <button type="button" onClick={() => { setPos(0); }} aria-pressed={pos === 0}>New card</button>
        <button type="button" className="compare-notes" onClick={() => { setNotes(!notes); if (!notes) setPos(0); }} aria-pressed={notes}>
          {notes ? "Hide what changed" : "Show what changed"}
        </button>
      </div>
      {notes && (
        <ol className="notes-list">
          <li><span className="pin pin-inline">1</span>Order type and waiting time lead, so urgency reads first.</li>
          <li><span className="pin pin-inline">2</span>Who it’s for and what’s in it, in plain words instead of codes.</li>
          <li><span className="pin pin-inline">3</span>One clear next action replaces four equal-weight buttons.</li>
        </ol>
      )}
      <p className="ix-note">Simplified recreation of both cards for illustration.</p>
    </div>
  );
}

/* ---------------------------------------------------------------
   Solution — the same dashboard on a phone and on desktop
---------------------------------------------------------------- */
export function ResponsiveSwitch() {
  const [device, setDevice] = useState<"phone" | "desktop">("phone");
  const [stage, setStage] = useState<StageKey>("prepared");
  const counts = useMemo(
    () => Object.fromEntries(orderStages.map((s) => [s.key, sampleOrders.filter((o) => o.stage === s.key).length])),
    [],
  );
  const list = sampleOrders.filter((o) => o.stage === stage);

  return (
    <div className="resp">
      <div className="seg" role="group" aria-label="Device">
        <button aria-pressed={device === "phone"} onClick={() => setDevice("phone")}>Phone</button>
        <button aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>Desktop</button>
      </div>

      {device === "phone" ? (
        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-head">
            <strong>Orders</strong>
            <span className="muted">Indiranagar</span>
          </div>
          <div className="phone-tabs" role="tablist">
            {orderStages.map((s) => (
              <button key={s.key} role="tab" aria-selected={stage === s.key} onClick={() => setStage(s.key)} style={{ ["--c" as string]: s.color }}>
                {s.label}<span className="count">{counts[s.key]}</span>
              </button>
            ))}
          </div>
          <ul className="phone-list">
            {list.map((o) => (
              <li key={o.id} style={{ ["--c" as string]: colorOf(o.stage) }}>
                <span className="dash-card-top"><strong>{o.type}</strong><span className="muted">{o.mins} min</span></span>
                <span>{o.who}</span>
                <span className="muted">{o.items.length} {o.items.length === 1 ? "item" : "items"} · {rupees(o.total)}</span>
                <button className="phone-cta">{nextLabel[o.stage]}</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="desk">
          <aside className="desk-side">
            <strong>Inresto</strong>
            {["All orders", ...orderTypes].map((t, i) => (
              <span key={t} data-on={i === 0 || undefined}>{t}</span>
            ))}
          </aside>
          <div className="desk-main">
            <div className="desk-tabs">
              {orderStages.map((s) => (
                <button key={s.key} aria-pressed={stage === s.key} onClick={() => setStage(s.key)} style={{ ["--c" as string]: s.color }}>
                  {s.label}<span className="count">{counts[s.key]}</span>
                </button>
              ))}
            </div>
            <table className="demo-table">
              <thead>
                <tr><th>Order</th><th>Type</th><th>Customer</th><th>Items</th><th>Total</th><th>Waiting</th><th /></tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">#{o.id}</td><td>{o.type}</td><td>{o.who}</td>
                    <td>{o.items.length}</td><td>{rupees(o.total)}</td><td>{o.mins} min</td>
                    <td><button className="btn-dark btn-xs">{nextLabel[o.stage]}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <p className="ix-note">Pick a stage, then switch devices: the stage you chose carries over. Sample data.</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Decision, Goal } from "@/content/caseStudy";

export default function GoalMap({ goals, decisions }: { goals: Goal[]; decisions: Decision[] }) {
  const [sel, setSel] = useState<number | null>(null);
  const lit = sel === null ? [] : goals[sel].decisions;

  return (
    <div className="goalmap">
      <ul className="goal-list">
        {goals.map((g, i) => (
          <li key={g.title}>
            <button
              type="button"
              className="goal"
              aria-pressed={sel === i}
              onClick={() => setSel(sel === i ? null : i)}
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
            >
              <span className="goal-check" aria-hidden="true" />
              <span className="goal-body">
                <strong>{g.title}</strong>
                <span>{g.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <aside className="goal-trace" aria-live="polite">
        <p className="goal-trace-lead">
          {sel === null
            ? "Pick a goal to see which decisions answer it."
            : `“${goals[sel].title}” is delivered by:`}
        </p>
        <ol className="trace-list">
          {decisions.map((d) => {
            const on = lit.includes(d.n);
            return (
              <li key={d.n} data-on={on || undefined}>
                <a href={`#decision-${d.n}`}>
                  <span className="trace-n">{d.n}</span>
                  <span>{d.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}

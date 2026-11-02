import HeroBoard from "@/components/HeroBoard";
import StageNav, { type Chapter } from "@/components/StageNav";
import GoalMap from "@/components/GoalMap";
import FlowSim from "@/components/FlowSim";
import { StagesDemo, ViewsDemo } from "@/components/Demos";
import {
  AcceptDrawer,
  BulkControls,
  CardCompareCoded,
  ResponsiveSwitch,
  StatusTrack,
  UnifiedDashboard,
} from "@/components/Interactives";
import {
  consequences,
  decisions,
  demonstrates,
  goals,
  insight,
  meta,
  metrics,
  outcomes,
  overview,
  problems,
  reflection,
} from "@/content/caseStudy";

const chapters: Chapter[] = [
  { id: "problem", stage: "Received", title: "The problem", count: problems.length, color: "var(--received)" },
  { id: "goals", stage: "Accepted", title: "Goals", count: goals.length, color: "var(--accepted)" },
  { id: "decisions", stage: "Preparing", title: "Decisions", count: decisions.length, color: "var(--prepared)" },
  { id: "solution", stage: "Dispatched", title: "The solution", count: 3, color: "var(--dispatched)" },
  { id: "outcome", stage: "Delivered", title: "Outcome", count: outcomes.length, color: "var(--delivered)" },
  { id: "reflection", stage: "Closed", title: "Reflection", count: 1, color: "var(--ink)" },
];

export default function Page() {
  return (
    <>
      <a className="skip" href="#problem">Skip to the case study</a>

      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <a className="back" href={meta.portfolio}>Samikshya Satpathy</a>
            <h1>
              The order dashboard that keeps a restaurant calm at 8:30 on a Friday.
            </h1>
            <p className="lede">{meta.subtitle}</p>
          </div>
          <HeroBoard />
        </div>
        <div className="wrap">
          <dl className="facts">
            {meta.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <StageNav chapters={chapters} />

      <main>
        <section className="chapter overview">
          <div className="wrap narrow">
            <p className="overview-text">{overview}</p>
          </div>
        </section>

        {/* RECEIVED — the problem */}
        <section id="problem" className="chapter" style={{ ["--c" as string]: "var(--received)" }}>
          <div className="wrap">
            <ChapterHead stage="Received" title="Peak hour, before the redesign" />
            <p className="chapter-intro">
              Restaurant brands on Inresto CRM were fighting the tool while fighting the rush. Five
              problems kept landing on the counter.
            </p>
            <ul className="pile">
              {problems.map((p, i) => (
                <li key={p.tag} className="pile-ticket" style={{ ["--r" as string]: `${[-2.5, 1.8, -1, 2.6, -1.8][i]}deg` }}>
                  <span className="pile-tag">{p.tag}</span>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
            <div className="fallout">
              <h3>What it cost on the floor</h3>
              <ul>
                {consequences.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <blockquote className="insight">
              <p>
                <span>{insight.lead}</span> {insight.rest}
              </p>
            </blockquote>
          </div>
        </section>

        {/* ACCEPTED — goals */}
        <section id="goals" className="chapter" style={{ ["--c" as string]: "var(--accepted)" }}>
          <div className="wrap">
            <ChapterHead stage="Accepted" title="Six goals, each traced to a decision" />
            <p className="chapter-intro">
              Every goal had to show up somewhere concrete in the product. Pick one to see where.
            </p>
            <GoalMap goals={goals} decisions={decisions} />
          </div>
        </section>

        {/* PREPARING — decisions */}
        <section id="decisions" className="chapter" style={{ ["--c" as string]: "var(--prepared)" }}>
          <div className="wrap">
            <ChapterHead stage="Preparing" title="Seven decisions and what each one traded" />
            <p className="chapter-intro">
              Each decision solved a real problem and created a smaller one. Here’s the tension
              behind every choice, and how the design resolved it.
            </p>
          </div>
          <ol className="decisions">
            {decisions.map((d) => (
              <li key={d.n} id={`decision-${d.n}`} className="decision">
                <div className="wrap decision-grid">
                  <div className="decision-head">
                    <span className="decision-n" aria-hidden="true">{d.n}</span>
                    <h3>{d.title}</h3>
                  </div>
                  <div className="decision-body">
                    <p className="decision-what">{d.decision}</p>
                    <p className="decision-why">{d.why}</p>
                    <div className="tradeoff">
                      <div className="tradeoff-side">
                        <span className="tradeoff-label">The tension</span>
                        <p>{d.tension}</p>
                      </div>
                      <div className="tradeoff-side tradeoff-res">
                        <span className="tradeoff-label">How it resolved</span>
                        <p>{d.resolution}</p>
                      </div>
                    </div>
                    <div className="try">
                      <span className="try-label">Try it</span>
                      {d.demo === "dashboard" && <UnifiedDashboard />}
                      {d.demo === "stages" && <StagesDemo />}
                      {d.demo === "accept" && <AcceptDrawer />}
                      {d.demo === "close" && <StatusTrack />}
                      {d.demo === "bulk" && <BulkControls />}
                      {d.demo === "views" && <ViewsDemo />}
                      {d.demo === "card" && <CardCompareCoded />}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* DISPATCHED — solution */}
        <section id="solution" className="chapter" style={{ ["--c" as string]: "var(--dispatched)" }}>
          <div className="wrap">
            <ChapterHead stage="Dispatched" title="Put together, one order start to finish" />
            <p className="chapter-intro">
              Here’s the whole redesigned flow in one place. Accept an order, assign a rider, choose
              billing and move it through every stage.
            </p>
            <FlowSim />

            <div className="devices">
              <div className="devices-copy">
                <h3>Built for the pass and the back office</h3>
                <p>
                  The dashboard is responsive across mobile and web. Adaptive layouts, a clear
                  hierarchy and touch-friendly targets keep critical information reachable wherever
                  staff are standing.
                </p>
              </div>
              <ResponsiveSwitch />
            </div>
          </div>
        </section>

        {/* DELIVERED — outcome */}
        <section id="outcome" className="chapter" style={{ ["--c" as string]: "var(--delivered)" }}>
          <div className="wrap">
            <ChapterHead stage="Delivered" title="What changed on the floor" />
            <div className="outcome-grid">
              <div className="receipt" aria-label="Outcome summary">
                <div className="receipt-head">
                  <span>Inresto</span>
                  <span>Shift report</span>
                </div>
                {metrics.length > 0 && (
                  <dl className="receipt-metrics">
                    {metrics.map((m) => (
                      <div key={m.label}>
                        <dt>{m.label}</dt>
                        <dd>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <ul className="receipt-lines">
                  {outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <div className="receipt-foot">
                  <span>Status</span>
                  <span>Closed ✓</span>
                </div>
              </div>
              <div className="demonstrates">
                <h3>What this project demonstrates</h3>
                <ul>
                  {demonstrates.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSED — reflection */}
        <section id="reflection" className="chapter reflection">
          <div className="wrap narrow">
            <p className="reflection-intro">{reflection.intro}</p>
            <blockquote>
              <p>{reflection.quote}</p>
            </blockquote>
            <p className="reflection-outro">{reflection.outro}</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
        <div className="footer-grid">
          <a className="next" href={meta.nextProject}>
            <span>Up next</span>
            <strong>See the next case study</strong>
          </a>
          <div className="footer-links">
            <a href={`mailto:${meta.email}`}>{meta.email}</a>
            <a href={meta.linkedin}>LinkedIn</a>
            <a href={meta.behance}>Behance</a>
            <a href={meta.portfolio}>All work</a>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}

function ChapterHead({ stage, title }: { stage: string; title: string }) {
  return (
    <div className="chapter-head">
      <span className="stage-chip">{stage}</span>
      <h2>{title}</h2>
    </div>
  );
}

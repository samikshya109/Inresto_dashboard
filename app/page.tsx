import Media from "@/components/Media";
import SiteHeader from "@/components/SiteHeader";
import SectionNav, { type NavItem } from "@/components/SectionNav";
import Wireframe from "@/components/Wireframe";
import {
  decisions,
  goals,
  impact,
  insight,
  meta,
  metrics,
  outcomes,
  overview,
  problems,
  reflection,
} from "@/content/caseStudy";

const nav: NavItem[] = [
  { id: "problem", label: "Problem" },
  { id: "goals", label: "Goals" },
  { id: "solution", label: "Solution" },
  { id: "decisions", label: "Decisions" },
  { id: "outcome", label: "Outcome" },
];

export default function Page() {
  return (
    <>
      <a className="skip" href="#problem">Skip to the case study</a>

      <SiteHeader />

      <header className="hero" id="top">
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="cover"
            src="/media/cover.jpg"
            alt="Inresto CRM: designing a one-stop solution for restaurant growth at scale"
            width={2400}
            height={757}
          />
        </div>
        <div className="wrap hero-body">
          <div>
            <h1>{meta.title}</h1>
            <p className="lede">{meta.summary}</p>
          </div>
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

      <SectionNav items={nav} />

      <main>
        <section className="block">
          <div className="wrap narrow">
            <p className="overview">{overview}</p>
          </div>
        </section>

        <section id="problem" className="block">
          <div className="wrap">
            <h2>The problem</h2>
            <div className="split">
              <div>
                <h3>What was broken</h3>
                <ul className="list list-x">
                  {problems.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div>
                <h3>What it caused</h3>
                <ul className="list list-arrow">
                  {impact.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </div>
            <p className="insight">{insight}</p>
          </div>
        </section>

        <section id="goals" className="block">
          <div className="wrap">
            <h2>Design goals</h2>
            <ul className="goals">
              {goals.map((g) => (
                <li key={g.title}>
                  <strong>{g.title}</strong>
                  <span>{g.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="solution" className="block">
          <div className="wrap">
            <h2>The solution</h2>
            <p className="intro">
              A responsive order dashboard for web and mobile: every order type on one screen,
              organised by stage, with bulk controls for the rush.
            </p>
            <Media
              kind="video"
              src="/media/dashboard-overview.mp4"
              poster="/media/dashboard-overview.jpg"
              alt="Walkthrough of the redesigned order dashboard"
              caption="The redesigned order dashboard in card view"
            />
          </div>
        </section>

        <section id="decisions" className="block">
          <div className="wrap">
            <h2>Key decisions</h2>
            <p className="intro">How each decision evolved, and why the final version won.</p>
          </div>

          <ol className="decisions">
            {decisions.map((d, i) => (
              <li key={d.id} id={d.id} className="decision">
                <div className="wrap">
                  <div className="decision-head">
                    <span className="decision-n" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3>{d.title}</h3>
                      <p className="decision-what">{d.decision}</p>
                      <p className="decision-why"><span>Why</span> {d.why}</p>
                    </div>
                  </div>

                  <ol className={`evolution evolution-${d.evolution.length}`} aria-label="How the decision evolved">
                    {d.evolution.map((s) => (
                      <li key={s.label} className="step" data-chosen={s.chosen || undefined}>
                        <span className="step-label">{s.label}</span>
                        <Wireframe kind={s.wire} label={`${s.label} wireframe`} />
                        <p>{s.note}</p>
                      </li>
                    ))}
                  </ol>

                  <div className={`media-grid media-grid-${d.media.length}`}>
                    {d.media.map((m) => <Media key={m.src} {...m} />)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="outcome" className="block">
          <div className="wrap">
            <h2>Outcome</h2>
            {metrics.length > 0 && (
              <dl className="metrics">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <dd>{m.value}</dd>
                    <dt>{m.label}</dt>
                  </div>
                ))}
              </dl>
            )}
            <ul className="list list-check outcomes">
              {outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </section>

        <section className="reflection">
          <div className="wrap narrow">
            <blockquote>
              <p>{reflection}</p>
            </blockquote>
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
              <span className="footer-email">{meta.email}</span>
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

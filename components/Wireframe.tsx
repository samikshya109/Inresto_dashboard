import type { WireKind } from "@/content/caseStudy";

// Low-fidelity wireframes used only to show how each decision evolved.
// Grey = structure, coral = the element the decision is about.

const W = 200;
const H = 130;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="wf">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="6" className="wf-frame" />
      {children}
    </svg>
  );
}

const Line = ({ x, y, w, hi }: { x: number; y: number; w: number; hi?: boolean }) => (
  <rect x={x} y={y} width={w} height="4" rx="2" className={hi ? "wf-hi" : "wf-line"} />
);
const Box = ({ x, y, w, h, hi, soft }: { x: number; y: number; w: number; h: number; hi?: boolean; soft?: boolean }) => (
  <rect x={x} y={y} width={w} height={h} rx="3" className={hi ? "wf-hi" : soft ? "wf-soft" : "wf-block"} />
);
const Pill = ({ x, y, w, hi }: { x: number; y: number; w: number; hi?: boolean }) => (
  <rect x={x} y={y} width={w} height="9" rx="4.5" className={hi ? "wf-hi" : "wf-block"} />
);
const Check = ({ x, y, on }: { x: number; y: number; on?: boolean }) => (
  <rect x={x} y={y} width="7" height="7" rx="1.5" className={on ? "wf-hi" : "wf-outline"} />
);
const Btn = ({ x, y, w, hi }: { x: number; y: number; w: number; hi?: boolean }) => (
  <rect x={x} y={y} width={w} height="10" rx="2" className={hi ? "wf-hi-outline" : "wf-outline"} />
);
const Card = ({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="3" className="wf-card" />
    <rect x={x} y={y} width="2.5" height={h} className="wf-accent" />
    {children}
  </g>
);

export default function Wireframe({ kind, label }: { kind: WireKind; label: string }) {
  switch (kind) {
    case "nav-before":
      return (
        <Frame label={label}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={12 + i * 62} y={14 + i * 4} width="52" height="96" rx="3" className="wf-card" />
              <Line x={18 + i * 62} y={22 + i * 4} w={26} />
              {[0, 1, 2, 3].map((r) => (
                <Line key={r} x={18 + i * 62} y={38 + i * 4 + r * 14} w={38} />
              ))}
            </g>
          ))}
        </Frame>
      );
    case "nav-explored":
      return (
        <Frame label={label}>
          <Line x={12} y={14} w={50} />
          <rect x={132} y={10} width="56" height="12" rx="2" className="wf-outline" />
          <path d="M178 14 l4 4 l4 -4" className="wf-stroke" />
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <g key={r}>
              <Box x={12} y={32 + r * 15} w={176} h={11} soft />
              <Line x={16} y={35.5 + r * 15} w={40 + (r % 3) * 18} />
            </g>
          ))}
        </Frame>
      );
    case "nav-final":
      return (
        <Frame label={label}>
          <Pill x={12} y={10} w={34} hi />
          <Pill x={50} y={10} w={34} hi />
          <Pill x={88} y={10} w={30} />
          <Pill x={122} y={10} w={26} />
          {[0, 1, 2, 3, 4].map((t) => (
            <g key={t}>
              <Line x={12 + t * 37} y={32} w={22} hi={t === 0} />
              <circle cx={39 + t * 37} cy={29} r="4" className={t === 0 ? "wf-ink" : "wf-block"} />
            </g>
          ))}
          <rect x={12} y={40} width="28" height="2" className="wf-hi" />
          {[0, 1, 2].map((c) => (
            <g key={c}>
              <Card x={12 + c * 60} y={50} w={54} h={34} />
              <Card x={12 + c * 60} y={90} w={54} h={30} />
            </g>
          ))}
        </Frame>
      );
    case "card-before":
      return (
        <Frame label={label}>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              {[0, 1, 2, 3, 4].map((c) => (
                <Line key={c} x={12 + c * 36} y={20 + r * 26} w={28} />
              ))}
              {[0, 1, 2, 3, 4].map((c) => (
                <Line key={`b${c}`} x={12 + c * 36} y={28 + r * 26} w={22} />
              ))}
            </g>
          ))}
        </Frame>
      );
    case "card-explored":
      return (
        <Frame label={label}>
          <Card x={50} y={8} w={100} h={114}>
            <Line x={56} y={15} w={40} />
            {Array.from({ length: 9 }).map((_, r) => (
              <Line key={r} x={56} y={27 + r * 10} w={70 + ((r * 13) % 18)} />
            ))}
          </Card>
        </Frame>
      );
    case "card-final":
      return (
        <Frame label={label}>
          <Card x={36} y={22} w={128} h={86}>
            <rect x={44} y={30} width="44" height="7" rx="2" className="wf-ink" />
            <Pill x={92} y={29} w={20} />
            <Btn x={130} y={28} w={26} hi />
            <Line x={44} y={42} w={26} />
            <Line x={44} y={54} w={36} hi />
            <Line x={116} y={54} w={40} />
            <Check x={44} y={74} />
            <rect x={56} y={72} width="20" height="6" rx="2" className="wf-ink" />
            <Line x={56} y={84} w={16} />
            <Box x={86} y={70} w={70} h={28} soft />
            <Line x={90} y={76} w={56} />
            <Line x={90} y={86} w={40} />
          </Card>
        </Frame>
      );
    case "ops-before":
      return (
        <Frame label={label}>
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <Card key={`${r}${c}`} x={12 + c * 60} y={14 + r * 56} w={54} h={48}>
                <Line x={18 + c * 60} y={22 + r * 56} w={24} />
                <Line x={18 + c * 60} y={32 + r * 56} w={36} />
                <Btn x={44 + c * 60} y={46 + r * 56} w={18} />
              </Card>
            )),
          )}
        </Frame>
      );
    case "ops-explored":
      return (
        <Frame label={label}>
          <Card x={12} y={14} w={80} h={56}>
            <Line x={18} y={22} w={30} />
            <Line x={18} y={34} w={50} />
            {[0, 1, 2].map((d) => (
              <circle key={d} cx={84} cy={20 + d * 4} r="1.3" className="wf-ink" />
            ))}
          </Card>
          <rect x={78} y={34} width="70" height="58" rx="3" className="wf-pop" />
          {[0, 1, 2, 3].map((r) => (
            <Line key={r} x={84} y={42 + r * 12} w={46 + (r % 2) * 10} hi={r === 3} />
          ))}
          <Card x={12} y={76} w={60} h={44} />
        </Frame>
      );
    case "ops-final":
      return (
        <Frame label={label}>
          <Btn x={60} y={10} w={24} />
          <Btn x={88} y={10} w={22} />
          <Btn x={114} y={10} w={22} />
          <Btn x={140} y={10} w={48} hi />
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <Card key={`${r}${c}`} x={12 + c * 60} y={30 + r * 48} w={54} h={42}>
                <Line x={18 + c * 60} y={38 + r * 48} w={24} />
                <Check x={18 + c * 60} y={56 + r * 48} on={(r + c) % 2 === 0} />
                <Line x={30 + c * 60} y={57.5 + r * 48} w={28} />
              </Card>
            )),
          )}
        </Frame>
      );
    case "view-card":
      return (
        <Frame label={label}>
          {[0, 1].map((r) =>
            [0, 1, 2].map((c) => (
              <Card key={`${r}${c}`} x={12 + c * 60} y={14 + r * 56} w={54} h={48}>
                <rect x={18 + c * 60} y={22 + r * 56} width="22" height="5" rx="1.5" className="wf-ink" />
                <Line x={18 + c * 60} y={33 + r * 56} w={20} hi />
                <Box x={18 + c * 60} y={42 + r * 56} w={42} h={12} soft />
              </Card>
            )),
          )}
        </Frame>
      );
    case "view-list":
      return (
        <Frame label={label}>
          {[0, 1, 2, 3, 4].map((c) => (
            <Line key={c} x={18 + c * 32} y={14} w={20} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <g key={r}>
              <rect x={12} y={24 + r * 16} width="2.5" height="12" className="wf-accent" />
              <rect x={18} y={27 + r * 16} width="20" height="5" rx="1.5" className="wf-ink" />
              <Line x={50} y={28 + r * 16} w={22} />
              <Line x={82} y={28 + r * 16} w={20} />
              <Line x={114} y={28 + r * 16} w={22} hi />
              <Btn x={164} y={25.5 + r * 16} w={22} hi />
            </g>
          ))}
        </Frame>
      );
  }
}

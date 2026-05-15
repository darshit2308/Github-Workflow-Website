import { ExternalLink, Play, Github } from "lucide-react";
import { PROTOTYPES, ACHIEVEMENTS } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

export function PrototypesSection() {
  const ref = useReveal<HTMLElement>(0);

  return (
    <section
      ref={ref}
      id="prototypes"
      className="reveal scroll-mt-20 border-y border-surface-border px-6 py-20 md:px-12"
      style={{ background: "var(--gradient-brand-subtle)" }}
    >
      <div className="mx-auto max-w-[1060px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/60 px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase backdrop-blur-sm">
            Exploratory Research
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Working Prototypes & Achievements
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[1rem] leading-relaxed text-text-secondary">
            Two GitHub App prototypes validate core mechanics. Both have recorded demo
            videos proving the architecture works.
          </p>
        </div>

        {/* Prototype cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROTOTYPES.map((p, i) => (
            <PrototypeCard key={p.id} prototype={p} index={i} />
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-14">
          <h3 className="text-center font-serif text-[1.3rem] text-hiero-navy">
            Additional Achievements
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <a
                key={a.name}
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-surface-border bg-white p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="text-[0.75rem] font-bold text-hiero-blue">{a.result}</div>
                <div className="mt-1 text-[1rem] font-semibold text-hiero-navy group-hover:text-hiero-blue transition-smooth">{a.name}</div>
                <p className="mt-1.5 text-[0.82rem] text-text-secondary">{a.description}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[0.75rem] font-medium text-hiero-blue">
                  <ExternalLink size={11} /> View project
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PrototypeCard({
  prototype: p,
  index,
}: {
  prototype: (typeof PROTOTYPES)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 100);

  return (
    <div ref={ref} className="reveal rounded-2xl border border-surface-border bg-white shadow-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-surface-border bg-surface-subtle p-5">
        <div className="text-[0.75rem] font-semibold text-hiero-blue uppercase tracking-wider">{p.focus}</div>
        <h3 className="mt-1 text-[1.1rem] font-bold text-hiero-navy">{p.name}</h3>
      </div>

      <div className="p-5">
        <p className="text-[0.88rem] leading-relaxed text-text-secondary">{p.description}</p>

        {/* Features */}
        <ul className="mt-4 flex flex-col gap-2">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[0.82rem] text-text-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hiero-blue" />
              {f}
            </li>
          ))}
        </ul>

        {/* Action links */}
        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={p.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-surface-border bg-surface-subtle px-3 py-1.5 text-[0.8rem] font-medium text-hiero-navy transition-smooth hover:bg-surface-muted"
          >
            <Github size={13} /> Repository
          </a>
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-hiero-blue px-3 py-1.5 text-[0.8rem] font-medium text-white transition-smooth hover:bg-hiero-blue-mid"
          >
            <Play size={13} /> Watch Demo
          </a>
        </div>
      </div>
    </div>
  );
}

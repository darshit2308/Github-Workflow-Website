import { PHASES } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

export function TimelineSection() {
  const ref = useReveal<HTMLElement>(0);

  return (
    <section
      ref={ref}
      id="timeline"
      className="reveal scroll-mt-20 px-6 py-20 md:px-12"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="mx-auto max-w-[960px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase">
            Phased Delivery Strategy
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            7-Phase Gated Roadmap
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1rem] leading-relaxed text-text-secondary">
            Pre Jun 15 – November 30, 2026. Each phase has strict exit criteria that must be satisfied before advancing.
            A phase is not complete until its criteria are met, regardless of calendar date.
          </p>
        </div>

        {/* How to read note */}
        <div className="mt-10 rounded-xl border border-blue-200 bg-blue-50/40 p-4">
          <div className="grid gap-3 text-[0.82rem] text-text-secondary sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="font-bold text-hiero-blue">Phases</span>
              <span>describe what truth must be established and what architecture must exist before moving to the next phase.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-hiero-blue">Exit criteria</span>
              <span>are the specific, observable conditions that close a phase — not arbitrary calendar dates.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-hiero-blue">Rollback plans</span>
              <span>are written before work begins, not after a problem occurs.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-hiero-blue">Milestones</span>
              <span>are calendar checkpoints where mentor and maintainers review evidence and decide whether to proceed.</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* Vertical connector line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
            style={{
              background: "linear-gradient(180deg, #2563eb 0%, #7c3aed 40%, #06b6d4 70%, #16a34a 100%)",
            }}
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            {PHASES.map((p, i) => (
              <PhaseCard key={p.id} phase={p} index={i} />
            ))}
          </div>
        </div>

        {/* Availability note */}
        <div className="mt-12 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <h3 className="text-base font-bold text-hiero-navy">Availability & Commitment</h3>
          <div className="mt-3 grid gap-3 text-[0.88rem] text-text-secondary sm:grid-cols-2">
            <div><span className="font-semibold text-hiero-navy">Exams finish:</span> 3 May 2026</div>
            <div><span className="font-semibold text-hiero-navy">Other commitments:</span> None</div>
            <div><span className="font-semibold text-hiero-navy">Hours per week:</span> ~20–25 hours</div>
            <div><span className="font-semibold text-hiero-navy">Post-program:</span> Active contributor</div>
          </div>

          <div className="mt-4 rounded-xl border border-green-200 bg-green-50/50 p-3">
            <p className="text-[0.83rem] text-green-800">
              <strong>Midterm checkpoint</strong> is at the end of Phase 3 (Aug 31) — after all /assign guards have fixture-backed tests and a dry-run pilot has been reviewed by at least one maintainer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase: p,
  index,
}: {
  phase: (typeof PHASES)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 60);

  return (
    <div ref={ref} className="reveal relative flex gap-6 sm:pl-12">
      {/* Timeline dot */}
      <div
        className={`absolute left-[11px] top-5 hidden h-[18px] w-[18px] items-center justify-center rounded-full border-[3px] sm:flex ${
          p.highlight
            ? "border-hiero-gold bg-amber-50"
            : "border-hiero-blue bg-white"
        }`}
        aria-hidden
      />

      {/* Card */}
      <div
        className={`flex-1 rounded-2xl border p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-card-hover ${
          p.highlight
            ? "border-amber-200 bg-amber-50/50"
            : "border-surface-border bg-white"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-0.5 text-[0.72rem] font-bold uppercase tracking-wider ${
              p.highlight
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-50 text-hiero-blue"
            }`}
          >
            {p.phase}
          </span>
          <span className="text-[0.78rem] text-text-muted">{p.dates}</span>
        </div>

        <h3 className="mt-2 text-[1rem] font-bold text-hiero-navy">{p.label}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-text-secondary">{p.build}</p>

        {/* Exit criteria */}
        <div className="mt-3 rounded-lg border border-green-200 bg-green-50/50 p-3">
          <div className="text-[0.7rem] font-bold uppercase tracking-wider text-green-700 mb-2">
            Exit Criteria (phase closes only when these pass)
          </div>
          <ul className="flex flex-col gap-1.5">
            {p.exitCriteria.map((c) => (
              <li key={c} className="flex items-start gap-2 text-[0.8rem] text-green-900">
                <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700 text-[0.55rem] font-bold">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

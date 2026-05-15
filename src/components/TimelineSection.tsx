import { MILESTONES } from "@/data/siteData";
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
            Implementation Plan
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Phased Implementation Timeline
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[1rem] leading-relaxed text-text-secondary">
            June 15 – November 30, 2026. Five milestones plus midterm and final evaluations.
            20–25 hours per week. Zero other commitments.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical connector line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-[2px] hidden sm:block"
            style={{
              background: "linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #06b6d4 100%)",
            }}
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            {MILESTONES.map((m, i) => (
              <MilestoneCard key={m.id} milestone={m} index={i} />
            ))}
          </div>
        </div>

        {/* Availability note */}
        <div className="mt-12 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <h3 className="text-base font-bold text-hiero-navy">Availability</h3>
          <div className="mt-3 grid gap-3 text-[0.88rem] text-text-secondary sm:grid-cols-2">
            <div><span className="font-semibold text-hiero-navy">Exams finish:</span> 3 May 2026</div>
            <div><span className="font-semibold text-hiero-navy">Other commitments:</span> None</div>
            <div><span className="font-semibold text-hiero-navy">Hours per week:</span> ~20–25 hours</div>
            <div><span className="font-semibold text-hiero-navy">Post-program:</span> Active contributor</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone: m,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 60);

  return (
    <div ref={ref} className="reveal relative flex gap-6 sm:pl-12">
      {/* Timeline dot */}
      <div
        className={`absolute left-[11px] top-5 hidden h-[18px] w-[18px] items-center justify-center rounded-full border-[3px] sm:flex ${
          m.highlight
            ? "border-hiero-gold bg-amber-50"
            : "border-hiero-blue bg-white"
        }`}
        aria-hidden
      />

      {/* Card */}
      <div
        className={`flex-1 rounded-2xl border p-5 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-card-hover ${
          m.highlight
            ? "border-amber-200 bg-amber-50/50"
            : "border-surface-border bg-white"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-0.5 text-[0.72rem] font-bold uppercase tracking-wider ${
              m.highlight
                ? "bg-amber-100 text-amber-800"
                : "bg-blue-50 text-hiero-blue"
            }`}
          >
            {m.phase}
          </span>
          <span className="text-[0.78rem] text-text-muted">{m.dates}</span>
        </div>
        <h3 className="mt-2 text-[1rem] font-bold text-hiero-navy">{m.title}</h3>
        <p className="mt-1.5 text-[0.85rem] leading-relaxed text-text-secondary">{m.focus}</p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {m.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2 text-[0.82rem] text-text-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hiero-blue" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { ASSIGN_GUARDS } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

const WHY_ASSIGN_FIRST = [
  {
    icon: "🔄",
    title: "Forces The Full App Path",
    description:
      "Handling /assign requires: comment parsing, webhook verification, normalisation, routing, config loading, policy evaluation, a GitHub write (assignment), a user-facing comment, and an audit record. No shortcut path is available. Every component must be real.",
  },
  {
    icon: "🎯",
    title: "Bounded Scope",
    description:
      "Unlike PR quality (many checks) or review-sync (complex state machine), /assign is a single command with well-understood guards and a clear success state. It is small enough to build correctly, large enough to prove the full app path.",
  },
  {
    icon: "✅",
    title: "Our Explicit Direction",
    description:
      "We identified /assign as the first candidate. Review-sync is valuable but becomes the second or third module after the app shell is proven. Deprioritising it is not a technical decision — it's architectural discipline.",
  },
];

const ASSIGN_STEPS = [
  "A contributor comments /assign on an issue.",
  "The Listener verifies the webhook signature and installation scope.",
  "The Normalizer creates an internal IssueCommentCommand event.",
  "The Router detects /assign and routes to AssignmentCommand.",
  "The Dispatcher loads repo config and invokes AssignmentPolicy.",
  "The Policy evaluates all configured guards (see matrix below).",
  "On success: executor assigns the user, updates labels if configured, posts a confirmation comment, and writes an audit record.",
  "On failure: the app writes no state mutation except an optional explanatory comment. It never silently fails.",
];

export function AssignSection() {
  const ref = useReveal<HTMLElement>(0);

  return (
    <section
      ref={ref}
      id="assign"
      className="reveal scroll-mt-20 px-6 py-20 md:px-12"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="mx-auto max-w-[1060px]">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase">
            First Product Slice
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            <code className="font-mono text-hiero-blue">/assign</code> — The First and Only Slice
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1rem] leading-relaxed text-text-secondary">
            No policy module is built until the app shell is end-to-end proven. Then{" "}
            <strong className="text-hiero-navy">/assign</strong> is the first module — not review-sync, not PR quality.
          </p>
        </div>

        {/* Why /assign first — 3 reasons */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {WHY_ASSIGN_FIRST.map((w, i) => (
            <WhyCard key={i} item={w} index={i} />
          ))}
        </div>

        {/* Minimum behaviour spec */}
        <div className="mt-14 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <h3 className="text-base font-bold text-hiero-navy mb-5">
            Minimum Behaviour Specification — Full Pipeline Walk
          </h3>
          <ol className="flex flex-col gap-3">
            {ASSIGN_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hiero-blue text-[0.72rem] font-bold text-white mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[0.88rem] leading-relaxed text-text-secondary">{step}</p>
              </li>
            ))}
          </ol>

          {/* Key rule */}
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">⚖️</span>
              <div>
                <div className="text-[0.72rem] font-bold uppercase tracking-wider text-amber-700">
                  Critical Rule
                </div>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-amber-900">
                  A failed guard produces an explanatory comment if configured, but <strong>zero state mutations</strong>. 
                  The app never silently fails and never leaves GitHub state in an inconsistent intermediate state.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guard matrix */}
        <div className="mt-10 rounded-2xl border border-surface-border bg-white p-6 shadow-card overflow-x-auto">
          <h3 className="text-base font-bold text-hiero-navy mb-2">/assign Guard Matrix</h3>
          <p className="text-[0.83rem] text-text-secondary mb-5">
            Guards are evaluated in order. Each guard can be configured per-repository via{" "}
            <code className="rounded border border-surface-border bg-surface-subtle px-1 py-0.5 font-mono text-[0.85em]">
              .github/hiero-automation.yml
            </code>.
          </p>
          <table className="w-full text-[0.875rem]">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Guard</th>
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Default</th>
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Config Override</th>
                <th className="py-2.5 text-left font-semibold text-hiero-navy">Failure Action</th>
              </tr>
            </thead>
            <tbody>
              {ASSIGN_GUARDS.map((g, i) => (
                <tr key={i} className="border-b border-surface-border last:border-0">
                  <td className="py-3 pr-4 font-semibold text-hiero-navy">{g.guard}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-surface-subtle px-2 py-0.5 text-[0.78rem] font-medium text-text-secondary">
                      {g.default}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <code className="rounded border border-surface-border bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.78em] text-hiero-navy">
                      {g.configOverride}
                    </code>
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.75rem] font-semibold ${
                        g.failureAction.includes("silently")
                          ? "bg-gray-100 text-gray-600"
                          : g.failureAction.includes("Skip")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {g.failureAction}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review-sync is next, not first */}
        <div className="mt-10 rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-card">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="text-[1rem] font-bold text-hiero-navy">Why Review-Sync Is NOT First</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-text-secondary">
                Review-sync is still a planned module. It will become the second or third module after the app shell is proven.
                The reason for deprioritising it is <em>not</em> technical difficulty — it's architectural discipline.
                Review-sync is a more complex state machine (involving PR review queues, reviewer assignment, and label transitions)
                that risks polluting the app shell with module-specific concerns before the shell itself is trustworthy.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Assignment (Phase 2–3)", "PR Quality (Phase 4)", "Lifecycle Modules (Phase 5)", "Review Process (Phase 5–6)"].map((m) => (
                  <span key={m} className="rounded-full border border-hiero-blue/30 bg-white px-3 py-1 text-[0.75rem] font-semibold text-hiero-blue">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyCard({ item, index }: { item: (typeof WHY_ASSIGN_FIRST)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>(index * 80);
  return (
    <div
      ref={ref}
      className="reveal group rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="text-2xl">{item.icon}</div>
      <h3 className="mt-3 text-[0.95rem] font-bold text-hiero-navy">{item.title}</h3>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-text-secondary">{item.description}</p>
    </div>
  );
}

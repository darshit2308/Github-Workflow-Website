import { useReveal } from "@/hooks/useReveal";

export function Thesis() {
  const ref = useReveal<HTMLElement>(0);
  const rows = [
    {
      label: "Build The App Shell First",
      icon: "🏗️",
      text: "Listener → Normalizer → Router → Dispatcher → Executor → Audit Logger must work end-to-end before any policy module is attached. No shortcuts.",
      color: "#2563eb",
    },
    {
      label: "/assign Is The First Slice",
      icon: "🎯",
      text: "Bounded scope, forces the full pipeline path, and explicitly identified by Sophie as the correct starting point. Review-sync and PR quality come after the shell is proven.",
      color: "#7c3aed",
    },
    {
      label: "Config Is Policy, Not Code",
      icon: "📜",
      text: "The .github/hiero-automation.yml is the app's governance surface — typed, schema-validated, with feature flags, thresholds, and labels. Repositories cannot inject behavior through config.",
      color: "#16a34a",
    },
  ];

  const corrections = [
    {
      old: "Shared GitHub Action / canary is the product centre",
      corrected: "GitHub App is the product centre. Actions and canaries are compatibility/testing paths only.",
    },
    {
      old: "Python review-sync first because the canary worked",
      corrected: "/assign first: smaller scope, forces full pipeline, mentor-identified.",
    },
    {
      old: "Migration timeline appears before architecture",
      corrected: "Architecture comes first. Testing, canary, and migration appear after the product model.",
    },
    {
      old: "Config is mainly a file for extracted constants",
      corrected: "Config is the app policy surface: feature flags, thresholds, doc links, labels — schema-validated.",
    },
    {
      old: "Dry-run and canary as architectural choices",
      corrected: "Dry-run and canary are validation techniques. They belong in the testing section, not architecture.",
    },
  ];

  return (
    <section
      ref={ref}
      id="thesis"
      className="reveal scroll-mt-20 border-y border-surface-border px-6 py-20 md:px-12"
      style={{ background: "var(--gradient-brand-subtle)" }}
    >
      <div className="mx-auto max-w-[960px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/60 px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase backdrop-blur-sm">
            Architecture-First Strategy
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Shell Before Modules. Correctness Over Speed.
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-[1.05rem] leading-relaxed text-text-secondary">
            Build a{" "}
            <strong className="text-hiero-navy">GitHub App with a clean 8-stage event pipeline</strong>,
            start with{" "}
            <code className="rounded-md border border-surface-border bg-white px-2 py-0.5 font-mono text-[0.9em] text-hiero-navy">
              /assign
            </code>{" "}
            as the first product slice, and add PR quality and lifecycle modules only after the shell is proven.
          </p>
        </div>

        {/* Three principle cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {rows.map((r) => (
            <div
              key={r.label}
              className="group rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="text-2xl">{r.icon}</div>
              <div
                className="mt-3 text-sm font-bold uppercase tracking-wider"
                style={{ color: r.color }}
              >
                {r.label}
              </div>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-text-secondary">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        {/* Key invariant */}
        <div className="mx-auto mt-10 max-w-[720px] rounded-xl border border-blue-200 bg-blue-50/50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg">🎯</span>
            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-blue-700">
                Guiding Principle (Sophie's Feedback)
              </div>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-blue-900">
                Rather ship a V2 with small functionality and add more functionality, than ship a V1.5 with more functionality and then make it V2. Speed is not the goal. Correctness is.
              </p>
            </div>
          </div>
        </div>

        {/* Old vs Corrected framing */}
        <div className="mt-10 rounded-2xl border border-surface-border bg-white p-6 shadow-card overflow-x-auto">
          <h3 className="text-base font-bold text-hiero-navy mb-4">Old Framing → Corrected Framing</h3>
          <div className="flex flex-col gap-3">
            {corrections.map((c, i) => (
              <div key={i} className="grid grid-cols-1 gap-2 rounded-xl border border-surface-border p-3 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400 mt-1.5" />
                  <p className="text-[0.83rem] text-red-700 line-through leading-relaxed">{c.old}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500 mt-1.5" />
                  <p className="text-[0.83rem] text-green-800 font-medium leading-relaxed">{c.corrected}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

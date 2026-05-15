import { useReveal } from "@/hooks/useReveal";

export function Thesis() {
  const ref = useReveal<HTMLElement>(0);
  const rows = [
    {
      label: "Centralise",
      icon: "🔄",
      text: "Decision logic, schemas, fixtures, parity tests, adapters, releases.",
      color: "#2563eb",
    },
    {
      label: "Keep Local",
      icon: "📍",
      text: "Workflow YAML, triggers, permissions, checkout, harden-runner, policy.",
      color: "#16a34a",
    },
    {
      label: "Never Touch",
      icon: "🔒",
      text: "SDK security controls or maintainer governance.",
      color: "#dc2626",
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
            Core Thesis
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Architecture-First, Not Code-First
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-[1.05rem] leading-relaxed text-text-secondary">
            Build a shared automation core in{" "}
            <code className="rounded-md border border-surface-border bg-white px-2 py-0.5 font-mono text-[0.9em] text-hiero-navy">
              sdk-automations
            </code>
            , expose it through a <strong className="text-hiero-navy">GitHub Action adapter first</strong>,
            and keep a Probot/GitHub App adapter as the later orchestration path.
          </p>
        </div>

        {/* Three principle cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {rows.map((r, i) => (
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
        <div className="mx-auto mt-10 max-w-[720px] rounded-xl border border-green-200 bg-green-50/50 p-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-lg">🛡️</span>
            <div>
              <div className="text-[0.7rem] font-bold uppercase tracking-wider text-green-700">
                Invariant
              </div>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-green-900">
                Centralise reusable decision logic. Do not centralise repository
                control until governance, security, and parity gates are satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

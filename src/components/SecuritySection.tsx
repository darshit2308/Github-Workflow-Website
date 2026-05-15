import { SECURITY_SAFEGUARDS } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

const RELIABILITY_SAFEGUARDS = [
  "Verify webhook signatures and delivery IDs before processing",
  "Use GitHub App installation-scoped permissions, not personal access tokens",
  "Normalize events and validate route eligibility before dispatching",
  "Validate config schema; reject unknown high-risk fields",
  "Idempotency keys, known-bot markers, and per-issue/PR concurrency locks",
  "All decisions auditable: input, config version, policy module, intended mutation, actual mutation, and failure reason",
  "Rate-limit handling with exponential back-off in the executor — no module is responsible for retry logic",
  "Lifecycle & Abuse Defenses: listener drops payloads exceeding size limits to prevent DoS, and processes installation.deleted webhooks to gracefully purge orphaned tokens and cached state",
];

export function SecuritySection() {
  const ref = useReveal<HTMLElement>(0);

  return (
    <section
      ref={ref}
      id="security"
      className="reveal scroll-mt-20 px-6 py-20 md:px-12"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="mx-auto max-w-[1060px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase">
            Security & Reliability Model
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Fail-Closed Security Posture
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[1rem] leading-relaxed text-text-secondary">
            Seven threat vectors with explicit mitigations. When in doubt, the system fails closed —
            no non-idempotent actions are taken, events are queued for manual reconciliation, and an alert is emitted.
          </p>
        </div>

        {/* Threat cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_SAFEGUARDS.map((s, i) => (
            <SecurityCard key={s.id} safeguard={s} index={i} />
          ))}
        </div>

        {/* Reliability safeguards */}
        <div className="mt-10 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <h3 className="text-base font-bold text-hiero-navy mb-5">Reliability Safeguards</h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {RELIABILITY_SAFEGUARDS.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[0.83rem] text-text-secondary">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-[0.6rem] font-bold">
                  ✓
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery deduplication note */}
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔑</span>
            <div>
              <h3 className="text-[0.95rem] font-bold text-hiero-navy">Webhook Delivery Deduplication</h3>
              <p className="mt-2 text-[0.83rem] leading-relaxed text-text-secondary">
                To avoid duplicate side-effects from retried or replayed webhook deliveries (double-assignment, duplicate comments, conflicting label changes), 
                the system requires a durable delivery deduplication store with an atomic claim pattern.
                Key format: <code className="font-mono text-[0.85em] bg-white rounded px-1 border border-surface-border">app:&lt;app_id&gt;:delivery:&lt;delivery_id&gt;</code>.
                If the dedup store is unreachable, the recommended default is <strong>fail-closed</strong>: do not perform non-idempotent changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityCard({
  safeguard: s,
  index,
}: {
  safeguard: (typeof SECURITY_SAFEGUARDS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 60);

  return (
    <div
      ref={ref}
      className="reveal group rounded-2xl border border-surface-border bg-white p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="text-2xl">{s.icon}</div>
      <h3 className="mt-3 text-[0.95rem] font-bold text-hiero-navy">{s.title}</h3>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-red-600/80">
        <span className="font-semibold">Threat:</span> {s.threat}
      </p>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-text-secondary">
        <span className="font-semibold text-green-700">Mitigation:</span> {s.mitigation}
      </p>
    </div>
  );
}

import { SECURITY_SAFEGUARDS } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

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
            Security Model
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Fail-Closed Security Posture
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-[1rem] leading-relaxed text-text-secondary">
            Eight safeguards addressing the most critical attack vectors
            in organisation-wide CI/CD automation.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_SAFEGUARDS.map((s, i) => (
            <SecurityCard key={s.id} safeguard={s} index={i} />
          ))}
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

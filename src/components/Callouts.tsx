import { ShieldCheck, AlertTriangle } from "lucide-react";

export function InvariantBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-4 flex gap-3 rounded-lg border-l-4 p-4"
      style={{
        backgroundColor: "var(--invariant-bg)",
        borderLeftColor: "var(--invariant-border)",
      }}
    >
      <ShieldCheck
        className="mt-0.5 shrink-0"
        size={18}
        style={{ color: "var(--invariant-border)" }}
      />
      <div className="text-[0.9rem] leading-relaxed text-text-primary">
        <span
          className="mr-2 text-[0.7rem] font-semibold uppercase tracking-wider"
          style={{ color: "var(--invariant-border)" }}
        >
          Invariant
        </span>
        {children}
      </div>
    </div>
  );
}

export function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-4 flex gap-3 rounded-lg border-l-4 p-4"
      style={{
        backgroundColor: "var(--warn-bg)",
        borderLeftColor: "var(--warn-border)",
      }}
    >
      <AlertTriangle
        className="mt-0.5 shrink-0"
        size={18}
        style={{ color: "var(--warn-border)" }}
      />
      <div className="text-[0.9rem] leading-relaxed text-text-primary">
        <span
          className="mr-2 text-[0.7rem] font-semibold uppercase tracking-wider"
          style={{ color: "var(--warn-border)" }}
        >
          Risk
        </span>
        {children}
      </div>
    </div>
  );
}

import { ARCH_BEFORE_AFTER, PIPELINE_COMPONENTS, BOUNDARY_ZONES } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { MermaidDiagram } from "./MermaidDiagram";

// Full 8-component event pipeline — clean Mermaid (no HTML tags, no emojis in labels)
const PIPELINE_MERMAID = `graph TB
  GH["GitHub Repositories\n(Webhook Events)"]

  subgraph App["Hiero Workflow App"]
    direction TB
    L["Webhook Listener\nHMAC-SHA256 · Trust Boundary"]
    N["Event Normalizer\nNormalizedEvent model"]
    R["Router\nDeclarative route registration"]
    D["Dispatcher\nModule registry · Error handling"]
    PM["Policy Modules\nPure decision functions · No I/O"]
    E["Executor\nGitHub API · Idempotency · Back-off"]
    CE["Config Engine\n.github/hiero-automation.yml · Schema validation"]
    AL["Audit Logger\nEvery decision · Append-only · 90-day retention"]
  end

  GHAPI["GitHub API"]

  GH -->|"HTTPS webhook"| L
  L -->|"Verified payload"| N
  N -->|"NormalizedEvent"| R
  R -->|"Named route"| D
  CE -->|"Validated config"| D
  D -->|"Event context + config"| PM
  PM -->|"ApprovedOperations"| E
  E -->|"read/write"| GHAPI
  CE -->|"reads config from"| GHAPI
  L -->|"audit"| AL
  N -->|"audit"| AL
  D -->|"audit"| AL
  E -->|"audit"| AL`;

// /assign sequence diagram — corrected: Dispatcher REQUESTS config from Config Engine
const ASSIGN_SEQUENCE_MERMAID = `sequenceDiagram
  participant C as Contributor
  participant L as Listener
  participant N as Normalizer
  participant R as Router
  participant D as Dispatcher
  participant CE as Config Engine
  participant AP as Assignment Policy
  participant E as Executor
  participant GH as GitHub API
  participant AL as Audit Logger

  C->>L: POST /assign on issue (webhook)
  L->>L: Verify HMAC-SHA256 + installation scope
  L->>AL: Audit: event received (delivery ID logged)
  L->>N: Verified raw payload
  N->>AL: Audit: NormalizedEvent created
  N->>R: NormalizedEvent (IssueCommentCommand)
  R->>D: Route: AssignmentCommand
  D->>CE: Load config for repo
  CE->>GH: GET .github/hiero-automation.yml
  GH-->>CE: Raw config file
  CE->>CE: Validate against JSON schema
  CE-->>D: Typed, validated repo config
  D->>AL: Audit: config version + module selected
  D->>AP: NormalizedEvent + validated config

  alt All guard checks pass
    AP-->>D: ApprovedOperations list
    D->>E: Forward ApprovedOperations
    E->>GH: Assign user to issue
    E->>GH: Update labels (if configured)
    E->>GH: Post confirmation comment
    E->>AL: Audit: success + actual mutation result
  else Any guard check fails
    AP-->>D: Rejection reason + guard name
    D->>E: Post explanatory comment only (if config allows)
    E->>AL: Audit: rejected + reason + zero state mutations
  end`;

export function ArchitectureSection() {
  const ref = useReveal<HTMLElement>(0);
  const [showPipeline, setShowPipeline] = useState(false);
  const [showSequence, setShowSequence] = useState(false);

  return (
    <section
      ref={ref}
      id="architecture"
      className="reveal scroll-mt-20 border-y border-surface-border px-6 py-20 md:px-12"
      style={{ background: "var(--gradient-brand-subtle)" }}
    >
      <div className="mx-auto max-w-[1060px]">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/60 px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase backdrop-blur-sm">
            End-State Architecture
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            GitHub App with a Clean Event Pipeline
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1rem] leading-relaxed text-text-secondary">
            Eight components. One trust boundary at the listener. Modules are pure functions.
            The executor handles all GitHub writes. Audit logging is first-class — not an afterthought.
          </p>
        </div>

        {/* Pipeline diagram toggle */}
        <div className="mt-10 text-center">
          <button
            id="toggle-pipeline-diagram"
            onClick={() => setShowPipeline(!showPipeline)}
            className="inline-flex items-center gap-2 rounded-xl bg-hiero-blue px-6 py-3 text-sm font-semibold text-white shadow-card transition-smooth hover:shadow-elevated hover:scale-[1.02]"
          >
            {showPipeline ? "Hide" : "View"} Full Pipeline Diagram
          </button>
        </div>

        {showPipeline && (
          <div className="mt-8 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <MermaidDiagram id="arch-pipeline" code={PIPELINE_MERMAID} />
            <p className="mt-4 text-center text-sm text-text-secondary">
              Config Engine feeds the Dispatcher. Audit Logger receives from every stage. No module writes to GitHub directly — only the Executor does.
            </p>
          </div>
        )}

        {/* Before / After comparison */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">❌</span>
              <h3 className="text-lg font-bold text-red-700">
                {ARCH_BEFORE_AFTER.before.title}
              </h3>
            </div>
            <p className="text-[0.82rem] text-red-600/80 mb-4">
              {ARCH_BEFORE_AFTER.before.subtitle}
            </p>
            <ul className="flex flex-col gap-2.5">
              {ARCH_BEFORE_AFTER.before.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[0.88rem] text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✅</span>
              <h3 className="text-lg font-bold text-green-800">
                {ARCH_BEFORE_AFTER.after.title}
              </h3>
            </div>
            <p className="text-[0.82rem] text-green-600/80 mb-4">
              {ARCH_BEFORE_AFTER.after.subtitle}
            </p>
            <ul className="flex flex-col gap-2.5">
              {ARCH_BEFORE_AFTER.after.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[0.88rem] text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 8 Pipeline Component Cards */}
        <div className="mt-14">
          <h3 className="text-center font-serif text-[1.3rem] text-hiero-navy mb-2">
            The Eight Pipeline Components
          </h3>
          <p className="text-center text-[0.88rem] text-text-secondary mb-8">
            Each component has a single, well-defined responsibility. No component owns another's concern.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PIPELINE_COMPONENTS.map((c, i) => (
              <ComponentCard key={c.id} component={c} index={i} />
            ))}
          </div>
        </div>

        {/* Architectural Principles */}
        <div className="mt-14 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
          <h3 className="text-base font-bold text-hiero-navy mb-5">Six Architectural Principles</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { n: "1", title: "One trust boundary, at the listener", desc: "Every event is verified before it enters the internal pipeline. No module receives an unverified payload." },
              { n: "2", title: "Modules are pure", desc: "Policy modules return decisions; they do not perform I/O. This makes them trivially testable." },
              { n: "3", title: "Config is policy, not code", desc: "Repositories express intent through typed config fields. They cannot inject behavior through config." },
              { n: "4", title: "Executor handles all mutations", desc: "No module writes to GitHub directly. Idempotency and audit logging are centrally enforceable." },
              { n: "5", title: "Audit is first-class", desc: "Every event produces an audit record, regardless of outcome. An event that produces no mutation still produces an audit entry explaining why." },
              { n: "6", title: "Shell before modules", desc: "The listener → normalizer → router → dispatcher → executor → audit path must work end-to-end before any policy module is attached." },
            ].map((p) => (
              <div key={p.n} className="flex items-start gap-3 rounded-xl border border-surface-border p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hiero-blue text-[0.72rem] font-bold text-white">
                  {p.n}
                </span>
                <div>
                  <div className="text-[0.85rem] font-bold text-hiero-navy">{p.title}</div>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-text-secondary">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Boundary Table */}
        <div className="mt-10 rounded-2xl border border-surface-border bg-white p-6 shadow-card overflow-x-auto">
          <h3 className="text-base font-bold text-hiero-navy mb-4">Boundary Discipline: What Lives Where</h3>
          <table className="w-full text-[0.875rem]">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Zone</th>
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">What Stays There</th>
                <th className="py-2.5 text-left font-semibold text-hiero-navy">Why</th>
              </tr>
            </thead>
            <tbody>
              {BOUNDARY_ZONES.map((bz) => (
                <tr key={bz.id} className="border-b border-surface-border last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span>{bz.icon}</span>
                      <span className="font-semibold" style={{ color: bz.color }}>{bz.zone}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{bz.stays}</td>
                  <td className="py-3 text-text-secondary text-[0.82rem]">{bz.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sequence diagram toggle */}
        <div className="mt-10 text-center">
          <button
            id="toggle-sequence-diagram"
            onClick={() => setShowSequence(!showSequence)}
            className="inline-flex items-center gap-2 rounded-xl border border-hiero-blue/30 bg-blue-50/80 px-6 py-3 text-sm font-semibold text-hiero-blue shadow-card transition-smooth hover:bg-blue-100/80"
          >
            {showSequence ? "Hide" : "View"} /assign Sequence Diagram
          </button>
        </div>

        {showSequence && (
          <div className="mt-8 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <MermaidDiagram id="assign-sequence" code={ASSIGN_SEQUENCE_MERMAID} />
            <p className="mt-4 text-center text-sm text-text-secondary">
              The approval path and rejection path as alt frames. Every path produces an audit record.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ComponentCard({
  component: c,
  index,
}: {
  component: (typeof import("@/data/siteData").PIPELINE_COMPONENTS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 50);

  return (
    <div
      ref={ref}
      className={`reveal group rounded-2xl border p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover ${
        c.highlight
          ? "border-hiero-blue/30 bg-blue-50/50"
          : "border-surface-border bg-white"
      }`}
    >
      <div className="text-2xl">{c.icon}</div>
      <div className="mt-3">
        <div className={`text-[0.7rem] font-bold uppercase tracking-wider ${c.highlight ? "text-hiero-blue" : "text-text-muted"}`}>
          {c.shortRole}
        </div>
        <h3 className="mt-1 text-[0.95rem] font-bold text-hiero-navy">{c.name}</h3>
      </div>
      <p className="mt-2 text-[0.78rem] leading-relaxed text-text-secondary line-clamp-4 group-hover:line-clamp-none transition-all">
        {c.responsibility}
      </p>
    </div>
  );
}

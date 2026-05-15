import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { ARCH_BEFORE_AFTER } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";
import { useState } from "react";
import { MermaidDiagram } from "./MermaidDiagram";

const ARCH_MERMAID = `graph LR
  subgraph SDK_Repos["Python / C++ SDK Repos"]
    direction TB
    WF["Workflow YAML<br/>triggers, permissions<br/>harden-runner, checkout<br/>repo config"]
  end
  subgraph Actions_Adapter["GitHub Action Adapter"]
    direction TB
    AA["Validates inputs<br/>Calls shared core<br/>Dry-run + writes"]
  end
  subgraph Core["packages/core"]
    direction TB
    CR["Registry, review-sync<br/>Assignment, PR checks<br/>Comment builders<br/>Label decisions<br/>Config validation"]
  end
  GH_API["GitHub API"]
  SDK_Repos -->|"uses (pinned SHA)"| Actions_Adapter
  Actions_Adapter -->|"calls"| Core
  Core -->|"read/write"| GH_API`;

export function ArchitectureSection() {
  const ref = useReveal<HTMLElement>(0);
  const [showDiagram, setShowDiagram] = useState(false);

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
            System Architecture
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            From Fragmented Scripts to Hybrid Architecture
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[1rem] leading-relaxed text-text-secondary">
            Centralise reusable automation logic. Keep SDK repository autonomy.
            A Microkernel pattern with ports-and-adapters.
          </p>
        </div>

        {/* Before / After comparison */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Before */}
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-card">
            <div className="flex items-center gap-2">
              <XCircle size={20} className="text-red-500" />
              <h3 className="text-lg font-bold text-red-700">
                {ARCH_BEFORE_AFTER.before.title}
              </h3>
            </div>
            <p className="mt-1 text-[0.85rem] text-red-600/80">
              {ARCH_BEFORE_AFTER.before.subtitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
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
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-green-600" />
              <h3 className="text-lg font-bold text-green-800">
                {ARCH_BEFORE_AFTER.after.title}
              </h3>
            </div>
            <p className="mt-1 text-[0.85rem] text-green-600/80">
              {ARCH_BEFORE_AFTER.after.subtitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ARCH_BEFORE_AFTER.after.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[0.88rem] text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Arrow */}
        <div className="my-8 flex items-center justify-center">
          <div className="flex items-center gap-3 rounded-full border border-surface-border bg-white px-6 py-2.5 text-sm font-semibold text-hiero-navy shadow-card">
            <ArrowRight size={16} className="text-hiero-blue" />
            Architecture-first transition
          </div>
        </div>

        {/* Architecture diagram toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            className="inline-flex items-center gap-2 rounded-xl bg-hiero-blue px-6 py-3 text-sm font-semibold text-white shadow-card transition-smooth hover:shadow-elevated hover:scale-[1.02]"
          >
            {showDiagram ? "Hide" : "View"} System Architecture Diagram
          </button>
        </div>

        {showDiagram && (
          <div className="mt-8 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
            <MermaidDiagram id="arch-main" code={ARCH_MERMAID} />
            <p className="mt-4 text-center text-sm text-text-secondary">
              Four zones converge on one shared core. No zone owns another's security boundary.
            </p>
          </div>
        )}

        {/* Three-bucket classification */}
        <div className="mt-10 rounded-2xl border border-surface-border bg-white p-6 shadow-card overflow-x-auto">
          <h3 className="text-base font-bold text-hiero-navy mb-4">Three-Bucket Classification</h3>
          <table className="w-full text-[0.875rem]">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Bucket</th>
                <th className="py-2.5 pr-4 text-left font-semibold text-hiero-navy">Examples</th>
                <th className="py-2.5 text-left font-semibold text-hiero-navy">Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-surface-border">
                <td className="py-3 pr-4 font-medium text-blue-700">Shared core</td>
                <td className="py-3 pr-4 text-text-secondary">Review-sync decisions, assignment eligibility, PR check rules, comment builders, label transitions, fixtures, parity tests</td>
                <td className="py-3 text-text-secondary">Move here when behaviour is common or configurable across SDKs</td>
              </tr>
              <tr className="border-b border-surface-border">
                <td className="py-3 pr-4 font-medium text-green-700">Repo-local</td>
                <td className="py-3 pr-4 text-text-secondary">Workflow triggers, permissions, checkout, harden-runner, concurrency, token</td>
                <td className="py-3 text-text-secondary">Keep local — security and operational controls</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-amber-700">Repo policy</td>
                <td className="py-3 pr-4 text-text-secondary">Maintainer team, label names, docs links, assignment limits, support channels</td>
                <td className="py-3 text-text-secondary">Protected local config validated by central schema</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

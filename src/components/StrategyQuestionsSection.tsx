import { ArrowRight, Recycle, Trash2, Rocket, ArrowRightLeft } from "lucide-react";

const STRATEGY_QAS = [
  {
    icon: ArrowRightLeft,
    question: "How do you migrate all the code?",
    answer:
      "We do not migrate everything at once. We first build and harden the 8-component App Shell (Phase 1) to establish a trustworthy event pipeline. Once proven, we migrate one vertical slice at a time — starting with the simplest boundary (`/assign`), followed by PR Quality, and finally Lifecycle modules. CI/CD build scripts remain local to the SDK repositories forever.",
  },
  {
    icon: Recycle,
    question: "What is reusable?",
    answer:
      "The entire App Shell is reusable across all repositories in the Hiero ecosystem. The Webhook Listener, Normalizer, Router, Dispatcher, and Audit Logger are built once. The policy modules (e.g., Assignment, PR Quality) are pure decision functions that are reused globally but dynamically configured by each repository's `.github/hiero-automation.yml` schema.",
  },
  {
    icon: Trash2,
    question: "What needs to be torn up?",
    answer:
      "The legacy per-repo Python scripts (e.g., `assign.py`, `review_sync.py`), arbitrary API retry loops, fragmented security assumptions, and redundant GitHub Action workflow wrappers currently scattered across the Python and C++ SDKs must be completely torn down. They will be replaced by centralized policy modules and a unified GitHub App installation.",
  },
  {
    icon: Rocket,
    question: "How do you make the solution future looking?",
    answer:
      "By enforcing strict architectural boundaries. Policy modules are written as pure functions with no side effects or cross-module coupling, making them trivially testable and easy to swap. Configuration is versioned via JSON schema to prevent silent drift. The centralized Audit Logger ensures we have the data to debug future edge cases.",
  },
];

export function StrategyQuestionsSection() {
  return (
    <section id="strategy" className="relative bg-white px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-hiero-navy/5 px-3 py-1 text-[0.75rem] font-bold tracking-widest text-hiero-navy uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-hiero-blue" />
            Mentor Directives
          </div>
          <h2 className="mt-6 font-serif text-3xl text-hiero-navy md:text-4xl">
            Core Strategic Answers
          </h2>
          <p className="mt-4 max-w-[600px] text-[1.05rem] leading-relaxed text-text-secondary">
            Addressing the fundamental questions posed by the LFDT mentorship team regarding
            migration philosophy, reusability, tech debt teardown, and future-proofing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {STRATEGY_QAS.map((qa, index) => {
            const Icon = qa.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-surface-border bg-surface-alt p-8 transition-all duration-300 hover:border-hiero-blue/30 hover:shadow-card-hover"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-hiero-blue/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10 flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                    <Icon size={22} className="text-hiero-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-hiero-navy">
                      {qa.question}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-text-secondary">
                      {qa.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

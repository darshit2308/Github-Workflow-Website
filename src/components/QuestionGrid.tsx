import { QUESTIONS } from "@/data/questions";
import { QuestionCard } from "./QuestionCard";

export function QuestionGrid() {
  return (
    <section id="questions" className="scroll-mt-20 border-t border-surface-border px-6 py-20 md:px-12" style={{ background: "var(--gradient-brand-subtle)" }}>
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/60 px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase backdrop-blur-sm">
            Pre-Interview Task
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Nine Questions, Nine Answers
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[1rem] leading-relaxed text-text-secondary">
            The full architecture, one question at a time — with interactive
            diagrams and detailed explanations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {QUESTIONS.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

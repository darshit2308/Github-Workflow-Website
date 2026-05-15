import { useState } from "react";
import { ChevronDown, GitBranch, Youtube } from "lucide-react";
import type { Question } from "@/data/questions";
import { CriterionTag } from "./CriterionTag";
import { InvariantBox, WarnBox } from "./Callouts";
import { YoutubeModal } from "./YoutubeModal";
import { MermaidModal } from "./MermaidModal";
import { useReveal } from "@/hooks/useReveal";

export function QuestionCard({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [yt, setYt] = useState(false);
  const [diag, setDiag] = useState(false);
  const ref = useReveal<HTMLElement>((index % 6) * 60);

  return (
    <article
      ref={ref}
      id={question.id}
      className={`reveal scroll-mt-28 ${question.fullSpan ? "lg:col-span-2" : ""}`}
    >
      <div className="shadow-card hover:shadow-card-hover group rounded-2xl border border-surface-border bg-white p-6 transition-smooth hover:-translate-y-0.5 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface-subtle px-2.5 py-0.5 text-[0.75rem] font-semibold text-hiero-blue">
            {question.number}
          </span>
          <span className="text-[0.7rem] font-medium text-text-muted">
            {question.marks} pts
          </span>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {question.criteria.map((c) => (
              <CriterionTag key={c.key} k={c.key} value={c.value} />
            ))}
          </div>
        </div>

        <h3 className="mt-4 font-serif text-[1.4rem] leading-tight text-hiero-navy sm:text-[1.5rem]">
          {question.title}
        </h3>

        <p
          className="mt-4 border-l-2 pl-4 text-[0.95rem] leading-relaxed text-text-secondary italic"
          style={{ borderColor: "var(--surface-border)" }}
        >
          “{question.pullQuote}”
        </p>

        <hr className="my-6 border-surface-border" />

        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setYt(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-medium text-hiero-blue transition-smooth hover:bg-surface-subtle"
          >
            <Youtube size={15} />
            Watch explanation
          </button>
          <button
            type="button"
            onClick={() => setDiag(true)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-medium text-hiero-blue transition-smooth hover:bg-surface-subtle"
          >
            <GitBranch size={15} />
            View diagram
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`${question.id}-body`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-medium text-hiero-blue transition-smooth hover:bg-surface-subtle"
          >
            <ChevronDown
              size={15}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "Collapse" : "Expand answer"}
          </button>
        </div>

        <div
          id={`${question.id}-body`}
          className="grid transition-all duration-300 ease-in-out"
          style={{
            gridTemplateRows: expanded ? "1fr" : "0fr",
          }}
        >
          <div className="overflow-hidden">
            <div className="mt-6 border-t border-surface-border pt-6">
              <div
                className="prose-hiero text-[0.9375rem] leading-relaxed text-text-primary"
                dangerouslySetInnerHTML={{ __html: question.body }}
              />

              {question.callouts?.map((c, i) =>
                c.kind === "invariant" ? (
                  <InvariantBox key={i}>{c.text}</InvariantBox>
                ) : (
                  <WarnBox key={i}>{c.text}</WarnBox>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <YoutubeModal
        question={question}
        open={yt}
        onClose={() => setYt(false)}
      />
      <MermaidModal
        question={question}
        open={diag}
        onClose={() => setDiag(false)}
      />
    </article>
  );
}

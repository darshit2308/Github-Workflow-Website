import type { CriterionKey } from "@/data/questions";

const COLOR: Record<CriterionKey, string> = {
  K: "var(--tag-k)",
  R: "var(--tag-r)",
  A: "var(--tag-a)",
  E: "var(--tag-e)",
};

const LABEL: Record<CriterionKey, string> = {
  K: "Knowledge",
  R: "Relevance",
  A: "Analysis",
  E: "Evaluation",
};

export function CriterionTag({ k, value }: { k: CriterionKey; value: number }) {
  return (
    <span
      title={LABEL[k]}
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.7rem] font-semibold text-white"
      style={{ backgroundColor: COLOR[k] }}
    >
      {k} = {value}
    </span>
  );
}

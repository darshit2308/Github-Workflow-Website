import { ExternalLink, GitMerge, GitPullRequest } from "lucide-react";
import { CONTRIBUTIONS, CONTRIBUTION_CATEGORIES } from "@/data/siteData";
import { useReveal } from "@/hooks/useReveal";

export function ContributionsTimeline() {
  const ref = useReveal<HTMLElement>(0);

  return (
    <section
      ref={ref}
      id="contributions"
      className="reveal scroll-mt-20 px-6 py-20 md:px-12"
      style={{ backgroundColor: "var(--surface-page)" }}
    >
      <div className="mx-auto max-w-[960px]">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-4 py-1.5 text-[0.75rem] font-semibold tracking-[0.15em] text-hiero-blue uppercase">
            Pre-Application Work
          </div>
          <h2 className="mt-5 font-serif text-[1.75rem] text-hiero-navy sm:text-[2.2rem]">
            Contributions & Ecosystem Alignment
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[1rem] leading-relaxed text-text-secondary">
            Across 5 repositories, 13+ pull requests merged — demonstrating ecosystem
            familiarity and engineering discipline.
          </p>
        </div>

        {/* Category pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CONTRIBUTION_CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-surface-border bg-white px-3 py-1.5 text-[0.8rem] font-medium text-text-secondary shadow-card"
            >
              <span>{cat.icon}</span>
              {cat.label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="timeline-line hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-6">
            {CONTRIBUTIONS.map((c, i) => (
              <ContributionCard key={c.id} contribution={c} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContributionCard({
  contribution: c,
  index,
}: {
  contribution: (typeof CONTRIBUTIONS)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>(index * 80);

  return (
    <div ref={ref} className="reveal relative flex gap-6 sm:pl-12">
      {/* Timeline dot */}
      <div
        className="absolute left-[11px] top-6 hidden h-[18px] w-[18px] items-center justify-center rounded-full border-[3px] border-hiero-blue bg-white sm:flex"
        aria-hidden
      />

      {/* Card */}
      <div className="flex-1 rounded-2xl border border-surface-border bg-white p-6 shadow-card transition-smooth hover:-translate-y-0.5 hover:shadow-card-hover">
        {/* Repo tag and PRs */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={c.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-1 text-[0.8rem] font-semibold text-hiero-navy transition-smooth hover:bg-surface-muted"
          >
            <ExternalLink size={12} />
            {c.repo}
          </a>
          <div className="flex flex-wrap gap-1.5">
            {c.prs.map((pr) => (
              <a
                key={pr.number}
                href={pr.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold transition-smooth hover:scale-105 ${
                  pr.status === "merged" ? "badge-merged" : "badge-open"
                }`}
              >
                {pr.status === "merged" ? (
                  <GitMerge size={11} />
                ) : (
                  <GitPullRequest size={11} />
                )}
                PR {pr.number}
              </a>
            ))}
          </div>
        </div>

        {/* Title and description */}
        <h3 className="mt-3 text-[1.05rem] font-semibold text-hiero-navy">
          {c.title}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-text-secondary">
          {c.description}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border bg-surface-subtle px-2.5 py-0.5 text-[0.7rem] font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

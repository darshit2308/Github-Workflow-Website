import { ExternalLink, Github, Heart } from "lucide-react";
import { SITE } from "@/data/siteData";

export function Footer() {
  const link = (href: string, label: string) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-smooth hover:text-hiero-blue"
    >
      <ExternalLink size={12} />
      {label}
    </a>
  );

  return (
    <footer className="border-t border-surface-border bg-white">
      <div className="mx-auto max-w-[1080px] px-6 py-16 md:px-12">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Column 1 — Identity */}
          <div>
            <div className="font-serif text-xl gradient-text font-bold">
              Darshit Khandelwal
            </div>
            <div className="mt-2 text-sm text-text-secondary">{SITE.mentorship}</div>
            <div className="text-sm text-text-secondary">{SITE.project}</div>
            <div className="mt-3 text-[0.8rem] text-text-muted">{SITE.email}</div>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-hiero-blue transition-smooth hover:text-hiero-blue-mid"
            >
              <Github size={14} />
              {SITE.githubHandle}
            </a>
          </div>

          {/* Column 2 — Documents */}
          <div>
            <div className="text-[0.7rem] font-semibold tracking-[0.18em] text-hiero-navy uppercase">
              Documents
            </div>
            <ul className="mt-3 space-y-2.5">
              <li>{link(SITE.applicationPdf, "Full mentorship application")}</li>
              <li>{link(SITE.archPlanPdf, "5-page architecture plan")}</li>
              <li>{link(SITE.finalPdf, "Comprehensive detailed plan")}</li>
              <li>{link(SITE.taskSolutionPdf, "Pre-interview task solution")}</li>
              <li>{link(SITE.issueUrl, "Issue #73 — LFDT Mentorship")}</li>
            </ul>
          </div>

          {/* Column 3 — References */}
          <div>
            <div className="text-[0.7rem] font-semibold tracking-[0.18em] text-hiero-navy uppercase">
              References
            </div>
            <ul className="mt-3 space-y-2.5">
              <li>{link("https://arc42.org/", "arc42 architecture framework")}</li>
              <li>{link("https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions", "GitHub Actions security guide")}</li>
              <li>{link("https://docs.stepsecurity.io/harden-runner", "StepSecurity Harden-Runner")}</li>
              <li>{link("https://github.com/darshit2308/hiero-workflow-probot", "Prototype: hiero-workflow-probot")}</li>
              <li>{link("https://github.com/darshit2308/heiro-probot-official", "Prototype: heiro-probot-official")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-border">
        <p className="mx-auto flex max-w-[1080px] items-center justify-center gap-1.5 px-6 py-4 text-center text-[0.78rem] text-text-muted md:px-12">
          Built with <Heart size={12} className="text-red-400" /> for the LFDT Mentorship Programme
          <span className="mx-2">·</span>
          All diagrams are original
          <span className="mx-2">·</span>
          May 2026
        </p>
      </div>
    </footer>
  );
}

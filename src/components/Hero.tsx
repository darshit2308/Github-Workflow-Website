import { ArrowDown, ExternalLink, FileText } from "lucide-react";
import { SITE, HERO_STATS } from "@/data/siteData";

export function Hero() {
  return (
    <section
      id="top"
      className="hero-gradient relative flex min-h-[92vh] items-center justify-center overflow-hidden px-6 pb-24 pt-20 md:px-12"
    >
      {/* Dot overlay */}
      <div className="hero-dots absolute inset-0 opacity-30" aria-hidden />

      {/* Decorative orbs */}
      <div
        className="float absolute top-20 left-[10%] h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "rgba(37, 99, 235, 0.15)" }}
        aria-hidden
      />
      <div
        className="float absolute bottom-20 right-[10%] h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "rgba(124, 58, 237, 0.12)", animationDelay: "2s" }}
        aria-hidden
      />
      <div
        className="float absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "rgba(6, 182, 212, 0.1)", animationDelay: "4s" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center text-center">
        {/* Badge */}
        <span
          className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-surface-border bg-white/80 px-4 py-1.5 text-[0.8rem] font-medium text-hiero-navy shadow-card backdrop-blur-sm"
          style={{ animationDelay: "0ms" }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Applying for LFDT Mentorship 2026
        </span>

        {/* Name */}
        <h1
          className="anim-fade-up mt-8 font-serif text-[2.5rem] leading-[1.05] text-hiero-navy sm:text-[3.2rem] lg:text-[4rem]"
          style={{ animationDelay: "80ms" }}
        >
          <span className="gradient-text">Darshit Khandelwal</span>
        </h1>

        {/* Project title */}
        <p
          className="anim-fade-up mt-4 font-serif text-[1.15rem] text-text-secondary italic sm:text-[1.35rem]"
          style={{ animationDelay: "140ms" }}
        >
          Hiero: GitHub Workflow App · Issue #73
        </p>

        {/* Tagline */}
        <p
          className="anim-fade-up mt-6 max-w-[600px] text-[1rem] leading-relaxed font-light text-text-secondary sm:text-[1.1rem]"
          style={{ animationDelay: "200ms" }}
        >
          Building a shared automation core for the Hiero ecosystem — centralising
          decision logic while preserving SDK repository autonomy.
        </p>

        {/* Stats row */}
        <div
          className="anim-fade-up mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          style={{ animationDelay: "280ms" }}
        >
          {HERO_STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="text-[1.6rem] font-bold gradient-text leading-none">
                {s.value}
              </div>
              <div className="mt-1.5 text-[0.75rem] font-medium text-text-muted uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="anim-fade-up mt-10 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "360ms" }}
        >
          <a
            href="#thesis"
            className="group inline-flex items-center gap-2 rounded-xl bg-hiero-blue px-6 py-3 text-sm font-semibold text-white shadow-card transition-smooth hover:shadow-elevated hover:scale-[1.02]"
          >
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            Explore My Work
          </a>
          <a
            href={SITE.applicationPdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-white/80 px-6 py-3 text-sm font-semibold text-hiero-navy shadow-card backdrop-blur-sm transition-smooth hover:shadow-card-hover hover:border-hiero-blue/30"
          >
            <FileText size={16} />
            Full Application
          </a>
          <a
            href={SITE.archPlanPdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-white/80 px-6 py-3 text-sm font-semibold text-hiero-navy shadow-card backdrop-blur-sm transition-smooth hover:shadow-card-hover hover:border-hiero-blue/30"
          >
            <ExternalLink size={16} />
            Architecture Plan
          </a>
          <a
            href={SITE.finalPdf}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-hiero-blue/30 bg-blue-50/80 px-6 py-3 text-sm font-semibold text-hiero-blue shadow-card backdrop-blur-sm transition-smooth hover:shadow-card-hover hover:bg-blue-100/80"
          >
            <FileText size={16} />
            Detailed Master Plan
          </a>
        </div>

        {/* Mentor info */}
        <p
          className="anim-fade-up mt-6 text-[0.8rem] text-text-muted"
          style={{ animationDelay: "420ms" }}
        >
          Addressed to {SITE.mentor} · LF Decentralized Trust
        </p>

        {/* Scroll indicator */}
        <div className="anim-fade-up mt-12" style={{ animationDelay: "500ms" }}>
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-[0.7rem] tracking-widest uppercase">Scroll to explore</span>
            <ArrowDown size={18} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}

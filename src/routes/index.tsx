import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Thesis } from "@/components/Thesis";
import { ContributionsTimeline } from "@/components/ContributionsTimeline";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { SecuritySection } from "@/components/SecuritySection";
import { PrototypesSection } from "@/components/PrototypesSection";
import { TimelineSection } from "@/components/TimelineSection";
import { QuestionGrid } from "@/components/QuestionGrid";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Darshit Khandelwal — LFDT Mentorship 2026 | Hiero Workflow App" },
      {
        name: "description",
        content:
          "Interactive portfolio for Darshit Khandelwal's LFDT Mentorship 2026 application — Hiero GitHub Workflow App (Issue #73). Architecture, contributions, prototypes, and pre-interview task answers.",
      },
      {
        property: "og:title",
        content: "Darshit Khandelwal — LFDT Mentorship 2026",
      },
      {
        property: "og:description",
        content:
          "Architecture-first approach to centralising Hiero's automation workflows. 13+ merged PRs, 2 working prototypes, 5-page arc42 plan.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--surface-page)" }}>
      <Navbar />
      <main>
        <Hero />
        <Thesis />
        <ContributionsTimeline />
        <ArchitectureSection />
        <SecuritySection />
        <PrototypesSection />
        <TimelineSection />
        <QuestionGrid />
      </main>
      <Footer />
    </div>
  );
}

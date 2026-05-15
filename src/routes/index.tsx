import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Thesis } from "@/components/Thesis";
import { ContributionsTimeline } from "@/components/ContributionsTimeline";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { AssignSection } from "@/components/AssignSection";
import { SecuritySection } from "@/components/SecuritySection";
import { PrototypesSection } from "@/components/PrototypesSection";
import { TimelineSection } from "@/components/TimelineSection";
import { QuestionGrid } from "@/components/QuestionGrid";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
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
        <AssignSection />
        <SecuritySection />
        <PrototypesSection />
        <TimelineSection />
        <QuestionGrid />
      </main>
      <Footer />
    </div>
  );
}

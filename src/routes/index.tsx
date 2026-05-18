import { useState, useEffect } from "react";
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
import { WelcomeVideoModal } from "@/components/WelcomeVideoModal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false);

  useEffect(() => {
    // Show modal shortly after page load
    const timer = setTimeout(() => setShowWelcomeVideo(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
      <WelcomeVideoModal 
        open={showWelcomeVideo} 
        onClose={() => setShowWelcomeVideo(false)} 
      />
    </div>
  );
}

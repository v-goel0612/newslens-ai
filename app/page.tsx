import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";
import { WorkflowSteps } from "@/components/WorkflowSteps";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center bg-background text-foreground">
      <Hero />
      <FeatureCards />
      <WorkflowSteps />
    </main>
  );
}
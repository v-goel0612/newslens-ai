import { Hero } from "@/components/Hero";
import { FeatureCards } from "@/components/FeatureCards";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center bg-background text-foreground">
      <Hero />
      <FeatureCards />
    </main>
  );
}
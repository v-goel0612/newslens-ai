import { CheckCircle2, AlertTriangle } from "lucide-react";
import type { CredibilityIndicators } from "@/types/analysis";

interface CredibilitySectionProps {
  credibility: CredibilityIndicators;
}

interface IndicatorConfig {
  label: string;
  value: boolean;
  goodWhenTrue: boolean;
}

export function CredibilitySection({ credibility }: CredibilitySectionProps) {
  const indicators: IndicatorConfig[] = [
    { label: "Named Sources", value: credibility.namedSources, goodWhenTrue: true },
    { label: "Anonymous Sources", value: credibility.anonymousSources, goodWhenTrue: false },
    { label: "Statistics Present", value: credibility.statisticsPresent, goodWhenTrue: true },
    { label: "Citations Present", value: credibility.citationsPresent, goodWhenTrue: true },
  ];

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Credibility Indicators</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {indicators.map((indicator) => {
          // "Good" means: either a positive trait is present, or a negative trait is absent
          const isGood = indicator.goodWhenTrue ? indicator.value : !indicator.value;

          return (
            <div
              key={indicator.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-4"
            >
              {isGood ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              ) : (
                <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
              )}
              <span className="text-sm text-zinc-300">{indicator.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
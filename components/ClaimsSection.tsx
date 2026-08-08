import { Quote } from "lucide-react";
import type { Claim } from "@/types/analysis";

interface ClaimsSectionProps {
  claims: Claim[];
}

export function ClaimsSection({ claims }: ClaimsSectionProps) {
  if (claims.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Key Claims</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Factual assertions made in the article, worth verifying independently.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {claims.map((claim, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4"
          >
            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
            <span className="text-sm text-zinc-300">{claim.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
import { CheckCircle2 } from "lucide-react";

interface SummarySectionProps {
  summary: string[];
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Summary</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {summary.map((point, index) => (
          <li key={index} className="flex items-start gap-3 text-zinc-300">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
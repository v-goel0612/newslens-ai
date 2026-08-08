import { HelpCircle } from "lucide-react";

interface QuestionsSectionProps {
  questions: string[];
}

export function QuestionsSection({ questions }: QuestionsSectionProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Questions to Ask</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Critical questions worth considering as you read this article.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {questions.map((question, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4"
          >
            <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm text-zinc-300">{question}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
interface KeywordsSectionProps {
  keywords: string[];
}

export function KeywordsSection({ keywords }: KeywordsSectionProps) {
  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Related Topics</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm text-secondary"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
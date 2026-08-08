interface EmotionalWordsSectionProps {
  words: string[];
}

export function EmotionalWordsSection({ words }: EmotionalWordsSectionProps) {
  if (words.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Emotional Language</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Words that carry strong emotional weight, which can signal bias or persuasion.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {words.map((word, index) => (
          <span
            key={index}
            className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-sm text-warning"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
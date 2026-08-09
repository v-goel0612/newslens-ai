import type { TimelineEvent } from "@/types/analysis";

interface TimelineSectionProps {
  timeline: TimelineEvent[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  if (timeline.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Article Timeline</h2>
      <div className="mt-6 flex flex-col">
        {timeline.map((event, index) => (
          <div key={index} className="flex gap-4">
            {/* The dot + connecting line column */}
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 shrink-0 rounded-full bg-primary" />
              {index < timeline.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>

            {/* The event content */}
            <div className={index < timeline.length - 1 ? "pb-6" : ""}>
              <p className="text-sm font-medium text-primary">{event.date}</p>
              <p className="mt-1 text-sm text-zinc-300">{event.event}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import Link from "next/link";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center px-6 py-24 text-center sm:py-32">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
        Understand the News Beyond the Headlines.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-zinc-400">
        AI-powered analysis that summarizes articles, highlights bias,
        extracts claims, and encourages critical thinking.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/analyze"
          className="rounded-full bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Analyze Article
        </Link>
        <Link
          href="/analyze?demo=true"
          className="rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-card"
        >
          View Demo
        </Link>
      </div>
    </section>
  );
}
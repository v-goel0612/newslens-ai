"use client";

import { SummarySection } from "@/components/SummarySection";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { EmotionalWordsSection } from "@/components/EmotionalWordsSection";
import { ClaimsSection } from "@/components/ClaimsSection";

export default function AnalyzePage() {
  const [articleText, setArticleText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyze() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data as AnalysisResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  if (result) {
    return (
      <main className="flex flex-1 flex-col items-center gap-6 bg-background px-6 py-16 text-foreground">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl font-semibold">Analysis Complete</h1>
          <div className="mt-8 flex flex-col gap-6">
            <SummarySection summary={result.summary} />
            <EmotionalWordsSection words={result.emotionalWords} />
            <ClaimsSection claims={result.claims} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center bg-background px-6 py-16 text-foreground">
      <h1 className="text-3xl font-semibold">Analyze an Article</h1>
      <p className="mt-2 text-zinc-400">Paste the full article text below.</p>

      <textarea
        value={articleText}
        onChange={(e) => setArticleText(e.target.value)}
        placeholder="Paste your article here..."
        className="mt-8 h-64 w-full max-w-2xl rounded-2xl border border-border bg-card p-4 text-foreground placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {error && (
        <p className="mt-4 max-w-2xl text-sm text-danger">{error}</p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={isLoading || articleText.trim().length < 50}
        className="mt-6 flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze Article"
        )}
      </button>
    </main>
  );
}
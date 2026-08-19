"use client";

import { SummarySection } from "@/components/SummarySection";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { EmotionalWordsSection } from "@/components/EmotionalWordsSection";
import { ClaimsSection } from "@/components/ClaimsSection";
import { QuestionsSection } from "@/components/QuestionsSection";
import { CredibilitySection } from "@/components/CredibilitySection";
import { ToneMeter } from "@/components/ToneMeter";
import { KeywordsSection } from "@/components/KeywordsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { ChatSection } from "@/components/ChatSection";
import { ExportButton } from "@/components/ExportButton";

const DEMO_ARTICLE = `The SHIELD Bill defines a child as anyone below 18 and seeks to impose a dedicated set of safety obligations on social media services, online gaming platforms and other digital intermediaries. It proposes to prohibit platforms from tracking, profiling, or using personalised advertising for children.

Platforms would also have to take steps to prevent children from being exposed to pornography, gambling and simulated betting, violent or extremist material and drug-related content. Platforms violating the proposed law could face penalties of up to ₹10 crore. Repeated or wilful violations could result in temporary suspension or blocking of services under Section 69A of the Information Technology Act.`;

function AnalyzePageContent() {
  const [articleText, setArticleText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      setArticleText(DEMO_ARTICLE);
    }
  }, [searchParams]);

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
      <main className="flex flex-1 flex-col items-center bg-background px-6 py-16 text-foreground">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Analysis Complete</h1>
            <ExportButton result={result} />
          </div>
          <div className="mt-8 flex flex-col gap-6">
            <SummarySection summary={result.summary} />
            <ToneMeter score={result.toneScore} explanation={result.toneExplanation} />
            <EmotionalWordsSection words={result.emotionalWords} />
            <ClaimsSection claims={result.claims} />
            <QuestionsSection questions={result.questions} />
            <CredibilitySection credibility={result.credibility} />
            <KeywordsSection keywords={result.keywords} />
            <TimelineSection timeline={result.timeline} />
            <ChatSection chatContext={articleText} />
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

export default function AnalyzePage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center bg-background text-foreground">
          Loading...
        </div>
      }
    >
      <AnalyzePageContent />
    </Suspense>
  );
}
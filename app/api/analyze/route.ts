// app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { analyzeArticle } from "@/lib/gemini";

/**
 * POST /api/analyze
 * Body: { articleText: string }
 * Returns: AnalysisResult (see types/analysis.ts) or an error message.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const articleText: string | undefined = body?.articleText;

    // Basic input validation before we waste an API call
    if (!articleText || typeof articleText !== "string" || articleText.trim().length < 50) {
      return NextResponse.json(
        { error: "Please provide article text of at least 50 characters." },
        { status: 400 }
      );
    }

    const result = await analyzeArticle(articleText);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error in /api/analyze:", error);

    const message = error instanceof Error ? error.message : "Unknown error occurred.";

    return NextResponse.json(
      { error: `Failed to analyze article: ${message}` },
      { status: 500 }
    );
  }
}

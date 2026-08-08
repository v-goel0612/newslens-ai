// lib/gemini.ts
import type { AnalysisResult } from "@/types/analysis";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

/**
 * Builds the instruction we send to Gemini, telling it exactly
 * what article to analyze and what JSON shape to return.
 */
function buildPrompt(articleText: string): string {
  return `You are a media literacy expert AI. Analyze the following news article and return ONLY a valid JSON object (no markdown formatting, no code fences, no extra text before or after) matching this exact structure:

{
  "summary": ["five", "concise", "bullet", "points", "here"],
  "toneScore": 0-100 number where 0 is completely neutral and 100 is extremely emotionally charged,
  "toneExplanation": "one or two sentences explaining why the tone score is what it is",
  "emotionalWords": ["emotionally", "loaded", "words", "found", "in", "the", "text"],
  "claims": [{"text": "a key factual claim made in the article"}],
  "questions": ["a plain string question, e.g. 'What evidence supports this claim?'", "another plain string question", "a third plain string question"],
  "credibility": {
    "namedSources": true or false,
    "anonymousSources": true or false,
    "statisticsPresent": true or false,
    "citationsPresent": true or false
  },
  "timeline": [{"date": "a date or time reference mentioned", "event": "what happened"}],
  "keywords": ["related", "topic", "keywords"],
  "chatContext": "a brief summary of the article to give context for follow-up questions"
}

Article to analyze:
"""
${articleText}
"""`;
}

/**
 * Calls the Gemini API with the article text and returns a parsed,
 * type-safe AnalysisResult. Throws an error if the call fails or
 * the response can't be parsed into valid JSON.
 */
export async function analyzeArticle(articleText: string): Promise<AnalysisResult> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set. Check your .env.local file.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: buildPrompt(articleText) }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();

  // Gemini's response nests the actual text deep inside this structure.
  const rawText: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini returned an empty or unexpected response.");
  }

  return parseAnalysisResponse(rawText);
}

/**
 * Gemini sometimes wraps JSON in markdown code fences (```json ... ```)
 * even when told not to. This strips that and safely parses the result.
 */
function parseAnalysisResponse(rawText: string): AnalysisResult {
  const cleaned = rawText
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "");

  try {
    return JSON.parse(cleaned) as AnalysisResult;
  } catch {
    throw new Error("Failed to parse Gemini's response as valid JSON.");
  }
}
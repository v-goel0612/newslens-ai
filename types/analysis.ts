// types/analysis.ts

/**
 * A single factual claim extracted from the article.
 */
export interface Claim {
  text: string;
}

/**
 * A single event in the article's timeline.
 */
export interface TimelineEvent {
  date: string;
  event: string;
}

/**
 * Credibility checklist — booleans the AI determines from the article.
 */
export interface CredibilityIndicators {
  namedSources: boolean;
  anonymousSources: boolean;
  statisticsPresent: boolean;
  citationsPresent: boolean;
}

/**
 * The full structured result returned by the AI after analyzing an article.
 * This matches the JSON shape defined in the project spec.
 */
export interface AnalysisResult {
  summary: string[];              // 5 bullet points
  toneScore: number;              // 0-100, used to drive the circular tone meter
  toneExplanation: string;        // why the tone score is what it is
  emotionalWords: string[];       // emotionally loaded words, shown as chips
  claims: Claim[];                // extracted factual claims
  questions: string[];            // critical-thinking questions to ask
  credibility: CredibilityIndicators;
  timeline: TimelineEvent[];
  keywords: string[];             // related topics
  chatContext: string;            // context passed to the follow-up chat feature
}

/**
 * A single message in the follow-up chat conversation.
 */
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
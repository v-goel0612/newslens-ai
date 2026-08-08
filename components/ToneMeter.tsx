"use client";

import { motion } from "framer-motion";

interface ToneMeterProps {
  score: number; // 0-100
  explanation: string;
}

function getToneLabel(score: number): string {
  if (score < 30) return "Neutral";
  if (score < 60) return "Mostly Neutral";
  return "Emotionally Charged";
}

function getToneColor(score: number): string {
  if (score < 30) return "#22c55e"; // success
  if (score < 60) return "#f59e0b"; // warning
  return "#ef4444"; // danger
}

export function ToneMeter({ score, explanation }: ToneMeterProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getToneColor(score);

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground">Tone Meter</h2>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative h-40 w-40 shrink-0">
          <svg width="160" height="160" viewBox="0 0 120 120" className="-rotate-90">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            {/* Animated progress ring */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-foreground">{score}</span>
            <span className="text-xs text-zinc-400">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="font-medium" style={{ color }}>
            {getToneLabel(score)}
          </p>
          <p className="mt-2 text-sm text-zinc-400">{explanation}</p>
        </div>
      </div>
    </div>
  );
}
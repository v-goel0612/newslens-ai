"use client";

import { motion } from "framer-motion";
import { ClipboardPaste, Sparkles, LayoutDashboard, ArrowRight } from "lucide-react";

const steps = [
  { icon: ClipboardPaste, label: "Paste Article" },
  { icon: Sparkles, label: "AI Analysis" },
  { icon: LayoutDashboard, label: "Interactive Report" },
];

export function WorkflowSteps() {
  return (
    <section className="flex w-full max-w-4xl flex-col items-center px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold text-foreground">How it works</h2>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-8 py-6"
            >
              <step.icon className="h-7 w-7 text-secondary" />
              <span className="font-medium text-foreground">{step.label}</span>
            </motion.div>

            {index < steps.length - 1 && (
              <ArrowRight className="h-5 w-5 rotate-90 text-zinc-600 sm:rotate-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { FileText, Scale, Search } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Summary",
    description: "Get the key points of any article in seconds, without the fluff.",
  },
  {
    icon: Scale,
    title: "Bias Analysis",
    description: "See emotional tone and loaded language highlighted clearly.",
  },
  {
    icon: Search,
    title: "Claim Extraction",
    description: "Every factual claim pulled out, ready for you to verify.",
  },
];

export function FeatureCards() {
  return (
    <section className="grid w-full max-w-5xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
        >
          <feature.icon className="h-8 w-8 text-primary" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400">{feature.description}</p>
        </motion.div>
      ))}
    </section>
  );
}
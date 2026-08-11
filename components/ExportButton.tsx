"use client";

import { Download } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { formatAnalysisAsMarkdown } from "@/lib/exportMarkdown";

interface ExportButtonProps {
  result: AnalysisResult;
}

export function ExportButton({ result }: ExportButtonProps) {
  function handleExport() {
    const markdown = formatAnalysisAsMarkdown(result);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "newslens-analysis.md";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
    >
      <Download className="h-4 w-4" />
      Export as Markdown
    </button>
  );
}
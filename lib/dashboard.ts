import { runAgentScan } from "@/lib/agent";

export type Metric = { label: string; value: string; delta: string; tone: "good" | "warn" | "bad" };
export type Insight = { title: string; summary: string; action: string; severity: "high" | "medium" | "low" };
export type Marketplace = { name: string; status: string; score: number; note: string };

export function getDashboardState() {
  const report = runAgentScan();
  return {
    metrics: report.metrics,
    marketplaces: report.marketplaces,
    insights: report.insights,
    alertCount: report.insights.filter((item) => item.severity !== "low").length,
    riskSkus: 6,
    autoActions: report.tasks.length + report.insights.length,
    followUps: report.tasks,
    capabilities: [
      { title: "Monitor", description: "Track sales, conversion, reviews, ad trends, and account health in one continuous watchlist." },
      { title: "Diagnose", description: "Compare brands, products, and marketplaces to isolate what changed and why it matters." },
      { title: "Act", description: "Draft follow-ups, create task handoffs, and prioritize issues before a human has to chase them." },
      { title: "Expand", description: "Spot white space, competitor moves, and launch gaps to support onboarding and growth planning." }
    ],
    notes: report.notes,
    freshness: report.freshness,
    adapterModes: report.adapterModes
  };
}

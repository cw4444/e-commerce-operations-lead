import { getConnectorRegistry } from "@/lib/connectors";
import type { Insight, Marketplace, Metric } from "@/lib/dashboard";

export type Task = { title: string; detail: string; owner: string; due: string };

export type ScanReport = {
  metrics: Metric[];
  marketplaces: Marketplace[];
  insights: Insight[];
  tasks: Task[];
  notes: string[];
  freshness: Array<{ source: string; freshness: string }>;
};

function scoreMarketplace(name: string, revenue: number, conversion: number, reviewRating: number) {
  const base = Math.round((revenue / 1000) * 0.08 + conversion * 800 + reviewRating * 8);
  return name.includes("Amazon") ? Math.min(100, base) : Math.min(100, base + 3);
}

export function runAgentScan(): ScanReport {
  const [sales, reviews, competitors, inbox] = getConnectorRegistry();
  const salesSnapshot = sales.read();
  const reviewSnapshot = reviews.read();
  const competitorSnapshot = competitors.read();
  const inboxSnapshot = inbox.read();

  const primarySales = salesSnapshot.records[0] as Record<string, string | number>;
  const secondarySales = salesSnapshot.records[1] as Record<string, string | number>;
  const reviewOne = reviewSnapshot.records[0] as Record<string, string | number>;

  const metrics: Metric[] = [
    { label: "Revenue", value: "£184k", delta: "+12.4%", tone: "good" },
    { label: "Conversion", value: "4.8%", delta: "+0.6pt", tone: "good" },
    { label: "Review score", value: "4.3", delta: "-0.1", tone: "warn" },
    { label: "Buy box wins", value: "71%", delta: "+4pt", tone: "good" }
  ];

  const marketplaces: Marketplace[] = [
    {
      name: "Amazon UK",
      status: "Needs attention",
      score: scoreMarketplace("Amazon UK", Number(primarySales.revenue), Number(primarySales.conversion), Number(reviewOne.rating)),
      note: "A+ content outdated on 6 hero SKUs."
    },
    {
      name: "Amazon EU",
      status: "Healthy",
      score: scoreMarketplace("Amazon EU", Number(secondarySales.revenue), Number(secondarySales.conversion), Number(reviewOne.rating) + 0.1),
      note: "Pricing sits inside target band."
    },
    {
      name: "Marketplaces",
      status: "Watchlist",
      score: 82,
      note: `${competitorSnapshot.records.length} competitor moves detected in the last cycle.`
    }
  ];

  const insights: Insight[] = [
    {
      title: "Two top listings are leaking conversion",
      summary: `Traffic is stable, but mobile conversion dropped on ${String(primarySales.sku)} and ${String(secondarySales.sku)} after image order changes and a missing comparison chart.`,
      action: "Queue a creative audit and draft a revised image set for design approval.",
      severity: "high"
    },
    {
      title: "Review drift is early but real",
      summary: `Recent reviews for ${String(reviewOne.sku)} mention ${String(reviewOne.topic)} more often than last month.`,
      action: "Open a support ticket and notify ops with the SKU list plus example review excerpts.",
      severity: "medium"
    },
    {
      title: "Competitor gap opening in premium bundle",
      summary: "A rival just launched a higher-margin bundle at a price point above your current core offer.",
      action: "Recommend a bundle test and price ladder review for the next commercial meeting.",
      severity: "low"
    }
  ];

  const tasks: Task[] = inboxSnapshot.records.map((item) => {
    const thread = String(item.thread);
    const owner = String(item.owner);
    return {
      title: thread === "listing suppression" ? "Escalate listing suppression" : "Reply to damaged unit claims",
      detail: thread === "listing suppression" ? "Drafted ASIN list and causes for marketplace support." : "Drafted response with customer-ready language.",
      owner,
      due: thread === "listing suppression" ? "Today" : "Tomorrow"
    };
  });

  return {
    metrics,
    marketplaces,
    insights,
    tasks,
    notes: [
      "Auto-drafted action items from connector snapshots.",
      "Escalation paths mapped to the owning team.",
      "Competitor and review signals folded into one watchlist."
    ],
    freshness: [salesSnapshot, reviewSnapshot, competitorSnapshot, inboxSnapshot].map(({ source, freshness }) => ({ source, freshness }))
  };
}

import { asNumber, asString, type ConnectorRecord, type ConnectorSnapshot } from "@/lib/connectors";
import { getMcpFriendlyAdapters } from "@/lib/adapters";
import type { Insight, Marketplace, Metric } from "@/lib/dashboard";

export type Task = { title: string; detail: string; owner: string; due: string };

export type ScanReport = {
  metrics: Metric[];
  marketplaces: Marketplace[];
  insights: Insight[];
  tasks: Task[];
  notes: string[];
  freshness: Array<{ source: string; freshness: string }>;
  adapterModes: Array<{ name: string; mode: string }>;
};

function scoreMarketplace(name: string, revenue: number, conversion: number, reviewRating: number) {
  const base = Math.round((revenue / 1000) * 0.08 + conversion * 800 + reviewRating * 8);
  return name.includes("Amazon") ? Math.min(100, base) : Math.min(100, base + 3);
}

function recordAt(snapshot: ConnectorSnapshot, index: number) {
  return (snapshot.records[index] ?? {}) as ConnectorRecord;
}

export function runAgentScan(): ScanReport {
  const [slack, gmail, notion] = getMcpFriendlyAdapters();
  const slackSnapshot = slack.read();
  const gmailSnapshot = gmail.read();
  const notionSnapshot = notion.read();
  const salesSnapshot: ConnectorSnapshot = {
    source: "amazon-sp-api",
    freshness: "5m ago",
    mode: "mock",
    records: [
      { sku: "HERO-001", revenue: 48200, conversion: 0.046, sessions: 10230 },
      { sku: "HERO-014", revenue: 39120, conversion: 0.039, sessions: 9340 }
    ]
  };
  const reviewsSnapshot: ConnectorSnapshot = {
    source: "reviews-aggregator",
    freshness: "12m ago",
    mode: "mock",
    records: [
      { sku: "HERO-001", rating: 4.2, mentions: 18, topic: "packaging" },
      { sku: "HERO-014", rating: 4.4, mentions: 9, topic: "product quality" }
    ]
  };
  const competitorsSnapshot: ConnectorSnapshot = {
    source: "marketwatch",
    freshness: "1h ago",
    mode: "mock",
    records: [
      { brand: "Competitor A", move: "bundle launch", price_delta: -7, white_space: 1 },
      { brand: "Competitor B", move: "review push", price_delta: 0, white_space: 2 }
    ]
  };

  const inboxSnapshot = slackSnapshot;

  const primarySales = recordAt(salesSnapshot, 0);
  const secondarySales = recordAt(salesSnapshot, 1);
  const reviewOne = recordAt(reviewsSnapshot, 0);

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
      score: scoreMarketplace("Amazon UK", asNumber(primarySales.revenue), asNumber(primarySales.conversion), asNumber(reviewOne.rating)),
      note: "A+ content outdated on 6 hero SKUs."
    },
    {
      name: "Amazon EU",
      status: "Healthy",
      score: scoreMarketplace("Amazon EU", asNumber(secondarySales.revenue), asNumber(secondarySales.conversion), asNumber(reviewOne.rating) + 0.1),
      note: "Pricing sits inside target band."
    },
    {
      name: "Marketplaces",
      status: "Watchlist",
      score: 82,
      note: `${competitorsSnapshot.records.length} competitor moves detected in the last cycle.`
    }
  ];

  const insights: Insight[] = [
    {
      title: "Two top listings are leaking conversion",
      summary: `Traffic is stable, but mobile conversion dropped on ${asString(primarySales.sku)} and ${asString(secondarySales.sku)} after image order changes and a missing comparison chart.`,
      action: "Queue a creative audit and draft a revised image set for design approval.",
      severity: "high"
    },
    {
      title: "Review drift is early but real",
      summary: `Recent reviews for ${asString(reviewOne.sku)} mention ${asString(reviewOne.topic)} more often than last month.`,
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
    const thread = asString(item.thread);
    const owner = asString(item.owner);
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
    freshness: [salesSnapshot, reviewsSnapshot, competitorsSnapshot, inboxSnapshot, gmailSnapshot, notionSnapshot].map(({ source, freshness }) => ({ source, freshness })),
    adapterModes: [slack, gmail, notion].map((adapter) => ({ name: adapter.name, mode: adapter.read().mode }))
  };
}

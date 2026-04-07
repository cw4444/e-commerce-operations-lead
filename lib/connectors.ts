export type ConnectorSnapshot = {
  source: string;
  freshness: string;
  records: Array<Record<string, string | number>>;
};

export interface Connector {
  name: string;
  read(): ConnectorSnapshot;
}

class MockConnector implements Connector {
  constructor(
    public name: string,
    private snapshot: ConnectorSnapshot
  ) {}

  read() {
    return this.snapshot;
  }
}

export function getConnectorRegistry(): Connector[] {
  return [
    new MockConnector("Amazon Sales", {
      source: "amazon-sp-api",
      freshness: "5m ago",
      records: [
        { sku: "HERO-001", revenue: 48200, conversion: 0.046, sessions: 10230 },
        { sku: "HERO-014", revenue: 39120, conversion: 0.039, sessions: 9340 }
      ]
    }),
    new MockConnector("Reviews", {
      source: "reviews-aggregator",
      freshness: "12m ago",
      records: [
        { sku: "HERO-001", rating: 4.2, mentions: 18, topic: "packaging" },
        { sku: "HERO-014", rating: 4.4, mentions: 9, topic: "product quality" }
      ]
    }),
    new MockConnector("Competitors", {
      source: "marketwatch",
      freshness: "1h ago",
      records: [
        { brand: "Competitor A", move: "bundle launch", price_delta: -7, white_space: 1 },
        { brand: "Competitor B", move: "review push", price_delta: 0, white_space: 2 }
      ]
    }),
    new MockConnector("Ops Inbox", {
      source: "slack-email-mcp",
      freshness: "3m ago",
      records: [
        { thread: "damaged units", owner: "CX", status: "waiting" },
        { thread: "listing suppression", owner: "Ops", status: "open" }
      ]
    })
  ];
}

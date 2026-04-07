export type RecordValue = string | number | boolean;
export type ConnectorRecord = Record<string, RecordValue>;

export type ConnectorSnapshot = {
  source: string;
  freshness: string;
  mode: "mock" | "mcp";
  records: ConnectorRecord[];
};

export interface Connector {
  key: string;
  name: string;
  read(): ConnectorSnapshot;
}

export function formatFreshness(minutesAgo: number) {
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hours = Math.round(minutesAgo / 60);
  return `${hours}h ago`;
}

export function asNumber(value: RecordValue | undefined, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}

export function asString(value: RecordValue | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

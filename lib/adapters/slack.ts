import { createAdapter } from "@/lib/adapters/base";
import { formatFreshness } from "@/lib/connectors";

export function createSlackAdapter() {
  return createAdapter({
    key: "slack",
    name: "Slack",
    source: "mcp:slack",
    envVar: "ENABLE_SLACK_MCP",
    fallback: {
      source: "slack-mock",
      freshness: formatFreshness(8),
      mode: "mock",
      records: [
        { channel: "#ops", thread: "listing suppression", owner: "Ops", status: "open" },
        { channel: "#brand", thread: "creative refresh", owner: "Brand", status: "waiting" }
      ]
    }
  });
}

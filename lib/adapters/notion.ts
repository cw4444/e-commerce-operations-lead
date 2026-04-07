import { createAdapter } from "@/lib/adapters/base";
import { formatFreshness } from "@/lib/connectors";

export function createNotionAdapter() {
  return createAdapter({
    key: "notion",
    name: "Notion",
    source: "mcp:notion",
    envVar: "ENABLE_NOTION_MCP",
    fallback: {
      source: "notion-mock",
      freshness: formatFreshness(22),
      mode: "mock",
      records: [
        { page: "Launch notes", type: "workspace", owner: "Brand", status: "synced" },
        { page: "Growth plan", type: "playbook", owner: "Ops", status: "synced" }
      ]
    }
  });
}

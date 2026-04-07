import { createAdapter } from "@/lib/adapters/base";
import { formatFreshness } from "@/lib/connectors";

export function createGmailAdapter() {
  return createAdapter({
    key: "gmail",
    name: "Gmail",
    source: "mcp:gmail",
    envVar: "ENABLE_GMAIL_MCP",
    fallback: {
      source: "gmail-mock",
      freshness: formatFreshness(14),
      mode: "mock",
      records: [
        { thread: "brand onboarding", owner: "Growth", priority: "high", status: "draft reply" },
        { thread: "review escalation", owner: "CX", priority: "medium", status: "needs review" }
      ]
    }
  });
}

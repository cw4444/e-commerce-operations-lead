import type { Connector } from "@/lib/connectors";
import { createGmailAdapter } from "@/lib/adapters/gmail";
import { createNotionAdapter } from "@/lib/adapters/notion";
import { createSlackAdapter } from "@/lib/adapters/slack";

export function getMcpFriendlyAdapters(): Connector[] {
  return [createSlackAdapter(), createGmailAdapter(), createNotionAdapter()];
}

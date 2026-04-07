# Architecture

Signal Forge is intentionally split into three layers:

## 1. Presentation

The App Router UI renders the operational workspace, watchlist, and follow-up queue.

## 2. Agent workflow

`lib/agent.ts` reads snapshots, scores signals, and turns them into tasks and notes.

## 3. Connectors and adapters

`lib/connectors.ts` defines the snapshot shape, and `lib/adapters/*` provides MCP-friendly adapters with mock fallbacks.

## MCP stance

The repository is designed so real Slack, Gmail, and Notion integrations can be swapped in behind the same adapter interfaces later without changing the UI or the scan flow.

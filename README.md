# Signal Forge

An agentic e-commerce operations copilot built to help one person handle far more marketplace work without the usual follow-up drag.

## What it does

- Monitors sales, conversion, reviews, buy box, and account health
- Flags listing issues and recommends optimizations
- Highlights marketplace, pricing, and competitor changes
- Drafts follow-ups for support, brand, marketing, and ops teams
- Surfaces growth ideas, onboarding gaps, and white-space opportunities
- Runs a small agent workflow over connector snapshots so the obvious follow-up work gets turned into tasks automatically

## Run locally

```bash
npm install
npm run dev
```

## Notes

The current build uses a simulated dashboard state so the experience is immediate in an empty repo. The `lib/` layer is intentionally small so real connectors can be added for Amazon, retail media, review tools, Slack, email, or internal APIs without rewriting the UI.

## MCP-friendly adapters

Signal Forge ships with mock adapters for Slack, Gmail, and Notion so the demo runs without any external accounts.

If you do have MCP-enabled access later, you can switch each adapter on with environment flags:

- `ENABLE_SLACK_MCP=true`
- `ENABLE_GMAIL_MCP=true`
- `ENABLE_NOTION_MCP=true`

When a flag is enabled, the corresponding adapter reports `MCP ready` instead of `Local mock`. The app is designed so the UI and agent flow stay the same either way.

## License

MIT

## Attribution

Built by one human with Codex from OpenAI: [https://chatgpt.com/codex](https://chatgpt.com/codex)

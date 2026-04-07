export const metadata = {
  title: "Settings | Signal Forge",
  description: "Configure MCP adapter flags and local demo behavior."
};

const flags = [
  {
    name: "ENABLE_SLACK_MCP",
    label: "Slack adapter",
    description: "Routes Slack-style inbox signals through MCP when enabled. Defaults to the local mock."
  },
  {
    name: "ENABLE_GMAIL_MCP",
    label: "Gmail adapter",
    description: "Treats email threads as MCP-backed follow-up sources instead of sample data."
  },
  {
    name: "ENABLE_NOTION_MCP",
    label: "Notion adapter",
    description: "Reads workspace notes and playbooks through MCP instead of the local fallback."
  }
] as const;

export default function SettingsPage() {
  const states = flags.map((flag) => ({
    ...flag,
    enabled: process.env[flag.name] === "true"
  }));

  return (
    <main className="shell">
      <section className="settings-hero">
        <p className="eyebrow">Settings</p>
        <h1>Mock or MCP, same workflow.</h1>
        <p className="lede">
          This page explains how to switch each adapter from local demo data to MCP-backed access when a real integration is available.
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Adapter flags</h2>
        </div>
        <div className="settings-list">
          {states.map((flag) => (
            <article key={flag.name} className="settings-item">
              <div>
                <p>{flag.label}</p>
                <span>{flag.description}</span>
              </div>
              <div className={`flag-pill ${flag.enabled ? "flag-on" : "flag-off"}`}>
                {flag.enabled ? "Enabled" : "Mock"}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Usage</h2>
        </div>
        <div className="settings-notes">
          <p>Set an environment variable before starting the app, for example: <code>ENABLE_SLACK_MCP=true npm run dev</code>.</p>
          <p>When the flag is on, the app shows the adapter as MCP ready. When it is off, the local mock keeps the demo self-contained.</p>
          <p>The UI and agent flow stay the same either way, which keeps the repo useful for both contributors and live integrations.</p>
        </div>
      </section>
    </main>
  );
}

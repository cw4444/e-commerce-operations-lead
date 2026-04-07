import { getDashboardState } from "@/lib/dashboard";
import { MetricRail } from "@/components/metric-rail";
import { InsightFeed } from "@/components/insight-feed";
import { MarketplaceMap } from "@/components/marketplace-map";
import { Section } from "@/components/section";

export default function Page() {
  const state = getDashboardState();

  return (
    <main className="shell">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Signal Forge</p>
          <h1>One operator, ten times the coverage.</h1>
          <p className="lede">
            A brand ops copilot that watches performance, spots problems, drafts follow-ups, and turns routine marketplace work into an inbox of clear next actions.
          </p>
          <div className="hero-actions">
            <span className="button-primary">Auto-triage enabled</span>
            <span className="button-secondary">Last sync: live simulation</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="panel-stack">
            <div>
              <span>Today’s watchlist</span>
              <strong>{state.alertCount} issues</strong>
            </div>
            <div>
              <span>At-risk SKUs</span>
              <strong>{state.riskSkus}</strong>
            </div>
            <div>
              <span>Auto-actions drafted</span>
              <strong>{state.autoActions}</strong>
            </div>
          </div>
        </div>
      </header>

      <Section title="Performance">
        <MetricRail metrics={state.metrics} />
      </Section>

      <Section title="What the agent found">
        <InsightFeed insights={state.insights} />
      </Section>

      <div className="grid-two">
        <Section title="Marketplace health">
          <MarketplaceMap markets={state.marketplaces} />
        </Section>
        <Section title="Auto-follow-ups">
          <div className="todo-list">
            {state.followUps.map((item) => (
              <article key={item.title} className="todo-item">
                <div>
                  <p>{item.title}</p>
                  <span>{item.detail}</span>
                </div>
                <strong>{item.owner}</strong>
              </article>
            ))}
          </div>
        </Section>
      </div>

      <Section title="Operating model">
        <div className="capabilities">
          {state.capabilities.map((cap) => (
            <article key={cap.title} className="capability">
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <div className="grid-two">
        <Section title="Freshness">
          <div className="freshness-list">
            {state.freshness.map((item) => (
              <div key={item.source} className="freshness-row">
                <span>{item.source}</span>
                <strong>{item.freshness}</strong>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Autonomy notes">
          <div className="notes">
            {state.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

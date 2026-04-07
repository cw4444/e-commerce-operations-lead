import type { Insight } from "@/lib/dashboard";

export function InsightFeed({ insights }: { insights: Insight[] }) {
  return (
    <div className="insight-feed">
      {insights.map((insight) => (
        <article key={insight.title} className={`insight insight-${insight.severity}`}>
          <div>
            <p>{insight.title}</p>
            <span>{insight.summary}</span>
          </div>
          <strong>{insight.action}</strong>
        </article>
      ))}
    </div>
  );
}

import type { Metric } from "@/lib/dashboard";

export function MetricRail({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-rail">
      {metrics.map((metric) => (
        <article key={metric.label} className={`metric metric-${metric.tone}`}>
          <span>{metric.label}</span>
          <strong>{metric.value}</strong>
          <em>{metric.delta}</em>
        </article>
      ))}
    </div>
  );
}

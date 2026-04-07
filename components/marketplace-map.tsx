import type { Marketplace } from "@/lib/dashboard";

export function MarketplaceMap({ markets }: { markets: Marketplace[] }) {
  return (
    <div className="market-list">
      {markets.map((market) => (
        <article key={market.name} className="market-row">
          <div>
            <p>{market.name}</p>
            <span>{market.note}</span>
          </div>
          <div className="market-score">
            <strong>{market.score}</strong>
            <em>{market.status}</em>
          </div>
        </article>
      ))}
    </div>
  );
}

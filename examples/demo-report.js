const snapshot = require("./brand-snapshot.json");

const totalRevenue = snapshot.marketplaces.reduce((sum, marketplace) => sum + marketplace.revenue, 0);
const averageConversion =
  snapshot.marketplaces.reduce((sum, marketplace) => sum + marketplace.conversion, 0) / snapshot.marketplaces.length;

console.log(`Brand: ${snapshot.brand}`);
console.log(`Revenue: £${totalRevenue.toLocaleString("en-GB")}`);
console.log(`Average conversion: ${(averageConversion * 100).toFixed(1)}%`);
console.log("");
console.log("Top follow-ups:");

for (const item of snapshot.followUps) {
  console.log(`- ${item.team}: ${item.task}`);
}

console.log("");
console.log("Competitor watch:");
for (const item of snapshot.competitors) {
  console.log(`- ${item.name}: ${item.move} (${item.priceDelta >= 0 ? "+" : ""}${item.priceDelta})`);
}

export function compareLists(website: string[], feed: string[]) {
  const normalize = (s: string) =>
    s.replace(/\s+/g, " ").replace(/[^\w\s]/g, "").trim().toLowerCase();

  const w = new Set(website.map(normalize));
  const x = new Set(feed.map(normalize));

  const matches = [...x].filter((i) => w.has(i));
  const missingOnWebsite = [...x].filter((i) => !w.has(i));
  const extraOnWebsite = [...w].filter((i) => !x.has(i));

  console.log("=== Comparison Summary ===");
  console.log("Matches:", matches.length);
  console.log("Missing on website:", missingOnWebsite.length);
  console.log("Extra on website:", extraOnWebsite.length);

  return { matches, missingOnWebsite, extraOnWebsite };
}

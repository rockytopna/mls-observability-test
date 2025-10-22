import { parseFeed } from "./xmlParser";
import { fetchMatchPlayers } from "./webScraper";
import { compareLists } from "./compare";

(async () => {
  const url =
    "https://www.mlssoccer.com/competitions/mls-regular-season/2025/matches/nshvsmia-10-18-2025/";
  const feed = "./data/feeds.rtf";

  console.log("Step 1: Scraping website...");
  const websitePlayers = await fetchMatchPlayers(url);

  console.log("Step 2: Parsing XML feed...");
  const feedPlayers = await parseFeed(feed);

  console.log("Step 3: Comparing results...");
  compareLists(websitePlayers, feedPlayers);
})();

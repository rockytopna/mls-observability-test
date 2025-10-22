import puppeteer from "puppeteer";

export async function fetchMatchPlayers(url: string): Promise<string[]> {
  const browser = await puppeteer.launch({ headless: true }); // headless mode
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // Wait for goal scorer section
  await page.waitForSelector(".mls-o-match-summary__goal-scorer", { timeout: 15000 });

  const players = await page.$$eval(".mls-o-match-summary__goal-scorer", (els) =>
    els.map((el) => el.textContent?.trim()).filter(Boolean)
  );

  await browser.close();
  console.log("Players fetched from website:", players);
  return players as string[];
}

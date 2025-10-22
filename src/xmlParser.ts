import fs from "fs";
import { parseStringPromise } from "xml2js";

// Extract <PutDataRequest>...</PutDataRequest> from RTF
export function extractXmlFromRtf(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/<PutDataRequest[\s\S]*?<\/PutDataRequest>/);
  if (!match) throw new Error("No <PutDataRequest> block found in RTF file.");

  fs.writeFileSync("data/feeds_parsed.xml", match[0]);
  console.log("Extracted XML saved as data/feeds_parsed.xml");
  return match[0];
}

// Parse XML feed and return player IDs or names
export async function parseXmlFeed(xmlText: string): Promise<string[]> {
  const result = await parseStringPromise(xmlText);
  const events = result?.PutDataRequest?.Event || [];
  const players: string[] = [];

  for (const event of events) {
    for (const [, value] of Object.entries(event)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          const data = item?.["$"];
          if (!data) continue;

          for (const key of ["Player", "Winner", "Loser", "AffectedPlayer"]) {
            if (data[key] && !players.includes(data[key])) players.push(data[key]);
          }
        }
      }
    }
  }

  console.log("Parsed players from XML:", players);
  return players;
}

// Simple wrapper (so index.ts can call one function)
export async function parseFeed(filePath: string): Promise<string[]> {
  const xml = filePath.endsWith(".rtf")
    ? extractXmlFromRtf(filePath)
    : fs.readFileSync(filePath, "utf8");
  return parseXmlFeed(xml);
}

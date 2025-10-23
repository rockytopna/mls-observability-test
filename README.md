MSL Observability Challenge 
Project Overview 

This project provides a TypeScript based soluction for validating data consistency between an MLS (Major League Soccer) XML feed and the webiste data match.

The script:
1. Extracts <PutDataRequest> XML data from the provided "feeds.rtf file.
2. Parser the XML feed to retrieve player and event information
3. Fetches match data from offical MLS website 
4. compare both sources to identify matches , missing items or extra entries. 

Challenge Requirements

1. Fetch match data from the official MLS match page:
https://www.mlssoccer.com/competitions/mls-regular-season/2025/matches/nshvsmia-10-18-2025/
2. Parse the provided XML feed (feeds.rtf) and extract the <PutDataRequest> block.
3. Validate that the match event and players from the website align with the item found in XML feeds.
4. Use a GitHub repository to share code and include screenshots of execution.


How to Run 
npm install

Run the program:
npx ts-node src/index.ts

How it works:

* WebScraper.ts : Uses Puppeteer to fetch players from the MSL website. 
* xmlParser.ts : Extract and parses XML from "feeds.rtf" to retreive player data
* compare.ts : Normalizes text  and comares both lists
* index.ts : Orchestrates all steps and logs clear output to the console. 



Added Execution ScreenShot
![ScreenShot](./asserts/Execution_Screenshot.png)
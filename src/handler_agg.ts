import { fetchFeed } from "./lib/rss";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    // if (args.length === 0) {
    //     console.error("agg requires an argument");
    //     process.exit(1);
    // }
    const response = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(JSON.stringify(response));
}
import { getAllFeeds, getUserNameFromFeed } from "./lib/db/queries/feeds";

export async function handlerFeeds(cmdName: string, ...args: string[]): Promise<void> {
    const feeds = await getAllFeeds();
    for (const feed of feeds) {
        console.log(`* ${feed.name}`);
        console.log(`${await getUserNameFromFeed(feed)}`);
    }
}
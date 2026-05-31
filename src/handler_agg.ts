import { parse } from "node:path";
import { getFeedFromURL } from "./lib/db/queries/feedFollows";
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds";
import { fetchFeed } from "./lib/rss";
import { NewPost } from "./lib/db/schema";
import { createPost } from "./lib/db/queries/posts";

export async function handlerAgg(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error(`The agg command requires an argument.`);
        process.exit(1);
    }
    const time_between_reqs = args[0];
    const timeBetweenReqs = parseDuration(time_between_reqs);
    console.log(`Collecting feeds every ${timeBetweenReqs}ms`);

    scrapeFeeds().catch(() => {
        console.error("Feed url may be wrong");
        process.exit(1);
    })

    const interval = setInterval(() => {
        scrapeFeeds().catch(() => {
            console.error("Feed url may be wrong");
            process.exit(1);
        });
        }, timeBetweenReqs);

    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
        clearInterval(interval);
        resolve();
    });
});
}

export async function scrapeFeeds() {
    const feedToUpdate = await getNextFeedToFetch();
    const response = await fetchFeed(feedToUpdate.url)
    await markFeedFetched(feedToUpdate.id);

    for (const item of response.channel.item) {
        const newPost: NewPost = {
            title: item.title,
            url: item.link,
            description: item.description,
            publishedAt: new Date(item.pubDate),
            feedId: feedToUpdate.id
        }
        try {
        await createPost(newPost);
        } catch(e: any) {
            
        }
    }
}

function parseDuration(durationStr: string): number {
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);
    if (!match) {
        console.error(`Invalid input, please provide a number an a time in ms/s/m/h`);
        process.exit(1);
    }
    switch (match[2]) {
        case "ms":
            return parseInt(match[1]);
        case "s":
            return parseInt(match[1]) * 1000;
        case "m":
            return parseInt(match[1]) * 1000 * 60;
        case "h":
            return parseInt(match[1]) * 1000 * 60 * 60;
        default:
            console.error("Invalid input");
            process.exit(1);
    }
}

import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
    channel: {
        title: string;
        link: string;
        description: string;
        item: RSSItem[];
    }
}

export type RSSItem = {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
    const response = await fetch(feedURL, {
        method: "GET",
        headers: {
            "User-Agent": "gator",
        }
    });

    if (!response.ok) {
        console.error(`ERROR fetching data. Error code: ${response.status}`);
        process.exit(1);
    }

    const responseBody = await response.text();
    const parser = new XMLParser({processEntities:false});
    
    const feed = parser.parse(responseBody);
    const channel = feed.rss.channel;
    if (!channel) {
        console.error("The channel feed does not exist");
        process.exit(1);
    }

    const title = channel.title;
    const link = channel.link;
    const description = channel.description;
    if (!title || !link || !description) {
        console.error(`ERROR: title/link/description is missing`);
        process.exit(1);
    }

    let items: RSSItem[]; 
    if (Array.isArray(channel.item)) {
        items = channel.item
    } else if (channel.item) {
        items = [channel.item];
    } else {
        items = [];
    }

    const validItems: RSSItem[] = [];

    for (const item of items) {
        if (!item.title || !item.link || !item.description || !item.pubDate) {
            continue;
        }
        validItems.push(item);
    }

    const rssFeed: RSSFeed = {
        channel: {
            title: title,
            link: link,
            description: description,
            item: validItems
        }
    };
    return rssFeed;
}
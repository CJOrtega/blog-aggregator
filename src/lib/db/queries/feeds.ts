import { Feed } from "src/handler_addfeed";
import { db } from "..";
import { feeds, users } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function createFeed(name: string, url: string, userId: string) {
    const [newFeed] = await db.insert(feeds).values({
        name: name,
        url: url,
        userId: userId
    }).returning();

    return newFeed;
}

export async function getAllFeeds() {
    const response = await db.select().from(feeds);
    return response;
}

export async function getUserNameFromFeed(feed: Feed) {
    const [user] = await db.select({
        name: users.name
    }).from(users).where(eq(users.id, feed.userId));
    return user.name;
}

export async function markFeedFetched(feedId: string) {
    const updatedFeed = await db.update(feeds)
        .set({lastFetchedAt: new Date(),
            updatedAt: new Date()
        })
        .where(eq(feeds.id, feedId));
}

export async function getNextFeedToFetch() {
    const [nextFeed] = await db.select()
        .from(feeds)
        .orderBy(sql`${feeds.lastFetchedAt} asc nulls first`);

    return nextFeed;
}
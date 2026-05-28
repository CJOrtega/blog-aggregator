import { Feed } from "src/handler_addfeed";
import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

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
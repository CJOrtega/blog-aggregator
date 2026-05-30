import { Feed, User } from "src/handler_addfeed";
import { feedFollows, feeds, users } from "../schema";
import { db } from "..";
import { eq, and } from "drizzle-orm";


export async function createFeedFollow(user: User, feed: Feed) {
    const [newFeedFollow] = await db.insert(feedFollows).values({
        userId: user.id,
        feedId: feed.id
    }).returning();

    const [feedFollowData] = await db.select({
        id: feedFollows.id,
        createdAt: feedFollows.createdAt,
        updatedAt: feedFollows.updatedAt,
        feedName: feeds.name,
        feedId: feedFollows.feedId,
        userName: users.name,
        userId: feedFollows.userId
    }).from(feedFollows).innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .where(eq(feedFollows.id, newFeedFollow.id));

    return feedFollowData;
}

export async function getFeedFromURL(url: string) {
    const [feed] = await db.select().
        from(feeds).where(eq(feeds.url, url));
    return feed;
}

export async function getFeedFollowsForUser(user: User) {
    const feedsFollowData = await db.select({
        feedFollows: feedFollows,
        userName: users.name,
        feedName: feeds.name
    }).from(feedFollows)
    .innerJoin(users, eq(users.id, feedFollows.userId))
    .innerJoin(feeds, eq(feeds.id, feedFollows.feedId))
    .where(eq(feedFollows.userId, user.id));

    return feedsFollowData;
}

export async function deleteFeedFollow(user: User, url: string) {
    const feed = await getFeedFromURL(url);
    const [deletedFeedFollow] = await db
    .delete(feedFollows)
    .where(and(
        eq(feedFollows.userId, user.id),
        eq(feedFollows.feedId, feed.id)))
    .returning();
    
    return deletedFeedFollow;
}
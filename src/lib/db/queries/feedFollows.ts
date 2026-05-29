import { Feed, User } from "src/handler_addfeed";
import { feedFollows, feeds, users } from "../schema";
import { db } from "..";
import { eq } from "drizzle-orm";


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


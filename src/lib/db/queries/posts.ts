import { db } from "..";
import { feedFollows, feeds, NewPost, posts, users } from "../schema";
import { User } from "src/handler_addfeed";
import { eq, desc } from "drizzle-orm";


export async function createPost(post: NewPost) {
    await db.insert(posts).values({
        title: post.title,
        url: post.url,
        description: post.description,
        publishedAt: post.publishedAt,
        feedId: post.feedId
    });
}

export async function getPostsForUser(user: User, lim: number = 2) {
    const userPosts = await db
        .select()
        .from(posts)
        .innerJoin(feedFollows, eq(feedFollows.feedId, posts.feedId))
        .where(eq(feedFollows.userId, user.id))
        .orderBy(desc(posts.publishedAt))
        .limit(lim);
    return userPosts;
}
import { readConfig } from "./config";
import { createFeed } from "./lib/db/queries/feeds";
import { getUserByName } from "./lib/db/queries/users";
import { type InferSelectModel } from 'drizzle-orm';
import { feeds, users } from "./lib/db/schema";
import { createFeedFollow } from "./lib/db/queries/feedFollows";

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;

export async function handlerAddFeed(cmdName: string, ...args: string[]): Promise<void> {
    const currentUserOnFile = readConfig().currentUserName;

    if (args.length < 2) {
        console.error(`The ${cmdName} command requires 2 arguments, 1. Name, 2. URL`);
        process.exit(1);
    }
    const name = args[0];
    const url = args[1];

    const userFromDB: User = await getUserByName(currentUserOnFile);
    const newFeed: Feed = await createFeed(name, url, userFromDB.id);
    const newFeedFollow = await createFeedFollow(userFromDB, newFeed);
    printFeed(newFeedFollow.feedName, newFeedFollow.userName);
}

function printFeed(feed: string, user: string): void {
    console.log(feed);
    console.log(user);
}
import { readConfig } from "./config";
import { User } from "./handler_addfeed";
import { createFeedFollow, getFeedFromURL } from "./lib/db/queries/feedFollows";
import { getUserByName } from "./lib/db/queries/users";


export async function handlerFollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error(`follow requires a URL`)
        process.exit(1);
    }
    const url = args[0];
    const feed = await getFeedFromURL(url);
    if (!feed) {
        console.error(`Feed with URL ${url} was not found.`)
        process.exit(1);
    }
    const feedFollowData = await createFeedFollow(user, feed);
    if (!feedFollowData) {
        console.error(`FeedFollow couldn't be created`);
        process.exit(1);
    }
    console.log(feedFollowData.feedName);
    console.log(feedFollowData.userName);
}


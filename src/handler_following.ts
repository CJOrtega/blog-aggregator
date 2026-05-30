import { readConfig } from "./config";
import { User } from "./handler_addfeed";
import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";
import { getUserByName } from "./lib/db/queries/users";


export async function handlerFollowing(cmdName: string, user: User, ...args: string[]): Promise<void> {
    const feedFollowsData = await getFeedFollowsForUser(user);
    for (const feedFollow of feedFollowsData) {
        console.log(feedFollow.feedName);
    }
}
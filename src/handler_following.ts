import { readConfig } from "./config";
import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";
import { getUserByName } from "./lib/db/queries/users";


export async function handlerFollowing(cmdName: string, ...args: string[]): Promise<void> {
    const currentUserInFile = readConfig().currentUserName;
    const userFromDB = await getUserByName(currentUserInFile);
    if (!userFromDB) {
        console.error(`Could not find user in the database. Check your config file.`);
        process.exit(1);
    }

    const feedFollowsData = await getFeedFollowsForUser(userFromDB);
    for (const feedFollow of feedFollowsData) {
        console.log(feedFollow.feedName);
    }
}
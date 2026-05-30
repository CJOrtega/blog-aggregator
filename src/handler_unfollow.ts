import { CommandHandler } from "./command_handler";
import { User } from "./handler_addfeed";
import { deleteFeedFollow } from "./lib/db/queries/feedFollows";


export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("the unfollow command requires a url argument");
        process.exit(1);
    }
    const url = args[0];

    const deletedFeedFollow = await deleteFeedFollow(user, url);
    if (!deletedFeedFollow) {
        console.error(`Feed with url "${url}" was not found in the DB`);
        process.exit(1);
    }
}
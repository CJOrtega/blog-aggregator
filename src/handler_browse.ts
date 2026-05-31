import { User } from "./handler_addfeed";
import { getPostsForUser } from "./lib/db/queries/posts";


export async function handlerBrowse(cmdName: string, user: User,...args: string[]): Promise<void> {
    let postLimit = 2;
    if (args.length > 0) {
        postLimit = parseInt(args[0]);
    }
    if (!postLimit) {
        console.error("Argument for command needs to be a numeric value");
        process.exit(1);
    }
    const userPosts = await getPostsForUser(user, postLimit);
    console.log(`Found ${userPosts.length} posts for ${user.name}`);
    for (const post of userPosts) {
        console.log(post);
    }
}
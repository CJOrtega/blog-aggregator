import { setUser } from "./config";
import { getUserByName } from "./lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("login handler expects a single argument, the username.");
        process.exit(1);
    }
    const username = args[0];
    const user = await getUserByName(username);
    if(!user) {
        console.error("User does not exists");
        process.exit(1);
    }
    
    setUser(username);
    console.log(`User ${username} has been set`);
}
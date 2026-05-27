import { readConfig } from "./config";
import { getAllUsersName } from "./lib/db/queries/users";


export async function handlerUsers(cmdName: string, ...args: string[]): Promise<void> {
    const users = await getAllUsersName();
    const loggedInUser = readConfig().currentUserName;
    
    if (users.length === 0) {
        console.error(`There are no users in the database!`)
        process.exit(1);
    }
    for (const user of users) {
        if (user.name === loggedInUser) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
}
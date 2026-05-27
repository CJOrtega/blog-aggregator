import { setUser } from "./config";
import { createUser, getUserByName } from "./lib/db/queries/users";


export async function handlerRegister(cmdName: string, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("A name must be provided to the register command");
        process.exit(1);
    }
    const username = args[0];
    const checkUserExists = await getUserByName(username);
    if (checkUserExists) {
        console.error("The user already exists");
        process.exit(1);
    }
    const user = await createUser(username);
    setUser(username);
    console.log(`User "${username}" has been created`);
    console.log(user);
}
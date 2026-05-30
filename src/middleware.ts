import { CommandHandler } from "./command_handler";
import { readConfig } from "./config";
import { User } from "./handler_addfeed";
import { getUserByName } from "./lib/db/queries/users";


export type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

export type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function loginMiddleware(handler: UserCommandHandler): CommandHandler {
    return async (cmdName: string, ...args: string[]) => {
        const username = readConfig().currentUserName;
        const userFromDB = await getUserByName(username);

        if (!userFromDB) {
            console.error(`User is not in the database`);
            process.exit(1);
        }

        await handler(cmdName, userFromDB, ...args);
    }
}
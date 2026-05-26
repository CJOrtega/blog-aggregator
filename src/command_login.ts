import { setUser } from "./config";

export function handlerLogin(cmdName: string, ...args: string[]): void {
    if (args.length === 0) {
        console.error("login handler expects a single argument, the username.");
        process.exit(1);
    }
    const username = args[0];
    setUser(username);
    console.log(`User ${username} has been set`);
}
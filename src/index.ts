import { handlerLogin } from "./handler_login";
import { CommandsRegistry, registerCommand, runCommand } from "./command_registry";
import { readConfig, setUser } from "./config";
import { handlerRegister } from "./handler_register";
import { handlerReset } from "./handler_reset";
import { handlerUsers } from "./handler_users";
import { handlerAgg } from "./handler_agg";
import { handlerAddFeed } from "./handler_addfeed";
import { handlerFeeds } from "./handler_feeds";
import { handlerFollow } from "./handler_follow";
import { handlerFollowing } from "./handler_following";

async function main() {
    const commands: CommandsRegistry = {};
    registerCommand(commands, "login", handlerLogin);
    registerCommand(commands, "register", handlerRegister);
    registerCommand(commands, "reset", handlerReset);
    registerCommand(commands, "users", handlerUsers);
    registerCommand(commands, "agg", handlerAgg);
    registerCommand(commands, "addfeed", handlerAddFeed);
    registerCommand(commands, "feeds", handlerFeeds);
    registerCommand(commands, "follow", handlerFollow);
    registerCommand(commands, "following", handlerFollowing);
    const cliArguments = process.argv.slice(2);
    if (cliArguments.length === 0) {
        console.error("Not enough arguments were provided.");
        process.exit(1);
    }
    const command = cliArguments[0];
    const cmdArgs = cliArguments.slice(1);
    await runCommand(commands, command , ...cmdArgs);
    process.exit(0);
}

main();
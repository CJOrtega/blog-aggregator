import { handlerLogin } from "./command_login";
import { CommandsRegistry, registerCommand, runCommand } from "./command_registry";
import { readConfig, setUser } from "./config";

function main() {
    const commands: CommandsRegistry = {};
    registerCommand(commands, "login", handlerLogin);
    const cliArguments = process.argv.slice(2);
    if (cliArguments.length === 0) {
        console.error("Not enough arguments were provided.");
        process.exit(1);
    }
    const command = cliArguments[0];
    const cmdArgs = cliArguments.slice(1);
    runCommand(commands, command , ...cmdArgs);
}

main();
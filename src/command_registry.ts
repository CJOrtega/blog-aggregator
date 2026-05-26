import { CommandHandler } from "./command_handler";

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler): void {
    registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): void {
    if (cmdName in registry) {
        const callbackFunction = registry[cmdName];
        callbackFunction(cmdName, ...args);
    }
    return
}
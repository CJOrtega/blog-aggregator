import { CommandHandler } from "./command_handler";

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler): void {
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]): Promise<void> {
    if (cmdName in registry) {
        const callbackFunction = registry[cmdName];
        await callbackFunction(cmdName, ...args);
    }
    return
}
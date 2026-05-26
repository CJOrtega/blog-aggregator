import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string;
}

export function setUser(user: string): void {
    const data = readConfig();
    writeConfig({dbUrl: data.dbUrl, currentUserName: user});
}

export function readConfig(): Config {
    const data = JSON.parse(fs.readFileSync(getConfigFilePath(), 'utf-8'));
    return validateConfig(data);
}

function getConfigFilePath(): string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config): void {
    const data = {db_url: cfg.dbUrl, current_user_name: cfg.currentUserName};
    fs.writeFileSync(getConfigFilePath(), JSON.stringify(data));
}

function validateConfig(rawConfig: any): Config {
    return {dbUrl: rawConfig.db_url, currentUserName: rawConfig.current_user_name};
}
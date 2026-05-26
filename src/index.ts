import { readConfig, setUser } from "./config";

function main() {
    setUser("Cris");
    const data = readConfig();
    console.log(data);
}

main();
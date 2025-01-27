import { getRoomWorldData, getRoomData, getCore } from "./utils/utils";

//debug commands
register("command", (...args) => {
    if (args[0] === "data") {
        ChatLib.chat(JSON.stringify(getRoomData(), undefined, 2));
    } else if (args[0] === "name") {
        ChatLib.chat(JSON.stringify(getRoomData().name, undefined, 2));
    } else if (args[0] === "world") {
        ChatLib.chat(JSON.stringify(getRoomWorldData(), undefined, 2));
    } else if (args[0] === "id") {
        ChatLib.chat(JSON.stringify(getRoomData().id, undefined, 2));
    } else if (args[0] === "core") {
        ChatLib.chat(JSON.stringify(getCore(), undefined, 2));
    } else if (args[0] === "help") {
        ChatLib.chat("&8&m-------------------------------------------------");
        ChatLib.chat("&6/rapi help &7Opens the Rooms API Debug help menu!");
        ChatLib.chat("&6/rapi data &7Displays current rooms full info!");
        ChatLib.chat("&6/rapi name &7Displays current rooms name!");
        ChatLib.chat("&6/rapi world &7Displays current rooms world info!");
        ChatLib.chat("&6/rapi id &7Displays current rooms ID!");
        ChatLib.chat("&6/rapi core &7Displays current rooms core!");
        ChatLib.chat("&8&m-------------------------------------------------");
    } else {
        ChatLib.chat("&cUnknown command. &7Try &6/rapi help &7for a list of commands");
    }
}).setName("rapi");

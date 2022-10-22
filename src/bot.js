require("dotenv").config();
const { token, databaseToken } = process.env;
const { connect } = require("mongoose");
const { Client, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login("MTAyMDU1ODg4OTg1MjM1MDU1NA.G8tYvy.M3G6gdzJ8CaLv2BSL6u9Yd-gRYBuYWafFd3GEk");
(async () => {
  await connect(databaseToken).catch(console.error);
})();

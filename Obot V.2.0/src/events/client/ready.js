const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 10 * 1000);

    console.log(
      chalk.green("[CLIENT - BOT]"),
      `✅ Logged in as ${client.user.tag}! Online!`
    );
  },
};

const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: `over ${client.guilds.cache.size} servers!`,
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: `${client.users.cache.size} users!`,
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: `/help!`,
        status: "online",
      },
      {
        type: ActivityType.Watching,
        text: `you!`,
        status: "online",
      },
    ];

    const option = Math.floor(Math.random() * options.length);

    client.user
      .setPresence({
        activities: [
          {
            name: options[option].text,
            type: options[option].type,
          },
        ],
        status: options[option].status,
      });
  };
};

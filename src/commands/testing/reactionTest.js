const { SlashCommandBuilder, messageLink } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactiontest")
    .setDescription("Returns a reaction."),
  async execute(interaction, client) {
    const message = await interaction.reply({
      content: "React here!",
      fetchReply: true,
    });

    const filter = (reaction, user) => {
      return user.id == interaction.user.id;
    };

    message
      .awaitReactions({ filter, max: 4, time: 10000, errors: ["time"] })
      .then((collected) =>
        console.log(`Under ten seconds, ${collected.size}/4 reacted.`)
      )
      .catch((collected) => {
        console.log(
          `After 10 seconds, only ${collected.size}/4 reacted.`
        );
      });
  },
};

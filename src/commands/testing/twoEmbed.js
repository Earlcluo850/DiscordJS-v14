const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("twoembedexample")
    .setDescription("Sends two embeds at once!"),
  async execute(interaction, client) {
    let embed1 = new EmbedBuilder().setDescription("This is embed 1");
    let embed2 = new EmbedBuilder().setDescription("This is embed 2");

    interaction.reply({
      embeds: [embed1, embed2],
    });
  },
};

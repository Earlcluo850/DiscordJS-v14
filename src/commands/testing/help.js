const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("helppage")
    .setDescription("All commands are here!"),
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle("**Help Commands Page**")
      .setColor(0x9b35de)
      .setFields([
        {
          name: "/help",
          value: "Displays this message that you see right now!",
        },
        {
          name: "/embedtest",
          value: "Shows an example of all the elements of the embed!",
        },
        { name: "/buttontest", value: "Shows a button interaction process!" },
        { name: "/selectmenutest", value: "Shows a select menu!" },
        { name: "/modaltest", value: "Shows a modal example!" },
        { name: "/reactiontest", value: "Shows a reaction message." },
      ])
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: "Requested by " + interaction.user.tag,
      })
      .setTimestamp(Date.now());

    await interaction.reply({
      embeds: [embed],
    });
  },
};

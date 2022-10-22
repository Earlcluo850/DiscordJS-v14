const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("buttontest")
    .setDescription("Return a button!"),
  async execute(interaction, client) {
    let btn1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("test")
        .setLabel("Click me!")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({
      components: [btn1],
    });
  },
};

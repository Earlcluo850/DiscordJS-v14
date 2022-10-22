const {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("modaltest")
    .setDescription("Returns a modal."),
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId("modalTest")
      .setTitle("Favorite Color!");

    const textInput = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("favoriteColor")
        .setLabel("Enter your favorite color!")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    );

    modal.addComponents(textInput);

    await interaction.showModal(modal);
  },
};

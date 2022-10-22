const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Let's Obot V2.0 say what you say!")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Type anything here!")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { options, user } = interaction;
    // SAY VARIABLES
    const sayMessage = options.getString("message");

    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({
      content: `\`${user.tag}\` said: ${sayMessage}`,
    });
  },
};

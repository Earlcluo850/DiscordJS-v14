const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pingtest")
    .setDescription("Returns in ping!"),
  async execute(interaction, client) {
    let message = await interaction.deferReply({
      fetchReply: true,
    });

    let newMessage = `**API Latency:** ${client.ws.ping}ms\n**Client Ping:** ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};

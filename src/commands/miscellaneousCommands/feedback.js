const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feedback")
    .setDescription("Sends a feedback for the developer of this bot!")
    .addStringOption((option) =>
      option
        .setName("feedback")
        .setDescription("Send a feedback message here!")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { options, user } = interaction;
    const { users } = client;
    const developerId = "960025025774231622";
    // FEEDBACK VARIABLES
    const feedbackMessage = options.getString("feedback");
    // MESSAGE
    let feedbackEmbed = new EmbedBuilder()
      .setTitle(`🚨 **Feedback from: ${user.tag}**`)
      .setThumbnail(user.displayAvatarURL())
      .setColor(0x9b35de)
      .setDescription(`${user.username} said: ***${feedbackMessage}***`)
      .setFooter({
        text: `ID: ${user.id}`,
      })
      .setTimestamp(Date.now());
    users.cache.get(developerId).send({ embeds: [feedbackEmbed] });

    await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({
      content: "✅ **Successfully submitted your feedback. Thank you!**",
    });
  },
};

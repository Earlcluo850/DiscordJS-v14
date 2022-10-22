const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Avatar")
    .setType(ApplicationCommandType.User),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { targetUser, user, guild } = interaction;
    const { members } = guild;
    const userFetch = await members.fetch(targetUser.id);
    // MESSAGE
    let getAvatarEmbed = new EmbedBuilder()
      .setAuthor({
        iconURL: user.displayAvatarURL(),
        name: `•  ${userFetch.user.username}'s Avatar:`,
      })
      .setColor(userFetch.displayHexColor)
      .setImage(userFetch.user.displayAvatarURL())
      .setFooter({
        text: `Searched by ${user.username}`,
      })
      .setTimestamp(Date.now());

    await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({
      embeds: [getAvatarEmbed],
    });
  },
};

const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: {
    name: "toMainMenuButton",
  },
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { user } = interaction;
    // MESSAGE
    let mainCommandsPageEmbed = new EmbedBuilder()
      .setTitle("Main Commands Page Menu")
      .setColor(0x9b35de)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(
        "🛡 **Moderation**\n```Administration commands are all in here!```\n 🛠 **Utility**\n```Utility commands are all here!```\n 👤 **User Application**\n```User Application commmands are all in here!```\n 🎉 **Fun**\n```Related games, or other types of fun commands are all here!```\n 🌐 **Miscellaneous**\n```Other types of commands are all here!```"
      )
      .setFooter({
        text: `Requested by ${user.username}`,
        iconURL: user.displayAvatarURL(),
      })
      .setTimestamp(Date.now());

    // COMPONENT
    let mainCommandsPageSelectMenu = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("mainMenuSelectMenu")
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Select a command page!")
        .setOptions(
          new SelectMenuOptionBuilder({
            label: "Moderation",
            emoji: "🛡",
            value: "moderationOption",
          }),
          new SelectMenuOptionBuilder({
            label: "Utility",
            emoji: "🛠",
            value: "utilityOption",
          }),
          new SelectMenuOptionBuilder({
            label: "User Application",
            emoji: "👤",
            value: "userApplicationOption",
          }),
          new SelectMenuOptionBuilder({
            label: "Fun",
            emoji: "🎉",
            value: "funOption",
          }),
          new SelectMenuOptionBuilder({
            label: "Miscellaneous",
            emoji: "🌐",
            value: "miscellaneousOption",
          })
        )
    );

    await interaction.update({
      embeds: [mainCommandsPageEmbed],
      components: [mainCommandsPageSelectMenu],
    });
  },
};

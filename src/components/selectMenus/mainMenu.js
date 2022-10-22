const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: {
    name: "mainMenuSelectMenu",
  },
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { user } = interaction;
    // MESSAGE
    if (interaction.customId === "mainMenuSelectMenu") {
      const toMainMenuButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("toMainMenuButton")
          .setLabel("Main Page")
          .setEmoji("◀")
          .setStyle(ButtonStyle.Success)
      );
      if (interaction.values[0] === "moderationOption") {
        let moderationCommandsEmbed = new EmbedBuilder()
          .setTitle("🛡  **Moderation Commands:**")
          .setColor(0xffa500)
          .setDescription(
            `\`\`\`/user: <subcommand>\n<ban>, <kick>, <timeout>, <unban>, <timeout>\n\n` + 
            
            `/role <subcommand>:\n<add>, <create>, <delete>, <remove>\n\n` +
                        
            `/channel <subcommand>:\n<create>, <delete>\`\`\``
          )
          .setFooter({
            iconURL: user.displayAvatarURL(),
            text: `Requested by ${user.username}`,
          })
          .setTimestamp(Date.now());

        await interaction.update({
          embeds: [moderationCommandsEmbed],
          components: [toMainMenuButton],
        });
      } else if (interaction.values[0] === "utilityOption") {
        let utilityCommandsEmbed = new EmbedBuilder()
          .setTitle("**🛠  Utility Commands:**")
          .setColor(0xff0000)
          .setDescription("```/bot <subcommand>:\n<info>, <invite>```")
          .setFooter({
            iconURL: user.displayAvatarURL(),
            text: `Requested by ${user.username}`,
          })
          .setTimestamp(Date.now());

        await interaction.update({
          embeds: [utilityCommandsEmbed],
          components: [toMainMenuButton],
        });
      } else if (interaction.values[0] === "userApplicationOption") {
        let userApplicationCommandsOption = new EmbedBuilder()
          .setTitle("👤  **User Application Commands:**")
          .setColor(0x808080)
          .setDescription("```Avatar, User Info```")
          .setFooter({
            iconURL: user.displayAvatarURL(),
            text: `Requested by ${user.username}`,
          })
          .setTimestamp(Date.now());

        await interaction.update({
          embeds: [userApplicationCommandsOption],
          components: [toMainMenuButton],
        });
      } else if (interaction.values[0] === "funOption") {
        let funCommandsEmbed = new EmbedBuilder()
          .setTitle("**🎉  Fun Commands:**")
          .setColor(0x23df17)
          .setDescription("```/rolldice```")
          .setFooter({
            iconURL: user.displayAvatarURL(),
            text: `Requested by ${user.username}`,
          })
          .setTimestamp(Date.now());

        await interaction.update({
          embeds: [funCommandsEmbed],
          components: [toMainMenuButton],
        });
      } else if (interaction.values[0] === "miscellaneousOption") {
        let miscellaneousCommandsEmbed = new EmbedBuilder()
          .setTitle("**🌐  Miscellaneous Commands:**")
          .setColor(0x41973b)
          .setDescription("```/say, /feedback```")
          .setFooter({
            iconURL: user.displayAvatarURL(),
            text: `Requested by ${user.username}`,
          })
          .setTimestamp(Date.now());

        await interaction.update({
          embeds: [miscellaneousCommandsEmbed],
          components: [toMainMenuButton],
        });
      }
    }
  },
};

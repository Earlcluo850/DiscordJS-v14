const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const UserInfo = require("../../schemas/userInfo");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Gets the info of a user.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Enter a user.").setRequired(true)
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { user, options, guild, member } = interaction;
    const { members } = guild;
    // USER INFO VARIABLES
    const targetUserInfo = options.getUser("user");
    const userFetch = await members
      .fetch(targetUserInfo.id)
      .catch(console.error);
    const userJoinedServer = Math.trunc(userFetch.joinedTimestamp / 1000);
    const userCreated = Math.trunc(targetUserInfo.createdTimestamp / 1000);
    const userRoles = userFetch.roles.cache
      .filter((r) => r.id !== guild.id)
      .map((r) => r.toString());
    // USER INFO VARIABLES | MONGODB
    const userInfo = new UserInfo({
      _id: userFetch.user.id,
      userId: userFetch.user.id,
      username: userFetch.user.username,
      tag: userFetch.user.tag,
      avatar: userFetch.user.displayAvatarURL(),
      joinedServer: userJoinedServer,
      accountCreation: userCreated,
    });
    // MESSAGE
    let userInfoEmbed = new EmbedBuilder()
      .setAuthor({
        iconURL: userFetch.user.displayAvatarURL(),
        name: `•  ${userFetch.user.username}'s Information:`,
      })
      .setColor(userFetch.displayHexColor)
      .setThumbnail(userFetch.user.displayAvatarURL())
      .setDescription(
        `👤 • **Username:** \`${userInfo.tag}\`\n(ID: ${userInfo.userId})
              
              🕕 • **Account Created:** <t:${userInfo.accountCreation}>

              🌐 • **Joined Server:** <t:${userInfo.joinedServer}>
              
              📜 • **Current Roles (${userFetch.roles.cache.filter(r => r.id !== guild.id).size}):** ***(Highest Role:*** <@&${userFetch.roles.highest.id}>***)***\n ${userRoles}`
      )
      .setFooter({
        text: `Searched by ${user.username}`,
      })
      .setTimestamp(Date.now());

    await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({
      embeds: [userInfoEmbed],
    });
  },
};

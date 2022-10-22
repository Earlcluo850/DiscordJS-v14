const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
} = require("discord.js");
const UserInfo = require("../../schemas/userInfo");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("User Info")
    .setType(ApplicationCommandType.User),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { targetUser, guild, user } = interaction;
    const { members } = guild;
    // USER INFO VARIABLES
    const userFetch = await members.fetch(targetUser.id).catch(console.error);
    const userJoinedServer = Math.trunc(userFetch.joinedTimestamp / 1000);
    const userCreated = Math.trunc(userFetch.user.createdTimestamp / 1000);
    const userRoles = userFetch.roles.cache
      .filter((r) => r.id !== guild.id)
      .map((r) => r.toString());
    // USER INFO VARIABLES | MONGODB
    const userInfo = await new UserInfo({
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
        name: `•  ${userFetch.user.username}'s Profile:`,
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

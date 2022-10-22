const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");
const GuildsInfo = require("../../schemas/serverInfo");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Gets the info of this server."),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { guild, user } = interaction;
    const { memberCount, members, channels, roles, emojis } = guild;
    // SERVER INFO VARIABLES | GUILD INFO
    const guildName = guild.name;
    const guildId = guild.id;
    const guildOwnerId = guild.ownerId;
    const guildCreated = Math.trunc(guild.createdTimestamp / 1000);
    // SERVER INFO VARIABLES | MEMBERS
    const botMembers = members.cache.filter((m) => !m.user.bot).size;
    const noBotMembers = members.cache.filter((m) => m.user.bot).size;
    // SERVER INFO VARIABLES | CHANNELS
    const totalChannelCount = channels.cache.size;
    const categoryChannelCount = channels.cache.filter(
      (c) => c.type === ChannelType.GuildCategory
    ).size;
    const textChannelCount = channels.cache.filter(
      (c) => c.type === ChannelType.GuildText
    ).size;
    const voiceChannelCount = channels.cache.filter(
      (c) => c.type === ChannelType.GuildVoice
    ).size;
    const stageChannelCount = channels.cache.filter(
      (c) => c.type === ChannelType.GuildStageVoice
    ).size;
    // SERVER INFO VARIABLES | ADDITIONAL INFO
    const totalRoleCount = roles.cache.size;
    const customEmojiCount = emojis.cache.size;
    let guildVerificationLevel = guild.verificationLevel;
    if (guildVerificationLevel == 0) guildVerificationLevel = "None ⚫";
    if (guildVerificationLevel == 1) guildVerificationLevel = "Low 🟢";
    if (guildVerificationLevel == 2) guildVerificationLevel = "Medium 🟠";
    if (guildVerificationLevel == 3) guildVerificationLevel = "High 🔴";
    if (guildVerificationLevel == 4) guildVerificationLevel = "Very High ⚠";
    let guildIsNSFW = guild.nsfwLevel;
    if (guildIsNSFW == true) guildIsNSFW = "Yes";
    if (guildIsNSFW == false) guildIsNSFW = "No";
    // SERVER INFO VARIABLES | MONGODB
    const guildInfo = await new GuildsInfo({
      _id: guild.id,
      // GUILD INFO
      guildId: guildId,
      guildName: guildName,
      guildCreation: guildCreated,
      guildOwnerId: guildOwnerId,
      guildIcon: guild.iconURL()
        ? guild.iconURL()
        : "https://i.pinimg.com/originals/70/a6/08/70a60868bcef89d9bc93c7693af1481e.jpg",
      // MEMBERS
      guildMembers: {
        _id: "guildMembersInfo",
        totalMembers: memberCount,
        botMembers: botMembers,
        noBotMembers: noBotMembers,
      },

      // CHANNELS
      guildChannels: {
        _id: "guildChannelsInfo",
        totalChannels: totalChannelCount,
        guildChannelsTypesInfo: {
          _id: "guildChannelsTypesInfo",
          categoryChannels: categoryChannelCount,
          textChannels: textChannelCount,
          voiceChannels: voiceChannelCount,
          stageChannels: stageChannelCount,
        },
      },

      // ADDITIONAL INFO
      guildAdditionalInfo: {
        _id: "guildAdditionalInfo",
        totalRoleCount: totalRoleCount,
        customEmojiCount: customEmojiCount,
        guildVerificationLevel: guildVerificationLevel,
        guildIsNSFW: guildIsNSFW,
      },
    });
    // MESSAGE
    let serverInfoEmbed = new EmbedBuilder()
      .setColor(0x9b35de)
      .setAuthor({ iconURL: guildInfo.guildIcon, name: guildInfo.guildName })
      .setThumbnail(guildInfo.guildIcon)
      .setDescription(
        `˜”*°• **GENERAL** •°*”˜
        
        > 📜 • **Server Name:** ${guildInfo.guildName}\n(ID: ${guildInfo.guildId})
        
        > 👑 • **Server Owner:** <@${guildInfo.guildOwnerId}>\n(ID: ${guildInfo.guildOwnerId})

        > 🕕 • **Server Created:** <t:${guildInfo.guildCreation}>
        
        ˜”*°• **USERS** •°*”˜

        > 👨‍👩‍👦‍👦 • **Total Members:** ${guildInfo.guildMembers.totalMembers}
        
        > 👤 • **Members:** ${guildInfo.guildMembers.noBotMembers}
        
        > 🤖 • **Bots:** ${guildInfo.guildMembers.botMembers}
        
        ˜”*°• **CHANNELS** •°*”˜

        > 🔗 • **Total Channels:** ${guildInfo.guildChannels.totalChannels}

        > 🔠 • **Categories:** ${guildInfo.guildChannels.guildChannelsTypesInfo.categoryChannels}
        
        > 📜 • **Text:** ${guildInfo.guildChannels.guildChannelsTypesInfo.textChannels}
        
        > 🔉 • **Voice:** ${guildInfo.guildChannels.guildChannelsTypesInfo.voiceChannels}
        
        > 🔴 • **Stage:** ${guildInfo.guildChannels.guildChannelsTypesInfo.stageChannels}

        ˜”*°• **ADDITIONAL INFORMATION** •°*”˜
        
        > 📜 • **Roles:** ${guildInfo.guildAdditionalInfo.totalRoleCount}
        
        > 😳 • **Custom Emojis:** ${guildInfo.guildAdditionalInfo.customEmojiCount}
        
        > ✅ • **Verification Level:** ${guildInfo.guildAdditionalInfo.guildVerificationLevel}
        
        > 🚫 • **NSFW:** ${guildInfo.guildAdditionalInfo.guildIsNSFW}`
      )
      .setFooter({
        text: `Requested by ${user.username}`,
      })
      .setTimestamp(Date.now());

    await interaction.deferReply({
      fetchReply: true,
    });

    await interaction.editReply({ embeds: [serverInfoEmbed] });
  },
};

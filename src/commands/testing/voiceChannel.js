const { SlashCommandBuilder, ChannelType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voicechannel")
    .setDescription("Let's the bot join the voicechannel")
    .addChannelOption((option) =>
      option
        .setName("voicechannel")
        .setDescription("Select which voice channel Obot V.2.0 will join.")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { guild, options } = interaction;
    const { channels } = guild;
    // VOICE CHANNEL VARIABLES
    const targetVoiceChannel = options.getChannel("voicechannel");
    const channelFetch = await channels.cache.get(targetVoiceChannel.id);
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    joinVoiceChannel({
      channelId: channelFetch.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: true,
    });

    await interaction.editReply({
      content: `Succesfully joined <#${channelFetch.id}>!`,
    });
  },
};

const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("channel")
    .setDescription("None")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageChannels)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Creates a channel")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Give a name for this channel")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription("Enter the type of channel you want")
            .addChoices(
              { name: "# Text", value: "channelText" },
              { name: "🔉 Voice", value: "channelVoice" },
              { name: "🔴 Stage", value: "channelStage" },
              { name: "❓❔ Forum", value: "channelForum" },
              { name: "📢 News", value: "channelNews" }
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("topic")
            .setDescription(
              'Enter the topic you want for this channel. Note: Only for "TEXT & NEWS CHANNELS"!'
            )
        )
        .addStringOption((option) =>
          option
            .setName("category")
            .setDescription("Enter the category ID")
            .setMinLength(18)
            .setMaxLength(19)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Deletes a channel")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Enter the channel you want to delete")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("You can give a reason")
        )
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { guild, user, options } = interaction;
    const { channels } = guild;
    // CHANNEL VARIABLES
    const targetSubCommand = options.getSubcommand();
    const channelName = options.getString("name");
    const channelTopic = options.getString("topic");
    const channelCategory = options.getString("category");
    const channelCategoryFetch = await channels.cache.find(
      (c) => c.id === channelCategory
    );
    const reason = options.getString("reason")
      ? options.getString("reason")
      : "No reason provided";
    const channelTypeInput = options.getString("type");
    let channelTypeSet = null;
    if (channelTypeInput == "channelText") {
      channelTypeSet = ChannelType.GuildText;
    } else if (channelTypeInput == "channelVoice") {
      channelTypeSet = ChannelType.GuildVoice;
    } else if (channelTypeInput == "channelStage") {
      channelTypeSet = ChannelType.GuildStageVoice;
    } else if (channelTypeInput == "channelForum") {
      channelTypeSet = ChannelType.GuildForum;
    } else if (channelTypeInput == "channelNews") {
      channelTypeSet = ChannelType.GuildAnnouncement;
    }
    const targetChannel = options.getChannel("channel")
      ? options.getChannel("channel")
      : "";
    const channelFetchExist = await channels.cache.find(
      (c) => c.name === channelName
    );
    const channelFetch = await channels.cache.find(
      (c) => c.id === targetChannel.id
    );
    const test =
      // MESSAGE
      await interaction.deferReply({
        fetchReply: true,
      });

    let channelEmbed = new EmbedBuilder();

    switch (targetSubCommand) {
      // CHANNEL CREATE COMMAND
      case "create":
        if (channelFetchExist) {
          await interaction.editReply({
            content: "❌ **This channel already exists!**",
          });
        } else {
          if (channelTypeInput == "channelText" || "channelNews") {
            let channelCreation = await channels.create({
              name: channelName,
              type: channelTypeSet,
              parent: channelCategoryFetch,
              topic: channelTopic ? channelTopic : null,
            });

            channelEmbed = new EmbedBuilder()
              .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: "•  ✅ Successfully created channel!",
              })
              .setColor("#ffa500")
              .setDescription(
                `> 🔗 • **Channel Created:** <#${channelCreation.id}>\n(ID: ${
                  channelCreation.id
                })
        
                    > 📜 • **Topic:** *${
                      channelTopic ? channelTopic : "No topic provided"
                    }*
                        
                        > 👤 • **Creator:** <@${user.id}>`
              )
              .setTimestamp(Date.now());

            await interaction.editReply({
              embeds: [channelEmbed],
            });
            // CHANNEL TEXT & VOICE
          } else if (channelTypeInput == "channelVoice" || "channelStage") {
            let channelCreation = await channels.create({
              name: channelName,
              type: channelTypeSet,
              parent: channelCategoryFetch,
            });

            channelEmbed = new EmbedBuilder()
              .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: "•  ✅ Successfully created channel!",
              })
              .setColor("#ffa500")
              .setDescription(
                `> 🔗 • **Channel Created:** <#${channelCreation.id}>\n(ID: ${channelCreation.id})
                            
                 > 👤 • **Creator:** <@${user.id}>`
              )
              .setTimestamp(Date.now());

            await interaction.editReply({
              embeds: [channelEmbed],
            });
            // CHANNEL FORUM
          } else if (channelTypeInput == "channelForum") {
            let channelCreation = await channels.create({
              name: channelName,
              type: channelTypeSet,
              parent: channelCategoryFetch,
            });

            channelEmbed = new EmbedBuilder()
              .setAuthor({
                iconURL: user.displayAvatarURL(),
                name: "•  ✅ Successfully created channel!",
              })
              .setColor("#ffa500")
              .setDescription(
                `> 🔗 • **Channel Created:** <#${channelCreation.id}>\n(ID: ${channelCreation.id})
                            
                 > 👤 • **Creator:** <@${user.id}>`
              )
              .setTimestamp(Date.now());

            await interaction.editReply({
              embeds: [channelEmbed],
            });
          }
        }
        break;

      // ROLE DELETE COMMAND
      case "delete":
        channelEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  ✅ Successfully deleted channel!",
            parent: channelCategoryFetch,
          })
          .setColor("#ffa500")
          .setDescription(
            `> 🔗 • **Channel Deleted:** <#${channelFetch.id}>\n(ID: ${channelFetch.id})
        
        > 👤 • **By:** <@${user.id}>
        
        > **Reason:** *${reason}*`
          )
          .setTimestamp(Date.now());

        await channelFetch.delete(reason).catch(console.error);

        await interaction.editReply({
          embeds: [channelEmbed],
        });
        break;
    }
  },
};

const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("None")
    .setDefaultMemberPermissions(
      PermissionsBitField.Flags.BanMembers,
      PermissionsBitField.Flags.KickMembers,
      PermissionsBitField.Flags.ModerateMembers
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ban")
        .setDescription("Bans a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter the user you want to ban")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("You can give a reason")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kick")
        .setDescription("Kicks a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter the user you want to kick")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("You can give a reason")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("timeout")
        .setDescription("Timeouts a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter the user you want to timeout")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("duration")
            .setDescription("Enter the duration in minutes. Max: 28 Days")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("reason").setDescription("You can give a reason")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unban")
        .setDescription("Unbans a user by id")
        .addStringOption((option) =>
          option
            .setName("userid")
            .setDescription("Enter the user id")
            .setMinLength(18)
            .setMaxLength(19)
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("untimeout")
        .setDescription("Removes timeout from a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription(
              "Enter the user you want to remove the timeout from"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { user, options, guild, member } = interaction;
    const { members } = guild;
    // USER VARIABLES
    const targetSubCommand = options.getSubcommand();
    const targetUser = options.getUser("user") ? options.getUser("user") : "";
    const userFetch = await members.fetch(targetUser.id);
    const reason = options.getString("reason")
      ? options.getString("reason")
      : "No reason provided";
    const targetUserId = options.getString("userid");
    const duration = options.getInteger("duration");
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    let userEmbed = new EmbedBuilder();

    // BAN COMMAND
    if (targetSubCommand === "ban") {
      if (user.id == userFetch.id) {
        await interaction.editReply({
          content: "❌ **You cannot ban yourself!**",
        });
      } else if (userFetch.id == client.user.id) {
        await interaction.editReply({
          content: "❌ **You cannot ban me!**",
        });
      } else if (
        member.roles.highest.position < userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot ban someone who has a higher position than you!**",
        });
      } else if (
        member.roles.highest.position == userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot ban someone who has the same position as you!**",
        });
      } else {
        userEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  🔨 Successfully banned!",
          })
          .setColor(userFetch.displayHexColor)
          .setDescription(
            `> 🔨 • **Offender:** <@${userFetch.id}>
        
        > 👤 • **Defender:** <@${user.id}>
        
        > **Reason:** *${reason}*`
          )
          .setTimestamp(Date.now());

        await userFetch.ban({ reason: reason }).catch(console.error);

        await interaction.editReply({
          embeds: [userEmbed],
        });
      }
      // KICK COMMAND
    } else if (targetSubCommand === "kick") {
      if (user.id == userFetch.id) {
        await interaction.editReply({
          content: "❌ **You cannot kick yourself!**",
        });
      } else if (userFetch.id == client.user.id) {
        await interaction.editReply({
          content: "❌ **You cannot kick me!**",
        });
      } else if (
        member.roles.highest.position < userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot kick someone who has a higher position than you!**",
        });
      } else if (
        member.roles.highest.position == userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot kick someone who has the same position as you!**",
        });
      } else {
        userEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  🔨 Successfully kicked!",
          })
          .setColor(userFetch.displayHexColor)
          .setDescription(
            `> 🔨 • **Offender:** <@${userFetch.id}>
        
        > 👤 • **Defender:** <@${user.id}>
        
        > **Reason:** *${reason}*`
          )
          .setTimestamp(Date.now());

        await userFetch.kick(reason).catch(console.error);

        await interaction.editReply({
          embeds: [userEmbed],
        });
      }
      // TIMEOUT COMMAND
    } else if (targetSubCommand === "timeout") {
      if (user.id == userFetch.id) {
        await interaction.editReply({
          content: "❌ **You cannot timeout yourself!**",
        });
      } else if (userFetch.id == client.user.id) {
        await interaction.editReply({
          content: "❌ **You cannot timeout me!**",
        });
      } else if (
        member.roles.highest.position < userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot timeout someone who has a higher position than you!**",
        });
      } else if (
        member.roles.highest.position == userFetch.roles.highest.position
      ) {
        await interaction.editReply({
          content:
            "❌ **You cannot timeout someone who has the same position as you!**",
        });
      } else if (userFetch.isCommunicationDisabled() == true) {
        await interaction.editReply({
          content: "❌ **This user already has a timeout!**",
        });
      } else {
        userEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  🔇 Successfully timed out!",
          })
          .setColor("#ffa500")
          .setDescription(
            `> 📥 • **Offender:** <@${userFetch.id}>
              
              > 🛡 • **Defender:** <@${user.id}>
              
              > **Reason:** *${reason}*`
          )
          .setTimestamp(Date.now());

        await userFetch
          .timeout(duration * 60 * 1000, reason)
          .catch(console.error);

        await interaction.editReply({
          embeds: [userEmbed],
        });
      }
      // UNBAN COMMAND
    } else if (targetSubCommand === "unban") {
      if (user.id == targetUserId) {
        await interaction.editReply({
          content: "❌ **You cannot unban yourself!**",
        });
      } else {
        userEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  🔨 Successfully revoked ban!",
          })
          .setColor("#ffa500")
          .setDescription(
            `> 🔨 • **Unbanned:** <@${targetUserId}>
        
             > 👤 • **By:** <@${user.id}>`
          )
          .setFooter({
            text: `ID: ${targetUserId}`,
          })
          .setTimestamp(Date.now());

        await members.unban(targetUserId).catch(console.error);

        await interaction.editReply({
          embeds: [userEmbed],
        });
      }
      // UNTIMEOUT COMMAND
    } else if (targetSubCommand === "untimeout") {
      if (user.id == userFetch.id) {
        await interaction.editReply({
          content:
            "❌ **You do not have a timeout, and you cannot remove a timeout by yourself!**",
        });
      } else {
        userEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: "•  🔉 Successfully removed timeout!",
          })
          .setColor("#ffa500")
          .setDescription(
            `> 📤 • **From:** <@${userFetch.id}>
            
          > 👤 • **By:** <@${user.id}>`
          )
          .setTimestamp(Date.now());

        await userFetch.timeout(null).catch(console.error);

        await interaction.editReply({
          embeds: [userEmbed],
        });
      }
    }
  },
};

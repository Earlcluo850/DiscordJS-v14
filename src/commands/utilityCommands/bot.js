const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bot")
    .setDescription("None")
    .addSubcommand((subcommand) =>
      subcommand.setName("info").setDescription("Gets the info of Obot V.2.0!")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("invite").setDescription("Invite link of Obot V.2.0!!")
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { options, user, guild } = interaction;
    const { members } = guild;
    // BOT VARIABLES
    const botInviteLink =
      "https://discord.com/api/oauth2/authorize?client_id=1020558889852350554&permissions=8&scope=bot";
    const targetSubCommand = options.getSubcommand();
    const userFetch = await members.fetch(user.id);
    const botFetch = await members.fetch(client.user.id);
    const botProfile = botFetch.user.displayAvatarURL();
    const botCreated = Math.trunc(botFetch.user.createdTimestamp / 1000);
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    let botEmbed = new EmbedBuilder();

    if (targetSubCommand === "info") {
      botEmbed = new EmbedBuilder()
        .setAuthor({
          iconURL: botProfile,
          name: "•  A little bit about me! Obot V.2.0 —",
        })
        .setColor(0x9b35de)
        .setThumbnail(botProfile)
        .setDescription(
          `> 🤖 • **Username:** \`${botFetch.user.username}\`
          
          > 🔐 • **Developer:** \`${userFetch.user.tag}\`
          
          > 🌐 • **Bot Creation:** <t:${botCreated}>`
        )
        .setFooter({
          text: `Requested by ${userFetch.user.username}`,
        })
        .setTimestamp(Date.now());

      await interaction.editReply({
        embeds: [botEmbed],
      });
    } else if (targetSubCommand === "invite") {
      await interaction.editReply({
        content: `Here <@${user.id}>!\n${botInviteLink}`,
      });
    }
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedtest")
    .setDescription("All commands are here!"),
  async execute(interaction, client) {
    let embed = new EmbedBuilder()
      .setTitle("**Help Commands Page**")
      .setDescription("Test")
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://google.com`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL(`https://google.com`)
      .addFields([
        { name: "Field 1", value: "Value 1", inline: true },
        { name: "Field 2", value: "Value 2", inline: true },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};

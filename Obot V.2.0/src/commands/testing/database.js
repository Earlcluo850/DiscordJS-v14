const { SlashCommandBuilder } = require("discord.js");
const GuildsInfo = require("../../schemas/serverInfo");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("database")
    .setDescription("Returns information from a databse."),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { guild } = interaction;
    // MONGO
    let guildProfile = await GuildsInfo.findOne({
      _id: `${guild.name}_info`,
    });
    if (!guildProfile) {
        guildProfile = await new GuildsInfo({
            _id: `${guild.name}_info`,
            guildId: guild.id,
            guildName: guild.name,
            guildIcon: guild.iconURL() ? guild.iconURL() : "NULL",
          });
    }
    // MESSAGE
    await guildProfile.save().catch(console.error);

    await interaction.reply({
      content: `**Server Name:** ${guildProfile.guildName}\n\n**Server ID:** ${guildProfile.guildId}`,
    });
  },
};

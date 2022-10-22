const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: {
    name: "test",
  },
  async execute(interaction, client) {
    let btn1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("buttonTest")
        .setLabel("Click here again!")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({
      content: "You clicked the button!",
      components: [btn1],
    });
  },
};

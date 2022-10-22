const {
  SlashCommandBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
  SelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("selectmenutest")
    .setDescription("Returns a select menu!"),
  async execute(interaction, client) {
    const menu = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("selectMenuTest")
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder("Select a option! :D")
        .setOptions(
          new SelectMenuOptionBuilder({
            label: "Option #1",
            value: "`Option #1`",
          }),
          new SelectMenuOptionBuilder({
            label: "Option #2",
            value: "`Option #2`",
          })
        )
    );

    interaction.reply({
      components: [menu],
    });
  },
};

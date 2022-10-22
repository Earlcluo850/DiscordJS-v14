module.exports = {
  data: {
    name: "modalTest",
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `Your favorite color is: **${interaction.fields.getTextInputValue("favoriteColor")}**`,
    });
  },
};

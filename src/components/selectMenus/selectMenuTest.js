module.exports = {
  data: {
    name: "selectMenuTest",
  },
  async execute(interaction, client) {
    if (interaction.customId === "selectMenuTest") {
      if (interaction.values[0] === "`Option #1`") {
        await interaction.update({
          content: "You selected **Option #1!**",
        });
      } else if (interaction.values[0] === "`Option #2`") {
        await interaction.update({
          content: "You selected **Option #2**",
        });
      }
    }
  },
};

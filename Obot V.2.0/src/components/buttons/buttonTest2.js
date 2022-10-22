module.exports = {
  data: {
    name: "buttonTest",
  },
  async execute(interaction, client) {
    let msg = await interaction.update({
      content: "You clicked the button again!",
      components: [],
    });
  },
};

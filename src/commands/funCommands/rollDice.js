const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolldice")
    .setDescription(
      "Rolls a dice, also depending on what sizes you may want. Default: 6"
    )
    .addIntegerOption((option) =>
      option
        .setName("sides")
        .setDescription("You can put how many dice sides.")
        .setMinValue(2)
        .setMaxValue(120)
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { options, user } = interaction;
    // ROLL DICE VARIABLES
    let diceSides = options.getInteger("sides");
    if (!diceSides) diceSides = 6;
    let rolledDice = Math.floor(Math.random() * diceSides);
    if (rolledDice == 0) rolledDice += 1;
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    await wait(3000);
    
    await interaction.editReply({
      content: `🎲 *${user.username}* used a ***${diceSides}-sided dice*** and rolled: **${rolledDice}**`,
    });
  },
};

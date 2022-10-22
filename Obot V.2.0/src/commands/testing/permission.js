const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("permissiontest")
    .setDescription("Requires a permission.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { roles } = interaction.member;
    const role = await interaction.guild.roles
      .fetch("1016389953606914140")
      .catch(console.error);

    const testRole = await interaction.guild.roles
      .create({
        name: "Test",
        permissions: [PermissionsBitField.Flags.KickMembers],
      })
      .catch(console.error);

    if (roles.cache.has("1016389953606914140")) {
      await interaction.deferReply({
        fetchReply: true,
      });

      const channel = await interaction.guild.channels.create({
        name: "test",
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: testRole.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      });

      await roles.add(testRole).catch(console.error);

      await channel.permissionOverwrites
        .edit(testRole.id, { SendMessages: false })
        .catch(console.error);

      await testRole
        .setPermissions([PermissionsBitField.Flags.BanMembers])
        .catch(console.error);

      await roles.remove(role).catch(console.error);
      await interaction.editReply({
        content: `Removed: ${role.name} role.`,
      });
    } else {
      await interaction.reply({
        content: `You don't have the ${role.name} role!`,
      });
    }
  },
};

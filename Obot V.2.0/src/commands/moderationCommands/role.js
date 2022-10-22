const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("None")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageRoles)
    // CREATE ROLE COMMAND
    .addSubcommand((subcommand) =>
      subcommand
        .setName("create")
        .setDescription("Creates a role in the server")
        .addStringOption((option) =>
          option
            .setName("name")
            .setDescription("Give a name for the role")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("hexcolor")
            .setDescription("Enter a #XXXXXX color code | Default: #000000")
        )
    )
    // DELETE ROLE COMMAND
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Deletes a role in the server")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Enter the role you want to delete")
            .setRequired(true)
        )
    )
    // ADD ROLE COMMAND
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adds a role to a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter a user to add the role to")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Enter the role you want to add")
            .setRequired(true)
        )
    )
    // REMOVE ROLE COMMAND
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Removes a role from a user")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Enter a user to remove the role from")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Enter the role you want to remove")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    // GLOBAL VARIABLES
    const { guild, user, options } = interaction;
    const { members, roles } = guild;
    // ROLE VARIABLES
    const targetSubCommand = options.getSubcommand();
    const roleName = options.getString("name");
    const roleNameExist = await roles.cache.find((r) => r.name === roleName);
    const roleHexColor = options.getString("hexcolor");
    const targetUser = options.getUser("user") ? options.getUser("user") : "";
    const targetRole = options.getRole("role") ? options.getRole("role") : "";
    const userFetch = await members.fetch(targetUser.id);
    const roleFetch = await roles.cache.find((r) => r.id === targetRole.id);
    const reason = options.getString("reason")
      ? options.getString("reason")
      : "No reason provided";
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    let roleEmbed = new EmbedBuilder();

    switch (targetSubCommand) {
      case "create":
        if (roleNameExist) {
          await interaction.editReply({
            content: "❌ **This role already exists!**",
          });
        } else {
          const roleCreation = await roles.create({
            name: roleName,
            color: roleHexColor ? roleHexColor : "#000000",
          });

          roleEmbed = new EmbedBuilder()
            .setAuthor({
              iconURL: user.displayAvatarURL(),
              name: `  ✅ Successfully created role!`,
            })
            .setDescription(
              `> 📜 • **Role Created:** <@&${roleCreation.id}>
  
            > 🌈 • **Color:** \`${roleCreation.hexColor}\`
            
            > 👤 • **Creator:** <@${user.id}>`
            )
            .setTimestamp(Date.now());

          await interaction.editReply({
            embeds: [roleEmbed],
          });
        }
        break;

      case "delete":
        roleEmbed = new EmbedBuilder()
          .setAuthor({
            iconURL: user.displayAvatarURL(),
            name: `•  ✅ Successfully deleted role!`,
          })
          .setColor(roleFetch.hexColor)
          .setDescription(
            `> 📜 • **Role Delete:** <@&${roleFetch.id}>\n(ID: ${roleFetch.id})
          
          > 👤 • **By:** <@${user.id}>`
          )
          .setTimestamp(Date.now());

        await roles.delete(roleFetch).catch(console.error);

        await interaction.editReply({
          embeds: [roleEmbed],
        });
        break;

      case "add":
        if (userFetch.roles.cache.has(roleFetch.id)) {
          await interaction.editReply({
            content: `❌ **This user already has the \`${roleFetch.name}\` role!**`,
          });
        } else {
          roleEmbed = new EmbedBuilder()
            .setAuthor({
              iconURL: user.displayAvatarURL(),
              name: `•  ✅ Successfully added role!`,
            })
            .setColor(roleFetch.hexColor)
            .setDescription(
              `> 📜 • **Role Added:** <@&${roleFetch.id}>
              
              > 📥 • **To:** <@${targetUser.id}>
              
              > 👤 • **By:** <@${user.id}>`
            )
            .setTimestamp(Date.now());

          await userFetch.roles.add(roleFetch).catch(console.error);

          await interaction.editReply({
            embeds: [roleEmbed],
          });
        }
        break;

      case "remove":
        if (!userFetch.roles.cache.has(roleFetch.id)) {
          await interaction.editReply({
            content: `❌ **This user already doesn't have the \`${roleFetch.name}\` role!**`,
          });
        } else {
          roleEmbed = new EmbedBuilder()
            .setAuthor({
              iconURL: user.displayAvatarURL(),
              name: `•  ✅ Successfully removed role!`,
            })
            .setColor(roleFetch.hexColor)
            .setDescription(
              `> 📜 • **Role Removed:** <@&${roleFetch.id}>
            
            > 📤 • **From:** <@${targetUser.id}>
            
            > 👤 • **By:** <@${user.id}>`
            )
            .setTimestamp(Date.now());

          await userFetch.roles.remove(roleFetch).catch(console.error);

          await interaction.editReply({
            embeds: [roleEmbed],
          });
        }
        break;
    }
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Only for Message Creators of this server!!"),
  async execute(interaction, client) {
    // GLOBAL BARIABLES
    const { user, guild } = interaction;
    // RULES SERVER (GABUT) VARIABLES
    const guildIcon = guild.iconURL({ dynamic: true });
    const unTrustedRoleId = "1023876993328103464";
    const messageCreatorIds = [
      "960025025774231622",
      "707103385672876083",
      "912338311132094494",
    ];
    // MESSAGE
    await interaction.deferReply({
      fetchReply: true,
    });

    const authorIcon = user.displayAvatarURL();
    if (!messageCreatorIds.includes(user.id)) {
      await interaction.reply({
        content:
          "❌ This command can be only used by the message creators, Earlcluo8509#2946, Cryxtalz#2869, Ant57#3174!",
      });
    } else {
      let welcomeEmbed = new EmbedBuilder()
        .setTitle("🎉🎉🎉  ***WELCOME TO GABUT***  🎉🎉🎉")
        .setAuthor({
          iconURL: authorIcon,
          name: `•  ${user.tag}`,
        })
        .setColor(0x9b35de)
        .setThumbnail(guildIcon)
        .setDescription(
          "*Here are our rules, **please read them thoroughly.** If you don't understand something feel free to contact our staff in **{** <#1023923910581956678> **}**.*"
        );
      let rulesEmbed = new EmbedBuilder().setColor(0x9b35de).setDescription(
        `**#1 — 🚫 No Spam**
          No spamming or you will be muted by Discord's auto-mod, if continued, you will result in a ban. We will not user any message farming, the messages will be gained fairly. If mods make a channel for message farming, please report it to the owner immediately.
          
          **#2 — 🙏 Be Respectful**
          Please be respectful, for example no unnecessary pinging.
          
          **#3 — Use Common Sense**
          If you don't have this then go leave this server. Some rules may not be included so just use common sense.
          
          **#4 — 🔢 Use channels only for *their purpose***
          For example, don't chat in giveaway-trades.
          
          **#5 — 🎫 No Advertising**
          If someone does this this please tell the staff immediately, we will not tolerate any forms of advertising. You will be warned, then muted and receive the <@&${unTrustedRoleId}> role, then banned.
          
          **#6 — 🚫 No *toxicity* and excessive use of *curse words***
          You can swear but not excessively, if you do this, mods will first warn then mute you, toxicity is not tolerated and will result in immediate mute, <@&${unTrustedRoleId}> until we believe you have changed, and if continued, it will result in a ban.
          
          **#7 — 🚫 No NSFW**
          No lewd images, no NSFW, no hentai. Immediate ban by mods.

          **#8 — 🚫 No *Racism*, *Sexism*, etc.**
          No forms of discrimination will be tolerated, this will result in temporary ban of 30 days and <@&${unTrustedRoleId}> role if you come back, if continued, then ban.
          
          **#9 — 📜 Follow Discord and Bot ToS**
          Follow the Terms of Service (ToS) of Discord and Bots.
          **Link:** https://discord.com/terms`
      );
      let unTrustedRoleEmbed = new EmbedBuilder()
        .setTitle(`What is the @un-trusted role?`)
        .setColor("#9b35de")
        .setDescription(
          `This role comes with many disadvantages, so you wouldn't want to receive it.
          
          **List:**
          — Blacklist from **giveaways**
          — Blacklist from **vc's**
          — Blacklist from **events**
          
          **Note:** You may receive this role even if the consequences aren't listed in the rules above, staff has permission to assign this role if they seem suitable.`
        );

      await interaction.editReply({
        embeds: [welcomeEmbed, rulesEmbed, unTrustedRoleEmbed],
      });
    }
  },
};

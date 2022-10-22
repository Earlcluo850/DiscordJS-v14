const { Schema, model } = require("mongoose");
const guildInfoSchema = new Schema({
  _id: String,
  // GUILD INFO
  guildId: String,
  guildName: String,
  guildCreation: String,
  guildOwnerId: String,
  guildIcon: { type: String, required: false },
  // MEMBERS
  guildMembers: {
    _id: String,
    totalMembers: Number,
    botMembers: Number,
    noBotMembers: Number,
  },

  // CHANNELS
  guildChannels: {
    _id: String,
    totalChannels: Number,
    guildChannelsTypesInfo: {
      _id: String,
      categoryChannels: Number,
      textChannels: Number,
      voiceChannels: Number,
      stageChannels: Number,
    },
  },
  // ADDITIONAL INFO
  guildAdditionalInfo: {
    _id: String,
    totalRoleCount: Number,
    customEmojiCount: Number,
    guildVerificationLevel: String,
    guildIsNSFW: String,
  },
});

module.exports = model("GuildsInfo", guildInfoSchema, "GUILDS_INFO");

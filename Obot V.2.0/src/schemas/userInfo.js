const { Schema, model } = require("mongoose");

const userInfoSchema = new Schema({
  _id: String,
  userId: String,
  username: String,
  tag: String,
  avatar: String,
  joinedServer: String,
  accountCreation: String,
});

module.exports = model("UserInfo", userInfoSchema, "USERS_INFO");

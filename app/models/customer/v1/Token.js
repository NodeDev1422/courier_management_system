const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
    userId: { type: String },
    token: {
      type: String
    },
    createdDate: { type: Date },
  });

const Token = mongoose.model("tokens", tokenSchema);

module.exports = Token;

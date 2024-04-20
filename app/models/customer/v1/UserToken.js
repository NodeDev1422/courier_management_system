const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema({
    userId: { type: String },
    token: {
      type: String
    },
    createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
    updatedAt: {type: Date},
    createdBy: {type: String},
    updatedBy: {type: String},
  });

const Token = mongoose.model("tokens", tokenSchema);

module.exports = Token;

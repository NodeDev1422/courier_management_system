const mongoose = require("mongoose");
const { NUMBER } = require("sequelize");

const contentSchema = new mongoose.Schema({
  COMMODITY_CODE: { type: String },
  COMMODITY_ID: { type: Number, unique: true },
  COMMODITY_NAME: { type: String },
  ORGANISATION_ID: { type: String },
  categoryId: { type: String },
  categoryName: { type: String },
  showInCustomerPortal: { type: Boolean },
  createdDate: { type: Date },
  updatedDate: { type: Date },
});

const ContentMaster = mongoose.model("content_master", contentSchema);

module.exports = ContentMaster;

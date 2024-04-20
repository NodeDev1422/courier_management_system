const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  commodityCode: { type: String },
  commodityId: { type: Number, unique: true },
  commodityName: { type: String },
  organisationId: { type: String },
  categoryId: { type: String },
  categoryName: { type: String },
  showInCustomerPortal: { type: Boolean },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const ContentMaster = mongoose.model("content_masters", contentSchema);

module.exports = ContentMaster;

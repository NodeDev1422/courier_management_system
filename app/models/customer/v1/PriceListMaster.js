const mongoose = require("mongoose");
const { NUMBER } = require("sequelize");

const priceListSchema = new mongoose.Schema({
  serviceType: { type: String },
  ServiceTypeId: { type: Number, unique: true },
  distanceType: { type: String },
  volumeWeight: { type: Number },
  weightUnit: { type: String },
  fromUnit: { type: Number },
  toUnit: { type: Number },
  fromDistance: { type: Number },
  toDistance: { type: Number },
  basePrice: { type: Number },
  contentId: { type: Array },
  createdDate: { type: Date },
  updatedDate: { type: Date },
});

const PriceListMaster = mongoose.model("pricelist_master", priceListSchema);

module.exports = PriceListMaster;

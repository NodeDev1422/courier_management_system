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
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const PriceListMaster = mongoose.model("pricelist_masters", priceListSchema);

module.exports = PriceListMaster;

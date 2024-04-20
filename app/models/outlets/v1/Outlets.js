const mongoose = require("mongoose");

const outletschema = new mongoose.Schema({
  name: { type: String },
  location: { type: Object },
  images: { type: Array },
  ownerName: { type: String },
  phoneNumber: { type: String },
  GSTNum: { type: String },
  TINNum: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  createdBy: { type: String },
  updatedBy: { type: String },
});

const Outlet = mongoose.model("outlets", outletschema);

module.exports = Outlet;

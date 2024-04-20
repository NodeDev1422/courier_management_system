const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  statusId: { type: Number, unique: true },
  statusOrder: { type: Number, unique: true },
  statusName: { type: String },
  statusDisplayName: { type: String},
  description: { type: String },
  isEnable: { type: Boolean, default: true  },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const statusMaster = mongoose.model("status_masters", statusSchema);

module.exports = statusMaster;

const mongoose = require("mongoose");

const customerDeviceInfoSchema = new mongoose.Schema({
  customerCode: { type: String, ref: "customers" },
  deviceType: { type: String, enum:["android", "ios","web", "api"]},
  deviceInfo: { type: Object },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const CustomersDeviceInfo = mongoose.model("customers_device_info", customerDeviceInfoSchema);

module.exports = CustomersDeviceInfo;

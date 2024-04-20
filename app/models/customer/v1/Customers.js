const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  otp: { type: Number },
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } }
});
const customerSchema = new mongoose.Schema({
  customerCode: { type: String },
  mobileNumber: { type: Number, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  status: { type: Boolean },
  otp: [otpSchema],
  createdAt: { type: Date, default: ()=> { return new Date().toISOString() } },
  updatedAt: {type: Date},
  createdBy: {type: String},
  updatedBy: {type: String},
});

const Customers = mongoose.model("customers", customerSchema);

module.exports = Customers;
